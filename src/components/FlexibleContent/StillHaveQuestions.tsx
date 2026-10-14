import React from "react";
import Link from "next/link";
import ImageComponent from '@/components/Elements/ImageComponent';
const StillHaveQuestions = ({ data }) => {
    return (
        <>
            <div className="w-full pb-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 bg-[#FAFAFA] rounded-lg">
                    <div className="flex flex-col items-center gap-4 py-8">
                        <ImageComponent
                            src="avator_img.webp"
                            alt="avaitor_img"
                            width={124}
                            height={60}
                            className="w-[120px]"
                            sizes="(min-width: 1440px) 120px, (min-width: 1024px) 90vw, (min-width: 768px) 100vw"
                        />
                        {data?.stillHaveQuestionHeading && (
                            <h3 className="text-[#181D27] text-2xl text-center font2 font-medium leading-[120%]">{data?.stillHaveQuestionHeading}</h3>
                        )}
                        {data?.stillHaveQuestionSubHeading && (
                            <p className="text-xl text-center leading-[140%] text-[#535862] font3">{data?.stillHaveQuestionSubHeading}</p>
                        )}
                        {/* <h3 className="text-[#181D27] text-2xl text-center font2 font-medium leading-[120%]">{data?.stillHaveQuestionHeading}</h3>
                        <p className="text-xl text-center leading-[140%] text-[#535862] font3">{data?.stillHaveQuestionSubHeading}</p> */}
                        <div className="inline-flex mt-4">
                            <Link href="#" className="text-center rounded-lg text-white bg-[#335CFF] font3 text-sm leading-[20px] font-medium px-2 py-2">Get In Touch</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default StillHaveQuestions