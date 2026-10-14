import React from "react";
import ButtonComponent from "../Elements/ButtonComponent";
const PartnerSection = ({ data }: any) => {

    return (
        <>
            <div className="w-full md:py-16 sm:py-10 py-8 sm:bg-[#f5f5f5] bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    {/* <h2 className="md:text-[54px] text-[40px] leading-[120%] font4 text-[#335CFF] text-center">Partner with Steer,</h2>
                    <h3 className="text-[#171717] md:text-[54px] sm:text-[30px] text-[30px] font5 leading-[120%] text-center md:tracking-tighter tracking-[-0.02em]">to get the right care.</h3>
                     */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        {data?.kickerText && <p className="sm:text-base text-xs font-medium leading-[110%] uppercase text-[#5C5C5C] tracking-[0.06em]">{data?.kickerText}</p>}
                        {data?.heading && <h2 className="md:text-[60px] text-[40px] font4 leading-[120%] md:tracking-tight tracking-[-0.02em] text-[#335CFF] text-center max-w-full sm:py-0 py-2">{data?.heading}</h2>}
                        {data?.subheading && <h3 className="md:text-[54px] sm:text-[30px] text-[30px] leading-[110%] text-[#262626] -mt-5 md:tracking-tighter tracking-[-0.02em] font5 text-center">{data?.subheading}</h3>}
                        {data?.description && <p className="md:max-w-[700px] text-[#5C5C5C] sm:text-2xl text-base font3 text-center">{data?.description}</p>}
                    </div>
                    {data?.ctaButtonPrimary && (
                        <div className="flex flex-row sm:gap-4 gap-3 justify-center sm:mt-4 mt-3 items-center">
                            {data?.ctaButtonPrimary && data?.ctaButtonPrimary?.buttontext && <ButtonComponent button={data?.ctaButtonPrimary} />}
                        </div>
                    )}
                    <div className="flex sm:flex-row flex-col items-center justify-center flex-wrap sm:gap-2 gap-3 sm:my-14 my-10 w-full ">
                        <div className="inline-flex w-auto">
                            <button type="button" className="text-base w-auto px-4 py-2 cursor-pointer prtnr_svg text-[#171717] hover:text-white hover:bg-[#335CFF] focus:text-white focus:bg-[#335CFF] active:text-white active:bg-[#335CFF] focus:outline-none flex flex-row  sm:text-left text-center sm:items-center items-start gap-2 rounded-[16px] bg-white sm:shadow-none shadow-[0px_3.85px_27.73px_0px_rgba(0,0,0,0.08)]">
                                <div>  <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_11830_42281)">
                                        <g clipPath="url(#clip1_11830_42281)">
                                            <g clipPath="url(#clip2_11830_42281)">
                                                <mask id="mask0_11830_42281" maskUnits="userSpaceOnUse" x="0" y="3" width="20" height="19">
                                                    <path d="M19.3301 3.34473H0.830078V21.8447H19.3301V3.34473Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_11830_42281)">
                                                    <path d="M18.5589 12.5944C18.5589 17.2773 14.7627 21.0736 10.0798 21.0736M18.5589 12.5944C18.5589 7.91149 14.7627 4.11523 10.0798 4.11523M18.5589 12.5944H15.861M10.0798 21.0736C5.39684 21.0736 1.60059 17.2773 1.60059 12.5944M10.0798 21.0736V18.3756M10.0798 4.11523C5.39684 4.11523 1.60059 7.91149 1.60059 12.5944M10.0798 4.11523V6.81316M1.60059 12.5944H4.2985M10.0798 10.2819V12.4731C10.0798 12.5508 10.1106 12.6253 10.1656 12.6802L13.1631 15.6777" stroke="#335CFF" strokeWidth="1.16" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11830_42281">
                                            <rect width="19" height="25.19" fill="#335CFF" transform="translate(0.830078 0.25)" />
                                        </clipPath>
                                        <clipPath id="clip1_11830_42281">
                                            <rect width="19" height="25.19" fill="#335CFF" transform="translate(0.830078 0.25)" />
                                        </clipPath>
                                        <clipPath id="clip2_11830_42281">
                                            <rect width="19" height="19" fill="#335CFF" transform="translate(0.830078 3.34473)" />
                                        </clipPath>
                                    </defs>
                                </svg></div>
                                <span className="!px-1"> Free up capacity while improving response times</span>
                            </button>
                        </div>

                        <div className="inline-flex w-auto">
                            <button type="button" className="text-base w-auto px-4 py-2 cursor-pointer prtnr_svg text-[#171717] hover:text-white hover:bg-[#335CFF] focus:text-white focus:bg-[#335CFF] active:text-white active:bg-[#335CFF] focus:outline-none flex flex-row  sm:text-left text-center sm:items-center items-start gap-2 rounded-[16px] bg-white sm:shadow-none shadow-[0px_3.85px_27.73px_0px_rgba(0,0,0,0.08)]">
                                <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_11830_42291)">
                                        <g clipPath="url(#clip1_11830_42291)">
                                            <g clipPath="url(#clip2_11830_42291)">
                                                <mask id="mask0_11830_42291" maskUnits="userSpaceOnUse" x="0" y="3" width="19" height="19">
                                                    <path d="M18.6602 3.34473H0.160156V21.8447H18.6602V3.34473Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_11830_42291)">
                                                    <path d="M7.86876 7.19922H8.96146M7.86876 8.83818H10.0542M5.53531 14.1484C5.53531 14.9377 4.89544 15.5776 4.10612 15.5776C3.3168 15.5776 2.67692 14.9377 2.67692 14.1484C2.67692 13.359 3.3168 12.7192 4.10612 12.7192C4.89544 12.7192 5.53531 13.359 5.53531 14.1484ZM0.931642 20.2713C0.948761 18.532 2.36407 17.1273 4.10747 17.1273C5.85087 17.1273 7.26618 18.532 7.2833 20.2713C7.28347 20.2889 7.26924 20.3032 7.2517 20.3032H0.963245C0.945704 20.3032 0.931469 20.2889 0.931642 20.2713ZM16.1416 14.1485C16.1416 14.9378 15.5017 15.5777 14.7124 15.5777C13.9231 15.5777 13.2832 14.9378 13.2832 14.1485C13.2832 13.3591 13.9231 12.7193 14.7124 12.7193C15.5017 12.7193 16.1416 13.3591 16.1416 14.1485ZM11.5379 20.2714C11.555 18.5321 12.9703 17.1274 14.7137 17.1274C16.4571 17.1274 17.8724 18.5321 17.8896 20.2714C17.8897 20.289 17.8755 20.3033 17.858 20.3033H11.5695C11.552 20.3033 11.5377 20.289 11.5379 20.2714ZM5.55636 8.46583C5.55636 6.50452 7.14631 4.88672 9.10763 4.88672C11.0689 4.88672 12.6588 6.50452 12.6588 8.46583C12.6588 9.21599 12.4262 9.91591 12.0292 10.4943C12.0156 10.5141 12.0117 10.5392 12.0191 10.5621L12.4209 11.8203C12.5708 12.2895 12.0713 12.703 11.6387 12.4677L10.4365 11.814C10.4164 11.803 10.3925 11.8017 10.3711 11.8099C9.97858 11.9616 9.55266 12.0449 9.10763 12.0449C7.14631 12.0449 5.55636 10.4271 5.55636 8.46583Z" stroke="#335CFF" strokeWidth="1.16" strokeLinecap="round" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11830_42291">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.160156 0.25)" />
                                        </clipPath>
                                        <clipPath id="clip1_11830_42291">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.160156 0.25)" />
                                        </clipPath>
                                        <clipPath id="clip2_11830_42291">
                                            <rect width="19" height="19" fill="white" transform="translate(0.160156 3.34473)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Make your teams more efficient
                            </button>
                        </div>
                        <div className="inline-flex w-auto">
                            <button type="button" className="text-base w-auto px-4 py-2 cursor-pointer prtnr_svg text-[#171717] hover:text-white hover:bg-[#335CFF] focus:text-white focus:bg-[#335CFF] active:text-white active:bg-[#335CFF] focus:outline-none flex flex-row  sm:text-left text-center sm:items-center items-start gap-2 rounded-[16px] bg-white sm:shadow-none shadow-[0px_3.85px_27.73px_0px_rgba(0,0,0,0.08)]">
                                <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_11830_42301)">
                                        <g clipPath="url(#clip1_11830_42301)">
                                            <g clipPath="url(#clip2_11830_42301)">
                                                <mask id="mask0_11830_42301" maskUnits="userSpaceOnUse" x="0" y="3" width="19" height="19">
                                                    <path d="M18.75 3.34473H0.25V21.8447H18.75V3.34473Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_11830_42301)">
                                                    <path d="M13.3548 6.42774V6.04232C13.3548 5.6166 13.0097 5.27149 12.584 5.27149H11.3314C11.1717 5.27149 11.0423 5.14207 11.0423 4.98243C11.0423 4.50349 10.6541 4.11523 10.1751 4.11523H8.82616C8.34723 4.11523 7.95898 4.50349 7.95898 4.98243C7.95898 5.14207 7.82956 5.27149 7.66991 5.27149H6.41731C5.99159 5.27149 5.64648 5.6166 5.64648 6.04232V6.42774M13.3548 6.42774V7.19857C13.3548 7.62429 13.0097 7.96941 12.584 7.96941H6.41731C5.99159 7.96941 5.64648 7.62429 5.64648 7.19857V6.42774M13.3548 6.42774H14.8965C15.3222 6.42774 15.6673 6.77285 15.6673 7.19857V20.3027C15.6673 20.7284 15.3222 21.0736 14.8965 21.0736H4.10481C3.67909 21.0736 3.33398 20.7284 3.33398 20.3027V7.19857C3.33398 6.77285 3.67909 6.42774 4.10481 6.42774H5.64648M6.41731 14.8298L8.7555 16.834L13.0979 11.8236" stroke="#335CFF" strokeWidth="1.16" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11830_42301">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.25 0.25)" />
                                        </clipPath>
                                        <clipPath id="clip1_11830_42301">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.25 0.25)" />
                                        </clipPath>
                                        <clipPath id="clip2_11830_42301">
                                            <rect width="19" height="19" fill="white" transform="translate(0.25 3.34473)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Ensure compliance
                            </button>
                        </div>
                        <div className="inline-flex mt-2  w-auto">
                            <button type="button" className="text-base w-auto px-4 py-2 cursor-pointer prtnr_svg text-[#171717] hover:text-white hover:bg-[#335CFF] focus:text-white focus:bg-[#335CFF] active:text-white active:bg-[#335CFF] focus:outline-none flex flex-row  sm:text-left text-center sm:items-center items-start gap-2 rounded-[16px] bg-white sm:shadow-none shadow-[0px_3.85px_27.73px_0px_rgba(0,0,0,0.08)]">
                                <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_11830_42312)">
                                        <g clipPath="url(#clip1_11830_42312)">
                                            <g clipPath="url(#clip2_11830_42312)">
                                                <mask id="mask0_11830_42312" maskUnits="userSpaceOnUse" x="0" y="3" width="20" height="20">
                                                    <path d="M19.2305 3.53418H0.730469V22.0342H19.2305V3.53418Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_11830_42312)">
                                                    <path d="M10.751 8.15885H2.27181C1.84609 8.15885 1.50098 8.50396 1.50098 8.92968V20.4921C1.50098 20.9179 1.84609 21.263 2.27181 21.263H13.8343C14.26 21.263 14.6052 20.9179 14.6052 20.4921V12.013M6.89681 15.8671L18.0741 4.6901M18.0741 4.6901L14.2199 4.30469M18.0741 4.6901L18.4595 8.54427" stroke="#335CFF" strokeWidth="1.16" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11830_42312">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.730469 0.439453)" />
                                        </clipPath>
                                        <clipPath id="clip1_11830_42312">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.730469 0.439453)" />
                                        </clipPath>
                                        <clipPath id="clip2_11830_42312">
                                            <rect width="19" height="19" fill="white" transform="translate(0.730469 3.53418)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Scale up your workforce
                            </button>
                        </div>

                        <div className="inline-flex mt-2 w-auto">
                            <button type="button" className="text-base w-auto px-4 py-2 cursor-pointer prtnr_svg text-[#171717] hover:text-white hover:bg-[#335CFF] focus:text-white focus:bg-[#335CFF] active:text-white active:bg-[#335CFF] focus:outline-none flex flex-row justify-center items-center gap-2 rounded-[16px] bg-white sm:shadow-none shadow-[0px_3.85px_27.73px_0px_rgba(0,0,0,0.08)]">
                                <div className="flex items-center justify-center">
                                    <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_11830_42322)">
                                            <g clipPath="url(#clip1_11830_42322)">
                                                <g clipPath="url(#clip2_11830_42322)">
                                                    <mask id="mask0_11830_42322" maskUnits="userSpaceOnUse" x="0" y="3" width="19" height="20">
                                                        <path d="M18.9102 3.53418H0.410156V22.0342H18.9102V3.53418Z" fill="white" />
                                                    </mask>
                                                    <g mask="url(#mask0_11830_42322)">
                                                        <path d="M6.17182 6.56354H4.34205C3.87376 6.56354 3.49414 6.94317 3.49414 7.41146V20.4151C3.49414 20.8834 3.87376 21.263 4.34205 21.263H15.1418C15.6101 21.263 15.9897 20.8834 15.9897 20.4151V7.41146C15.9897 6.94317 15.6101 6.56354 15.1418 6.56354H13.2875M11.3952 5.47736H12.4396C12.9079 5.47736 13.2875 5.85698 13.2875 6.32527V7.17078C13.2875 7.63907 12.9079 8.0187 12.4396 8.0187H7.01974C6.55145 8.0187 6.17182 7.63907 6.17182 7.17078V6.32527C6.17182 5.85698 6.55145 5.47736 7.01974 5.47736H8.07387C8.0764 5.47736 8.07845 5.47531 8.07845 5.47278C8.07845 4.82766 8.60142 4.30468 9.24655 4.30469L10.2226 4.30469C10.8677 4.30469 11.3906 4.82766 11.3906 5.47278C11.3906 5.47531 11.3927 5.47736 11.3952 5.47736ZM9.91775 11.2422C10.3435 11.2422 10.6885 11.5873 10.6885 12.013C10.6885 12.4413 10.6885 12.8695 10.6885 13.2977H11.9733C12.399 13.2977 12.7441 13.6428 12.7441 14.0685V14.5824C12.7441 15.0081 12.399 15.3533 11.9733 15.3533C11.545 15.3533 11.1168 15.3533 10.6885 15.3533V16.638C10.6885 17.0637 10.3435 17.4088 9.91775 17.4088H9.40386C8.97814 17.4088 8.63303 17.0637 8.63303 16.638V15.3533C8.20478 15.3533 7.77654 15.3533 7.3483 15.3533C6.92258 15.3533 6.57747 15.0081 6.57747 14.5824V14.0685C6.57747 13.6428 6.92258 13.2977 7.3483 13.2977L8.63303 13.2977C8.63303 12.8695 8.63303 12.4413 8.63303 12.013C8.63303 11.5873 8.97814 11.2422 9.40386 11.2422H9.91775Z" stroke="#335CFF" strokeWidth="1.16" strokeLinejoin="round" />
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_11830_42322">
                                                <rect width="19" height="25.19" fill="white" transform="translate(0.410156 0.439453)" />
                                            </clipPath>
                                            <clipPath id="clip1_11830_42322">
                                                <rect width="19" height="25.19" fill="white" transform="translate(0.410156 0.439453)" />
                                            </clipPath>
                                            <clipPath id="clip2_11830_42322">
                                                <rect width="19" height="19" fill="white" transform="translate(0.410156 3.53418)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <span className="px-0">Get accurate clinical documentation</span>
                            </button>
                        </div>

                        <div className="inline-flex mt-2 w-auto">
                            <button type="button" className="text-base w-auto px-4 py-2 cursor-pointer prtnr_svg text-[#171717] hover:text-white hover:bg-[#335CFF] focus:text-white focus:bg-[#335CFF] active:text-white active:bg-[#335CFF] focus:outline-none flex flex-row  sm:text-left text-center sm:items-center items-start gap-2 rounded-[16px] bg-white sm:shadow-none shadow-[0px_3.85px_27.73px_0px_rgba(0,0,0,0.08)]">
                                <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_11830_42332)">
                                        <g clipPath="url(#clip1_11830_42332)">
                                            <g clipPath="url(#clip2_11830_42332)">
                                                <mask id="mask0_11830_42332" maskUnits="userSpaceOnUse" x="0" y="3" width="19" height="20">
                                                    <path d="M18.6602 3.53418H0.160156V22.0342H18.6602V3.53418Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_11830_42332)">
                                                    <path d="M11.546 10.9339C11.546 9.69701 10.9781 8.62143 9.39483 8.62143C7.81158 8.62143 7.30641 9.55897 7.30641 10.5485C7.30641 11.538 7.88454 12.3985 9.39483 12.6686C10.7536 12.9115 11.9314 13.345 11.9314 14.8866C11.9314 16.1236 10.6318 17.1131 9.39483 17.1131C8.15792 17.1131 6.921 16.3709 6.921 14.8866M9.39482 7.46518V18.1026M17.889 12.7839C17.889 17.4667 14.0928 21.263 9.40983 21.263C4.72692 21.263 0.930664 17.4667 0.930664 12.7839C0.930664 8.10094 4.72692 4.30469 9.40983 4.30469C14.0928 4.30469 17.889 8.10094 17.889 12.7839Z" stroke="#335CFF" strokeWidth="1.16" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11830_42332">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.160156 0.439453)" />
                                        </clipPath>
                                        <clipPath id="clip1_11830_42332">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.160156 0.439453)" />
                                        </clipPath>
                                        <clipPath id="clip2_11830_42332">
                                            <rect width="19" height="19" fill="white" transform="translate(0.160156 3.53418)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Get paid faster for the care your clinicians provide
                            </button>
                        </div>


                        <div className="inline-flex mt-2 w-auto">
                            <button type="button" className="text-base w-auto px-4 py-2 cursor-pointer prtnr_svg text-[#171717] hover:text-white hover:bg-[#335CFF] focus:text-white focus:bg-[#335CFF] active:text-white active:bg-[#335CFF] focus:outline-none flex flex-row  sm:text-left text-center sm:items-center items-start gap-2 rounded-[16px] bg-white sm:shadow-none shadow-[0px_3.85px_27.73px_0px_rgba(0,0,0,0.08)]">
                                <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_11830_42343)">
                                        <g clipPath="url(#clip1_11830_42343)">
                                            <g clipPath="url(#clip2_11830_42343)">
                                                <mask id="mask0_11830_42343" maskUnits="userSpaceOnUse" x="0" y="3" width="19" height="20">
                                                    <path d="M18.7695 3.72363H0.269531V22.2236H18.7695V3.72363Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_11830_42343)">
                                                    <path d="M9.87781 14.873C9.18034 15.5705 8.74895 16.534 8.74895 17.5983C8.74895 17.7952 8.76372 17.9887 8.79221 18.1777M9.87781 14.873L15.3284 20.3236M9.87781 14.873C10.5752 14.1755 11.5388 13.7441 12.6031 13.7441C12.7624 13.7441 12.9194 13.7538 13.0736 13.7726M8.79221 18.1777C9.07167 20.0314 10.6714 21.4525 12.6031 21.4525C13.6674 21.4525 14.6309 21.0211 15.3284 20.3236M8.79221 18.1777H6.45795H3.35286C2.92714 18.1777 2.58203 17.8326 2.58203 17.4068V5.26499C2.58203 4.83927 2.92714 4.49415 3.35286 4.49415L8.74895 4.49414M15.3284 20.3236C16.0259 19.6262 16.4573 18.6626 16.4573 17.5983C16.4573 15.629 14.9802 14.0046 13.0736 13.7726M13.0736 13.7726V9.11914M8.74895 4.49414L9.24011 4.49414C9.45897 4.49414 9.66752 4.58718 9.81373 4.75006L12.8764 8.16184C13.0033 8.30329 13.0736 8.48667 13.0736 8.67676V9.11914M8.74895 4.49414V9.04206C8.74895 9.08463 8.78346 9.11914 8.82603 9.11914H13.0736" stroke="#335CFF" strokeWidth="1.16" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11830_42343">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.269531 0.628906)" />
                                        </clipPath>
                                        <clipPath id="clip1_11830_42343">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.269531 0.628906)" />
                                        </clipPath>
                                        <clipPath id="clip2_11830_42343">
                                            <rect width="19" height="19" fill="white" transform="translate(0.269531 3.72363)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Minimize claim denials
                            </button>
                        </div>


                        <div className="inline-flex mt-2 w-auto">
                            <button type="button" className="text-base w-auto px-4 py-2 cursor-pointer prtnr_svg text-[#171717] hover:text-white hover:bg-[#335CFF] focus:text-white focus:bg-[#335CFF] active:text-white active:bg-[#335CFF] focus:outline-none flex flex-row  sm:text-left text-center sm:items-center items-start gap-2 rounded-[16px] bg-white sm:shadow-none shadow-[0px_3.85px_27.73px_0px_rgba(0,0,0,0.08)]">
                                <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_11830_42354)">
                                        <g clipPath="url(#clip1_11830_42354)">
                                            <g clipPath="url(#clip2_11830_42354)">
                                                <mask id="mask0_11830_42354" maskUnits="userSpaceOnUse" x="0" y="3" width="19" height="20">
                                                    <path d="M18.5498 3.72363H0.0498047V22.2236H18.5498V3.72363Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_11830_42354)">
                                                    <path d="M0.820312 17.5986L6.44191 11.977C6.74294 11.676 7.23101 11.676 7.53203 11.977L10.2961 14.741C10.5971 15.0421 11.0852 15.0421 11.3862 14.741L17.7786 8.34863M17.7786 8.34863H12.3828M17.7786 8.34863V13.7444" stroke="#335CFF" strokeWidth="1.16" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11830_42354">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.0498047 0.628906)" />
                                        </clipPath>
                                        <clipPath id="clip1_11830_42354">
                                            <rect width="19" height="25.19" fill="white" transform="translate(0.0498047 0.628906)" />
                                        </clipPath>
                                        <clipPath id="clip2_11830_42354">
                                            <rect width="19" height="19" fill="white" transform="translate(0.0498047 3.72363)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Achieve accurate & reliable reimbursement
                            </button>
                        </div>


                        <div className="inline-flex mt-2 w-auto">
                            <button type="button" className="text-base w-auto px-4 py-2 cursor-pointer prtnr_svg text-[#171717] hover:text-white hover:bg-[#335CFF] focus:text-white focus:bg-[#335CFF] active:text-white active:bg-[#335CFF] focus:outline-none flex flex-row  sm:text-left text-center sm:items-center items-start gap-2 rounded-[16px] bg-white sm:shadow-none shadow-[0px_3.85px_27.73px_0px_rgba(0,0,0,0.08)]">
                                <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_11830_42364)">
                                        <g clipPath="url(#clip1_11830_42364)">
                                            <g clipPath="url(#clip2_11830_42364)">
                                                <mask id="mask0_11830_42364" maskUnits="userSpaceOnUse" x="0" y="3" width="19" height="20">
                                                    <path d="M19 3.71973H0.5V22.2197H19V3.71973Z" fill="white" />
                                                </mask>
                                                <g mask="url(#mask0_11830_42364)">
                                                    <path d="M4.35384 8.34473C4.35384 10.0476 2.97338 11.4281 1.27051 11.4281M15.1455 8.34473C15.1455 10.0476 16.526 11.4281 18.2288 11.4281M1.27051 14.5114C2.97338 14.5114 4.35384 15.8918 4.35384 17.5947M18.2288 14.5114C16.526 14.5114 15.1455 15.8918 15.1455 17.5947M2.04134 17.5947H17.458C17.8837 17.5947 18.2288 17.2496 18.2288 16.8239V9.11556C18.2288 8.68984 17.8837 8.34473 17.458 8.34473H2.04134C1.61562 8.34473 1.27051 8.68984 1.27051 9.11556V16.8239C1.27051 17.2496 1.61562 17.5947 2.04134 17.5947ZM12.0622 12.9697C12.0622 14.2469 11.0268 15.2822 9.74967 15.2822C8.47251 15.2822 7.43717 14.2469 7.43717 12.9697C7.43717 11.6926 8.47251 10.6572 9.74967 10.6572C11.0268 10.6572 12.0622 11.6926 12.0622 12.9697Z" stroke="#335CFF" strokeWidth="1.16" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11830_42364">
                                            <rect width="19" height="25.19" fill="#335CFF" transform="translate(0.5 0.625)" />
                                        </clipPath>
                                        <clipPath id="clip1_11830_42364">
                                            <rect width="19" height="25.19" fill="#335CFF" transform="translate(0.5 0.625)" />
                                        </clipPath>
                                        <clipPath id="clip2_11830_42364">
                                            <rect width="19" height="19" fill="#335CFF" transform="translate(0.5 3.71973)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Find and recover every missed dollar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PartnerSection