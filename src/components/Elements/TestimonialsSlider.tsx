"use client"
import { useEffect, useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import type { Swiper as SwiperType } from "swiper"
import { Navigation, Thumbs } from "swiper/modules"
import { motion } from "framer-motion"
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { urlForImage } from '@/sanity/lib/utils'

const MotionImage = motion(Image)

// Navigation Button Props
interface NavigationButtonProps {
  direction: 'prev' | 'next'
  onClick: () => void
  disabled: boolean
  'aria-label': string
}

// SVG Icon paths for different states using Next.js Image component
const getIconPath = (direction: 'prev' | 'next', state: 'rest' | 'hover' | 'pressed' | 'disabled') => {
  return `/images/${direction}-${state}-state.svg`
}

// Custom Navigation Button Component
const NavigationButton: React.FC<NavigationButtonProps> = ({ 
  direction, 
  onClick, 
  disabled, 
  'aria-label': ariaLabel 
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = () => {
    let state: 'rest' | 'hover' | 'pressed' | 'disabled' = 'rest'
    
    if (disabled) state = 'disabled'
    else if (isPressed) state = 'pressed'
    else if (isHovered) state = 'hover'

    const iconPath = getIconPath(direction, state)

    return (
      <Image
        src={iconPath}
        alt=""
        width={54}
        height={54}
        className="w-[54px] h-[54px] object-contain"
        priority
      />
    )
  }

  const getButtonClasses = () => {
    const baseClasses = "w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none"
    
    if (disabled) {
      return `${baseClasses} cursor-not-allowed`
    }
    
    if (isPressed) {
      return `${baseClasses}`
    }
    
    if (isHovered) {
      return `${baseClasses}`
    }
    
    return `${baseClasses}`
  }

  const handleClick = () => {
    if (!disabled) {
      onClick()
    }
  }

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true)
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleMouseLeave = () => {
    setIsPressed(false)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true)
    }
  }

  // Handle touch events for mobile
  const handleTouchStart = () => {
    if (!disabled) {
      setIsPressed(true)
    }
  }

  const handleTouchEnd = () => {
    setIsPressed(false)
  }

  return (
    <button
      className={getButtonClasses()}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      disabled={disabled}
      aria-label={ariaLabel}
      type="button"
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation' 
      }}
    >
      {getIcon()}
    </button>
  )
}

// Video Player Component (similar to LazyVideo structure)
const VideoPlayer = ({
  src,
  poster,
  className = '',
  width,
  height,
  isActive = true,
  ...props
}: {
  src: string
  poster?: string
  className?: string
  width: number
  height: number
  isActive?: boolean
  [key: string]: any
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay when slide becomes active, pause when slide becomes inactive
  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      // Reset video to beginning and autoplay when slide becomes active
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Autoplay failed:', err);
        setIsPlaying(false);
      });
    } else {
      // Pause when slide becomes inactive
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      className="relative w-full"
      style={{ aspectRatio: `${width}/${height}` }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`relative w-full ${className}`}>
      {/* Aspect ratio container - 540:420 (9:7) */}
      <div className="relative w-full aspect-[540/420] bg-black rounded-lg overflow-hidden shadow-lg group">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-contain cursor-pointer"
          src={src}
          width={540}
          height={420}
          poster={poster}
          playsInline
          preload="metadata"
          aria-label="Video player"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
        >
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
        
        {/* Custom Play Button Overlay */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 hover:bg-black/30 transition-all duration-300 cursor-pointer focus:outline-none"
            aria-label="Play video"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-black ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
        
        {/* Pause Button Overlay - appears when playing */}
        {isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center z-10 bg-transparent hover:bg-black/10 transition-all duration-300 cursor-pointer focus:outline-none"
            aria-label="Pause video"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 opacity-0 hover:opacity-100">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            </div>
          </button>
        )}
      </div>
      
      {/* Optional: Video metadata for screen readers */}
      <div className="sr-only">
        Video player with standard browser controls
      </div>
    </div>
    </motion.div>
  )
}

interface TestimonialItem {
  imageUrl?: any
  videoTestimonialsUrl?: string
  parnetLogoUrl?: any
  testimonial: any // Can be string (old) or PortableText array (new)
  clientname: string
  jobtitle: string
}

interface TestimonialsSliderProps {
  data: TestimonialItem[]
}

export default function TestimonialsSlider({ data }: TestimonialsSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

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

      // Sync thumbnail swiper with main swiper
      if (thumbsSwiper && !thumbsSwiper.destroyed) {
        thumbsSwiper.slideTo(newIndex)
      }
    }

    // Initial state
    updateNavigationState()

    mainSwiper.on("slideChange", handleSlideChange)
    mainSwiper.on("reachBeginning", updateNavigationState)
    mainSwiper.on("reachEnd", updateNavigationState)

    return () => {
      mainSwiper.off("slideChange", handleSlideChange)
      mainSwiper.off("reachBeginning", updateNavigationState)
      mainSwiper.off("reachEnd", updateNavigationState)
    }
  }, [mainSwiper, thumbsSwiper])

  // Custom navigation handlers
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

  // Handle thumbnail click
  const handleThumbClick = (index: number) => {
    if (mainSwiper) {
      mainSwiper.slideTo(index)
    }
  }

  if (!data || data.length === 0) {
    return <div className="w-full max-w-7xl mx-auto md:px-4 pb-6 text-center">No testimonials available</div>
  }

  // Helper function to truncate PortableText array to word limit while preserving structure
  const truncatePortableText = (content: any[], wordLimit: number) => {
    if (!Array.isArray(content)) {
      return { content: [], isTruncated: false }
    }

    let wordCount = 0
    const truncatedBlocks: any[] = []
    let isTruncated = false

    for (const block of content) {
      if (block._type === 'block' && block.children) {
        const truncatedChildren: any[] = []
        
        for (const child of block.children) {
          if (child.text) {
            const words = child.text.split(' ').filter((w: string) => w.length > 0)
            const remainingWords = wordLimit - wordCount
            
            if (words.length <= remainingWords) {
              truncatedChildren.push(child)
              wordCount += words.length
            } else {
              // Truncate this child
              const truncatedText = words.slice(0, remainingWords).join(' ')
              truncatedChildren.push({
                ...child,
                text: truncatedText
              })
              wordCount += remainingWords
              isTruncated = true
              break
            }
          } else {
            truncatedChildren.push(child)
          }
        }

        if (truncatedChildren.length > 0) {
          truncatedBlocks.push({
            ...block,
            children: truncatedChildren
          })
        }

        if (isTruncated) break
      } else {
        truncatedBlocks.push(block)
      }
    }

    return {
      content: truncatedBlocks,
      isTruncated
    }
  }

  const TruncatedText = ({ content, wordLimit, className }:any) => {
    const [isExpanded, setIsExpanded] = useState(false)
    
    // Handle plain text strings
    if (typeof content === 'string') {
      const words = content.split(' ').filter((w: string) => w.length > 0)
      const isTruncated = words.length > wordLimit
      const truncatedText = isTruncated ? words.slice(0, wordLimit).join(' ') : content
      
      return (
        <div>
          <p className={className}>
            {isExpanded ? content : truncatedText}
            {isTruncated && !isExpanded && '...'}
          </p>
          {isTruncated && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#5C5C5C] hover:text-[#313131] underline mt-0 mb-2 text-[20px] cursor-pointer leading-[140%] w-full display-block text-left font3"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      )
    }
    
    // Handle PortableText arrays
    if (!Array.isArray(content)) {
      return null
    }
    
    const { content: truncatedContent, isTruncated } = truncatePortableText(content, wordLimit)
    
    return (
      <div>
        {isExpanded ? (
          <div>
            <PortableText 
              value={content} 
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className={className}>
                      {children}
                    </p>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold font5">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic font5">
                      {children}
                    </em>
                  ),
                },
              }} 
            />
            {isTruncated && (
              <button
                onClick={() => setIsExpanded(false)}
                className="text-[#5C5C5C] hover:text-[#313131] underline mt-0 mb-2 text-[20px] cursor-pointer leading-[140%] w-full display-block text-left font3"
              >
                Show less
              </button>
            )}
          </div>
        ) : (
          <div>
            <PortableText 
              value={truncatedContent} 
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className={className}>
                      {children}
                    </p>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold font5">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic font5">
                      {children}
                    </em>
                  ),
                },
              }} 
            />
            {isTruncated && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-[#5C5C5C] hover:text-[#313131] underline mt-0 mb-2 text-[20px] cursor-pointer leading-[140%] w-full display-block text-left font3"
              >
                Show more
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
   
    <div className="w-full max-w-7xl mx-auto md:px-4 pb-6 relative">
     
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          slideThumbActiveClass: "swiper-slide-thumb-active",
        }}
        loop={data.length > 1}
        onSwiper={setMainSwiper}
        spaceBetween={50}
        slidesPerView={1}
        className="group md:!pb-6 !pb-[90px] md:!pt-0 !pt-[120px]"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
      >
        {data.map((item, index) => {
          const imageUrl = item?.imageUrl &&
            urlForImage(item?.imageUrl)
              ?.height(850)
              ?.width(1084)
              .format('webp')
              ?.fit('crop')
              ?.quality(90)
              ?.url()

          const blurImageUrl = item?.imageUrl &&
            urlForImage(item?.imageUrl)
              ?.height(13)
              ?.width(16)
              ?.blur(20)
              .format('webp')
              ?.fit('crop')?.url()

          ///console.log('item?.videoTestimonialsUrl', item?.videoTestimonialsUrl)

          //const videoUrl = item?.videoTestimonials?.asset?.url

          return (
            <SwiperSlide key={`testimonial-${index}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-20 gap-5 items-center">
                {item?.videoTestimonialsUrl ? (
                  // Render video if videoTestimonials exists
                  <VideoPlayer
                    src={item?.videoTestimonialsUrl}
                    poster={imageUrl}
                    className="w-full h-full object-cover rounded-lg"
                    width={540}
                    height={420}
                    isActive={index === activeIndex}
                  />
                ) : imageUrl && blurImageUrl ? (
                  // Render image if videoTestimonials doesn't exist
                  <MotionImage
                    src={imageUrl}
                    alt={`Testimonial from ${item.clientname}`}
                    width={542}
                    height={425}
                    placeholder="blur"
                    blurDataURL={blurImageUrl}
                    className="w-full h-auto object-cover rounded-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    sizes="(min-width: 1280px) 542px, (min-width: 768px) 50vw, 100vw"
                  />
                ) : null}
                {imageUrl && blurImageUrl && (
                  <>
                    <motion.div
                      className="md:text-left xl:mt-0 md:mt-16 mt-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {/* Desktop: Full PortableText */}
                      <div className="md:text-2xl text-[20px] text-[#5C5C5C] font5 leading-[120%] md:mb-4 mb-4 max-w-[26rem] md:block hidden">
                        {Array.isArray(item.testimonial) ? (
                          <PortableText 
                            value={item.testimonial} 
                            components={{
                              block: {
                                normal: ({ children }) => (
                                  <p className="md:text-2xl text-[20px] text-[#5C5C5C] font5 leading-[120%] md:mb-12 mb-4">
                                    {children}
                                  </p>
                                ),
                              },
                              marks: {
                                strong: ({ children }) => (
                                  <strong className="font-semibold font5">
                                    {children}
                                  </strong>
                                ),
                                em: ({ children }) => (
                                  <em className="italic font5">
                                    {children}
                                  </em>
                                ),
                              },
                            }}
                          />
                        ) : (
                          <p className="md:text-2xl text-[20px] text-[#5C5C5C] font5 leading-[120%] md:mb-12 mb-4">
                          {item.testimonial}
                        </p>
                        )}
                      </div>

                      {/* Mobile: TruncatedText with 40 words */}
                      <div className="block md:hidden">
                      <TruncatedText
                        content={item.testimonial}
                        wordLimit={40}
                        className="md:text-2xl text-[20px] text-[#5C5C5C] font5 leading-[120%] md:mb-12 mb-4 max-w-[26rem] block md:hidden"
                      />
                      </div>

                      <h3 className="md:text-2xl text-[22px] text-black font3 leading-[120%]">{item.clientname}</h3>
                      <h4 className="md:text-base text-[14px] font-light leading-[140%] text-black">{item.jobtitle}</h4>
                    </motion.div>
                  </>
                )}
              </div>
            </SwiperSlide>
          )
        })}

        {/* Custom Navigation Buttons */}
        {data.length > 1 && (
          <div className="absolute md:top-0 bottom-0 md:left-[inherit] left-0 right-0 flex !justify-center z-10 gap-2">
            <NavigationButton
              direction="prev"
              onClick={handlePrevClick}
              disabled={isBeginning}
              aria-label="Previous testimonial"
            />
            <NavigationButton
              direction="next"
              onClick={handleNextClick}
              disabled={isEnd}
              aria-label="Next testimonial"
            />
          </div>
        )}
      </Swiper>

      {/* Desktop Thumbnail Logos */}
      {data.length > 1 && (
        <div className="md:mt-0 mt-4 md:border-t border-[#DDDDDD] md:relative absolute top-0 left-0 right-0">
          <Swiper
            onSwiper={setThumbsSwiper}
            watchSlidesProgress
            loop={data.length > 1}
            modules={[Thumbs]}
            className="cursor-pointer"
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: Math.min(4, data.length),
              },
            }}
          >
            {data.map((item, index) => {
              const imageUrl = item?.parnetLogoUrl &&
                urlForImage(item?.parnetLogoUrl)
                  ?.width(300)
                  .format('webp')
                  ?.fit('crop')
                  ?.quality(85)
                  ?.url()

              const blurImageUrl = item?.parnetLogoUrl &&
                urlForImage(item?.parnetLogoUrl)
                  ?.width(15)
                  ?.blur(20)
                  .format('webp')
                  ?.fit('crop')?.url()

              return (
                <SwiperSlide key={`thumb-desktop-${index}`}>
                  <div
                    className="relative flex items-center justify-center md:px-10 md:py-4 p-3 cursor-pointer transition-all duration-300 hover:bg-gray-50"
                    onClick={() => handleThumbClick(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleThumbClick(index)
                      }
                    }}
                    aria-label={`Go to testimonial from ${item.clientname}`}
                  >
                    <div
                      className={`absolute top-0 left-0 w-full h-[2px] md:block hidden transition-all duration-300 ${
                        activeIndex === index ? "bg-[#020084]" : "bg-transparent"
                      }`}
                    />
                    <div className="relative max-w-[200px] max-h-[55px] w-full h-[55px] px-5 z-20">
                      {imageUrl && blurImageUrl && (
                        <Image
                          src={imageUrl}
                          alt={`${item.clientname} logo`}
                          placeholder="blur"
                          blurDataURL={blurImageUrl}
                          fill
                          loading="lazy"
                          className={`object-contain w-full h-full transition-all duration-300 ${
                            activeIndex === index ? "grayscale-0 opacity-100" : "grayscale opacity-50"
                          }`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 25vw, 200px"
                        />
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      )}
    </div>
  )
}