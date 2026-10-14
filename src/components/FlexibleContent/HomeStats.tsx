import React from "react";
import Image from "next/image";
import CustomCounter from "../Elements/CustomCounter";


const HomeStats = ({ data }: any) => {


    return (
        <>
            <div className="bg-gradient md:py-16 py-8 sm:mt-12 mt-10 mx-4 max-w-[1366px] md:mx-auto rounded-[24px]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
                        {data?.stats && data?.stats.map((item: any, index: number) => {
                            return (
                                <div key={index} className=" overflow-hidden bg-white flex flex-row justify-between items-center gap-4 rounded-[16px] sm:h-[198px] h-[140px] p-0">
                                    <div className="flex flex-col gap-0 sm:pl-6 pl-4 pb-3 sm:pt-0 pt-3 sm:w-full w-[120%] flex-shrink-1">
                                        <h3 className="md:text-[72px] sm:text-[60px] min-w-[150px] text-[60px] text-[#2160FD] font-space-grotesk-regular tracking-[-3%] leading-none !h-[74px] m-0 p-0"><CustomCounter count={item?.value} suffix={item?.suffix} /></h3>
                                        {item.label && <h4 className={`sm:text-xl text-base text-[#5C5C5C] font3 sm:pt-2 ${index === 0 ? 'sm:max-w-[100px] max-w-[140px]' : 'max-w-full'}`}>{item.label}</h4>}
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
                    <div className="sm:pt-12 pt-8">
                        {data?.quote && <p className="sm:text-2xl text-base sm:pb-0 pb-3 text-center text-white font3 max-w-3xl mx-auto leading-[140%]">{data?.quote}</p>}
                        {data?.clientname && <h3 className="sm:text-2xl text-xl text-center text-white font3 leading-[140%] font-medium">{data?.clientname}</h3>}
                        {data?.clientJobTitle && <p className="sm:text-[15px] text-sm text-white text-center font-light font3">{data?.clientJobTitle}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomeStats