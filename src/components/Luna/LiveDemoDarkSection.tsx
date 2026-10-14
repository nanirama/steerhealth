import React from "react";
import LazyVideo from "../Elements/LazyVideo";
import LunaButton from './LunaButton'
const LiveDemoDarkSection = () => {
    return (
        <>
            <section className="relative xl:w-full w-[97%] !bg-white xl:mx-auto mx-4 mb-10">
                <div className="max-w-[1920px] mx-auto">
                    {/* <LazyVideo
                        className="absolute inset-0 w-full h-full object-cover rounded-[24px] max-w-[1920px] mx-auto"
                        srcWebm="luna-landing-demp-footer.webm"
                        srcMp4="luna-landing-demp-footer.mp4"
                        width={1320}
                        height={550}
                        poster="/images/luna-hero.webp"
                    /> */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover rounded-[24px] max-w-[1920px] mx-auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        poster="/images/luna-hero.webp"
                    >
                        <source src="/videos/luna-landing-demp-footer.webm" type="video/webm" />
                        <source src="/videos/luna-landing-demp-footer.mp4" type="video/mp4" />
                    </video>
                </div>
                {/* <div className="bg-black/49 inset-0 absolute w-full h-full rounded-[24px]"></div> */}
                <div className="relative z-10 mx-auto md:py-20 py-8 md:px-12 px-6 text-center">
                    <div className="max-w-7xl mx-auto px-4 text-center flex justify-center items-center flex-col">
                        <h5 className="border border-[#2160FD] text-[#2160FD] text-base mx-auto inline-flex flex-row gap-2 items-center rounded-full py-1 px-3"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.80594 3.41944C9.82291 3.35599 9.85222 3.2965 9.89219 3.24437C9.93217 3.19225 9.98202 3.14851 10.0389 3.11566C10.0958 3.08281 10.1586 3.06149 10.2237 3.05291C10.2888 3.04434 10.355 3.04868 10.4185 3.06569C11.3454 3.30753 12.1911 3.79209 12.8685 4.46946C13.5458 5.14683 14.0304 5.99253 14.2722 6.91944C14.2892 6.98289 14.2936 7.04906 14.285 7.11418C14.2764 7.17931 14.2551 7.2421 14.2223 7.29899C14.1894 7.35587 14.1457 7.40572 14.0935 7.44569C14.0414 7.48566 13.9819 7.51497 13.9185 7.53194C13.8763 7.54305 13.8328 7.54873 13.7891 7.54882C13.6789 7.54881 13.5718 7.51242 13.4845 7.44528C13.3971 7.37814 13.3344 7.28403 13.306 7.17757C13.1087 6.42089 12.7133 5.73051 12.1603 5.17758C11.6074 4.62465 10.917 4.22918 10.1603 4.03194C10.0968 4.01504 10.0372 3.98577 9.98506 3.94583C9.93286 3.90589 9.88906 3.85605 9.85614 3.79916C9.82323 3.74227 9.80185 3.67945 9.79324 3.6143C9.78463 3.54914 9.78894 3.48293 9.80594 3.41944ZM9.66032 6.03194C10.5222 6.26194 11.076 6.81569 11.306 7.67757C11.3344 7.78403 11.3971 7.87814 11.4845 7.94528C11.5718 8.01242 11.6789 8.04881 11.7891 8.04882C11.8328 8.04873 11.8763 8.04305 11.9185 8.03194C11.9819 8.01497 12.0414 7.98566 12.0935 7.94569C12.1457 7.90572 12.1894 7.85587 12.2223 7.79899C12.2551 7.7421 12.2764 7.67931 12.285 7.61418C12.2936 7.54906 12.2892 7.48289 12.2722 7.41944C11.9522 6.22194 11.116 5.38569 9.91844 5.06569C9.79031 5.03146 9.65383 5.04953 9.53902 5.11593C9.42421 5.18233 9.34048 5.29162 9.30625 5.41975C9.27202 5.54789 9.2901 5.68437 9.3565 5.79918C9.4229 5.91398 9.53218 5.99771 9.66032 6.03194ZM14.7816 11.9913C14.6702 12.8382 14.2542 13.6156 13.6115 14.1782C12.9688 14.7409 12.1433 15.0503 11.2891 15.0488C6.32657 15.0488 2.28907 11.0113 2.28907 6.04882C2.28753 5.19462 2.597 4.36908 3.15965 3.72638C3.7223 3.08367 4.49967 2.66776 5.34657 2.55632C5.56072 2.53017 5.7776 2.57398 5.96481 2.68121C6.15202 2.78845 6.29953 2.95336 6.38532 3.15132L7.70532 6.09819V6.10569C7.771 6.25722 7.79812 6.42267 7.78427 6.58724C7.77042 6.75181 7.71602 6.91039 7.62594 7.04882C7.61469 7.06569 7.60282 7.08132 7.59032 7.09694L6.28907 8.63944C6.75719 9.59069 7.75219 10.5769 8.71594 11.0463L10.2372 9.75194C10.2521 9.73937 10.2678 9.72768 10.2841 9.71694C10.4224 9.62469 10.5815 9.56838 10.7471 9.5531C10.9126 9.53783 11.0794 9.56406 11.2322 9.62944L11.2404 9.63319L14.1847 10.9525C14.383 11.038 14.5483 11.1854 14.6559 11.3726C14.7635 11.5599 14.8076 11.7769 14.7816 11.9913ZM13.7891 11.8663H13.7822L10.8447 10.5507L9.32282 11.845C9.30809 11.8576 9.29265 11.8693 9.27657 11.88C9.13266 11.976 8.96632 12.0331 8.79378 12.0456C8.62124 12.0581 8.44842 12.0256 8.29219 11.9513C7.12157 11.3857 5.95469 10.2276 5.38844 9.06944C5.31346 8.91435 5.27981 8.74252 5.29076 8.5706C5.30171 8.39869 5.35689 8.23251 5.45094 8.08819C5.46151 8.07123 5.47343 8.05513 5.48657 8.04007L6.78907 6.49569L5.47657 3.55819C5.47632 3.5557 5.47632 3.55318 5.47657 3.55069C4.87047 3.62975 4.31399 3.92704 3.91132 4.38689C3.50866 4.84673 3.28743 5.43759 3.28907 6.04882C3.29138 8.16984 4.13498 10.2033 5.63477 11.7031C7.13456 13.2029 9.16804 14.0465 11.2891 14.0488C11.9 14.0509 12.4907 13.8304 12.9508 13.4286C13.4109 13.0269 13.7089 12.4718 13.7891 11.8663Z" fill="#2160FD" />
                        </svg> Live Demo</h5>
                        <div className="relative w-full my-5">
                            <h2 className="relative z-30 lg:text-[72px] md:text-[60px] sm:text-[48px] text-[30px] text-black font-semibold" >
                                <span className="before:absolute before:inset-0 before:bg-[url('/images/luna/try-dark-img.webp')] before:bg-size-[90%] before:-z-1 before:bg-center before:bg-no-repeat"></span>
                                {/* <span className="before:absolute before:inset-0 before:bg-[url('/images/luna/blur-dark-img.webp')] before:-z-1 before:bg-center before:bg-no-repeat before:bg-size-[60%] w-[20%]"></span> */}
                                <span className="livedemo_blur relative"></span>
                                <span className="z-40 relative lg:text-[72px] md:text-[60px] sm:text-[48px] text-[36px] font-semibold text-white">Try it yourself.</span>
                            </h2>
                        </div>
                        <h3 className="text-base text-[#787F83] max-w-md font-normal leading-[22px] mx-auto text-center">Experience firsthand what your patients will encounter when they interact with your AI-powered front desk.</h3>
                        <div className="inline-flex sm:flex-row flex-col gap-4 mx-auto my-8">
                            {/* <button className="inline-flex transition-all duration-200 bg-[#335CFF] cursor-pointer group relative flex-row gap-2 items-center justify-between leading-[24px] text-white font-medium rounded-[8px] py-3 md:px-4 px-2 text-sm">Call Luna <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></button>
                            <button className="transition-all duration-200 border border-[#335CFF] bg-white cursor-pointer leading-[24px] text-[#171717] font-medium rounded-[8px] py-3 md:px-4 px-2 text-sm">Receive Call</button> */}
                            <LunaButton
                            className="inline-flex transition-all duration-200 bg-[#335CFF] cursor-pointer group relative flex-row gap-2 items-center justify-between leading-[24px] text-white font-medium rounded-[8px] py-3 md:px-4 px-2 text-sm">
                            Try Luna <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </LunaButton>
                        </div>
                        <h4 className="text-white text-base">Which scenario would you like to experience?</h4>
                        <div className="flex flex-row flex-wrap gap-4 items-center justify-center my-8">
                            <button aria-label="Call Luna" className="inline-flex transition-all duration-200 bg-transparent border border-[#fff]/50 cursor-pointer group relative flex-row gap-2 items-center justify-between leading-[24px] text-white font-medium rounded-[12px] py-3 md:px-4 px-2 text-base">Front-Desk Automation</button>
                            <button aria-label="Receive Call" className="inline-flex transition-all duration-200 cursor-pointer border border-[#fff]/50 relative flex-row gap-2 items-center justify-between leading-[24px] text-white font-medium rounded-[12px] py-3 md:px-4 px-2 text-base">Scheduling & Intake</button>
                            <button aria-label="Receive Call" className="inline-flex transition-all duration-200 cursor-pointer border border-[#fff]/50 relative flex-row gap-2 items-center justify-between leading-[24px] text-white font-medium rounded-[12px] py-3 md:px-4 px-2 text-base">Prescription Requests</button>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
export default LiveDemoDarkSection