import React, { memo, useMemo } from "react";
import Image from "next/image";
import ButtonComponent from '@/components/Elements/ButtonComponent';
import { urlForImage } from '@/sanity/lib/utils';
import Link from "next/link";

const HomeHeroSection = memo(({ data, page }: any) => {
    const { heading, subheading, description, ctaButtonPrimary, ctaButtonSecondary } = data;

    console.log('page', page)

    // Memoize heading split to prevent recalculation
    const headingParts = useMemo(() => {
        if (!heading) return { firstPart: '', secondPart: '' };
        const words = heading.split(' ');
        return {
            firstPart: words.slice(0, 2).join(' '),
            secondPart: words.slice(2).join(' ')
        };
    }, [heading]);

    // Memoize image URLs to prevent recalculation - reduces TBT
    const { imageUrl, blurImageUrl, mobileImageUrl, mobileBlurImageUrl } = useMemo(() => {
        // Desktop Image - Optimized for faster loading
        const desktopImg = data?.image &&
            urlForImage(data?.image)
                ?.width(1800)
                ?.height(500)
                ?.format('webp')
                ?.fit('crop')
                ?.quality(60)
                ?.url();

        // Blur placeholder - minimal size for faster decode
        const desktopBlur = data?.image &&
            urlForImage(data?.image)
                ?.width(20)
                ?.height(6)
                ?.blur(50)
                ?.format('webp')
                ?.fit('crop')
                ?.quality(10)
                ?.url();

        // Mobile Image - Optimized for mobile
        const mobileImg = data?.mobileImage &&
            urlForImage(data?.mobileImage)
                ?.width(640)
                ?.height(326)
                ?.format('webp')
                ?.fit('crop')
                ?.quality(55)
                ?.url();

        // Mobile blur placeholder
        const mobileBlur = data?.mobileImage &&
            urlForImage(data?.mobileImage)
                ?.width(16)
                ?.height(8)
                ?.blur(50)
                ?.quality(10)
                ?.url();

        return {
            imageUrl: desktopImg,
            blurImageUrl: desktopBlur,
            mobileImageUrl: mobileImg,
            mobileBlurImageUrl: mobileBlur
        };
    }, [data?.image, data?.mobileImage]);

    return (
        <>
            <div className="w-full md:px-0 px-4">
                <div className="max-w-[1366px] mx-auto bg-[linear-gradient(180deg,_#FFFFFF_38.64%,_#2160FD_114.58%)] md:pt-14 pt-6 md:mt-8 mt-4 rounded-[24px]">
                    <div className="lg:max-w-[1200px] w-full mx-auto md:px-4 px-0">
                        {heading && (
                            <h1 className="md:text-[63px] text-[40px] px-4 md:leading-[110%] leading-[100%] md:tracking-tight tracking-[-0.02em] bg-[linear-gradient(89.46deg,_#1F9AE2_-2.91%,_#3591FA_35.18%,_#0030A6_72.19%,_#002175_108.67%)] text-transparent bg-clip-text font4 text-center md:max-w-5xl max-w-full mx-auto">
                                {headingParts.firstPart}
                                <br className="md:hidden" />{' '}
                                {headingParts.secondPart}
                            </h1>
                        )}
                        {subheading && (
                            <h2 className="md:text-[54px] sm:text-[36px] text-[28px] max-w-7xl mx-auto leading-[110%] text-[#262626] md:tracking-tighter tracking-[-0.02em] font5 text-center sm:py-0 py-2 px-4">
                                {subheading}
                            </h2>
                        )}
                        {description && (
                            <p className="sm:text-[24px] text-base text-[#5C5C5C] font3 text-center sm:py-5 py-2 px-4 md:max-w-4xl max-w-full mx-auto">
                                {description}
                            </p>
                        )}
                        <div className="w-full inline-flex flex-row items-center justify-center gap-4 md:mt-0 mt-2">
                            <ButtonComponent button={ctaButtonPrimary} />
                        </div>

                        {/* Desktop Image - Optimized for LCP - Fixed aspect ratio to match dimensions */}
                        <div className="hidden md:block mt-16 relative w-full overflow-hidden" style={{ aspectRatio: '18/5', minHeight: '300px' }}>
                            <Image
                                src={imageUrl}
                                alt="Hero Image"
                                fill
                                placeholder="blur"
                                blurDataURL={blurImageUrl}
                                className="object-contain"
                                priority
                                fetchPriority="high"
                                sizes="(min-width: 1200px) 1200px, (min-width: 768px) 90vw, 100vw"
                                quality={60}
                            />
                        </div>

                        {/* Mobile Image - Optimized for LCP - Fixed aspect ratio */}
                        <div className="block md:hidden mt-10 relative w-full max-w-[768px] mx-auto overflow-hidden" style={{ aspectRatio: '320/163', minHeight: '200px' }}>
                            <Image
                                src={mobileImageUrl}
                                alt="Hero Image Mobile"
                                fill
                                placeholder="blur"
                                blurDataURL={mobileBlurImageUrl}
                                className="object-contain"
                                priority
                                fetchPriority="high"
                                sizes="(max-width: 640px) 100vw, 768px"
                                quality={55}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

HomeHeroSection.displayName = 'HomeHeroSection';

export default HomeHeroSection;