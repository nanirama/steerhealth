import React from "react";
import ButtonComponent from "../Elements/ButtonComponent";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { getGradientTextColor, getVideoName } from '../../lib/index';

const HospitalsHeroSection = ({ data, page }) => {

  const videoName = getVideoName(data?.videoUrl);
  const imageUrl = data?.image &&
      urlForImage(data?.image)
        ?.height(1040)
        .width(2640)
        .format("webp")
        .auto("format")
        .fit("max")
        .url();

  urlForImage(data?.icon)
    ?.height(24)
    .width(24)
    .format("webp")
    .auto("format")
    .fit("max")
    .url();
  return (
    <>
      <div className="w-full py-2 bg-white">
        <div className="max-w-[1420px] mx-auto px-2 py-4 relative flex flex-col gap-10">
          <div className="w-full mt-4 z-2 flex flex-col justify-center items-center ">
            <div className="flex flex-col">
              {data?.iconLabel && data?.icon && (
                <div className="inline-flex flex-row gap-2 justify-center items-center text-center mx-auto px-4 py-2 border border-[#ECEFF1] rounded-full text-[13px] font-medium font3 leading-[20px] mb-3 text-[#252525]">
                  {data?.icon && (
                    <Image
                      src={data?.icon}
                      alt="Client"
                      width={18}
                      height={18}
                      sizes="(max-width: 768px) 18px, 18px"
                      className="object-contain"
                    />
                  )}
                  {data?.iconLabel}
                </div>
              )}

{(() => {
                  let normalBlockIndex = 0;
                  return (
                    <PortableText value={data?.heading}
                      components={{
                        block: {
                          normal: ({ children }) => {
                            const isFirst = normalBlockIndex === 0;
                            normalBlockIndex += 1;
                            const className = `xl:text-[56px] text-[40px] mx-auto text-center text-[#171717] font-bold font2 md:leading-[110%] leading-[130%] ${(page === 'hospitals' || page === 'medical-groups' || page === 'ambulatory-surgery-centers') ? 'max-w-7xl' : 'max-w-3xl'}  `;
                            return isFirst ? (
                              <h1 className={className}>{children}</h1>
                            ) : (
                              <h2 className={className}>{children}</h2>
                            );
                          },
                        },
                        marks: {
                          textColor: ({ children, value }) => {
                            return <span className="font4 font-normal">{getGradientTextColor(children, value)}</span>
                          },
                          em: ({ children }) => <em className="italic text-[#3591FA] !font4 !font-normal">{children}</em>,
                        },
                      }} />
                  );
                })()}


              {/* <PortableText value={data?.heading}
                components={{
                  block: {
                    normal: ({ children }) => <p className={`xl:text-[56px] text-[40px] mx-auto text-center text-[#171717] font-bold font2 md:leading-[110%] leading-[130%] ${(page === 'hospitals' || page === 'medical-groups' || page === 'ambulatory-surgery-centers') ? 'max-w-7xl' : 'max-w-3xl'}  `}>{children}</p>,
                  },
                  marks: {
                    textColor: ({ children, value }) => {
                      return <span className="font4 font-normal">{getGradientTextColor(children, value)}</span>
                    },
                    em: ({ children }) => <em className="italic text-[#3591FA] !font4 !font-normal">{children}</em>,
                  },

                }} /> */}
            </div>
            {data?.description && (
              <p className="lg:text-[22px] text-sm leading-[140%] text-[#5C5C5C] font3 max-w-6xl mx-auto text-center py-8">{data?.description}</p>
            )}

            <div className="flex flex-row flex-wrap gap-4 items-center">
              {data?.ctaButtonPrimary && (
                <div className="inline-flex">
                  <ButtonComponent button={data?.ctaButtonPrimary} />
                </div>
              )}
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
                <p className="lg:text-xl md:text-base text-xs tracking-tight leading-[140%] text-[#818181] sm:max-w-[220px] max-w-[170px]">{data?.bookingsLabel}</p>
              )}
            </div>
          </div>
          <div className="w-full max-w-7xl mx-auto my-8 relative overflow-hidden rounded-2xl">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Client"
                width={1320}
                height={520}
                priority
                fetchPriority="high"
                loading="eager"
                quality={75}
                sizes="(max-width: 768px) 100vw, 100vw"
                className="w-full h-auto object-cover sm:h-[520px] rounded-2xl"
              />
            )}
            {/* {data?.image && data?.image && (
              <div className="w-full h-full">
                {data?.image && (
                  <Image
                    src={data?.image}
                    alt="Client"
                    width={1320}
                    height={520}
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="w-full h-auto object-cover"
                  />
                )}
                {data?.image}
              </div>
            )} */}

            {/* <Image
              src={`/images/hero/hospitals-hero-image.webp`}
              alt="Client"
              width={1320}
              height={520}
              sizes="(max-width: 768px) 100vw, 100vw"
              className="w-full h-auto object-cover"
            /> */}

            {/* Black shadow overlay */}
            {/* <div className="absolute inset-0 bg-black/60  rounded-2xl" /> */}


          </div>

          {/* <LazyVideo
            className="sm:h-[600px] w-full rounded-lg md:relative md:hidden"
            srcWebm={data?.videoUrl}
            srcMp4={data?.videoUrl}
            poster={videoPoster}
          /> */}
        </div>
      </div>
    </>
  )
}
export default HospitalsHeroSection