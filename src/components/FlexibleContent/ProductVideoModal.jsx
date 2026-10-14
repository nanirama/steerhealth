"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Head from 'next/head';

const ProductVideoModal = ({ videoLink }) => {
    const [selected, setSelected] = useState(false);


    return (
        <>
            <Head>
                {/* DNS prefetch for Vimeo domain */}
                <link rel="dns-prefetch" href="//player.vimeo.com" />
                <link rel="dns-prefetch" href="//vimeo.com" />
                
                {/* Preconnect for faster connection */}
                <link rel="preconnect" href="https://player.vimeo.com" />
                
                {/* Prefetch the video page (lightweight preload) */}
                <link rel="prefetch" href={videoLink} />
            </Head>
            <button
                onClick={() => setSelected(true)}
                className="cursor-pointer flex flex-row gap-4 items-center font-medium text-[#171717] text-sm py-3 px-4 border border-[#335CFF] rounded-[8px]"
            >
                <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 14.8302V1.1706C0 0.516079 0.719959 0.117037 1.275 0.463937L12.2027 7.29376C12.7249 7.6201 12.7249 8.38068 12.2027 8.7071L1.275 15.5368C0.719959 15.8838 0 15.4848 0 14.8302Z" fill="#171717" />
                </svg>
                Watch Video
            </button>

            {selected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 md:p-8"
                    onClick={() => setSelected(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-[90%] md:w-full md:max-w-[800px] aspect-video bg-black rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Icon */}
                        <button
                            onClick={() => setSelected(false)}
                            aria-label="Close"
                            className="absolute -top-12 right-0 md:top-4 md:right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Full-size Vimeo Video */}
                        <iframe
                            src={`${videoLink}?autoplay=1&loop=0&muted=0&controls=1`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title="Product Video"
                        />
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default ProductVideoModal;