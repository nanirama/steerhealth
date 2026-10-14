// components/BlogHeader.tsx
import React from "react";
import Link from "next/link";

const BlogHeader = () => {
  return (
    <header className="w-full bg-transparent">
      <div className="lg:max-w-[1336px] w-full mx-auto flex sm:flex-row flex-col gap-4 items-center justify-between px-4 py-3">
        {/* Title */}
        <div className="">
          <Link href="/blog" className="sm:text-2xl text-xl font2 font-semibold text-[#171717] cursor-pointer">SteerBlogs</Link>
        </div>

        {/* Search Box */}
        <div className="relative overflow-hidden w-[180px] sm:w-[280px] rounded-[8px] border border-[#E4E4E4] px-4 py-2.5  flex flex-row gap-3 items-center justify-start">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_13771_12933)">
              <path d="M17.8688 16.6317L14.419 13.1007C17.9758 8.59932 15.7976 1.83441 10.2686 0.307674C3.18457 -1.64858 -2.64353 6.12165 1.24651 12.3613C3.74788 16.3733 8.82687 17.2644 12.7274 14.6869C12.8201 14.6262 13.0417 14.4065 13.1302 14.4297L16.438 17.7272L16.9006 18H17.2789C17.8835 17.8132 18.1941 17.2164 17.8688 16.6317ZM14.0011 10.1998C12.3293 14.9908 5.82624 15.8473 2.936 11.6802C0.194055 7.72636 2.76747 2.17541 7.56081 1.82176C12.1376 1.48455 15.5199 5.84766 14.0011 10.1998Z" fill="#5C5C5C" />
            </g>
            <defs>
              <clipPath id="clip0_13771_12933">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <input
            type="text"
            placeholder="Search SteerBlogs"
            className="w-[180px] bg-transparent text-sm font-medium text-[#5C5C5C] "
          />
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
