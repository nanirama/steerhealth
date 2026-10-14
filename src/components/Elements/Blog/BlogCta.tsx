// components/BlogCta.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogCta = () => {
  return (
    <section className="w-full bg-[#fafafc] py-12">
      <div className="max-w-[800px] mx-auto px-4 text-center">
        {/* Icon + Heading */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Image
            src="/images/logo-mobile-home.webp" // replace with actual icon path
            alt="Blog Icon"
            width={32}
            height={32}
          />
          <h2 className="text-[36px] font-semibold text-[#122368]">Blogs</h2>
        </div>

        {/* Description */}
        <p className="text-[#5C5C5C] font3 max-w-60 mx-auto text-[16px] mb-6">
          The latest news and updates, direct from Steer Health.
        </p>

        {/* Button */}
        <Link
          href="/blog"
          className="inline-block border border-[#335CFF] text-[#2F55EB] rounded-[8px] py-3 px-4 font-medium text-[16px] font-medium hover:bg-[#2F55EB] hover:text-white transition-colors"
        >
          Read More
        </Link>
      </div>
    </section>
  );
};

export default BlogCta;
