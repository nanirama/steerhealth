"use client"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import type { Swiper as SwiperType } from "swiper"
import { Navigation } from "swiper/modules"
import { PortableText } from '@portabletext/react'
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/utils"

interface TestimonialItem {
  testimonial: any
  clientname: string
  jobtitle: string
  image?: any
}

interface ElevateTestimonialsProps {
  data: {
    testimonials?: TestimonialItem[]
  }
}

export default function ElevateTestimonials({ data }: ElevateTestimonialsProps) {
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
    <div className="w-full bg-white pt-12 pb-20">
      <div className="max-w-[1136px] mx-auto px-4 sm:px-6 md:px-6">
        {/* Main Slider */}
        <Swiper
          modules={[Navigation]}
          loop={testimonials.length > 1}
          onSwiper={setMainSwiper}
          spaceBetween={30}
          slidesPerView={1}
          className="elevate-testimonials-swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={`testimonial-${index}`}>
              <div className="relative rounded-[20px] overflow-hidden bg-gradient-to-r from-[#25AB7C] to-[#2889A8] p-8 md:p-12 min-h-[180px] md:min-h-[400px] flex flex-col justify-center">
                {/* Testimonial Text - Centered */}
                <div className="text-center mb-6 md:mb-8 flex items-center justify-center">
                  <PortableText
                    value={item.testimonial}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="text-white text-lg md:text-xl lg:text-2xl leading-[120%] font-interdisplay-light font-light font-sans max-w-[1003px] mx-auto">
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

                {/* Client Info with Image - Centered */}
                <div className="flex flex-col items-center justify-center mb-8 md:mb-10">
                  {item.image && (
                    <div className="mb-4">
                      <Image
                        src={urlForImage(item.image)?.width(80)?.height(80)?.format('webp')?.fit('crop')?.quality(80)?.auto('format')?.url() || ''}
                        alt={item.clientname || 'Client'}
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <h3 className="text-white text-lg md:text-xl lg:text-2xl text-center font-gilroy-medium leading-[120%]">
                    {item.clientname}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base text-center uppercase font-interdisplay-light">
                    {item.jobtitle}
                  </p>
                </div>

                {/* Pagination Dots - Bottom Center */}
                {testimonials.length > 1 && (
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
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows - Bottom Middle */}
        {testimonials.length > 1 && (
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
        )}
      </div>
    </div>
  )
}
