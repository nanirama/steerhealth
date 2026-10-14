import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

const CaseStudyHeroSection = ({ data }: any) => {
    const { title, shortDescription, mainImage, authorData } = data;
    const imageUrl = mainImage &&
        urlForImage(mainImage)
            ?.height(540)
            .width(800)
            .format("webp")
            .auto("format")
            .fit("max")
            .url();

    const authorImageUrl = authorData?.image &&
        urlForImage(authorData?.image)
            ?.height(100)
            ?.width(100)
            .format('webp')
            ?.fit('crop')?.url();
    return (
        <>
            <div className="w-full bg-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="flex flex-col md:gap-12 gap-6 justify-between">
                            <div className="">
                                {title && <h1 className=" md:text-[60px] text-[40px] leading-[100%] tracking-tight font2 font-semibold text-[#171717] max-w-md pb-2">{title}</h1>}
                                {shortDescription && <p className=" text-[#5C5C5C] sm:text-2xl text-base leading-[140%] font3">{shortDescription}</p>}
                            </div>
                            <div className="border-t border-[#EBEBEB] "></div>
                            {/* <div className="pt-4 md:mt-6 flex flex-col justify-start items-start gap-1">
                                <h2 className="font-medium text-base uppercase text-[#5C5C5C] tracking-[6%]">A CONVERSATION WITH</h2>
                                <div className="flex items-center space-x-4 mt-2">
                                    <div className="w-12 h-12 relative rounded-full overflow-hidden">
                                        <Image src={authorImageUrl}
                                            width={72}
                                            height={72}
                                            alt={authorData?.name}
                                            priority
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className="font-medium text-xl text-[#5C5C5C]">{authorData?.name}</p>
                                        <p className="text-xl text-[#5C5C5C]">{authorData?.jotTitle}</p>
                                    </div>
                                </div>
                            </div>                       */}
                        </div>
                        <div className="">
                            {imageUrl && (
                                <Image
                                    src={imageUrl}
                                    alt="Client"
                                    width={800}
                                    height={540}
                                    className="  rounded-xl h-auto w-full"
                                    sizes="(min-width: 768px) 1200px, 100vw"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CaseStudyHeroSection