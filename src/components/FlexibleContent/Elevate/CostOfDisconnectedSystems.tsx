"use client"
import React from "react"
import { PortableText } from '@portabletext/react'

interface CostOfDisconnectedSystemsProps {
  data: {
    heading?: any
    items?: Array<{
      heading: string
      description: any
    }>
  }
}
export default function CostOfDisconnectedSystems({ data }: CostOfDisconnectedSystemsProps) {
  const { heading, items } = data || {}

  if (!items || items.length === 0) {
    return null
  }

  return (
    <section 
      className="w-full bg-white py-8 md:py-12 lg:py-12"
      aria-labelledby="cost-of-disconnected-systems-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        {heading && (
          <div className="mb-8 md:mb-12 lg:mb-16 text-center">
            <h2 
              id="cost-of-disconnected-systems-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[54px] font-light font-interdisplay-light text-[#171717] leading-tight tracking-tight"
            >
              <PortableText
                value={heading}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <span className="block">{children}</span>
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
            </h2>
          </div>
        )}

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {items.map((item, index) => (
            <article
              key={index}
              className="flex flex-col border border-gray-200 shadow-[0_0_30px_0_rgba(0,0,0,0.15)] rounded-xl p-6"
              aria-labelledby={`problem-heading-${index}`}
            >
              {/* Item Heading */}
              {item.heading && (
                <h3
                  id={`problem-heading-${index}`}
                  className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-[55px] text-[#171717] font-gilroy-semibold leading-[100%] mb-4 md:mb-6"
                >
                  {item.heading}
                </h3>
              )}

              {/* Item Description */}
              {item.description && (
                <div className="flex-1">
                  <PortableText
                    value={item.description}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="text-base sm:text-lg md:text-lg lg:text-xl text-[#171717] leading-[140%] font3 font-normal">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
