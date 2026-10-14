"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventPdfForm from "../Elements/EventPdfForm";



const EventPdfModal = ({ isModalOpen, setIsModalOpen, handleModalToggle, selected }) => {

    const [formLoaded, setFormLoaded] = useState(false);



    // Disable body scroll when modal is open
    useEffect(() => {
        if (selected) {
            //document.body.style.overflow = 'hidden';
            //document.body.style.paddingRight = '15px'; // Prevent layout shift from scrollbar
             document.body.classList.add('modal-open');
        } else {
            //document.body.style.overflow = 'unset';
            //document.body.style.paddingRight = '0px';
            document.body.classList.remove('modal-open');
        }

        return () => {
            //document.body.style.overflow = 'unset';
            //document.body.style.paddingRight = '0px';
            document.body.classList.remove('modal-open');
        };
    }, [selected]);

    

    return (
        <>


            <div className="fixed inset-0 w-full h-full z-[9999]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => handleModalToggle(false)}
                />

                <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 pointer-events-none">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-[95%] sm:max-w-[85%] md:max-w-[600px] min-h-[500px] max-h-[90vh] bg-white rounded-xl shadow-2xl pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => handleModalToggle(false)}
                            aria-label="Close"
                            className="absolute top-3 right-3 z-20 group bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 text-gray-500 hover:text-red-500 rounded-full p-2 sm:p-2.5 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:rotate-90"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <EventPdfForm selected={selected} formId={`d1a1b4c3-0ae1-458a-80dc-c0ca0e0f5f35`} setIsModalOpen={setIsModalOpen}/>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default EventPdfModal;