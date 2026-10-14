import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
export default function ProblemByNumbers({ data }: any) {

  return (
    <>
      <div className="w-full md:py-12 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center sm:mb-12 mb-6  ">
            <h2 className="text-[40px] md:text-[60px] font-semibold text-gray-950 leading-tighter text-center font2 mb-4 ">{data?.heading}</h2>
            <p className="text-[#5C5C5C] text-2xl text-center font3  ">{data?.subheading}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">

            {data?.items && data?.items.map((problem: any, index: number) => {
              const imageUrl = problem?.icon &&
                urlForImage(problem?.icon)
                  ?.height(140)
                  .width(140)
                  .format("webp")
                  .auto("format")
                  .fit("max")
                  .url();
              return (
                <div key={index} className="bg-[#F8FAFB] border border-[#E9EAEB] rounded-2xl sm:pt-8 sm:my-0 py-6 xl:px-8 p-4 text-center md:max-w-full sm:max-w-[80%] max-w-full w-full mx-auto">
                  {/* Icon and Statistic */}
                  <h3
                    className={`xl:text-[36px] text-[32px] leading-[120%] font-semibold text-black mb-3 text-center lg:h-[100px]  mx-auto ${index === 0 ? 'lg:max-w-[150px]' : ''
                      }`}
                  >
                    {problem?.title}
                  </h3>
                  {/* <h3 className="text-[36px] leading-[120%] font-semibold text-black mb-3  text-center mx-auto">{problem?.title}</h3> */}
                  <div className="flex sm:flex-row flex-col xl:gap-6 gap-4 items-center justify-center md:my-8 my-8 mx-auto md:h-[140px]" >
                    <div className="xl:w-[40%] md:w-[30%] w-full flex sm:justify-end justify-center h-[100%] ">
                      <div className={`rounded-2xl w-full h-[100%] flex items-center justify-center`}>
                        {imageUrl && (
                          <div className="w-full flex md:justify-center sm:justify-end justify-center">
                            <Image
                              src={imageUrl}
                              alt="Problem Icon"
                              width={140}
                              height={140}
                              loading="lazy"
                              className="object-contain rounded-3xl border-2 border-white"
                              sizes="(max-width: 768px) 100vw, 140px"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="xl:w-[60%] md:w-[70%] w-full flex flex-col lg:gap-4 gap-2">
                      <h4 className="xl:text-[54px] text-[48px] leading-[100%] font2 font-bold text-[#626262] flex flex-col sm:items-start items-center  w-full md:mt-0 mt-2">{problem?.statValue}</h4>
                      <p className="text-[#0E0F10] text-lg xl:leading-[140%] sm:text-left text-center font3 font-medium lg:max-w-[180px] md:max-w-full sm:max-w-[180px] w-full">{problem?.statLabel}</p>
                    </div>
                  </div>
                  <div className="mt-10 mb-4">
                    <p className="text-[#0E0F10] text-xl leading-[140%] font3 text-center max-w-sm mx-auto">{problem?.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
