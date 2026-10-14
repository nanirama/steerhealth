import React from "react";
import LunaButton from './LunaButton'
import LazyDirectVideo from "@/components/Elements/LazyDirectVideo";
const HeroSection = () => {

    return (
        <>
            <div className="bg-white mx-auto p-4">
                <div className="md:max-w-[1620px] w-full mx-auto sm:py-20 py-10 px-4 border border-black/10 rounded-[24px] shadow-[0px_0px_20px_0px_#0000000D] flex flex-col justify-between items-stretch md:gap-6 gap-4">
                    <div className="flex flex-col gap-4 text-center w-full mx-auto">
                        <h2 className="lg:text-[72px] md:text-[60px] sm:text-[48px] text-[40px] text-[#171717] font-semibold font2 tracking-tighter leading-[110%]">Turn Endless Calls into Instant Care</h2>
                        <h3 className="bg-gradient-to-r from-[#6FCAFF] via-[#3591FA] to-[#0030A6] bg-clip-text text-transparent lg:text-[72px] md:text-[60px] sm:text-[48px] text-[40px] font-semibold font2 tracking-tighter leading-[110%]">— Luna Voice AI for Busy Clinics.</h3>
                        <p className="sm:text-2xl text-xl text-[#5C5C5C] font3 font-normal leading-[140%] max-w-4xl mx-auto text-center">Clinician-grade, HIPAA-compliant AI that answers, authenticates, schedules and refills in &lt;60 seconds — so your team wins back hours and patients get care on the first try.</p>
                    </div>
                    <div className="inline-flex mx-auto mb-8">
                        <LunaButton
                            className="inline-flex transition-all duration-200 bg-[#335CFF] cursor-pointer group relative flex-row gap-2 items-center justify-between leading-[24px] text-white font-medium rounded-[8px] py-3 md:px-4 px-2 text-sm">
                            Try Luna <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </LunaButton>
                    </div>
                    <LazyDirectVideo
                        className="w-full rounded-lg md:relative"
                        srcWebm={`${process.env.NEXT_PUBLIC_SITE_URL}/videos/luna-landing-demo-hero.webm`}
                        srcMp4={`${process.env.NEXT_PUBLIC_SITE_URL}/videos/luna-landing-demo-hero.mp4`}
                        poster={`${process.env.NEXT_PUBLIC_SITE_URL}/images/luna/luna-hero.webp`}
                        width={1400}
                        height={503}
                    />
                </div>
            </div>

        </>
    )
}
export default HeroSection