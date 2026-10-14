import React from "react";

import Link from "next/link";
import ImageComponent from "../Elements/ImageComponent";


const SteerPowersBenefits = () => {
    return (
        <>
            <div className="w-full py-12 bg-[#F5F5F7]">
                <div className="max-w-7xl px-4 mx-auto">
                    <h2 className="text-center text-[#171717] md:text-[60px] text-[40px] leading-[100%] tracking-tight font2 font-semibold mb-6">See how Steer powers the future of care</h2>
                    <p className="text-center text-[#5C5C5C] text-2xl leading-[140%] font3">Steer Health integrates with your systems, helping teams work efficiently. We improve access to quality care.</p>
                    <div className="flex md:flex-row flex-col gap-2 md:pt-20">
                        <div className="flex flex-col gap-6 md:w-[50%] w-full pt-10">
                            <h3 className=" text-[#171717] text-xl leading-[120%] !font2 font-medium mb-6 md:max-w-md">How we helped Prime Healthcare transform digital care access</h3>
                            <h4 className=" text-[#171717] text-xl leading-[120%]  !font2 font-medium  after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-[20px] after:w-[2px] after:bg-[#0278FC] relative pl-4">Challenge</h4>
                            <p className=" text-[#5C5C5C] text-base leading-[140%] font3 max-w-md mb-6">Prime’s biggest need was to deliver faster, more digital care experiences across its hospitals, which meant they needed a way to automate patient intake and streamline scheduling without overloading clinical teams.</p>
                            <h4 className=" text-[#171717] text-xl leading-[120%]  !font2 font-medium after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-[20px] after:w-[2px] after:bg-[#0278FC] relative pl-4">Solution</h4>
                            <p className=" text-[#5C5C5C] text-base leading-[140%] font3 max-w-md mb-6">Prime partnered with Steer Health to launch a digital front door, enabling patients to easily schedule care, complete intake, and receive support—often within minutes of first contact.</p>
                            <h4 className=" text-[#171717] text-xl leading-[120%]  !font2 font-medium  after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-[20px] after:w-[2px] after:bg-[#0278FC] relative pl-4">Products</h4>
                            <div className="inline-flex flex-row gap-4 mt-4">
                                <Link href="#" className="text-center rounded-sm px-4 py-2 border border-[#335CFF] flex flex-row justify-between items-center gap-4 text-sm leading-[20px] text-[#335CFF] font3 font-medium">Digital Front Door<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.79551 4.99956L0.0830078 1.28706L1.14351 0.226562L5.91651 4.99956L1.14351 9.77256L0.0830078 8.71206L3.79551 4.99956Z" fill="#335CFF" /></svg></Link>
                                <Link href="#" className="text-center rounded-sm px-4 py-2 border border-[#335CFF] flex flex-row justify-between items-center gap-4 text-sm leading-[20px] text-[#335CFF] font3 font-medium">Steer Notes<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.79551 4.99956L0.0830078 1.28706L1.14351 0.226562L5.91651 4.99956L1.14351 9.77256L0.0830078 8.71206L3.79551 4.99956Z" fill="#335CFF" /></svg></Link>
                            </div>
                            <div className="flex lg:flex-nowrap md:justify-start justify-center md:gap-26 gap-4 md:px-30 items-center md:py-12 mx-auto z-20">
                                <ImageComponent
                                    src="steer-power-btn1.webp"
                                    alt="Hero Image"
                                    width={200}
                                    height={40}
                                    className="hover:border-t border-t-[#7A1443] pt-4"
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                />
                                <ImageComponent
                                    src="steer-power-btn2.webp"
                                    alt="Hero Image"
                                    width={120}
                                    height={40}
                                    className="hover:border-t border-t-[#7A1443] pt-4"
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                />
                                <ImageComponent
                                    src="steer-power-btn3.webp"
                                    alt="Hero Image"
                                    width={120}
                                    height={40}
                                    className="hover:border-t border-t-[#7A1443] pt-4"
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                />
                                <ImageComponent
                                    src="steer-power-btn4.webp"
                                    alt="Hero Image"
                                    width={200}
                                    height={40}
                                    className=" hover:border-t border-t-[#7A1443] pt-4"
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                />

                            </div>

                        </div>
                        <div className="md:w-[50%] w-full">
                            <ImageComponent
                                src="steer-power-img.webp"
                                alt="Hero Image"
                                width={546}
                                height={581}
                                className="  rounded-t-3xl"
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
export default SteerPowersBenefits