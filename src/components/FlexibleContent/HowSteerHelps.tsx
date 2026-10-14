import React from "react";
import ImageComponent from "../Elements/ImageComponent";
import { PortableText } from '@portabletext/react';


const HowSteerSection = ({ data }:any) => {
    return (
        <>
            <div className="w-full md:py-16 py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4 border border-red-600">
                    {data?.heading && (
                        <h2 className="text-[#171717] md:text-[60px] text-4xl leading-[100%] font-semibold text-center font2">{data?.heading}</h2>
                    )}
                    {data?.subheading && (
                        <h2 className="text-2xl text-[#5C5C5C] font3 leading-[140%] max-w-4xl mx-auto text-center lg:py-10 pt-4 pb-8">{data?.subheading}</h2>
                    )}
                    <div className="grid md:grid-cols-2 lg:gap-16 gap-8 items-center">
                        <div className="">
                            <PortableText value={data?.description}
                                components={{
                                    block: {
                                        normal: ({ children }) => <h3 className="text-xl text-[#5C5C5C] font3 leading-[140%]">{children}</h3>,
                                    },

                                }} />
                        </div>
                        <div className="">
                            <ImageComponent                              
                                src={`${data?.imageUrl}`}
                                alt="Hero Image"
                                width={589}
                                height={497}
                                className="w-full rounded-[24px]"
                                sizes="(min-width: 768px) 1200px, 100vw"
                            />                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HowSteerSection