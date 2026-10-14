import React from 'react';

const OurHiringProcess = ({ data }: any) => {
  if (!data) return null
  const { heading, subheading, items } = data



  return (
    <div className='bg-white'>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="relative inline-block">
            {heading && <h2 className="sm:text-[60px] text-[36px] leading-[100%] font-gilroy-semibold tracking-[-2%] text-center mb-6">{heading}</h2>}
            {subheading && (
              <p className=" sm:text-2xl text-xl leading-[140%] text-[#5C5C5C] mx-auto text-center mb-6">{subheading}</p>
            )}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative mb-12">
            <div className="absolute top-5 left-0 right-0 h-0.5 border-t-2 border-dashed border-[#ABABAB]"></div>

            <div className="relative flex justify-start gap-[60px]">
              {items.map((item: any, index: number) => (
                <div key={index} className="relative z-10 w-[28%]">
                  <div className="w-[42px] h-[42px] bg-[#E2EBFF] rounded-full flex items-center justify-center">
                    <span className="text-[22px] font-semibold text-[#2160FD]">{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 xl:gap-[80px]">
            {items.map((item: any, index: number) => (
              <div key={index} className="text-left">
                <h3 className="text-xl xl:text-2xl text-[#171717] font-gilroy-medium mb-4 leading-[120%]">
                  {item.title}
                </h3>
                <p className="text-base xl:text-lg text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>


        <div className="block lg:hidden">
          <div className="relative">
            {/* Vertical dotted line for mobile */}
            <div className="absolute !left-[22px] top-0 bottom-0 w-0.5 border-l-2 border-dashed border-[#ABABAB]"></div>

            {items.map((item: any, index: number) => (
              <div key={index} className="relative flex items-start lg:gap-0 gap-4 mb-16 last:mb-0">
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-[42px] h-[42px] bg-[#E2EBFF] rounded-full flex items-center justify-center">
                    <span className="text-lg  font-bold text-blue-600">{index + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="sm:ml-6 flex-1">
                  <h3 className="text-xl xl:text-2xl text-[#171717] font-gilroy-medium mb-4 leading-[120%]">
                    {item.title}
                  </h3>
                  <p className="text-base xl:text-lg text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurHiringProcess;