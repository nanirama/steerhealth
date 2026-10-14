// components/ArticlePressContacts.tsx
import React from "react";
import Link from "next/link";

export const ArticlePressContacts = () => {
  return (
    <section className="w-full mx-auto border-b !border-[#D2D2D7] md:mt-4 mt-8 pb-12">
      {/* Title */}
      <h2 className="sm:text-[36px] text-[30px] leading-[32px] tracking-[-0.02em] font-semibold font2 text-black sm:leading-[120%] sm:mb-12 mb-10">
        Press Contacts
      </h2>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-6">
        {/* Contact 1 */}
        <div>
          <h3 className="sm:text-[19px] text-xl text-[#1D1D1F] font2 font-bold leading-snug mb-1">
            Subir Roy
          </h3>
          <p className="text-[14px] text-[#818181] font-medium leading-snug mb-1">
            SteerHealth
          </p>
          <Link
            href="mailto:subir@steerhealth.io"
            className="text-[14px] text-[#335CFF] underline font-medium hover:text-blue-800"
          >
            subir@steerhealth.io
          </Link>
        </div>

        {/* Contact 2 */}
        <div>
          <h3 className="sm:text-[19px] text-xl text-[#1D1D1F] font2 font-bold leading-snug mb-1">
            SteerHealth Helpline
          </h3>
          <Link
            href="mailto:hello@steerhealth.ai"
            className="text-[14px] text-[#335CFF] underline font-medium hover:text-blue-800"
          >
            hello@steerhealth.ai
          </Link>
        </div>

        {/* Contact 3 */}
        <div>
          <h3 className="sm:text-[19px] text-xl text-[#1D1D1F] font2 font-bold leading-snug mb-1">
            Pallabi Mohanty
          </h3>
           <p className="text-[14px] text-[#818181] font-medium leading-snug mb-1">
            SteerHealth
          </p>
          <Link
            href="mailto:pallabi@steerhealth.io"
            className="text-[14px] text-[#335CFF] underline font-medium hover:text-blue-800"
          >
           pallabi@steerhealth.io
          </Link>
        </div>
      </div>
    </section>
  );
};

