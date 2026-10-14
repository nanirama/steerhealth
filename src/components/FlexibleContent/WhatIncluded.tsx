// components/OutcomesThatMatter.tsx
import { urlForImage } from '@/sanity/lib/utils';
import Image from "next/image";
import { PortableText } from '@portabletext/react';


export default function WhatIncluded({ data }: any) {

  if (!data) return null
  const { heading, results } = data


  return (
    <section className="lg:py-36 py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* {heading && <h2 className="text-[#171717] md:text-[60px] sm:text-4xl text-[30px] text-center mb-8 sm:leading-[100%] leading-[32px] tracking-[-2%] font-gilroy-semibold pt-2">{heading}</h2>}
     */}
        {heading && (
          <div className="mb-8 text-center">
            <PortableText
              value={heading}
              components={{
                block: {
                  normal: ({ children }) => (
                    <h2 className="xl:text-[56px] text-[40px] font-bold leading-tight font2 text-[#171717]">
                      {children}
                    </h2>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <span className="italic font1 pr-3 font-medium bg-gradient-to-r from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent false">{children}</span>
                  ),
                },
              }}
            />
          </div>
        )}
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 md:gap-28 gap-8">
          {results?.map((result: any, idx: number) => {
            const imageUrl = result.image &&
              urlForImage(result.image)
                ?.width(400)
                .auto("format")
                .fit("max")
                .url();
            return (
              <div key={idx} className="md:p-6 p-4 text-left rounded-2xl bg-[#F7F7F7] flex flex-col md:gap-0 gap-3 w-full">
                {imageUrl && (
                  <div
                    className={`relative !bg-[#F7F7F7]"
                            }`}
                  >
                    <Image
                      src={imageUrl}
                      alt={result.title || "Feature Image"}
                      width={300}
                      height={225}
                      className="object-contain rounded-[24px] w-full h-auto !bg-[#F7F7F7]"
                      sizes="
                        (min-width: 1536px) 20vw,
                        (min-width: 1280px) 25vw,
                        (min-width: 1024px) 33vw,
                        (min-width: 640px) 50vw,
                        100vw
                        "
                    />
                  </div>
                )}
                <div className="">
                  <h3 className="sm:text-2xl text-xl text-[#0A0D14] text-left font-gilroy-medium my-3">{result.title}</h3>
                  <div className="flex sm:!flex-col flex-row sm:!flex-start sm:justify-start items-center gap-2">
                    <h4 className="!text-left sm:tracking-tight tracking-[-2.5px] leading-[55px] sm:text-[48px] text-[42px] font-gilroy-medium text-[#171717]">{result.highlight}{result.suffix}</h4>
                    <p className="text-[#5C5C5C] text-base text-left font3">{result.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}