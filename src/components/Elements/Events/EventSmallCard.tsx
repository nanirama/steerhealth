import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/utils';
import EventMetaBar from "@/components/Elements/Events/EventMetaBar";
import Image from 'next/image';

import SmallCardImg from "../../../../public/images/small-card-img.png"

const EventSmallCard = ({
    title,
    expert,
    address,
    datetime = "September 30 - October 3, 2025",
    image,
    imageAlt,
    href,
}: any) => {
    const imageUrl = image &&
        urlForImage(image)
            ?.height(300)
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
        <>
            <div className=''>
                <article className="border-b border-[#D0D0D0] pb-8 overflow-hidden transition-all duration-300">
                    <div className="flex sm:flex-row flex-col gap-5">
                        {imageUrl && blurImageUrl && (
                            <div className="relative sm:w-[130px] flex-shrink-0 rounded-[12px] overflow-hidden">
                                <Link href={`/events/${href}`}><Image
                                    src={imageUrl}
                                    alt={imageAlt || " "}
                                    width={130}
                                    height={98}
                                    className="object-cover w-full rounded-[12px] transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw,
                                    (max-width: 1024px) 80vw,
                                    130px"
                                    placeholder="blur"
                                    blurDataURL={blurImageUrl}
                                />
                                </Link>
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <div className="space-y-1">
                                <div className="text-xs font-medium text-[#818181] uppercase tracking-wider">PRESS RELEASE</div>
                                <h2 className="text-2xl font-medium text-[#171717] font-gilroy-medium max-w-sm leading-[120%] transition-colors">
                                    <Link href={`/events/${href}`}>
                                        {title}
                                    </Link>
                                </h2>
                                <div className="text-xs font-medium text-[#818181]">{datetime}</div>
                            </div>
                        </div>
                    </div>
                </article >
            </div >
        </>
    )
}
export default EventSmallCard