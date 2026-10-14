import React from "react";

import { PortableText } from '@portabletext/react';
import { getGradientTextColor } from '@/lib/index';
import ButtonComponent from "@/components/Elements/ButtonComponent";
import Image from "next/image";
import { getHeroImagePath, getHeroBlurPath } from '@/lib/index';
import { urlForImage } from '@/sanity/lib/utils';

const HeroImageSection = ({ data, page }) => {
    const heroImageUrl = data?.imageUrl && getHeroImagePath(data?.imageUrl);
    const heroBlurUrl = data?.imageUrl && getHeroBlurPath(data?.imageUrl);

    const imageUrl = data?.image &&
            urlForImage(data?.image)
                ?.width(1320)  // Reduced from 1200 (33% smaller)
                ?.height(994)
                ?.format('webp')
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
        <div className="bg-white mx-auto p-4">
            <div className="md:max-w-[1366px] lg:min-h-[550px] w-full mx-auto bg-gradient2 rounded-[24px] flex md:flex-row flex-col justify-between items-stretch md:gap-6 gap-4 md:pt-10 md:p-0 p-4">
                <div className="md:w-[48.4%] w-full md:mb-10 mb-4 flex flex-row justify-start items-stretch">
                    <div className="bg-white md:p-10 px-5 py-6 rounded-[20px] md:mx-8 mx-0 flex flex-col justify-center gap-4 items-start md:w-auto w-full">
                        <div>
                        {(() => {
                  let normalBlockIndex = 0;
                  return (
                    <PortableText value={data?.heading}
                      components={{
                        block: {
                          normal: ({ children }) => {
                            const isFirst = normalBlockIndex === 0;
                            normalBlockIndex += 1;
                            const className = "md:text-[56px] text-[40px] text-[#171717] font-bold font2 tracking-normal leading-[110%]";
                            return isFirst ? (
                              <h1 className={className}>{children}</h1>
                            ) : (
                              <h2 className={className}>{children}</h2>
                            );
                          },
                        },
                        marks: {
                            textColor: ({ children, value }) => {
                                return getGradientTextColor(children, value, page)
                            },
                            em: ({ children }) => <em className="italic">{children}</em>,
                        },
                      }} />
                  );
                })()}
                            {/* <PortableText value={data?.heading}
                                components={{
                                    block: {
                                        normal: ({ children }) => {
                                          const isFirst = normalBlockIndex === 0;
                                          normalBlockIndex += 1;
                                          const className = "md:text-[56px] text-[40px] text-[#171717] font-bold font2 tracking-normal leading-[110%]";
                                          return isFirst ? (
                                            <h1 className={className}>{children}</h1>
                                          ) : (
                                            <h2 className={className}>{children}</h2>
                                          );
                                        },
                                      },
                                    // block: {
                                    //     normal: ({ children }) => <p className="md:text-[56px] text-[40px] text-[#171717] font-bold font2 tracking-normal leading-[110%]">{children}</p>,
                                    // },
                                    marks: {
                                        textColor: ({ children, value }) => {
                                            return getGradientTextColor(children, value, page)
                                        },
                                        em: ({ children }) => <em className="italic">{children}</em>,
                                    },
                                }} /> */}
                        </div>
                        {data?.description && (
                            <p className="lg:text-[22px] text-sm leading-[140%] text-[#5C5C5C] font3 max-w-md">{data?.description}</p>
                        )}

                        <div className="flex flex-row gap-4 items-center">
                            <div className="inline-flex">
                                {data?.ctaButtonPrimary && (
                                    <div className="inline-flex">
                                        <ButtonComponent button={data?.ctaButtonPrimary} />
                                    </div>
                                )}
                            </div>
                            {data?.ctaButtonSecondary && data?.ctaButtonSecondary?.buttontext && (
                                <div className="inline-flex">
                                    <ButtonComponent button={data?.ctaButtonSecondary} />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row items-center md:gap-10 gap-4 md:mb-0 mb-4">
                            {data?.bookingsPercentage && (
                                <p className="lg:text-[60px] text-[34px] leading-[100%] text-black font2">{data?.bookingsPercentage}%</p>
                            )}

                            {data?.bookingsLabel && (
                                <p className="lg:text-xl md:text-base tracking-tight text-xs leading-[140%] text-[#818181] sm:max-w-[220px] max-w-[170px]">{data?.bookingsLabel}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="md:w-[51.6%] w-full md:mb-0 mb-4">
                    <div className="relative w-full lg:max-w-[800px]">
                    {imageUrl && blurImageUrl ? (
                                                <div
                                                    className="relative"
                                                >
                                                    <Image
                                                        src={imageUrl}
                                                        alt="Hero Image"
                                                        width={1100}
                                                        height={450}
                                                        placeholder="blur"
                                                        blurDataURL={blurImageUrl}
                                                        className={`object-cover z-20 w-full`}
                                                        priority
                                                        fetchPriority="high"
                                                        loading="eager"
                                                        quality={85}
                                                        sizes="(max-width: 640px) 100vw,
                                                        (max-width: 768px) 100vw,
                                                        (max-width: 1024px) 85vw,
                                                        (max-width: 1366px) 1100px, 
                                                        800px"
                    
                                                    />
                                                </div>
                                            ) : data?.imageUrl && heroBlurUrl ? (
                                                <div
                                                    className="relative"
                                                >
                                                    <Image
                                                        src={heroImageUrl}
                                                        alt="Hero Image"
                                                        width={800}
                                                        height={497}
                                                        placeholder="blur"
                                                        blurDataURL={heroBlurUrl}
                                                        className={`object-cover z-20 w-full`}
                                                        priority
                                                        fetchPriority="high"
                                                        loading="eager"
                                                        quality={85}                    
                                                        sizes="(max-width: 640px) 100vw,
                                                        (max-width: 768px) 100vw,
                                                        (max-width: 1024px) 85vw,
                                                        (max-width: 1366px) 1000px, 
                                                        800px"
                                                    />
                                                </div>
                                            ) : data?.imageUrl ? (
                                                <div
                                                    className="relative"
                                                >
                                                    <Image
                                                        src={heroImageUrl}
                                                        alt="Hero Image"
                                                        width={800}
                                                        height={497}
                                                        className={`object-cover z-20 w-full`}
                                                        priority
                                                        fetchPriority="high"
                                                        loading="eager"
                                                        quality={85}                    
                                                        sizes="(max-width: 640px) 100vw,
                                                        (max-width: 768px) 100vw,
                                                        (max-width: 1024px) 85vw,
                                                        (max-width: 1366px) 1000px, 
                                                        800px"
                                                    />
                                                </div>
                                            ) : null}
                        {/* {data?.imageUrl && (
                            <Image
                                src={`${heroImageUrl}`}
                                alt="Hero Image"
                                width={800}
                                height={497}
                                className="z-20 w-full"
                                priority={true}
                                placeholder="blur"
                                blurDataURL={`${heroBlurUrl}`}
                                sizes="
                                    (min-width: 1280px) 800px,
                                    (min-width: 1024px) 700px,
                                    (min-width: 768px) 600px,
                                    100vw
                                "
                            />
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeroImageSection