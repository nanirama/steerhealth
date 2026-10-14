import React from "react";
import Image from "next/image";
import CustomCounter from "@/components/Elements/CustomCounter";


const SteerNotesStats = ({ data }) => {
    return (
        <>
            <div className="bg-[#F7F7F7] md:py-10 py-8 ">
                <div className=" py-16 mx-4 max-w-[1366px] md:mx-auto ">
                    <div className="max-w-7xl mx-auto px-4">
                        {data?.heading && (
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] mb-10 font-gilroy-semibold text-[#171717] leading-[100%] tracking-[-2px] text-center">{data?.heading}</h2>
                        )}
                        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
                            {data?.stats && data?.stats.map((item, index) => {
                                return (
                                    <div key={index} className=" overflow-hidden bg-white flex flex-row justify-between items-center gap-4 rounded-[16px] sm:h-[181px] h-[140px] p-0">
                                        <div className="flex flex-col gap-0 h-full sm:pl-6 pl-4 pb-3 py-5 w-[120%] justify-between">
                                            <h3 className="md:text-[72px] sm:text-[60px] min-w-[150px] text-[60px] text-[#2160FD] font-space-grotesk-regular tracking-[-2%] leading-[70px] !h-[74px] m-0 p-0">
                                                <CustomCounter count={item?.value} suffix={item?.suffix} />
                                            </h3>
                                            {item.label && <h4 className={`sm:text-xl text-base text-[#5C5C5C] font3 sm:pt-2 max-w-full`}>{item.label}</h4>}
                                        </div>
                                        <div className="flex justify-end w-full overflow-hidden">
                                            <Image
                                                src={`/images/${item?.imageUrl}`}
                                                alt={item.label}
                                                width={170}
                                                height={182}
                                                className="h-auto w-auto max-[400px]:w-[170px] sm:max-w-[150px]"
                                                sizes="(max-width: 640px) 150px, 170px"
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SteerNotesStats
