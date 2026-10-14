import React from "react";

const EventFaqHeader = ({heading, subheading}) => {
    return (
        <>
            <div className="flex md:flex-row flex-col md:gap-4 gap-2 justify-between md:py-10 py-2 w-full overflow-hidden">
                {heading && (
                    <h2 className="lg:text-[60px] text-[40px] text-[#1D1718] font2 font-semibold leading-[100%] md:mb-6 mb-2">{heading}</h2>
                )}
                {subheading && (
                    <h3 className="text-2xl text-[#1D1718] leading-[140%] font3 md:mb-8 mb-3 md:max-w-sm md:text-right">{subheading}</h3>
                )}
            </div>
        </>
    )
}
export default EventFaqHeader