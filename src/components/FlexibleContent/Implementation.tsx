import React from "react";
import Image from "next/image";
import ImplementationImg from "../../../public/images/implementation-img.webp";

const Implementation = () => {
  
  return (
    <>
      <div className="w-full sm:py-16 py-4  bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[#171717] md:text-[60px] sm:text-4xl text-[30px] leading-[32px] tracking-[-2%]  text-center sm:leading-[100%] font-gilroy-semibold pt-2 mb-10">Implementation</h2>
          <div className="flex md:flex-row flex-col items-center flex-wrap sm:gap-8 gap-4 sm:my-12 my-0">

            <div className="flex flex-col items-center justify-center gap-2 bg-[#F7F7F7] rounded-2xl xl:w-[58%] lg:w-[55%] w-full lg:!min-h-[315px] h-full xl:p-6 p-8">
              <h3 className="lg:text-[77.54px] sm:text-[42px] text-[42px] leading-[120%] font1  text-[#2160FD] md:max-w-2x mx-auto w-full text-center xl:mb-3 italic ">Start small, win fast</h3>
              <p className="lg:text-[32px] text-base text-[#171717] text-center font3 sm:max-w-[480px] w-full">Launch in 1-2 service lines; expand in weeks.</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 lg:!min-h-[315px] bg-[#F7F7F7] bg-[radial-gradient(circle_at_top_left,rgba(33,96,253,0)_0%,rgba(33,96,253,0.18)_100%)] w-full h-full rounded-2xl !xl:w-[40%] lg:w-[39%] p-6">
              <Image src={ImplementationImg} alt="implementationimg" className="w-[63px] h-[60px]"/>
              <p className="sm:text-[32px] text-2xl leading-[120%] font3 font-light text-[#171717] text-center mt-4">Keep your <span className="font1 md:text-[60px] sm:text-[42px] text-[36px]  font-light text-[#2160FD] italic">systems</span></p>
              <p className="text-xl !text-[#767676] text-center  mb-4 font3 sm:max-w-xs w-full">No rip-and-replace, Steer overlays your EHR/PM.</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center lg:!min-h-[315px] bg-[#F7F7F7] bg-[radial-gradient(circle_at_top_left,rgba(33,96,253,0)_0%,rgba(33,96,253,0.18)_100%)] w-full h-full  rounded-2xl !xl:w-[40%] lg:w-[39%] p-6">
              <h3 className="lg:text-[77.54px] sm:text-[42px] text-[42px] leading-[120%] font1  text-[#2160FD] md:max-w-2x mx-auto w-full text-center italic ">Optimised</h3>
              <p className="sm:text-[32px] text-2xl leading-[120%] font3 font-light text-[#171717] text-center  max-w-sm ">Change management included </p>
              <p className="text-xl !text-[#767676] text-center  mb-4 font3 sm:max-w-xs w-full">Playbooks, staff training, and continuous optimization.</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 lg:!min-h-[315px] bg-[#F7F7F7] rounded-2xl xl:w-[58%] lg:w-[55%] w-full h-full p-6  md:py-10  py-6">
              <p className="lg:text-[32px] text-[28px]  leading-[120%] font3 font-light text-[#171717] md:max-w-[570px] w-full mx-auto text-center xl:mb-6">“The waitlist backfills cancellations <span className="text-[#2160FD] lg:text-[36px] text-[28px] italic font1">automatically.</span> Our clinics  <span className="text-[#2160FD] lg:text-[36px] text-[28px] italic font4"> feel fuller</span> without adding staff.”</p>
              <span className="text-sm !text-[#767676] text-center leading-[140%] !tracking-[2px] w-full font3 font-medium">VP</span>
              <h6 className="text-xl !text-[#767676] text-center  mb-4 font3">Ambulatory Ops</h6>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Implementation
