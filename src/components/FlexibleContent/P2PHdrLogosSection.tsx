import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";

const P2PHdrLogosSection = ({ data }: any) => {
    const { logos } = data;

    return (
        <>
            <div className="w-full py-6 bg-white ">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex md:flex-row flex-col items-center justify-center md:gap-6 gap-4">

                        {logos && logos.map((item: any, index: number) => {
                            const imageurl = item.image &&
                                urlForImage(item.image)
                                    ?.width(500)
                                    .auto("format")
                                    .fit("max")
                                    .url();
                            return (
                                <div
                                    key={index}
                                    className="flex  items-center justify-center"
                                >
                                    {imageurl && (
                                        <div className="relative">
                                            <Image
                                                src={imageurl}
                                                alt="Client logo"
                                                width={item?.imageWidth}
                                                height={item?.imageHeight}
                                                className="object-contain text-center m-auto max-h-[50px] max-w-[240px]"
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}
export default P2PHdrLogosSection