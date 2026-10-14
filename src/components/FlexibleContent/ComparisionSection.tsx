import React from "react";
import ImageComponent from "../Elements/ImageComponent";
import { PortableText } from '@portabletext/react';
const ComparisionSection = ({ data, steerLabel, otherLabel, compareFeature, page }: any) => {

    return (
        <>
            <div className="bg-white sm:py-16 py-8">
                <section className="max-w-7xl mx-auto px-4 ">
                    {/* Grid */}
                    <div className={`flex md:flex-row flex-col gap-4 bg-[#f7f7f7] rounded-2xl ${page}-section`}>
                        {/* Challenges */}
                        <div className="rounded-2xl p-6 lg:p-6 md:w-[35%] w-full why_choose">
                            <h3 className=" sm:text-base text-xs leading-[24px] font-medium text-[#5C5C5C] uppercase text-center tracking-wide md:pt-3 md:pb-6 py-3 font3   border-b !border-[#f8f2f2]  ">
                                Your Challenge
                            </h3>
                            {data && data.map((item: any, index: number) => (
                                <div className="flex flex-row gap-5" key={index}>
                                    <div className="w-full sm:py-4 sm:pt-0 pt-4 flex flex-row gap-3 md:pl-5 pl-0">
                                        <div className=" flex-shrink-0 mt-1 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#adadad' viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.5 16.084l-1.403 1.416-4.09-4.096-4.102 4.096-1.405-1.405 4.093-4.092-4.093-4.098 1.405-1.405 4.088 4.089 4.091-4.089 1.416 1.403-4.092 4.087 4.092 4.094z" /></svg>
                                        </div>
                                        {item?.othersAvailable && (
                                            <PortableText value={item?.othersAvailable}
                                                components={{
                                                    block: {
                                                        normal: ({ children }) => <h4 className={`md:text-xl sm:text-base text-sm  sm:pl-0 pl-6 text-[#171717] font-gilroy-medium leading-[120%] h4-${index + 1}`}>{children}</h4>,
                                                    },

                                                }} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Advantages */}
                        <div className="bg-white rounded-2xl  p-6 lg:p-4 shadow-sm border border-gray-100 md:w-[65%] w-full why_choose">
                            <h3 className=" sm:text-base text-sm leading-[24px] font-medium text-[#5C5C5C] uppercase text-center tracking-wide  md:pt-3 md:pb-6  py-3 font3   border-b !border-[#f8f2f2]  ">
                                SteerHealth Advantage
                            </h3>
                            {data && data.map((item: any, index: number) => (
                                <div className="flex flex-row gap-5" key={index}>
                                    <div className="w-full py-4 flex flex-row gap-3 md:pl-5 pl-0">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#3ee089' viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" /></svg>
                                        </div>
                                        {item?.steerAvailable && (
                                            <PortableText value={item?.steerAvailable}
                                                components={{
                                                    block: {
                                                        normal: ({ children }) => <h4 className={`md:text-xl sm:text-base text-sm text-[#171717] font-gilroy-medium leading-[120%] h4-${index + 1}`}>{children}</h4>,
                                                    },
                                                    marks: {
                                                        strong: ({ children }) => <strong className="text-[#335CFF] font-medium ">{children}</strong>,
                                                    },
                                                }} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default ComparisionSection