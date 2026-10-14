import React from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/utils';
const CredibilityShowcase = ({ data }: any) => {

  // const { 
  //   headline = "Trusted by 54 hospitals and 336 care facilities", 
  //   subtext = "A proven partner in delivering care with reliability, safety, and compassion.", 
  //   badge = null 
  // } = data;
  const { headline, subtext, badge } = data

  const imageUrl = badge &&
    urlForImage(badge)
      ?.height(593) // Reduced from 700
      ?.width(552)  // Reduced from 1200
      .format('webp')
      ?.fit('crop')
      ?.quality(85) // Add quality optimization
      ?.url();

  const blurImageUrl = badge &&
    urlForImage(badge)
      ?.height(593)
      ?.width(552)
      ?.blur(40)
      ?.quality(40)
      .format('webp')
      ?.fit('crop')?.url();

  return (
    <div className='w-full pb-20 bg-white'>
      <div className="w-full bg-gradient-to-r from-[#b0cff0] via-[#eff2fe] to-purple-50">

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center items-center justify-between relative gap-6 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Trust Badge with Checkmark */}
              <div className="flex  items-center justify-center lg:justify-start mb-4">
                <div className="flex flex-row md:items-center items-start gap-2  text-white  py-1 text-sm font-medium ">
                  <svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.9987 10.0633C27.8968 10.0001 27.9373 9.83304 27.9361 9.73099C27.9165 8.1778 27.8827 6.54686 27.6851 5.00824C27.6022 4.36619 27.5494 3.64274 26.7743 3.48542L14.2199 0H13.7295L1.08185 3.51336C0.617233 3.64517 0.440472 3.98716 0.345953 4.42207C0.116409 5.47292 0.126843 6.88094 0.0728323 7.97127C-0.132162 12.1018 0.0169806 16.85 1.55751 20.7497C3.29996 25.1597 8.03876 29.0272 12.4731 30.6162C13.9014 31.1276 14.0474 31.1282 15.4762 30.6162C19.91 29.0272 24.6494 25.1597 26.3919 20.7497C27.6403 17.5899 27.9189 13.9605 27.9987 10.6087C28.003 10.4277 27.995 10.2443 27.9987 10.0633ZM22.2318 11.3565L13.2403 20.2182C12.8985 20.3695 12.4787 20.3488 12.1675 20.1277L6.74742 14.7629C6.4117 14.4179 6.354 14.0358 6.55409 13.5997C6.68359 13.3172 7.69567 12.3107 7.97739 12.1589C8.50583 11.8746 8.87592 11.9864 9.32151 12.3363L12.7806 15.7609L19.454 9.15272C19.6835 8.96746 19.899 8.77247 20.2083 8.74271C20.3826 8.7257 20.5502 8.75911 20.7104 8.82167C21.0209 8.94194 22.219 10.121 22.3337 10.4265C22.4485 10.7296 22.4019 11.0843 22.2318 11.3565Z" fill="#2160FD" />
                  </svg>

                  <span className='md:text-[36px] text-[28px] leading-[120%] text-[#181D27] font-gilroy-semibold'>{headline}</span>
                </div>
              </div>

              {/* Subtext */}
              {subtext && <p className="text-gray-600 text-base sm:text-lg mb-4 max-w-2xl mx-auto lg:mx-0">{subtext}</p>}

              {/* Rating Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-2">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#2160FD] text-[#2160FD]"
                      />
                    ))}
                  </div>
                  {/* <span className="text-[#080808] font-bold text-sm sm:text-base">
                  4.9 out of 5.0 stars
                </span> */}
                </div>

                {/* Divider - Hidden on mobile */}
                {/* <div className="hidden sm:block w-px h-6 bg-[#080808]"></div> */}

                {/* Reviews */}
                {/* <div className="flex items-center gap-2">
                <span className="text-[#080808] font-bold text-sm sm:text-base">
                  2000 + reviews on
                </span>
                <span className="font-bold text-blue-600 text-sm sm:text-base">
                  <Image src={`/images/google.webp`} width={65} height={22} alt='Google' className='w-[65px] h-[22px]' />
                </span>
              </div> */}
              </div>
            </div>

            {/* Right Content - Badge */}
            <div className="relative">
              {imageUrl && blurImageUrl && (
                <div className="relative">
                  <Image
                    src={imageUrl}
                    alt={"Steer Health "}
                    width={552}
                    height={593}
                    className="h-full w-full object-contain"
                    sizes="(min-width: 1440px) 220px, (min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw"
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
    </div>
  );
};

export default CredibilityShowcase;