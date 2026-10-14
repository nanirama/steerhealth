'use client'
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ClientLogosSlider = ({ data }: any) => {
    const { clientLogos, heading } = data;

    // Duplicate logos for seamless infinite loop
    const duplicatedLogos = clientLogos ? [...clientLogos, ...clientLogos, ...clientLogos] : [];

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        arrows: false,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    speed: 5000,
                    autoplaySpeed: 0,
                    cssEase: "linear",
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    speed: 5000,
                    autoplaySpeed: 0,
                    cssEase: "linear",
                },
            },
        ],
    };

    return (
        <div className="w-full bg-white py-2 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 relative py-0 overflow-hidden">
                {/* Left gradient overlay */}
                <div className="absolute left-0 top-0 bottom-0 w-[100px] bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />

                {/* Right gradient overlay */}
                <div className="absolute right-0 top-0 bottom-0 w-[100px] bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

                {heading && (
                    <h2 className="text-[#171717] md:text-[54px] tracking-[-0.02em] text-[30px] leading-[32px] text-center mx-auto md:leading-[100%] font-gilroy-semibold pt-2 mb-12">
                        {heading}
                    </h2>
                )}

                {duplicatedLogos && duplicatedLogos.length > 0 && (
                    <div className="relative client-logos-slider">
                        <style dangerouslySetInnerHTML={{ __html: `
                            .client-logos-slider .slick-slide {
                                padding: 0 16px;
                            }
                            .client-logos-slider .slick-slide > div {
                                height: 75px;
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
                                // Use imageUrl directly from query
                                const logoUrl = item?.imageUrl;
                                const link = item?.link;

                                // Check if image is SVG by checking URL or asset metadata
                                const isSvg = logoUrl?.includes('.svg') ||
                                             logoUrl?.includes('format=svg') ||
                                             item?.image?.asset?.extension === 'svg' ||
                                             item?.image?.asset?.mimeType === 'image/svg+xml';

                                //console.log('logoUrl',logoUrl)
                                //console.log('isSvg', isSvg);
                                const imageContent = logoUrl ? (
                                    isSvg ? (
                                        <img
                                            src={logoUrl}
                                            alt="Client logo"
                                            className="max-h-[65px] w-auto object-contain px-4"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <Image
                                            src={logoUrl}
                                            alt="Client logo"
                                            height={65}
                                            width={240}
                                            className="max-h-[65px] w-auto object-contain px-4"
                                            loading="lazy"
                                        />
                                    )
                                ) : null;
                                return (
                                    <div key={`logo-${index}`}>
                                        {imageContent && (
                                            <div className="w-full h-[65px] flex items-center justify-center">
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
                )}
            </div>
        </div>
    );
};

export default ClientLogosSlider;

