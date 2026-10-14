"use client";

import { useState } from "react";
import Image from "next/image";

export default function YouTubePlayer({ videoId }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group relative w-full h-full"
          aria-label="Play video"
        >
          <Image
            src={`/images/event-img.webp`}
            alt="Video thumbnail"
            fill
            priority={false}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/20 transition" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white flex justify-center items-center rounded-full p-4 shadow-lg group-hover:scale-110 transition w-[60px] h-[60px]">
              ▶
            </div>
          </div>
        </button>
      ) : (
        <iframe
          src={videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          loading="lazy"
        />
      )}
    </div>
  );
}
