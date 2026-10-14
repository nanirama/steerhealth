import React from "react";
import Image from "next/image";
import ImageComponent from "../Elements/ImageComponent";
import ButtonComponent from "../Elements/ButtonComponent";
import EventPDFButton from '../Elements/EventPDFButton';
import { urlForImage } from "@/sanity/lib/utils";


const CtaSection = ({ data, page }: any) => {
    const imageUrl = data?.image &&
        urlForImage(data?.image)
            ?.height(660)
            .width(1660)
            .format("webp")
            .auto("format")
            .fit("max")
            .url();

    console.log('pagepage', page)
    return (
        <>
            <div className="w-full">
                <div className={`w-full sm:pt-18 pt-8 relative ${page === 'p2p-landingpage' ? 'bg-gradient-to-r from-[#368b6c] via-[#347756] to-[#356a50]' : 'bg-[#2D66EC]  ctabg'} `}>
                    <div className="max-w-7xl px-4 mx-auto">
                        <div className="flex flex-col md:gap-4 gap-1 sm:py-12 py-4 z-10 relative mx-auto ">
                        {data?.kickerText && <p className="sm:text-base text-xs font-medium leading-[110%] uppercase text-center  text-[#fff]  tracking-[0.06em]">{data?.kickerText}</p>}
                            {data?.heading && (
                                <h2
                                    className={`text-center  text-[#fff] md:leading-[100%] leading-[120%] m-0 p-0 mx-auto 
      ${page === "home" ? "font4 !font-normal  md:!text-[60px] sm:text-[40px] !text-[30px]" : "font-semibold font2 md:!text-[60px] sm:text-[40px] !text-[30px]"} 
      ${page === "p2p-landingpage" ? "md:max-w-[900px]" : "md:max-w-[800px]"}`}
                                >
                                    {data?.heading}
                                </h2>
                            )}
                            {data?.subheading && (
                                <h3
                                    className={`text-center md:text-[60px] text-[30px] font-semibold font2 m-0 p-0
                                    ${(page === "hospitals" || page === "beckers-asc")
                                            ? "text-white md:leading-[60%] font4 !font-normal py-2"
                                            : "text-white/50 md:leading-[60%] leading-normal"
                                        }`}
                                >
                                    {data?.subheading}
                                </h3>
                            )}
                            {data?.description && (
                                <p className="text-center md:text-[20px] text-base text-[#ffffff] leading-[28px] font3 max-w-xl mx-auto">{data?.description}</p>
                            )}
                            {data?.stats && (
                                <div className="md:max-w-[900px] mx-auto flex md:flex-row flex-col grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start justify-center gap-10 my-6">
                                    {data?.stats.map((item: any, index: number) => {
                                        return (
                                            <div className="flex flex-col" key={index}>
                                                <p className="text-white text-center sm:text-[48px] text-[42px] font-space-grotesk-regular leading-[100%]">{item?.value}{item?.suffix}</p>
                                                <p className="md:text-2xl sm:text-xl text-base leading-[140%] text-white font-interdisplay-light text-center max-w-xs mx-auto">{item?.label}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}

                            <div className="flex flex-row sm:gap-4 gap-3 justify-center sm:mt-4 mt-3 items-center">

                                {data?.ctaButtonPrimary && data?.ctaButtonPrimary?.buttontext && <ButtonComponent button={data?.ctaButtonPrimary} />}
                                {page === 'beckers-asc' ? (
                                    <EventPDFButton buttontext={data?.ctaButtonSecondary?.buttontext} />
                                ) : (
                                    <>
                                        {data?.ctaButtonSecondary?.buttontext && (
                                            <ButtonComponent button={data?.ctaButtonSecondary} />
                                        )}
                                    </>
                                )}
                                {/* {data?.ctaButtonSecondary && data?.ctaButtonSecondary?.buttontext && <ButtonComponent button={data?.ctaButtonSecondary} />} */}

                            </div>
                        </div>
                        {(page === 'p2p-landingpage' || page === 'beckers-asc' || page === 'steernotes') ? (
                            <div className="mx-auto text-center flex justify-center mt-6">
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt="Client"
                                        width={830}
                                        height={330}
                                        sizes="
                                                      (min-width: 1280px) 800px,
                                                      (min-width: 1024px) 700px,
                                                       (min-width: 768px) 600px,
                                                         100vw "
                                        className="z-5 w-[65%]"
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="mx-auto text-center flex justify-center sm:mt-6 mt-3">
                                {data?.imageUrl && (
                                    <ImageComponent
                                        src={`${data?.imageUrl}`}
                                        alt="CTA"
                                        width={830}
                                        height={330}
                                        className="z-20 sm:w-[65%] w-[380px] max-w-full md:ml-0 ml-12"
                                        sizes="
                    (min-width: 1280px) 830px,
                    (min-width: 1024px) 700px,
                    (min-width: 768px) 600px,
                    100vw
                "
                                    />
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}
export default CtaSection