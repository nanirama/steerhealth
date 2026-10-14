import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";

const HowSteerProductsHelps = ({ data }: any) => {
    const { items } = data;
   
    return (
        <div className="w-full lg:py-18 py-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 sm:gap-10 gap-4">
                    {data?.title && (
                        <h2 className="lg:text-[60px] text-[40px] leading-[100%] text-[#171717] font2 font-semibold">{data?.title}</h2>
                    )}
                    {data?.description && (
                        <p className="text-2xl leading-[140%] text-[#5C5C5C] font3">{data?.description}</p>
                    )}
                </div>
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 xl:gap-16 gap-6 md:my-18 mt-8">
                    {items && items?.map((item: any, index: number) => {
                        const imageUrl = item?.icon &&
                            urlForImage(item?.icon)
                                ?.height(24)
                                .width(24)
                                .format("webp")
                                .auto("format")
                                .fit("max")
                                .url();
                        return (
                            <div
                                key={index}
                                className="flex flex-col gap-4 border border-[#EBEBEB] px-5 py-8 rounded-[24px] bg-white"
                            >
                                <div className="">
                                    {imageUrl && (
                                        <Link href={`/products/${item?.productLink?.slug}`}><Image
                                            src={imageUrl}
                                            alt="Client"
                                            width={30}
                                            height={40}
                                            sizes="(max-width: 768px) 24px, 24px"
                                            className="object-contain"
                                        /></Link>
                                    )}
                                </div>

                                <Link href={`/products/${item?.productLink?.slug}`} className="text-[#171717] font3 text-2xl leading-[120%] font-medium border-b border-[#EFEFEF] pb-3">{item?.title}</Link>
                                <p className="text-base leading-[140%] text-[#5C5C5C] font3">{item?.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default HowSteerProductsHelps