"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { PortableText } from "@portabletext/react";

export default function SurgeryTimeline({ data }: any) {
  const { heading, subheading, items } = data;
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-gray-50 py-16 px-4 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-3 md:text-[60px] text-[40px] font-bold text-[#171717]">
            {heading}
          </h2>
          {subheading && (
            <p className="sm:text-2xl text-base text-[#2B333B] !font-semibold pb-4 !font3 text-center md:max-w-full mx-auto">{subheading}</p>
          )}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute md:left-1/2 left-8 top-0 h-full w-[4px] md:w-[6px] bg-gray-200">
            <motion.div
              className="w-full bg-[linear-gradient(180deg,#2160FD_-52.55%,#C0D5FF_77.61%)]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16 md:pl-0 pl-10">
            {items.map((item: any, index: number) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item._key}
                  className={`relative flex flex-col md:flex-row ${isLeft ? "md:justify-start justify-end" : "md:justify-end justify-end"
                    }`}
                >
                  {/* Timeline Content */}
                  <motion.article
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`md:w-[46%] w-[88%] md:ml-0 ml-[12%] rounded-lg  bg-white p-6 shadow-sm ${isLeft ? "md:pr-8 md:text-left" : "md:pl-8 md:text-left"
                      }`}
                  >
                    <PortableText
                      value={item.content}
                      components={{
                        block: {
                          h3: ({ children }) => (
                            <h3 className="mb-2 text-2xl font-bold text-[#171717]">
                              {children}
                            </h3>
                          ),
                          normal: ({ children }) => (
                            <p className="mb-3 text-xs text-[#5c5c5c]">
                              {children}
                            </p>
                          ),
                        },
                        list: {
                          bullet: ({ children }) => (
                            <ul className="space-y-2 text-base text-[#5c5c5c]">
                              {children}
                            </ul>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => (
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                              <span>{children}</span>
                            </li>
                          ),
                        },
                      }}
                    />
                  </motion.article>

                  <div
                    className={`absolute top-0 ${
                      "md:left-1/2 -left-8 sm:top-0 top-4"
                      } z-10 -translate-y-1/2 md:-translate-x-1/2`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(180deg,#2160FD_-52.55%,#C0D5FF_77.61%)]"
                    >
                      <svg
                        className="h-7 w-7 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {index % 3 === 0 && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        )}
                        {index % 3 === 1 && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        )}
                        {index % 3 === 2 && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        )}
                      </svg>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
