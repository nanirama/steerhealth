import React from "react";
import ImageComponent from '../Elements/ImageComponent';

const SeamlessIntakes = () => {
    return (
        <>
            <div className="w-full md:py-18 py-6 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col gap-7 items-center justify-center">
                        <h2 className="md:text-[60px] text-[38px] leading-[100%] text-[#171717] font-semibold font2 tracking-tight text-center">Provide Seamless Intakes & Post Services</h2>
                        <p className="md:text-2xl text-xl leading-[140%] text-[#5C5C5C]  font3 text-center">Aquire patients from the start of their journey, Enable easy access to you.</p>
                    </div>
                    <div className="flex md:flex-row flex-col gap-4 md:mt-16 mt-8">
                        <div className="flex flex-col gap-2 bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl px-4 md:py-8 py-4 md:w-[50%] w-full">
                            <h4 className="md:text-[36px] text-[32px] leading-[120%] font2 font-semibold text-black w-full text-wrap">Intake &  Onboarding</h4>
                            <p className="text-xl leading-[140%] font3 text-[#5C5C5C]">Welcome new patients before they walk in</p>
                            <ImageComponent
                                src="service_img1.webp"
                                width={546} height={363} alt="begining_img"
                                sizes="(min-width: 768px) 546, 100vw"
                                className="mt-4"
                            />
                        </div>
                        <div className="flex flex-col gap-2 bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl px-4 md:py-8 py-4 md:w-[50%] w-full">
                            <h4 className="md:text-[36px] text-[32px] leading-[120%] font2 font-semibold text-black">Clinical Chart   Prep & Triage</h4>
                            <p className="text-xl leading-[140%] font3 text-[#5C5C5C]">Every visit starts with context</p>
                            <ImageComponent
                                src="service_img2.webp"
                                width={546} height={363} alt="begining_img"
                                sizes="(min-width: 768px) 546, 100vw"
                                className="mt-4"
                            />
                        </div>
                    </div>
                    <div className="flex md:flex-row lg:flex-nowrap flex-wrap flex-col  lg:gap-4 gap-2 lg:mt-4 mt-8 ">
                        <div className="flex flex-col gap-2 bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl px-4 md:py-6 py-4 lg:w-[33%] md:w-[50%] w-full">
                            <h4 className="md:text-[36px] text-[32px] leading-[120%] font2 font-semibold text-black">Charting & Intake</h4>
                            <p className="text-xl leading-[140%] font3 text-[#5C5C5C]">Clinical documentation at the speed of conversation</p>

                            <ImageComponent
                                src="service_img3.webp"
                                width={546} height={363} alt="begining_img"
                                sizes="(min-width: 768px) 546, 100vw"
                                className="mt-8"
                            />
                        </div>
                        <div className="flex flex-col gap-2 bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl px-4 md:py-6 py-4 lg:w-[33%] md:w-[48%] w-full">
                            <h4 className="md:text-[36px] text-[32px] leading-[120%] font2 font-semibold text-black md:max-w-[200px] w-auto">Chart Prep & Triage</h4>
                            <p className="text-xl leading-[140%] font3 text-[#5C5C5C]">Every visit starts with context</p>
                            <ImageComponent
                                src="service_img4.webp"
                                width={546} height={363} alt="begining_img"
                                sizes="(min-width: 768px) 546, 100vw"
                                className="mt-4"
                            />
                        </div>
                        <div className="flex flex-col gap-2 bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl px-5 md:py-6 py-4 lg:w-[33%] md:w-[50%] w-full">
                            <h4 className="md:text-[36px] text-[32px] leading-[120%] font2 font-semibold text-black text-wrap">Telehealth & Webinars</h4>
                            <p className="text-xl leading-[140%] font3 text-[#5C5C5C]">Personal virtual care—no app needed.</p>
                            <ImageComponent
                                src="service_img5.webp"
                                width={546} height={363} alt="begining_img"
                                sizes="(min-width: 768px) 546, 100vw"
                                className="mt-4"
                            />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-10 bg-[#f7f7f7] rounded-xl mt-6 p-4 border border-[#EBEBEB]">
                        <div className="md:w-[50%] w-full flex flex-col md:gap-4 gap-2 justify-center">
                            <h4 className="md:text-[36px] text-[32px] leading-[120%] font2 font-semibold text-black md:mt-10 mt-2">Reporting &  Analytics</h4>
                            <p className="text-xl leading-[140%] font3 text-[#5C5C5C]">Turn raw data into actionable insight</p>
                        </div>
                        <div className="md:w-[50%] w-full">
                            <ImageComponent
                                src="analatic_imgg.webp"
                                width={1092} height={725} alt="begining_img"
                                sizes="(min-width: 768px) 768px, 100vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SeamlessIntakes