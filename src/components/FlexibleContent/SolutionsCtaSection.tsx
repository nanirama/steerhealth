import React from "react";
import ButtonComponent from "../Elements/ButtonComponent";

const WhereToStartSection = ({ data, page }: any) => {
    return (
        <>
            {/* <div className="w-full lg:py-40 py-20 start_bg relative "> */}
            <div className={`w-full lg:py-40 py-20 relative sm:overflow-auto overflow-hidden ${page === 'p2p-landingpage' ? 'bg_shadep2p !bg-[#114044]' : 'start_bg'} `}>

                <div className="max-w-7xl mx-auto px-4 text-center z-10 relative">
                    {data?.heading && (
                        <h2
                            className={`${page === "functional-medicine"
                                ? "md:text-[36px] sm:text-2xl text-xl leading-[120%] lg:max-w-[940px] mx-auto"
                                : "md:text-[36px] sm:text-2xl text-xl text-white leading-[140%] lg:max-w-[940px] mx-auto"
                                } text-[#525252] font2 font-semibold text-center`}
                        >
                            {data.heading}
                        </h2>
                    )}

                    {data?.subheading && (
                        <h3
                            className={`${page === "functional-medicine" ? "text-[#171717]" : "text-white/60"
                                } md:text-2xl sm:text-xl text-base font3 text-center max-w-xl mx-auto my-4`}
                        >
                            {data.subheading}
                        </h3>
                    )}

                    {data?.ctaButtonPrimary?.buttontext && (
                        <ButtonComponent button={data.ctaButtonPrimary} />
                    )}
                </div>
            </div>
        </>
    )
}
export default WhereToStartSection