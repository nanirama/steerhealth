import React from 'react';
import ROICalculator from '@/components/ROICalculator';

interface RoiCalculatorProps {
  data?: {
    heading?: string;
    subHeading?: string;
  };
  page?: string;
  postType?: string;
}

const RoiCalculator: React.FC<RoiCalculatorProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className='w-full bg-white'>
    <section 
      className="w-full max-w-[1366px] mx-auto md:pb-16 md:pt-10 py-8 px-4"
      aria-labelledby={data.heading ? "roi-calculator-heading" : undefined}
    >
      {(data.heading || data.subHeading) && (
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          {data.heading && (
            <h2 
              id="roi-calculator-heading"
              className="text-2xl sm:text-3xl mb-2 font-bold font-interdisplay-light text-[#171717] leading-tight tracking-[1px] text-center"
            >
              {data.heading}
            </h2>
          )}
          {data.subHeading && (
            <p className="text-base md:text-lg text-[#5c5c5c] text-center max-w-3xl mb-4 mx-auto leading-relaxed">
              {data.subHeading}
            </p>
          )}
        </div>
      )}
      <ROICalculator />
    </section>
    </div>
  );
};

export default RoiCalculator;
