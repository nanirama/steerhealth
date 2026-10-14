import type React from "react"
import Image from "next/image"
import { urlForImage } from '@/sanity/lib/utils';

export const ArticleMainImage = ({ image, title }: { image: any, title: string }) => {
  const imageUrl = image &&
    urlForImage(image)
      ?.width(1600)
      ?.format('webp')
      ?.url();

  const blurImageUrl = image &&
    urlForImage(image)
      ?.width(60)
      ?.height(45)
      ?.blur(50)
      ?.format('webp')
      ?.url();

  return (
    <div className="w-full my-10">
      <Image
        src={imageUrl}
        alt={title || " "}
        width={1600}        // aspect ratio hint
        height={900}        // aspect ratio hint
        className="w-full h-auto rounded-lg object-cover"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={blurImageUrl}
      />
    </div>
  )
}
