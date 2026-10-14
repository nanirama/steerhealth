"use client";

import React from "react";
import Image from "next/image";

// Image imports
const logos = [
  "/images/clientlogos/1-PRIME.svg",  
  "/images/clientlogos/2-NEUROTX.svg",
  "/images/clientlogos/3-ORANGECOUNTYNEUROSURGICALASSOCIATES.svg",
  "/images/clientlogos/4-ORTHOWEST.svg",
  "/images/clientlogos/5-ST MARY'S.svg",
  "/images/clientlogos/6-SUMMITSURGERYCENTER.svg",
  "/images/clientlogos/7-PHYNET.svg",
  "/images/clientlogos/8-ISLAND DERMATOLOGY.svg",
  "/images/clientlogos/9-SHORELINE.svg",
];

const repeatedLogos = Array.from({ length: 10 }, () => logos).flat();

const HeaderClientsSlider: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-[#f7f7f7] py-3 !flex flex-row sm:gap-10 gap-4 items-center px-4">
      <h4 className="md:text-[24px] text-lg leading-[120%] tracking-normal font-gilroy-semibold text-[#171717] p-0 m-0 z-20 w-auto">Our Clients</h4>
      <div className="relative w-[85%] overflow-hidden">
        <div className="flex gap-6 items-center animate-slide-reverse">
          {repeatedLogos.map((logo, index) => (
            <div
              key={index}
              className="w-auto flex-shrink-0 mx-4 flex items-center justify-center"
            >
              <Image
                src={logo}
                alt="Client Logo"
                width={120}
                height={30}
                sizes="(min-width: 768px) 120px, 100vw"
              />
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-[#F7F7F7] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#F7F7F7] to-transparent pointer-events-none z-10" />
      </div>

      {/* Slide reverse animation */}
      <style jsx>{`
        @keyframes slide-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-slide-reverse {
          width: 200%;
          animation: slide-reverse 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeaderClientsSlider;
