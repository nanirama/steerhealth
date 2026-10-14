import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from '@/sanity/lib/utils';
import Link from "next/link";
export default function VisionAndMission({ data }: any) {
  if (!data) return null

  const {
    visionTitle,
    visionDescription,
    missionTitle,
    missionDescription,
    buttonText,
    buttonLink
  } = data

  const imageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(388) // Reduced from 900 (33% smaller)
      ?.width(1432)  // Reduced from 1200 (33% smaller)
      .format('webp')
      ?.fit('crop')
      ?.quality(85) // Add quality optimization
      ?.url();

  const blurImageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(10)
      ?.width(15)
      ?.blur(20)
      .format('webp')
      ?.fit('crop')?.url();


  return (
    <section className="md:pt-40 pt-8 pb-16 bg-white">
      <div className="mx-auto px-4 max-w-7xl bg-[#F7F7F7] rounded-xl pt-0 lg:pb-12 pb-6">
        {imageUrl && blurImageUrl && (
          <div className="relative">
            <Image
              src={imageUrl}
              alt="ourmissionimg"
              width={716}
              height={194}
              className="mx-auto md:h-auto rounded-2xl object-cover relative md:-top-[70px] md:py-0 py-6"
              sizes="(max-width: 640px) 100vw,
                                               (max-width: 1024px) 80vw,
                                               716px"
              placeholder="blur"
              blurDataURL={blurImageUrl}
            />
          </div>
        )}

        {/* <div className="relative">
          <Image
            src={OurMissionImg}
            alt="ourmissionimg"
            width={716}
            height={492}
            className="mx-auto md:h-auto h-[250px] rounded-2xl object-cover relative -top-[70px]"
          />
        </div> */}
        <div>
          {/* Vision */}
          <div className="flex sm:flex-row flex-col  lg:gap-16 sm:gap-6 sm:py-4 ">
            <div className=" lg:px-20 px-4 sm:w-[50%] w-full flex flex-col gap-2 sm:border-r border-[#b8b8b8] ">
              {visionTitle && <h2 className="text-2xl font-gilroy-medium leading-[120%] text-[#171717] mb-3 flex flex-row gap-4 items-center">{visionTitle}
                <svg width="31" height="21" viewBox="0 0 31 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_14292_18516)">
                    <path d="M30.5259 9.33555C27.6608 4.34283 22.1008 0.27829 16.1388 0.0136918C9.3448 -0.287938 2.87355 4.43361 0 10.2697V10.7469C2.414 15.5957 7.01436 19.4572 12.4115 20.6726L14.6523 21H16.4082L18.5885 20.6726C23.8821 19.5754 28.6235 15.4362 31 10.7469V10.2697C30.8686 9.94717 30.6997 9.63777 30.5259 9.33555ZM12.6046 18.2769C8.33912 17.283 4.85162 14.1252 2.6132 10.5271C5.15496 6.30491 9.54703 2.73732 14.7002 2.41837C20.5387 2.05701 25.4933 5.802 28.3868 10.4895C25.1445 15.8764 19.1879 19.8108 12.6046 18.2769Z" fill="url(#paint0_linear_14292_18516)" />
                    <path d="M14.8197 4.68335C11.1845 5.02738 8.80502 8.68935 9.7768 12.1172C10.9133 16.1244 16.0119 17.7251 19.2808 15.0367C23.8122 11.3096 20.7449 4.12249 14.8197 4.68335ZM18.699 11.9595C17.5431 14.5111 13.8413 14.6658 12.4397 12.2372C11.2299 10.1408 12.5426 7.34426 15.0008 7.06652C17.7956 6.75056 19.8554 9.40609 18.699 11.9595Z" fill="url(#paint1_linear_14292_18516)" />
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_14292_18516" x1="15.5" y1="0" x2="15.5" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#C0D5FF" />
                      <stop offset="1" stopColor="#2D66EC" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_14292_18516" x1="15.5067" y1="4.65234" x2="15.5067" y2="16.3654" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#C0D5FF" />
                      <stop offset="1" stopColor="#2D66EC" />
                    </linearGradient>
                    <clipPath id="clip0_14292_18516">
                      <rect width="31" height="21" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </h2>}
              {visionDescription && (
                <div className="prose prose-gray md:max-w-md w-full text-[#5C5C5C] text-xl font3 leading-[140%]">
                  <PortableText value={visionDescription} />
                </div>
              )}
            </div>

            {/* Mission */}
            <div className=" lg:px-8 px-4 sm:w-[50%] w-full flex flex-col gap-2 sm:mt-0 mt-6">
              {missionTitle && <h2 className="text-2xl font-gilroy-medium leading-[120%] mb-3 flex flex-row items-center gap-4 text-[#171717]">{missionTitle}
                <svg width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.0268 13.1493L6.53941 8.1798L6.48911 6.4278C9.44201 5.18265 9.02726 0.737993 5.86079 0.0850945C1.77169 -0.758413 0.109603 4.9085 3.8715 6.51073V28.4054H1.04651C0.945304 28.4054 0.476542 28.687 0.380927 28.7761C-0.389582 29.4946 0.0928398 30.7769 1.07755 30.9997H9.95609C10.9762 30.7676 11.4338 29.4284 10.5987 28.7235C10.5167 28.6548 10.0604 28.4054 9.98714 28.4054H6.47918V20.6232L23.2422 15.5894C24.3592 15.0566 24.2021 13.507 23.0268 13.1493ZM5.02012 4.13554C4.16083 4.05942 4.13599 2.77343 4.97231 2.60262C6.12031 2.36807 6.27057 4.24632 5.02012 4.13554ZM6.47918 17.8439V10.865L18.1517 14.3845L6.47918 17.8439Z" fill="url(#paint0_linear_14292_17381)" />
                  <defs>
                    <linearGradient id="paint0_linear_14292_17381" x1="11.9999" y1="0" x2="11.9999" y2="30.9997" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#C0D5FF" />
                      <stop offset="1" stopColor="#2D66EC" />
                    </linearGradient>
                  </defs>
                </svg>
              </h2>}
              {missionDescription && (
                <div className="prose prose-gray text-[#5C5C5C] text-xl font3 leading-[140%] md:max-w-md w-full">
                  <PortableText value={missionDescription} />
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          {buttonText && buttonLink && (
            <a
              href={buttonLink}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link className="text-white text-center bg-[#335CFF] rounded-xl cursor-pointer px-4 py-3 " href="/contact-us">Know more</Link>
      </div>

    </section>
  )
}
