import React from "react";
import Image from "next/image";
import Link from "next/link";
import ImageComponent from '../Elements/ImageComponent';

const WorkWithYourEcoSystem = () => {
    return (
        <>
            <div className="w-full py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 ">
                    <h2 className="text-[#171717] md:text-[60px] text-[40px] leading-[100%] font-semibold text-center font2">Works with your ecosystem</h2>
                    <h4 className="md:text-2xl text-[32px] text-[#5C5C5C] font3 leading-[140%] max-w-4xl mx-auto text-center py-10">Steer embeds directly in your EHR and patient app, preserves existing provider rules, and respects scheduling templates — no rip‑and‑replace required.</h4>

                    <div className="my-10">
                        <div className="flex flex-row gap-4 pl-10">
                            <div className="flex justify-center items-center">
                                <Image
                                    src={`/images/oracle-health.svg`}
                                    width={142} height={64} alt="oracle_img"
                                    sizes="(min-width: 768px) 142px, 100vw"
                                />
                            </div>
                            <div className="flex justify-center items-center">
                                <Image
                                    src={`/images/epic-icon.svg`}
                                    width={120} height={64} alt="epic_img"
                                    sizes="(min-width: 768px) 120px, 100vw"
                                />
                            </div>
                        </div>
                        <div className="border border-[#EBEBEB] rounded-[24px] p-6 grid md:grid-cols-2 grid-cols-1 gap-10">
                            <div className="flex flex-col gap-6">
                                <div className="">
                                <Image
                                    src={`/images/st-francis-logo.svg`}
                                    width={194} height={62} alt="St.Francis Medical Center"
                                    sizes="(min-width: 768px) 194px, 100vw"
                                />
                                </div>
                                <div className="border-b border-[#EBEBEB] grid sm:grid-cols-2 grid-cols-1 gap-10 pb-6 mt-8">
                                    <div className="">
                                        <h3 className="text-[48px] text-[#335CFF] font-semibold font2 leading-[100%]">20–25%</h3>
                                        <p className="text-sm text-[#5C5C5C] font3 m-0">increase in new patient acquisition</p>
                                    </div>
                                    <div className="">
                                        <h3 className="text-[48px] text-[#335CFF] font-semibold font2 leading-[100%]">18%</h3>
                                        <p className="text-sm text-[#5C5C5C] font3 m-0">reduction in referral leakage</p>
                                    </div>
                                </div>
                                <div className="border-b border-[#EBEBEB] grid grid-cols-2 sm:gap-10 gap-1 pb-6">
                                    <div className="">
                                        <h5 className="uppercase text-xs font-medium font3 text-[#5C5C5C]">Use Case</h5>
                                        <p className="text-xl text-[#171717] font3 leading-[140%] pt-2">Patient Access</p>
                                    </div>
                                    <div className="">
                                        <h5 className="uppercase text-xs font-medium font3 text-[#5C5C5C]">EHR</h5>
                                        <p className="text-xl text-[#171717] font3 leading-[140%] pt-2">Oracle</p>
                                    </div>
                                </div>
                                <div className="inline-flex">
                                    <Link href="/case-studies/oc-surgeons" className="bg-[#EBEBEB] rounded-[8px] py-2 px-4 text-sm text-[#171717] font-medium inline">Read Case Study</Link>
                                </div>
                            </div>
                            <div className="">
                                 <ImageComponent
                                    src="building-img.webp"
                                    width={566} height={406} alt="St.Francis Medical Center"
                                    sizes="(min-width: 768px) 566px, 100vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ListingSection /> */}
        </>
    )
}
export default WorkWithYourEcoSystem