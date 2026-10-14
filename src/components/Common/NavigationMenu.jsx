'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'



import HeaderPlatFormMenu from './HeaderPlatFormMenu';
import HeaderSolutionsMenu from './HeaderSolutionsMenu';
import HeaderCompanyMenu from './HeaderCompanyMenu';
import HeaderResourcesMenu from './HeaderResourcesMenu';

const callsToAction = [
    { name: 'Watch demo', href: '#' },
    { name: 'Contact sales', href: '#' },
]


const NavigationMenu = ({ latestPost, products, categories, casestudies }) => {

    const [activeMenu, setActiveMenu] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    //const [hoveredItem, setHoveredItem] = useState(solutions[0]);
    const [isPlatformOpen, setIsPlatformOpen] = useState(false);
    const [isSolutionOpen, setIsSolutionOpen] = useState(false);
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);

    const handleMouseEnter = (menuName) => {
        setActiveMenu(menuName);

    };

    // Handle mouse leave for the entire navigation
    const handleMouseLeave = () => {
        setActiveMenu(null);
    };
    return (
        <div
            onMouseLeave={handleMouseLeave}>
            <PopoverGroup className="hidden lg:flex xl:gap-x-12 gap-x-6"
            >
                <div
                    onMouseOver={() => {
                        if(activeMenu !== 'platform'){
                            handleMouseEnter('platform')
                        }                        
                    }}
                >
                    <button
                        type="button"
                        aria-label='Platform'
                        className="flex cursor-pointer items-center w-full mx-auto gap-x-3 md:py-5 py-0 text-sm font-medium text-[#171717] focus:outline-none"
                    >
                        AI Platform
                        <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform duration-150 ${activeMenu === 'platform' ? 'rotate-180' : 'rotate-0'}`}
                        >
                            <path
                                d="M4.9998 3.79047L8.34105 0.449219L9.2955 1.40367L4.9998 5.69937L0.704102 1.40367L1.65855 0.449219L4.9998 3.79047Z"
                                fill="#171717"
                            />
                        </svg>
                    </button>


                </div>

                <div
                    onMouseOver={() => {
                        if(activeMenu !== 'solutions'){
                            handleMouseEnter('solutions')
                        }                        
                    }}
                >
                    <button
                        type="button"
                        aria-label='Who We Serve'
                        className="flex cursor-pointer items-center gap-x-3 md:py-5 py-0 text-sm font-medium text-[#171717] focus:outline-none"
                    >
                        Who We Serve
                        <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform duration-150 ${activeMenu === 'solutions' ? 'rotate-180' : 'rotate-0'}`}
                        >
                            <path
                                d="M4.9998 3.79047L8.34105 0.449219L9.2955 1.40367L4.9998 5.69937L0.704102 1.40367L1.65855 0.449219L4.9998 3.79047Z"
                                fill="#171717"
                            />
                        </svg>
                    </button>

                </div>


                <div
                    onMouseOver={() => {
                        if(activeMenu !== 'company'){
                            handleMouseEnter('company')
                        }                        
                    }}
                >
                    <button
                        type="button"
                        aria-label='Company'
                        className="flex cursor-pointer items-center gap-x-3 md:py-5 py-0 text-sm font-medium text-[#171717] focus:outline-none"
                    >
                        Company
                        <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform duration-150 ${activeMenu === 'company' ? 'rotate-180' : 'rotate-0'}`}
                        >
                            <path
                                d="M4.9998 3.79047L8.34105 0.449219L9.2955 1.40367L4.9998 5.69937L0.704102 1.40367L1.65855 0.449219L4.9998 3.79047Z"
                                fill="#171717"
                            />
                        </svg>
                    </button>

                </div>

                <div
                    onMouseOver={() => {
                        if(activeMenu !== 'resources'){
                            handleMouseEnter('resources')
                        }                        
                    }}
                >
                    <button
                        type="button"
                        aria-label='Resources'
                        className="flex cursor-pointer items-center gap-x-3 md:py-5 py-0 text-sm font-medium text-[#171717] focus:outline-none"
                    >
                        Resources
                        <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform duration-150 ${activeMenu === 'resources' ? 'rotate-180' : 'rotate-0'}`}
                        >
                            <path
                                d="M4.9998 3.79047L8.34105 0.449219L9.2955 1.40367L4.9998 5.69937L0.704102 1.40367L1.65855 0.449219L4.9998 3.79047Z"
                                fill="#171717"
                            />
                        </svg>
                    </button>

                </div>

                <div onMouseOver={() => activeMenu && handleMouseEnter(null)}>
                    <Link
                        href="/ai-assistant"
                        className="flex items-center gap-x-3 md:py-5 py-0 text-sm font-medium text-[#171717] hover:text-[#335CFF] transition-colors focus:outline-none"
                    >
                        AI Assistant
                    </Link>
                </div>
            </PopoverGroup>
            <div
                className={`absolute left-0 right-0 top-[55px] z-50 bg-white mt-2
    transition-all duration-300 ease-out transform origin-top
    ${activeMenu === 'platform'
                        ? "opacity-100 translate-y-0 scale-100 visible"
                        : "opacity-0 -translate-y-2 scale-95 invisible"}`}
            >
                <HeaderPlatFormMenu products={products} />
            </div>
            <div
                className={`absolute left-0 right-0 top-[55px] z-50 bg-white mt-2
    transition-all duration-300 ease-out transform origin-top
    ${activeMenu === 'solutions'
                        ? "opacity-100 translate-y-0 scale-100 visible"
                        : "opacity-0 -translate-y-2 scale-95 invisible"}`}
            >

                <HeaderSolutionsMenu categories={categories} />
            </div>
            <div
                className={`absolute left-0 right-0 top-[55px] z-50 bg-white mt-2
    transition-all duration-300 ease-out transform origin-top
    ${activeMenu === 'company'
                        ? "opacity-100 translate-y-0 scale-100 visible"
                        : "opacity-0 -translate-y-2 scale-95 invisible"}`}
            >

                <HeaderCompanyMenu />
            </div>
            <div
                className={`absolute left-0 right-0 top-[55px] z-50 bg-white mt-2
    transition-all duration-300 ease-out transform origin-top
    ${activeMenu === 'resources'
                        ? "opacity-100 translate-y-0 scale-100 visible"
                        : "opacity-0 -translate-y-2 scale-95 invisible"}`}
            >
                <HeaderResourcesMenu latestPost={latestPost} casestudies={casestudies} />
            </div>
        </div>
    );
};
export default NavigationMenu