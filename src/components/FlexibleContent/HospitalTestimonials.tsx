import React from "react";
import Image from "next/image";
import TestimonialImg1 from "../../../public/images/testimonials-img1.webp";
import { urlForImage } from "@/sanity/lib/utils";

const TestimonialsSection = ({ data }: any) => {
  
  return (
    <>
      <div className="w-full py-16  bg-white">
        <div className="max-w-7xl mx-auto px-4 ">
          <h2 className="text-[#171717] md:text-[60px] text-4xl text-center leading-[100%] font-gilroy-semibold pt-2 mb-10">Testimonials</h2>

          <div className="flex md:flex-row flex-col items-center flex-wrap gap-8 my-8">

            <div className="flex flex-col gap-1 bg-[#F7F7F7] rounded-xl xl:w-[58%] lg:w-[55%] w-full lg:!min-h-[315px] h-full xl:p-6 p-5">
              <p className="lg:text-[32px] sm:text-[28px] text-xl leading-[120%] font3 font-light text-[#171717] md:max-w-2x mx-auto w-full text-center xl:mb-6 ">“Steer let us answer insurance questions and<span className="text-[#2160FD] lg:text-[36px] text-[28px] italic font4"> book</span> in one thread. <span className="text-[#2160FD] lg:text-[36px] text-[28px] italic font4"> Agents</span> now handle fewer, higher-value calls.”</p>
              <span className="text-sm !text-[#767676] text-center leading-[140%] !tracking-[2px] w-full font3 font-medium">DIRECTOR</span>
              <h6 className="lg:text-xl text-base !text-black text-center  tracking-[20%] font-space-grotesk-regular">Patient Access</h6>
            </div>

            <div className="flex flex-col gap-1 lg:!min-h-[315px] bg-[#F7F7F7] bg-[radial-gradient(circle_at_top_left,rgba(33,96,253,0)_0%,rgba(33,96,253,0.18)_100%)] w-full h-full rounded-xl !xl:w-[40%] lg:w-[39%] p-6">
              <h3 className="text-[#2160FD] italic !text-[78px] leading-[120%] text-center font1">25%</h3>
              <h4 className="sm:text-[32px] text-2xl leading-[120%] font3 font-light text-[#171717] text-center mb-6 ">Pre-visit eligibility </h4>
              <span className="text-sm !text-[#767676] text-center leading-[140%] !tracking-[2px] w-full font3 font-medium">LEADER</span>
              <h6 className="text-xl !text-black text-center  tracking-[20%] mb-4 font-space-grotesk-regular">Revenue Cycle</h6>
            </div>

            <div className="flex flex-col gap-1 lg:!min-h-[315px] bg-[#F7F7F7] bg-[radial-gradient(circle_at_top_left,rgba(33,96,253,0)_0%,rgba(33,96,253,0.18)_100%)] w-full h-full  rounded-xl !xl:w-[40%] lg:w-[39%] p-6">
              <h3 className="text-[#2160FD] italic !text-[78px] leading-[120%] text-center font1">1000&apos;s</h3>
              <h4 className="sm:text-[32px] text-2xl leading-[120%] font3 !font-light text-[#171717] text-center mb-6 ">of staff hours saved annually through eligibility automation </h4>
              <span className="text-sm !text-[#767676] text-center leading-[140%] !tracking-[2px] w-full font3 font-medium">LEADER</span>
              <h6 className="text-xl !text-black text-center  tracking-[20%] mb-4 font-space-grotesk-regular">Revenue Cycle</h6>
            </div>

            <div className="flex flex-col gap-1 lg:!min-h-[315px] bg-[#F7F7F7] rounded-xl xl:w-[58%] lg:w-[55%] w-full h-full p-6  md:py-10  py-6">
              <p className="lg:text-[32px] sm:text-[28px] text-xl  leading-[120%] font3 font-light text-[#171717] md:max-w-[570px] w-full mx-auto text-center xl:mb-6">“The waitlist backfills cancellations <span className="text-[#2160FD] lg:text-[36px] text-[28px] italic font4">automatically.</span> Our clinics  <span className="text-[#2160FD] lg:text-[36px] text-[28px] italic font4"> feel fuller</span>without adding staff.”</p>
              <span className="text-sm !text-[#767676] text-center leading-[140%] !tracking-[2px] w-full font3 font-medium">VP</span>
              <h6 className="text-xl !text-black text-center  tracking-[20%] mb-4 font-space-grotesk-regular">Ambulatory Ops</h6>
            </div>

          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 justify-between items-center">
            {data?.clients && data?.clients.map((client: any, index: number) => {
              const imageUrl = client?.image &&
                urlForImage(client?.image)
                  ?.height(600) // Reduced from 700
                  ?.width(450)  // Reduced from 1200
                  .format('webp')
                  ?.fit('crop')
                  ?.quality(85) // Add quality optimization
                  ?.url();

              const blurImageUrl = client?.image &&
                urlForImage(client?.image)
                  ?.height(45)
                  ?.width(60)
                  ?.blur(20)
                  .format('webp')
                  ?.fit('crop')?.url();
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl lg:rounded-3xl  bg-gray-100 aspect-[3/4] hover:scale-105 transition-transform duration-300 ease-out focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                  role="article"
                  tabIndex={0}
                // aria-label={`${client.name}, ${client.role}`}
                >
                  {/* Background Image */}
                  {imageUrl && blurImageUrl && (
                    <Image
                      src={imageUrl}
                      alt={client?.name}
                      width={225}
                      height={300}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 225px"
                      placeholder="blur"
                      blurDataURL={blurImageUrl}
                      loading="lazy"
                      priority={false}
                      quality={75}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent " />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-3 lg:px-3 py-6 text-white ">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1 leading-[120%] font-gilroy-semibold max-w-2xl ">
                      {client?.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-200 font-medium">
                      {client?.role}
                    </p>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </div >
    </>
  )
}

export default TestimonialsSection
