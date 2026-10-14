import React from "react";
import ImageComponent from "../Elements/ImageComponent";

const BeginingSection = () => {
    return (
        <>
            <div className="w-full md:py-28 py-14 bg-white">
                <div className="max-w-7xl mx-auto md:px-12 px-4">
                    <div className="flex flex-col gap-7 items-center">
                        <h2 className=" md:text-[60px] text-[40px] sm:leading-[100%] leading-[120%] font2 font-semibold text-[#171717] text-center">Being at the beginning.  </h2>
                        <p className=" md:text-2xl text-xl leading-[140%] font3 text-[#5C5C5C] text-center mb-10">Aquire patients from the start of their journey, Enable easy access to you.</p>
                    </div>
                    <div className="bg-[#F7F7F7] rounded-xl border border-[#EBEBEB]">
                        <div className="flex md:flex-row flex-col  items-center justify-center gap-10 px-4 py-8">
                            <div className="flex flex-col gap-1 md:w-[50%] w-full">
                                <h3 className="lg:text-[36px] text-[32px] leading-[120%] text-black font2 font-semibold mb-3">AI Intake & Registration</h3>
                                <p className="text-xl leading-[140%] text-[#5C5C5C] font3 md:max-w-[340px] w-full ">Complete check-in before arrival—no clipboard, no bottlenecks</p>
                            </div>

                            <div className="md:w-[50%] w-full">
                                <ImageComponent
                                    src="automate_bging_img.webp"
                                    alt="Hero Image"
                                    width={546}
                                    height={362}
                                    className=" w-full"
                                    priority={true}
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col  mt-6 gap-6">
                        <div className="bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] px-4 md:py-8 py-4 md:w-[35%] w-full">
                            <div className="flex flex-col justify-between  gap-4 h-full">
                                <div className="">
                                    <h3 className="lg:text-[36px] text-[32px] leading-[120%] text-black font2 font-semibold mb-4">Eligibility & Authorizations</h3>
                                    <p className="text-xl leading-[140%] text-[#5C5C5C] font3 md:max-w-[340px] w-full ">Clear coverage before care begins</p>
                                </div>
                             <ImageComponent
                                    src="automate_bgning_img2.webp"
                                    alt="Hero Image"
                                    width={355}
                                    height={236}
                                    className="w-full"
                                    priority={true}
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                />
                            </div>
                        </div>

                        <div className="bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] px-4 md:py-8 py-4 md:w-[65%] w-full">
                            <div className="flex flex-col justify-between gap-4 h-full">
                                <div className="">
                                    <h3 className="lg:text-[36px] text-[32px] leading-[120%] text-black font2 font-semibold mb-4">Luna Voice & Chat</h3>
                                    <p className="text-xl leading-[140%] text-[#5C5C5C] font3 w-full ">Let AI handle FAQs, scheduling, and routing—24/7</p>
                                </div>
                                <ImageComponent
                                    src="automate_bgning_img3.webp"
                                    alt="Hero Image"
                                    width={745}
                                    height={364}
                                    className="w-full"
                                    priority={true}
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col  mt-6 gap-6">
                        <div className="bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] px-4 md:py-8 py-4 md:w-[65%] w-full">
                            <div className="flex flex-col justify-between gap-4 h-full">
                                <div className="">
                                <h3 className="lg:text-[36px] text-[32px] leading-[120%] text-black font2 font-semibold md:mb-0 mb-4">Clinical Documentation</h3>
                                <p className="text-xl leading-[140%] text-[#5C5C5C] font3 w-full ">Documentation that writes itself, in real time</p>
                               </div>
                                <ImageComponent
                                    src="automate_bgning_img3.webp"
                                    alt="Hero Image"
                                    width={745}
                                    height={362}
                                    className="w-full"
                                    priority={true}
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                />
                            </div>
                        </div>

                        <div className="bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] px-4 md:py-8 py-4 md:w-[35%] w-full">
                            <div className="flex flex-col justify-between gap-4 h-full">
                                <div className="">
                                    <h3 className="lg:text-[36px] text-[32px] leading-[120%] text-black font2 font-semibold mb-4">Task Orchestration Engine</h3>
                                    <p className="text-xl leading-[140%] text-[#5C5C5C] font3 md:max-w-[340px] w-full ">Clear coverage before care begins</p>
                                </div>
                                <ImageComponent
                                    src="automate_bgning_img4.webp"
                                    alt="Hero Image"
                                    width={1200}
                                    height={236}
                                    className=""
                                    priority={true}
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex md:flex-row flex-col gap-10 bg-[#f7f7f7] rounded-xl mt-6 p-4 border border-[#EBEBEB]">
                        <div className="md:w-[50%] w-full flex flex-col gap-4 justify-center">
                            <h4 className="d:text-[36px] text-[32px] leading-[120%] font2 font-semibold text-black md:mt-10 mt-4">Referral Leak Guard</h4>
                            <p className="text-xl leading-[140%] font3 text-[#5C5C5C] max-w-sm">Track every referral to completion—automatically</p>
                        </div>
                        <div className="md:w-[50%] w-full">
                            <ImageComponent
                                src="automate_referal.webp"
                                alt="Hero Image"
                                width={546}
                                height={362}
                                className="w-full"
                                priority={true}
                                sizes="(min-width: 768px) 1200px, 100vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BeginingSection