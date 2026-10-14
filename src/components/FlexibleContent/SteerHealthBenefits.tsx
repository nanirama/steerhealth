import React from "react";
import Image from "next/image";
import { PortableText } from '@portabletext/react';

import ComparisionSection from "./ComparisionSection";

const SteerHealthBenefits = ({ data }: any) => {
    const { title, subtitle, benefitCards, comparisonTable } = data
    return (
        <>
            <div className="w-full py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {title && <h2 className="text-[#171717] md:text-[60px] text-4xl leading-[100%] font-semibold text-center font2">{title}</h2>}
                    {subtitle && <h4 className="text-2xl text-[#5C5C5C] font3 leading-[140%] text-center pt-8 pb-16">{subtitle}</h4>}
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                        {benefitCards && benefitCards.map((card: any, index: number) => {
               
                            return (
                                <div key={index} className="border border-[#E9EAEB] bg-[#F8FAFB] rounded-[24px] p-6 flex justify-between flex-col">
                                    {/* {card?.title && <h3 className="text-[36px] font-semibold text-black font2 text-center leading-[120%] max-w-[180px] mx-auto">{card?.title}</h3>} */}
                                    {card?.title && (
                                        <PortableText value={card?.title}
                                            components={{
                                                block: {
                                                    normal: ({ children }) => <h3 className="text-[36px]  font-semibold text-black font2 text-center leading-[120%]">{children}</h3>,
                                                },

                                            }} />
                                    )}
                                    {card?.description && <p className="text-xl text-[#0E0F10] font3 text-center leading-[140%] my-3">{card?.description}</p>}
                                    <div className="w-full py-2">
                                        {card?.image && (
                                            <Image
                                                src={card?.image}
                                                alt="Client"
                                                width={614}
                                                height={492}
                                                className="object-contain w-full rounded-[20px]"
                                            />
                                        )}
                                    </div>
                                    <div className="bg-white text-sm tracking-tight rounded-[22px] px-4 py-2 w-full inline-block text-center">{card?.statNote}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {comparisonTable && <ComparisionSection data={comparisonTable} />}
            </div>
            
        </>
    )
}
export default SteerHealthBenefits;