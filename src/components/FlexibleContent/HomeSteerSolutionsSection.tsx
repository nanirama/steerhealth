'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ButtonComponent from "../Elements/ButtonComponent";
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from '@portabletext/react'

function isPortableText(value: any) {
    return (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every(item => typeof item === 'object' && '_type' in item) &&
        value.some(item => item._type === 'block')
    )
}

const StatsList = ({ stats }: { stats: any[] }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(true);

    useEffect(() => {
        if (!stats || stats.length === 0) return;

        // Rotate through stats every 3 seconds
        const interval = setInterval(() => {
            // Fade out first
            setIsVisible(false);
            
            // After fade out completes, change content and fade in
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % stats.length);
                setIsVisible(true);
            }, 500); // Half of transition duration for smooth fade
        }, 3000); // 3 seconds per item

        return () => {
            clearInterval(interval);
        };
    }, [stats]);

    if (!stats || stats.length === 0) return null;

    // Get the current stat to display
    const currentStat = stats[currentIndex];

    return (
        <div className="flex flex-col">
            <div 
                className={`w-full flex flex-row justify-start items-center gap-4 py-6  transition-opacity duration-1000 ease-in-out ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <h3 className="md:text-[48px] max-[768px]:!text-[42px] max-[460px]:!text-[36px] leading-[70px] md:w-auto min-[400px]:w-1/3 max-[399px]:w-2/5 font-space-grotesk-regular sm:tracking-[-2%] h-[70px] bg-[linear-gradient(89.46deg,_#1F9AE2_-2.91%,_#3591FA_35.18%,_#0030A6_72.19%,_#002175_108.67%)] text-transparent bg-clip-text ">{currentStat.value}</h3>
                <div className="md:w-auto min-[461px]:w-2/3 max-[460px]:w-3/5 ">
                    {(currentStat?.label && isPortableText(currentStat?.label)) && (
                        <PortableText value={currentStat?.label}
                            components={{
                                block: {
                                    normal: ({ children }) => <p className="sm:text-xl text-base text-[#5C5C5C] font3">{children}</p>,
                                },
                            }} />
                    )}
                </div>
            </div>
        </div>
    );
};

const PlatformItem = ({ item, imageUrl, secondimageUrl, blurImageUrl, blurSecondImageUrl }: any) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const images = [imageUrl, secondimageUrl].filter(Boolean);

    useEffect(() => {
        // Only rotate if we have both images
        if (images.length < 2) {
            // Reset to first image if only one image exists
            setCurrentImageIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3000); // 3 seconds per image

        return () => {
            clearInterval(interval);
        };
    }, [images.length]);

    const currentImage = images[currentImageIndex];
    const currentBlurImage = currentImageIndex === 0 ? blurImageUrl : blurSecondImageUrl;

    return (
        <div className="bg-white rounded-[24px] sm:my-20 my-12 sm:p-10 p-4 mb-8 md:mb-0">
            <div className="flex md:flex-row flex-col lg:gap-20 gap-6">
                <div className="flex flex-col gap-4 md:w-[50%] w-full">
                    <div className="flex flex-row gap-2 items-center">
                        <Image
                            src={item?.icon}
                            alt="Client"
                            width={24}
                            height={24}
                            sizes="(max-width: 768px) 24px, 24px"
                            className="object-contain"
                        />
                        <p className="text-[#386AF5] text-base font3">{item?.iconLabel}</p>
                    </div>
                    <div className="mt-2 mb-0 md:pb-8 pb-6 border-b border-[#DDDDDD]">
                        {item?.title && (
                            <PortableText value={item?.title}
                                components={{
                                    block: {
                                        normal: ({ children }) => <h3 className="sm:text-[36px] text-[30px] text-[#171717] font5 font-light leading-[120%]">{children}</h3>,
                                    },
                                }} />
                        )}
                    </div>
                    {item?.subtitle && (
                        <div className="my-1">
                            <PortableText value={item?.subtitle}
                                components={{
                                    block: {
                                        normal: ({ children }) => <h4 className="font3 text-[1.25rem] font-medium leading-[140%] align-middle tracking-[0em] text-[#171717] pb-1">{children}</h4>,
                                    },
                                }} />
                        </div>
                    )}
                    {item?.description && (
                        <div className="mb-1">
                            <PortableText
                                value={item.description}
                                components={{
                                    block: {
                                        normal: ({ children }) => (
                                            <p className="font3 text-[1.25rem] font-normal leading-[140%] align-middle tracking-[0em] text-[#171717] pb-1">
                                                {children}
                                            </p>
                                        ),
                                    },
                                    marks: {
                                        strong: ({ children }) => (
                                            <strong className="font-semibold mb-2 tracking-tight font3">
                                                {children}
                                            </strong>
                                        ),
                                    },
                                }}
                            />
                        </div>
                    )}
                    {item?.stats && <StatsList stats={item.stats} />}

                    <div className="w-full inline-flex">
                        <ButtonComponent button={item?.ctaButtonPrimary} />
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:w-[50%] w-full">
                    <div className="relative w-full md:max-w-[544px] md:mx-auto overflow-hidden [&_.slick-dots]:hidden [&_[class*='dots']]:hidden [&_[class*='indicator']]:hidden [&_[class*='pagination']]:hidden">
                        {/* Spacer div to maintain aspect ratio and prevent overlay - 800/544 ≈ 1.47 */}
                        <div className="w-full md:pb-[87%] pb-[77%]"></div>
                        {images.length === 2 ? (
                            // Render both images with crossfade scale transition
                            images.map((image, index) => {
                                const isCurrent = index === currentImageIndex;
                                const blurUrl = index === 0 ? blurImageUrl : blurSecondImageUrl;
                                return (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                            isCurrent
                                                ? 'opacity-100 scale-100 z-10'
                                                : 'opacity-0 scale-95 z-0'
                                        }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={item?.iconLabel}
                                            placeholder="blur"
                                            blurDataURL={blurUrl}
                                            width={544}
                                            height={800}
                                            loading="lazy"
                                            priority={false}
                                            quality={75}
                                            sizes="(min-width: 1024px) 544px, (min-width: 768px) 45vw, 100vw"
                                            className="h-auto w-full object-contain object-top"
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            // Single image - no transition needed
                            currentImage && (
                                <div className="absolute inset-0">
                                    <Image
                                        src={currentImage}
                                        alt={item?.iconLabel}
                                        placeholder="blur"
                                        blurDataURL={currentBlurImage}
                                        width={544}
                                        height={800}
                                        loading="lazy"
                                        priority={false}
                                        quality={75}
                                        sizes="(min-width: 1024px) 544px, (min-width: 768px) 45vw, 100vw"
                                        className="h-auto w-full object-contain object-top"
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const HomeSteerSolutionsSection = ({ data }: any) => {
    return (
        <>
            <div className="w-full pt-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col items-center justify-center gap-4">
                        {data?.tagline && <p className="sm:text-base text-xs font-medium leading-[110%] uppercase text-[#5C5C5C] tracking-[0.06em]">{data?.tagline}</p>}
                        {data?.heading && <h2 className="md:text-[63px] text-[40px] font4 leading-[110%] md:tracking-tight tracking-[-0.02em] text-[#335CFF] text-center md:max-w-full max-w-5xl sm:py-0 py-2">{data?.heading}</h2>}
                        {data?.subheading && <h3 className="md:text-[54px] sm:text-[30px] text-[30px] leading-[110%] text-[#262626] -mt-5 md:tracking-tighter tracking-[-0.02em] font5 text-center">{data?.subheading}</h3>}
                        {data?.description && <p className="md:max-w-4xl max-w-full mx-auto text-[#5C5C5C] sm:text-[24px] text-base font3 text-center">{data?.description}</p>}
                    </div>
                    {data?.platforms && data?.platforms.map((item: any, index: number) => {
                        // let slugLink = '/drive-growth/overview'
                        // if (item?.iconLabel === 'Automate') {
                        //     slugLink = '/simplify-work/overview'
                        // }
                        // if (item?.iconLabel === 'Navigate') {
                        //     slugLink = '/reduce-costs/overview'
                        // }

                        const imageUrl = item?.image &&
                            urlForImage(item?.image)
                                ?.width(800)
                                ?.fit('crop')
                                ?.quality(90) // Add quality optimization
                                ?.url();


                        const secondimageUrl = item?.secondimage ?
                            urlForImage(item?.secondimage)
                                ?.width(800)
                                ?.fit('crop')
                                ?.quality(90) // Add quality optimization
                                ?.url() : null;

                        const blurImageUrl = item?.image &&
                            urlForImage(item?.image)
                                ?.width(20)        // Reduced from 27
                                ?.height(15)       // Reduced from 21 (maintains ratio)
                                ?.blur(30)         // Same intensity
                                ?.quality(30)
                                ?.fit('crop')
                                ?.url();

                        const blurSecondImageUrl = item?.secondimage &&
                            urlForImage(item?.secondimage)
                                ?.width(20)
                                ?.height(15)
                                ?.blur(30)
                                ?.quality(30)
                                ?.fit('crop')
                                ?.url();

                        return (
                            <PlatformItem 
                                key={index}
                                item={item}
                                imageUrl={imageUrl}
                                secondimageUrl={secondimageUrl}
                                blurImageUrl={blurImageUrl}
                                blurSecondImageUrl={blurSecondImageUrl}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default HomeSteerSolutionsSection