import React from 'react';

const FeatureCard = ({ icon, title, description }:any) => (
  <div className="relative overflow-hidden sm:rounded-3xl rounded-xl border border-white/10 bg-[#0A0F2C]/40 backdrop-opacity-80 sm:p-8 p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-blue-500/5">
    <div className="relative z-10">
      <div className="mb-4 inline-flex w-[42px] h-[42px]">
        {icon}
      </div>
      <h3 className="mb-3 text-2xl leading-[120%] font-medium font2 text-white border-b border-[#EFEFEF]/20 pb-4 ">{title}</h3>
      <p className="text-base font3 leading-[140%] text-white">{description}</p>
    </div>
    
    {/* Decorative circuit pattern overlay */}
    <div className="absolute right-0 top-0 h-full w-1/3 opacity-5">
      <svg className="h-full w-full" viewBox="0 0 100 200" fill="none">
        <path d="M50 0V50H100" stroke="currentColor" strokeWidth="0.5" className="text-blue-400"/>
        <path d="M0 100H50V150" stroke="currentColor" strokeWidth="0.5" className="text-blue-400"/>
        <path d="M50 150H100" stroke="currentColor" strokeWidth="0.5" className="text-blue-400"/>
      </svg>
    </div>
  </div>
);

const FeatureCardsSection = () => {
  const features = [
    {
      icon: (
       <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0625 9.1875V6.5625H14.4375V9.1875H9.1875C8.46263 9.1875 7.875 9.77513 7.875 10.5V31.5C7.875 32.2249 8.46263 32.8125 9.1875 32.8125H32.8125C33.5374 32.8125 34.125 32.2249 34.125 31.5V10.5C34.125 9.77513 33.5374 9.1875 32.8125 9.1875H27.5625V6.5625H24.9375V9.1875H17.0625ZM10.5 18.375H31.5V30.1875H10.5V18.375ZM10.5 11.8125H14.4375V13.125H17.0625V11.8125H24.9375V13.125H27.5625V11.8125H31.5V15.75H10.5V11.8125ZM18.2157 19.6408L21 22.4251L23.7841 19.6408L25.6403 21.4968L22.8561 24.2814L25.6402 27.0653L23.7842 28.9215L21 26.1375L18.2156 28.9215L16.3596 27.0652L19.1437 24.2814L16.3595 21.4968L18.2157 19.6408Z" fill="white"/>
</svg>

      ),
      title: 'Cleaner revenue capture',
      description: 'Verify benefits and authorizations early; collect pre-pay seamlessly.'
    },
    {
      icon: (
       <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.4 28.8752V36.7502H5.25V6.8252H35.3923C35.5304 6.82496 35.6661 6.86102 35.7858 6.92975C35.9055 6.99848 36.005 7.09747 36.0744 7.2168C36.1438 7.33613 36.1806 7.4716 36.1812 7.60964C36.1817 7.74768 36.1459 7.88343 36.0775 8.0033L30.45 17.8502L36.0775 27.6971C36.1459 27.817 36.1817 27.9527 36.1812 28.0908C36.1806 28.2288 36.1438 28.3643 36.0744 28.4836C36.005 28.6029 35.9055 28.7019 35.7858 28.7706C35.6661 28.8394 35.5304 28.8754 35.3923 28.8752H8.4ZM8.4 9.9752V25.7252H31.3225L26.8212 17.8502L31.3225 9.9752H8.4Z" fill="white"/>
</svg>
      ),
      title: 'Bank on Cost Savings',
      description: 'Lower administrative overhead powered by intelligent automation.'
    },
    {
      icon: (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 36.75C12.3013 36.75 5.25 29.6987 5.25 21C5.25 12.3013 12.3013 5.25 21 5.25C29.6987 5.25 36.75 12.3013 36.75 21C36.75 29.6987 29.6987 36.75 21 36.75ZM21 33.6C24.3417 33.6 27.5466 32.2725 29.9095 29.9095C32.2725 27.5466 33.6 24.3417 33.6 21C33.6 17.6583 32.2725 14.4534 29.9095 12.0905C27.5466 9.7275 24.3417 8.4 21 8.4C17.6583 8.4 14.4534 9.7275 12.0905 12.0905C9.7275 14.4534 8.4 17.6583 8.4 21C8.4 24.3417 9.7275 27.5466 12.0905 29.9095C14.4534 32.2725 17.6583 33.6 21 33.6ZM13.125 22.575H16.275C16.275 23.8281 16.7728 25.03 17.6589 25.9161C18.545 26.8022 19.7469 27.3 21 27.3C22.2531 27.3 23.455 26.8022 24.3411 25.9161C25.2272 25.03 25.725 23.8281 25.725 22.575H28.875C28.875 24.6636 28.0453 26.6666 26.5685 28.1435C25.0916 29.6203 23.0886 30.45 21 30.45C18.9114 30.45 16.9084 29.6203 15.4315 28.1435C13.9547 26.6666 13.125 24.6636 13.125 22.575ZM14.7 19.425C14.0734 19.425 13.4725 19.1761 13.0295 18.733C12.5864 18.29 12.3375 17.6891 12.3375 17.0625C12.3375 16.4359 12.5864 15.835 13.0295 15.392C13.4725 14.9489 14.0734 14.7 14.7 14.7C15.3266 14.7 15.9275 14.9489 16.3705 15.392C16.8136 15.835 17.0625 16.4359 17.0625 17.0625C17.0625 17.6891 16.8136 18.29 16.3705 18.733C15.9275 19.1761 15.3266 19.425 14.7 19.425ZM27.3 19.425C26.6734 19.425 26.0725 19.1761 25.6295 18.733C25.1864 18.29 24.9375 17.6891 24.9375 17.0625C24.9375 16.4359 25.1864 15.835 25.6295 15.392C26.0725 14.9489 26.6734 14.7 27.3 14.7C27.9266 14.7 28.5275 14.9489 28.9705 15.392C29.4136 15.835 29.6625 16.4359 29.6625 17.0625C29.6625 17.6891 29.4136 18.29 28.9705 18.733C28.5275 19.1761 27.9266 19.425 27.3 19.425Z" fill="white"/>
</svg>
      ),
      title: 'Enterprise-grade security',
      description: 'Works with Epic, Cerner, Athena, NextGen, P2P and more. HIPAA + SOC 2 Type II, BAA included.'
    }
  ];

  return (
    <section className="relative w-full overflow-hidden py-4 px-4 sm:px-4 lg:px-4 ">
      <h2 className="md:text-[60px] sm:text-[40px] text-[30px] md:leading-[100%] md:pb-28 pb-12 text-white leading-[130%] font2 font-semibold text-center w-full -tracking-[0.02em]">Why Health System Leaders Choose Steer? </h2>

      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-[18.65px] md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
    </section>
  );
};

export default FeatureCardsSection;