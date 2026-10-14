import Image from "next/image";
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/utils';

export default async function FmTestimonials({ data }: any) {
  const imageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(500) // Reduced from 900 (33% smaller)
      ?.width(500)  // Reduced from 1200 (33% smaller)
      .format('webp')
      ?.fit('crop')
      ?.quality(85) // Add quality optimization
      ?.url();

  const blurImageUrl = data?.image &&
    urlForImage(data?.image)
      ?.height(20)
      ?.width(20)
      ?.blur(20)
      .format('webp')
      ?.fit('crop')?.url();

  return (
    <section className="bg-white sm:py-24 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 ">
          <div className="flex-shrink-0">
            {imageUrl && blurImageUrl && (
                <Image
                  src={imageUrl} // change to your actual path
                  alt="Smiling woman testimonial"
                  width={250}
                  height={250}
                  placeholder="blur"
                  blurDataURL={blurImageUrl}
                  className="rounded-lg object-cover w-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 200px, 250px"
                />                
            )} 
                
          </div>

          {/* Right: Text */}
          <div className="flex-1 sm:items-start items-center">
            <blockquote className="relative">
              <span className="absolute left-0 top-0 h-full rounded-full w-[6px] bg-[#335cff] hidden md:block"></span>
              <span className="absolute left-0 top-0 right-0 h-[6px] rounded-full w-full bg-[#335cff] block md:hidden text-transparent">1</span>       

              {data?.quote && (
                <PortableText
                  value={data?.quote}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="md:pl-10 sm:text-2xl text-xl md:text-[36px] font-medium leading-[120%] text-[#171717] sm:pt-0 pt-6 sm:text-left text-center">
                          {children}
                        </p>
                      )
                    },
                  }}
                />
              )}
              {data?.authorTitle && <footer className="mt-4 md:pl-10 text-[#5C5C5C] italic sm:text-xl text-sm leading-[140%]  sm:text-left text-center ">
                — {data?.authorTitle}
              </footer>}
            </blockquote>
          </div>
        </div>
        {data?.subText && (
          <PortableText
            value={data?.subText}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="mt-8 text-[#5C5C5C] md:text-2xl sm:text-xl text-base leading-[140%]  sm:text-left text-center">
                    {children}
                  </p>
                )
              },
            }}
          />
        )}
      </div>
    </section>
  );
}
