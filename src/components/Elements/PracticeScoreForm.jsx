"use client";
import { useState, useEffect } from "react";
import { usePdfGenerator } from "@/hooks/usePdfGenerator";

const PracticeScoreForm = ({
    finalScore,
    tier,
    personalizedAdvice,
    QUESTIONS,
    answers,
    primaryFix,
    onClose
}) => {
    const [formLoaded, setFormLoaded] = useState(false);
    const { generatePdf, loading } = usePdfGenerator();

    // Default formId if not provided
    const resolvedFormId = "00dd4ffd-6cac-4e04-acc1-093ddbb52be9";

    // Verify props are received properly
    useEffect(() => {
        if (finalScore !== undefined && tier && personalizedAdvice && QUESTIONS && answers && primaryFix) {
            console.log("PracticeScoreForm props received successfully:", {
                finalScore,
                tier: tier.status,
                personalizedAdviceLength: personalizedAdvice.length,
                questionsCount: QUESTIONS.length,
                answersCount: Object.keys(answers).length,
                primaryFix
            });
        } else {
            console.warn("PracticeScoreForm: Some props are missing", {
                hasFinalScore: finalScore !== undefined,
                hasTier: !!tier,
                hasPersonalizedAdvice: !!personalizedAdvice,
                hasQUESTIONS: !!QUESTIONS,
                hasAnswers: !!answers,
                hasPrimaryFix: !!primaryFix
            });
        }
    }, [finalScore, tier, personalizedAdvice, QUESTIONS, answers, primaryFix]);

    // Transform props to PdfData format
    const transformToPdfData = () => {
        // Determine score status
        let status = 'good';
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
                icon: 'check',
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

        // Create buttons array with explicit link properties
        const ctaButtons = [
            { 
                text: 'Book Your Free Audit', 
                variant: 'primary', 
                link: 'https://steerhealth.io/elevate/contact-us' 
            },
            { 
                text: 'Retake Assessment', 
                variant: 'secondary', 
                link: 'https://steerhealth.io/elevate/practice-score' 
            },
        ];
        
        // Debug: Verify buttons have links
        console.log('transformToPdfData - ctaButtons created:', ctaButtons);
        console.log('transformToPdfData - button 0 has link?', 'link' in ctaButtons[0], ctaButtons[0].link);
        console.log('transformToPdfData - button 1 has link?', 'link' in ctaButtons[1], ctaButtons[1].link);

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
                color: tier.color,
                statusText: tier.status,
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
                buttons: ctaButtons,
            },
        };
    };

    useEffect(() => {
        const loadForm = () => {
                if (window.hbspt) {
                    setFormLoaded(true);
                    window.hbspt.forms.create({
                        region: "na1",
                        portalId: "19993171",
                        formId: resolvedFormId,
                        target: "#hubspot-form-container",
                        onFormSubmitted: async (form, data) => {
                            console.log("Form submitted!");
                            console.log("HubSpot data object:", data);
                            
                            // Close modal before generating PDF
                            if (onClose) {
                                onClose();
                            }
                            
                            // Generate PDF after form submission
                            try {
                                const pdfData = transformToPdfData();
                                console.log("PracticeScoreForm - full PDF data:", JSON.stringify(pdfData, null, 2));
                                console.log("PracticeScoreForm - sending PDF data buttons:", pdfData.cta?.buttons);
                                console.log("PracticeScoreForm - button 0 link:", pdfData.cta?.buttons?.[0]?.link);
                                console.log("PracticeScoreForm - button 1 link:", pdfData.cta?.buttons?.[1]?.link);
                                await generatePdf(pdfData);
                            } catch (error) {
                                console.error("Error generating PDF:", error);
                            }
                        },
                        onFormReady: (form) => {
                            // Watch for HubSpot trying to add thank-you markup
                            const observer = new MutationObserver(() => {
                                const thankYou = form.querySelector(".submitted-message");
                                //if (thankYou) thankYou.remove();
                            });
                            observer.observe(form, { childList: true, subtree: true });
                        },
                    });
                }
            };

            if (!window.hbspt) {
                const script = document.createElement("script");
                script.src = "https://js.hsforms.net/forms/embed/v2.js";
                script.async = true;
                script.onload = loadForm;
                document.body.appendChild(script);
            } else {
                loadForm();
            }
    }, [resolvedFormId]);

    return (
        <>
            <div className="pb-4 pt-0 mt-0 sm:p-4 h-full overflow-y-auto">
                <h2 className="text-xl mt-0 sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900 text-center pb-2">
                    Contact Us
                </h2>

                {/* HubSpot Form Container */}
                <div className="flex justify-center flex-1">
                    <div className="w-full max-w-sm sm:!max-w-[500px]">
                        {!formLoaded ? (
                            <div className="text-gray-600 text-center py-6 sm:py-8">
                                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto mb-3 sm:mb-4"></div>
                                <span className="text-sm sm:text-base">Loading form...</span>
                            </div>
                        ) : null}

                        <div
                            id="hubspot-form-container"
                            className="hubspot-form-wrapper"
                            style={{
                                minHeight: formLoaded ? 'auto' : '650px'
                            }}
                        />

                    </div>
                </div>
            </div>


            {/* Add custom styles for HubSpot form */}
            <style jsx>{`
                            .hubspot-form-wrapper :global(.hs-form) {
                                font-family: 'InterDisplay', sans-serif !important;
                            }
                            .hubspot-form-wrapper :global(.hs-form-field) {
                                margin-bottom: 0.75rem !important;
                            }
                            .hubspot-form-wrapper :global(.hs-form-field label) {
                                color: #374151 !important;
                                font-weight: 500 !important;
                                margin-bottom: 0.375rem !important;
                                display: block !important;
                                font-size: 1rem !important;
                                font-family: 'GilroyMedium', sans-serif !important;
                            }
                            .hubspot-form-wrapper :global(.hs-input) {
                                width: 100% !important;
                                padding: 0.625rem 0.75rem !important;
                                border: 1px solid #d1d5db !important;
                                border-radius: 0.5rem !important;
                                font-size: 0.975rem !important;
                                background-color: white !important;
                                color: #111827 !important;
                                box-sizing: border-box !important;
                                font-family: 'GilroyRegular', sans-serif !important;
                            }
                            .hubspot-form-wrapper :global(.hs-input::placeholder) {
                                font-family: 'GilroyRegular', sans-serif !important;
                                color: #9ca3af !important;
                            }
                            .hubspot-form-wrapper :global(.hs-input:focus) {
                                outline: none !important;
                                border-color: #335CFF !important;
                                box-shadow: 0 0 0 3px rgba(51, 92, 255, 0.1) !important;
                            }
                            .hubspot-form-wrapper :global(.hs-button) {
                                background-color: #335CFF !important;
                                color: white !important;
                                cursor: pointer !important;
                                position: relative !important;
                                display: inline-flex !important;
                                flex-direction: row !important;
                                gap: 0.5rem !important;
                                align-items: center !important;
                                justify-content: center !important;
                                line-height: 24px !important;
                                font-weight: 500 !important;
                                border-radius: 8px !important;
                                padding: 0.75rem 1rem !important;
                                font-size: 1rem !important;
                                border: none !important;
                                transition: background-color 0.2s !important;
                                width: 100% !important;
                                margin-top: 1rem !important;
                                font-family: 'InterDisplay', sans-serif !important;
                            }
                            .hubspot-form-wrapper :global(.hs-button:hover) {
                                background-color: #2347e6 !important;
                            }
                            .hubspot-form-wrapper :global(.hs-error-msgs) {
                                color: #ef4444 !important;
                                font-size: 13px !important;
                                margin-top: 0.25rem !important;
                                font-family: 'InterDisplayLight', sans-serif !important;
                            }
                            .hubspot-form-wrapper :global(.hs-error-msg) {
                                color: #ef4444 !important;
                                font-size: 13px !important;
                                font-family: 'InterDisplayLight', sans-serif !important;
                            }
                            .hubspot-form-wrapper :global(.hs-form-field .hs-error-msgs) {
                                color: #ef4444 !important;
                                font-size: 13px !important;
                                font-family: 'InterDisplayLight', sans-serif !important;
                            }
                            .hubspot-form-wrapper :global(.hs-form-field .hs-error-msg) {
                                color: #ef4444 !important;
                                font-size: 13px !important;
                                font-family: 'InterDisplayLight', sans-serif !important;
                            }
                            .hubspot-form-wrapper :global(.hs-error-msgs ul) {
                                color: #ef4444 !important;
                                font-size: 13px !important;
                                font-family: 'InterDisplayLight', sans-serif !important;
                            }
                            .hubspot-form-wrapper :global(.hs-error-msgs li) {
                                color: #ef4444 !important;
                                font-size: 13px !important;
                                font-family: 'InterDisplayLight', sans-serif !important;
                            }
                            .hubspot-form-wrapper :global(.hs-error-msgs label) {
                                color: #ef4444 !important;
                                font-size: 13px !important;
                                font-family: 'InterDisplayLight', sans-serif !important;
                            }
                            /* Catch all error text variations */
                            .hubspot-form-wrapper :global([class*="error"]) {
                                color: #ef4444 !important;
                                font-size: 13px !important;
                                font-family: 'InterDisplayLight', sans-serif !important;
                            }
                            .hubspot-form-wrapper :global(textarea.hs-input) {
                                min-height: 80px !important;
                                resize: vertical !important;
                            }

                            .hubspot-form-wrapper :global(.submitted-message) {
                                border:2px solid red !important;
                                font-family: 'InterDisplay', sans-serif !important;
                            }
                                .meetings-iframe-container :global(.submitted-message),
                                .hubspot-form-wrapper :global(.submitted-message),
                                .hubspot-form-wrapper :global(.hs-form__thank-you),
                                .hubspot-form-wrapper :global([class*="submitted-message"]) {
                                display: none !important;
                                }
                            
                            /* Mobile specific adjustments */
                            @media (max-width: 640px) {
                                .hubspot-form-wrapper :global(.hs-form-field) {
                                    margin-bottom: 0.875rem !important;
                                }
                                .hubspot-form-wrapper :global(.hs-input) {
                                    padding: 0.75rem !important;
                                    font-size: 0.9rem !important;
                                }
                                .hubspot-form-wrapper :global(.hs-button) {
                                    padding: 0.75rem 0.5rem !important;
                                    font-size: 0.875rem !important;
                                }
                            }
                            @media (min-width: 768px) {
                                .hubspot-form-wrapper :global(.hs-button) {
                                    padding: 0.75rem 1rem !important;
                                }
                            }
                        `}</style>
        </>
    );
};

export default PracticeScoreForm;