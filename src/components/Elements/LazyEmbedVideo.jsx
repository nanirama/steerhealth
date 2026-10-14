'use client';
import { useEffect, useState } from 'react';

export default function LazyEmbedVideo({
  src,
  title = 'Embedded video',
  ratio = '16/9',
  className = '',
  autoPlay = true
}) {
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    if (!src) return;

    let url = new URL(src);
    // YouTube autoplay params
    if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
      url.searchParams.set('autoplay', autoPlay ? '1' : '0');
      url.searchParams.set('mute', '1'); // Needed for autoplay without user interaction
      url.searchParams.set('playsinline', '1');
    }

    // Vimeo autoplay params
    if (url.hostname.includes('vimeo.com')) {
      url.searchParams.set('autoplay', autoPlay ? '1' : '0');
      url.searchParams.set('muted', '1');
    }

    setVideoSrc(url.toString());
  }, [src, autoPlay]);

  return (
   <div className={`w-full flex justify-center aspect-[16/9] ${className}`}>
      {videoSrc && (
    <iframe
          src={`${videoSrc}`}
          title={title}
          width={840}
          height={440}
          referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
}
