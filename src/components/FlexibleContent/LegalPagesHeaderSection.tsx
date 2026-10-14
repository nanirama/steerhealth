import React from 'react';

const LegalPagesHeaderSection = ({ data, page }: { data:any, page?:string}) => {

  let mainContainerFlex = 'items-start'
  let subHeadingMaxWidth = 'max-w-full md:mb-8 mb-3 text-left sm:text-right'
  let headingMaxWidth = 'max-w-full'
  if(page==='faq'){
    subHeadingMaxWidth = 'md:max-w-[240px] md:mb-8 mb-3 text-left'
  }
  if(page==='our-team'){
    mainContainerFlex = 'items-center'
    subHeadingMaxWidth = 'md:max-w-[400px] md:mb-8 mb-3 text-left'
    headingMaxWidth = 'md:max-w-[400px]'
  }
  if(page==='events'){
    mainContainerFlex = 'items-center'
    subHeadingMaxWidth = 'md:max-w-[640px] text-left py-4'
    headingMaxWidth = 'md:max-w-[640px]'
  }
  return (   
    <div className="relative w-full bg-white pt-4 md:pb-10 pb-6 px-4">
      <div className={`page-background max-w-[1366px] md:rounded-[20px] rounded-[10px] z-10 mx-auto px-8 py-6  flex  justify-between flex-wrap gap-y-4 ${mainContainerFlex}`}>
        <div className="md:max-w-[52%] max-w-full text-left sm:text-left w-full sm:w-auto">
          <h1 className={`${headingMaxWidth} lg:text-[60px] md:text-[44px] text-[36px] leading-[100%] font-semibold text-[#171717] font2 mb-2`}>
           {data?.title}
            </h1>
        </div>
        <div className={`text-2xl text-[#1D1718] leading-[140%] font3 md:max-w-2xl  ${subHeadingMaxWidth}`}>
          {data?.lastRevised}
        </div>
      </div>
    </div>
  );
};

export default LegalPagesHeaderSection;
