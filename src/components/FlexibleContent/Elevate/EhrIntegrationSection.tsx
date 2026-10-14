'use client'
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ehrIntegrationSection = ({ data }: any) => {

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
            <div className="w-full pt-6 pb-28 bg-white">
                <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center gap-1 px-4">
                         {data?.heading && <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[54px] mb-2 font-light font-interdisplay-light text-[#171717] leading-tight tracking-tight text-center">{data?.heading}</h2>}
                         {data?.description && <p className="text-base md:text-lg lg:text-xl text-[#2B333B] text-center max-w-3xl mb-4 leading-relaxed">{data?.description}</p>}
                    </div>
                    <div className="w-full lg:block hidden">
                    {renderClientLogosSlider()}</div>
                    <div className="w-full lg:hidden">
                        <div className="px-[1px] block lg:hidden overflow-hidden">{renderClientLogosSliderMobile()}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ehrIntegrationSection