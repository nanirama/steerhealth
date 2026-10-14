"use client";
import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const HowSteerHelpscareProviders = ({ data, page }: any) => {
    const [showAll, setShowAll] = useState(false); // State to toggle show more
    if (!data) return null;

    const { careItems } = data;
    

    let mainContainerWidth = 'max-w-7xl mx-auto';
    let mainGridContainer = 'sm:grid-cols-2 gap-12 lg:grid-cols-4';

    if (page === 'hospitals') {
        mainContainerWidth = '!max-w-7xl flex-wrap';
        mainGridContainer = 'sm:grid-cols-3 lg:grid-cols-4';
    }

    // Determine which items to display
    const itemsToDisplay = showAll ? careItems : careItems.slice(0, 4);

    return (
        <section className={`w-full md:py-24 py-8 ${(page === 'hospitals' || page === 'medical-groups' || page === 'ambulatory-surgery-centers') ? 'bg-white' : 'bg-[#F7F7F7]'}`}>
            <div className={`mx-auto px-4 w-full ${mainContainerWidth}`}>
                {data?.heading && (
                    <h2 className="text-[#171717] md:text-[60px] sm:text-4xl text-[30px] sm:leading-[100%] leading-[32px] tracking-[-2%] font-semibold text-center font2 lg:py-5 pb-4 pt-2">{data?.heading}</h2>
                )}
                {data?.subheading && (
                    <h2 className="sm:text-2xl text-base text-[#5C5C5C] font3 max-w-4xl mx-auto text-center lg:pb-5 pt-2 pb-4">{data?.subheading}</h2>
                )}
                
                <div className={`flex flex-row items-start gap-10 flex-wrap justify-center mt-6`}>
                    {itemsToDisplay.map((item: any, index: number) => {
                        let imageUrl = item?.image &&
                            urlForImage(item?.image)
                                ?.height(780)
                                .width(800)
                                .format("webp")
                                .auto("format")
                                .fit("max")
                                .url();

                        
                                
                        let blurImageUrl = urlForImage(item?.image)
                            ?.width(20)
                            ?.height(19)
                            .format("webp")
                            .auto("format")
                            .fit("max")
                            .blur(50)
                            .url();

                        if (page === 'hospitals' || page === 'medical-groups' || page === 'ambulatory-surgery-centers') {
                            imageUrl = item?.image &&
                                urlForImage(item?.image)
                                    ?.height(880)
                                    .width(1040)
                                    .format("webp")
                                    .auto("format")
                                    .fit("max")
                                    .url();

                            blurImageUrl = urlForImage(item?.image)
                                ?.width(20)
                                ?.height(19)
                                .format("webp")
                                .auto("format")
                                .fit("max")
                                .blur(50)
                                .url();
                        }

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-start xl:!w-[22%] lg:w-[30%] sm:w-[45%] w-full"
                            >
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt={item.title || "Feature Image"}
                                        width={`${(page === 'hospitals' || page === 'medical-groups' || page === 'ambulatory-surgery-centers') ? 521 : 440}`}
                                        height={`${(page === 'hospitals' || page === 'medical-groups' || page === 'ambulatory-surgery-centers') ? 428 : 390}`}
                                        placeholder="blur"
                                        blurDataURL={blurImageUrl}
                                        className="object-contain rounded-[24px] w-full h-full"
                                        sizes="
                                        (min-width: 1536px) 20vw,
                                        (min-width: 1280px) 25vw,
                                        (min-width: 1024px) 33vw,
                                        (min-width: 640px) 50vw,
                                        100vw
                                        "
                                    />
                                )}
                                <h4 className={`sm:text-2xl text-xl text-[#171717]  leading-[120%] sm:min-h-[70px] sm:max-w-[270px] font-gilroy-medium my-4 pb-3  w-full ${page !== 'hospitals' && 'sm:max-w-[200px]'} border-b border-[#EFEFEF]`}>
                                    {item.title}
                                </h4>
                                <p className="text-base leading-[140%] text-[#5C5C5C] font3">{item.description}</p>
                            </div>
                        );
                    })}
                </div>

                {(page === 'hospitals' || page === 'medical-groups' || page === 'ambulatory-surgery-centers') && careItems.length > 4 && (
                    <div className="flex text-center mx-auto">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="text-white inline-flex items-center text-center bg-[#335CFF] rounded-xl cursor-pointer px-4 py-3 mt-16 mx-auto"
                        >
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HowSteerHelpscareProviders;
