"use client";

import React from "react";
import TestimonialsSlider from "../Elements/TestimonialsSlider";

// Helper function to check if value is Portable Text
function isPortableText(value: any): boolean {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item: any) => typeof item === 'object' && item !== null && '_type' in item) &&
    value.some((item: any) => item._type === 'block')
  );
}

// Helper function to extract plain text from Portable Text blocks
function extractPlainText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';
  
  return blocks
    .map((block: any) => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children
        .map((child: any) => (typeof child === 'string' ? child : child.text || ''))
        .join('');
    })
    .join('\n')
    .trim();
}

// Helper function to normalize testimonial text
function normalizeTestimonial(testimonial: any): string {
  if (typeof testimonial === 'string') {
    return testimonial;
  }
  
  if (isPortableText(testimonial)) {
    return extractPlainText(testimonial);
  }
  
  // If it's an object with a text property, use that
  if (testimonial && typeof testimonial === 'object' && 'text' in testimonial) {
    return testimonial.text;
  }
  
  return '';
}

const TestimonialsSection = ({ data }: any) => {
  if (!data?.testimonials) return null;
  
  // Ensure testimonials is an array and normalize the testimonial field
  const normalizedTestimonials = Array.isArray(data.testimonials)
    ? data.testimonials.map((item: any) => ({
        ...item,
        testimonial: normalizeTestimonial(item?.testimonial),
      }))
    : [];
  
  if (normalizedTestimonials.length === 0) return null;
  
  return (
    <div className="w-full sm:py-8 py-4 md:bg-transparent bg-white px-4">
      <div className="pb-12 flex flex-col items-center justify-center gap-4">
        <h2 className="md:text-[60px] text-[40px] font4 leading-[120%] md:tracking-tight tracking-[-0.02em] text-[#335CFF] text-center max-w-full sm:py-0 py-2">What Happens When AI Does the Work</h2>
      </div>
      {/* <h2 className="pb-12 md:text-[54px] text-[40px] text-[#171717] font5 text-center tracking-tighter py-4 md:leading-[110%] leading-[42px]">
    What Happens When AI Does the Work
    </h2> */}
      <div className="max-w-7xl mx-auto md:px-4 ">
        <div className=" bg-white lg:px-6 md:pt-16 sm:pt-10 md:pb-0 pb-10 rounded-[20px] lg:h-[700px] overflow-hidden items-center ">
          <TestimonialsSlider data={normalizedTestimonials} />
          </div>
      </div>
    </div>
  );
};
export default TestimonialsSection;
