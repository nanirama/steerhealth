import React from "react";
import ImageComponent from "@/components/Elements/ImageComponent";
import Link from "next/link";


const EventCtaSection = () => {

    return (
        <>
            <div className="w-full">
                <div className={`w-full sm:pt-18 pt-8 relative bg-[#2D66EC]  ctabg `}>
                    <div className="max-w-7xl px-4 mx-auto">
                        <div className="flex flex-col md:gap-4 gap-1 sm:py-12 py-4 z-10 relative ">

                            <p className="text-center md:text-[24px] text-base text-white/95 leading-[140%] font3 max-w-xl mx-auto">Nov 3-6, 2025 in Chicago. Booth #808</p>


                            <h2
                                className={`text-center tracking-[-0.02em] text-[#fff] md:leading-[100%] leading-[120%] m-0 p-0 mx-auto font-gilroy-semibold md:!text-[60px] sm:text-[40px] !text-[30px]`}
                            >
                                Want Your 90-Day <br />Margin & Capacity Plan?
                            </h2>


                            <div className="flex flex-row sm:gap-4 gap-3 justify-center sm:mt-4 mt-3 items-center">

                                <Link
                                    href="https://steerhealth.io/contact-us"
                                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                >
                                    Book a demo
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="mx-auto text-center flex justify-center sm:mt-6 mt-3">
                            <ImageComponent
                                src={`cta-img.webp`}
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
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default EventCtaSection