"use client";

import React, { useState, useMemo } from 'react';
import { AppState, AssessmentAnswers, Diagnosis, Question } from '@/types';
import { QUESTIONS } from '@/types/constants';
import Link from 'next/link';
import { GaugeChart } from '@/components/GaugeChart';
import PdfForm from '@/components/PdfForm';
import PracticeScoreForm from '@/components/Elements/PracticeScoreForm';

// --- Icons ---
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const CheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

const AlertTriangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
);

// --- Logo Component ---
const Logo = ({ small = false }: { small?: boolean }) => (
  <div className={`font-extrabold tracking-tighter flex items-center gap-1.5 ${small ? 'text-3xl' : 'text-5xl md:text-6xl mb-8'}`}>
    <span style={{ color: '#142569' }}>Steer</span>
    <span style={{ color: '#0CA039' }}>Elevate</span>
  </div>
);
export default function ContactUsPage() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [personalizedAdvice, setPersonalizedAdvice] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  // 1. Calculate Score
  const getCalculatedScore = (currentAnswers: AssessmentAnswers, questions: Question[]) => {
    return questions.reduce((acc, q) => {
      const answer = currentAnswers[q.id];
      if (answer === undefined) return acc; // Not answered yet
      
      // Check if answer matches ideal state. 
      // If reverseScore is true (e.g. "Do you do manual entry?"), Ideal is FALSE.
      const isOptimal = q.reverseScore ? answer === false : answer === true;
      return isOptimal ? acc + q.weight : acc;
    }, 0);
  };

  // 2. Determine Tier (The Diagnosis)
  const getDiagnosisTier = (score: number): Diagnosis => {
    if (score <= 40) {
      return {
        status: "Critical Leakage",
        headline: "Your clinic is actively repelling revenue.",
        description: "You are relying on manual human effort for tasks that should be instant. You are losing approximately 30-40% of leads to competitors who answer faster.",
        color: "#ef4444" // red-500
      };
    } else if (score <= 70) {
      return {
        status: "Disconnected",
        headline: "Good tools, bad connection.",
        description: "You have digitized parts of the journey, but gaps remain. Your staff is likely bridging these gaps with manual work, creating 'operational drag' that limits your scalability.",
        color: "#f59e0b" // amber-500
      };
    } else {
      return {
        status: "Top Tier",
        headline: "A seamless patient experience.",
        description: "You are operating at high efficiency. Your focus should shift from 'fixing leaks' to 'predictive optimization' and increasing lifetime value (LTV).",
        color: "#10b981" // emerald-500
      };
    }
  };

  // 3. Determine Primary Fix (Waterfall Logic)
  const getPrimaryFix = (answers: AssessmentAnswers, questions: Question[]): string => {
    // Sort by priority (1 is highest/most urgent)
    const sortedQuestions = [...questions].sort((a, b) => a.priority - b.priority);
    
    // Find the first question the user answered SUB-OPTIMALLY
    const topFailure = sortedQuestions.find(q => {
      const answer = answers[q.id];
      const isOptimal = q.reverseScore ? answer === false : answer === true;
      return !isOptimal;
    });

    return topFailure ? topFailure.fixText : "Optimized! Maintain current systems.";
  };

  // Memoized results to prevent recalculation on unrelated renders
  const finalScore = useMemo(() => getCalculatedScore(answers, QUESTIONS), [answers]);
  const tier = useMemo(() => getDiagnosisTier(finalScore), [finalScore]);
  const primaryFix = useMemo(() => getPrimaryFix(answers, QUESTIONS), [answers]);

  // const diagnosis: Diagnosis = useMemo(() => {
  //   if (finalScore <= 40) {
  //     return {
  //       status: "Critical Leakage",
  //       diagnosis: "You are playing endless 'phone tag.' You are likely losing 30% of your leads because you aren't responding fast enough, and your staff is buried in manual data entry.",
  //       fix: "You need a 'Missed Call Text Back' system immediately.",
  //       color: "#ef4444" // red-500
  //     };
  //   } else if (finalScore <= 70) {
  //     return {
  //       status: "Disconnected",
  //       diagnosis: "You have good tools, but they don't talk to each other. Your booking tool works, but your review tool is manual. You are working harder than you need to.",
  //       fix: "Connect your booking flow to your retention flow.",
  //       color: "#f59e0b" // amber-500
  //     };
  //   } else {
  //     return {
  //       status: "Top Tier",
  //       diagnosis: "You are running a tight ship. The next step is AI automation to personalize the experience further.",
  //       fix: "Invest in predictive AI for patient re-engagement.",
  //       color: "#10b981" // emerald-500
  //     };
  //   }
  // }, [finalScore]);

  const handleAnswer = (val: boolean) => {
    // CRITICAL: Calculate next state immediately to avoid race conditions
    const nextAnswers = { ...answers, [QUESTIONS[currentStep].id]: val };
    
    setAnswers(nextAnswers);
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Transition to results using the FRESH answers
      finalizeAssessment(nextAnswers);
    }
  };

  const finalizeAssessment = async (finalAnswers: AssessmentAnswers) => {
    setAppState(AppState.RESULTS);
    setIsGenerating(true);
    
    // Calculate score for the AI context
    const scoreForAi = getCalculatedScore(finalAnswers, QUESTIONS);
    
    try {
      const response = await fetch('/api/generate-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: finalAnswers,
          questions: QUESTIONS,
          score: scoreForAi,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate advice');
      }

      const data = await response.json();
      setPersonalizedAdvice(data.advice || 'Unable to generate personalized advice at this time.');
    } catch (error) {
      console.error('Error generating advice:', error);
      setPersonalizedAdvice('Your clinic has significant potential for growth. By automating key parts of the patient journey—especially the pre-visit booking and post-visit follow-up—you can capture more revenue and free up your staff for higher-value tasks.');
    } finally {
      setIsGenerating(false);
    }
  };

  const progress = ((currentStep) / QUESTIONS.length) * 100;

  // --- Render Sections ---

  if (appState === AppState.LANDING) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-3xl text-center space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4 font-inter tracking-wide uppercase">
            STEER ELEVATE
          </div>
          <h1 className="xl:text-[60px] sm:text-[30px] text-[30px] mt-3 mx-auto text-center text-[#171717] mb-2 font-semibold font2 md:leading-[100%] leading-[130%]">
            Is Your Clinic <span className="bg-gradient-to-r from-[#3794FF] to-[#00B9B7] bg-clip-text text-transparent false">Leaking</span> Patients?
          </h1>
          <p className="xl:text-2xl text-xl text-[#5C5C5C] !font3 text-center sm:py-4 ">
            Take this 2-minute assessment to see exactly where you are losing patients—before, during, and after the visit.
          </p>
          <button 
            onClick={() => setAppState(AppState.QUIZ)}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#335CFF] to-[#00D9A5] text-white font-inter px-6 py-3 rounded-[8px] text-xl font-medium transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-200"
          >
            Get your patient experience score
            <ArrowRight />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              { title: "2 Minutes", desc: "Fast & focused", icon: "⏱️" },
              { title: "Revenue Focused", desc: "Identify lost growth", icon: "💰" },
              { title: "Personalized", desc: "Actionable AI roadmap", icon: "🤖" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font2 font-semibold text-[#171717]">{item.title}</div>
                <div className="text-sm font3 text-[#5c5c5c]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (appState === AppState.QUIZ) {
    const question = QUESTIONS[currentStep];
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col p-6">
        <nav className="max-w-2xl w-full mx-auto flex items-center justify-between mb-12">
          <div className="text-sm font-bold text-[#5c5c5c] uppercase font2 tracking-widest">
            Step {currentStep + 1} of {QUESTIONS.length}
          </div>
          <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </nav>
        
        <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-xs font-bold font-inter text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-4 inline-block">
            {question.section.replace('-', ' ')} Phase
            </span>
            <h2 className="sm:text-4xl text-3xl mt-3 mx-auto text-[#171717] mb-2 font-semibold font2 md:leading-[110%] leading-[130%]">
              {question.text}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="p-8 rounded-3xl border-2 border-white bg-white font2 hover:border-blue-500 hover:bg-blue-50 text-2xl font-bold text-slate-800 transition-all flex items-center justify-center gap-4 group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 group-hover:border-blue-500 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-transform" />
              </div>
              Yes
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="p-8 rounded-3xl border-2 border-white bg-white font2 hover:border-blue-500 hover:bg-blue-50 text-2xl font-bold text-slate-800 transition-all flex items-center justify-center gap-4 group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 group-hover:border-blue-500 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-transform" />
              </div>
              No
            </button>
          </div>
        </div>

        <footer className="max-w-2xl w-full mx-auto py-8 font-inter text-center text-slate-400 text-sm">
          Your answers are strictly confidential and used only for scoring.
        </footer>
      </div>
    );
  }

  if (appState === AppState.RESULTS) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
                {/* Small Logo for Report Header */}
                <Logo small />
            </div>
            <h1 className="text-3xl md:text-4xl text-[#171717] mb-3 font2 font-semibold">Patient Experience Report Card</h1>
            <p className="xl:text-2xl text-base text-[#5C5C5C] !font3 text-center sm:py-4 ">A detailed diagnosis of your clinic's operational health.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Score & Core Diagnosis */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
                <GaugeChart score={finalScore} color={tier.color} />

                {tier.color}
                
                <div className="mt-8 text-center w-full">
                  <div 
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-bold font-inter uppercase tracking-wider mb-4"
                    style={{ backgroundColor: `${tier.color}15`, color: tier.color }}
                  >
                    {tier.status}
                  </div>
                  
                  <div className="space-y-4 text-left bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div>
                        <div className="text-lg font-light font-interdisplay-light text-[#171717] uppercase leading-tight mb-4 flex items-center gap-3">
                            <AlertTriangle /> The Diagnosis
                        </div>
                        <h3 className="font-semibold font-inter text-[#171717] leading-tight mb-2">{tier.headline}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {tier.description}
                        </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Fix Box */}
              <div className="bg-[#0CA039] p-6 rounded-3xl text-white shadow-lg shadow-green-200">
                <div className="flex items-center gap-2 text-lg text-green-100 mb-3 uppercase font-light font-interdisplay-light leading-tight">
                  <CheckCircle /> Highest Priority Action
                </div>
                <p className="text-lg font-semibold leading-snug">
                  {primaryFix}
                </p>
              </div>
            </div>

            {/* Right Column: Detailed Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              
               {/* AI Section */}
               <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
                </div>
                <h2 className="text-xl font-light font-interdisplay-light text-white leading-tight mb-4 flex items-center gap-3 tracking-wider">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0CA039] text-[10px] font-bold">AI</span>
                  Strategic Analysis
                </h2>
                
                {isGenerating ? (
                  <div className="space-y-4 animate-pulse max-w-lg">
                    <div className="h-2 bg-slate-700 rounded w-full"></div>
                    <div className="h-2 bg-slate-700 rounded w-5/6"></div>
                    <div className="h-2 bg-slate-700 rounded w-4/6"></div>
                  </div>
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none">
                    {personalizedAdvice.split('\n').map((para, i) => (
                      <p key={i} className="text-slate-300 leading-relaxed mb-4 last:mb-0 font-inter">
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Checklist Breakdown */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-light font-interdisplay-light text-[#171717] leading-tight tracking-wide mb-4 flex items-center gap-3">Detailed Gap Analysis</h3>
                <div className="space-y-6">
                  {QUESTIONS.map((q) => {
                    const answer = answers[q.id];
                    // Recalculate optimal status for display
                    const isOptimal = q.reverseScore ? answer === false : answer === true;
                    
                    return (
                      <div key={q.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${isOptimal ? 'bg-slate-50 border-transparent' : 'bg-red-50 border-red-100'}`}>
                        <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm ${isOptimal ? 'bg-green-100 text-green-600' : 'bg-red-200 text-red-600'}`}>
                          {isOptimal ? '✓' : '!'}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold leading-tight mb-1 ${isOptimal ? 'text-slate-700' : 'text-red-900'}`}>
                            {q.text}
                          </p>
                          
                          {/* Only show Insight if they got it wrong */}
                          {!isOptimal && (
                             <div className="mt-2 text-sm text-red-800/80 bg-red-100/50 p-3 rounded-lg italic">
                               "{q.failureInsight}"
                             </div>
                          )}
                          
                          <div className="mt-2 flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isOptimal ? 'text-green-600' : 'text-red-500'}`}>
                                {isOptimal ? 'Optimized' : 'Revenue Leak'}
                            </span>
                            {!isOptimal && (
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    • Priority Level {q.priority}
                                </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-blue-600 rounded-3xl p-8 text-center text-white shadow-xl shadow-blue-200">
                <h3 className="text-2xl font2 font-bold mb-2">Ready to Plug the Leaks?</h3>
                <p className="text-blue-100 mb-6 text-base xl:text-xl !font3 text-center sm:py-4 ">Schedule a free 30-minute Journey Audit to see how we can automate these steps for you.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/elevate/contact-us" className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                    Book Your Free Audit
                  </Link>
                  <button 
                    onClick={() => {
                      setAppState(AppState.LANDING);
                      setCurrentStep(0);
                      setAnswers({});
                    }}
                    className="w-full sm:w-auto bg-blue-500 cursor-pointer font-inter text-white border border-blue-400 px-8 py-4 rounded-xl font-bold hover:bg-blue-500/80 transition-colors"
                  >
                    Retake Assessment
                  </button>
                  {personalizedAdvice && !isGenerating && (
                    <>
                      <button
                        onClick={() => setShowModal(true)}
                        className="w-full sm:w-auto bg-transparent border border-white text-white px-8 py-4 rounded-xl font-bold cursor-pointer transition-colors"
                      >
                        Download PDF
                      </button>
                      {/* <PdfForm 
                        finalScore={finalScore}
                        tier={tier}
                        personalizedAdvice={personalizedAdvice}
                        QUESTIONS={QUESTIONS}
                        answers={answers}
                        primaryFix={primaryFix}
                      /> */}
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={() => setShowModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full min-h-[650px] max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="flex items-center justify-end px-6 pt-4 pb-0">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors ml-auto"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto">
                {finalScore !== undefined && tier && personalizedAdvice && QUESTIONS && answers && primaryFix ? (
                  <PracticeScoreForm
                    finalScore={finalScore}
                    tier={tier}
                    personalizedAdvice={personalizedAdvice}
                    QUESTIONS={QUESTIONS}
                    answers={answers}
                    primaryFix={primaryFix}
                    onClose={() => setShowModal(false)}
                  />
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading form data...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
