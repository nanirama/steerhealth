import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from '@/sanity/lib/utils';

const BlogCard = ({ post }) => {
  const { title, mainImage, expert, slug } = post;
  const imageUrl = mainImage &&
    urlForImage(mainImage).width(800).height(450).format('webp').fit('crop').url();

  return (
    <div className="h-full flex flex-col justify-between">
      {imageUrl && (
        <div className="w-full overflow-hidden md:rounded-[24px] rounded-lg">
          <Link href={`/blog/${slug}`}>
            <Image
              src={imageUrl}
              alt={title}
              className="w-full h-auto object-cover"
              layout="responsive"
              width={800}
              height={450}
              sizes="(min-width: 1024px) 100vw, 100vw"
              priority
            />
          </Link>
        </div>
      )}

      <div className="flex flex-col justify-between gap-4 mt-4">
        {title && (
          <h3 className="text-2xl text-[#1D1718] font-medium font2">
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
        )}
        {/* {expert && <p className="text-base text-[#1D1718]">{expert}</p>} */}
      </div>
    </div>
  );
};

export default BlogCard;
