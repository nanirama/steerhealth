import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText } from '@portabletext/react';
import ButtonComponent from "@/components/Elements/ButtonComponent";
import { getGradientTextColor } from '@/lib/index';

const HeroImageSection = ({ data, page }) => {
    // Icon optimization - smaller sizes for better performance
    const imageIconUrl = data?.icon &&
        urlForImage(data?.icon)
            ?.height(20)
            .width(20)
            .format("webp")
            .auto("format")
            .fit("max")
            .quality(90)
            .url();

    // Desktop image - optimized dimensions and quality
    const imageUrl = data?.image &&
        urlForImage(data?.image)
            ?.width(1366)  // Match max container width
            ?.height(567)  // Maintain aspect ratio ~12:5
            ?.format('webp')
            ?.fit('crop')
            ?.crop('right')
            ?.quality(80) // Reduced for better performance
            ?.auto('format')
            ?.url();

    // Ultra-low quality placeholder for faster loading
    const blurImageUrl = data?.image &&
        urlForImage(data?.image)
            ?.height(8)
            ?.width(20)
            ?.blur(50)
            .format('webp')
            ?.fit('crop')
            ?.quality(20)
            ?.url();

    // Mobile image - optimized for mobile viewports
    const imageMobileUrl = data?.mobileImage &&
        urlForImage(data?.mobileImage)
            ?.width(430)  // Optimized for mobile screens
            ?.height(614) // Maintain 7:10 aspect ratio
            ?.format('webp')
            ?.fit('crop')
            ?.quality(75) // Slightly lower quality for mobile
            ?.auto('format')
            ?.url();

    const blurImageMobileUrl = data?.mobileImage &&
        urlForImage(data?.mobileImage)
            ?.height(10)
            ?.width(7)
            ?.blur(50)
            .format('webp')
            ?.fit('crop')
            ?.quality(20)
            ?.url();

    return (
        <>
            <div className="bg-white mx-auto py-4 px-4">
                <div className="hero-image-container lg:max-w-[1366px] lg:min-h-[550px] min-h-full relative mx-auto md:rounded-[24px] rounded-xl flex flex-col-reverse md:flex-row justify-between items-stretch sm:gap-6 gap-4">
                    {imageUrl && (
                        <>
                            {/* Desktop Image - Highly Optimized */}
                            {imageUrl && (
                                <div className="w-full p-0 m-0 md:aspect-[12/5] aspect-[8/5]">
                                    <Image
                                        src={imageUrl}
                                        alt="Hero Image"
                                        width={1366}
                                        height={567}
                                        placeholder="blur"
                                        blurDataURL={blurImageUrl}
                                        className="z-1 md:rounded-[24px] rounded-xl w-full h-full object-cover relative lg:h-full md:h-[500px]"
                                        priority={true}
                                        fetchPriority="high"
                                        loading="eager"
                                        quality={80}
                                        sizes="
                                            (min-width: 1400px) 1366px,
                                            (min-width: 1200px) 1200px,
                                            (min-width: 1024px) 1024px,
                                            (min-width: 768px) 768px,
                                            100vw
                                        "
                                    />
                                </div>
                            )}
                            {/* Mobile Image - Optimized */}
                            {/* {imageMobileUrl && (
                                <div className="border border-red-500 w-full p-0 m-0 lg:hidden block aspect-[7/10] rounded-xl">
                                    <Image
                                        src={imageMobileUrl}
                                        alt="Hero Image"
                                        width={430}
                                        height={614}
                                        placeholder="blur"
                                        blurDataURL={blurImageMobileUrl}
                                        className="z-1 w-full object-cover relative sm:rounded-xl rounded-lg"
                                        priority={true}
                                        fetchPriority="high"
                                        loading="eager"
                                        quality={75}
                                        sizes="
                                            (max-width: 480px) 430px,
                                            (max-width: 640px) 480px,
                                            100vw
                                        "
                                    />
                                </div>
                            )} */}
                        </>
                    )}

                    {/* Content Overlay */}
                    <div
                        className="w-full z-2 flex justify-center items-start
                            md:absolute md:top-12 md:bottom-12 lg:left-10 left-5 md:mt-0
                            md:items-center md:w-auto lg:max-w-[48.4%] md:max-w-[51%]
                            left-0 bottom-4 mt-4">

                        <div className="bg-white lg:p-10 md:p-5 h-full w-full md:rounded-[24px] rounded-xl md:mx-0 flex flex-col justify-center gap-4 items-start">
                            <div>
                                {/* Icon Badge - Optimized */}
                                {data?.iconLabel && data?.icon && (
                                    <div className="inline-flex flex-row gap-2 items-center px-4 py-2 border border-[#ECEFF1] rounded-full text-[13px] font-medium font3 leading-[20px] mb-3 text-[#252525]">
                                        {imageIconUrl && (
                                            <Image
                                                src={imageIconUrl}
                                                alt="Icon"
                                                width={16}
                                                height={16}
                                                loading="eager"
                                                sizes="16px"
                                                className="object-contain"
                                                quality={90}
                                            />
                                        )}
                                        {data?.iconLabel}
                                    </div>
                                )}

                                {/* Main Heading */}
                                <PortableText 
                                    value={data?.heading}
                                    components={{
                                        block: {
                                            normal: ({ children }) => (
                                                <h1 className="xl:text-[56px] md:text-[40px] text-[30px] text-[#171717] font-bold font2 sm:leading-[110%] leading-[32px] tracking-[0.02em] sm:mt-0 mt-2 md:w-auto w-full">
                                                    {children}
                                                </h1>
                                            ),
                                        },
                                        marks: {
                                            textColor: ({ children, value }) => {
                                                return getGradientTextColor(children, value)
                                            },
                                            strong: ({ children }) => <strong className="bg-gradient-to-r from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent">{children}</strong>,
                                            em: ({ children }) => <em className="italic sm:w-auto w-full ">{children}</em>,
                                        },
                                    }} 
                                />
                            </div>
                            {/* Description */}
                            {data?.description && (
                                <p className="lg:text-[22px] text-base leading-[140%] text-[#5C5C5C] font3 md:max-w-md w-full">
                                    {data?.description}
                                </p>
                            )}

                            {/* CTA Buttons */}
                            <div className="flex flex-row flex-wrap gap-4 items-center">
                                {data?.ctaButtonPrimary && (
                                    <div className="inline-flex">
                                        {page==='p2p-landingpage' ? (
                                            <ButtonComponent button={data?.ctaButtonPrimary} className="bg-[#114044]"/>
                                            ):(
<ButtonComponent button={data?.ctaButtonPrimary} />
                                            )}
                                    </div>
                                )}
                                {data?.ctaButtonSecondary?.buttontext && (
                                    <div className="inline-flex">
                                        <ButtonComponent 
                                            button={data?.ctaButtonSecondary}
                                        />
                                    </div>
                                )}
                            </div>
                            {/* Stats Section */}
                            <div className="flex flex-row items-center md:gap-10 gap-4 md:mb-0">
                                {data?.bookingsPercentage && (
                                    <p className="lg:text-[60px] text-[34px] leading-[100%] text-black font2">
                                        {data?.bookingsPercentage}%
                                    </p>
                                )}
                                {data?.bookingsLabel && (
                                    <p className="lg:text-xl md:text-base text-xs tracking-tight leading-[140%] text-[#818181] sm:max-w-[220px] max-w-[170px]">
                                        {data?.bookingsLabel}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroImageSection;