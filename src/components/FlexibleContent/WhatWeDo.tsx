import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

export default function WhatWeDo({ data }: any) {
  if (!data) return null

  const { heading, subheading, items } = data

  return (
    <section className="lg:py-20 py-10 bg-white ">
      <div className="max-w-7xl mx-auto px-4">
        {heading && <h2 className="sm:text-[60px] text-[36px] leading-[100%] font-gilroy-semibold tracking-[-2%] text-center mb-6">{heading}</h2>}
        {subheading && (
          <p className=" sm:text-2xl text-xl leading-[140%] text-[#5C5C5C] mx-auto text-center  sm:mb-12 mb-6">{subheading}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 md:py-10">
          {items?.map((item: any, idx: number) => {
            const imageUrl = item.image &&
              urlForImage(item.image)
                ?.width(283)
                .auto("format")
                .fit("max")
                .url();
            return (
              <div key={idx} className="bg-white border border-[#EBEBEB] rounded-2xl xl:p-10 md:p-8 p-4 flex flex-col justify-between h-full">
                <div className="flex justify-center flex-col">
                  <h3 className="xl:text-[36px] sm:text-[32px] text-[28px] leading-[120%] text-[#0A0D14]  font-gilroy-semibold max-w-xs mb-4  ">{item.title}</h3>
                  <p className="text-[#5C5C5C] text-base leading-[140%] font3 mt-2 max-w-sm">{item.description}</p>
                </div>
                {imageUrl && (
                  <div className="relative block my-2 ">
                    <Image
                      src={imageUrl}
                      alt="Client"
                      width={283}
                      height={238}
                      className="w-full mx-auto mt-6 rounded-2xl"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
