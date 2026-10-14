import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

const DataIntegrity = ({ data }) => {
  const imageUrl = data?.image &&
    urlForImage(data?.image)
      ?.width(375)
      ?.height(487)
      ?.format('webp')
      ?.fit('crop')
      ?.quality(80)
      ?.auto('format')
      ?.url();

  const blurImageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(487)
      ?.width(375)
      ?.blur(50)
      .format('webp')
      ?.fit('crop')
      ?.quality(20)
      ?.url();

  return (
    <section className="w-full bg-white pt-16 md:pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-b from-[#081A44] via-[#06163A] to-[#040E2A] rounded-2xl p-8 md:p-12 !pb-0 lg:p-24 relative overflow-hidden">
          {/* Background pattern - vertical lines */}
          <div className="absolute bottom-[-120px] left-0 right-0 h-full flex items-end justify-end  opacity-50">
            <Image src={`/images/bg-waves.webp`} alt="Background pattern" layout="fill" objectFit="scale-down" />
            {/* <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-end gap-1 pr-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#3794FF] rounded-t"
                  style={{
                    width: '3px',
                    height: `${Math.random() * 60 + 20}%`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div> */}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-row gap-10">
            <div className="pb-8 md:pb-12 lg:pb-16">
              {/* Title */}
              {data?.title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl  text-white mb-4 font-gilroy-semibold leading-tight tracking-[-2%]">
                  {data.title}
                </h2>
              )}

              {/* Subtitle */}
              {data?.subtitle && (
                <p className="text-lg md:text-xl text-white/90 mb-12 font3 leading-[140%] max-w-3xl">
                  {data.subtitle}
                </p>
              )}

              {/* Features */}
              {data?.features && data?.features.length > 0 && (
                <div className="flex flex-col gap-6 md:gap-8">
                  {data.features.map((feature, index) => {
                    const iconUrl = feature?.icon &&
                      urlForImage(feature?.icon)
                        ?.width(24)
                        .height(24)
                        .format("webp")
                        .auto("format")
                        .fit("max")
                        .url();

                    return (
                      <div key={index} className="flex flex-row gap-4">
                        <div className="w-[46px] h-[46px] rounded-[8px] border border-[#B8B8B8]/50 flex items-center justify-center">
                        {iconUrl && (
                          <Image
                            src={iconUrl}
                            alt={feature?.title || 'Feature icon'}
                            width={24}
                            height={24}
                            className="flex-shrink-0 object-contain"
                          />
                        )}
                        </div>
                        <div className="flex flex-col gap-3">
                          {feature?.title && (
                            <h3 className="text-base font-bold text-white !font3 leading-[140%]">
                              {feature.title}
                            </h3>
                          )}
                          {feature?.description && (
                            <p className="text-sm text-white/90 font5  max-w-sm leading-[140%]">
                              {feature.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex-1 absolute bottom-0 right-0">
              {imageUrl && blurImageUrl && (
                <Image
                  src={imageUrl}
                  alt={data?.title || "Content Image"}
                  width={375}
                  height={487}
                  placeholder="blur"
                  blurDataURL={blurImageUrl}
                  loading="lazy"
                  quality={80}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataIntegrity;
