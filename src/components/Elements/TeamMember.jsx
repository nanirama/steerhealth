"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image"
import { urlForImage } from '@/sanity/lib/utils';
import { PortableText } from '@portabletext/react';

const StateButton = ({ onClick }) => {
    const [buttonState, setButtonState] = useState('rest'); // 'rest', 'hover', 'pressed'

    const handleMouseEnter = () => {
        if (buttonState !== 'pressed') {
            setButtonState('hover');
        }
    };

    const handleMouseLeave = () => {
        if (buttonState !== 'pressed') {
            setButtonState('rest');
        }
    };

    const handleMouseDown = () => {
        setButtonState('pressed');
    };

    const handleMouseUp = () => {
        setButtonState('hover');
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        // Reset to rest state after click
        setTimeout(() => {
            setButtonState('rest');
        }, 150);
    };

    const getIconPath = () => {
        switch (buttonState) {
            case 'hover':
                return '/images/next-hover-state.svg';
            case 'pressed':
                return '/images/next-pressed-state.svg';
            default:
                return '/images/next-rest-state.svg';
        }
    };

    return (
        <motion.button
            className="w-[36px] h-[36px] flex items-center justify-center transition-all duration-200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            whileTap={{ scale: 1 }}
            style={{
                transform: buttonState === 'pressed' ? 'scale(1)' : 'scale(1)',
            }}
        >
            <div className="relative w-[36px] h-[36px]">
                <Image
                    src={getIconPath()}
                    alt="Action button"
                    fill
                    className="object-contain transition-all duration-200"
                />
            </div>
        </motion.button>
    );
};

const TeamMember = ({ member, idx }) => {
    const [selected, setSelected] = useState(null);
    const [hover, sethover] = useState(-1);



    useEffect(() => {
        if (selected) {
            // Prevent body scroll when modal is open - Use classList to prevent forced reflows
            document.body.classList.add('modal-open');

            // Cleanup function to restore body scroll when modal closes
            return () => {
                document.body.classList.remove('modal-open');
            };
        }

    }, [selected]);


    const imageUrl = member?.profileImage &&
        urlForImage(member?.profileImage)
            ?.width(1000)  // Reduced from 1200 (33% smaller)
            ?.height(1200)
            .format('webp')
            ?.fit('crop')
            .crop("top")
            ?.quality(95) // Add quality optimization
            ?.url();

    const blurImageUrl = member?.profileImage &&
        urlForImage(member?.profileImage)
            ?.height(20)
            ?.width(20)
            ?.blur(20)
            .format('webp')
            ?.fit('crop')?.url();


    const mImageUrl = member?.profileImage &&
        urlForImage(member?.profileImage)
            ?.width(740)  // Reduced from 1200 (33% smaller)
            ?.height(1240)
            .format('webp')
            ?.fit('crop')
            .crop("top")
            ?.quality(95) // Add quality optimization
            ?.url();

    const mBlurImageUrl = member?.profileImage &&
        urlForImage(member?.profileImage)
            ?.height(31)
            ?.width(19)
            ?.blur(20)
            .format('webp')
            ?.fit('crop')?.url();



    const mobileImageUrl = member?.profileImage &&
        urlForImage(member?.profileImage)
            ?.width(800)  // Reduced from 1200 (33% smaller)
            ?.height(800)
            .format('webp')
            ?.fit('crop')
            .crop("top")
            ?.quality(95) // Add quality optimization
            ?.url();

    const mobileBlurImageUrl = member?.profileImage &&
        urlForImage(member?.profileImage)
            ?.height(25)
            ?.width(25)
            ?.blur(20)
            .format('webp')
            ?.fit('crop')?.url();
    //return false;

    const handleButtonClick = () => {
        // You can customize this action based on your needs
        setSelected(member);
        // Or any other action you want to perform
    };
    return (
        <>
            <div className="max-w-[300px] bg-white rounded-[36px] group  w-full mx-auto relative">

                <motion.div
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelected(member)}
                    className="relative overflow-hidden mx-auto lg:rounded-[36px] md:rounded-[24px] rounded-[18px] cursor-pointer duration-300 w-full min-h-[410px]"
                    onMouseOver={() => sethover(idx)}
                    onMouseOut={() => sethover(-1)}
                >

                    {imageUrl && blurImageUrl && (
                        <Image
                            src={imageUrl}
                            alt={member.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover absolute transition-all duration-500"
                            style={{
                                clipPath: `${hover === idx ? 'circle(100% at 50% 40%)' : 'circle(37% at 50% 40%)'}`,
                            }}
                            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 80vw,
                   500px"
                            placeholder="blur"
                            blurDataURL={blurImageUrl}
                        />
                    )}

                    {/* Gradient Overlay */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 w-full h-[40%] bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 ${hover === idx ? 'opacity-50' : 'opacity-0'
                            }`}
                    ></div>

                    {/* Top-left Briefcase Icon */}
                    {member?.skillBadge && member.skillBadge?.icon && (
                        <div className="absolute top-1 left-2 p-3 text-blue-600 text-xl z-10">
                            <div className="relative w-[26px] h-[26px] flex items-center justify-center">
                                <Image
                                    src={hover === idx ? member.skillBadge?.hoverIcon : member.skillBadge?.icon}
                                    fill
                                    alt={member.name}
                                    className="max-w-[26px] max-h-[26px] object-contain"
                                />
                            </div>
                        </div>
                    )}


                    {/* Bottom Info Section */}
                    <div className="absolute left-0 w-full -bottom-[10px] pb-4 mt-4 px-3">
                        {member?.name && (
                            <h3 className={`${hover === idx ? 'text-white' : 'text-black'} text-[21px] text-black font2 font-bold duration-700 group-hover:text-white transition-colors`}>
                                {member?.name}
                            </h3>
                        )}
                        <div className="text-left z-20 relative pb-3">
                            {member?.jobTitle && (
                                <p className={`${hover === idx ? 'text-white' : 'text-[#64717E]'} text-[16px] font3 max-w-[14rem] font-light duration-700 group-hover:text-white transition-colors`}>
                                    {member?.jobTitle}
                                </p>
                            )}
                        </div>
                        <div className="absolute right-2 bottom-8">
                            <StateButton onClick={handleButtonClick} />
                            {/* <svg width="40" height="40" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="27" cy="27" r="27" fill="#E1E1E4" />
                                <path d="M34.2122 25.4832L25.1836 16.4672C24.224 15.5075 22.6717 15.5123 21.7154 16.4735C20.7588 17.4356 20.7621 18.9925 21.7218 19.9506L29.0064 27.225L21.7218 34.4993C20.7621 35.4575 20.7588 37.0143 21.7154 37.9764C22.1944 38.459 22.8235 38.7 23.4527 38.7C24.0786 38.7 24.7046 38.4615 25.1836 37.9828L34.2122 28.9667C34.6736 28.5058 34.9339 27.8789 34.9339 27.225C34.9339 26.5711 34.6736 25.9444 34.2122 25.4832Z" fill="#626263" />
                            </svg> */}
                        </div>
                    </div>
                </motion.div>

            </div>
            {/* Modal */}
            {selected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 top-0 left-0 flex items-center justify-center z-50 backdrop-blur-xs"
                    onClick={() => setSelected(null)}
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white lg:rounded-[36px] md:rounded-[24px] rounded-[18px] overflow-hidden flex flex-col md:flex-row gap-0 lg:max-w-[800px] md:max-w-[700px] max-w-full md:mx-0 mx-5 w-full relative h-[98vh] md:h-[520px] md:shadow-none shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            aria-label="close"
                            onClick={() => setSelected(null)}
                            className="cursor-pointer absolute md:top-5 md:right-5 top-2 right-2 opacity-50 hover:opacity-100 z-50"
                        >
                            {/* <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 31.5C10.544 31.5 4.5 25.4561 4.5 18C4.5 10.544 10.544 4.5 18 4.5C25.4561 4.5 31.5 10.544 31.5 18C31.5 25.4561 25.4561 31.5 18 31.5ZM18 28.8C20.8643 28.8 23.6114 27.6621 25.6368 25.6368C27.6621 23.6114 28.8 20.8643 28.8 18C28.8 15.1357 27.6621 12.3886 25.6368 10.3632C23.6114 8.33785 20.8643 7.2 18 7.2C15.1357 7.2 12.3886 8.33785 10.3632 10.3632C8.33785 12.3886 7.2 15.1357 7.2 18C7.2 20.8643 8.33785 23.6114 10.3632 25.6368C12.3886 27.6621 15.1357 28.8 18 28.8ZM18 16.0911L21.8178 12.272L23.7281 14.1822L19.9089 18L23.7281 21.8178L21.8178 23.7281L18 19.9089L14.1822 23.7281L12.272 21.8178L16.0911 18L12.272 14.1822L14.1822 12.272L18 16.0911Z"
                                fill="#5C5C5C"
                                />
                            </svg> */}

                            <svg
                                className="fill-[#E5E5E5] md:fill-[#5C5C5C]"
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M18 31.5C10.544 31.5 4.5 25.4561 4.5 18C4.5 10.544 10.544 4.5 18 4.5C25.4561 4.5 31.5 10.544 31.5 18C31.5 25.4561 25.4561 31.5 18 31.5ZM18 28.8C20.8643 28.8 23.6114 27.6621 25.6368 25.6368C27.6621 23.6114 28.8 20.8643 28.8 18C28.8 15.1357 27.6621 12.3886 25.6368 10.3632C23.6114 8.33785 20.8643 7.2 18 7.2C15.1357 7.2 12.3886 8.33785 10.3632 10.3632C8.33785 12.3886 7.2 15.1357 7.2 18C7.2 20.8643 8.33785 23.6114 10.3632 25.6368C12.3886 27.6621 15.1357 28.8 18 28.8ZM18 16.0911L21.8178 12.272L23.7281 14.1822L19.9089 18L23.7281 21.8178L21.8178 23.7281L18 19.9089L14.1822 23.7281L12.272 21.8178L16.0911 18L12.272 14.1822L14.1822 12.272L18 16.0911Z" />
                            </svg>                        </button>

                        {/* Left side - Fixed height, no scroll */}
                        <div className={`md:h-full md:w-[40%] w-full mx-auto flex flex-col items-center md:justify-between justify-start relative md:h-full md:mt-0 !mt-0 md:gap-0 gap-0`}>
                            {mImageUrl && mBlurImageUrl && (
                                <div className={`md:w-full w-[200px] mx-auto !relative h-full md:block hidden`}>
                                    <Image
                                        src={mImageUrl}
                                        alt={member.name}
                                        width={370}
                                        height={620}
                                        className={`md:w-full w-[200px] object-cover md:rounded-none relative rounded-xl h-full`}
                                        sizes="(max-width: 640px) 100vw,
            (max-width: 1024px) 80vw,
            500px"
                                        placeholder="blur"
                                        blurDataURL={mBlurImageUrl}
                                    />
                                    <div
                                        className="absolute bottom-0 left-0 right-0 md:w-full w-[200px] h-[40%] mx-auto bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500"></div>
                                </div>
                            )}
                            {mobileImageUrl && mobileBlurImageUrl && (
                                <div className={`w-full mx-auto !relative md:hidden block`}>
                                    <Image
                                        src={mobileImageUrl}
                                        alt={member.name}
                                        width={800}
                                        height={800}
                                        className={`w-full object-cover md:rounded-none relative rounded-xl`}
                                        sizes="(max-width: 640px) max-h-[450px] 100vw,
            (max-width: 1024px) 80vw,
            800px"
                                        placeholder="blur"
                                        blurDataURL={mobileBlurImageUrl}
                                    />
                                    <div
                                        className="absolute bottom-0 left-0 right-0 w-full h-[30%] mx-auto bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500"></div>
                                </div>
                            )}



                        </div>

                        {/* Right side - Fixed height with scrollable content */}
                        <div className="w-full md:w-[60%] h-full flex flex-col my-4 overflow-y-scroll scrollbar-hide">
                            <div className="flex-1 sm:overflow-y-auto md:p-6 px-3 py-2 scrollbar-hide">
                                <div className="z-20 relative">
                                    <div className=" mb-5 w-full">
                                        <div className="flex flex-row items-start justify-start gap-4">
                                            {member?.name && <h3 className="md:text-[42px] text-[28px] md:leading-[102%] leading-[105%] text-[#5C5C5C] mb-1 mt-1 font4 md:max-w-[360px]">{member?.name}</h3>}
                                            {member?.linkedinUrl && (
                                                <div className="relative w-[34px] h-[34px] flex items-center justify-center group">
                                                    <a href={member?.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                                        <Image
                                                            src="/images/linkedin-icon.svg"
                                                            alt={member?.name || "LinkedIn"}
                                                            fill
                                                            className="object-contain transition-opacity duration-200 group-hover:opacity-0 md:mt-1"
                                                        />
                                                        {/* Hover icon */}
                                                        <Image
                                                            src="/images/linkedin-active-icon.svg"
                                                            alt={member?.name || "LinkedIn (active)"}
                                                            fill
                                                            className="object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:mt-1"
                                                        />
                                                    </a>
                                                </div>
                                            )}
                                        </div>

                                        {member?.jobTitle && <p className="text-[#5C5C5C] leading-[140%] text-[18px] font5">{member?.jobTitle}</p>}
                                    </div>

                                    <div className="text-base text-gray-800 space-y-4 md:pb-0 pb-8">
                                        {member?.bioDetails && <PortableText value={member?.bioDetails} components={{
                                            block: {
                                                normal: ({ children }) => <p className="text-[17px] leading-[160%] font-normal text-[#5C5C5C] mb-4 mt-1 font3">{children}</p>,
                                            },
                                            marks: {
                                                strong: ({ children }) => <strong className="text-[#5C5C5C] font-semibold ">{children}</strong>,
                                                em: ({ children }) => <em className="italic">{children}</em>,
                                            },
                                        }} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    )
}

export default TeamMember;