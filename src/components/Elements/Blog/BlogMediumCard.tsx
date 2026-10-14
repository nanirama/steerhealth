import Link from 'next/link';
import Image from "next/image"
import { urlForImage } from '@/sanity/lib/utils';



const BlogMediumCard = ({
  title,
  category = "PRESS RELEASE",
  publishedAt,
  image,
  imageAlt,
  href,
  className = ""
}: any) => {
  const imageUrl = image &&
    urlForImage(image)
      ?.height(500) // Reduced from 900 (33% smaller)
      ?.width(800)  // Reduced from 1200 (33% smaller)
      .format('webp')
      ?.fit('crop')
      ?.quality(85) // Add quality optimization
      ?.url();

  const blurImageUrl = image &&
    urlForImage(image)
      ?.height(45)
      ?.width(60)
      ?.blur(20)
      .format('webp')
      ?.fit('crop')?.url();
  return (
    <div className={`mx-auto w-full`}>
      <Link href={`/blog/${href}`} className="group block">
        <article className="transition-all duration-300">
          {/* Image */}
          {imageUrl && blurImageUrl && (
            <div className="relative aspect-[8/5] w-full bg-white lg:rounded-t-[40px] md:rounded-t-[24px] lgrounded-t-[16px] overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt || " "}
                width={800}
                height={500}
                className=" lg:rounded-t-[40px] md:rounded-t-[24px] lgrounded-t-[16px] object-cover w-full rounded-b-none  transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw,
                                       (max-width: 1024px) 80vw,
                                       800px"
                placeholder="blur"
                blurDataURL={blurImageUrl}
              />
            </div>
          )}


          {/* Content */}
          <div className="space-y-4 px-6 py-5 bg-white rounded-b-[40px]">
            {/* Category */}
            <div className="text-xs font-medium text-[#818181] uppercase tracking-wider">
              {category}
            </div>

            {/* Title */}
            <h2 className="text-2xl text-[#0A0D14] font-gilroy-medium font-medium leading-[120%] max-w-sm transition-colors">
              {title}
            </h2>

            {/* Date */}
            <div className="text-xs font-medium text-[#818181] mb-4">
              {publishedAt}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};


export default BlogMediumCard;