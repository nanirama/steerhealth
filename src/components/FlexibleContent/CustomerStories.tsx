import React from "react";
import Link from "next/link";
import Image from "next/image";
import ButtonComponent from "../Elements/ButtonComponent";
import { urlForImage } from "@/sanity/lib/utils";

const CustomerStories = ({ data, page }: any) => {
    const { heading, stories } = data
    return (
        <>
            <div className="w-full bg-white sm:py-12 py-4 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4">
                    {heading && <h2 className="text-[#171717] md:text-[60px] sm:text-4xl text-[30px] leading-[32px] tracking-[-2%] text-center sm:leading-[100%] font-gilroy-semibold pt-2 mb-10">{heading}</h2>}

                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 sm:gap-6 gap-4 my-8">

                        {stories?.map((story: any, idx: number) => {
                            const imageUrl = story.image &&
                                urlForImage(story.image)
                                    ?.width(774)
                                    ?.height(1134)
                                    .auto("format")
                                    .fit("max")
                                    .quality(85)
                                    .url();
                            const blurImageUrl = urlForImage(story?.image)
                                ?.width(19)
                                ?.height(28)
                                .format("webp")
                                .auto("format")
                                .fit("max")
                                .blur(20)
                                .url();

                            const imageMobileUrl = story?.image &&
                                urlForImage(story?.image)
                                    ?.width(800)  // Optimized for mobile screens
                                    ?.height(700) // Maintain 7:10 aspect ratio
                                    ?.format('webp')
                                    ?.fit('crop')
                                    ?.quality(75) // Slightly lower quality for mobile
                                    ?.auto('format')
                                    ?.url();

                            const blurImageMobileUrl = story?.image &&
                                urlForImage(story?.image)
                                    ?.height(10)
                                    ?.width(7)
                                    ?.blur(50)
                                    .format('webp')
                                    ?.fit('crop')
                                    ?.quality(20)
                                    ?.url();

                            const logoImageUrl = story?.logo &&
                                urlForImage(story?.logo)
                                    ?.width(372)
                                    ?.height(72)
                                    .auto("format")
                                    .fit("max")
                                    .quality(85)
                                    .url();
                            const logoBlurImageUrl = urlForImage(story?.logo)
                                ?.width(18)
                                ?.height(4)
                                .format("webp")
                                .auto("format")
                                .fit("max")
                                .blur(20)
                                .url();
                            return (
                                <div key={idx} className="text-left relative rounded-2xl">
                                    {imageUrl && (
                                        <div
                                            className="!relative block">
                                            <Image
                                                src={imageUrl}
                                                alt={story.title || "Feature Image"}
                                                width={387}
                                                height={567}
                                                placeholder="blur"
                                                blurDataURL={blurImageUrl}
                                                className="object-cover rounded-2xl w-full md:block hidden"
                                                sizes="
                                                (min-width: 1536px) 20vw,
                                                (min-width: 1280px) 25vw,
                                                (min-width: 1024px) 33vw,
                                                (min-width: 640px) 50vw,
                                                100vw
                                                "
                                            />
                                            <div className="absolute bottom-0 left-0 w-full h-2/3 rounded-b-[24px] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                        </div>
                                    )}
                                     {imageMobileUrl && (
                                        <div
                                            className="!relative block">
                                            <Image
                                                src={imageMobileUrl}
                                                alt={story.title || "Feature Image"}
                                                width={600}
                                                height={800}
                                                placeholder="blur"
                                                blurDataURL={blurImageMobileUrl}
                                                className="object-cover rounded-2xl w-full md:hidden block"
                                                sizes="
                                                (min-width: 1536px) 20vw,
                                                (min-width: 1280px) 25vw,
                                                (min-width: 1024px) 33vw,
                                                (min-width: 640px) 50vw,
                                                100vw
                                                "
                                            />
                                            <div className="absolute bottom-0 left-0 w-full h-2/3 rounded-b-[24px] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                        </div>
                                    )}

                                    <div className="absolute bottom-[30px] z-30 transition-all duration-500">
                                        <div className="md:px-8 px-4 w-full">
                                            {logoImageUrl && (
                                                <Image
                                                    src={logoImageUrl}
                                                    alt={story.title || "Feature Image"}
                                                    width={186}
                                                    height={36}
                                                    placeholder="blur"
                                                    blurDataURL={logoBlurImageUrl}
                                                    className="object-cover"
                                                />
                                            )}
                                            <h3 className={`font-gilroy-semibold text-white font-light sm:text-[36px] text-xl tracking-tighter mb-3 group-hover:text-white transition-colors duration-500 ${page!=='beckers-asc' ? 'max-w-40' : 'max-w-[240px] leading-[110%]'}  `}>
                                                {story?.title}
                                            </h3>
                                            <p className="text-white sm:text-xl text-base font3">{story.description}</p>
                                            <ButtonComponent button={story?.ctaButtonPrimary} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </>
    )
}
export default CustomerStories