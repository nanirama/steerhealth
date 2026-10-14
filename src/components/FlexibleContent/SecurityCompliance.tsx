// components/SecurityCompliance.tsx
import { urlForImage } from '@/sanity/lib/utils';
import Image from "next/image";



export default function SecurityCompliance({ data }: any) {

  if (!data) return null


  const imageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(160)
      .width(170)
      .format("webp")
      .auto("format")
      .fit("max")
      .url();

  const imageUrl2 = data?.image2 &&
    urlForImage(data?.image2)
      ?.height(160)
      .width(240)
      .format("webp")
      .auto("format")
      .fit("max")
      .url();


  return (
    <section className="bg-gradient-to-r from-[#E8F1FF] via-[#F3F6FF] to-[#FDF7FF] py-16 px-4">
      <div className="mx-auto flex lg:flex-row flex-col max-w-6xl items-center justify-between gap-8 md:gap-12">
        <div className="flex-1 ">
          <div className="md:items-start items-center px-4 sm:justify-start justify-center">
            {data?.heading && <h2 className="md:text-[36px] text-[30px] mb-6 mx-auto md:text-left text-center text-[#171717] font-bold font2 md:leading-[110%] leading-[130%] flex flex-row gap-4 items-center"> <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
            </svg>{data?.heading}</h2>}
            {data?.subHeading && <h2 className="text-xl mx-auto md:text-left text-center text-[#5c5c5c] font-bold font2 md:leading-[110%] leading-[130%]">{data?.subHeading}</h2>}
          </div>

        </div>

        <div className="flex sm:flex-row flex-col items-center gap-8">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Client"
              width={170}
              height={160}
            />
          )}
          {imageUrl2 && (
            <Image
              src={imageUrl2}
              alt="Client"
              width={240}
              height={160}
            />
          )}
          {/* {data.badges?.map((badge) => (
            <div key={badge._key} className="relative h-24 w-24 md:h-32 md:w-32">
              <Image
                src={urlFor(badge.image).width(128).height(128).url()}
                alt={badge.alt}
                fill
                className="object-contain"
              />
            </div>
          ))} */}
        </div>
      </div>
    </section>
  )
}