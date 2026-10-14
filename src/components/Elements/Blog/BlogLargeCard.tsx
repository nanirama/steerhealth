import Link from 'next/link';
import Image from "next/image"
import { urlForImage } from '@/sanity/lib/utils';



const BlogLargeCard = ({
    title,
    category = "PRESS RELEASE",
    publishedAt,
    image,
    imageAlt,
    href,
}: any) => {
    const imageUrl = image &&
        urlForImage(image)
            ?.height(450) // Reduced from 700
            ?.width(800)  // Reduced from 1200
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
        <div className={`w-full max-w-7xl mx-auto`}>
            <Link href={`/blog/${href}`} className="group block">
                <article className="overflow-hidden transition-all duration-300">
                    {/* Mobile Layout */}
                    <div className="block lg:hidden ">
                        {/* Image */}
                        {imageUrl && blurImageUrl && (
                            <div className="relative aspect-[8/4.5] w-full rounded-lg overflow-hidden">
                                <Image
                                    src={imageUrl}
                                    alt={imageAlt || " "}
                                    width={800}
                                    height={450}
                                    className="rounded-lg transition-transform duration-300 group-hover:scale-105"
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
                            <h2 className="text-2xl font-medium text-[#0A0D14] font-gilroy-medium leading-[120%] max-w-sm transition-colors">
                                {title}
                            </h2>

                            {/* Date */}
                            <div className="text-xs font-medium text-[#818181] mb-4">
                                {publishedAt}
                            </div>
                        </div>

                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:flex ">
                        {/* Image */}
                        <div className="relative w-[68%] lg:rounded-l-[40px] md:rounded-l-[24px] rounded-l-[16px] overflow-hidden">
                            {imageUrl && blurImageUrl && (

                                <Image
                                    src={imageUrl}
                                    alt={imageAlt || " "}
                                    width={800}
                                    height={400}
                                    className="lg:rounded-l-[40px] md:rounded-l-[24px] rounded-l-[16px] object-cover w-full  transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw,
                                                               (max-width: 1024px) 80vw,
                                                               800px"
                                                               priority
                                    placeholder="blur"
                                    blurDataURL={blurImageUrl}
                                />

                            )}
                        </div>

                        {/* Content */}
                        <div className="w-[32%] p-8 flex flex-col justify-between rounded-r-[40px] bg-white">
                            <div className='flex flex-col gap-4'>
                                {/* Category Badge */}
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center text-xs font-medium text-[#818181] uppercase tracking-wide">
                                        {category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="xl:text-[36px] text-[28px] font-semibold font2 text-black leading-tight xl:mb-16 mb-4 transition-colors">
                                    {title}
                                </h2>
                            </div>
                            {/* Meta */}
                            {/* <div className="flex items-center gap-2 text-sm text-gray-500">
                                <div className="flex items-center gap-0 text-[#6E6E73] text-base font3">
                                    <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.1009 20.8535C12.4753 20.8535 13.7921 20.586 15.0512 20.0509C16.2683 19.5262 17.349 18.7918 18.2933 17.8475C19.2376 16.9032 19.9721 15.8225 20.4967 14.6054C21.0318 13.3463 21.2994 12.0321 21.2994 10.6629C21.2994 9.29363 21.0318 7.97423 20.4967 6.70466C19.9721 5.48755 19.2376 4.40685 18.2933 3.46254C17.349 2.51823 16.2683 1.78377 15.0512 1.25916C13.7816 0.724051 12.4622 0.456497 11.093 0.456497C9.72374 0.456497 8.40433 0.724051 7.13477 1.25916C5.91766 1.78377 4.83958 2.51823 3.90052 3.46254C2.96146 4.40685 2.22962 5.48755 1.705 6.70466C1.1699 7.97423 0.902344 9.29363 0.902344 10.6629C0.902344 12.0321 1.1699 13.3463 1.705 14.6054C2.22962 15.8225 2.96408 16.9032 3.90839 17.8475C4.85269 18.7918 5.9334 19.5262 7.1505 20.0509C8.40958 20.586 9.72636 20.8535 11.1009 20.8535ZM11.1009 18.5557C10.0201 18.5557 8.9919 18.3511 8.01612 17.9419C7.07181 17.5432 6.23505 16.9792 5.50584 16.25C4.77662 15.5208 4.21266 14.684 3.81396 13.7397C3.40476 12.764 3.20016 11.7383 3.20016 10.6629C3.20016 9.58741 3.40476 8.55655 3.81396 7.57027C4.21266 6.62597 4.774 5.7892 5.49797 5.05999C6.22194 4.33078 7.06132 3.76682 8.01612 3.36811C8.9919 2.95891 10.0175 2.75431 11.093 2.75431C12.1684 2.75431 13.1941 2.95891 14.1698 3.36811C15.1246 3.76682 15.9667 4.33078 16.6959 5.05999C17.4251 5.7892 17.989 6.62597 18.3878 7.57027C18.797 8.55655 19.0042 9.58741 19.0094 10.6629C19.0147 11.7383 18.8074 12.764 18.3878 13.7397C17.989 14.684 17.4251 15.5208 16.6959 16.25C15.9667 16.9792 15.1299 17.5432 14.1856 17.9419C13.2098 18.3511 12.1816 18.5557 11.1009 18.5557ZM11.0851 12.0085C11.3369 12.0085 11.5468 11.9272 11.7147 11.7646C11.8825 11.6019 11.9665 11.3947 11.9665 11.1429V4.92621C11.9665 4.68489 11.8825 4.48029 11.7147 4.31241C11.5468 4.14454 11.3422 4.0606 11.1009 4.0606C10.8595 4.0606 10.6549 4.14454 10.4871 4.31241C10.3192 4.48029 10.2352 4.68489 10.2352 4.92621V10.293H6.33211C6.09078 10.293 5.88618 10.3743 5.71831 10.537C5.55043 10.6996 5.46649 10.9042 5.46649 11.1508C5.46649 11.3973 5.55043 11.6019 5.71831 11.7646C5.88618 11.9272 6.09078 12.0085 6.33211 12.0085H11.0851Z" fill="#6E6E73" />
                                    </svg>
                                    <span>{publishedAt}</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
};


export default BlogLargeCard;