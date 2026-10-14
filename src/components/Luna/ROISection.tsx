import React from "react";
import LazyVideo from "../Elements/LazyVideo";

const ROISection = () => {
    return (
        <>
            <section className="relative xl:w-full w-[97%] !bg-white xl:mx-auto mx-4">
                <div className="max-w-[1620px] w-full mx-auto !px-4">
                    {/* <LazyVideo
                        className="absolute inset-0 w-full h-full object-cover rounded-[24px] max-w-[1920px] mx-auto"
                        srcWebm="luna-landing-demo.webm"
                        srcMp4="luna-landing-demo.mp4"
                        width={1320}
                        height={550}
                        poster="/images/luna-hero.webp"
                    /> */}
                        <video
                            className="absolute inset-0 w-full h-full object-cover rounded-[24px] xl:max-w-[1620px] mx-auto"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="none"
                            poster="/images/luna-hero.webp"
                        >
                            <source src="/videos/luna-landing-demo.webm" type="video/webm" />
                            <source src="/videos/luna-landing-demo.mp4" type="video/mp4" />
                        </video>
                </div>
                {/* <div className="bg-black/49 inset-0 absolute w-full h-full rounded-[24px]"></div> */}
                <div className="relative z-10 max-w-[1620px] mx-auto md:py-20 py-8 md:px-12 px-6 text-center">
                    {/* <div className="w-full mx-auto md:px-12 px-6 z-10 text-center"> */}
                    <div className="">
                        <h5 className="border border-white text-white text-base mx-auto inline-flex flex-row gap-2 items-center rounded-full py-1 px-3"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16667 4.16632C9.16667 4.34313 9.09643 4.5127 8.9714 4.63772C8.84638 4.76275 8.67681 4.83299 8.5 4.83299C8.32319 4.83299 8.15362 4.76275 8.0286 4.63772C7.90357 4.5127 7.83333 4.34313 7.83333 4.16632C7.83333 3.98951 7.90357 3.81994 8.0286 3.69491C8.15362 3.56989 8.32319 3.49965 8.5 3.49965C8.67681 3.49965 8.84638 3.56989 8.9714 3.69491C9.09643 3.81994 9.16667 3.98951 9.16667 4.16632ZM9.188 1.54965C8.98826 1.4038 8.74733 1.3252 8.5 1.3252C8.25267 1.3252 8.01174 1.4038 7.812 1.54965L2.86467 5.15965C2.21267 5.63499 2.54933 6.66632 3.35533 6.66632H3.5V10.533C3.19896 10.6866 2.94625 10.9205 2.76977 11.2087C2.5933 11.497 2.49994 11.8284 2.5 12.1664V13.1664C2.5 13.4417 2.724 13.6664 3 13.6664H14C14.1326 13.6664 14.2598 13.6137 14.3536 13.5199C14.4473 13.4261 14.5 13.299 14.5 13.1664V12.1664C14.5001 11.8284 14.4067 11.497 14.2302 11.2087C14.0538 10.9205 13.801 10.6866 13.5 10.533V6.66632H13.6447C14.4513 6.66632 14.7867 5.63499 14.1353 5.15965L9.188 1.54965ZM8.40133 2.35699C8.42988 2.33613 8.46431 2.32489 8.49967 2.32489C8.53502 2.32489 8.56946 2.33613 8.598 2.35699L13.1333 5.66632H3.86667L8.40133 2.35699ZM12.5 6.66632V10.333H11.1667V6.66632H12.5ZM10.1667 6.66632V10.333H9V6.66632H10.1667ZM8 6.66632V10.333H6.83333V6.66632H8ZM4.33333 11.333H12.6667C13.1267 11.333 13.5 11.7064 13.5 12.1664V12.6664H3.5V12.1664C3.5 11.7064 3.87333 11.333 4.33333 11.333ZM4.5 10.333V6.66632H5.83333V10.333H4.5Z" fill="white" />
                        </svg>ROI</h5>
                        <h3 className="text-white md:text-[40px] text-[30px] font2 font-semibold pt-10">Total ROI</h3>
                        <h4 className="text-white lg:text-[96px] sm:text-[72px] text-[60px] leading-[92px] font2 font-semibold">$6.5M</h4>
                    </div>
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-10 gap-4 lg:mt-20 mt-10">
                        <div className="px-5 py-6 flex flex-col gap-3 backdrop-blur-md border border-white/40 bg-gradient-to-br from-white/30 via-white/15 to-white/10 transition-all rounded-[16px] w-full">
                            <h4 className="lg:text-[70px] md:text-[60px] text-[48px] font-bold text-white font2">$4.2M/ <span className="text-2xl">Year</span></h4>
                            <p className="text-white text-[15px] font-medium">Recovered from Abandoned Calls</p>
                        </div>
                        <div className="px-5 py-6 flex flex-col gap-3 backdrop-blur-md border border-white/40 bg-gradient-to-br from-white/30 via-white/15 to-white/10 transition-all rounded-[16px] w-full">
                            <h4 className="lg:text-[70px] md:text-[60px] text-[48px] font-bold text-white font2">500K/ <span className="text-2xl">Year</span></h4>
                            <p className="text-white text-[15px] font-medium">Operational Cost Savings</p>
                        </div>
                        <div className="px-5 py-6 flex flex-col gap-3 backdrop-blur-md border border-white/40 bg-gradient-to-br from-white/30 via-white/15 to-white/10 transition-all rounded-[16px] w-full">
                            <h4 className="lg:text-[70px] md:text-[60px] text-[48px] font-bold text-white font2">$1.5M/ <span className="text-2xl">Year</span></h4>
                            <p className="text-white text-[15px] font-medium">Additional Revenue from Bookings</p>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
export default ROISection