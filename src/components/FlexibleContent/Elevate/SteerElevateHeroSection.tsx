// components/EventsHeroSection.tsx
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react';
import { getGradientTextColor } from '@/lib/index';
import ButtonComponent from '@/components/Elements/ButtonComponent';
import { urlForImage } from "@/sanity/lib/utils";
import EventPDFButton from '@/components/Elements/EventPDFButton';
export default function steerElevateHeroSection({ data }: any) {
  const imageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(500)
      .width(600)
      .format("webp")
      .auto("format")
      .fit("max")
      .url();
  return (
    <section className="py-12 md:pb-16 bg-white">


      {/* Hero Content */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-6 lg:gap-16 ">
          {/* Text Content */}
          <div>
            {/* <div className='text-sm text-[#252525] font-inter border border-[#ECEFF1] rounded-[64px] py-2 px-4 inline'>STEER HEALTH FOR FM</div> */}
            {data?.heading && <h2 className="xl:text-[60px] sm:text-[30px] text-[30px] mt-3 mx-auto text-left text-[#171717] mb-2 font-semibold font2 md:leading-[100%] leading-[130%]">{data?.heading}</h2>}

            {data?.subHeading && <h2 className="bg-gradient-to-r from-[#3794FF] to-[#00B9B7] bg-clip-text text-transparent false sm:text-[30px] font2 font-semibold xl:text-[60px] text-[30px] md:leading-[100%] leading-[130%]">{data?.subHeading}</h2>}

            <PortableText value={data?.description}
              components={{
                block: {
                  normal: ({ children }) => <p className="xl:text-2xl text-base text-[#5C5C5C] !font3 text-left sm:py-4 ">{children}</p>,
                },
                marks: {
                  textColor: ({ children, value }) => {
                    return <span className="sm:text-2xl text-base text-[#5C5C5C] !font3 text-left sm:py-3  md:max-w-full max-w-[300px] mx-auto">{getGradientTextColor(children, value)}</span>
                  },
                  strong: ({ children }) => <strong className="sm:text-2xl text-base text-[#2B333B] !font-medium pb-4 !font3 text-left md:max-w-full max-w-[300px] mx-auto">{children}</strong>,
                },

              }} />

            <div className="flex flex-row flex-wrap lg:gap-4 gap-2 items-center sm:mt-0 mt-3">
              {data?.ctaButtonPrimary && (
                <div className="inline-flex">
                  <ButtonComponent button={data?.ctaButtonPrimary} />
                </div>
              )}
              {data?.ctaButtonSecondary && data?.ctaButtonSecondary?.buttontext && (
                <ButtonComponent button={data?.ctaButtonSecondary} />
              )}
            </div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden rounded-[24px]">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Event Hero Image"
                width={600}
                height={500}
                priority
                fetchPriority="high"
                loading="eager"
                quality={75}
                sizes="(max-width: 768px) 100vw, 100vw"
                className="w-full h-auto object-cover"
              />
            )}
          </div>
        </div>
      </div >
    </section >
  )
}