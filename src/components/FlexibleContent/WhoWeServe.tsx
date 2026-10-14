import { PortableText } from "@portabletext/react"
import { urlForImage } from '@/sanity/lib/utils';
import Image from "next/image";
export default function WhoWeServe({ data }: any) {
  if (!data) return null

  const { title, description, image } = data


  const imageUrl = image &&
    urlForImage(image)
      ?.height(790) // Reduced from 900 (33% smaller)
      ?.width(947)  // Reduced from 1200 (33% smaller)
      .format('webp')
      ?.fit('crop')
      ?.quality(85) // Add quality optimization
      ?.url();

  const blurImageUrl = image &&
    urlForImage(image)
      ?.height(395)
      ?.width(456)
      ?.blur(20)
      .format('webp')
      ?.fit('crop')?.url();

  return (
    <section className="md:py-20  py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 xl:gap-40 lg:gap-20 gap-10 items-center">

        {/* Left Image */}
        {image && (
          <div className="flex justify-center">
            {imageUrl && blurImageUrl && (
              <div className="">
                <Image
                  src={imageUrl}
                  alt={" "}
                  width={400}
                  height={300}
                  className="w-full object-cover"
                  sizes="(max-width: 640px) 100vw,
                        (max-width: 1024px) 80vw,
                        800px"
                  placeholder="blur"
                  blurDataURL={blurImageUrl}
                />
              </div>
            )}
          </div>
        )}

        {/* Right Content */}
        <div>
          {title && <h2 className="md:text-[60px] text-[48px] leading-[100%] font-gilroy-semibold tracking-[-2%] mb-6">{title}</h2>}
          {description && (
            <div className="prose prose-gray max-w-none text-2xl font3 text-[#5C5C5C] leading-[140%]">
              <PortableText value={description} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
