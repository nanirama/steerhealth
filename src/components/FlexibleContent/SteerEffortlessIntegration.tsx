'use client'
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlForImage } from '@/sanity/lib/utils';
import ButtonComponent from '@/components/Elements/ButtonComponent';

const SteerEffortlessIntegration = ({ data }: any) => {

    const { clientLogos } = data;

    const duplicatedLogos = clientLogos ? [...clientLogos, ...clientLogos, ...clientLogos] : [];
    const settingsMobile = {
        dots: false,
        infinite: true,
        speed: 6000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows: false,
        variableWidth: true,
        swipe: false,
        draggable: false,
        touchMove: false,
        responsive: [
            {
                breakpoint: 768, // Tablet
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplaySpeed: 0,
                    cssEase: "linear",
                    pauseOnHover: false,
                    pauseOnFocus: false,
                },
            },
            {
                breakpoint: 600, // Small mobile
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplaySpeed: 0,
                    cssEase: "linear",
                    pauseOnHover: false,
                    pauseOnFocus: false,
                },
            },
            {
                breakpoint: 480, // ✅ Very small mobile (added)
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplaySpeed: 0,
                    cssEase: "linear",
                    pauseOnHover: false,
                    pauseOnFocus: false,
                },
            },
        ],
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 6000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        pauseOnFocus: false, // ✅ Prevent pause on focus
        arrows: false,
        variableWidth: true,
        swipe: false, // ✅ Disable manual swiping
        draggable: false, // ✅ Disable dragging
        touchMove: false, // ✅ Disable touch scrolling
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    autoplaySpeed: 0,
                    cssEase: "linear",
                    pauseOnHover: false,
                    pauseOnFocus: false,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplaySpeed: 0,
                    cssEase: "linear",
                    pauseOnHover: false,
                    pauseOnFocus: false,
                },
            },
        ],
    };
    const imageUrl = data?.image &&
        urlForImage(data?.image)
            ?.width(914)  // Reduced from 1200 (33% smaller)
            ?.height(380)
            ?.fit('crop')
            ?.quality(80) // Add quality optimization
            ?.url();

    const blurImageUrl = data?.image &&
        urlForImage(data?.image)
            ?.height(47)
            ?.width(22)
            ?.blur(30)
            ?.quality(40)
            ?.fit('crop')?.url();

    const imageMobileUrl = data?.mobileimage &&
        urlForImage(data?.mobileimage)
            ?.width(780)  // Reduced from 1200 (33% smaller)
            ?.height(500)
            ?.fit('crop')
            ?.quality(80) // Add quality optimization
            ?.url();

    const blurImageMobileUrl = data?.mobileimage &&
        urlForImage(data?.mobileimage)
            ?.height(32)
            ?.width(39)
            ?.blur(30)
            ?.quality(40)
            ?.fit('crop')?.url();
    const renderClientLogosSlider = () => {
        if (!duplicatedLogos || duplicatedLogos.length === 0) return null;
        
        return (
            <div className="w-full">
                
                <div className="w-full mt-4 md:max-w-[1024px] mx-auto overflow-hidden rounded-[6px] md:p-4 p-2 border border-[#C0D5FF]/50 shadow-lg relative">
                    {/* Left gradient overlay */}
                    <div className="absolute left-0 top-0 bottom-0 md:w-[150px] w-[50px] bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />

                    {/* Right gradient overlay */}
                    <div className="absolute right-0 top-0 bottom-0 md:w-[150px] w-[50px] bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

                    <div className="relative client-logos-slider">
                        <style dangerouslySetInnerHTML={{
                            __html: `
                                .client-logos-slider .slick-slide {
                                    padding: 0 6px;
                                    margin: 0 10px;
                                }
                                .client-logos-slider .slick-slide > div {
                                    height: 35px;
                                    display: flex !important;
                                    align-items: center;
                                    justify-content: center;
                                }
                                .client-logos-slider .slick-list {
                                    overflow: visible;
                                }
                                .client-logos-slider .slick-track {
                                    display: flex;
                                    align-items: center;
                                }
                            `}} />
                        <Slider {...settings}>
                            {duplicatedLogos.map((item: any, index: number) => {
                                const logoUrl = item?.imageUrl;
                                const link = item?.link;

                                // Check if image is SVG
                                const isSvg = logoUrl?.includes('.svg') ||
                                    logoUrl?.includes('format=svg') ||
                                    item?.image?.asset?.extension === 'svg' ||
                                    item?.image?.asset?.mimeType === 'image/svg+xml';

                                const imageContent = logoUrl ? (
                                    isSvg ? (
                                        <img
                                            src={logoUrl}
                                            alt="Client logo"
                                            className="md:max-h-[35px] max-h-[25px] w-auto object-contain px-2"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <Image
                                            src={logoUrl}
                                            alt="Client logo"
                                            height={35}
                                            width={150}
                                            className="md:max-h-[35px] max-h-[25px] w-auto object-contain px-2"
                                            loading="lazy"
                                        />
                                    )
                                ) : null;

                                return (
                                    <div key={`logo-${index}`}>
                                        {imageContent && (
                                            <div className="w-full h-[35px] flex items-center justify-center">
                                                {link ? (
                                                    <a
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block"
                                                    >
                                                        {imageContent}
                                                    </a>
                                                ) : (
                                                    imageContent
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    };
    const renderClientLogosSliderMobile = () => {
        if (!duplicatedLogos || duplicatedLogos.length === 0) return null;
        
        return (
            <div className="w-full overflow-hidden">
                
                <div className="w-full mt-4 w-full mx-auto overflow-hidden rounded-[6px] md:p-4 p-2 border border-[#C0D5FF]/50 shadow-lg relative">
                    {/* Left gradient overlay */}
                    <div className="w-[10%] absolute left-0 top-0 bottom-0 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />

                    {/* Right gradient overlay */}
                    <div className="w-[10%] absolute right-0 top-0 bottom-0 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

                    <div className="relative client-logos-slider">
                        <style dangerouslySetInnerHTML={{
                            __html: `
                                .client-logos-slider .slick-slide {
                                    padding: 0 4px;
                                    margin: 0 4px;
                                    max-width: 350px;
                                    max-height: 35px !important;
                                    overflow: hidden;
                                }
                                .client-logos-slider .slick-slide > div {
                                    height: 35px;
                                    display: flex !important;
                                    align-items: center;
                                    justify-content: center;
                                }
                                .client-logos-slider .slick-list {
                                    overflow: visible;
                                }
                                .client-logos-slider .slick-track {
                                    display: flex;
                                    align-items: center;
                                }
                            `}} />
                        <Slider {...settingsMobile}>
                            {duplicatedLogos.map((item: any, index: number) => {
                                const logoUrl = item?.imageUrl;
                                const link = item?.link;

                                // Check if image is SVG
                                const isSvg = logoUrl?.includes('.svg') ||
                                    logoUrl?.includes('format=svg') ||
                                    item?.image?.asset?.extension === 'svg' ||
                                    item?.image?.asset?.mimeType === 'image/svg+xml';

                                const imageContent = logoUrl ? (
                                    isSvg ? (
                                        <img
                                            src={logoUrl}
                                            alt="Client logo"
                                            className="w-full h-full max-w-[350px] !max-h-[35px] px-1"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full relative max-w-[350px] !max-h-[35px] px-1">
                                            <Image
                                            src={logoUrl}
                                            alt="Client logo"
                                            height={35}
                                            width={350}
                                            className="w-full h-full max-w-[350px] !max-h-[35px] px-1"
                                            loading="lazy"
                                        />
                                        </div>
                                    )
                                ) : null;

                                return (
                                    <div key={`logo-${index}`}>
                                        {imageContent && (
                                            <div className="w-full flex items-center justify-center">
                                                {link ? (
                                                    <a
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block"
                                                    >
                                                        {imageContent}
                                                    </a>
                                                ) : (
                                                    imageContent
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <div className="w-full py-12">
                <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center gap-4 px-4">
                        {data?.kickerText && <p className="sm:text-base text-xs font-medium leading-[110%] uppercase text-[#5C5C5C] tracking-[0.06em]">{data?.kickerText}</p>}
                        {data?.heading && <h2 className="md:text-[60px] text-[40px] font4 leading-[120%] md:tracking-tight tracking-[-0.02em] text-[#335CFF] text-center max-w-full sm:py-0 py-2">{data?.heading}</h2>}
                        {data?.subheading && <h3 className="md:text-[54px] sm:text-[36px] text-[28px] leading-[110%] text-[#262626] -mt-5 md:tracking-tighter tracking-[-0.02em] font5 text-center">{data?.subheading}</h3>}
                        {data?.description && <p className="md:max-w-[700px] text-[#5C5C5C] sm:text-[24px] text-base font3 text-center">{data?.description}</p>}
                    </div>
                    {/* <h2 className="md:text-[54px] text-[40px] text-[#171717] font5 text-center tracking-tighter py-4 md:leading-[110%] leading-[42px]">
                        <span className="text-[#335CFF] font4 md:text-[54px] text-[40px] md:tracking-tighter tracking-[-0.02em]">Effortless</span>
                        <span className="block md:inline md:text-[54px] sm:text-[30px] text-[30px] md:tracking-tighter tracking-[-0.02em] font5 pl-2">Integration</span>
                    </h2>
                    {data?.subheading && <p className="text-[#5C5C5C] px-4 md:text-2xl sm:text-xl text-base font3 mx-auto text-center md:pt-4 pt-6">{data?.subheading}</p>}
                     */}
                    <div className="w-full lg:block hidden">
                    <div className="flex justify-center items-center md:my-8 my-6 md:px-0 sm:px-10 px-5 mx-auto text-center">
                        <ButtonComponent button={data?.ctaButtonPrimary} />
                    </div>
                    {renderClientLogosSlider()}</div>
                    

                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt="Effortless Integration"
                            width={914}
                            height={380}
                            loading="lazy"
                            priority={false}
                            quality={75}
                            className="h-auto mx-auto lg:block hidden"
                            sizes="(min-width: 1440px) 931px, (min-width: 1024px) 70vw, (min-width: 768px) 90vw, 100vw"
                        />
                    )}
                    
                    <div className="w-full lg:hidden">
                        <div className="w-[380px] max-w-full md:w-full md:inline-block grid md:my-8 my-6 md:px-0 sm:px-10 px-5 mx-auto text-center !lg:justify-center">
                            <ButtonComponent button={data?.ctaButtonPrimary} />
                        </div>
                        <div className="px-[1px] block lg:hidden overflow-hidden">{renderClientLogosSliderMobile()}</div>
                        {imageMobileUrl && (
                            <div className="w-full mx-auto px-2">
                            <Image
                                src={imageMobileUrl}
                                alt="Effortless Integration"
                                width={780}
                                height={500}
                                loading="lazy"
                                priority={false}
                                quality={75}
                                className="h-auto mx-auto lg:hidden block"
                                sizes="100vw"
                            />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default SteerEffortlessIntegration