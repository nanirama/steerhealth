'use client'
import Image from "next/image";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react"
import type { Swiper as SwiperType } from "swiper"
import { Navigation, Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { PortableText } from '@portabletext/react'
import { urlForImage } from "@/sanity/lib/utils"

interface TestimonialItem {
  testimonials: any
  clientname: string
  jobTitle: string
  image?: any
}

interface SteerNotesTestimonialsProps {
  data: {
    heading?: string
    testimonials?: TestimonialItem[]
  }
}

const SteerNotesTestimonials = ({ data }: SteerNotesTestimonialsProps) => {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const testimonials = data?.testimonials || []

  useEffect(() => {
    if (!mainSwiper) return

    const updateNavigationState = () => {
      setIsBeginning(mainSwiper.isBeginning)
      setIsEnd(mainSwiper.isEnd)
    }

    const handleSlideChange = () => {
      const newIndex = mainSwiper.realIndex
      setActiveIndex(newIndex)
      updateNavigationState()
    }

    updateNavigationState()

    mainSwiper.on("slideChange", handleSlideChange)
    mainSwiper.on("reachBeginning", updateNavigationState)
    mainSwiper.on("reachEnd", updateNavigationState)

    return () => {
      mainSwiper.off("slideChange", handleSlideChange)
      mainSwiper.off("reachBeginning", updateNavigationState)
      mainSwiper.off("reachEnd", updateNavigationState)
    }
  }, [mainSwiper])

  const handlePrevClick = () => {
    if (mainSwiper && !isBeginning) {
      mainSwiper.slidePrev()
    }
  }

  const handleNextClick = () => {
    if (mainSwiper && !isEnd) {
      mainSwiper.slideNext()
    }
  }

  if (!testimonials || testimonials.length === 0) {
    return <div className="w-full max-w-7xl mx-auto px-4 py-12 text-center">No testimonials available</div>
  }



  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex mx-auto ">
          <div className="inline-flex flex-row gap-2 justify-center items-center text-center mx-auto px-4 py-2 border border-[#ECEFF1] rounded-full text-[13px] font-medium font3 leading-[20px] mb-3 text-[#252525]">TESTIMONIALS</div>
        </div>
        {data?.heading && (
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-2%] text-[#171717] text-center font-gilroy-semibold leading-tight">
            {data?.heading}
          </h2>
        )}
      </div>

      <div className="steernotes_testimonial mt-10">

        <Swiper
          modules={[Navigation, Autoplay]}  
          loop={testimonials.length > 1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          onSwiper={setMainSwiper}
          spaceBetween={30}
          slidesPerView={3}
          className="elevate-testimonials-swiper !items-stretch"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={`testimonial-${index}`} className="!h-auto flex">
              <div className="relative p-6 bg-[#F7F7F7] rounded-[16px] flex flex-col items-center justify-between text-center gap-4 w-full h-full">
                {/* Testimonial Text - Centered */}
                <div className="text-center mb-6 md:mb-8 flex items-center justify-center">
                  <PortableText
                    value={item.testimonials}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="text-[24px] text-[#191919] text-center font2">
                            {children}
                          </p>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                      },
                    }}
                  />
                </div>
                <div>
                  {/* Client Info with Image - Centered */}
                  <h3 className="uppercase text-[#767676] !font3 tracking-[0.16em]">
                    {item.clientname}
                  </h3>
                  <p className="text-[#767676] font-space-grotesk-regular mt-1">
                    {item.jobTitle}
                  </p>
                  {item.image && (
                    <div className="mb-4">
                      <Image
                        src={urlForImage(item.image)?.width(80)?.height(80)?.format('webp')?.fit('crop')?.quality(80)?.auto('format')?.url() || ''}
                        alt={item.clientname || 'Client'}
                        width={80}
                        height={80}
                        className="rounded-full mx-auto mt-4"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
                {/* Pagination Dots - Bottom Center */}
                {/* {testimonials.length > 1 && (
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
                    {testimonials.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => mainSwiper?.slideTo(dotIndex)}
                        className={`rounded-full transition-all duration-300 ${activeIndex === dotIndex
                          ? 'bg-[#00FAF7] w-[13px] h-[13px]'
                          : 'bg-[#D9D9D9] w-[13px] h-[13px]'
                          }`}
                        aria-label={`Go to testimonial ${dotIndex + 1}`}
                      />
                    ))}
                  </div>
                )} */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows - Bottom Middle */}
        {/* {testimonials.length > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevClick}
              disabled={isBeginning}
              className={`w-13.5 h-13.5 rounded-full flex items-center justify-center transition-all duration-200 ${isBeginning
                ? 'bg-[#F3F3F5] cursor-not-allowed opacity-50'
                : 'bg-[#F3F3F5] hover:bg-[#E1E1E4] cursor-pointer'
                }`}
              aria-label="Previous testimonial"
            >
              <svg width="14" height="23" viewBox="0 0 14 23" fill="none" className="rotate-180" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2122 9.73324L4.18361 0.717154C3.22397 -0.242485 1.67173 -0.237732 0.71537 0.723547C-0.241155 1.68564 -0.237877 3.24248 0.721762 4.20064L8.00643 11.475L0.721762 18.7493C-0.237877 19.7075 -0.241155 21.2643 0.71537 22.2264C1.19437 22.709 1.82353 22.95 2.45269 22.95C3.07857 22.95 3.70461 22.7115 4.18361 22.2328L13.2122 13.2167C13.6736 12.7558 13.9339 12.1289 13.9339 11.475C13.9339 10.8211 13.6736 10.1944 13.2122 9.73324Z" fill="#626263" />
              </svg>
            </button>
            <button
              onClick={handleNextClick}
              disabled={isEnd}
              className={`w-13.5 h-13.5 rounded-full flex items-center justify-center transition-all duration-200 ${isEnd
                ? 'bg-[#F3F3F5] cursor-not-allowed opacity-50'
                : 'bg-[#F3F3F5] hover:bg-[#E1E1E4] cursor-pointer'
                }`}
              aria-label="Next testimonial"
            >
              <svg width="14" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2122 9.73324L4.18361 0.717154C3.22397 -0.242485 1.67173 -0.237732 0.71537 0.723547C-0.241155 1.68564 -0.237877 3.24248 0.721762 4.20064L8.00643 11.475L0.721762 18.7493C-0.237877 19.7075 -0.241155 21.2643 0.71537 22.2264C1.19437 22.709 1.82353 22.95 2.45269 22.95C3.07857 22.95 3.70461 22.7115 4.18361 22.2328L13.2122 13.2167C13.6736 12.7558 13.9339 12.1289 13.9339 11.475C13.9339 10.8211 13.6736 10.1944 13.2122 9.73324Z" fill="#626263" />
              </svg>
            </button>
          </div>
        )} */}

        {/* <Slider {...settings}>
          <div className="p-6 bg-[#F7F7F7] rounded-[16px] flex flex-col items-center justify-center text-center gap-4">
            <p className="text-[24px] text-[#191919] text-center font2">After evaluating numerous <span className="italic text-[#3591FA] !font4 !font-normal">platforms,</span> we found that Steer Health offered not only the most complete AI suite but also the <span className="italic text-[#3591FA] !font4 !font-normal">flexibility</span> to integrate deeply into the <span className="italic text-[#3591FA] !font4 !font-normal">workflows</span> that matter to our patients and <span className="italic text-[#3591FA] !font4 !font-normal">practitioners</span></p>
            <Image src={`/images/hangemen-ceo.webp`} alt="Hangemen CEO" width={80} height={80} className="rounded-full mx-auto mt-4" />
            <h4 className="uppercase text-[#767676] !font3 tracking-[0.16em]">CEO, FORUM HEALTH </h4>
            <h5 className="text-[#767676] font-space-grotesk-regular mt-1">Phil Hagerman</h5>
          </div>
          <div className="p-6 bg-[#F7F7F7] rounded-[16px] flex flex-col items-center justify-center text-center gap-4">
            <p className="text-[24px] text-[#191919] text-center font2">After evaluating numerous <span className="italic text-[#3591FA] !font4 !font-normal">platforms,</span> we found that Steer Health offered not only the most complete AI suite but also the <span className="italic text-[#3591FA] !font4 !font-normal">flexibility</span> to integrate deeply into the <span className="italic text-[#3591FA] !font4 !font-normal">workflows</span> that matter to our patients and <span className="italic text-[#3591FA] !font4 !font-normal">practitioners</span></p>
            <Image src={`/images/hangemen-ceo.webp`} alt="Hangemen CEO" width={80} height={80} className="rounded-full mx-auto mt-4" />
            <h4 className="uppercase text-[#767676] !font3 tracking-[0.16em]">CEO, FORUM HEALTH </h4>
            <h5 className="text-[#767676] font-space-grotesk-regular mt-1">Phil Hagerman</h5>
          </div>
          <div className="p-6 bg-[#F7F7F7] rounded-[16px] flex flex-col items-center justify-center text-center gap-4">
            <p className="text-[24px] text-[#191919] text-center font2">After evaluating numerous <span className="italic text-[#3591FA] !font4 !font-normal">platforms,</span> we found that Steer Health offered not only the most complete AI suite but also the <span className="italic text-[#3591FA] !font4 !font-normal">flexibility</span> to integrate deeply into the <span className="italic text-[#3591FA] !font4 !font-normal">workflows</span> that matter to our patients and <span className="italic text-[#3591FA] !font4 !font-normal">practitioners</span></p>
            <Image src={`/images/hangemen-ceo.webp`} alt="Hangemen CEO" width={80} height={80} className="rounded-full mx-auto mt-4" />
            <h4 className="uppercase text-[#767676] !font3 tracking-[0.16em]">CEO, FORUM HEALTH </h4>
            <h5 className="text-[#767676] font-space-grotesk-regular mt-1">Phil Hagerman</h5>
          </div>
          <div className="p-6 bg-[#F7F7F7] rounded-[16px] flex flex-col items-center justify-center text-center gap-4">
            <p className="text-[24px] text-[#191919] text-center font2">After evaluating numerous <span className="italic text-[#3591FA] !font4 !font-normal">platforms,</span> we found that Steer Health offered not only the most complete AI suite but also the <span className="italic text-[#3591FA] !font4 !font-normal">flexibility</span> to integrate deeply into the <span className="italic text-[#3591FA] !font4 !font-normal">workflows</span> that matter to our patients and <span className="italic text-[#3591FA] !font4 !font-normal">practitioners</span></p>
            <Image src={`/images/hangemen-ceo.webp`} alt="Hangemen CEO" width={80} height={80} className="rounded-full mx-auto mt-4" />
            <h4 className="uppercase text-[#767676] !font3 tracking-[0.16em]">CEO, FORUM HEALTH </h4>
            <h5 className="text-[#767676] font-space-grotesk-regular mt-1">Phil Hagerman</h5>
          </div>
        </Slider> */}
      </div>
    </section>
  );
};

export default SteerNotesTestimonials;
