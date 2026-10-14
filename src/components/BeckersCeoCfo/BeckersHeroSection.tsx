// components/EventsHeroSection.tsx
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react';
import { getGradientTextColor } from '@/lib/index';
import ButtonComponent from '../Elements/ButtonComponent';
import { urlForImage } from "@/sanity/lib/utils";
import EventPDFButton from '../Elements/EventPDFButton';
export default function EventHeroSection() {

  return (
    <section className="bg-gray-50 pt-6 pb-0">

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
            <h2 className="xl:text-[60px] sm:text-[40px] text-[30px] mx-auto text-left text-[#171717] font-gilroy-semibold md:leading-[100%] tracking-[-0.02em] leading-[130%] mb-1">Smart Capacity.</h2>

            <h2 className="italic text-[#2160FD] sm:text-[40px] font4 font-normal xl:text-[68px] leading-[110%] tracking-[-0.01em] text-[40px]">Stronger Margins.</h2>

            <p className="sm:text-2xl text-base text-[#5C5C5C] !font3 text-left sm:py-3 leading-[140%]">Turn your EHR into an AI Growth OS — driving patient acquisition, smart routing, and automated revenue capture</p>

            <div className="flex flex-row flex-wrap gap-4 items-center my-3">
              <Link
                href="https://steerhealth.io/contact-us"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Book a demo
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden">
            <div className="flex flex-col justify-center items-center w-full mx-auto max-w-[495px] relative">
              <div className="w-full pb-24">
                <Image src={"/images/events/heroimg.webp"} alt="HeroImage" height={510} width={510}
                  className="object-cover mx-auto" />
              </div>
              <div className="w-full absolute bottom-0">
                <p className="font-bold uppercase font-space-grotesk-regular w-full text-center md:text-[21.93px] text-[17px] leading-[125%] md:tracking-[0.4em] tracking-[0.1em] bg-gradient-to-r from-[#2160FD] to-[#0DA7FF] rounded-t-[21.93px] px-8.5 py-1.5 text-white ">CEO + CFO Roundtable</p>
                <div className="relative">
                  <Image src={"/images/events/layer.webp"} alt="HeroImage" height={495} width={90}
                    className="w-[495px] md:h-[90px] h-[80px] relative"
                  />
                  <p className="font-medium text-center font-space-grotesk-regular md:leading-[130%] leading-[140%] md:text-[61.34px] text-[48px] absolute top-1 left-0 right-0 text-white">Booth #808</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div >
    </section >
  )
}