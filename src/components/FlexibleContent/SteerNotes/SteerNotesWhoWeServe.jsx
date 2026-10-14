"use client"
import React, { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

const SteerNotesWhoWeServe = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!data?.tabs || data.tabs.length === 0) return null;

  const activeTabData = data.tabs[activeTab];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        {data?.title && (
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#171717] text-center mb-12 font2 leading-[100%] tracking-[-2%]">
            {data.title}
          </h2>
        )}

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12  max-w-[430px] mx-auto bg-[#F7F7F7] p-2 rounded-xl">
          {data.tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-lg font-medium text-sm leading-[20px] tracking-[-0.6%] transition-all ${activeTab === index
                  ? 'bg-white text-[#171717] shadow-[0px_2px_4px_0px_#0E121B08,0px_6px_10px_0px_#0E121B0F]'
                  : 'text-gray-500 hover:text-[#171717]'
                }`}
              aria-selected={activeTab === index}
              role="tab"
            >
              {tab?.tabLabel}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTabData && activeTabData.features && activeTabData.features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-20 gap-y-20 mx-auto mt-20">
            {activeTabData.features.map((feature, index) => {
              const iconUrl = feature?.icon &&
                urlForImage(feature?.icon)
                  ?.width(24)
                  .height(24)
                  .auto("format")
                  .fit("max")
                  .url();

              return (
                <div key={index} className="flex gap-4">
                  {iconUrl && (
                    <div className="w-[46px] h-[46px] rounded-[8px] border border-[#B8B8B8]/50 flex items-center justify-center">
                      <Image
                        src={iconUrl}
                        alt={feature?.title || 'Feature icon'}
                        width={24}
                        height={24}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    {feature?.title && (
                      <h3 className="text-xl font-medium text-[#191919] mb-2 !font3 leading-[30px]">
                        {feature.title}
                      </h3>
                    )}
                    {feature?.description && (
                      <p className="text-sm  text-[#999999] font3 leading-[21px] max-w-[280px]">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SteerNotesWhoWeServe;
