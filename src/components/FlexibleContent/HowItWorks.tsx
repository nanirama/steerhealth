import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText } from '@portabletext/react';
import ImageComponent from "../Elements/ImageComponent"



export default function HowItWorks({ data }: any) {

  const imageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(140)
      .width(140)
      .format("webp")
      .auto("format")
      .fit("max")
      .url();

  return (
    <>
      <div className="w-full md:py-12 py-6 bg-white">
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-[60px] leading-[100%] text-[#171717] font-semibold font2">{data?.heading}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center md:my-16 my-6">
            <div className="flex sm:flex-row flex-col items-center justify-center bg-gradient-to-b from-[#A7B8FF] to-[#F4F5FB]  rounded-3xl h-full lg:py-0 sm:py-40 py-16">
              <div className=" ">
                <div className="flex sm:flex-row flex-col  items-center justify-center sm:space-x-4">

                  <div className="rounded-3xl w-[140px] h-[140px] relative ">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt="Client"
                        width={140}
                        height={140}
                        sizes="
                       (min-width: 1280px) 800px,
                       (min-width: 1024px) 700px,
                        (min-width: 768px) 600px,
                          100vw "
                        className="object-contain border-2 border-[#FFFFFF] rounded-3xl "
                      />
                    )}

                  </div>


                  <div className="bg-white rounded-full p-4  border border-[#5C5C5C] sm:my-0 my-4">
                    <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.2285 2.80371L19.9172 6.49241L16.2285 10.1811" stroke="#5C5C5C" strokeWidth="1.05391" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3.31641 11.0972V10.175C3.31641 9.19673 3.70504 8.25849 4.3968 7.56672C5.08857 6.87496 6.0268 6.48633 7.00511 6.48633H19.9156" stroke="#5C5C5C" strokeWidth="1.05391" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.00511 21.2426L3.31641 17.5539L7.00511 13.8652" stroke="#5C5C5C" strokeWidth="1.05391" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19.9156 12.9434V13.8655C19.9156 14.8438 19.5269 15.7821 18.8352 16.4738C18.1434 17.1656 17.2052 17.5542 16.2269 17.5542H3.31641" stroke="#5C5C5C" strokeWidth="1.05391" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Steer Logo */}
                  <div className="bg-[#335CFF] border-2 border-[#FFFFFF] rounded-3xl p-6 shadow-lg relative w-[140px] h-[140px]">

                    <ImageComponent
                      src={`ehr-howitworks-svg3.webp`}
                      alt="Hero Image"
                      width={78}
                      height={78}
                      className="absolute top-8"
                      sizes="
                       (min-width: 1280px) 800px,
                       (min-width: 1024px) 700px,
                        (min-width: 768px) 600px,
                          100vw "/>
                  </div>
                </div>
              </div>
            </div>


            <div className=" bg-[#F8FAFB] border border-[#E9EAEB] py-10 px-[2.6rem] rounded-3xl">
              <PortableText value={data?.content}
                components={{
                  list: {
                    bullet: ({ children }) => <ul className="m-0 p-0">{children}</ul>,
                  },
                  listItem: {
                    bullet: ({ children }) => {
                      return (
                        <li className="mb-2">
                          <div className="flex items-start space-x-3">
                            <div className="bg-[#31DD63] rounded-full p-2 flex-shrink-0 mt-1">
                              <svg
                                width="13.6"
                                height="13.6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white"
                              >
                                <polyline points="20,6 9,17 4,12" />
                              </svg>
                            </div>
                            <div className="flex-1 howitworks-section">
                              {children}
                            </div>
                          </div>
                        </li>
                      )
                    },
                  },
                }} />

            </div>
          </div>
        </div>

      </div>
    </>
  )
}
