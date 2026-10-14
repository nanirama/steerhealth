import React from "react";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { getGradientTextColor } from '../../../lib/index';

const ModernHealthCare = ({ data }) => {
  const imageUrl = data?.image &&
    urlForImage(data?.image)
      ?.width(424)
      .height(460)
      .format("webp")
      .auto("format")
      .fit("max")
      .url();

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Headline and Subtitle */}
        <div className="mb-12 text-center">
          {data?.headline && (
            <div className="mb-4">
              {(() => {
                let normalBlockIndex = 0;
                return (
                  <PortableText value={data?.headline}
                    components={{
                      block: {
                        normal: ({ children }) => {
                          const isFirst = normalBlockIndex === 0;
                          normalBlockIndex += 1;
                          const className = "text-4xl md:text-5xl lg:text-6xl font-bold font2 leading-tight text-[#171717]";
                          return isFirst ? (
                            <h2 className={className}>{children}</h2>
                          ) : (
                            <h3 className={className}>{children}</h3>
                          );
                        },
                      },
                      marks: {
                        textColor: ({ children, value }) => {
                          return <span className="font4 font-normal">{getGradientTextColor(children, value)}</span>
                        },
                        em: ({ children }) => <em className="italic text-[#3794FF] !font4 !font-normal">{children}</em>,
                      },
                    }} />
                );
              })()}
            </div>
          )}
          {data?.subtitle && (
            <p className="text-lg md:text-xl text-[#5C5C5C] font3 max-w-2xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            {imageUrl && (
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="SteerNotes"
                  width={424}
                  height={460}
                  className="w-full h-auto object-cover"
                  priority
                  quality={85}
                />
              </div>
            )}
          </div>

          {/* Right Side - Features Grid */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            {data?.features && data?.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.features.map((feature, index) => {
                  const iconUrl = feature?.icon &&
                    urlForImage(feature?.icon)
                      ?.width(40)
                      .height(40)
                      .auto("format")
                      .fit("max")
                      .url();

                  return (
                    <div key={index} className="flex flex-row gap-3">
                      {iconUrl && (
                        <div className="flex-shrink-0">
                          <Image
                            src={iconUrl}
                            alt={feature?.title || 'Feature icon'}
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                      {feature?.title && (
                        <h4 className="text-xl font-medium text-[#191919] font3">
                          {feature.title}
                        </h4>
                      )}
                      {feature?.description && (
                        <p className="text-sm  text-[#999999] font3 leading-relaxed">
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
        </div>
      </div>
    </section>
  );
};

export default ModernHealthCare;
