import React from "react";
import Image from "next/image";

const SteerAdvantageSection = ({ data, page }: { data: any; page?: string }) => {
    const { features } = data;
    return (
        <div className="w-full lg:pt-18 lg:pb-10 py-6 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {data?.heading && (
                    <h2 className="md:text-[60px] sm:text-[40px] text-[35px] leading-[100%] text-[#171717] text-center font2 font-semibold">{data?.heading}</h2>
                )}
                {data?.subheading && (
                    <h2 className="text-2xl leading-[140%] text-[#5C5C5C] text-center font3 py-10 max-w-4xl mx-auto">{data?.subheading}</h2>
                )}
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 xl:gap-16 gap-6 my-12">
                    {features && features?.map((item: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col gap-5"
                            >
                                <div className="flex items-center justify-center w-[48px] h-[48px] border border-[#EBEBEB] shadow-md shadow-black/7% rounded-xl ">
                                    {item?.icon && (
                                        <div className="relative w-[27px] h-[27px]">
                                            <Image
                                                src={item?.icon}
                                                alt="Client"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="">
                                    <h3 className={`text-[#0A0D14] text-2xl leading-[120%] lg:max-w-[200px] mb-[20px]  ${(page === 'acquire-benefits') ? 'font3' : ' font-gilroy-medium'}`}>{item?.title}</h3>
                                    <p className="text-base leading-[140%] text-black font3">{item?.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default SteerAdvantageSection