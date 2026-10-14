'use client';
import { useRef, useEffect, useState } from 'react';

export default function LazyDirectVideo({
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
            <video
                ref={videoRef}
                className={className}
                width={width}
                height={height}
                loop
                muted
                playsInline
                autoPlay
                preload="metadata"
                poster={`${poster}`}
                {...props}
            >
                {srcWebm && <source src={`${srcWebm}`} type="video/webm" />}
                {srcMp4 && <source src={`${srcMp4}`} type="video/mp4" />}
            </video>

            {/* Fallback image for FCP visibility when JS is off or autoplay fails */}
            {!hasPlayed && (
                <noscript>
                    <img
                        src={`${poster}`}
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
