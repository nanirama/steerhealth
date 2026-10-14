"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Head from 'next/head';

const CategoryModal = ({ categories }) => {
    const [selected, setSelected] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setSelected(true)}
                className="inline-flex items-center cursor-pointer gap-2 rounded-lg border border-blue-500 px-3 py-1.5 text-base font-medium text-[#335CFF] hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition"
            >
                {/* Inline SVG filter icon */}
                <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5746 1.72727V2.11847C19.3889 2.68774 19.0638 2.90362 18.4917 2.94184H1.13117C0.579244 2.89929 0.262173 2.66213 0.0859375 2.11847V1.72727C0.250373 1.21513 0.565161 0.947238 1.09311 0.904297H18.5298C19.0805 0.943299 19.3991 1.18637 19.5746 1.72688V1.72727Z" fill="#2160FD" />
                    <path d="M11.8462 12.9531C10.5753 12.8404 9.05233 13.104 7.81145 12.9531C6.61929 12.8085 6.52337 11.0136 7.98083 10.9175C9.02645 10.8486 10.6761 10.8367 11.7145 10.9179C13.0589 11.0227 13.1118 12.7104 11.8462 12.9531Z" fill="#2160FD" />
                    <path d="M15.6752 7.9459H3.99115C2.71563 7.82614 2.68822 6.09982 3.92492 5.92333L15.6752 5.91309C16.9755 6.03521 16.9751 7.82377 15.6752 7.9459Z" fill="#2160FD" />
                </svg>
                Filters
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
                        className="relative w-[90%] md:w-full md:max-w-[600px] bg-white rounded-lg overflow-hidden p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Icon */}
                        <button
                            onClick={() => setSelected(false)}
                            aria-label="Close"
                            className="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
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

                        {/* Modal Content */}
                        <div className="flex flex-col items-center justify-center min-h-[300px]">
                            <h2 className="text-2xl font2 font-semibold leading-[100%] text-[#1D1718] mb-6">Select Category</h2>
                            
                            {/* Categories Grid */}
                            <div className="flex flex-wrap gap-3 justify-center items-center max-w-full">
                                {categories && categories.length > 0 ? (
                                    categories.map((category, index) => (
                                        <Link
                                            href={`/blog/${category.slug}`}
                                            key={category.slug || index}
                                            className="cursor-pointer bg-white border border-gray-300 text-xl font-medium text-[#0A0D14] font2 leading-[120%] transition-colors px-4 py-2.5 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
                                            
                                        >
                                            {category.title}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No categories available</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default CategoryModal;