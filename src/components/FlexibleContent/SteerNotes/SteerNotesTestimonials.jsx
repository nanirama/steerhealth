import React from "react";

const SteerNotesTestimonials = ({ data }) => {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {data?.heading && (
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#171717] text-center font2 leading-tight">
            {data.heading}
          </h2>
        )}
      </div>
    </section>
  );
};

export default SteerNotesTestimonials;
