import React from 'react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from '@portabletext/react';
import { getGradientTextColor } from '@/lib/index';

const FounderMessage = ({ data }: any) => {
  const imageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(868) // Reduced from 700
      ?.width(1056)  // Reduced from 1200
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
    <section className="w-full bg-white  py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2160FD00] to-[#2160FD2E] rounded-2xl">
        <div className="  sm:px-8 lg:px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-40 justify-between">

            {/* Left Content */}
            <div className=" flex flex-col justify-between items-start gap-5">
              <div >
                <PortableText value={data?.quote}
                  components={{
                    block: {
                      normal: ({ children }) => <p className="text-2xl   sm:text-[36px] font-light text-[#181D27] font-gilroy-semibold leading-[120%] xl:pl-4">{children}</p>,
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
              

              <div className="xl:pl-4 ">
                <p className="text-sm sm:text-xl leading-[140%] text-[#767676] font3 mb-1">
                  {data?.role}
                </p>
                <p className="text-lg sm:text-xl text-gray-900 font-semibold leading-[140%]">
                  {data?.company}
                </p>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="order-first lg:order-last">
              {imageUrl && blurImageUrl && (
                <div className="relative aspect-[4/3] w-full max-w-md mx-auto lg:max-w-none">
                  <Image
                    src={imageUrl}
                    alt={"Steer Health "}
                    width={528}
                    height={434}
                    className="w-full h-auto object-cover rounded-xl lg:rounded-2xl shadow-lg"
                    sizes="(max-width: 640px) 100vw,
                                                                             (max-width: 1024px) 80vw,
                                                                             528px"
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