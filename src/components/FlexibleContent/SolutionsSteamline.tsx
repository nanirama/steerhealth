import React from "react";

const SolutionsSteamline = ({ data }:any) => {
    return (
        <>
            <div className="w-full bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:gap-28 gap-8 items-center">
                        <div className="border_gradient min-h-[800px] relative">
                            <div className="absolute sm:right-52 right-40 top-32 max-w-[16rem] text-right">
                                <h3 className="text-2xl text-[#171717] font2 font-semibold mb-2">Acquire</h3>
                                <p className="text-[#5C5C5C] sm:text-base text-sm font-medium">Turn every digital Interaction into a high-converting entryway.</p>
                            </div>
                            <div className="absolute sm:right-[24%] right-[30%] top-[46%] max-w-[16rem] text-right">
                                <h3 className="text-2xl text-[#171717] font2 font-semibold mb-2">Navigate</h3>
                                <p className="text-[#5C5C5C] sm:text-base text-sm font-medium">Guide patients to the best next step, boosting loyalty.</p>
                            </div>
                            <div className="absolute sm:right-[38%] right-[42%] sm:bottom-[14%] bottom-[18%] max-w-[16rem] text-right">
                                <h3 className="text-2xl text-[#171717] font2 font-semibold mb-2">Automate</h3>
                                <p className="text-[#5C5C5C] sm:text-base text-sm font-medium">AI agents manage repetitive tasks for your team.</p>
                            </div>
                        </div>
                        <div className="">
                            {data?.heading && (
                                <h2 className="lg:text-[60px] text-[40px] text-[#171717] md:text-left text-center font2 font-semibold leading-[100%]">{data?.heading}</h2>
                            )}
                            {data?.description && (
                                <p className="sm:text-2xl text-xl text-[#5C5C5C] md:text-left text-center font3 leading-[140%] mt-8 mb-4">{data?.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SolutionsSteamline