import React from "react";
import { PortableText } from '@portabletext/react';
export default function HowSteerSolves({ data }: any) {

  return (
    <>
      <div className="w-full md:py-12 py-6 bg-white ">
        <div className="max-w-7xl mx-auto md:px-8 px-4 ">

          <div className="text-center mb-3 ">
            <div className="sm:px-8 px-2 py-8 inline-block">
              <h2 className="text-[36px] md:text-[60px] font-semibold text-[#171717] leading-[100%] mb-6 text-center">{data?.heading}</h2>
              <p className="text-[#5C5C5C] sm:text-2xl text-xl max-w-4xl text-center leading-[140%] font3">
                {data?.subheading}
              </p>
            </div>
          </div>


          <div className=" sm:p-8 px-2 py-6 border border-[#D1D1D1] rounded-xl my-4 mx-1">
            <div className="space-y-18 md:px-14 px-2  ">
              <PortableText value={data?.content}
                components={{
                  list: {
                    bullet: ({ children }) => <ul className="m-0 p-0">{children}</ul>,
                  },
                  listItem: {
                    bullet: ({ children }) => {
                      return (
                        <li className="mb-5">
                          <div className="flex items-start space-x-2">
                            <div className="bg-[#31DD63] flex items-center justify-center w-[24px] h-[24px] rounded-full flex-shrink-0 mt-1">
                              <svg
                                width="13.6"
                                height="13.6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white"
                              >
                                <polyline points="20,6 9,17 4,12" />
                              </svg>
                            </div>
                            <div className="flex-1 howitworks-section">
                              {children}
                              {/* <h3 className="text-2xl leading-[32px] font-bold text-[#1D1718] font3 ">step.title</h3>
                              <p className="text-[#1D1718] text-xl  leading-[32px] font3 mb-4">step.description</p> */}
                            </div>
                          </div>
                        </li>
                      )
                    },
                  },
                }} />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
