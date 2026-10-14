'use client';
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';

export default function LazyVideo({
    srcWebm,
    srcMp4,
    poster,
    className = '',
    width,
    height,
    alt = 'Background video',
    ...props
}) {
    const videoRef = useRef(null);
    const [hasPlayed, setHasPlayed] = useState(false);

    //srcWebm={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/videos/${item.videoUrl}`}

    useEffect(() => {
        const playVideo = () => {
            if (videoRef.current) {
                videoRef.current.play().then(() => {
                    setHasPlayed(true);
                }).catch((err) => {
                    console.warn('Autoplay failed:', err);
                });
            }
        };

        // Play immediately, assuming video is in the viewport and critical
        playVideo();
    }, []);

    return (
        <>
            <Head>
                {/* Preload poster for FCP */}
                <link rel="preload" as="image" href={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/videos/${poster}`} imagesrcset={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/videos/${poster}`} />

                {/* Preload both video sources */}
                {srcWebm && (
                    <link rel="preload" as="video" href={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/videos/${srcWebm}`} type="video/webm" />
                )}
                {srcMp4 && (
                    <link rel="preload" as="video" href={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/videos/${srcMp4}`} type="video/mp4" />
                )}
            </Head>

            <video
                ref={videoRef}
                className={className}
                width={width}
                height={height}
                loop
                muted
                playsInline
                autoPlay
                preload="auto"
                poster={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/videos/${poster}`}
                {...props}
            >
                {srcWebm && <source src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/videos/${srcWebm}`} type="video/webm" />}
                {srcMp4 && <source src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/videos/${srcMp4}`} type="video/mp4" />}
            </video>

            {/* Fallback image for FCP visibility when JS is off or autoplay fails */}
            {!hasPlayed && (
                <noscript>
                    <img
                        src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/videos/${poster}`}
                        alt={alt}
                        width={width}
                        height={height}
                        className={className}
                        loading="eager"
                    />
                </noscript>
            )}
        </>
    );
}
