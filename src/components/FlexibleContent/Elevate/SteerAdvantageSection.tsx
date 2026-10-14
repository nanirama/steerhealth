import React from "react";
import Image from "next/image";

const SteerAdvantageSection = ({ data, page, postType }: { data: any; page?: string; postType?: string }) => {
    const { features } = data;
    return (
        <div className="w-full lg:pt-18 lg:pb-10 py-[40px] bg-white">
            <div className="max-w-7xl mx-auto px-4">
   
                {data?.heading && (
                    <h2 className="md:text-[54px] sm:text-[40px] text-[30px] sm:leading-[100%] leading-[32px] tracking-[-0.02em] font-interdisplay-light text-[#171717] text-center mx-auto sm:max-w-full max-w-[90%]">{data?.heading}</h2>
                )}
                {data?.subheading && (
                    <h3 className="md:text-2xl sm:text-xl text-base leading-[140%] text-[#5C5C5C] text-center  font3 md:py-10 pt-4 max-w-4xl mx-auto">{data?.subheading}</h3>
                )}
                <div className={`grid ${postType === 'elevateProducts' ? 'lg:grid-cols-3 md:grid-cols-2 ' : 'lg:grid-cols-4 md:grid-cols-2'} grid-cols-1 xl:gap-16 gap-[12px] sm:my-12 my-[20px]`}>
                    {features && features?.map((item: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col gap-[20px]"
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
                                    <h3 className={`text-[#0A0D14] md:text-2xl text-xl leading-[120%] lg:max-w-[200px] sm:mb-[20px] mb-2 ${(page === 'acquire-benefits') ? 'font3' : ' font-gilroy-medium'}`}>{item?.title}</h3>
                                    <p className="text-base leading-[140%] text-[#5c5c5c] font3 mb-1">{item?.description}</p>
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