import React from "react";
import Image from "next/image";
import Link from "next/link";
import SolutionImg from "../../../public/images/luna/solutions-img.webp"
import SolutionLogo from "../../../public/images/luna/tstmnl-client1.webp"

const SolutionSection = () => {
    return (
        <>
            <div className="bg-white mx-auto p-4">
                <div className="md:max-w-[1400px] mx-auto w-full lg:py-20 py-10 border border-black/10 rounded-[24px] shadow-[0px_0px_20px_0px_#0000000D]">
                    <div className="max-w-7xl mx-auto px-4">
                        <h5 className="border border-[#2160FD] text-[#2160FD] text-base mx-auto inline-flex flex-row gap-2 items-center rounded-full py-1 px-3"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.99992 0.333008C6.26453 0.332998 6.5041 0.489498 6.61042 0.731808L7.94172 3.76593L11.0825 4.15774C11.3368 4.18947 11.5505 4.36425 11.632 4.60729C11.7135 4.85033 11.6485 5.11858 11.4647 5.29728L9.1216 7.57517L9.7452 10.8754C9.7938 11.1325 9.6876 11.3941 9.4736 11.5446C9.2597 11.695 8.9775 11.7064 8.752 11.5738L5.99999 9.95416L3.2479 11.5742C3.02248 11.7069 2.74028 11.6955 2.52629 11.5451C2.3123 11.3947 2.20606 11.133 2.25463 10.8759L2.87824 7.57559L0.53513 5.29668C0.35138 5.11797 0.28636 4.84973 0.3679 4.60672C0.44943 4.36371 0.66307 4.18896 0.91742 4.15723L4.05861 3.76542L5.38944 0.731848C5.49574 0.489528 5.7353 0.333018 5.99992 0.333008ZM5.99999 2.659L5.12745 4.64791C5.0331 4.86299 4.83253 5.01255 4.59947 5.04162L2.45967 5.30853L4.06464 6.86951C4.22497 7.02546 4.29643 7.25142 4.2549 7.4712L3.83755 9.67986L5.66174 8.60606C5.87044 8.48326 6.12935 8.48316 6.33806 8.60606L8.1624 9.67966L7.74498 7.47069C7.70344 7.25087 7.77493 7.02486 7.93534 6.86892L9.5399 5.30897L7.40087 5.04212C7.16783 5.01305 6.96728 4.86351 6.87292 4.64845L5.99999 2.659Z" fill="#2160FD" />
                        </svg> Solutions</h5>
                        <h2 className="lg:text-[72px] md:text-[60px] sm:text-[48px] text-[30px] py-5 bg-[linear-gradient(90deg,_#000000_0%,_#666666_100%)] bg-clip-text text-transparent font-semibold font2 tracking-tighter leading-[110%]">Streamline every patient <span className="bg-[linear-gradient(90deg,_#6FCAFF_0%,_#3591FA_28.42%,_#0030A6_56.83%)] bg-clip-text text-transparent">touchpoint.</span></h2>
                        <div className="flex flex-row gap-4 items-center flex-wrap">
                            <button aria-label="Call Luna" className="inline-flex transition-all duration-200 bg-[#335CFF] cursor-pointer group relative flex-row gap-2 items-center justify-between leading-[24px] text-white font-medium rounded-[12px] py-3 md:px-4 px-2 text-base">Front-Desk Automation</button>
                            <button aria-label="Call Luna" className="inline-flex transition-all duration-200 cursor-pointer border border-[#53585A80]/50 relative flex-row gap-2 items-center justify-between leading-[24px] text-[#53585A] font-medium rounded-[12px] py-3 md:px-4 px-2 text-base">Scheduling & Intake</button>
                            <button aria-label="Call Luna" className="inline-flex transition-all duration-200 cursor-pointer border border-[#53585A80]/50 relative flex-row gap-2 items-center justify-between leading-[24px] text-[#53585A] font-medium rounded-[12px] py-3 md:px-4 px-2 text-base">Prescription Requests</button>
                        </div>
                        <div className="my-16">
                            <Image src={SolutionImg} alt="SolutionImg" />
                        </div>
                        <div className="">
                            <h3 className="flex flex-row gap-3 items-center font-medium text-[23px] text-[#53585A]"><svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="0.459961" width="32" height="32" rx="8" fill="#2160FD" />
                                <g clipPath="url(#clip0_16065_1181)">
                                    <path d="M17.4953 26.9834H15.3863C15.3922 26.9834 15.3973 26.9838 15.4033 26.9838C15.4342 26.9851 15.4651 26.986 15.4965 26.9868C15.5804 26.9894 15.6656 26.9916 15.7517 26.9933C15.7915 26.9941 15.8313 26.995 15.8716 26.9954C15.8915 26.9954 15.9119 26.9963 15.9322 26.9963C15.9526 26.9967 15.9725 26.9967 15.9928 26.9971C16.0335 26.9976 16.0738 26.998 16.1149 26.9984C16.1581 26.9984 16.2018 26.9993 16.2459 26.9993C16.2997 26.9997 16.3531 26.9997 16.4069 26.9997C16.4993 26.9997 16.5913 26.9993 16.6833 26.9989C16.7265 26.9989 16.7697 26.9989 16.813 26.9976C16.8778 26.9967 16.9422 26.9959 17.0062 26.995C17.0707 26.9937 17.1342 26.9929 17.1974 26.9916C17.2287 26.9907 17.2601 26.9898 17.2915 26.9894C17.3228 26.9886 17.3538 26.9877 17.3847 26.9868C17.422 26.9855 17.4589 26.9847 17.4953 26.9834Z" fill="white" />
                                    <path d="M7.99344 16.0536C8.05447 15.0344 6.83211 14.6331 6.33071 13.9396C5.97426 13.4472 5.90687 12.825 6.14253 12.2612C6.73675 11.2484 7.26358 10.1841 7.879 9.18509C8.1439 8.7554 8.35243 8.42755 8.84451 8.23677C10.0787 7.75723 10.9535 8.95993 11.9746 8.6643C13.1846 8.31368 12.771 6.80419 13.2418 5.92634C13.4648 5.5104 14.0009 5.11122 14.4693 5.05063C15.7018 4.89122 17.2628 5.17009 18.5301 5.05063C19.0438 5.18126 19.5236 5.46442 19.7753 5.95126C20.2255 6.82223 19.8181 8.31454 21.0248 8.6643C22.0459 8.95993 22.9215 7.75723 24.1553 8.23677C24.6537 8.43055 24.8512 8.75067 25.1204 9.18509C25.6252 9.99977 26.5076 11.4134 26.8569 12.2612C27.0921 12.8314 27.0302 13.4403 26.6687 13.9396C26.2372 14.5364 25.2908 14.8982 25.0738 15.6197C24.6355 17.0754 26.6013 17.3693 26.9272 18.5604C27.0781 19.1113 26.9836 19.4692 26.7433 19.9578C26.3059 20.8494 25.6459 21.9532 25.1204 22.8066C24.864 23.2225 24.6779 23.5246 24.2134 23.7283C22.9605 24.2774 22.095 23.0485 21.0596 23.3192C19.969 23.6045 20.1458 24.8107 19.9139 25.6675C19.7126 26.4104 19.101 26.8895 18.3415 26.9428C18.2762 26.9475 18.208 26.9518 18.1372 26.9557C18.1194 26.957 18.1016 26.9578 18.0838 26.9587C18.0541 26.9604 18.024 26.9621 17.9935 26.9638C17.871 26.9699 17.7426 26.9754 17.6099 26.9797C17.5815 26.981 17.5527 26.9815 17.5239 26.9827C17.5192 26.9827 17.515 26.9832 17.5103 26.9832C17.5061 26.9832 17.5014 26.9836 17.4972 26.9836H17.4951C17.4586 26.9849 17.4218 26.9858 17.3845 26.987C17.3535 26.9879 17.3226 26.9888 17.2912 26.9896C17.2598 26.99 17.2285 26.9909 17.1971 26.9918C17.134 26.9931 17.0704 26.9939 17.006 26.9952C16.942 26.9961 16.8775 26.9969 16.8127 26.9978C16.7695 26.9986 16.7262 26.9991 16.683 26.9991C16.591 26.9995 16.4991 26.9999 16.4067 26.9999H16.3054C16.2854 26.9999 16.2655 26.9999 16.2456 26.9995C16.2015 26.9995 16.1579 26.9991 16.1146 26.9986C16.0735 26.9982 16.0333 26.9978 15.9926 26.9974C15.9722 26.9969 15.9523 26.9969 15.932 26.9965C15.9116 26.9965 15.8913 26.9961 15.8713 26.9956C15.8311 26.9952 15.7912 26.9943 15.7514 26.9935C15.6654 26.9918 15.5802 26.9896 15.4963 26.987C15.4649 26.9862 15.4339 26.9853 15.403 26.984C15.3971 26.984 15.392 26.9836 15.3861 26.9836H15.3801C15.3297 26.9819 15.2797 26.9797 15.2309 26.978C15.2241 26.9776 15.2174 26.9772 15.211 26.9772C15.1868 26.9763 15.1627 26.975 15.1394 26.9741C15.0728 26.9711 15.0076 26.9677 14.9444 26.9643C14.9245 26.963 14.905 26.9621 14.8855 26.9608C14.8512 26.9587 14.8173 26.9565 14.7842 26.9548C14.7439 26.9518 14.7045 26.9492 14.6659 26.9462C14.649 26.9449 14.6325 26.9436 14.6159 26.9424C13.9492 26.8895 13.372 26.4654 13.1376 25.829C12.8273 24.9877 13.096 23.7102 12.0394 23.3476C10.9023 22.9574 9.89436 24.4772 8.53341 23.599C8.24223 23.4112 8.05744 23.0962 7.879 22.8066C7.35428 21.955 6.69267 20.8472 6.25612 19.9578C6.1599 19.7618 6.05055 19.5625 6.02046 19.3412C5.76997 17.4978 7.91206 17.4196 7.99344 16.0536ZM9.43958 22.1496C10.133 21.9855 10.759 21.582 11.4876 21.5545C12.5484 21.5145 13.6347 22.117 14.165 23.0374C14.5579 23.7188 14.5778 24.4716 14.7274 25.2262L18.2504 25.2335C18.4017 24.7449 18.4034 24.2164 18.542 23.7249C18.9022 22.447 20.1466 21.5175 21.4715 21.5519C22.2167 21.5717 22.8537 21.9795 23.5598 22.1496L25.295 19.058C24.7237 18.5454 24.0553 18.1338 23.6831 17.4355C23.2491 16.6204 23.2042 15.6691 23.556 14.8123C23.8874 14.0053 24.6075 13.506 25.2586 12.9835L25.2925 12.904L23.5598 9.84208C22.9847 9.96196 22.4688 10.2941 21.8878 10.3899C20.4615 10.6254 19.0112 9.76259 18.5712 8.36567C18.4106 7.85606 18.3924 7.28587 18.272 6.76552H14.7274C14.5808 7.49899 14.5608 8.22989 14.1951 8.89934C13.6852 9.83305 12.5913 10.4673 11.5278 10.4393C10.7865 10.42 10.144 10.0092 9.43958 9.84208L7.70438 12.9337C8.60292 13.6727 9.44509 14.2644 9.64133 15.5101C9.89733 17.1322 8.95089 18.1471 7.74083 19.0082L7.70692 19.0877L9.43958 22.1496Z" fill="white" />
                                    <path d="M16.7203 11.7759C20.0568 11.9727 21.8479 15.8437 19.8161 18.5568C17.863 21.1645 13.7929 20.584 12.6184 17.5466C11.5173 14.6982 13.6962 11.598 16.7203 11.7759ZM16.4792 18.5224C19.6626 18.543 19.8211 13.6467 16.6356 13.4865C13.2635 13.3167 13.1876 18.5009 16.4792 18.5224Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_16065_1181">
                                        <rect width="21" height="22" fill="white" transform="matrix(-1 0 0 1 27 5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                                Front-Desk Automation</h3>
                            <div className="grid md:grid-cols-3 gap-10 my-10">
                                <div className="grid sm:grid-cols-2 md:gap-20 gap-10 md:col-span-2">
                                    <div className="flex flex-col gap-4">
                                        <h4 className="text-black text-[15px] font-medium">🚀 Instant Response, Every Time</h4>
                                        <p className="text-[15px] text-[#53585A]">Luna picks up every call within seconds — no more long holds or frustrated patients.</p>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <h4 className="text-black text-[15px] font-medium">🌍 Multilingual Support</h4>
                                        <p className="text-[15px] text-[#53585A]">Engage patients in 25+ languages, including English, Spanish, Arabic, French,</p>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <h4 className="text-black text-[15px] font-medium">🕐 24/7 Coverage</h4>
                                        <p className="text-[15px] text-[#53585A]">Luna works nights, weekends, and holidays to ensure continuous care access</p>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <h4 className="text-black text-[15px] font-medium">⚡ Resolution in &lt;60 Seconds</h4>
                                        <p className="text-[15px] text-[#53585A]">From appointments to prescription refills — in under a minute.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <svg width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M41.6889 17.0924V32H25.1731V22.2329C25.1731 17.5207 25.7059 13.5368 26.7714 10.2811C27.837 6.93975 29.4353 3.51271 31.5664 0H39.4247C38.6255 2.05622 37.8708 3.98393 37.1603 5.78313C36.5388 7.58233 36.0061 9.42436 35.5621 11.3092C35.2069 13.1084 35.0294 15.0361 35.0294 17.0924H41.6889ZM16.5158 17.0924V32H0V22.2329C0 17.5207 0.532766 13.5368 1.5983 10.2811C2.75262 6.93975 4.35092 3.51271 6.39319 0H14.2514C13.3636 2.05622 12.6088 3.98393 11.9872 5.78313C11.3656 7.58233 10.8773 9.42436 10.5222 11.3092C10.1669 13.1084 9.98935 15.0361 9.98935 17.0924H16.5158Z" fill="#2160FD" />
                                    </svg>
                                    <h3 className="font2 text-black text-[22px] font-semibold max-w-xs">“Luna now handles 70% of our inbound calls — patients love the speed.”</h3>
                                    <h6 className="text-[15px] text-[#53585A] font-medium">-Vice President</h6>
                                    <Link href="#"><Image src={SolutionLogo} alt="SolutionLogo" className="w-[265px]" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SolutionSection