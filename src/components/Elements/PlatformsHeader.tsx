"use client";
import Link from "next/link";
import { getSlugUrl } from "@/sanity/lib/utils";
import { useScrollPosition } from "./useScrollPosition";

const platforms = ['Overview', 'Capabilities', 'Benefits'];
const PlatformsHeader = ({ category, platform, categoryTitle }: { category: string, platform: string, categoryTitle: string }) => {

    const isScrolled = useScrollPosition(150);  

    return (
        <>
            <div
                className={`w-full z-40 transition-all duration-500 ease-in-out transform ${isScrolled
                        ? "fixed top-0 left-0 shadow-lg animate-slideDown"
                        : "relative"
                    } bg-[#F1F5FD] border-b border-[#EBEBEB] py-3`}
            >
                <div className="max-w-[1366px] mx-auto lg:px-10 px-4 py-3">
                    <div className="flex flex-row  gap-4 items-center justify-between">
                        <h2 className="capitalize font2 text-[24px] leading-[24px] font-semibold tracking-[-0.01em] text-[#171717]">{categoryTitle}</h2>
                        <div className="flex md:flex-row flex-col gap-4 items-center">
                            <ul className="flex flex-row md:gap-4 gap-2">
                                {platforms.map((item) => {
                                    const slugUrl = getSlugUrl('platforms', item.toLowerCase(), category)
                                    return(
                                    <li key={item}>
                                        <Link
                                            href={`${slugUrl}`}
                                            className={`text-sm text-[#5C5C5C] hover:text-[#171717] font-medium relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[2px] pb-2 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] ${platform === item.toLowerCase()
                                                ? 'after:scale-x-100 after:bg-[#335CFF] text-[#171717]'
                                                : 'after:scale-x-0 after:bg-[#335CFF] hover:after:scale-x-100'
                                                }`}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                )})}

                            </ul>
                            {/* <div className="md:block hidden">
                                <Link href="/contact-us" aria-label="Talk to Sales" className="bg-[#335CFF] hidden cursor-pointer group relative md:inline-flex flex-row gap-2 items-center justify-between leading-[24px] text-white font-medium rounded-[8px] py-3 px-4 text-sm">
                                    Talk to Sales
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PlatformsHeader