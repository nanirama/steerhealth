import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

const ClientLogos = ({ data, page }: any) => {
    const { clientLogos,heading } = data;
    console.log('page', page)
    return (
        <>
            <div className={`w-full sm:py-12 py-6 bg-white`}>
                <div className="max-w-7xl mx-auto px-4">
                    {heading && <h2 className="text-[#171717] md:text-[54px] tracking-[-2px] text-[30px] text-center mx-auto leading-[100%] font-gilroy-semibold pt-2 mb-12">{heading}</h2>}

                    {(page === 'functional-medicine' || page ==='hospitals' || page ==='ambulatory-surgery-centers' || page ==='medical-groups' || page ==='p2p-landingpage') ? (
                        <div className={`xl:grid md:grid-cols-3 px-4 sm:flex flex-wrap sm:place-items-center items-center grid grid-cols-2 md:gap-6 gap-10  xl:justifty-between justify-center ${(page === 'functional-medicine' || page === 'p2p-landingpage')? 'lg:grid-cols-6 gap-6  xl:gap-12' : 'xl:grid-cols-7 gap-4 xl:gap-8'} `}>
                            {clientLogos && clientLogos.map((item: any, index: number) => {
                                const logoUrl = item &&
                                    urlForImage(item)
                                        ?.width(320)
                                        .auto("format")
                                        .fit("max")
                                        .url();
                                return (
                                    <div
                                        key={index}
                                        className="w-auto flex items-center justify-center"
                                    >
                                        {logoUrl && (
                                            <Image
                                                src={logoUrl}
                                                alt="Client logo"
                                                height={38}
                                                width={180} // max possible width, won't stretch smaller logos
                                                className="sm:max-h-[38px] sm:max-w-[180px] max-w-full object-contain"
                                            />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-centger xl:gap-6 lg:gap-6 gap-4">
                            {clientLogos && clientLogos.map((item: any, index: number) => {
                                const logoUrl = item &&
                                    urlForImage(item)
                                        ?.width(330)
                                        .auto("format")
                                        .fit("max")
                                        .url();
                                return (
                                    <div className="h-[50px] w-auto flex items-center justify-center" key={index}>
                                        {logoUrl && (
                                            <Image
                                                src={logoUrl}
                                                alt="Trusted_img Image"
                                                width={110}
                                                height={50}
                                                className="max-h-[50px] max-w-[110px] object-contain"
                                                sizes="(min-width: 768px) 100px, 100vw"
                                            />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default ClientLogos