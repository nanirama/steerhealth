import React from "react";
import Link from "next/link";
import LazyVideo from "../Elements/LazyVideo";
import ButtonComponent from "../Elements/ButtonComponent";
import { PortableText } from '@portabletext/react';

import { getVideoName } from '../../lib/index';

const HowSteerSolutionsHelps = ({ data }) => {
    const { items } = data;
    return (
        <>
            <div className="w-full md:pb-12 py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col gap-4 items-center">
                        {data?.title && (
                            <h2 className="md:text-[60px] text-[40px] leading-[100%] text-[#171717] text-center font2 font-bold">{data?.title}</h2>
                        )}
                        {data?.subtitle && (
                            <h2 className="md:text-2xl text-xl leading-[100%] text-[#5C5C5C] text-center font3">{data?.subtitle}</h2>
                        )}
                    </div>
                    <div className="">
                        {items && items?.map((item, index) => {
                            const videoName = getVideoName(item?.videoUrl);
                            const videoPoster = `${videoName}.webp`;
                            return(
                            <div
                                key={index}
                                className={`flex ${item.videoPosition === "right" ? "md:flex-row" : "md:flex-row-reverse"}  flex-col gap-10 md:mt-20 mt-10`}
                            >
                                <div className="flex flex-col justify-center gap-4 md:w-[50%] w-full">
                                    <h3 className="md:text-[36px] text-[32px] leading-[120%] text-[#171717] font2 font-bold">{item?.title}</h3>

                                    <PortableText
                                        value={item.description}
                                        components={{
                                            block: {
                                                normal: ({ children }) => (
                                                    <p className="text-xl leading-[120%] text-[#5C5C5C] font3 md:max-w-[570px] w-full">
                                                        {children}
                                                    </p>
                                                ),
                                            },
                                            list: {
                                                bullet: ({ children }) => (
                                                    <ul className="flex flex-col gap-2 mt-2">
                                                        {children}
                                                    </ul>
                                                ),
                                            },
                                            listItem: {
                                                bullet: ({ children }) => (
                                                    <li className="flex flex-row gap-2 items-start text-base leading-[140%] text-[#5C5C5C] font3">
                                                        <svg
                                                            width="16"
                                                            height="15"
                                                            viewBox="0 0 16 15"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="mt-1 shrink-0"
                                                        >
                                                            <path
                                                                d="M8 15C3.85775 15 0.5 11.6423 0.5 7.5C0.5 3.35775 3.85775 0 8 0C12.1423 0 15.5 3.35775 15.5 7.5C15.5 11.6423 12.1423 15 8 15ZM7.25225 10.5L12.5548 5.19675L11.4943 4.13625L7.25225 8.379L5.1305 6.25725L4.07 7.31775L7.25225 10.5Z"
                                                                fill="#335CFF"
                                                            />
                                                        </svg>
                                                        {children}
                                                    </li>
                                                ),
                                            },
                                        }}
                                    />


                                    <div className="inline-flex">
                                        <ButtonComponent button={item?.ctaButtonPrimary} />
                                    </div>
                                </div>
                                <div className="md:w-[50%] w-full overflow-hidden  md:rounded-[26px] rounded-[12px]">
                                    <LazyVideo
                                        className="h-full w-full border border-[#EBEBEB] md:rounded-[26px] rounded-[12px]"
                                        srcWebm={item.videoUrl}
                                        srcMp4={item.videoUrl}
                                        poster={videoPoster}
                                    />
                                </div>
                            </div>
                        )})}
                    </div>

                </div>
            </div>
        </>
    )
}
export default HowSteerSolutionsHelps