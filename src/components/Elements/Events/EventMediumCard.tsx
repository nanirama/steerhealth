import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';
import {formatEventDate} from "@/lib/index";


const EventMediumCard = ({
    title,
    expert,
    address,
    datetime = "September 30 – October 3, 2025",
    categories,
    image,
    imageAlt,
    href,
    startDate,
    endDate
}: any) => {
    const formattedDate = formatEventDate(startDate, endDate);
    const imageUrl = image &&
        urlForImage(image)
            ?.width(600)  // Reduced from 1200
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


        <div className=''>
            <div className='lg:rounded-[24px] md:rounded-2xl rounded-xl'>
                {imageUrl && blurImageUrl && (
                    <div className="w-full md:h-[260px] max-h-[260px] overflow-hidden">
                        <Link href={`/events/${href}`}>
                            <Image
                                src={imageUrl}
                                alt={imageAlt || " "}
                                width={800}
                                height={700}
                                className="  lg:rounded-[24px] md:rounded-2xl rounded-xl object-cover w-full rounded-b-none  transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw,
                        (max-width: 1024px) 80vw,
                        800px"
                                placeholder="blur"
                                blurDataURL={blurImageUrl}
                            />
                        </Link>
                    </div>

                )}
            </div>
            <div className="space-y-2 md:px-6 py-5 bg-white rounded-b-[40px]">
                {categories && (
                    <div className="text-xs font-medium text-[#818181] uppercase tracking-wider">
                        <span className="font-medium text-xs text-[#818181]">
                            {categories && categories.map((item: any, index: number) => (
                                <span key={index}>
                                    {item.title}
                                    {index < categories?.length - 1 && ", "}
                                </span>
                            ))}
                        </span>
                    </div>
                )}
                {title && <h2 className="text-2xl text-[#0A0D14] font-gilroy-medium font-medium leading-[120%] max-w-sm transition-colors">
                    <Link href={`/events/${href}`}>{title}</Link>
                </h2>}
                {expert && <p className='font3 text-base text-[#808080] max-w-md'>{expert}</p>}
                {formattedDate && <div className="text-xs font-medium text-[#818181] mb-4">{formattedDate}</div>}
                <div className="lg:!inline-flex inline-block w-full lg:flex-row flex-col gap-4 justify-between">
                    <Link
                        href={`/events/${href}`}
                        className="inline-flex items-center justify-center rounded-[8px] transition-all duration-200 bg-[#335CFF] cursor-pointer group relative flex-row gap-2 leading-[24px] text-white font-medium py-3 md:px-4 px-2 text-sm"
                    >
                        Learn more
                        <div className="relative ml-1 h-5 w-5 overflow-hidden">
                            <div className="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                >
                                    <path
                                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 -translate-x-4"
                                >
                                    <path
                                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default EventMediumCard