// components/PageOptimizationWrapper.js
'use client';
import { useEffect } from 'react';
import Head from 'next/head';

const PageOptimizationWrapper = ({ 
  heroImageUrl, 
  heroMobileImageUrl
}) => {
  useEffect(() => {
    // Preload critical hero images
    const imagesToPreload = [
      heroImageUrl,
      heroMobileImageUrl
    ].filter(Boolean);

    imagesToPreload.forEach(imageUrl => {
      if (imageUrl) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = imageUrl;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      }
    });

    // Cleanup function to remove preload links
    return () => {
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
      preloadLinks.forEach(link => {
        if (imagesToPreload.includes(link.href)) {
          link.remove();
        }
      });
    };
  }, [heroImageUrl, heroMobileImageUrl]);

  return (
    <>
      <Head>
        {/* Preconnect to external domains */}
        <style jsx>{`
          /* Critical CSS for above-the-fold content */
          .hero-section {
            min-height: 550px;
            background-color: #ffffff;
          }
          
          /* Prevent layout shift */
          .hero-image-container {
            aspect-ratio: 12/5;
            width: 100%;
          }
          
          @media (max-width: 767px) {
            .hero-image-container {
              aspect-ratio: 7/10; /* Updated to match your 700x1000 dimensions */
            }
          }
        `}</style>
      </Head>
    </>
  );
};

export default PageOptimizationWrapper;