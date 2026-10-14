"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/utils"
import ButtonComponent from "../Elements/ButtonComponent"

// Image transition variants
const imageVariants = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
}

// Container variants for staggered animations
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeDownVariants = {
  initial: { opacity: 0, y: -20, height: 0 },
  animate: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -20,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
}

export default function HowWeCreateValue({ data }: any) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imagePosition, setImagePosition] = useState({ top: 0, height: 0 })
  const featureRefs = useRef([])
  const containerRef = useRef(null)

  // Update image position when active index changes
  useEffect(() => {
    if (featureRefs.current[activeIndex] && containerRef.current) {
      const activeElement = featureRefs.current[activeIndex]
      const container = containerRef.current

      const containerRect = container.getBoundingClientRect()
      const activeRect = activeElement.getBoundingClientRect()

      const relativeTop = activeRect.top - containerRect.top

      setImagePosition({
        top: relativeTop,
        height: activeRect.height,
      })
    }
  }, [activeIndex])

  // Auto-rotate every 4 seconds (increased for better UX)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIsTransitioning(true)
  //     setActiveIndex((prev) => (prev + 1) % data?.features.length)

  //     // Reset transition state after animation completes
  //     setTimeout(() => setIsTransitioning(false), 600)
  //   }, 15000)

  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data?.features.length)
    }, 15000)

    return () => clearInterval(interval)
  }, [data?.features.length])

  // Manual navigation handler
  // const handleFeatureHover = (index) => {
  //   if (index !== activeIndex && !isTransitioning) {
  //     setIsTransitioning(true)
  //     setActiveIndex(index)
  //     setTimeout(() => setIsTransitioning(false), 600)
  //   }
  // }

  const handleFeatureHover = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  const imageUrlWidth = data?.features[activeIndex]?.imageWidth || 591
  const imageUrlHeight = data?.features[activeIndex]?.imageHeight || 424

  const [featureHeight, setFeatureHeight] = useState({ active: 190, inactive: 120 });

  const calculateHeights = () => {
    const width = window.innerWidth;

    if (width >= 1025) {
      return { active: 190, inactive: 120 };
    } else if (width >= 1024) {
      return { active: 230, inactive: 150 };
    } else if (width >= 768) {
      return { active: 220, inactive: 150 };
    } else if (width >= 640) {
      return { active: 190, inactive: 120 };
    } else if (width >= 550) {
      return { active: 200, inactive: 115 };
    } else {
      return { active: 230, inactive: 130 };
    }
  };

  useEffect(() => {
    const updateHeights = () => {
      setFeatureHeight(calculateHeights());
    };

    updateHeights();
    window.addEventListener('resize', updateHeights);

    return () => {
      window.removeEventListener('resize', updateHeights);
    };
  }, []);

  const imageUrl =
    data?.features[activeIndex]?.image &&
    urlForImage(data?.features[activeIndex]?.image)
      ?.height(imageUrlHeight)
      ?.width(imageUrlWidth)
      .format("webp")
      ?.fit("fill")
      ?.url()

  const blurImageUrl =
    data?.features[activeIndex]?.image &&
    urlForImage(data?.features[activeIndex]?.image)?.height(24)?.width(14)?.blur(20).format("webp")?.fit("fill")?.url()

  return (
    <div className="w-full bg-white md:pt-16 pb-36 py-8">
      {data?.heading && (
        <h2 className="text-[#171717] md:text-[60px] text-4xl leading-[110%] font-semibold text-center font2 mb-5">
          {data?.heading}
        </h2>
      )}
      {data?.subHeading && (
        <h3 className="text-2xl text-[#5C5C5C] font3 leading-[110%] text-center mb-16">{data?.subHeading}</h3>
      )}

      <div className="flex md:flex-row flex-col gap-6 items-start max-w-7xl mx-auto py-4 px-4" ref={containerRef}>
        {/* LEFT: Features List with click handlers */}
        <motion.div variants={containerVariants} animate="animate" className="space-y-6 md:w-[50%] w-full md:hidden block">
          {data?.features &&
            data?.features.map((feature: any, index: number) => {
              const isActive = index === activeIndex
              return (
                <div key={index}
                  className={`relative sm:px-8 px-4 py-4 rounded-[10px] flex flex-col justify-start items-start cursor-pointer
  transition-all duration-500 ease-in-out group overflow-hidden
  ${isActive
                      ? "border border-transparent bg-[#f7f7f7] shadow-md"
                      : "border-2 border-dashed border-[#e1e1e1] hover:border-gray-300"
                    }
`}


                  ref={(el) => (featureRefs.current[index] = el)}
                  onMouseEnter={() => handleFeatureHover(index)}
                  
                >
                  <div className="w-full my-2">
                    <div className="w-full ">
                      <h3
                        className="sm:text-2xl text-xl text-[#171717] leading-[120%] font-gilroy-medium mb-4 w-full"

                      >
                        {feature.title}
                      </h3>

                      <p
                        className="text-[#5C5C5C] leading-[140%] sm:text-xl text-lg font2"
                      >
                        {feature.description}
                      </p>
                    </div>
                    

                    {isActive && feature?.ctaButtonPrimary && (
                      <div className="mt-6 mb-3">
                        <ButtonComponent button={feature.ctaButtonPrimary} />
                      </div>
                    )}
                  </div>

                  

                  {isActive && (
                    <div className="w-full mt-4 md:hidden">
                      {imageUrl && blurImageUrl && (
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={feature?.title}
                          width={imageUrlWidth}
                          height={imageUrlHeight}
                          className="object-cover rounded-2xl"
                          placeholder="blur"
                          blurDataURL={blurImageUrl}
                          loading="lazy"
                        />
                      )}
                    </div>
                  )}
                </div>
              )
            })}
        </motion.div>
        <motion.div variants={containerVariants} animate="animate" className="space-y-6 md:w-[50%] w-full hidden md:block hidden">
          {data?.features &&
            data?.features.map((feature: any, index: number) => {
              const isActive = index === activeIndex
              return (
                <div key={index}
                  className={`relative sm:px-8 px-4 py-4 rounded-[10px] flex flex-col justify-start items-start cursor-pointer
  transition-all duration-500 ease-in-out group overflow-hidden
  ${isActive
                      ? "border border-transparent bg-[#f7f7f7] shadow-md"
                      : "border-2 border-dashed border-[#e1e1e1] hover:border-gray-300"
                    }
`}


                  ref={(el) => (featureRefs.current[index] = el)}
                  style={{
                    height: isActive ? `${featureHeight.active}px` : `${featureHeight.inactive}px`,
                    transition: 'height 0.5s ease-in-out'
                  }}
                  onMouseEnter={() => handleFeatureHover(index)}
                  onMouseLeave={(e) => {
                    if (index !== activeIndex) {
                      e.currentTarget.style.height = '120px'
                    }
                  }
                  }
                >
                  <div className="w-full my-2">
                    <div className="w-full ">
                      <h3
                        className="sm:text-2xl text-xl text-[#171717] leading-[120%] font-gilroy-medium mb-4 w-full"

                      >
                        {feature.title}
                      </h3>

                      <p
                        className="text-[#5C5C5C] leading-[140%] sm:text-xl text-lg font2"
                      >
                        {feature.description}
                      </p>
                    </div>
                    

                    {feature?.ctaButtonPrimary && (
                      <div className="mt-6 mb-3">
                        <ButtonComponent button={feature.ctaButtonPrimary} />
                      </div>
                    )}
                  </div>

                  

                  {isActive && (
                    <div className="w-full mt-4 md:hidden">
                      {imageUrl && blurImageUrl && (
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={feature?.title}
                          width={imageUrlWidth}
                          height={imageUrlHeight}
                          className="object-cover rounded-2xl"
                          placeholder="blur"
                          blurDataURL={blurImageUrl}
                          loading="lazy"
                        />
                      )}
                    </div>
                  )}
                </div>
              )
            })}
        </motion.div>
        {/* <motion.div variants={containerVariants} animate="animate" className="space-y-6 md:w-[50%] w-full">
          {data?.features &&
            data?.features.map((feature: any, index: number) => {
              const isActive = index === activeIndex
              return (
                <motion.div
  key={index}
  onMouseEnter={() => handleFeatureHover(index)}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: isActive ? 1 : 1, y: isActive ? 0 : 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  className={`relative px-8 py-4 rounded-[10px] flex flex-col justify-center items-start cursor-pointer
    transition-all duration-200
    ${isActive
      ? "border border-transparent bg-[#f7f7f7] shadow-md"
      : "border-2 border-dashed border-[#e1e1e1] hover:border-gray-300"
    }`}
  ref={(el) => (featureRefs.current[index] = el)}
>
                  
                  <div className="w-full">
                    <div className="w-full my-3">
                      <h3
                        className="sm:text-2xl text-xl text-[#171717] leading-[120%] font-gilroy-medium mb-4 w-full"

                      >
                        {feature.title}
                      </h3>

                      <p
                        className="mt-2 text-[#5C5C5C] leading-[140%] sm:text-xl text-lg font2"
                      >
                        {feature.description}
                      </p>
                    </div>

                    {isActive && feature?.ctaButtonPrimary && (
                      <div className="my-2">
                        <ButtonComponent button={feature.ctaButtonPrimary} />
                      </div>
                    )}
                  </div>

                  {isActive && (
                    <div className="w-full mt-4 md:hidden">
                      {imageUrl && blurImageUrl && (
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={feature?.title}
                          width={imageUrlWidth}
                          height={imageUrlHeight}
                          className="object-cover rounded-2xl"
                          placeholder="blur"
                          blurDataURL={blurImageUrl}
                          loading="lazy"
                        />
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}
        </motion.div> */}

        {/* RIGHT: Image with enhanced transitions - positioned relative to active item */}
        <div className="relative md:w-[50%] w-full md:block hidden">
          <motion.div
            className="absolute w-full rounded-2xl overflow-hidden -mt-4"
            animate={{
              top: imagePosition.top,
              height: Math.max(imagePosition.height, 600), // Minimum height for mobile
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {imageUrl && blurImageUrl && (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`image-${activeIndex}`}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={data?.features[activeIndex]?.title}
                    width={imageUrlWidth}
                    height={imageUrlHeight}
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={blurImageUrl}
                    loading="lazy"
                    sizes="(max-width: 640px) 600px, (max-width: 768px) 700px, (max-width: 1024px) 800px, 800px"
                  />
                </motion.div>
              </AnimatePresence>
            )}

            {/* Optional loading indicator */}
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
