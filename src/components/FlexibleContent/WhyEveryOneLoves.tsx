import React from "react";
import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { urlForImage } from "@/sanity/lib/utils";

import ComparisionSection from "./ComparisionSection";

const WhyEveryOneLoves = ({ data, page }: any) => {
    const { title, subtitle, benefitCards, comparisonTable, steerLabel, otherLabel, compareFeature } = data
    return (
        <>
            <div className="w-full py-12 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    {title && <h2 className="text-[#171717] md:text-[60px] text-4xl leading-[100%] font-semibold text-center font2">{title}</h2>}
                    {subtitle && <h3 className="text-2xl text-[#5C5C5C] font3 leading-[140%] text-center pt-8 md:pb-8 py-4">{subtitle}</h3>}
                    <div className={`grid ${page==='fasttrackcare' ? 'lg:grid-cols-4' : 'lg:grid-cols-4'}  sm:grid-cols-2 grid-cols-1 gap-4`}>
                        {benefitCards && benefitCards.map((card: any, index: number) => {
                             const imageUrl = card?.image &&
                                urlForImage(card?.image)
                                    ?.width(28)
                                    .auto("format")
                                    .fit("max")
                                    .url();
                           
                            return (
                                <div key={index} className="flex justify-center items-center flex-col md:gap-8 gap-2 md:py-8 py-4">
                                    <div className="border border-[#EBEBEB] shadow-[0px_4px_7px_0px_#00000012] flex justify-center items-center rounded-[8px] w-[48px] h-[48px]">
                                        {imageUrl && (
                                            <div className="relative block w-[28px] h-[30px] my-2 ">
                                            <Image
                                                src={imageUrl}
                                                alt="Client"
                                                fill
                                                className="object-contain"
                                            />
                                            </div>
                                        )}
                                        </div>
                                    
                                    {card?.title && (
                                        <PortableText value={card?.title}
                                            components={{
                                                block: {
                                                    normal: ({ children }) => <h3 className="md:text-2xl text-xl font-gilroy-medium text-[#171717] leading-[120%] ">{children}</h3>,
                                                },

                                            }} />
                                    )}
                                     {/* {card?.description && (
                                        <PortableText value={card?.description}
                                            components={{
                                                block: {
                                                    normal: ({ children }) => <p className="text-base text-[#5C5C5C] font3 leading-[140%] mb-3">{children}</p>,
                                                     h3: ({ children }) => <h3 className="text-xs text-[#A3A3A3] font-medium font3 leading-[140%] mt-3 mb-1">{children}</h3>,
                                                },

                                            }} />
                                    )} */}
                                    {/* {card?.description && <p className="text-xl text-[#0E0F10] font3 text-center leading-[140%] my-3">{card?.description}</p>} */}
                                    
                                </div>
                            )
                        })}
                    </div>
                </div>
                {comparisonTable && <ComparisionSection data={comparisonTable} steerLabel={steerLabel} otherLabel={otherLabel} compareFeature={compareFeature} page={page} />}
            </div>
            
        </>
    )
}
export default WhyEveryOneLoves;