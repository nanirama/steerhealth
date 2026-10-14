import React from 'react';

const ContentHighlightSection = ({
  data
}:any) => {
  const { heading, description, contentAlign } = data;
  // Use Tailwind text alignment classes based on contentAlign prop
  const alignmentClass = contentAlign === 'center' ? 'text-center  justfiy-center items-center' : 'text-left justify-start items-start';

  return (
    <section className="md:py-20 py-10 bg-white flex justfiy-center items-center">
      <div className={`max-w-[1200px] mx-auto px-12 flex flex-col ${alignmentClass}`}>
        <h2 className="text-4xl md:text-[60px] leading-[100%] text-[#171717] font-semibold font2 mb-6">
          {heading}
        </h2>
        <p className="text-2xl text-[#5C5C5C] max-w-5xl">
          {description}
        </p>
      </div>
    </section>
  );
};

export default ContentHighlightSection;
