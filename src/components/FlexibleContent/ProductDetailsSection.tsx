import React from "react";
import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/utils';
import Image from "next/image";


const ProductDetailsSection = ({ data }: any) => {
    const { row1, row2, row3 } = data;

    const imageUrlLast = row3?.image &&
        urlForImage(row3?.image)
            ?.height(725)
            ?.width(1092)
            .format('webp')
            .quality(70) 
            ?.fit('crop')?.url();

    const blurImageUrlLast = row3?.image &&
        urlForImage(row3?.image)
            ?.height(36)
            ?.width(55)
            ?.blur(20)
            .format('webp')
            ?.fit('crop')?.url();
    return (
        <div className="bg-white mx-auto">
            <div className="w-full py-6 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex md:flex-row flex-col gap-4 md:mt-8">
                        {row1 && row1.map((item: any, index: number) => {
                            const imageUrl = item?.image &&
                                urlForImage(item?.image)
                                    ?.height(542)
                                    ?.width(817)
                                    .format('webp')
                                    .quality(70) 
                                    ?.fit('crop')?.url();

                            const blurImageUrl = item?.image &&
                                urlForImage(item?.image)
                                    ?.height(54)
                                    ?.width(82)
                                    ?.blur(20)
                                    .format('webp')
                                    ?.fit('crop')?.url();
                            return (
                                <div key={index} className="flex flex-col justify-between gap-2 bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl px-4 md:py-8 py-4 md:w-[50%] w-full">
                                    <div className="flex flex-col justify-start gap-2 ">
                                        {item?.title && <PortableText value={item?.title}
                                            components={{
                                                block: {
                                                    normal: ({ children }) => <h3 className="md:text-[36px] text-[28px] leading-[120%] font2 font-semibold text-black w-full text-wrap">{children}</h3>,
                                                }
                                            }} />}
                                        {item?.description && <p className="text-xl leading-[140%] font3 text-[#5C5C5C]">{item?.description}</p>}
                                    </div>
                                    {imageUrl && (
                                        <Image
                                            src={imageUrl}
                                            alt="Client"
                                            width={546} height={363}
                                            sizes="(min-width: 1024px) 540px, 100vw"
                                            className="mt-4 w-full rounded-[12px]"
                                            placeholder="blur"
                                            blurDataURL={blurImageUrl}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex md:flex-row lg:flex-nowrap flex-wrap flex-col  lg:gap-4 gap-2 lg:mt-4 mt-8 ">
                        {row2 && row2.map((item: any, index: number) => {
                            const imageUrl = item?.image &&
                                urlForImage(item?.image)
                                    ?.height(542)
                                    ?.width(817)
                                    .format('webp')
                                    .quality(70) 
                                    ?.fit('crop')?.url();

                            const blurImageUrl = item?.image &&
                                urlForImage(item?.image)
                                    ?.height(54)
                                    ?.width(82)
                                    ?.blur(20)
                                    .format('webp')
                                    ?.fit('crop')?.url();
                            return (
                                <div key={index} className="flex flex-col justify-between gap-2 bg-[#F7F7F7] border border-[#EBEBEB] rounded-xl px-4 md:py-6 py-4 lg:w-[33%] md:w-[49.3%] w-full">
                                    <div className="flex flex-col justify-start gap-2 ">
                                        {item?.title && <PortableText value={item?.title}
                                            components={{
                                                block: {
                                                    normal: ({ children }) => <h3 className="md:text-[36px] text-[28px] leading-[120%] font2 font-semibold text-black w-full text-wrap">{children}</h3>,
                                                }
                                            }} />}
                                        {item?.description && <p className="text-xl leading-[140%] font3 text-[#5C5C5C]">{item?.description}</p>}
                                    </div>
                                    {imageUrl && (
                                        <Image
                                            src={imageUrl}
                                            alt="Client"
                                            width={546} height={363}
                                            sizes="(min-width: 1024px) 540px, 100vw"
                                            className="mt-4 rounded-[12px] w-full"
                                            placeholder="blur"
                                            blurDataURL={blurImageUrl}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex md:flex-row flex-col gap-10 bg-[#f7f7f7] rounded-xl mt-6 p-4 border border-[#EBEBEB]">
                        <div className="md:w-[50%] w-full flex flex-col md:gap-4 gap-2 justify-center">
                            {row3?.title && <PortableText value={row3?.title}
                                components={{
                                    block: {
                                        normal: ({ children }) => <h3 className="md:text-[36px] text-[28px] leading-[100%] max-w-[20rem] font2 font-semibold text-black md:mt-10 mt-2">{children}</h3>,
                                    }
                                }} />}

                            {row3?.description && <p className="text-xl leading-[140%] font3 text-[#5C5C5C]">{row3?.description}</p>}
                        </div>
                        <div className="md:w-[50%] w-full">
                            {imageUrlLast && (
                                <Image
                                    src={imageUrlLast}
                                    alt="Client"
                                    width={1092} height={725}
                                    sizes="(min-width: 768px) 768px, 100vw"
                                    className="rounded-[12px] w-full"
                                    placeholder="blur"
                                    blurDataURL={blurImageUrlLast}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetailsSection