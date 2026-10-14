import React from "react";

const LunaStats = () => {
    return (
        <>
            <div className="bg-white w-full md:py-20 py-6 px-4">
                <div className=" max-w-[1400px] mx-auto">
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 w-full h-full items-start">
                        <div className="flex flex-col gap-0 items-start h-full border border-black/10 shadow-[0px_0px_20px_0px_#0000000D] rounded-[24px] sm:p-8 p-4">
                            <div className="border-b-4 border-[#F1F9FE] sm:pb-16 pb-10 w-full">
                                <h5 className="border border-[#2160FD] text-[#2160FD] text-base inline-flex flex-row gap-2 items-center rounded-full py-1 px-2">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_16065_1345)">
                                            <path d="M9.07439 0.066875C8.87528 0.0409375 8.66146 0.0475 8.46987 0H7.53287C3.53224 0.2225 0.22787 3.52844 0.00528271 7.53125C-0.0119357 7.84156 0.0181183 8.15812 0.00528271 8.46875C0.0525552 8.66063 0.046607 8.87437 0.0722781 9.07375C0.526219 12.6028 3.40514 15.4728 6.92835 15.9331C7.12745 15.9591 7.34128 15.9525 7.53287 16H8.46987C8.66146 15.9528 8.87528 15.9587 9.07439 15.9331C12.6064 15.4784 15.4662 12.6 15.9305 9.07375C16.5052 4.70812 13.4397 0.637187 9.07439 0.066875ZM13.5994 11.7725C10.8776 15.8088 4.92475 15.7138 2.30379 11.6225C-0.467129 7.29719 2.50352 1.56531 7.58891 1.25906C13.1401 0.925 16.7263 7.13531 13.5994 11.7725Z" fill="#2160FD" />
                                            <path d="M11.6688 6.15323C10.3186 7.66354 8.80489 9.04104 7.3933 10.5007C7.0915 10.7523 6.81945 10.8179 6.48761 10.562C5.89999 9.86791 5.01026 9.2301 4.45614 8.53166C4.24545 8.26573 4.20757 7.9301 4.45176 7.66729C4.75449 7.34166 5.13236 7.46885 5.4257 7.71791C5.94976 8.16354 6.38085 8.7601 6.91995 9.18541L10.6908 5.42479C11.2039 5.00635 11.9239 5.54385 11.6688 6.15323Z" fill="#2160FD" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_16065_1345">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Auto-resolution</h5>
                            </div>
                            <h4 className="text-base text-black pt-4">Routine requests resolved automatically</h4>
                            <h2 className="md:text-[72px] text-[60px] text-black font-semibold font2 leading-[92px]">+92%</h2>
                        </div>
                        <div className="flex flex-col gap-0 items-start h-full border border-black/10 shadow-[0px_0px_20px_0px_#0000000D] rounded-[24px] sm:p-8 p-4">
                            <div className="border-b-4 border-[#F1F9FE] sm:pb-16 pb-10 w-full">
                                <h5 className="border border-[#2160FD] text-[#2160FD] text-base inline-flex flex-row gap-2 items-center rounded-full py-1 px-2">
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_16065_1358)">
                                            <path d="M13.3095 9.83341C12.7175 9.46974 12.4542 10.3871 12.0926 10.6597C11.5857 9.85908 10.7586 9.22092 9.87356 8.87947C10.9568 7.93522 11.3387 6.44547 10.6719 5.13192C9.55736 2.93734 6.33181 2.99211 5.28491 5.21579C4.67255 6.51651 5.06702 7.95776 6.12394 8.87947C5.24046 9.22249 4.41208 9.85939 3.90491 10.6597C2.92437 9.62215 2.44507 8.16463 2.49954 6.74123C2.50737 6.70086 2.54838 6.76001 2.56215 6.77253C2.75626 6.94936 3.00765 7.27641 3.20238 7.41287C3.68325 7.74932 4.24678 7.15623 3.89082 6.69366C3.35109 6.25111 2.85174 5.5319 2.31264 5.11689C2.12793 4.9748 1.91504 4.95884 1.72063 5.08841C1.25948 5.6333 0.537852 6.14407 0.108322 6.69334C0.0566654 6.75938 0.0447688 6.81822 0 6.88175V7.13151C0.115209 7.40192 0.320269 7.55684 0.626763 7.49205C0.900385 7.43447 1.24789 6.88394 1.49929 6.72558C1.39378 9.42748 2.96069 11.9213 5.43769 12.9847C8.19958 14.1706 11.6142 13.2589 13.3048 10.7633C13.5001 10.4747 13.7105 10.08 13.3095 9.83341ZM7.7735 4.51786C10.4853 4.24244 10.773 8.30579 8.17015 8.50484C5.5385 8.70608 5.2295 4.77638 7.7735 4.51786ZM11.3387 11.3557C9.58992 12.8173 6.69654 12.888 4.86446 11.5282C4.80873 11.4869 4.65439 11.3942 4.65502 11.3316C5.9937 9.19651 9.04487 8.88604 10.8312 10.6706C10.9236 10.7629 11.3628 11.259 11.3387 11.3557Z" fill="#2160FD" />
                                            <path d="M15.8888 7.31951C15.3494 7.76143 14.8495 8.48221 14.311 8.89628C14.12 9.04306 13.8983 9.05558 13.7011 8.91099C13.1592 8.5132 12.6345 7.73796 12.0913 7.30324C11.8271 6.90232 12.1511 6.42096 12.6248 6.52112C12.8984 6.5787 13.2453 7.1286 13.4973 7.28759C13.657 3.67963 10.413 0.880074 6.84804 1.6262C5.53566 1.90099 4.48249 2.61551 3.64222 3.63706C3.44279 3.87993 3.3088 4.27553 2.92529 4.25706C2.58999 4.24079 2.40497 3.90278 2.47447 3.59418C2.50108 3.47619 2.91152 2.94601 3.0142 2.82208C4.10243 1.51103 5.86344 0.608099 7.5753 0.510765C11.4583 0.290118 14.6406 3.41516 14.4979 7.28759C14.7781 7.10575 15.1124 6.53051 15.4512 6.50609C15.8957 6.47417 16.1628 6.96523 15.8888 7.31951Z" fill="#2160FD" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_16065_1358">
                                                <rect width="16" height="13" fill="white" transform="translate(0 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Conversion</h5>
                            </div>
                            <h4 className="text-base text-black pt-4 max-w-36">Callers converted to booked visits</h4>
                            <h2 className="md:text-[72px] text-[60px] text-black font-semibold font2 leading-[92px]">+55%</h2>
                        </div>
                        <div className="flex flex-col gap-0 items-start h-full border border-black/10 shadow-[0px_0px_20px_0px_#0000000D] rounded-[24px] sm:p-8 p-4">
                            <div className="border-b-4 border-[#F1F9FE] sm:pb-16 pb-10 w-full">
                                <h5 className="border border-[#2160FD] text-[#2160FD] text-base inline-flex flex-row gap-2 items-center rounded-full py-1 px-2">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_16065_1371)">
                                            <path d="M12.7891 2.24796C7.99146 -1.75326 0.828892 1.5544 0.503291 7.71811C0.493696 7.89741 0.510008 8.08055 0.503291 8.26017L0.571098 8.97386C0.99457 12.3042 3.70076 15.0065 7.03289 15.4322L7.74678 15.5H8.25725C15.1243 15.1535 18.0803 6.66083 12.7891 2.24796ZM13.1528 11.3192C10.8349 14.9353 5.53762 15.0791 3.03005 11.587C0.230785 7.68934 2.81384 2.20833 7.58046 1.89095C12.5895 1.55728 15.8753 7.07185 13.1528 11.3192Z" fill="#2160FD" />
                                            <path d="M9.54983 10.524C8.94724 9.83999 8.13324 9.22186 7.55401 8.53214C7.42895 8.3832 7.34803 8.28892 7.33012 8.08596C7.20954 6.72602 7.42319 5.18965 7.3314 3.81084C7.35762 3.55931 7.58279 3.30362 7.83355 3.26047C8.23208 3.19208 8.54936 3.36946 8.66386 3.75491L8.67826 7.6954L10.5068 9.5354C11.1167 10.2354 10.2644 11.1127 9.54983 10.524Z" fill="#2160FD" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_16065_1371">
                                                <rect width="15" height="15" fill="white" transform="translate(0.5 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg> Time Reduction</h5>
                            </div>
                            <h4 className="text-base text-black pt-4 max-w-32">Wait-time drop (12 min → 1 min)</h4>
                            <h2 className="md:text-[72px] text-[60px] text-black font-semibold font2 leading-[92px]">99%</h2>
                        </div>
                        <div className="flex flex-col gap-0 items-start h-full border border-black/10 shadow-[0px_0px_20px_0px_#0000000D] rounded-[24px] sm:p-8 p-4">
                            <div className="border-b-4 border-[#F1F9FE] sm:pb-16 pb-10 w-full">
                                <h5 className="border border-[#2160FD] text-[#2160FD] text-base inline-flex flex-row gap-2 items-center rounded-full py-1 px-2">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_16065_1383)">
                                            <path d="M11.4279 0.00486199L1.63339 0C0.751054 0.0748747 0.0427877 0.812601 0 1.69684L0.00226904 11.3657C0.0797407 12.224 0.771151 12.9264 1.63339 13L11.399 12.9984C12.2337 12.9102 12.8629 12.2603 13 11.4471V1.55292C12.9173 0.784078 12.1987 0.0790884 11.4279 0.00486199ZM5.46613 1.16493H7.53549V3.52527H5.46613V1.16493ZM11.7786 11.438C11.6671 11.7469 11.41 11.8156 11.1099 11.8364H1.85964C1.55592 11.8121 1.31864 11.7213 1.21329 11.4156L1.22334 1.562C1.26872 1.37497 1.55008 1.16493 1.7316 1.16493H4.26969V3.54148C4.26969 4.17516 4.80389 4.67853 5.41621 4.72294C6.00389 4.76605 7.03533 4.77351 7.6175 4.72294C8.21653 4.67076 8.73193 4.15474 8.73193 3.54148V1.16493H11.2703C11.4515 1.16493 11.7329 1.37497 11.7786 1.562V11.438Z" fill="#2160FD" />
                                            <path d="M8.37702 8.06891C7.83698 8.75218 6.95206 9.39882 6.36211 10.0633C6.14914 10.18 5.94233 10.1978 5.73326 10.0646C5.32969 9.80723 4.87134 9.14308 4.48982 8.8183C4.2801 8.3334 4.62694 7.87313 5.15141 7.96291C5.43925 8.01218 5.79063 8.54927 6.03212 8.73046L7.5352 7.22713C7.60749 7.16814 7.69144 7.10688 7.78577 7.08938C8.40198 6.97593 8.76016 7.58433 8.37702 8.06891Z" fill="#2160FD" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_16065_1383">
                                                <rect width="13" height="13" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Fulfillment</h5>
                            </div>
                            <h4 className="text-base text-black pt-4">Success rate for fulfilling routine call center requests</h4>
                            <h2 className="md:text-[72px] text-[60px] text-black font-semibold font2 leading-[92px]">+25x</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LunaStats