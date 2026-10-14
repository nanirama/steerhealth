"use client";

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ImageComponent from '../Elements/ImageComponent';

interface Industry {
    name: string;
    href: string;
    pageKey: string;
}

interface Solution {
    name: string;
    learnmore: string;
    image: string;
    href: string;
}

interface IndustriesMenuProps {
    isOpen?: boolean;
    setIsOpen?: (open: boolean) => void;
    page?: string;
}

const IndustriesMenu = memo(({ isOpen, setIsOpen, page = "" }: IndustriesMenuProps) => {
    const [showModal, setShowModal] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    const solutions: Solution[] = [
        {
            name: "Hospitals",
            learnmore: "Cut costs and connect care|across every department.",
            image: 'hospitals-m.webp',
            href: '/hospitals-and-health-systems',
        },
        {
            name: "ASC's",
            learnmore: "Run operating rooms smoother|with automated workflows.",
            image: 'ascs-m.webp',
            href: "/ambulatory-surgery-centers",
        },
        // {
        //     name: "Medical Groups",
        //     learnmore: "Grow visits and simplify intake, no-shows, and reputation.",
        //     image: 'clinics-menu-img.webp',
        //     href: "/medical-groups",
        // },
        {
            name: "Functional Medicine",
            learnmore: "Care with easy intake, virtual visits|and engagement.",
            image: 'fm-m.webp',
            href: "/functional-medicine",
        },
    ];

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        document.body.classList.remove('modal-open');
        
        // Mark modal as shown in sessionStorage
        sessionStorage.setItem('industries-modal-shown', 'true');
        
        // Restore focus to previously focused element
        if (previouslyFocusedElement.current) {
            previouslyFocusedElement.current.focus();
        }
    }, []);

    // Handle Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && showModal) {
                handleCloseModal();
            }
        };

        if (showModal) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [showModal, handleCloseModal]);

    // Focus trap
    useEffect(() => {
        if (showModal && modalRef.current) {
            // Store currently focused element
            previouslyFocusedElement.current = document.activeElement as HTMLElement;
            
            // Focus close button
            closeButtonRef.current?.focus();
            
            // Prevent body scroll
            document.body.classList.add('modal-open');
            
            return () => {
                document.body.classList.remove('modal-open');
            };
        }
    }, [showModal]);

    // Only mount and check on client side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Auto-show modal after delay (only once per session)
    useEffect(() => {
        if (!isMounted || page !== "") return;
        
        // Check if modal was already shown in this session
        const wasShown = sessionStorage.getItem('industries-modal-shown') === 'true';
        if (wasShown) return;
        
        // Delay showing modal to not block initial render
        const timer = setTimeout(() => {
            setShowModal(true);
            // Mark modal as shown when it appears
            sessionStorage.setItem('industries-modal-shown', 'true');
        }, 1500); // Slightly longer delay to ensure page is interactive

        return () => clearTimeout(timer);
    }, [page, isMounted]);

    if (!isMounted || !showModal || page !== "") return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div
                ref={modalRef}
                className="relative mx-auto w-[96%] max-w-[96%] bg-white shadow-lg sm:max-w-[500px] md:max-w-[550px] lg:w-[840px] lg:max-w-[840px] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                        <button
                            aria-label="close"
                            onClick={handleCloseModal}
                            className="cursor-pointer absolute top-2 right-2 sm:top-3 sm:right-3 md:top-5 md:right-5 opacity-50 hover:opacity-100 z-50"
                        >
                            <svg
                                className="fill-[#5C5C5C] w-7 h-7 md:w-9 md:h-9"
                                viewBox="0 0 36 36"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M18 31.5C10.544 31.5 4.5 25.4561 4.5 18C4.5 10.544 10.544 4.5 18 4.5C25.4561 4.5 31.5 10.544 31.5 18C31.5 25.4561 25.4561 31.5 18 31.5ZM18 28.8C20.8643 28.8 23.6114 27.6621 25.6368 25.6368C27.6621 23.6114 28.8 20.8643 28.8 18C28.8 15.1357 27.6621 12.3886 25.6368 10.3632C23.6114 8.33785 20.8643 7.2 18 7.2C15.1357 7.2 12.3886 8.33785 10.3632 10.3632C8.33785 12.3886 7.2 15.1357 7.2 18C7.2 20.8643 8.33785 23.6114 10.3632 25.6368C12.3886 27.6621 15.1357 28.8 18 28.8ZM18 16.0911L21.8178 12.272L23.7281 14.1822L19.9089 18L23.7281 21.8178L21.8178 23.7281L18 19.9089L14.1822 23.7281L12.272 21.8178L16.0911 18L12.272 14.1822L14.1822 12.272L18 16.0911Z" />
                            </svg>
                        </button>

                        <article className="flex flex-col">
                            <header className="px-4 pt-4 md:px-4 md:pt-4">
                                <h2
                                    id="modal-title"
                                    className="font-gilroy-semibold text-center text-base font-semibold text-[#171717] md:text-lg lg:text-xl"
                                >
                                    Please select your industry
                                </h2>
                                <p id="modal-description" className="sr-only">
                                    Choose your industry to view relevant solutions and services.
                                </p>
                            </header>

                            <section className="px-2 py-4 md:px-4">
                                <nav aria-label="Industry solutions">
                                    <ul className="grid grid-cols-2 gap-1 sm:gap-2 md:grid-cols-3">
                                        {solutions.map((item, index) => (
                                            <li 
                                                key={`${item.name}-${index}`} 
                                                className={index === solutions.length - 1 ? 'col-span-2 w-1/2 mx-auto md:col-span-1 md:w-full md:mx-0' : 'w-full'}
                                            >
                                                <Link
                                                    href={item.href}
                                                    onClick={handleCloseModal}
                                                    className="group flex flex-col items-center overflow-hidden rounded-md p-1 text-center transition-colors hover:bg-[#F9FAFB] md:p-3"
                                                    aria-label={`${item.name}: ${item.learnmore}`}
                                                >
                                                    <figure className="relative mb-2 w-full overflow-hidden rounded-md md:rounded-lg">
                                                        <ImageComponent
                                                            src={item.image}
                                                            alt={`${item.name} solution illustration`}
                                                            width={200}
                                                            height={120}
                                                            cdn={false}
                                                            sizes="(max-width: 1024px) 50vw, 200px"
                                                            loading="lazy"
                                                            className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-white opacity-30 transition-opacity duration-300 group-hover:opacity-0 rounded-md md:rounded-lg"></div>
                                                    </figure>
                                                    <h3 className="mb-1 text-[#171717] md:mb-2 font-semibold text-[19.53px] leading-[19.53px] tracking-[-0.01em]">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-[#5C5C5C] font-normal text-[12.39px] leading-[140%] tracking-[0%] text-center align-middle">
                                                        {item.learnmore.split('|').map((part, index, array) => (
                                                            <span key={index}>
                                                                {part}
                                                                {index < array.length - 1 && <br />}
                                                            </span>
                                                        ))}
                                                    </p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </section>

                            <footer className="flex justify-center pb-4 pt-2">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="font-gilroy-semibold text-sm font-medium text-[#5C5C5C] underline decoration-1 underline-offset-2 transition-colors hover:text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#335CFF] focus:ring-offset-2 md:text-base"
                                >
                                    Skip
                                </button>
                            </footer>
                        </article>
                    </div>
                </div>
    );
});

IndustriesMenu.displayName = 'IndustriesMenu';

export default IndustriesMenu;