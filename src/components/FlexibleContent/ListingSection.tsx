import React from "react";
import ImageComponent from "../Elements/ImageComponent";

const ListingSection = () => {
    return (
        <>
            <div className="w-full md:py-12 py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-[#F8FAFB] border border-[#E9EAEB] rounded-[24px] sm:p-5 p-4 lg:overflow-x-auto overflow-x-scroll">
                        <div className="min-w-[767px]">
                            <div className="flex flex-row gap-8">
                                <div className="w-1/3 flex items-center justify-start pl-5 border-b border-[#E9EAEB] py-6">
                                    <h5 className="text-2xl text-[#181D27] font2 font-medium">Item</h5>
                                </div>
                                <div className="w-1/3 flex items-center justify-center pl-5 border-b border-[#E9EAEB] py-6">
                                    <h5 className="text-2xl text-[#181D27] font2 font-medium">Others</h5>
                                </div>
                                <div className="w-1/3 flex items-center justify-center pl-5 border-b border-[#E9EAEB] py-6">
                                    <ImageComponent
                                        src="logo.webp"
                                        alt="Logo"
                                        width={194} height={34}
                                        className=""
                                        priority={false}
                                        sizes="(min-width: 768px) 1200px, 100vw"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="w-1/3 py-5 flex items-center justify-start pl-5">
                                    <h5 className="text-xl text-[#0A0D14] font3 font-normal">Masterclasses & member portal</h5>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#335CFF" />
                                        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="w-1/3 py-5 flex items-center justify-start pl-5">
                                    <h5 className="text-xl text-[#0A0D14] font3 font-normal">Community access / newsletter</h5>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#335CFF" />
                                        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="w-1/3 py-5 flex items-center justify-start pl-5">
                                    <h5 className="text-xl text-[#0A0D14] font3 font-normal">Annual supplement discounts</h5>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#335CFF" />
                                        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="w-1/3 py-5 flex items-center justify-start pl-5">
                                    <h5 className="text-xl text-[#0A0D14] font3 font-normal">Coach access via texting</h5>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#335CFF" />
                                        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="w-1/3 py-5 flex items-center justify-start pl-5">
                                    <h5 className="text-xl text-[#0A0D14] font3 font-normal">30 Mins 1:1 Coach visits</h5>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#335CFF" />
                                        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="w-1/3 py-5 flex items-center justify-start pl-5">
                                    <h5 className="text-xl text-[#0A0D14] font3 font-normal">60 Mins 1:1 Provider visits</h5>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#335CFF" />
                                        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="w-1/3 py-5 flex items-center justify-start pl-5">
                                    <h5 className="text-xl text-[#0A0D14] font3 font-normal">Ad hoc provider discounts</h5>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#335CFF" />
                                        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="w-1/3 py-5 flex items-center justify-start pl-5">
                                    <h5 className="text-xl text-[#0A0D14] font3 font-normal">Ad hoc coach discounts</h5>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#335CFF" />
                                        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="w-1/3 py-5 flex items-center justify-start pl-5">
                                    <h5 className="text-xl text-[#0A0D14] font3 font-normal">FORUM Foundations Lab Test</h5>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="w-1/3 py-5 flex items-center justify-center pl-5">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#335CFF" />
                                        <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListingSection