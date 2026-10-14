import React from "react";
import ButtonComponent from "../../Elements/ButtonComponent";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { getGradientTextColor } from '../../../lib/index';

const SteerNotesHeroSection = ({ data, page }) => {
  const imageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(680)
      .width(900)
      .format("webp")
      .auto("format")
      .fit("max")
      .url();

  // Icon is already a URL from the query
  const iconUrl = data?.icon;

  return (
    <>
      <div className="w-full py-2 bg-white">
        <div className="max-w-[1420px] mx-auto px-2 py-4 relative flex flex-col gap-10">
          <div className="w-full mt-10 z-2 flex flex-col justify-center items-center">
            <div className="flex flex-col">
              {/* {data?.iconLabel && data?.icon && (
                <div className="inline-flex flex-row gap-2 justify-center items-center text-center mx-auto px-4 py-2 border border-[#ECEFF1] rounded-full text-[13px] font-medium font3 leading-[20px] mb-3 text-[#252525]">
                  {iconUrl && (
                    <Image
                      src={iconUrl}
                      alt="Client"
                      width={18}
                      height={18}
                      sizes="(max-width: 768px) 18px, 18px"
                      className="object-contain"
                    />
                  )}
                  {data?.iconLabel}
                </div>
              )} */}

              {data?.iconLabel && (
                <div className="inline-flex flex-row gap-2 justify-center items-center text-center mx-auto px-4 py-2 border border-[#ECEFF1] rounded-full text-[13px] font-medium font3 leading-[20px] mb-3 text-[#252525]">

                  {iconUrl && (
                    <Image
                      src={iconUrl}
                      alt="Icon"
                      width={18}
                      height={18}
                      className="object-contain"
                    />
                  )}

                  {data.iconLabel}
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
                          const className = "xl:text-[56px] text-[40px] mx-auto text-center text-[#171717] font-bold font2 md:leading-[110%] leading-[130%] max-w-3xl";
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
            </div>
            {data?.description && (
              <p className="lg:text-[22px] text-sm leading-[140%] text-[#5C5C5C] font3 max-w-[57rem] mx-auto text-center py-8">{data?.description}</p>
            )}

            <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
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

            <p className="text-sm font3 text-[#5c5c5c] pt-6">14-day free. No credit card required.</p>

          </div>

          <div className="w-full max-w-7xl mx-auto relative overflow-hidden rounded-2xl">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Hero Image"
                width={900}
                height={680}
                priority
                fetchPriority="high"
                loading="eager"
                quality={75}
                sizes="(max-width: 768px) 100vw, 100vw"
                className="h-auto rounded-2xl mx-auto"
              />
            )}
          </div>

          {/* Security Badges Section */}
          {data?.securityBadges && data?.securityBadges.length > 0 && (
            <div className="w-full flex flex-col items-center gap-6 ">
              <div className="flex flex-wrap justify-center gap-4">
                {data.securityBadges.map((badge, index) => {
                  // Badge icon is already a URL from the query
                  const badgeIconUrl = badge?.icon;

                  return (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-2 px-4 py-2.5 border border-[#E8F1FF] rounded-lg bg-white shadow-sm"
                    >
                      {badgeIconUrl && (
                        <Image
                          src={badgeIconUrl}
                          alt={badge?.text || 'Security badge'}
                          width={20}
                          height={20}
                          sizes="20px"
                          className="object-contain flex-shrink-0"
                        />
                      )}
                      <span className="text-sm font-medium text-[#171717] whitespace-nowrap font3">
                        {badge?.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Trusted By Text */}
              {data?.trustedByText && (
                <p className="text-center text-base font-medium text-[#5C5C5C] font3 mt-2 tracking-[0.16em]">
                  {data.trustedByText}
                </p>
              )}

              {/* Client Logos */}
              {data?.clientLogos && data?.clientLogos.length > 0 && (
                <div className="w-full flex flex-wrap items-center justify-center gap-4 md:gap-8 py-6">
                  {data.clientLogos.map((logo, index) => {
                    const logoImageUrl = logo?.imageUrl ||
                      (logo?.image && urlForImage(logo?.image)
                        ?.width(80)
                        .height(25)
                        .format("webp")
                        .auto("format")
                        .fit("max")
                        .url());

                    const isSvg = logo?.imageExtension === 'svg' ||
                      logoImageUrl?.includes('.svg') ||
                      logoImageUrl?.includes('format=svg');

                    if (!logoImageUrl) return null;

                    const logoContent = isSvg ? (
                      <img
                        src={logoImageUrl}
                        alt="Client logo"
                        className="max-h-[25px] border w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                        loading="lazy"
                      />
                    ) : (
                      <Image
                        src={logoImageUrl}
                        alt="Client logo"
                        height={25}
                        width={80}
                        className="max-h-[25px] w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                        loading="lazy"
                      />
                    );

                    return (
                      <div key={index} className="flex items-center justify-center">
                        {logo?.link ? (
                          <a
                            href={logo.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            {logoContent}
                          </a>
                        ) : (
                          logoContent
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SteerNotesHeroSection
