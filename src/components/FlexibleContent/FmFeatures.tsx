"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/utils"

// Image transition variants
const imageVariants = {
  initial: {
    opacity: 0,
    scale: 1,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoother transition
    },
  },
  exit: {
    opacity: 0,
    scale: 1,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
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

export default function FmFeatures({ data }: any) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-rotate every 4 seconds (increased for better UX)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setActiveIndex((prev) => (prev + 1) % data?.features.length)

      // Reset transition state after animation completes
      setTimeout(() => setIsTransitioning(false), 600)
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const handleFeatureHover = (index) => {
    if (index !== activeIndex && !isTransitioning) {
      setIsTransitioning(true)
      setActiveIndex(index)
      setTimeout(() => setIsTransitioning(false), 600)
    }
  }

  const imageUrl =
    data?.features[activeIndex]?.image &&
    urlForImage(data?.features[activeIndex]?.image)?.height(1196)?.width(664).format("webp")?.fit("crop")?.url()

  const blurImageUrl =
    data?.features[activeIndex]?.image &&
    urlForImage(data?.features[activeIndex]?.image)?.height(24)?.width(14)?.blur(20).format("webp")?.fit("crop")?.url()

  return (
    <div className="w-full bg-white py-10 sm:px-0 px-4">
      {data?.heading && (
        <h2 className="text-[#171717] md:text-[60px] text-4xl leading-[110%] font-semibold text-center font2 mb-5 tracking-[-0.02em]">
          {data?.heading}
        </h2>
      )}
      {data?.subHeading && (
        <h3 className="sm:text-2xl text-base text-[#5C5C5C] font3 leading-[110%] text-center mb-16">{data?.subHeading}</h3>
      )}
      <div className="flex md:flex-row flex-col gap-12 items-center max-w-7xl mx-auto py-4 px-4">
        {/* LEFT: Image with enhanced transitions */}
        <div className="relative md:w-[40%] w-full md:h-[800px] h-[300px] rounded-2xl overflow-hidden md:block hidden bg-gray-100 ">
          {imageUrl && blurImageUrl && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`image-${activeIndex}`} // More specific key
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={data?.features[activeIndex]?.title}
                  width={498}
                  height={897}
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={blurImageUrl}
                  sizes="(max-width: 768px) 100vw, 40vw"
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
        </div>

        {/* RIGHT: Features List with hover handlers */}
        <motion.div variants={containerVariants} animate="animate" className="space-y-6 md:w-[60%] w-full">
          {data?.features &&
            data?.features.map((feature: any, index: number) => {
              const isActive = index === activeIndex
              return (
                <motion.div
                  key={index}
                  layout
                  onMouseEnter={() => handleFeatureHover(index)} // Changed from onClick to onMouseEnter for hover functionality
                  className={`relative sm:px-8 px-4 py-6 rounded-[10px] transition-all duration-300 min-h-[250px] flex flex-col justify-center items-start cursor-pointer ${isActive
                    ? "border-2 border-transparent !bg-[#f7f7f7]"
                    : "border-2 border-dashed border-[#e1e1e1] hover:border-gray-300"
                    }`}
                  whileHover={{
                    scale: isActive ? 1 : 1,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 1 }}
                >
                  {isActive && (
                    <div className="w-full md:mt-4 md:hidden block rounded-2xl overflow-hidden">
                      {imageUrl && blurImageUrl && (
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={data?.features[activeIndex]?.title}
                          width={498}
                          height={897}
                          className="object-cover h-[300px] mb-4 w-full rounded-2xl"
                          placeholder="blur"
                          blurDataURL={blurImageUrl}
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      )}
                    </div>
                  )}
                  {/* Text Wrapper */}
                  <motion.div layout className="w-full">
                    <motion.h3
                      layout
                      className="sm:text-2xl text-xl text-[#171717] leading-[120%] font-gilroy-medium mb-4 w-full"
                      initial={{ opacity: 0.7 }}
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                        color: isActive ? "#171717" : "#5C5C5C",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.title}
                    </motion.h3>

                    <motion.p
                      layout
                      className="mt-2 text-[#5C5C5C] leading-[140%] sm:text-xl text-lg font2 overflow-hidden "
                      initial={{ opacity: 0.7 }}
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                        color: isActive ? "#171717" : "#5C5C5C",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.description}
                    </motion.p>

                    {/* Enhanced description animation */}
                    {/* <motion.p
                      layout
                      className="mt-2 text-[#5C5C5C] leading-[140%] sm:text-xl text-lg font2 overflow-hidden "
                      animate={{
                        opacity: isActive ? 1 : 0,
                        height: isActive ? "auto" : 0,
                        marginTop: isActive ? 8 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {feature.description}
                    </motion.p> */}
                  </motion.div>
                </motion.div>
              )
            })}
        </motion.div>
      </div>
    </div>
  )
}
