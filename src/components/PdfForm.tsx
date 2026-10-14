'use client';

import { usePdfGenerator } from '@/hooks/usePdfGenerator';
import { PdfData } from '@/types/pdf';
import { Diagnosis, Question } from '@/types';
import { AssessmentAnswers } from '@/types';

interface PdfFormProps {
  finalScore: number;
  tier: Diagnosis;
  personalizedAdvice: string;
  QUESTIONS: Question[];
  answers: AssessmentAnswers;
  primaryFix?: string;
}

export default function PdfForm({
  finalScore,
  tier,
  personalizedAdvice,
  QUESTIONS,
  answers,
  primaryFix
}: PdfFormProps) {
  const { generatePdf, loading } = usePdfGenerator();

  const transformToPdfData = (): PdfData => {
    // Determine score status
    let status: 'critical' | 'warning' | 'good' = 'good';
    if (finalScore <= 40) {
      status = 'critical';
    } else if (finalScore <= 70) {
      status = 'warning';
    }

    // Transform diagnosis
    const diagnosis = [
      {
        icon: 'warning',
        title: tier.headline,
        description: tier.description,
        priority: status === 'critical' ? 'HIGH' : undefined,
      },
    ];

    // Add primary fix if available
    if (primaryFix) {
      diagnosis.push({
        icon: 'check' as const,
        title: primaryFix,
        description: '',
        priority: undefined,
      });
    }

    // Transform gap analysis from QUESTIONS
    const gapAnalysis = QUESTIONS.map((q) => {
      const answer = answers[q.id];
      const isOptimal = q.reverseScore ? answer === false : answer === true;

      return {
        question: q.text,
        context: !isOptimal ? q.failureInsight : '',
        leak: isOptimal ? 'OPTIMIZED' : 'REVENUE LEAK',
        priority: !isOptimal ? `PRIORITY LEVEL ${q.priority}` : '',
        priorityLevel: !isOptimal ? q.priority : 0,
      };
    });

    return {
      header: {
        companyName: 'Steer Elevate',
        title: 'Patient Experience Report Card',
        subtitle: 'A detailed diagnosis of your clinic\'s operational health.',
      },
      score: {
        score: finalScore,
        maxScore: 100,
        label: 'SCORE',
        status,
        color: tier.color, // Use tier color from GaugeChart
        statusText: tier.status, // Use tier status text
      },
      diagnosis,
      sections: [
        {
          title: 'Strategic Analysis',
          content: personalizedAdvice,
        },
      ],
      gapAnalysis,
      cta: {
        title: 'Ready to Plug the Leaks?',
        description: 'Schedule a free 30-minute Journey Audit to see how we can automate these steps for you.',
        buttons: [
          { text: 'Book Your Free Audit', variant: 'primary' as const, link: 'https://steerhealth.io/elevate/contact-us' },
          { text: 'Retake Assessment', variant: 'secondary' as const, link: 'https://steerhealth.io/elevate/practice-score' },
        ],
      },
    };
  };

  return (
    <button
      onClick={() => generatePdf(transformToPdfData())}
      disabled={loading}
      className="w-full sm:w-auto bg-transparent border border-white text-white px-8 py-4 rounded-xl font-bold cursor-pointer transition-colors"
      //className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      aria-label="Generate PDF report"
    >
      {loading ? 'Generating...' : 'Generate PDF'}
    </button>
  );
}
