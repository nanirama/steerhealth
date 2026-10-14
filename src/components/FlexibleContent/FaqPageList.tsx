'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortableText } from '@portabletext/react'

type FAQItemProps = {
    question: any;
    answer: any;
    isOpen: boolean;
    onClick: () => void;
};

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <div className="border-b border-black/20 my-2 overflow-hidden">
            <button
                className="flex items-center justify-between gap-4 w-full py-4 cursor-pointer text-left text-[#1D1718] leading-[140%] text-xl font3"
                onClick={onClick}
            >
                {question}
                <span
                    className={`transform transition-transform border-dashed border border-dashed-[#1D1718] rounded-full md:p-2 p-1 ${isOpen ? 'rotate-180' : ''}`}
                >
                    {isOpen ? (
                        // Minus icon
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path d="M4.16699 9.16699H15.8337V10.8337H4.16699V9.16699Z" fill="#1D1718" />
                        </svg>
                    ) : (
                        // Plus icon
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M9.16699 9.16699V4.16699H10.8337V9.16699H15.8337V10.8337H10.8337V15.8337H9.16699V10.8337H4.16699V9.16699H9.16699Z"
                                fill="#1D1718"
                            />
                        </svg>
                    )}
                </span>

            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden bg-white"
                    >
                        <PortableText
                            value={answer}
                            components={{
                                block: {
                                    normal: ({ children }) => <p className="text-[#1D1718] text-[17px] pb-4">{children}</p>,
                                },
                                marks: {
                                    strong: ({ children }) => <span className="text-[#344EAD]">{children}</span>,
                                },
                                list: {
                                    bullet: ({ children }) => (
                                        <ul className="list-disc pl-6 space-y-2 text-[#5C5C5C] my-3">{children}</ul>
                                    ),
                                    number: ({ children }) => (
                                        <ol className="list-decimal pl-6 space-y-2 text-[#5C5C5C] my-3">{children}</ol>
                                    ),
                                },

                                listItem: {
                                    bullet: ({ children }) => (
                                        <li className="leading-relaxed text-[17px] leading-[140%] font-normal text-[#1D1718]">{children}</li>
                                    ),
                                    number: ({ children }) => (
                                        <li className="leading-relaxed text-[17px] leading-[140%] font-normal text-[#1D1718]">{children}</li>
                                    ),
                                },
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FaqPageList = ({ faqs }: any) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);



    const handleClick = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <div className="mx-auto mt-10">
            {faqs.map((faq: any, index: number) => (
                <FAQItem
                    key={index}
                    {...faq}
                    isOpen={openIndex === index}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};

export default FaqPageList;
