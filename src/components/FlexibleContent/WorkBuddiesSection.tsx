"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

export default function WorkBuddiesSection({ data }: any) {





    return (
        <>
            <div className="w-full md:py-28 py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex md:flex-row flex-col lg:gap-40 gap-4 mb-10 justify-between items-center">
                        {data?.heading && (
                            <h2 className="text-[#171717] lg:text-[60px] md:text-[40px] text-[30px] sm:leading-[100%] leading-[32px] tracking-[-0.02em] md:text-left text-center font-semibold font2 md:w-[50%] w-full">{data?.heading}</h2>
                        )}
                        {data?.subheading && (
                            <p className="text-[#5C5C5C] lg:text-2xl md:text-xl text-base leading-[140%] font3 md:w-[50%] w-full md:text-left text-center">{data?.subheading}</p>
                        )}

                    </div>
                </div>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={24}
                    breakpoints={{
                        768: {
                            slidesPerView: 4,
                        },
                    }}
                    loop={true}
                    speed={5000} // controls how long one transition takes
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    allowTouchMove={false}
                    className="linear-autoplay-swiper"
                >
                    {data?.images && data?.images.map((item: any, i: number) => {
                        const imageUrl = item &&
                            urlForImage(item)
                                ?.height(620)
                                .width(585)
                                .format("webp")
                                .auto("format")
                                .fit("max")
                                .url();
                        return (
                            <SwiperSlide key={i}>
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt={item?.alt || "Gallery Image"}
                                        width={413}
                                        height={390}
                                        className="rounded-xl w-full object-cover"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 413px"
                                    />
                                )}

                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </>
    )
}
