// components/EventsHeroSection.tsx
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react';
import { getGradientTextColor } from '@/lib/index';
import ButtonComponent from '../Elements/ButtonComponent';
import { urlForImage } from "@/sanity/lib/utils";
import EventPDFButton from '../Elements/EventPDFButton';
export default function EventHeroSection({ data }: any) {
  const imageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(500)
      .width(600)
      .format("webp")
      .auto("format")
      .fit("max")
      .url();

  return (
    <section className="bg-gray-50 py-6 md:pb-16">

      {/* Header with Logo and CTA */}
      <header className="border-b border-[#5c5c5c]/20 pb-4 mb-10">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
          <div className='flex flex-row gap-6 items-center'>
            <Link href="/"><Image
              src="/images/logo.webp"
              alt="Steer Health Logo"
              width={161}
              height={32}
              priority
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 768px) 161px, 100vw"
            /></Link>
            <Link href="/">
              <Image
                src="/images/beckers-logo.webp"
                alt="Beckers Health care Logo"
                width={150}
                height={32}
                priority
                fetchPriority="high"
                loading="eager"
                className='md:block hidden'
                sizes="(min-width: 768px) 161px, 100vw"
              /></Link>
          </div>
          <Link
            href="https://steerhealth.io/contact-us"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Get a 20-minute demo
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Hero Content */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
          {/* Text Content */}
          <div>

            <p className="inline-flex flex-row gap-2 justify-center items-center text-center mx-auto px-4 py-2 border border-[#ECEFF1] rounded-full text-[13px] font-medium font3 leading-[20px] mb-3 text-[#252525]">
              Steer Health for ASCS
            </p>
            {/* <h1 className="xl:text-[56px] sm:text-[40px] text-[30px] mx-auto text-left text-[#171717] font-bold font2 md:leading-[110%] leading-[130%]">
              Predictable Surgeries:{' '}
              <span className="italic bg-gradient-to-r from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent false">
                On time. All the Time
              </span>
            </h1> */}
            {data?.heading && <h1 className="xl:text-[56px] sm:text-[40px] text-[30px] mx-auto text-left text-[#171717] font-bold font2 md:leading-[110%] leading-[130%]">{data?.heading}</h1>}

            {data?.subHeading && <h2 className="italic bg-gradient-to-r from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent false sm:text-[40px] font4 font-normal xl:text-[56px] text-[40px]">{data?.subHeading}</h2>}

            <PortableText value={data?.description}
              components={{
                block: {
                  normal: ({ children }) => <p className="sm:text-2xl text-base text-[#5C5C5C] !font3 text-left sm:py-3">{children}</p>,
                },
                marks: {
                  textColor: ({ children, value }) => {
                    return <span className="sm:text-2xl text-base text-[#2B333B] !font3 text-left sm:py-3  md:max-w-full max-w-[300px] mx-auto">{getGradientTextColor(children, value)}</span>
                  },
                  strong: ({ children }) => <strong className="sm:text-2xl text-base text-[#2B333B] !font-medium pb-4 !font3 text-left md:max-w-full max-w-[300px] mx-auto">{children}</strong>,
                },

              }} />

            <div className="flex flex-row flex-wrap gap-4 items-center">
              {data?.ctaButtonPrimary && (
                <div className="inline-flex">
                  <ButtonComponent button={data?.ctaButtonPrimary} />
                </div>
              )}
              {data?.ctaButtonSecondary && data?.ctaButtonSecondary?.buttontext && (
                <EventPDFButton buttontext={data?.ctaButtonSecondary?.buttontext} />
              )}
            </div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl">
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
            {/* <Image
              src="/hero-surgery.jpg"
              alt="Medical professionals in surgical attire reviewing information on a tablet"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            /> */}
          </div>
        </div>
      </div >
    </section >
  )
}