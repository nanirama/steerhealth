import React from 'react';

const MetricItem = ({ label, value, description, trendDirection, isLast }:any) => (
  <>
    <div
      className={`md:w-[32%] flex flex-col items-center justify-center sm:px-8 px-5 text-center sm:mt-10 my-8 ${
        !isLast ? 'border-r-2 border-white/10' : ''
      }`}
    >
      {/* Badge Label */}
      <div className="mb-4 inline-flex items-center rounded-full bg-[#7D52F4] px-2 py-1 backdrop-blur-sm ">
        <span className="font-medium text-[13.07px] leading-[14.26px] tracking-[0.02em] font3 uppercase text-white">
          {label}
        </span>
      </div>

      {/* Main Metric with Trend */}
      <div className="mb-2 flex items-center justify-center gap-3">
        <h3 className="text-[71.28px] leading-[100%] tracking-normal font-gilroy-semibold text-white">{value}</h3>
        
        {/* Trend Indicator */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 lg:h-14 lg:w-14 ${
          trendDirection === 'up' 
            ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
            : 'bg-gradient-to-br from-green-400 to-emerald-500'
        }`}>
          {trendDirection === 'up' ? (
            <svg className="h-6 w-6 text-white lg:h-7 lg:w-7" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg className="h-6 w-6 text-white lg:h-7 lg:w-7" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-[23.73px] leading-[31.2px] font-gilroy-semibold text-white ">{description}</p>
    </div>
    
    {/* Vertical Divider - only if not last item */}
    {!isLast && (
      <div className="hidden h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block"></div>
    )}
    
    {/* Horizontal Divider for mobile */}
    {!isLast && (
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent lg:hidden"></div>
    )}
  </>
);

const MetricsStatsSection = () => {
  const metrics = [
    {
      label: 'SMARTER GROWTH',
      value: '+21%',
      description: 'Capacity Utilization',
      trendDirection: 'up'
    },
    {
      label: 'STRONGER MARGINS',
      value: '-18',
      description: 'AR Days',
      trendDirection: 'down'
    },
    {
      label: 'CAPACITY OPTIMIZATION',
      value: '87%',
      description: 'Denial Reduction*',
      trendDirection: 'up'
    }
  ];

  return (
    <section className="relative w-full overflow-hidden  py-4 px-4 sm:px-4 lg:px-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-blue-600/5 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-600/5 blur-3xl"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Single Card with all metrics */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0F2C]/40 backdrop-opacity-80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-blue-500/5">
        {/* <div className="bg-[#0A0F2C]/40 backdrop-opacity-80 group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A0F2C]/90 to-[#0A0F2C]/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10"> */}
          
          {/* Metrics Grid */}
          <div className="flex flex-col items-stretch lg:flex-row lg:items-center lg:divide-x-0">
            {metrics.map((metric, index) => (
              <MetricItem
                key={index}
                label={metric.label}
                value={metric.value}
                description={metric.description}
                trendDirection={metric.trendDirection}
                isLast={index === metrics.length - 1}
              />
            ))}
          </div>
          <p className="text-center text-white/60 text-[14px] italic px-4 pb-4">Aggregated customer-reported outcomes; results vary by site.</p>


          {/* Decorative circuit lines - right side */}
          <div className="pointer-events-none absolute -right-4 top-0 h-full w-1/3 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 200 200" fill="none" preserveAspectRatio="none">
              <defs>
                <pattern id="diagonalLines" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#diagonalLines)"/>
            </svg>
          </div>
          
          {/* Bottom glow effect */}
          <div className="pointer-events-none absolute -bottom-10 left-1/2 h-20 w-3/4 -translate-x-1/2 rounded-full bg-blue-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
      </div>

      {/* Background diagonal pattern overlay */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20">
        <svg className="h-full w-full" viewBox="0 0 400 200" fill="none" preserveAspectRatio="none">
          <defs>
            <pattern id="bgDiagonalLines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="400" height="200" fill="url(#bgDiagonalLines)"/>
        </svg>
      </div>
    </section>
  );
};

export default MetricsStatsSection;