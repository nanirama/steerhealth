import type React from "react"
import Link from "next/link"
import { getSlugUrl } from '@/sanity/lib/utils';
import { ArrowRight } from "@/components/Elements/Icons"

export const ArticleCTA = ({data}:any) => {
  const { ctaHeading, button } = data
  if(!button?.text) return false;
  return (
    
    <section className="blog-cta rounded-[12px] text-center md:my-0 my-10 flex flex-col items-center justify-stretch">
        {ctaHeading && <h2 className="text-2xl text-[#171717] leading-[120%] font-bold font2 mb-8 sm:pt-16 pt-10">
          {ctaHeading}
        </h2>}
        {button && button?.text && (
          <Link href={`${(button?.link && button?.link?.slug) ? getSlugUrl(button?.link?._type, button?.link?.slug) : "#"}`} className="inline-flex sm:mb-16 mb-10 items-center gap-4 bg-[#2662F0] hover:bg-[#3B82F6] text-white text-[17px] px-6 py-3 rounded-[12px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#2662F0] focus:ring-offset-2 focus:ring-offset-[#111316]">
            {button?.text}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
        
    </section>
  )

}


