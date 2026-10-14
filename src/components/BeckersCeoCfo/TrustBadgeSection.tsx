import React from 'react';

const TrustBadgeSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b py-4 px-4 sm:px-4 lg:px-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-600/5 blur-3xl"></div>
        <div className="absolute right-1/3 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-purple-600/5 blur-3xl"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Single Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A0F2C]/90 to-[#0A0F2C]/70 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 sm:p-10 lg:p-12">
          {/* Top Row - Icons */}
          <div className="mb-6 flex items-center justify-between">
            {/* Left - Shield Icon */}
            <div className="flex-shrink-0">
              <div className="flex h-[46px] w-[42px] items-center justify-center ">
                <svg width="43" height="47" viewBox="0 0 43 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.3178 15.2098C42.1638 15.1143 42.225 14.8618 42.2231 14.7076C42.1935 12.3601 42.1424 9.89505 41.8437 7.56955C41.7185 6.59915 41.6387 5.50571 40.4671 5.26793L21.4922 0H20.751L1.63512 5.31016C0.932898 5.50939 0.665737 6.02627 0.522881 6.68361C0.175943 8.27188 0.191713 10.4 0.11008 12.0479C-0.199752 18.2909 0.0256647 25.4675 2.35404 31.3615C4.98762 38.0268 12.1499 43.8722 18.8521 46.2739C21.0108 47.0469 21.2316 47.0478 23.3911 46.2739C30.0924 43.8722 37.2556 38.0268 39.8892 31.3615C41.776 26.5857 42.1972 21.1002 42.3178 16.0342C42.3243 15.7606 42.3122 15.4834 42.3178 15.2098ZM33.6017 17.1644L20.0117 30.5582C19.495 30.7868 18.8605 30.7556 18.3902 30.4214L10.1982 22.313C9.69076 21.7915 9.60356 21.214 9.90597 20.5549C10.1017 20.1279 11.6314 18.6067 12.0572 18.3772C12.8559 17.9475 13.4152 18.1164 14.0887 18.6452L19.3169 23.8214L29.4031 13.8336C29.7501 13.5536 30.0757 13.2589 30.5432 13.2139C30.8067 13.1882 31.0599 13.2387 31.302 13.3332C31.7714 13.515 33.5822 15.297 33.7556 15.7588C33.9291 16.2169 33.8586 16.7531 33.6017 17.1644Z" fill="white"/>
                </svg>
              </div>
            </div>

            {/* Right - Compliance badges */}
            <div className="flex flex-wrap items-center gap-3">
              {/* SOC 2 Badge */}
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg transition-all duration-300 hover:shadow-xl">
               <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.7131 11.7021H5.08571C3.93165 11.7021 2.99609 12.6377 2.99609 13.7918V21.1054C2.99609 22.2595 3.93165 23.1951 5.08571 23.1951H19.7131C20.8671 23.1951 21.8027 22.2595 21.8027 21.1054V13.7918C21.8027 12.6377 20.8671 11.7021 19.7131 11.7021Z" stroke="#122368" strokeWidth="2.57348" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.17969 11.7031V7.52385C7.17969 6.13835 7.73008 4.80959 8.70978 3.82989C9.68948 2.85019 11.0182 2.2998 12.4037 2.2998C13.7892 2.2998 15.118 2.85019 16.0977 3.82989C17.0774 4.80959 17.6278 6.13835 17.6278 7.52385V11.7031" stroke="#122368" strokeWidth="2.57348" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                <span className="font-inter text-[21.94px] leading-[30.88px] font-bold text-[#122368] tracking-[-1.57px]">SOC 2</span>
              </div>

              {/* HIPAA Badge */}
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg transition-all duration-300 hover:shadow-xl">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.7599 13.7971C20.7599 19.0211 17.1031 21.6332 12.7567 23.1481C12.5291 23.2253 12.2819 23.2216 12.0567 23.1377C7.6998 21.6332 4.04297 19.0211 4.04297 13.7971V6.48342C4.04297 6.20632 4.15305 5.94057 4.34899 5.74463C4.54493 5.54869 4.81068 5.43861 5.08778 5.43861C7.1774 5.43861 9.78942 4.18484 11.6074 2.59673C11.8287 2.40762 12.1103 2.30371 12.4014 2.30371C12.6926 2.30371 12.9742 2.40762 13.1955 2.59673C15.0239 4.19529 17.6255 5.43861 19.7151 5.43861C19.9922 5.43861 20.258 5.54869 20.4539 5.74463C20.6498 5.94057 20.7599 6.20632 20.7599 6.48342V13.7971Z" stroke="#122368" strokeWidth="2.57348" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-inter text-[21.94px] leading-[30.88px] font-bold text-[#122368] tracking-[-1.57px]">HIPAA</span>
              </div>
            </div>
          </div>

          {/* Bottom Row - Text Content */}
          <div>
            <h3 className="text-xl font-gilroy-semibold md:leading-[43.1px] leading-normal text-white sm:text-2xl align-middle lg:text-[39.82px] tracking-[-0.8px]">
              Trusted by 476 facilities <br/>5,960 providers, and 19.8M Patients
            </h3>
          </div>

          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-4 top-0 h-full w-1/4 opacity-5">
            <svg className="h-full w-full" viewBox="0 0 100 200" fill="none" preserveAspectRatio="none">
              <path d="M0 0L20 0L20 30L40 30" stroke="currentColor" strokeWidth="1" className="text-blue-400"/>
              <path d="M0 40L30 40L30 70L50 70" stroke="currentColor" strokeWidth="1" className="text-blue-400"/>
              <path d="M0 80L25 80L25 110L45 110" stroke="currentColor" strokeWidth="1" className="text-blue-400"/>
              <path d="M0 120L35 120L35 150L55 150" stroke="currentColor" strokeWidth="1" className="text-blue-400"/>
            </svg>
          </div>

          {/* Bottom glow effect */}
          <div className="pointer-events-none absolute -bottom-10 left-1/2 h-20 w-3/4 -translate-x-1/2 rounded-full bg-blue-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
      </div>

      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
    </section>
  );
};

export default TrustBadgeSection;