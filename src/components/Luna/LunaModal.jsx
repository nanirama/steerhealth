"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import LunaVoiceForm from "@/components/Luna/LunaVoiceForm";
import Image from "next/image";
import LunaPopupImg from "../../../public/images/luna/luna-popup-img.webp"

export default function LunaModal({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }

        return () => document.body.classList.remove("modal-open");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999]">
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/50 backdrop-blur-sm "
                //onClick={onClose}
            />

            {/* Modal Box */}
            <div className="absolute inset-0 flex items-center justify-center lg:p-4 pointer-events-none ">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative w-full max-w-3xl shadow-sm rounded-[24px] bg-white overflow-hidden pointer-events-auto grid grid-cols-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute top-3 right-3 z-20 group bg-white  text-gray-500 hover:text-gray-900 rounded-full size-8 flex items-center justify-center transition-all hover:scale-105"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L13 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M13 1L1 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* 🧠 Render LunaVoiceForm here */}
                        <div>
                            <LunaVoiceForm
                                onClose={onClose}
                            />
                        </div>

                    </div>
                    <div className="h-full w-full">
                        <Image src={LunaPopupImg} alt="LunaPopupImg" className="w-full h-full" />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
