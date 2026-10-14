import React from 'react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from '@portabletext/react';
import { getGradientTextColor } from '@/lib/index';

const FounderMessage = ({ data }: any) => {
  const imageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(470) // Reduced from 700
      ?.width(380)  // Reduced from 1200
      .format('webp')
      ?.fit('crop')
      ?.quality(85) // Add quality optimization
      ?.url();

  const blurImageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(44)
      ?.width(52)
      ?.blur(40)
      ?.quality(40)
      .format('webp')
      ?.fit('crop')?.url();
  return (
    <section className="w-full bg-white py-0 md:py-12  lg:py-20 md:px-0 px-4">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-[#f7f7f7] via-[#F6F7F8] to-[#EEF1F4] rounded-2xl">
        <div className="md:py-8 py-4 ">
          <div className="flex md:flex-row flex-col gap-8 xl:gap-20 justify-between items-center">

            {/* Left Content */}
            <div className=" flex flex-col justify-between md:items-start items-center lg:gap-4 gap-1 lg:pl-8 md:max-w-[60%] max-w-full">
              <div >
                <h3 className='font-interdisplay-light md:text-left text-center text-[36px] text-[#171717] border-b border-[#DDDDDD] pb-2 mb-4'>A note from the CEO</h3>
                <PortableText value={data?.quote}
                  components={{
                    block: {
                      normal: ({ children }) => <p className="lg:text-2xl md:text-sm text-lg  md:text-left text-center font-light font-interdisplay-light text-[#5c5c5c] leading-[120%] lg:mb-4 md:mb-2 mb-4">{children}</p>,
                    },
                    marks: {
                      textColor: ({ children, value }) => {
                        return getGradientTextColor(children, value)
                      },
                      em: ({ children }) => <i className="text-blue-600 italic font4 leading-[120%]">{children}</i>,
                    },
                  }} />
                {/* <h2 className="text-2xl   sm:text-[36px] font-light text-[#181D27] font-gilroy-semibold  leading-[120%]    xl:pl-4  ">

                AI is not here to replace care, but to make it{' '}
                <span className="text-blue-600 italic font4 leading-[120%]">more human</span>
                . At SteerHealth, we{' '}
                <span className="text-blue-600 italic font4 leading-[120%]">harness intelligence</span>
                {' '}to give clinicians more time for what truly{' '}
                <span className="text-blue-600 italic font4 leading-[120%]">matters patients</span>.
              </h2> */}
              </div>
              

              <div className="">
                <div className=''>
                  <Image src={`/images/elevate/founder-signature.png`} alt="Founder" width={260} height={40} />
                </div>
                <p className="text-sm lg:text-xl md:text-left text-center  leading-[140%] text-[#767676] font3 mb-1">
                  {data?.role}
                </p>
                <p className="text-lg lg:text-xl md:text-left text-center text-gray-900 font-semibold leading-[140%]">
                  {data?.company}
                </p>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="order-last md:max-w-[50%] max-w-full">
              {imageUrl && blurImageUrl && (
                <div className="relative w-full mx-auto">
                  <Image
                    src={imageUrl}
                    alt={"Steer Health "}
                    width={379}
                    height={470}
                    className="w-full h-auto object-cover rounded-xl lg:rounded-2xl shadow-lg"
                    sizes="(max-width: 640px) 100vw,
                                                                             (max-width: 1024px) 100vw,
                                                                             380px"
                    placeholder="blur"
                    blurDataURL={blurImageUrl}
                    loading="lazy"
                    priority={false}
                    quality={75}
                  />
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;