import React from "react";
import { PortableText } from '@portabletext/react';
import { urlForImage } from "@/sanity/lib/utils";
import ImageComponent from "../Elements/ImageComponent";

const BeforeAfterSection = ({ data }: any) => {
  const { beforeAfterItems } = data;
  // const iconimageUrl = data?.icon &&
  //   urlForImage(data?.icon)
  //     ?.height(72)
  //     .width(78)
  //     .format("webp")
  //     .auto("format")
  //     .fit("max")
  //     .url();


  return (
    <>
      <div className="w-full md:py-16 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex md:flex-row flex-col lg:gap-40 gap-4 justify-between items-center">
            {data?.title && (
              <h2 className="text-[#171717] lg:text-[60px] text-[40px] leading-[100%] font-semibold font2 md:w-[40%] w-full">{data?.title}</h2>
            )}
            {data?.description && (
              <p className="text-[#5C5C5C] lg:text-2xl text-xl leading-[140%] font3 md:w-[60%] w-full">{data?.description}</p>
            )}

          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:pt-18 pt-6 items-stretch">
            {beforeAfterItems && beforeAfterItems.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="relative shadow-xs shadow-[#0A0D1408]/3% rounded-3xl group overflow-hidden flex flex-col"
                >
                  {item?.ImageUrl && (
                    <div className="relative flex-1">
                      {/* Image */}
                      <ImageComponent
                        src={item?.ImageUrl}
                        alt="Before And After"
                        width={386}
                        height={247}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, 400px"
                        className="object-cover lg:rounded-3xl md:rounded-2xl rounded-xl w-full h-full"
                      />

                      {/* Black Overlay */}
                      <div className="lg:rounded-3xl md:rounded-2xl rounded-xl absolute inset-0 bg-black/50 transition-opacity duration-500 ease-in-out group-hover:opacity-0" />

                      {/* Gradient overlay after hover */}
                      <div className="lg:rounded-3xl md:rounded-2xl rounded-xl absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* BEFORE Text */}
                      <div className="absolute bottom-6 left-6 text-white z-10">
                        <div className="before-sec transform transition-all duration-700 ease-in-out group-hover:translate-y-2 group-hover:opacity-0 pr-4">
                          <p className="text-white text-[15px] leading-[140%] font5 pb-2">
                            Before
                          </p>
                          {item?.beforeDescription && (
                            <PortableText
                              value={item?.beforeDescription}
                              components={{
                                block: {
                                  normal: ({ children }) => (
                                    <h4 className="text-white text-[24px] leading-[120%] font-gilroy-medium">
                                      {children}
                                    </h4>
                                  ),
                                },
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {/* AFTER Text */}
                      <div className="absolute bottom-6 left-6 text-white z-10">
                        <div className="after-sec transform translate-y-2 opacity-0 transition-all duration-700 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 pr-4">
                          <p className="text-white text-[15px] leading-[140%] font5 pb-2">
                            After
                          </p>
                          {item?.afterDescription && (
                            <PortableText
                              value={item?.afterDescription}
                              components={{
                                block: {
                                  normal: ({ children }) => (
                                    <h4 className="text-white text-[24px] leading-[120%] font-gilroy-medium">
                                      {children}
                                    </h4>
                                  ),
                                },
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:pt-18 pt-6">

            {beforeAfterItems && beforeAfterItems.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="relative shadow-xs shadow-[#0A0D1408]/3% rounded-3xl group overflow-hidden border border-red-600"
                >
                  {item?.ImageUrl && (
                    <div className="relative">
                      <ImageComponent
                        src={item?.ImageUrl}
                        alt="Before And After"
                        width={386}
                        height={247}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, 400px"
                        className="object-cover lg:rounded-3xl md:rounded-2xl rounded-xl w-full"
                      />

                      <div className="lg:rounded-3xl md:rounded-2xl rounded-xl absolute inset-0 bg-black/50 transition-opacity duration-500 ease-in-out group-hover:opacity-0" />

                      <div className="lg:rounded-3xl md:rounded-2xl rounded-xl absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="absolute bottom-6 left-6 text-white z-10">
                        <div className="before-sec transform transition-all duration-700 ease-in-out group-hover:translate-y-2 group-hover:opacity-0 pr-4">
                          <p className="text-white text-[15px] leading-[140%] font5 pb-2">
                            Before
                          </p>
                          {item?.beforeDescription && (
                            <PortableText
                              value={item?.beforeDescription}
                              components={{
                                block: {
                                  normal: ({ children }) => (
                                    <h4 className="text-white text-[24px] leading-[120%] font-gilroy-medium">
                                      {children}
                                    </h4>
                                  ),
                                },
                              }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="absolute bottom-6 left-6 text-white z-10">
                        <div className="after-sec transform translate-y-2 opacity-0 transition-all duration-700 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 pr-4">
                          <p className="text-white text-[15px] leading-[140%] font5 pb-2">
                            After
                          </p>
                          {item?.afterDescription && (
                            <PortableText
                              value={item?.afterDescription}
                              components={{
                                block: {
                                  normal: ({ children }) => (
                                    <h4 className="text-white text-[24px] leading-[120%] font-gilroy-medium">
                                      {children}
                                    </h4>
                                  ),
                                },
                              }}
                            />
                          )}
                        </div>
                      </div>

                    </div>
                  )}
                </div>


              )
            })}
          </div> */}
          {/* <div className="relative">

                        {data?.ImageUrl && (
                            <ImageComponent
                                src={`${data?.ImageUrl}`}
                                alt="Beforeafter Image"
                                width={1200}
                                height={292}
                                className="w-full rounded-[24px]"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                            />
                        )}
                       
                      
                    </div> */}

        </div>
      </div>
    </>
  )
}
export default BeforeAfterSection