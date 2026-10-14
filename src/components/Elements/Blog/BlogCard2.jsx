import React from "react";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import dayjs from 'dayjs';
import Link from "next/link";
import { urlForImage } from '@/sanity/lib/utils';

function getPlainText(blocks) {
  return blocks
    .map(block => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map(child => child.text).join(" ");
    })
    .join(" ");
}

export function ExpertText({ expert }) {
  const plainText = getPlainText(expert || []);
  const words = plainText.split(" ");
  const truncated =
    words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");

  return (
    <p className="text-base text-[#1D1718] my-2">
      {truncated}
    </p>
  );
}

const BlogCard2 = ({ post }) => {
  const { title, mainImage, expert, slug, publishedAt } = post;
  const imageUrl = mainImage &&
    urlForImage(mainImage).width(800).height(450).format('webp').fit('crop').url();


  return (
    <div className="h-full flex flex-col justify-start gap-5">
      <div className="relative w-full overflow-hidden md:rounded-t-[24px] sm:rounded-t-[16px] rounded-t-[12px]">
        {imageUrl && (
          <Link href={`/blog/${slug}`}>
            <Image
              src={imageUrl}
              alt={title}
              className="w-full h-auto object-cover"
              layout="responsive"
              width={800}
              height={450}
              sizes="(min-width: 1024px) 100vw, 100vw"
            />
          </Link>
        )}
      </div>

      <div className="flex flex-col justify-start gap-4 px-3 my-4">
        <h4 className="text-xs font-medium text-[#818181]">{dayjs(publishedAt).format('MMMM D, YYYY')}</h4>
        {title && (
          <h3 className="text-2xl text-[#1D1718] font-gilroy-medium font-medium">
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
        )}
        { expert && <ExpertText expert={expert} />}
      </div>
    </div>
  );
};

export default BlogCard2;
