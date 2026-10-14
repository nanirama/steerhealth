import Link from 'next/link';
import Image from "next/image"
import { urlForImage } from '@/sanity/lib/utils';


const BlogSmallCard = ({
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
            ?.height(400)
            ?.width(400)
            .format('webp')
            ?.fit('crop')?.url();

    const blurImageUrl = image &&
        urlForImage(image)
            ?.height(20)
            ?.width(20)
            ?.blur(20)
            .format('webp')
            ?.fit('crop')?.url();
    return (
        <div className={`w-full`}>

            <Link href={`/blog/${href}`} className="group block">
                <article className="border-b border-[#D0D0D0] pb-8 overflow-hidden transition-all duration-300">
                    <div className="flex sm:flex-row flex-col gap-5">
                        {/* Image */}
                        {imageUrl && blurImageUrl && (
                            <div className="relative sm:w-[130px] sm:h-[130px] flex-shrink-0 rounded-[12px] overflow-hidden">
                                <Image
                                    src={imageUrl}
                                    alt={imageAlt || " "}
                                    width={130}
                                    height={130}
                                    className="object-cover w-full rounded-[12px] transition-transform duration-300 group-hover:scale-105"

                                    sizes="(max-width: 640px) 100vw,
                                                               (max-width: 1024px) 80vw,
                                                               130px"
                                    placeholder="blur"
                                    blurDataURL={blurImageUrl}
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="space-y-1">
                                {/* Category */}
                                <div className="text-xs font-medium text-[#818181] uppercase tracking-wider">
                                    {category}
                                </div>

                                {/* Title */}
                                <h2 className="text-2xl font-medium text-[#171717] font-gilroy-medium max-w-sm leading-[120%] transition-colors">
                                    {title}
                                </h2>

                                {/* Date */}
                                <div className="text-xs font-medium text-[#818181]">
                                    {publishedAt}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
};



export default BlogSmallCard;