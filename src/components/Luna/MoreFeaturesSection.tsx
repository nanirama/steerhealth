'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const features = [
    {
        title: "Self-Service Navigation",
        description: "Effortlessly Navigating to Essential Digital Tools",
        content:
            "Luna acts as a smart digital guide, directing patients exactly where they need to go—no confusion, no wait times.",
        image: "/images/luna/feature-img.webp",
        statLabel: "Auto-resolution",
        statValue: "+92%",
        icon: "/images/luna/mfeatures-icon-1.svg",
        activeIcon: "/images/luna/mfeatures-icon-active-1.svg",
    },
    {
        title: "Fastest Time-to-Value",
        description: "Fast-track implementation, up and running in days",
        content:
            "Get Luna deployed and delivering ROI within days, not months — saving staff hours instantly.",
        image: "/images/luna/feature-img.webp",
        statLabel: "Setup Speed",
        statValue: "5 Days",
        icon: "/images/luna/mfeatures-icon-2.svg",
        activeIcon: "/images/luna/mfeatures-icon-active-2.svg",
    },
    {
        title: "Amplify Digital Scheduling",
        description: "Time-slot utilization for clinician productivity",
        content:
            "Luna automates scheduling workflows, maximizing clinician utilization and improving patient throughput.",
        image: "/images/luna/feature-img.webp",
        statLabel: "Efficiency Boost",
        statValue: "+65%",
        icon: "/images/luna/mfeatures-icon-3.svg",
        activeIcon: "/images/luna/mfeatures-icon-active-3.svg",
    },
    {
        title: "No Maintenance Required",
        description: "Accurate data with 24/7 automatic updates",
        content:
            "Enjoy zero-maintenance AI. Luna keeps itself up to date with the latest workflows and data in real time.",
        image: "/images/luna/feature-img.webp",
        statLabel: "Maintenance",
        statValue: "0 Hours",
        icon: "/images/luna/mfeatures-icon-4.svg",
        activeIcon: "/images/luna/mfeatures-icon-active-4.svg",
    },
    {
        title: "Easy To Scale",
        description: "Add skills as you scale with no training required",
        content:
            "Expand Luna’s capabilities instantly without retraining or downtime — scalability that grows with you.",
        image: "/images/luna/feature-img.webp",
        statLabel: "Scalability",
        statValue: "Infinite",
        icon: "/images/luna/mfeatures-icon-5.svg",
        activeIcon: "/images/luna/mfeatures-icon-active-5.svg",
    },
    {
        title: "Omnichannel Flexibility",
        description: "Sync across web, phone, SMS & more",
        content:
            "Whether voice, chat, or text, Luna connects seamlessly across every channel for a unified experience.",
        image: "/images/luna/feature-img.webp",
        statLabel: "Channels",
        statValue: "5+",
        icon: "/images/luna/mfeatures-icon-6.svg",
        activeIcon: "/images/luna/mfeatures-icon-active-6.svg",
    },
];

const MoreFeaturesSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="bg-white mx-auto p-4">
            <div className="md:max-w-[1366px] w-full mx-auto lg:py-20 py-10">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Section Label */}
                    <div className="mx-auto w-full inline-flex items-center justify-center">
                        <h5 className="border border-[#2160FD] text-[#2160FD] text-base text-center mx-auto inline-flex flex-row gap-2 items-center rounded-full py-1 px-2">
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.75 0.881663C5.88808 0.881663 6 0.993583 6 1.13166V5.88166C6 6.01972 5.88808 6.13166 5.75 6.13166H1C0.86192 6.13166 0.75 6.01972 0.75 5.88166V1.13166C0.75 0.993583 0.86192 0.881663 1 0.881663H5.75ZM4.9375 1.94416H1.8125V5.06916H4.9375V1.94416ZM12.6458 3.31425C12.7435 3.41188 12.7435 3.57017 12.6458 3.6678L9.8174 6.49624C9.7198 6.59386 9.5615 6.59386 9.4638 6.49624L6.63542 3.6678C6.5378 3.57017 6.5378 3.41188 6.63542 3.31425L9.4639 0.485813C9.5615 0.388193 9.7198 0.388193 9.8174 0.485813L12.6458 3.31425ZM11.32 3.49102L9.6406 1.81166L7.96125 3.49103L9.6406 5.17041L11.32 3.49102ZM5.75 7.13166C5.88808 7.13166 6 7.24359 6 7.38166V12.1317C6 12.2698 5.88808 12.3817 5.75 12.3817H1C0.86192 12.3817 0.75 12.2698 0.75 12.1317V7.38166C0.75 7.24359 0.86192 7.13166 1 7.13166H5.75ZM4.9375 8.19416H1.8125V11.3192H4.9375V8.19416ZM12 7.13166C12.1381 7.13166 12.25 7.24359 12.25 7.38166V12.1317C12.25 12.2698 12.1381 12.3817 12 12.3817H7.25C7.11192 12.3817 7 12.2698 7 12.1317V7.38166C7 7.24359 7.11192 7.13166 7.25 7.13166H12ZM11.1875 8.19416H8.0625V11.3192H11.1875V8.19416Z" fill="#2160FD" />
                            </svg>
                            More Features
                        </h5>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-12">
                        {features.map((item, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <div
                                    key={index}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                    className={`flex flex-col gap-2 cursor-pointer group transition-all duration-200 ${isActive ? "scale-105" : ""
                                        }`}
                                >
                                    <div
                                        className={`shadow-[0px_3.46px_17.32px_0px_#170F4924] mb-3 w-[65px] h-[65px] rounded-[8px] flex items-center justify-center transition-all duration-300 ${isActive ? "bg-white" : "bg-white"
                                            }`}
                                    >
                                        <Image
                                            src={isActive && item.activeIcon ? item.activeIcon : item.icon}
                                            alt={`${item.title} icon`}
                                            width={32}
                                            height={32}
                                            className={`transition-all duration-200 ${isActive ? "" : "grayscale"}`}
                                        />
                                    </div>

                                    <h4 className="text-[#0F0F0F] text-lg font-bold font2 leading-[21px]">
                                        {item.title}
                                    </h4>
                                    <p className="text-[#1D1E20] text-sm font-medium">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Animated Detail Section */}
                    <AnimatePresence mode="wait">
                        {activeIndex !== null && (
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40 }}
                                transition={{ duration: 0.4 }}
                                className="mt-10"
                            >
                                <div className="grid md:grid-cols-3 gap-10 mt-16">
                                    <div>
                                        <Image
                                            src={features[activeIndex].image}
                                            alt={features[activeIndex].title}
                                            width={500}
                                            height={400}
                                            className="w-full rounded-lg"
                                        />
                                    </div>

                                    <div className="md:col-span-2 flex md:flex-row flex-col md:gap-16 gap-8 sm:p-8 p-4 border border-black/10 rounded-[24px] shadow-[0px_0px_20px_0px_#0000000D]">
                                        <div className="md:w-5/12 w-full flex justify-between items-start flex-col">
                                            <h5 className="border border-[#2160FD] text-[#2160FD] text-base inline-flex flex-row gap-2 items-center rounded-full py-1 px-2">
                                                {features[activeIndex].statLabel}
                                            </h5>
                                            <div className="flex flex-col gap-2">
                                                <h4 className="text-base text-black max-w-60">
                                                    {features[activeIndex].description}
                                                </h4>
                                                <h3 className="md:text-[70px] text-[48px] font-semibold font2 text-black">
                                                    {features[activeIndex].statValue}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="md:w-7/12 w-full">
                                            <p className="text-sm text-[#1D1E20] mb-4 leading-[20px]">
                                                {features[activeIndex].content}
                                            </p>
                                            <p className="text-sm text-[#1D1E20] mb-4 leading-[20px]">
                                                Luna makes complex workflows feel effortless — reducing
                                                support load and increasing productivity.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default MoreFeaturesSection;
