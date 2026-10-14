import React from "react";
import Link from "next/link";
import LazyVideo from "../Elements/LazyVideo";
import ButtonComponent from "../Elements/ButtonComponent";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { getGradientTextColor, getVideoName } from '../../lib/index';

const HeroVideoSection = ({ data }) => {


  const videoName = getVideoName(data?.videoUrl);
  const videoPoster = `${videoName}.webp`;
  const imageUrl = data?.icon &&
    urlForImage(data?.icon)
      ?.height(24)
      .width(24)
      .format("webp")
      .auto("format")
      .fit("max")
      .url();


  const mobileImg = data?.mobileHeroImage &&
    urlForImage(data?.mobileHeroImage)
      ?.width(677)
      ?.height(1380)
      ?.format('webp')
      .fit('crop')
      .crop('top')
      ?.quality(55)
      ?.url();

  // Mobile blur placeholder
  const mobileBlur = data?.mobileHeroImage &&
    urlForImage(data?.mobileHeroImage)
      ?.width(16)
      ?.height(8)
      ?.blur(50)
      ?.quality(10)
      ?.url();
  return (
    <>
      <div className="w-full py-2 bg-white">
        <div className="max-w-[1420px] mx-auto px-2 py-4 relative">
          <div className="md:block hidden">
            <LazyVideo
              className=" w-full rounded-lg md:relative md:block hidden"
              srcWebm={data?.videoUrl}
              srcMp4={data?.videoUrl}
              width={1320}
              height={550}
              poster={videoPoster}
            />
          </div>

          <div className="block md:hidden">
            <Image
              src={mobileImg}
              alt="Hero Image Mobile"
              width={677}
              height={1380}
              className="w-full h-[800px] object-cover md:h-auto !rounded-lg md:relative md:hidden"
              priority
              fetchPriority="high"
              sizes="(max-width: 640px) 100vw, 768px"
              quality={55}
            />
          </div>

          {/* <LazyVideo
            className="w-full h-[800px] object-cover md:h-auto !rounded-lg md:relative md:hidden"
            srcWebm={data?.videoUrl}
            srcMp4={data?.videoUrl}
            poster={videoPoster}
          /> */}

          <div className="md:absolute relative lg:w-[600px] md:w-[400px] w-full md:inset-y-12 md:left-10 z-2  flex flex-row justify-center items-center">
            {/* <div className="bg-white absolute md:!inherit bottom-[24px] lg:p-10 p-3 md:h-full md:w-full w-[97%] rounded-[20px] md:mx-0 mx-4 flex flex-col justify-center gap-4 items-start"> */}
            <div className="bg-white md:relative absolute  md:inset-y-0  bottom-[18px] lg:p-10 p-4 md:h-full md:w-full w-[94%] md:rounded-[20px] rounded-[12px] md:mx-0 mx-4 flex flex-col justify-center gap-4 items-start">
              <div>
                {data?.iconLabel && data?.icon && (
                  <div className="inline-flex flex-row gap-2 items-center px-4 py-2 border border-[#ECEFF1] rounded-full text-[13px] font-medium font3 leading-[20px] mb-3 text-[#252525]">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
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
                            const className = "xl:text-[56px] tracking-[-0.02em] sm:text-[40px] text-[30px] text-[#171717] md:font-bold md:font2 font-gilroy-semibold md:leading-[110%] leading-[130%]";
                            return isFirst ? (
                              <h1 className={className}>{children}</h1>
                            ) : (
                              <h2 className={className}>{children}</h2>
                            );
                          },
                        },
                        marks: {
                          textColor: ({ children, value }) => {
                            return getGradientTextColor(children, value)
                          },
                          em: ({ children }) => <em className="italic border border-red-600">{children}555</em>,
                        },
                      }} />
                  );
                })()}
              </div>
              {data?.description && (
                <p className="lg:text-[22px] text-base leading-[140%] text-[#5C5C5C] font3">{data?.description}</p>
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
                  <p className="lg:text-[60px] text-[48px] tracking-[-0.02em] leading-[100%] text-black font2">{data?.bookingsPercentage}%</p>
                )}

                {data?.bookingsLabel && (
                  <p className="lg:text-xl md:text-base text-sm tracking-tight leading-[140%] text-[#818181] sm:max-w-[220px] max-w-[170px]">{data?.bookingsLabel}</p>
                )}
              </div>
            </div>
          </div>
          {/* <div className="maincontainer flex flex-col gap-4 items-stretch lg:w-[560px] md:w-[400px] sm:w-[93%] w-[89%] bg-white rounded-2xl lg:p-8 sm:p-4 p-1 absolute md:left-12 left-[20px] md:right-[inherit] right-[20px] justify-center md:top-16 md:bottom-16 top-[40px]">
            {data?.iconLabel && data?.icon && (
              <div>
                <div className="inline-flex flex-row gap-2 items-center px-4 py-2 border border-[#ECEFF1] rounded-full text-[13px] font-medium font3 leading-[20px] mb-3 text-[#252525]">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt="Client"
                      width={18}
                      height={18}
                      sizes="(max-width: 768px) 18px, 18px"
                      className="object-contain"
                    />
                  )}
                  {data?.iconLabel}
                </div>
              </div>
            )}
            <div>
              <PortableText value={data?.heading}
                components={{
                  block: {
                    normal: ({ children }) => <p className="lg:text-[60px] text-[40px] leading-[100%] text-[#171717] font-semibold p-0 m-0 w-full font2">{children}</p>,
                  },
                  marks: {
                    textColor: ({ children, value }) => {
                      return getGradientTextColor(children, value)
                    },
                    em: ({ children }) => <i className="bg-gradient-to-r from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent">{children}</i>,
                  },
                }} />
            </div>
            {data?.description && (
              <p className="lg:text-2xl text-sm leading-[140%] text-[#5C5C5C] font3 max-w-sm">{data?.description}</p>
            )}

            <div className="flex flex-row gap-4 items-center w-full">
              <div className="inline-flex">
                <Link href="#" className="text-sm text-white text-center font-medium leading-[20px] bg-[#335CFF] rounded-lg sm:px-4 px-1 py-2 flex flex-row items-center sm:gap-4 gap-1">Start Now <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.6699 10.249L7.7939 18.125L6.5 16.8311L14.3751 8.95513H7.43428V7.125H17.5V17.1907H15.6699V10.249Z" fill="white" />
                </svg> </Link>
              </div>
              <div className="inline-flex">
                <Link href="#" className="text-sm text-[#171717] text-center font-medium leading-[20px] border border-[#335CFF] rounded-lg px-4 py-2">Calculate ROI</Link>
              </div>
            </div>
            <div className="flex flex-row items-center md:gap-10 gap-4 md:mb-0 mb-4">
              {data?.bookingsPercentage && (
                <p className="lg:text-[60px] text-[34px] leading-[100%] text-black font2">{data?.bookingsPercentage}%</p>
              )}

              {data?.bookingsLabel && (
                <p className="lg:text-xl md:text-base text-xs leading-[140%] text-[#818181] sm:max-w-[200px] max-w-[150px]">{data?.bookingsLabel}</p>
              )}
            </div>
          </div> */}
          {/* <LazyVideo
            className="aspect-video w-full !rounded-lg md:relative md:hidden"
            srcWebm={data?.videoUrl}
            srcMp4={data?.videoUrl}
            poster={videoPoster}
            width={1320}
            height={550}
          /> */}
        </div>
      </div>
    </>
  )
}
export default HeroVideoSection