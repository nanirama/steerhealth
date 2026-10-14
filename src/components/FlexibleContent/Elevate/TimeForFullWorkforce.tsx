"use client"
import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { PortableText } from '@portabletext/react'
import { urlForImage } from "@/sanity/lib/utils"

interface TimeForFullWorkforceProps {
  data: {
    heading?: string
    subHeading?: string
    description?: any
    videoUrl?: string
    videoPoster?: any
  }
}

export default function TimeForFullWorkforce({ data }: TimeForFullWorkforceProps) {
  const { heading, subHeading, description, videoUrl, videoPoster } = data || {}
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Generate poster image URL
  const posterImageUrl = videoPoster &&
    urlForImage(videoPoster)
      ?.width(1200)
      ?.height(675)
      ?.format('webp')
      ?.fit('crop')
      ?.quality(85)
      ?.auto('format')
      ?.url()

  const blurPosterUrl = videoPoster &&
    urlForImage(videoPoster)
      ?.width(20)
      ?.height(11)
      ?.blur(50)
      .format('webp')
      ?.fit('crop')
      ?.quality(20)
      ?.url()

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  if (!heading && !subHeading && !description && !videoUrl) {
    return null
  }

  return (
    <section className="w-full bg-white py-8 md:py-12 lg:py-16" aria-labelledby="time-for-full-workforce-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12 lg:mb-16 text-center">
          {heading && (
            <h2 id="time-for-full-workforce-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-[54px] font-light font-interdisplay-light text-[#171717] leading-tight tracking-tight border-b border-[#DDDDDD] py-5 md:py-10 md:max-w-[640px] w-full mx-auto">{heading}</h2>
          )}
          {/* Sub Heading */}
          {subHeading && (
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-[#171717] leading-[140%] py-3 md:py-6 font3">
              {subHeading}
            </h3>
          )}

          {/* Description */}
          {description && (
            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-[#5C5C5C] font3 font-regular leading-[140%]">
              <PortableText
                value={description}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-4 last:mb-0">
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
          )}
        </div>

        {/* Video Section */}
        {videoUrl && (
          <div className="relative w-full max-w-[1200px] mx-auto">
            <div className="relative w-full aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                src={videoUrl}
                poster={posterImageUrl}
                playsInline
                preload="metadata"
                aria-label="Video: Time for Full Workforce"
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
                  className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 hover:bg-black/30 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-lg md:rounded-xl"
                  aria-label="Play video"
                  type="button"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
                    <svg
                      className="w-10 h-10 md:w-12 md:h-12 text-black ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}

              {/* Pause Button Overlay - appears on hover when playing */}
              {isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center z-10 bg-transparent hover:bg-black/20 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-lg md:rounded-xl opacity-0 group-hover:opacity-100"
                  aria-label="Pause video"
                  type="button"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300">
                    <svg
                      className="w-10 h-10 md:w-12 md:h-12 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
