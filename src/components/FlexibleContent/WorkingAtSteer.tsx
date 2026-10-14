import React from 'react';
import Image from 'next/image';
import { urlForImage } from "@/sanity/lib/utils";

const WorkingAtSteer = ({ data }: any) => {
  if (!data) return null
  const { heading, subheading, items } = data


  return (
    <div className='bg-white'>
      <div className="w-full max-w-7xl mx-auto px-4 py-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="relative inline-block">
            {heading && <h2 className="sm:text-[60px] text-[36px] leading-[100%] font-gilroy-semibold tracking-[-2%] text-center mb-6">{heading}</h2>}
            {subheading && (
              <p className=" sm:text-2xl text-xl leading-[140%] text-[#5C5C5C] mx-auto text-center">{subheading}</p>
            )}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item: any, idx: number) => {
            const imageUrl = item.image &&
              urlForImage(item.image)
                ?.width(1178)
                .auto("format")
                .fit("max")
                .url();
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-[24px] aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Background Image */}
                <div className="">
                  {imageUrl && (
                    <div className="relative block w-full h-[471px]">
                      <Image
                        src={imageUrl}
                        alt="Client"
                        fill
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-[24px]"
                      />
                    </div>
                  )}
                </div>

                {/* Overlay Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-[50%] rounded-[24px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000000_145.88%)] transition-opacity duration-300"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
                  <div className="text-white transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    <h3 className={`text-xl sm:text-2xl lg:text-[36px] font-gilroy-semibold text-white mb-2 sm:mb-4 leading-tight ${(idx === 1 || idx === 3) ? "max-w-[14rem]" : "max-w-2xl"}`}>
                      {item.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed text-white font3 transition-opacity duration-300 max-w-sm">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Subtle border on hover */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-white/0 group-hover:border-white/20 transition-all duration-300"></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkingAtSteer;