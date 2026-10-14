import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSlugUrl } from "@/sanity/lib/utils";
import ImageComponent from "../Elements/ImageComponent";


const MoreThingsSection = ({ data }: any) => {
    const { cards } = data;

    return (
        <>
            <div className="w-full md:py-12 py-6 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {data?.title && (
                        <h3 className="text-center md:text-[36px] text-[40px] text-[#171717] leading-[120%] font-semibold font2">{data?.title}</h3>
                    )}
                    <div className="flex md:flex-row flex-col md:gap-4 gap-6 my-12">

                        {cards && cards.map((item: any, index: number) => {
                            const slugUrl = getSlugUrl('platforms', item?.link?.slug.toLowerCase(), item?.link?.categorySlug)
                            //const slugUrl = `/${item?.link?.categorySlug}/${item?.link?.slug}`
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col gap-4 md:w-[50%] w-full border border-[#EBEBEB] p-6 rounded-xl"
                                >
                                    {item?.icon && (
                                        <Link href={slugUrl}><Image
                                            src={item?.icon}
                                            alt="Client"
                                            width={30}
                                            height={30}
                                            sizes="(max-width: 768px) 24px, 24px"
                                            className="object-contain"
                                        /></Link>
                                    )}

                                    <h3 className="text-[36px] text-[#181D27] leading-[120%] font-semibold font2"><Link href={slugUrl}>{item?.title}</Link></h3>
                                    <p className="text-base text-[#5C5C5C] leading-[140%] font3">{item?.description}</p>
                                    {item?.imageUrl && (
                                        <Link href={slugUrl}><ImageComponent
                                            src={`${item?.imageUrl}`}
                                            alt={item?.title}
                                            width={446}
                                            height={393}
                                            className="mt-4 w-full"
                                            priority={false}
                                            sizes="(max-width: 768px) 100vw"
                                        /></Link>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
export default MoreThingsSection