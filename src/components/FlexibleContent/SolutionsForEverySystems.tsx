import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import ButtonComponent from "../Elements/ButtonComponent";
import { urlForImage, getSlugUrl } from "@/sanity/lib/utils";

const SolutionsForEverySystems = ({ data }: any) => {
    return (
        <>
            <div className="w-full sm:py-12 py-6 overflow-hidden relative">
                <div className="max-w-[1660px] mx-auto px-4">
                    <div className="flex flex-col items-center justify-center gap-4">
                        {data?.tagline && <p className="sm:text-base text-xs font-medium leading-[110%] uppercase text-[#5C5C5C] tracking-[0.06em]">{data?.tagline}</p>}
                        {data?.heading && <h2 className="md:text-[63px] text-[40px] font4 leading-[110%] md:tracking-tight tracking-[-0.02em] text-[#335CFF] text-center md:max-w-full max-w-5xl sm:py-0 py-2">{data?.heading}</h2>}
                        {data?.subheading && <h3 className="md:text-[54px] sm:text-[30px] text-[30px] leading-[110%] text-[#262626] -mt-5 md:tracking-tighter tracking-[-0.02em] font5 text-center">{data?.subheading}</h3>}
                        {data?.description && <p className="md:max-w-[700px] text-[#5C5C5C] sm:text-[24px] text-base font3 mx-auto text-center">{data?.description}</p>}
                    </div>

                    <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-6 sm:my-16 my-12">
                        {data?.items && data?.items.map((item: any, index: number) => {

                            const secondimageUrl = item?.secondImage &&
                                urlForImage(item.secondImage)
                                    ?.width(600)
                                    ?.height(700)
                                    .format('webp')
                                    ?.fit('crop')
                                    ?.quality(80)
                                    ?.url();

                            const blurSecondImageUrl = item?.secondImage &&
                                urlForImage(item?.secondImage)
                                    ?.height(24)
                                    ?.width(24)
                                    ?.blur(40)
                                    ?.quality(40)
                                    .format('webp')
                                    ?.fit('crop')?.url();
                            
                            const mobileSecondImageUrl = item?.secondImage &&
                                urlForImage(item?.secondImage)
                                    ?.width(800)
                                    ?.height(700)
                                    ?.format('webp')
                                    ?.fit('crop')
                                    ?.quality(75)
                                    ?.url();

                            const mobileBlurSecondImageUrl = item?.secondImage &&
                                urlForImage(item?.secondImage)
                                    ?.height(20)
                                    ?.width(39)
                                    ?.blur(20)
                                    .format('webp')
                                    ?.fit('crop')?.url();
                            const imageUrl = item?.image &&
                                urlForImage(item.image)
                                    ?.height(1100)
                                    ?.width(570)
                                    .format('webp')
                                    ?.fit('crop')
                                    ?.quality(80)
                                    ?.url();

                            const blurImageUrl = item?.image &&
                                urlForImage(item?.image)
                                    ?.height(24)
                                    ?.width(10)
                                    ?.blur(40)
                                    ?.quality(40)
                                    .format('webp')
                                    ?.fit('crop')?.url();

                            const mobileImageUrl = item?.image &&
                                urlForImage(item?.image)
                                    ?.height(1100)
                                    ?.width(570)
                                    ?.format('webp')
                                    ?.fit('crop')
                                    ?.quality(75)
                                    ?.url();

                            const mobileBlurImageUrl = item?.image &&
                                urlForImage(item?.image)
                                    ?.height(20)
                                    ?.width(39)
                                    ?.blur(20)
                                    .format('webp')
                                    ?.fit('crop')?.url();

                            const slugUrl = getSlugUrl(item?.ctaButtonPrimary?.internalLink?._type, item?.ctaButtonPrimary?.internalLink?.slug, item?.ctaButtonPrimary?.internalLink?.categorySlug)

                            return (
                                <Link href={slugUrl} key={index} className="block relative group overflow-hidden border border-[#EBEBEB] h-[550px] rounded-[24px]">
                                    {/* Desktop Image */}
                                    <div className="lg:block hidden relative h-full w-full">
                                        {imageUrl && blurImageUrl && (
                                            <Image
                                                src={imageUrl}
                                                alt={item?.title || "System Image"}
                                                width={285}
                                                height={550}
                                                placeholder="blur"
                                                blurDataURL={blurImageUrl}
                                                loading="lazy"
                                                priority={false}
                                                quality={75}
                                                className={`absolute inset-0 h-full w-full rounded-[24px] object-cover transition-all duration-500 group-hover:scale-105 ${
                                                    secondimageUrl ? 'opacity-100 group-hover:opacity-0' : 'opacity-100'
                                                }`}
                                                sizes="(min-width: 1440px) 370px, (min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw"
                                            />
                                        )}
                                        {secondimageUrl && blurSecondImageUrl && (
                                            <Image
                                                src={secondimageUrl}
                                                alt={item?.title || "System Image"}
                                                width={1200}
                                                height={1100}
                                                placeholder="blur"
                                                blurDataURL={blurSecondImageUrl}
                                                loading="lazy"
                                                priority={false}
                                                quality={75}
                                                className="absolute top-0 left-0 w-full h-auto rounded-t-[24px] object-contain opacity-0 group-hover:opacity-100 transition-all duration-500"
                                                sizes="100vw"
                                            />
                                        )}
                                    </div>
                                    

                                    {/* Mobile Image */}
                                    <div className="lg:hidden block relative h-full w-full">
                                    {secondimageUrl && blurSecondImageUrl && (
                                            <Image
                                                src={secondimageUrl}
                                                alt={item?.title || "System Image"}
                                                width={1200}
                                                height={1100}
                                                placeholder="blur"
                                                blurDataURL={blurSecondImageUrl}
                                                loading="lazy"
                                                priority={false}
                                                quality={75}
                                                className="absolute top-0 left-0 w-full h-auto rounded-t-[24px] object-contain  group-hover:opacity-100 transition-all duration-500"
                                                sizes="100vw"
                                            />
                                        )}
                                        {/* {mobileImageUrl && mobileBlurImageUrl && (
                                            <Image
                                                src={mobileImageUrl}
                                                alt={item?.title || "System Image"}
                                                width={285}
                                                height={550}
                                                placeholder="blur"
                                                blurDataURL={mobileBlurImageUrl}
                                                loading="lazy"
                                                priority={false}
                                                quality={75}
                                                className="relative h-full w-full rounded-[24px] object-cover"
                                                sizes="(min-width: 1440px) 370px, (min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw"
                                            />
                                        )} */}
                                    </div>

                                    {/* Content container with white background */}
                                    <div className="absolute bottom-0 left-0 right-0 z-20">
                                        {/* White background - expands with content */}
                                        <div className="bg-white rounded-[24px] lg:bg-transparent lg:group-hover:bg-white lg:group-hover:rounded-[24px] px-6 pt-[30px] pb-[30px] transition-all duration-500 ease-in-out">
                                            {/* Title - always visible */}
                                            <h3 className="md:max-w-[150px] font3 font-light sm:text-[24px] text-[20px] leading-[140%] tracking-tighter text-[#171717] transition-colors duration-500">
                                                {item?.title}
                                            </h3>
                                            
                                            {/* Description and Button - visible on mobile and tablet, appear on hover for desktop */}
                                            <div className="lg:max-h-0 lg:opacity-0 lg:overflow-hidden lg:group-hover:max-h-[500px] lg:group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                                {item?.description && (
                                                    <div className="mt-3 mb-4">
                                                        <PortableText
                                                            value={item.description}
                                                            components={{
                                                                block: {
                                                                    normal: ({ children }) => (
                                                                        <p className="text-[18px] leading-[140%] font-normal font3 text-[#5C5C5C] tracking-[0%] mb-2">
                                                                            {children}
                                                                        </p>
                                                                    ),
                                                                    h3: ({ children }) => (
                                                                        <h3 className="text-[18px] font-normal leading-[140%] font3 text-[#171717] tracking-[0%] mb-2">
                                                                            {children}
                                                                        </h3>
                                                                    ),
                                                                },
                                                                marks: {
                                                                    strong: ({ children }) => (
                                                                        <strong className="font-semibold font3">
                                                                            {children}
                                                                        </strong>
                                                                    ),
                                                                    em: ({ children }) => (
                                                                        <em className="italic font3">
                                                                            {children}
                                                                        </em>
                                                                    ),
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex justify-center mt-8">
                                                    <Link
                                                        href={slugUrl}
                                                        className="inline-flex items-center justify-center bg-[rgba(71,108,255,0.1)] hover:bg-[rgba(71,108,255,0.15)] text-[#476CFF] font-medium text-[14px] leading-[20px] tracking-[-0.006em] px-3 py-1.5 rounded-lg transition-all duration-300 ease-in-out"
                                                    >
                                                        {"See in Action"}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SolutionsForEverySystems;