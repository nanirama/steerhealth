import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { AssessmentAnswers, Question } from '@/types';

export async function POST(req: Request) {
  try {
    const { answers, questions, score }: { 
      answers: AssessmentAnswers; 
      questions: Question[]; 
      score: number 
    } = await req.json();

    // Validate input
    if (!answers || !questions || typeof score !== 'number') {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Check for API key (server-side only, not exposed to client)
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY or API_KEY not found in environment variables");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Create a summary of the issues
    const missedOpportunities = questions
      .filter(q => {
        const answer = answers[q.id];
        return q.reverseScore ? answer === true : answer === false;
      })
      .map(q => q.text);

    const prompt = `
      Context: You are a high-end medical clinic growth consultant. 
      Task: Analyze the following patient journey assessment results and provide a brief, professional, and punchy strategic insight.
      
      Overall Score: ${score}/100
      Specific Bottlenecks Identified:
      ${missedOpportunities.map(o => `- ${o}`).join('\n')}
      
      Instructions:
      1. Write 2-3 short, punchy paragraphs.
      2. Focus on "Lost Revenue" and "Operational Drag".
      3. Suggest one high-impact automation priority.
      4. Keep it encouraging but urgent.
      5. Don't use generic AI filler words.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 0.9,
        }
      });
      
      return NextResponse.json(
        { advice: response.text },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      // Return fallback advice instead of error
      const fallbackAdvice = "Your clinic has significant potential for growth. By automating key parts of the patient journey—especially the pre-visit booking and post-visit follow-up—you can capture more revenue and free up your staff for higher-value tasks.";
      return NextResponse.json(
        { advice: fallbackAdvice },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
