"use client";

import React, { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import ImageComponent from "../Elements/ImageComponent";


const tabData = [
    {
        title: "Hospitals",
        description: "Explore our hospital services and discover a new standard of care.",
        thumbs: [
            {
                src: 'tabslider-img1.webp',
                mainImage: 'tabslider-img1.webp',
                title: "90%",
                description: "Reduction in patient intake and registration time across Prime facilities",
                title2: "50+",
                description2: "Prime hospitals activated with Steer’s digital front door in the first rollout phase",
                buttons: ["Digital Front Door", "Steer Notes"],
            },
            {
                src: 'iceland-derm-logo.webp',
                mainImage: 'solutions-how-steer-img.webp',
                title: "Forest Trek",
                description: "Walk through dense woods and uncover hidden trails.",
                buttons: ["Start Now", "Get Info"],
            },
            {
                src: 'orthowest-logo.webp',
                mainImage: 'solutions-clinics-beforeafter-img1.webp',
                title: "Mountain View",
                description: "Climb to peaks and soak in majestic views.",
                buttons: ["Climb", "More"],
            },
        ],
    },
    {
        title: "ASC’s",
        description: "Discover efficient, high-quality care in our Ambulatory Surgical Centers.",
        thumbs: [
            {
                src: "tstmnl-client1.webp",
                mainImage: "solutions-how-steer-img.webp",
                title: "90%",
                description: "Reduction in patient intake and registration time across Prime facilities",
                title2: "50+",
                description2: "Prime hospitals activated with Steer’s digital front door in the first rollout phase",
                buttons: ["Digital Front Door", "Steer Notes"],
            },
            {
                src: "iceland-derm-logo.webp",
                mainImage: "solutions-how-steer-img.webp",
                title: "Forest Trek",
                description: "Walk through dense woods and uncover hidden trails.",
                buttons: ["Start Now", "Get Info"],
            },
            {
                src: "orthowest-logo.webp",
                mainImage: "solutions-clinics-beforeafter-img1.webp",
                title: "Mountain View",
                description: "Climb to peaks and soak in majestic views.",
                buttons: ["Climb", "More"],
            },
        ],
    },
    {
        title: "Clinics",
        description: "Visit our clinics for expert consultations and personalized treatments.",
        thumbs: [
            {
                src: "iceland-derm-logo.webp",
                mainImage: "solutions-clinics-beforeafter-img1.webp",
                title: "90%",
                description: "Reduction in patient intake and registration time across Prime facilities",
                title2: "50+",
                description2: "Prime hospitals activated with Steer’s digital front door in the first rollout phase",
                buttons: ["Digital Front Door", "Steer Notes"],
            },
            {
                src: "iceland-derm-logo.webp",
                mainImage: "solutions-how-steer-img.webp",
                title: "Forest Trek",
                description: "Walk through dense woods and uncover hidden trails.",
                buttons: ["Start Now", "Get Info"],
            },
            {
                src: "orthowest-logo.webp",
                mainImage: "solutions-clinics-beforeafter-img1.webp",
                title: "Mountain View",
                description: "Climb to peaks and soak in majestic views.",
                buttons: ["Climb", "More"],
            },
        ],
    },
];

const SteerPowersFutureOfCare = ({ data }: any) => {
    const [activeTab, setActiveTab] = useState(0);
    const [thumbIndexes, setThumbIndexes] = useState(
        tabData.map(() => 0) // Start with first thumb selected for each tab
    );

    const handleTabChange = (index: number) => {
        setActiveTab(index);
    };

    const handleThumbClick = (thumbIdx: number, tabIndex: number) => {
        setThumbIndexes((prev) => {
            const updated = [...prev];
            updated[tabIndex] = thumbIdx;
            return updated;
        });
    };


    const currentTab = tabData[activeTab];
    const currentThumbIndex = thumbIndexes[activeTab];
    const currentThumb = currentTab.thumbs[currentThumbIndex];

    return (
        <div className="w-full pt-12 md:pb-60 pb-32 px-4 max-w-7xl mx-auto">
            <h2 className="md:text-[60px] leading-[100%] text-[40px] font-semibold text-[#171717] font2 mb-6">
                See how Steer powers the future of care
            </h2>

            {/* Tabs */}
            <div className="flex gap-4 mb-12">
                {tabData.map((tab, index) => (
                    <button
                        aria-label="tab"
                        key={index}
                        onClick={() => handleTabChange(index)}
                        className={classNames(
                            "sm:px-4 px-3 py-2 sm:text-2xl text-base cursor-pointer transition-all bg-[#F7F7F7] rounded-[10px]",
                            activeTab === index
                                ? "bg-black text-white"
                                : "rounded-[10px] "
                        )}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="grid grid-cols-12 gap-6 items-center">
                {/* Text Section */}
                <div className="col-span-12 md:col-span-4">
                    <div className="">
                        <h2 className="relative pl-4 text-3xl font-bold mb-4 after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-[20px] after:w-[2px] after:bg-[#0278FC]">
                            {currentThumb.title}
                        </h2>

                        <p className="text-gray-600 mb-6">{currentThumb.description}</p>
                    </div>
                    <div className="">
                        <h2 className="text-3xl font-bold mb-4 relative pl-4 after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-[20px] after:w-[2px] after:bg-[#0278FC]">{currentThumb.title2}</h2>
                        <p className="text-gray-600 mb-6">{currentThumb.description2}</p>
                    </div>
                    <h4 className="text-2xl font2 font-semibold text-[#171717] relative pl-4 after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-[20px] after:w-[2px] after:bg-[#0278FC]">Products</h4>
                    <div className="inline-flex gap-4 flex-col mt-4">
                        {currentThumb.buttons.map((btn, i) => (
                            <button
                                aria-label={btn}
                                key={i}
                                className={classNames(
                                    "px-4 py-2 rounded-[8px] inline-flex flex-row gap-4 items-center cursor-pointer text-sm font-medium",
                                    i === 0
                                        ? "border border-[#335CFF] text-[#335CFF]"
                                        : "border border-[#335CFF] text-[#335CFF]"
                                )}
                            >
                                {btn}
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.79551 4.99956L0.0830078 1.28706L1.14351 0.226562L5.91651 4.99956L1.14351 9.77256L0.0830078 8.71206L3.79551 4.99956Z" fill="#335CFF" />
                                </svg>

                            </button>
                        ))}

                    </div>
                </div>

                {/* Image Section */}
                <div className="col-span-12 md:col-span-8 relative">
                    <ImageComponent
                        src={`tabslider-img1.webp`}
                        alt="Main"
                        width={870}
                        height={450}
                        className="rounded-[8px] h-[400px] w-full object-cover shadow-[0px_13px_27px_-5px_#32325D40] transition-all duration-300 relative"
                    />
                   
                    <Link href="/case-studies/oc-surgeons" className="absolute left-4 bottom-4 text-white text-sm z-10">Read story  → </Link>
                    <div className="absolute inset-0 w-full h-full bg-[linear-gradient(0deg,_#7A1434_-20.63%,_rgba(224,37,96,0.01)_100%)] rounded-[8px]"></div>

                    {/* Thumbnails */}
                    <div className="absolute sm:-bottom-32 -bottom-20 right-4 left-0 w-full float-right flex items-center justify-end gap-4">
                        {currentTab.thumbs.map((thumb, idx) => (
                            <div className="" key={idx}>
                                <ImageComponent
                                    src={thumb.src}
                                    alt={`Thumb ${idx + 1}`}
                                    width={400}
                                    height={40}
                                    className={classNames(
                                        "cursor-pointer w-[400px] pt-10 object-cover sm:px-10 px-2 transition-all overflow-hidden",
                                        currentThumbIndex === idx
                                            ? " border-t border-[#7A1443]"
                                            : "grayscale opacity-80 border-t border-transparent"
                                    )}
                                    onClick={() => handleThumbClick(idx, activeTab)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SteerPowersFutureOfCare;
