import React from "react";
import Image from "next/image";
import ButtonComponent from "../../Elements/ButtonComponent";
import { urlForImage } from "@/sanity/lib/utils";

const ElevateCtaSection = ({ data, page }: any) => {
    const imageUrl = data?.image &&
        urlForImage(data?.image)
            ?.height(1000)
            .width(1920)
            .format("webp")
            .auto("format")
            .fit("max")
            .url();


    return (
        <>
            <div className="w-full">
                <div className={`w-full  relative elevate_cta`}>
                    <div className="mx-auto text-center flex justify-center">
                        <Image src={'/images/cta-image.webp'} width={1440} height={731} alt="CTA" className="w-full max-w-full" />
                    </div>
                    <div className="absolute lg:top-12 md:top-6 sm:top-4 top-0 right-0 left-0 mx-auto max-w-7xl sm:px-4 px-2 z-20 ">

                        <div className="flex flex-col md:gap-4 gap-1 xl:py-12 py-4 z-10 relative mx-auto ">
                            <div className="flex flex-row sm:gap-4 gap-3 justify-end md:items-center items-start">

                                {data?.ctaButtonPrimary && data?.ctaButtonPrimary?.buttontext && <ButtonComponent button={data?.ctaButtonPrimary} />}
                                {data?.ctaButtonSecondary && data?.ctaButtonSecondary?.buttontext && <ButtonComponent button={data?.ctaButtonSecondary} />}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default ElevateCtaSection