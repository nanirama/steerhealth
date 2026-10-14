import type React from "react"
import { Badge } from "@/components/Elements/Badge"
import Link from "next/link"
import { PortableText } from '@portabletext/react';


export const ArticleHeader = ({ categories, date, title, description }: any) => {
  return (
    <header className="text-left">
      <div className="mb-4 flex flex-col gap-1">
        <Badge className="mb-3">
          {categories && categories.map((category: any, index: number) => (
            <span key={category._id}>
              <Link
                href={`/blog/${category.slug}`}
                className="text-[#5C5C5C] uppercase text-base font-medium tracking-[6%]"
              >
                {category.title}
              </Link>
              {index < categories.length - 1 && ', '}
            </span>
          ))}
        </Badge>
        <p className="text-[#5C5C5C] uppercase text-base font-medium tracking-[6%]">{date}</p>
      </div>

      <h1 className="md:text-[48px] text-[40px] font-semibold font2 text-[#171717] my-8 leading-[100%]">
        {title}
      </h1>

      {description && <PortableText value={description} components={{
        block: {
          normal: ({ children }) => <p className="text-[#5C5C5C] leading-[140%] font3 md:text-2xl text-xl my-5">{children}</p>,
        },
        marks: {
          strong: ({ children }) => <strong className="font-semibold ">{children}</strong>,
          link: ({ children, value }: any) => {
            const target = value?.openInNewTab ? "_blank" : undefined;
            const rel = value?.openInNewTab ? "noopener noreferrer" : undefined;
            return (
              <a href={value?.href} target={target} rel={rel} className="underline text-[#344ead]">
                {children}
              </a>
            );
          },
        },

      }} />}

      {/* <p className="text-[#5C5C5C] leading-[140%] font3 md:text-2xl text-xl my-5">
        {description}
      </p> */}
    </header>
  )
}
