"use client"
import { useRef, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import dayjs from 'dayjs';
import { FreeMode, Mousewheel, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
//import "swiper/css/pagination"
import BlogVideoCard from "@/components/Elements/Blog/BlogVideoCard"



const InTheLoopSlider = ({ data, heading="In the Loop" }) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [swiperInstance, setSwiperInstance] = useState(null)

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current
      swiperInstance.params.navigation.nextEl = nextRef.current
      swiperInstance.navigation.init()
      swiperInstance.navigation.update()
    }
  }, [swiperInstance])

  return (
    <section className="section-spacing w-full py-16">
      <div className="container-newsroom max-w-7xl mx-auto">
        {/* Slider Container */}
        <h2 className='text-[36px] text-black font-semibold font2 leading-[120%] mb-16'>{heading}</h2>
        <div className="newsroom-slider -mr-6 animate-fade-in relative pb-20">
          <Swiper
            modules={[FreeMode, Mousewheel, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.2}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
              el: ".custom-pagination",
              bulletClass: "custom-pagination-bullet",
              bulletActiveClass: "custom-pagination-bullet-active",
            }}
            onSwiper={setSwiperInstance}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 0.25,
              momentumVelocityRatio: 0.5,
            }}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.1,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2.8,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
              1536: {
                slidesPerView: 3.5,
                spaceBetween: 24,
              },
            }}
            className="!overflow-visible"
          >
            {data.map((item, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div
                  className="h-full"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <BlogVideoCard
                    title={item?.title}
                    category={item?.categories && item?.categories[0] && item?.categories[0]?.title}
                    publishedAt={dayjs(item?.publishedAt).format('MMMM D, YYYY')}
                    image={item?.mainImage}
                    imageAlt={item?.title}
                    href={item?.slug}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation - bottom left */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
            <button
              ref={prevRef}
              className="w-10 h-10 cursor-pointer rounded-full bg-[#E8E8ED] flex items-center justify-center hover:bg-[#E8E8ED] transition
              [&.swiper-button-disabled]:opacity-50 [&.swiper-button-disabled]:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              ref={nextRef}
              className="w-10 h-10 cursor-pointer rounded-full bg-[#E8E8ED] flex items-center justify-center hover:bg-[#E8E8ED] transition
               [&.swiper-button-disabled]:opacity-50 [&.swiper-button-disabled]:cursor-not-allowed"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* <button
            ref={prevRef}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow hover:bg-gray-200 transition 
                         [&.swiper-button-disabled]:opacity-50 [&.swiper-button-disabled]:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            ref={nextRef}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow hover:bg-gray-200 transition 
                         [&.swiper-button-disabled]:opacity-50 [&.swiper-button-disabled]:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button> */}

          <div className="absolute top-[-35px] left-0 w-full z-10">
            <div className="custom-pagination flex items-center gap-3 !w-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InTheLoopSlider
