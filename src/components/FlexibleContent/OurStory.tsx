"use client"

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { PortableText } from '@portabletext/react'
import ProgressBar from "@/components/Elements/ProgressBar";


export default function OurStory({ data }: any) {

  const targetref = useRef(null)
 

  const { title, items } = data

    const [barColor, setBarColor] = useState(0)

  
  const { scrollYProgress } = useScroll({ target: targetref })
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '100%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      setBarColor(10 - Math.floor(v * 10));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);
  
 if (!data) return null

  return (
    <motion.section ref={targetref} className="md:py-16 py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 ">
        {title && <h2 className="text-[#171717] md:text-[60px] text-4xl mb-8 leading-[100%] font-gilroy-semibold lg:py-5 pb-4 pt-2">{title}</h2>}

        <div className="relative container flex justify-start">
          {/* Vertical line */}
          {/* <div className="absolute left-0 top-0 bottom-8 w-8 md:!h-[92%] !h-full rounded-full bg-[linear-gradient(180deg,#2160FD_-52.55%,#E3EBFF_77.61%)]"></div> */}
          <ProgressBar progress={x} color={barColor} />
          <div className="space-y-12 -ml-8 z-25">
            {items.map((item:any, index:number) => (
              <div key={index} className="relative flex flex-col md:flex-row md:items-start">
                {/* Timeline dot */}
                <div className="absolute left-0 w-8 h-8 bg-blue-500 rounded-full shadow-md z-10 flex items-center justify-center">
                </div>

                {/* Content container */}
                <div className={`ml-12 md:ml-20 flex-1  pb-12 ${index === items.length - 1 ? 'border-0' : 'border-b !border-[#b8b8b8]'}`}>
                  <div className="md:grid md:grid-cols-2 md:gap-8">
                    {/* Left side - Year and Title */}
                    <div className="mb-0">
                      <div className="text-2xl font-gilroy-medium text-[#0A0D14] mb-1">{item.year}</div>
                      <h3 className="lg:text-[48px] md:text-[38px] text-[32px] font1 text-[#2160FD] italic md:leading-relaxed leading-[110%] md:mb-0 mb-2">{item.headline}</h3>
                    </div>
                    {item.description && 
                    <PortableText value={item.description}
                        components={{
                            block: {
                                normal: ({ children }) => <p className="text-[#5C5C5C] font3 leading-[140%] md:text-2xl text-xl max-w-sm">{children}</p>,
                            },
                        }} />
                      }

                    {/* Right side - Description */}
                    {/* <div className="text-[#5C5C5C] font3 leading-[140%] md:text-2xl text-xl max-w-sm">{item.description}</div> */}
                  </div>
                </div>
              </div>
            ))}            
          </div>
        </div>
      </div>
    </motion.section>

  )
}
