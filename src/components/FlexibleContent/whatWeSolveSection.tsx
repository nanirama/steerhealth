import Image from "next/image";
import React from "react";
import ImageComponent from "../Elements/ImageComponent";
import { urlForImage } from "@/sanity/lib/utils";

export default function WhatWeSolveSection({ data }:any) {
  const { items } = data;
  return (
    <div className="bg-white md:py-20 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          {data?.title && (
            <h2 className="text-[#171717] lg:text-[60px] text-[40px] leading-[100%] font-semibold font2 w-full mb-6">{data?.title}</h2>
          )}          
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8 gap-5">
          {items && items.map((item: any, index: number) => {
            const imageUrl = item?.image &&
              urlForImage(item?.image)
                ?.height(246)
                .width(307)
                .format("webp")
                .auto("format")
                .fit("max")
                .url();
            return (
              <div
                key={index}
                className="flex flex-col gap-10 w-full border border-[#EBEBEB] shadow-x shadow-sm shadow-[#0A0D1408]/3% md:p-8 p-5 justify-between rounded-xl"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="md:text-[36px] text-[32px] text-[#0A0D14] leading-[120%] font-semibold font2">
                    {item?.title}
                  </h3>
                  <p className="text-base text-[#5C5C5C] leading-[140%] font3">{item?.description}</p>
                </div>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="Client"
                    width={307}
                    height={246}
                    className="object-contain w-full rounded-xl"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
