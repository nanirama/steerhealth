import React from "react";
import Image from "next/image";





const ClientLogos = () => {
  return (
    <>
      <section className="relative w-full overflow-hidden  py-4 px-4">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-blue-600/5 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-600/5 blur-3xl"></div>
        </div>
        {/* Content container */}
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Single Card with all metrics */}
        
          <div className="relative overflow-hidden rounded-3xl py-12 px-14 border border-white/10 bg-[#0A0F2C]/40 backdrop-opacity-80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-blue-500/5">
            {/* <div className="group relative overflow-hidden rounded-3xl py-10 px-14 border border-white/10 bg-gradient-to-br from-[#0A0F2C]/90 to-[#0A0F2C]/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10"> */}
            <div className="flex lg:flex-row flex-col space-x-5 items-center justify-between lg:gap-2 gap-8 ">
              <Image src={"/images/events/client1.webp"} alt="Client logo" height={57} width={154} className=" max-w-full object-contain" />
              <Image src={"/images/events/client2.webp"} alt="Client logo" height={57} width={256} className=" max-w-full object-contain" />
              <Image src={"/images/events/client3.webp"} alt="Client logo" height={57} width={304} className=" max-w-full object-contain" />
              <Image src={"/images/events/client4.webp"} alt="Client logo" height={57} width={222} className=" max-w-full object-contain" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default ClientLogos