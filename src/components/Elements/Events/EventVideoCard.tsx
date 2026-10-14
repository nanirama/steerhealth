import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/utils';

import VideoCardImg from "../../../../public/images/video-card-img.png"



const EventVideoCard = ({
    title,
    publishedAt,
    image,
    imageAlt,
    href,
    className = ""
}: any) => {
    const imageUrl = image &&
        urlForImage(image)
            ?.height(780)
            ?.width(440)
            .format('webp')
            ?.fit('crop')?.url();

    const blurImageUrl = image &&
        urlForImage(image)
            ?.height(39)
            ?.width(22)
            ?.blur(20)
            .format('webp')
            ?.fit('crop')?.url();
    return (
        <div className="">
            <Link href="#" className="group ">
                <article className="relative rounded-[24px] overflow-hidden shadow-lg transition-all duration-300 ">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image src={VideoCardImg} width={500} height={1000} alt="event-image" className="object-cover transition-transform duration-500 relative" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    {/* {imageUrl && blurImageUrl && (
                    <div className="absolute inset-0">
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            fill
                            className="object-cover transition-transform duration-500 "
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 384px"
                            placeholder="blur"
                            blurDataURL={blurImageUrl}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    )} */}

                    {/* Content Overlay */}
                    <div className="relative h-full flex flex-col justify-end p-6 text-white">
                        {/* Author Section */}
                        {/* <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                    src={authorAvatar}
                                    alt={`${authorName} profile picture`}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                />
                            </div>
                            <span className="text-base font-bold text-[#F5F5F7] font2">
                                {authorName}
                            </span>
                        </div> */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                <Image src={VideoCardImg} width={60} alt="event-image" className="object-cover transition-transform duration-500 " />
                            </div>
                            <span className="text-base font-bold text-[#F5F5F7] font2">
                                Lorem Ipsum
                            </span>
                        </div>
                        {/* Description */}
                        <h3 className="text-base text-white font3 leading-[140%] mb-4">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </h3>

                        {/* Meta Information */}
                        <div className="flex items-center justify-start text-xs text-white/70">
                            <span className='text-white text-xs font-medium'>August 6, 2025</span>
                            <span className="mx-2">•</span>
                            <div className="flex items-center gap-1">
                                <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.41377 17.1445C1.64217 17.1445 1.04958 16.9516 0.635995 16.5658C0.222415 16.18 0.015625 15.6168 0.015625 14.876V8.12601C0.015625 7.63219 0.111304 7.20935 0.302662 6.85749C0.49402 6.50564 0.770255 6.23867 1.13137 6.05657C1.49248 5.87447 1.91995 5.78342 2.41377 5.78342H9.56192C10.3212 5.78342 10.903 5.98712 11.3073 6.39453C11.7116 6.80194 11.9138 7.3791 11.9138 8.12601V14.8112C11.9138 15.5581 11.7054 16.1337 11.2888 16.538C10.8721 16.9424 10.2811 17.1445 9.51562 17.1445H2.41377ZM12.9601 13.7742V9.20935L15.2101 7.27416C15.3829 7.13836 15.5403 7.03342 15.6823 6.95935C15.8428 6.8791 15.9971 6.83898 16.1453 6.83898C16.4354 6.83898 16.6699 6.93311 16.849 7.12138C17.028 7.30965 17.1175 7.55811 17.1175 7.86675V15.126C17.1175 15.4347 17.028 15.6831 16.849 15.8714C16.6699 16.0597 16.44 16.1538 16.1591 16.1538C15.8783 16.1538 15.5619 16.0056 15.2101 15.7093L12.9601 13.7742Z" fill="#F5F5F7" />
                                </svg>
                            </div>
                        </div>

                        {/* Play Button Overlay */}
                        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="text-white ml-1"
                                    role="img"
                                    aria-label="Play video"
                                >
                                    <title>Play video</title>
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div> */}
                    </div>
                </article>
            </Link>
        </div>
    );
};


export default EventVideoCard;