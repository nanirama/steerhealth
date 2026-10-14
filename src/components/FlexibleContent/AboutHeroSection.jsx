import React from "react";
import ImageComponent from "../Elements/ImageComponent";
import { PortableText } from '@portabletext/react';
import ButtonComponent from "../Elements/ButtonComponent";
import { getGradientTextColor } from '@/lib/index';

const AboutHeroSection = ({ data }) => {
    return (
        <div className="bg-white mx-auto py-4">
            <div className="max-w-[1366px] lg:min-h-[550px] mx-auto rounded-[24px] bg-gradient-to-br from-[#4A90E2] via-[#4191d4] to-[#2563EB] flex md:flex-row flex-col justify-between items-stretch md:gap-6 gap-0 md:pt-10 pt-4">
                <div className="md:w-[48.4%] w-full h-full md:my-10 mb-4 flex flex-row justify-start items-stretch">
                    <div className="bg-white md:p-10 px-5 py-6 rounded-[20px] md:mx-8 mx-0 flex flex-col justify-center gap-4 items-stretch md:w-auto w-full">
                        <div>
                            <PortableText value={data?.heading}
                            components={{
                                block: {
                                    normal: ({ children }) => <p className="md:text-[56px] text-[40px] text-[#171717] font-semibold font2 tracking-tighter leading-[110%]">{children}</p>,
                                },
                                marks: {
                                    textColor: ({ children, value }) => {
                                        return getGradientTextColor(children, value)
                                    },
                                    em: ({ children }) => <i className="bg-gradient-to-r from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent">{children}</i>,
                                },
                            }} />
                            </div>
                        {data?.description && (
                            <p className="lg:text-2xl text-sm leading-[140%] text-[#5C5C5C] font3 max-w-md">{data?.description}</p>
                        )}

                        <div className="flex flex-row gap-4 items-center">
                            <div className="inline-flex">
                                <ButtonComponent button={data?.ctaButtonPrimary} />                                
                            </div>
                            
                        </div>
                       
                    </div>
                </div>
                <div className="md:w-[51.6%] w-full">
                    <div className="relative w-full lg:max-w-[800px]">
                        {data?.imageUrl && (
                            <ImageComponent
                                src={`${data?.imageUrl}`}
                                alt="Hero Image"
                                width={612}
                                height={480}
                                className="z-20 w-full md:pr-10"
                                priority={true}
                                sizes="
                                    (min-width: 1280px) 800px,
                                    (min-width: 1024px) 700px,
                                    (min-width: 768px) 600px,
                                    100vw
                                "
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutHeroSection