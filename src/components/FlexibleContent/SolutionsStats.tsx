import React from "react";
import CustomCounter from "../Elements/CustomCounter";

const StatSectionGradient = ({ data }:any) => {
    const { stats } = data;
    return (
        <>
            <div className="bg-white w-full md:py-20 py-10 ">
                <div className=" max-w-[1366px] mx-auto">
                    <div className="max-w-7xl mx-auto px-4">
                        {data?.title && (
                            <h2 className="text-[#171717] lg:text-[60px] text-[40px] md:leading-[100%] leading-[120%] text-center mx-auto font-semibold font2 w-ful mb-6">{data?.title}</h2>
                            
                        )}
                        {/* {data?.description && <p className=" text-2xl text-[#5C5C5C] font3 leading-[140%] text-center mb-16">{data?.description}</p>} */}
                        <div className="flex sm:flex-row flex-col lg:flex-nowrap flex-wrap xl:gap-32 gap-16 w-full justify-center md:items-start items-center ">
                            {stats && stats.map((item: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-4"
                                    >
                                        <h2 className="text-center tracking-tight leading-[70px] text-[72px] h-[74px] font-space-grotesk-regular bg-gradient-to-b from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent">
                                            <CustomCounter prefix={item.prefix} count={item.value} suffix={item.suffix} />
                                        </h2>
                                        <h3 className="text-xl text-[#5C5C5C] font3 text-center max-w-60">{item.label}</h3>
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
export default StatSectionGradient