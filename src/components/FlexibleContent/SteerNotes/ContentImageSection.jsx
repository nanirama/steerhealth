import Image from "next/image";
import ButtonComponent from "@/components/Elements/ButtonComponent";
import { PortableText } from '@portabletext/react';
import { urlForImage } from "@/sanity/lib/utils";

const ProductBulletIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
    >
        <path
            d="M7.5 15C3.35775 15 0 11.6423 0 7.5C0 3.35775 3.35775 0 7.5 0C11.6423 0 15 3.35775 15 7.5C15 11.6423 11.6423 15 7.5 15ZM6.75225 10.5L12.0548 5.19675L10.9943 4.13625L6.75225 8.379L4.6305 6.25725L3.57 7.31775L6.75225 10.5Z"
            fill="url(#paint0_linear_55_5038)"
        />
        <defs>
            <linearGradient
                id="paint0_linear_55_5038"
                x1="0.5"
                y1="0"
                x2="15.5"
                y2="21.5"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#3794FF" />
                <stop offset="1" stopColor="#00B9B7" />
            </linearGradient>
        </defs>
    </svg>
);

const WhoWeServeBulletIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 15C3.35775 15 0 11.6422 0 7.5C0 3.35775 3.35775 0 7.5 0C11.6422 0 15 3.35775 15 7.5C15 11.6422 11.6422 15 7.5 15ZM6.75225 10.5L12.0547 5.19675L10.9943 4.13625L6.75225 8.379L4.6305 6.25725L3.57 7.31775L6.75225 10.5Z" fill="red" />
    </svg>

);


const ContentImageSection = ({ data, postType }) => {
    const imageUrl = data?.image &&
        urlForImage(data?.image)
            ?.width(800)
            ?.height(600)
            ?.format('webp')
            ?.fit('crop')
            ?.quality(80)
            ?.auto('format')
            ?.url();

    const blurImageUrl = data?.image &&
        urlForImage(data?.image)
            ?.height(8)
            ?.width(20)
            ?.blur(50)
            .format('webp')
            ?.fit('crop')
            ?.quality(20)
            ?.url();

    return (
        <>
            <div className="w-full md:pb-12 py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4">


                    {/* {data?.title && (
                            <>
                                <h3 className=" md:text-[56px] text-[40px] font-bold text-[#171717] text-center md:mb-0 mb-4 md:block hidden">{data?.title}</h3>
                                <h3 className=" md:text-[56px] text-[40px] font-bold text-[#171717] block md:hidden ">{data?.title}</h3>
                            </>
                        )} */}
                    <div
                        className={`flex ${data?.imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"}  flex-col gap-10 md:mt-20 mt-10`}
                    >

                        <div className="flex flex-col justify-center gap-4 md:w-[50%] w-full">
                            {data?.title && (
                                <>
                                    <p>
                                        <span className="inline-block border border-[#ECEFF1] py-2 px-3 rounded-full text-[12.91px] font-bold leading-[20px] tracking-[0%] text-left uppercase text-[#2160FD] md:mb-0 mb-4">{data?.title}</span>
                                    </p>
                                </>
                            )}

                            {/* <div class="inline-flex flex-row gap-2 justify-center items-center text-center mx-auto px-4 py-2 border border-[#ECEFF1] rounded-full text-[13px] font-medium font3 leading-[20px] mb-3 text-[#252525]">WELCOME TO STEERNOTES</div> */}
                            {/* <PortableText
                                    value={data.title}
                                    components={{
                                        block: {
                                            h2: ({ children }) => (
                                                <h3 className="md:text-[56px] text-[40px] font-bold text-[#171717] text-center md:mb-0 mb-4 md:block hidden">
                                                    {children}
                                                </h3>
                                            ),
                                            normal: ({ children }) => (
                                                <p>
                                                    <span  className="inline-block border border-[#ECEFF1] p-2 rounded-full text-[12.91px] font-bold leading-[20px] tracking-[0%] text-left uppercase text-[#2160FD] md:mb-0 mb-4">{children}</span>
                                                </p>
                                            ),
                                        },
                                        marks: {
                                            strong: ({ children }) => (
                                                <strong className="italic text-[#3591FA] !font4 !font-normal">
                                                    {children}
                                                </strong>
                                            ),
                                        },
                                    }}
                                /> */}
                            {data?.description && (
                                <PortableText
                                    value={data.description}
                                    components={{
                                        block: {
                                            normal: ({ children }) => (
                                                <p className="desc-paragraph  md:text-xl text-[16px] leading-[140%] text-[#5C5C5C] !font3 md:max-w-[570px] w-full md:text-left text-center mb-3">
                                                    {children}
                                                </p>
                                            ),
                                            h3: ({ children }) => (
                                                <h3 className="md:text-[36px]  text-[28px]  leading-[100%] my-2 font5  text-[#171717]">
                                                    {children}
                                                </h3>
                                            ),
                                        },


                                        list: {
                                            bullet: ({ children }) => (
                                                <ul className="desc-list  flex flex-col gap-4 mt-2">
                                                    {children}
                                                </ul>
                                            ),
                                        },

                                        listItem: {
                                            bullet: ({ children }) => (
                                                <li className="flex flex-row border-b border-[#DADADA] gap-2 items-start text-base leading-[140%]  text-[#5C5C5C] font3 pb-3 mb-3">
                                                    <span className="mt-[4px]"><ProductBulletIcon /></span>
                                                    <span className="">{children}</span>
                                                </li>
                                            ),
                                        },

                                        marks: {
                                            strong: ({ children }) => <strong className="block !font3 font-semibold text-base leading-[20px] tracking-[0.25px]">{children}</strong>,
                                            em: ({ children }) => <em className="w-full inline-block block my-2 md:text-[36px]  text-[28px] cntimg_ttl leading-[100%] leading-[100%] italic !bg-[linear-gradient(89.46deg,_#1F9AE2_-2.91%,_#3591FA_35.18%,_#0030A6_72.19%,_#002175_108.67%)] text-transparent bg-clip-text inline-block font4  !font-normal">{children}</em>,
                                        },
                                    }}
                                />

                            )}

                            {/* {data?.ctaButtonPrimary && (
                                <div className="inline-flex md:justify-start justify-center md:mb-0 mb-3">
                                    <ButtonComponent button={data?.ctaButtonPrimary} />
                                </div>
                            )} */}
                        </div>
                        <div className="md:w-[50%] w-full overflow-hidden  md:rounded-[26px] rounded-[12px]">
                            {imageUrl && blurImageUrl && (
                                <Image
                                    src={imageUrl}
                                    alt={data?.title || "Content Image"}
                                    width={800}
                                    height={600}
                                    placeholder="blur"
                                    blurDataURL={blurImageUrl}
                                    loading="lazy"
                                    priority={false}
                                    quality={80}
                                    className="h-full w-full object-cover"
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ContentImageSection