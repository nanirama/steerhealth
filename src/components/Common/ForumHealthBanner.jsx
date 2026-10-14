'use client';
import React, { useState, useCallback, memo, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Link to reduce initial bundle size
const Link = dynamic(() => import('next/link').then(mod => mod.default), {
  ssr: true
});

// Inline SVG component to avoid extra HTTP request
const CloseIcon = memo(() => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="text-white"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
));


CloseIcon.displayName = 'CloseIcon';

// Extracted content component for better React tree splitting
const BannerContent = memo(({ onClose }) => (
  <>
    {/* Main content */}
    <div className="flex md:flex-row flex-col items-center justify-center flex-1 text-white md:gap-4 gap-2">
      <a 
        target='_blank'
        rel="noopener noreferrer"
        href="https://a4m.steerhealth.io/" 
        className="text-base md:text-xl font-medium text-center"
        prefetch={false}
      >
        Steer Agentic AI, Your Always-On Digital Workforce. Ready to Work?
      </a>
      
      {/* Learn More Button */}
      <a 
        target='_blank'
        rel="noopener noreferrer"
        href="https://a4m.steerhealth.io/" 
        className="border border-white cursor-pointer group relative inline-flex flex-row sm:gap-2 gap-1 items-center justify-between leading-[24px] text-white font-medium rounded-[8px] md:py-2 py-1 px-4 sm:text-sm text-xs"
        prefetch={false}
      >
        Know More
      </a>
    </div>
    
    {/* Close Button */}
    <button 
      onClick={onClose}
      className="absolute md:top-5 md:right-4 top-2 right-2 p-1 hover:bg-white/20 rounded transition-colors duration-200"
      aria-label="Close banner"
      type="button"
    >
      <CloseIcon />
    </button>
  </>
));

BannerContent.displayName = 'BannerContent';

const ForumHealthBanner = memo(() => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:py-4 py-2.5 overflow-hidden w-full font-space-grotesk-regular tracking-[-2%] bg-[linear-gradient(89.46deg,_#1F9AE2_-2.91%,_#3591FA_35.18%,_#0030A6_72.19%,_#002175_108.67%)] flex items-center justify-center relative px-8">
      <Suspense fallback={<div className="w-full h-16" />}>
        <BannerContent onClose={handleClose} />
      </Suspense>
    </div>
  );
});

ForumHealthBanner.displayName = 'ForumHealthBanner';

export default ForumHealthBanner;