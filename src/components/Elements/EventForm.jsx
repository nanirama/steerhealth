"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";



const EventForm = ({ selected, formId, content }) => {
    const [formLoaded, setFormLoaded] = useState(false);

    // Default formId if not provided
    const resolvedFormId = formId;
    const router = useRouter();


    useEffect(() => {
        if (selected) {
            const loadForm = () => {
                if (window.hbspt) {
                    setFormLoaded(true);
                    window.hbspt.forms.create({
                        region: "na1",
                        portalId: "19993171",
                        formId: resolvedFormId,
                        target: "#hubspot-form-container",
                        onFormSubmitted: () => {
                            router.push("/events/on-demand-video-periop-panel/thank-you");
                            return false;
                        },
                        onFormReady: (form) => {
                            // Watch for HubSpot trying to add thank-you markup
                            const observer = new MutationObserver(() => {
                                const thankYou = form.querySelector(".submitted-message");
                                if (thankYou) thankYou.remove();
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
        }
    }, [selected, resolvedFormId]);

    return (
        <>
            <div className="py-4 sm:py-6 h-full overflow-y-auto">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 text-center">
                    Get video access now
                </h2>

                {/* HubSpot Form Container */}
                <div className="flex justify-center flex-1">
                    <div className="w-full max-w-sm sm:!max-w-[500px]">
                        {!formLoaded ? (
                            <div className="text-gray-600 text-center py-6 sm:py-8">
                                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto mb-3 sm:mb-4"></div>
                                <span className="text-sm sm:text-base">Loading form...</span>
                            </div>
                        ) : (
                            <>
                                <div
                                    id="hubspot-form-container"
                                    className="hubspot-form-wrapper"
                                    style={{
                                        minHeight: formLoaded ? 'auto' : '300px'
                                    }}
                                />
                                {content && (
                                    <PortableText
                                        value={content}
                                        components={{
                                            block: {
                                                normal: ({ children }) => (
                                                    <p className="text-base leading-[125%] font-normal text-black my-3 py-2 font3">
                                                        {children}
                                                    </p>
                                                ),
                                            },
                                            marks: {
                                                link: ({ value, children }) => {
                                                    const href = value?.href || "#";
                                                    return (
                                                        <a
                                                            href={href}
                                                            target={href.startsWith("http") ? "_blank" : undefined}
                                                            rel="noopener noreferrer"
                                                            className="text-[#335cff] hover:text-blue-800 underline font-medium"
                                                        >
                                                            {children}
                                                        </a>
                                                    );
                                                },
                                            },
                                        }}
                                    />
                                )}
                            </>
                        )}

                    </div>
                </div>
            </div>


            {/* Add custom styles for HubSpot form */}
            <style jsx>{`
                           
                            /* Hide scrollbars */
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                            .scrollbar-hide {
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }

                           
                            .meeting-wrapper {
                            width: 100%;
                            max-width: 1200px; /* optional if you want to cap width */
                            margin: 0 auto;
                            -ms-overflow-style: none; /* IE/Edge */
                                scrollbar-width: none; /* Firefox */
                            }

                            .meeting-iframe {
                                width: 100% !important;
                                height: 600px; /* or fixed px like 800px */
                                border: none;
                                display: block;
                                -ms-overflow-style: none; /* IE/Edge */
                                scrollbar-width: none; /* Firefox */
                            }
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

export default EventForm;