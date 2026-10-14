import React from "react";
import Image from "next/image";
import LunaTrustImg1 from "../../../public/images/luna/luna-trust1.webp"
import LunaTrustImg2 from "../../../public/images/luna/luna-trust2.webp"
import LunaTrustImg3 from "../../../public/images/luna/luna-trust3.webp"
import LunaTrustImg4 from "../../../public/images/luna/luna-trust4.webp"


const LunaTrustedSection = () => {
    return (
        <>
            <div className="bg-white mx-auto px-4">
                <div className="md:max-w-[1400px] mx-auto w-full md:py-24 py-10">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="lg:text-[72px] md:text-[60px] sm:text-[48px] text-[30px] py-5 text-black text-center font-semibold font2 leading-[100%]">Trusted by the top health systems</h2>
                        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-8 gap-16 my-12 items-center justify-center">
                            <div className="flex justify-center items-center">
                                <Image src={LunaTrustImg1} alt="LunaTrustImg1" className="grayscale w-[80%] object-cover" />
                            </div>
                             <div className="flex justify-center items-center">
                                <Image src={LunaTrustImg2} alt="LunaTrustImg1" className="grayscale w-[80%] object-cover" />
                            </div>
                             <div className="flex justify-center items-center">
                                <Image src={LunaTrustImg3} alt="LunaTrustImg1" className="grayscale w-[80%] object-cover" />
                            </div>
                             <div className="flex justify-center items-center">
                                <Image src={LunaTrustImg4} alt="LunaTrustImg1" className="grayscale w-[80%] object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LunaTrustedSection