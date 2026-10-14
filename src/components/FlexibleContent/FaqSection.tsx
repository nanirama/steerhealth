'use client'
import React from "react";
import FAQList from "./FaqList";
import GetInTouch from "../Elements/GetInTouch";

const FaqSection = ({ data, page='' }: { data: any, page?: string }) => {
    if (!data) return null;

    const { faqsData } = data;
    return (
        <>
            <div className="w-full py-10 bg-white">
                <div className="max-w-[768px] mx-auto px-4">
                    {data?.heading && (
                        <h2 className="md:text-[36px] text-[30px] text-[#181D27] font2 font-semibold text-center leading-[120%] mb-6">{data?.heading}</h2>
                    )}
                    {data?.subheading && (
                        <h3 className="md:text-xl text-[16px] text-[#535862] leading-[140%] font3 text-center mb-8">{data?.subheading}</h3>
                    )}
                    <FAQList data={faqsData} />
                </div>
                {page !== "careers" || page !== "beckers-asc" && <GetInTouch page={page} />}
            </div>            
        </>
    )
}
export default FaqSection