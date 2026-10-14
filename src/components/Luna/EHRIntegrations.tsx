import React from "react";
import Image from "next/image";

const EHRIntegrations = () => {
    return (
        <>
            <div className="bg-white mx-auto p-4">
                <div className="md:max-w-[1400px] w-full mx-auto md:py-20 py-10 border border-black/10 rounded-[24px] shadow-[0px_0px_20px_0px_#0000000D] flex flex-col justify-between items-stretch md:gap-6 gap-4">
                    <h2 className="lg:text-[72px] md:text-[60px] sm:text-[48px] text-[30px] text-center text-black font-semibold font2 tracking-tighter leading-[110%]">EHR  <span className="bg-[linear-gradient(90deg,_#6FCAFF_0%,_#3591FA_28.42%,_#0030A6_56.83%)] bg-clip-text text-transparent">Integrations</span></h2>
                    <h3 className="md:text-2xl text-xl text-[#ADADAD] font3 font-normal leading-[140%] max-w-4xl mx-auto text-center">Luna seamlessly integrates with leading EMRs in healthcare, enriching and broadening the connection between providers and patients.</h3>
                    <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-4 min-[480px]:grid-cols-2 lg:gap-8 md:gap-4 gap-8">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center w-[145px] h-[145px] shadow-[1.18px_7.69px_16.55px_#0000001A,4.14px_30.15px_30.15px_#00000017,9.46px_67.4px_40.79px_#0000000D,16.55px_120.01px_48.48px_#00000003,25.42px_188px_53.21px_#00000000]">
                            <Image src={`/images/luna/luna-client1.webp`} width={150} height={150} alt="Client1" className="object-cover" />
                        </div>
                        <div className="bg-white p-3 rounded-full flex justify-center items-center w-[145px] h-[145px] shadow-[1.18px_7.69px_16.55px_#0000001A,4.14px_30.15px_30.15px_#00000017,9.46px_67.4px_40.79px_#0000000D,16.55px_120.01px_48.48px_#00000003,25.42px_188px_53.21px_#00000000]">
                            <Image src={`/images/luna/luna-client2.webp`} width={150} height={150} alt="Client1" className="object-cover" />
                        </div>
                        <div className="bg-white p-3 rounded-full flex justify-center items-center w-[145px] h-[145px] shadow-[1.18px_7.69px_16.55px_#0000001A,4.14px_30.15px_30.15px_#00000017,9.46px_67.4px_40.79px_#0000000D,16.55px_120.01px_48.48px_#00000003,25.42px_188px_53.21px_#00000000]">
                            <Image src={`/images/luna/luna-client3.webp`} width={150} height={150} alt="Client1" className="object-cover" />
                        </div>
                        <div className="bg-white p-3 rounded-full flex justify-center items-center w-[145px] h-[145px] shadow-[1.18px_7.69px_16.55px_#0000001A,4.14px_30.15px_30.15px_#00000017,9.46px_67.4px_40.79px_#0000000D,16.55px_120.01px_48.48px_#00000003,25.42px_188px_53.21px_#00000000]">
                            <Image src={`/images/luna/luna-client4.webp`} width={150} height={150} alt="Client1" className="object-cover" />
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-4 min-[480px]:grid-cols-2 lg:gap-16 md:gap-4 gap-8">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center w-[145px] h-[145px] shadow-[1.18px_7.69px_16.55px_#0000001A,4.14px_30.15px_30.15px_#00000017,9.46px_67.4px_40.79px_#0000000D,16.55px_120.01px_48.48px_#00000003,25.42px_188px_53.21px_#00000000]">
                            <Image src={`/images/luna/luna-client5.webp`} width={150} height={150} alt="Client1" className="object-cover" />
                        </div>
                        <div className="bg-white p-3 rounded-full flex justify-center items-center w-[145px] h-[145px] shadow-[1.18px_7.69px_16.55px_#0000001A,4.14px_30.15px_30.15px_#00000017,9.46px_67.4px_40.79px_#0000000D,16.55px_120.01px_48.48px_#00000003,25.42px_188px_53.21px_#00000000]">
                            <Image src={`/images/luna/luna-client6.webp`} width={150} height={60} alt="Client1" className="object-cover" />
                        </div>
                        <div className="bg-white p-3 rounded-full flex justify-center items-center w-[145px] h-[145px] shadow-[1.18px_7.69px_16.55px_#0000001A,4.14px_30.15px_30.15px_#00000017,9.46px_67.4px_40.79px_#0000000D,16.55px_120.01px_48.48px_#00000003,25.42px_188px_53.21px_#00000000]">
                            <Image src={`/images/luna/luna-client7.webp`} width={150} height={150} alt="Client1" className="object-cover" />
                        </div>
                        <div className="bg-white p-3 rounded-full flex justify-center items-center w-[145px] h-[145px] shadow-[1.18px_7.69px_16.55px_#0000001A,4.14px_30.15px_30.15px_#00000017,9.46px_67.4px_40.79px_#0000000D,16.55px_120.01px_48.48px_#00000003,25.42px_188px_53.21px_#00000000]">
                            <Image src={`/images/luna/luna-client8.webp`} width={150} height={150} alt="Client1" className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EHRIntegrations