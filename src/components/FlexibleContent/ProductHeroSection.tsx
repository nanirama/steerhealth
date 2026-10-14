import React from "react";
import { PortableText } from '@portabletext/react';
import { getGradientTextColor } from '@/lib/index';
import { urlForImage } from '@/sanity/lib/utils';
import ButtonComponent from "@/components/Elements/ButtonComponent";
import ProductVideoModal from "./ProductVideoModal";
import Image from "next/image";
import { getHeroImagePath, getHeroBlurPath } from '@/lib/index';



const ProductHeroSection = ({ data, page }: any) => {
    const heroImageUrl = data?.imageUrl && getHeroImagePath(data?.imageUrl);
    const heroBlurUrl = data?.imageUrl && getHeroBlurPath(data?.imageUrl);
    let imgHeight = '380'
    if(page==='dfd'){
        imgHeight = '554'
    }
    if(page==='about'){
        imgHeight = '340'
    }
    if(page==='kiosk'){
        imgHeight = '480'
    }


    const imageUrl = data?.image &&
        urlForImage(data?.image)
            ?.width(1800)  // Reduced from 1200 (33% smaller)
            .format('webp')
            ?.fit('crop')
            ?.quality(85) // Add quality optimization
            ?.url();

    const blurImageUrl = data?.image &&
        urlForImage(data?.image)
            ?.height(10)
            ?.width(20)
            ?.blur(20)
            .format('webp')
            ?.fit('crop')?.url();
    return (
        <>
            <div className="bg-white mx-auto p-4">
                <div className="md:max-w-[1366px] lg:min-h-[650px] w-full mx-auto bg-gradient2 md:rounded-[24px] rounded-[12px] flex flex-col justify-between items-stretch md:gap-6 gap-4 !pt-10 md:px-0 px-4 pb-0">
                    <div className="flex flex-col justify-center gap-4 items-center w-full px-4 mt-2 ">
                        <div>
                            <PortableText value={data?.heading}
                                components={{
                                    block: {
                                        normal: ({ children }) => <h1 className="md:text-[56px] text-center text-[40px] text-[#171717] font-bold font2 tracking-normal leading-[110%]">{children}</h1>,
                                    },
                                    marks: {
                                        textColor: ({ children, value }) => {
                                            return getGradientTextColor(children, value, page)
                                        },
                                        em: ({ children }) => <em className="italic">{children}</em>,
                                    },
                                }} />
                        </div>
                        {data?.description && (
                            <p className="lg:text-[22px] text-base max-w-4xl mx-auto text-center leading-[140%] text-[#5C5C5C] font3 pt-3">{data?.description}</p>
                        )}

                        <div className="flex flex-row flex-wrap gap-4 justify-center items-center">
                            <div className="inline-flex">
                                {data?.ctaButtonPrimary && data?.ctaButtonPrimary?.buttontext && (
                                    <div className="inline-flex">
                                        <ButtonComponent button={data?.ctaButtonPrimary} />
                                    </div>
                                )}
                            </div>
                            {page !== "about" && (
                                <div className="inline-flex">
                                    <ProductVideoModal videoLink={data?.videoLink} />
                                </div>
                            )}

                        </div>


                        <div className="flex flex-row flex-wrap items-center md:gap-10 gap-4 md:mb-0 mb-4">
                            {data?.bookingsPercentage && (
                                <p className="lg:text-[60px] text-[34px] leading-[100%] text-black font2">{data?.bookingsPercentage}%</p>
                            )}

                            {data?.bookingsLabel && (
                                <p className="lg:text-xl md:text-base tracking-tight text-xs leading-[140%] text-[#818181] sm:max-w-[220px] max-w-[170px]">{data?.bookingsLabel}</p>
                            )}
                        </div>
                    </div>
                    <div
                        className={`relative ${page !== "kiosk" ? "md:w-[85%]" : "md:w-[80%]"
                            } w-full px-4 mx-auto md:mt-4`}
                    >
                        {imageUrl && blurImageUrl ? (
                            <div
                                className={`${(page !== "kiosk" && page !== "about") 
                                    ? "border-t-[16px] border-l-[16px] border-r-[16px] border-black rounded-t-[16px]"
                                    : ""
                                    }`}
                            >
                                <Image
                                    src={imageUrl}
                                    alt="Hero Image"
                                    width={1000}
                                    height={page !== "kiosk" ? 380 : 480}
                                    className="lg:rounded-t-[40px] md:rounded-t-[24px] rounded-t-[16px] object-cover w-full rounded-b-none transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw,
                                        (max-width: 768px) 100vw,
                                        (max-width: 1024px) 85vw,
                                        (max-width: 1366px) 1000px, 
                                        1000px"
                                    placeholder="blur"
                                    blurDataURL={blurImageUrl}
                                    priority
                                    fetchPriority="high"
                                    loading="eager"
                                    quality={85}
                                />
                            </div>
                        ) : data?.imageUrl ? (
                            <div
                                className={`${page !== "kiosk"
                                    ? "aspect-[50/19] border-t-[16px] border-l-[16px] border-r-[16px] border-black rounded-t-[16px]"
                                    : "aspect-[25/12]"
                                    }`}
                            >
                                <Image
                                    src={heroImageUrl}
                                    alt="Hero Image"
                                    width={1000}
                                    height={page !== "kiosk" ? 380 : 480}
                                    placeholder="blur"
                                    blurDataURL={heroBlurUrl}
                                    className={`object-cover z-20 w-full ${page !== "kiosk" ? "rounded-t-[16px]" : ""
                                        }`}
                                    priority
                                    fetchPriority="high"
                                    loading="eager"
                                    quality={85}

                                    sizes="(max-width: 640px) 100vw,
                                    (max-width: 768px) 100vw,
                                    (max-width: 1024px) 85vw,
                                    (max-width: 1366px) 1000px, 
                                    1000px"
                                />
                            </div>
                        ) : null}
                    </div>

                </div>
            </div>
        </>
    )
}
export default ProductHeroSection