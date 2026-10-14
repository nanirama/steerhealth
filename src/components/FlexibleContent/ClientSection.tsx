import React from "react";
import ImageComponent from "../Elements/ImageComponent";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";

const ClientSection = ({ data }: any) => {
    const { clientLogos, clientlogos } = data;
    const logos = [
        "hdr-dd-clnt-1.webp",
        "hdr-dd-clnt-2.webp",
        "hdr-dd-clnt-3.webp",
        "hdr-dd-clnt-4.webp",
        "hdr-dd-clnt-5.webp",
        "hdr-dd-clnt-6.webp",
        "hdr-dd-clnt-8.webp",
        "hdr-dd-clnt-9.webp",
    ];
    return (
        <>
            <div className="w-full md:py-12 py-6 bg-white ">
                <div className="max-w-7xl mx-auto px-4">
                    {data?.heading && (
                        <h2 className="lg:text-lg text-xl leading-[24px] font3 text-[#535862] text-center">{data?.heading}</h2>
                    )}
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 md:my-12 my-8 ">

                        {clientlogos && clientlogos.map((item: any, index: number) => {
                            const imageurl = item.image &&
                                urlForImage(item.image)
                                    ?.width(196)
                                    .auto("format")
                                    .fit("max")
                                    .url();
                            return (
                                <div
                                    key={index}
                                    className="flex items-center justify-center bg-[#FAFAFA] px-16 py-10 rounded-sm"
                                >
                                    {imageurl && (
                                        <Link href={item.link} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src={imageurl}
                                            alt="Client logo"
                                            height={26}
                                            width={196}
                                            className="object-contain text-center m-auto"
                                        />
                                        </Link>
                                    )}
                                </div>
                            )
                        })}
                        

                        {/* {logos && logos.map((item: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="flex items-center justify-center bg-[#FAFAFA] px-16 py-10 rounded-sm"
                                >
                                    <div className="relative">
                                    <ImageComponent
                                        src={`${item}`}
                                        alt="Trusted_img Image"
                                        width={196}
                                        height={26}
                                        className=""
                                        sizes="(max-width: 768px) 100vw"
                                    />
                                    </div>
                                </div>
                            )
                        })} */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ClientSection