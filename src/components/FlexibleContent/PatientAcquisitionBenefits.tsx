import React from "react";
import ImageComponent from "../Elements/ImageComponent";
import ButtonComponent from "../Elements/ButtonComponent";

const PatientAcquisitionBenefits = ({ data }: any) => {
    return (
        <>
            <div className="w-full md:py-16 py-6 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:gap-6 gap-4 items-center">
                        {data?.heading && (
                            <h2 className="md:text-[60px] text-[38px] leading-[100%] text-[#171717]  font-semibold font2 md:max-w-3xl w-full text-center">{data?.heading}</h2>
                        )}

                        {data?.subHeading && (
                            <h3 className="md:text-2xl text-xl leading-[140%] text-[#5C5C5C]  text-center">{data?.subHeading}</h3>
                        )}
                    </div>
                    <div className="py-4">
                        {data?.imageUrl && (
                            <ImageComponent
                                src={`${data?.imageUrl}`}
                                alt="Discover Image"
                                width={1114}
                                height={335}
                                className="md:block hidden mx-auto"
                                priority={false}
                                sizes="(max-width: 768px) 100vw"
                            />
                        )}
                        {data?.imageUrlMobile && (
                            <ImageComponent
                                src={`${data?.imageUrlMobile}`}
                                alt="Discover Image"
                                width={931}
                                height={437}
                                className="w-full md:hidden block mx-auto"
                                priority={false}
                                sizes="(max-width: 768px) 100vw"
                            />
                        )}
                    </div>
                    <div className="flex flex-row flex-wrap gap-4 items-center justify-center">                        
                        {data?.ctaButtonPrimary && (
                            <ButtonComponent button={data?.ctaButtonPrimary} />
                        )}
                        {data?.ctaButtonSecondary && data?.ctaButtonSecondary?.buttontext && (
                            <ButtonComponent button={data?.ctaButtonSecondary} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default PatientAcquisitionBenefits