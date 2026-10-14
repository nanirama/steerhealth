"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import ImageComponent from '../Elements/ImageComponent';
import NavigationMenu from './NavigationMenu';
import MobileHeader from './MobileHeader';
import ContactSalesModal from "../FlexibleContent/ContactSalesModal";
import { useScrollPosition } from "../Elements/useScrollPosition";
import dynamic from 'next/dynamic';

// Lazy load IndustriesMenu only when needed (not on initial page load)
const IndustriesMenu = dynamic(() => import('./IndustriesMenu'), {
  ssr: false,
  loading: () => null,
});
import { usePathname } from "next/navigation";

export default function Header({ page, category, latestPost, products, categories, casestudies, settings }: { page?: string, category?: string, latestPost?: any, products?: any, categories?: any, casestudies?: any, settings?: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    //const [isScrolled, setIsScrolled] = useState(false);
    const [selected, setSelected] = useState(false);
    const router = usePathname();
    const currentPage = router?.split("/")[1];
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen !== undefined) {
            setSelected(isModalOpen);
        }
    }, [isModalOpen, isOpen]);

    const handleModalToggle = (open: any) => {
        setSelected(open);
        if (setIsModalOpen) {
            setIsModalOpen(open);
        }
    };

    // useEffect(() => {
    //     let ticking = false;
    //     const handleScroll = () => {
    //         //setIsScrolled(window.scrollY > 50); // Adjust scroll threshold if needed
    //         if (!ticking) {
    //             requestAnimationFrame(() => {
    //                 setIsScrolled(window.scrollY > 50);
    //                 ticking = false;
    //             });
    //             ticking = true;
    //         }
    //     };

    //     //window.addEventListener('scroll', handleScroll);
    //     window.addEventListener('scroll', handleScroll, { passive: true });
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    const isScrolled = useScrollPosition(150);

    const baseClasses = "lg:block hidden z-50 w-full"

    const pageClasses =
        page === "home"
            ? "bg-white mx-auto py-1 lg:px-0 px-4"
            : "lg:py-1 py-5 lg:px-0 px-4 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]"

    // Improved scroll classes with smooth transitions
    const scrollClasses = isScrolled && (category !== 'solutions')
        ? "fixed top-0 left-0 right-0 backdrop-blur-md shadow-lg animate-slideDown"
        : "relative"


    

    return (
        <>
        {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
            <div className="relative z-50">
                <header className={`${baseClasses} ${pageClasses} ${scrollClasses}`}>
                    <nav
                        aria-label="Global"
                        className={`mx-auto flex lg:max-w-[1336px] w-full items-center justify-between md:gap-1 gap-6 ${page === "home"
                            ? "lg:px-4 pl-4 pr-0"
                            : "lg:flex-row flex-row-reverse px-4"
                            }`}
                    >
                        <div className="flex flex-row w-full justify-between lg:gap-10 gap-4 items-center">
                            <div className="flex">
                                <Link
                                    href="/"
                                    className={`${page === "home"
                                        ? "lg:block hidden lg:py-3 py-0"
                                        : "block lg:py-4 py-0"
                                        }`}
                                >
                                    <Image
                                        src="/images/logo.webp"
                                        alt="Steer Health Logo"
                                        width={161}
                                        height={32}
                                        priority
                                        fetchPriority="high"
                                        loading="eager"
                                        sizes="(min-width: 768px) 161px, 100vw"
                                    />
                                </Link>

                                <Link
                                    href="/"
                                    className={`${page === "home" ? "lg:hidden block" : "hidden"
                                        }`}
                                >
                                    <ImageComponent
                                        src="logo.webp"
                                        alt="Steer Health Logo"
                                        width={161}
                                        height={32}
                                        priority={true}
                                        cdn={false}
                                        sizes="(min-width: 768px) 161px, 100vw"
                                    />
                                </Link>
                            </div>

                            <NavigationMenu latestPost={latestPost} products={products} categories={categories} casestudies={casestudies} />
                            {currentPage === "contact-us" ? (
                                <a
                                    href="#contactus-section"
                                    className="cursor-pointer bg-[#335CFF] flex flex-row lg:gap-4 gap-1 items-center justify-between leading-[24px] text-white font-medium rounded-xl md:py-3 py-2 lg:px-4 px-2 lg:text-lg text-sm hover:bg-[#2347e6] transition-colors"
                                >
                                    Contact Sales
                                    <svg
                                        width="25"
                                        height="24"
                                        viewBox="0 0 25 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.0455 12.0015L8.6084 7.56437L9.8759 6.29688L15.5805 12.0015L9.8759 17.7062L8.6084 16.4387L13.0455 12.0015Z"
                                            fill="white"
                                        />
                                    </svg>
                                </a>
                            ) : (
                                <button
                                    onClick={() => handleModalToggle(true)}
                                    className="cursor-pointer bg-[#335CFF] flex flex-row lg:gap-4 gap-1 items-center justify-between leading-[24px] text-white font-medium rounded-xl md:py-3 py-2 lg:px-4 px-2 lg:text-lg text-sm hover:bg-[#2347e6] transition-colors"
                                >
                                    Contact Sales
                                    <svg
                                        width="25"
                                        height="24"
                                        viewBox="0 0 25 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.0455 12.0015L8.6084 7.56437L9.8759 6.29688L15.5805 12.0015L9.8759 17.7062L8.6084 16.4387L13.0455 12.0015Z"
                                            fill="white"
                                        />
                                    </svg>
                                </button>
                            )}



                        </div>
                    </nav>
                </header>
            </div>
            <div className="block lg:hidden">
                <MobileHeader products={products} categories={categories} />
            </div>
            {selected && <ContactSalesModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleModalToggle={handleModalToggle}
                selected={selected}
            />}
            {/* <IndustriesMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                page={currentPage}
            /> */}
           
        </>
    );
}
