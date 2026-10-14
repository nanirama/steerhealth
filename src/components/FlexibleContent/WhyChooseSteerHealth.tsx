import React from "react";
import { PortableText } from '@portabletext/react'

const WhyChooseSteerHealth = ({ data, page }: any) => {
  return (
    <>
    {page === 'p2p-landingpage' ? (
      <div className="bg-white sm:py-16 py-8">
        <section className="max-w-7xl mx-auto px-4 sm:py-12 py-6">
          {/* Heading */}
          {data?.heading && (
            <PortableText
              value={data?.heading}
              components={{
                block: {
                  normal: ({ children }) => (
                    <h2 className="text-[30px] sm:text-3xl  md:text-[60px] font2 font-semibold text-center mb-10 sm:leading-[100%] leading-[32px] tracking-[-2%] text-[#171717]  max-w-6xl mx-auto">
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-[30px] sm:text-3xl  md:text-[60px] font2 font-semibold text-center mb-10 sm:leading-[100%] leading-[32px] tracking-[-2%] text-[#171717]  max-w-6xl mx-auto">
                      {children}
                    </h2>
                  ),
                },
              }}
            />
          )}


          {/* Grid */}
          <div className=" flex md:flex-row flex-col gap-4 bg-[#EEEEEE] rounded-2xl">
            {/* Challenges */}
            <div className=" rounded-2xl  lg:p-4 p-4 md:w-[35%] w-full why_choose">
              <h3 className="lg:text-2xl text-lg leading-[110%]  font-medium text-[#5C5C5C] uppercase text-center tracking-wide md:pt-3 md:pb-6  py-3 font3   border-b !border-[#f8f2f2]  ">
                Your Challenge
              </h3>
              <ul className="md:space-y-4 mt-6 sm:px-2">
                {data?.items && data.items.map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-6 mt-8 lg:pl-20 lg:pr-10">
                    {/* <div className=" flex-shrink-0 mt-1 ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#adadad' viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.5 16.084l-1.403 1.416-4.09-4.096-4.102 4.096-1.405-1.405 4.093-4.092-4.093-4.098 1.405-1.405 4.088 4.089 4.091-4.089 1.416 1.403-4.092 4.087 4.092 4.094z" /></svg>
                    </div> */}
                    {item?.challengeText && (
                      <PortableText
                        value={item?.challengeText}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="text-black sm:text-lg text-base !font-medium leading-[120%] text-wrap font2">
                                {children}
                              </p>
                            )
                          },
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {/* Advantages */}
            <div className="bg-white rounded-2xl pt-4 lg:px-12 px-6 pb-10 shadow-sm border border-gray-100 md:w-[65%] w-full why_choose">
              <h3 className="lg:text-2xl text-lg leading-[110%] font-medium text-[#5C5C5C] uppercase text-center tracking-wide md:pt-3 md:pb-6 py-3 font3   border-b !border-[#f8f2f2] ">
                SteerHealth Advantage
              </h3>
              <ul className="md:space-y-4   mt-6 sm:px-4 ">
                {data?.items && data.items.map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-6  mt-8">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#3ee089' viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" /></svg>
                    </div>
                    {item?.advantageText && (
                      <PortableText
                        value={item?.advantageText}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="text-black sm:text-lg text-base !font-medium leading-[120%] text-wrap font2 ">
                                {children}
                              </p>
                            )
                          },
                          marks: {
                            strong: ({ children }) => <strong className="text-[#F5B94A] font-semibold">{children}</strong>,
                          },
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

        ) : (
        
         <div className="bg-white sm:py-16 py-8">
        <section className="max-w-7xl mx-auto px-4  py-12 ">
          {/* Heading */}
          {data?.heading && (
            <PortableText
              value={data?.heading}
              components={{
                block: {
                  normal: ({ children }) => (
                    <h2 className="text-2xl sm:text-3xl md:text-[60px] font2 font-semibold text-center mb-10 sm:leading-[100%] leading-[140%] text-[#171717]  max-w-6xl mx-auto">
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl sm:text-3xl md:text-[60px] font2 font-semibold text-center mb-10 sm:leading-[100%] leading-[140%] text-[#171717]  max-w-6xl mx-auto">
                      {children}
                    </h2>
                  ),
                },
              }}
            />
          )}


          {/* Grid */}
          <div className=" flex md:flex-row flex-col gap-4 bg-[#f7f7f7] rounded-2xl">
            {/* Challenges */}
            <div className=" rounded-2xl  lg:p-4 p-4 md:w-[35%] w-full why_choose">
              <h3 className="lg:text-2xl text-lg leading-[110%] font-medium text-[#5C5C5C] uppercase text-center tracking-wide md:pt-3 md:pb-6  py-3 font3   border-b !border-[#f8f2f2]  ">
                Your Challenge
              </h3>
              <ul className="md:space-y-4 mt-6 sm:px-2">
                {data?.items && data.items.map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-6 mt-8">
                    <div className=" flex-shrink-0 mt-1 ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#adadad' viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.5 16.084l-1.403 1.416-4.09-4.096-4.102 4.096-1.405-1.405 4.093-4.092-4.093-4.098 1.405-1.405 4.088 4.089 4.091-4.089 1.416 1.403-4.092 4.087 4.092 4.094z" /></svg>
                    </div>
                    {item?.challengeText && (
                      <PortableText
                        value={item?.challengeText}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="text-black sm:text-lg text-base !font-medium leading-[120%] text-wrap font2">
                                {children}
                              </p>
                            )
                          },
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {/* Advantages */}
            <div className="bg-white rounded-2xl lg:p-4 p-4 shadow-sm border border-gray-100 md:w-[65%] w-full why_choose">
              <h3 className="lg:text-2xl text-lg leading-[110%] font-medium text-[#5C5C5C] uppercase text-center tracking-wide md:pt-3 md:pb-6 py-3 font3   border-b !border-[#f8f2f2] ">
                SteerHealth Advantage
              </h3>
              <ul className="md:space-y-4   mt-6 sm:px-4 ">
                {data?.items && data.items.map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-6  mt-8">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#3ee089' viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" /></svg>
                    </div>
                    {item?.advantageText && (
                      <PortableText
                        value={item?.advantageText}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="text-black sm:text-lg text-base !font-medium leading-[120%] text-wrap font2 ">
                                {children}
                              </p>
                            )
                          },
                          marks: {
                            strong: ({ children }) => <strong className="text-blue-600 font-semibold">{children}</strong>,
                          },
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
        )}
    </>
  );
};
export default WhyChooseSteerHealth;
