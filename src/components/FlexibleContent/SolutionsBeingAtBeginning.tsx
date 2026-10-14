import React from "react";
import ImageComponent from "../Elements/ImageComponent";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from '@/sanity/lib/utils';

const SolutionsBeingAtBeginning = ({ data }: any) => {
    const { items } = data;
    return (
        <>
            <div className="w-full md:py-16 py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col gap-7 items-center">
                        {data?.heading && (
                            <h2 className="md:text-[60px] text-[40px] leading-[100%] font2 font-semibold text-[#171717] text-center">{data?.heading}</h2>
                        )}
                        {data?.subheading && (
                            <p className="md:text-2xl text-xl leading-[140%] font3 text-[#5C5C5C] text-center">{data?.subheading}</p>
                        )}
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-10">
                        {items && items.map((item: any, index: number) => {
                            const imageUrl = item?.image &&
                                urlForImage(item?.image)
                                    ?.height(965) // Reduced from 900 (33% smaller)
                                    ?.width(584)  // Reduced from 1200 (33% smaller)
                                    ?.format('webp')
                                    ?.fit('crop')
                                    ?.quality(85) // Add quality optimization
                                    ?.url();

                            const blurImageUrl = item?.image &&
                                urlForImage(item?.image)
                                    ?.height(20)
                                    ?.width(12)
                                    ?.blur(20)
                                    ?.format('webp')
                                    ?.fit('crop')
                                    ?.url();

                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center gap-6 px-6 md:pt-10 py-10 bg-[#F7F7F7] md:rounded-2xl rounded-xl"
                                >

                                    <h4 className="md:text-[36px] text-[32px] leading-[120%] font2 font-semibold text-center  bg-gradient-to-r from-[#2160FD] to-[#204BB4] text-transparent bg-clip-text "><Link href={`/products/${item?.productLink?.slug}`}>{item.title}</Link></h4>
                                    <Link href={`/products/${item?.productLink?.slug}`}>
                                        {(imageUrl && blurImageUrl) ? (
                                            <>
                                            <Image
                                                src={imageUrl}
                                                alt="Solutions BeingAtBegininng Image"
                                                width={450}
                                                height={750}
                                                className="w-full md:rounded-[24px] rounded-[12px]"
                                                sizes="(max-width: 640px) 100vw,
                                                    (max-width: 1024px) 50vw,
                                                    400px"
                                                placeholder="blur"
                                                blurDataURL={blurImageUrl}
                                            />
                                            </>
                                        ) : (
                                            <ImageComponent
                                                src={`${item?.imageUrl}`}
                                                alt="Solutions BeingAtBegininng Image"
                                                width={589}
                                                height={497}
                                                className="w-full md:rounded-[24px] rounded-[12px]"
                                                sizes="(min-width: 768px) 1200px, 100vw"
                                            />
                                        )}

                                        {/* <ImageComponent
                                                src={`${item?.imageUrl}`}
                                                alt="Solutions BeingAtBegininng Image"
                                                width={589}
                                                height={497}
                                                className="w-full md:rounded-[24px] rounded-[12px]"
                                                sizes="(min-width: 768px) 1200px, 100vw"
                                            /> */}

                                    </Link>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}
export default SolutionsBeingAtBeginning