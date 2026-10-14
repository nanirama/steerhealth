// components/RelatedArticles.tsx
import React from "react";
import dayjs from 'dayjs';
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from '@/sanity/lib/utils';



export const RelatedArticles = ({ data }: { data: any }) => {

  return (
    <section className="w-full pt-10">
      {/* Heading */}
      <h2 className="text-[36px] text-black font-semibold leading-tight mb-4">Latest News</h2>

      {/* Articles */}
      <div className="flex flex-col divide-y divide-gray-200">
        {data && data.map((article: any) => {
          const imageUrl = article?.image &&
            urlForImage(article?.image)
              ?.height(260)
              ?.width(350)
              .format('webp')
              ?.fit('crop')?.url();

          const blurImageUrl = article?.image &&
            urlForImage(article?.image)
              ?.height(26)
              ?.width(35)
              ?.blur(10)
              .format('webp')
              ?.fit('crop')?.url();
          return (
            <article
              key={article._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-8 py-6"
            >
              {/* Image */}
              <Link
                href={article.slug}
                className="flex-shrink-0 w-full h-full sm:w-[120px] sm:h-[80px] relative rounded-lg overflow-hidden"
              >
                <Image
                  src={imageUrl}
                  alt={article?.title || " "}
                  width={350}
                  height={260}
                  className="rounded-md w-full h-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 175px"
                  placeholder="blur"
                  blurDataURL={blurImageUrl}
                />
              </Link>

              {/* Text */}
              <div className="flex flex-col">
                <p className="uppercase text-[12px] text-gray-500 tracking-wide">
                  {article.categories && article.categories.map((category: any, index: number) => (
                    <span key={category._id}>
                      <Link
                        href={`/blog/${category.slug}`}
                        className="text-[#818181] text-xs font-medium uppercase hover:underline"
                      >
                        {category.title}
                      </Link>
                      {index < article.categories.length - 1 && ', '}
                    </span>
                  ))}
                </p>
                <Link
                  href={article.slug}
                  className="text-[18px] sm:text-2xl font2 font-medium text-[#171717] leading-snug hover:underline py-2"
                >
                  {article.title}
                </Link>
                <time
                  dateTime={dayjs(article?.publishedAt).format('MMMM D, YYYY')}
                  className="text-xs text-[#818181]"
                >
                  {dayjs(article?.publishedAt).format('MMMM D, YYYY')}
                </time>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  );
};

