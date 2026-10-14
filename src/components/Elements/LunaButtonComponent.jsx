"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PopupCall from "../../../public/images/popup-call.png"

const LunaButtonComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    return (
        <>
            {/* Buttons */}
            <div className="inline-flex gap-4 mx-auto my-8">
                <button
                    aria-label="Call Luna"
                    onClick={() => setIsOpen(true)}
                    className="inline-flex transition-all duration-200 bg-[#335CFF] cursor-pointer group relative flex-row gap-2 items-center justify-between leading-[24px] text-white font-medium rounded-[8px] py-3 md:px-4 px-2 text-sm"
                >
                    Call Luna
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                    >
                        <path
                            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <button
                    aria-label="Receive Call"
                    onClick={() => setIsOpen2(true)}
                    className="transition-all duration-200 border border-[#335CFF] bg-white cursor-pointer leading-[24px] text-[#171717] font-medium rounded-[8px] py-3 md:px-4 px-2 text-sm"
                >
                    Receive Call
                </button>
            </div>

            {/* Popup Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#c9d4ef] rounded-2xl sm:p-12 p-6 md:max-w-2xl max-w-lg w-full relative shadow-lg mx-4"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close"
                                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L13 13" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M13 1L1 13" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </button>

                            {/* Modal Content */}
                            <h2 className="text-xl font3 text-[#5D5D5D] mb-4">Our call centre team is available 24 hours</h2>
                            <div className="sm:text-[48px] text-2xl font2 text-black flex flex-row gap-4 items-center justify-center">
                                <Image src={PopupCall} alt="PopupCall" width={65} height={64} />
                                (214) 945-2952</div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#c9d4ef] rounded-2xl sm:p-12 p-6 md:max-w-2xl max-w-lg w-full relative shadow-lg mx-4"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen2(false)}
                                aria-label="Close"
                                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L13 13" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M13 1L1 13" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </button>

                            {/* Modal Content */}
                            <h2 className="text-xl font3 text-black mb-4">Enter your phone number</h2>
                            <h3 className="text-sm text-[#5D5D5D] font3">Typical response time is 30-40 Mins once you request a call</h3>
                            <div>
                                <input type="text" placeholder="(000)- 000-000" className="border border-white font2 sm:text-[48px] text-2xl max-w-md mx-auto text-white/50 rounded-[12px] py-1 px-4 mt-3" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
};

export default LunaButtonComponent;
