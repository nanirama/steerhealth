import React from "react";
import Image from "next/image";
import ImageComponent from '@/components/Elements/ImageComponent';
import FooterSocialIcons from "../Common/FooterSocialIcons";
import Link from "next/link";


const Footer = () => {
    const copyrightMenuItems = [
        {
            title: 'Terms of Use',
            href: '/terms-of-use'
        },
        {
            title: 'Privacy Policy',
            href: '/privacy-policy'
        },
        {
            title: 'Cookie Notice',
            href: '/cookie-notice'
        },
        {
            title: 'Developer Agreement',
            href: '/developer-agreement'
        }
    ]
    return (
        <>
            <div className={`w-full md:pt-20 pt-8 pb-8 bg-white`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex md:flex-row flex-col justify-between mt-8 my-4 md:gap-4 gap-10">

                        <div className="flex flex-col gap-6 md:w-[30%] w-full">
                            <Link href="#">
                                <Image
                                    src="/images/steerElevateLogo.svg"
                                    alt="Steer Elevate Logo"
                                    width={168}
                                    height={30}
                                    priority
                                    className="h-auto w-auto"
                                />
                            </Link>
                            <div className="inline-flex ">
                                <Link href={`/elevate/contact-us`} className="bg-gradient-to-r from-[#3794FF] to-[#00B9B7] cursor-pointer inline-flex w-auto flex-row gap-3 items-center justify-between leading-[24px] text-white font-inter font-medium rounded-[12px] py-3 px-4 text-sm -tracking-[0.6%]"><span>Schedule a demo</span>
                                    <div className="relative ml-1 h-5 w-5 overflow-hidden">
                                        <div className="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -translate-x-4"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <p className="text-[11.6px] text-[#252525] font-inter leading-6 font-medium md:max-w-[260px] w-full md:mb-0 mb-4">Get a demo and discover how to Unify care, Empower teams & Supercharge Growth!</p>
                        </div>
                        {/* WHO WE SERVE Column */}
                        <div className="flex flex-col gap-6 md:w-[20%] w-full">
                            <h3 className="text-[15px] leading-6 text-[#252525] font-semibold uppercase">WHO WE SERVE</h3>
                            <div className="flex flex-col gap-6">
                                {/* BY SIZE */}
                                <div>
                                    <h4 className="text-[13px] leading-6 text-[#64717E] font-semibold uppercase mb-3">BY SIZE</h4>
                                    <ul className="space-y-2">
                                        <li><Link href="/elevate/solo-practice" className="text-[#64717E] text-[15px] leading-6">Solo Practice</Link></li>
                                        <li><Link href="/elevate/group-practice" className="text-[#64717E] text-[15px] leading-6">Group Practice</Link></li>
                                        <li><Link href="/elevate/multi-location" className="text-[#64717E] text-[15px] leading-6">Multi-Location</Link></li>
                                        <li><Link href="/elevate/teleconsultation" className="text-[#64717E] text-[15px] leading-6">Teleconsultation</Link></li>
                                    </ul>
                                </div>
                                {/* BY MODALITY */}
                                <div>
                                    <h4 className="text-[13px] leading-6 text-[#64717E] font-semibold uppercase mb-3">BY MODALITY</h4>
                                    <ul className="space-y-2">
                                        <li><Link href="/elevate/functional-and-integrative" className="text-[#64717E] text-[15px] leading-6">Functional & Integrative</Link></li>
                                        <li><Link href="/elevate/longevity-and-precision" className="text-[#64717E] text-[15px] leading-6">Longevity & Precision</Link></li>
                                        <li><Link href="/elevate/med-spa-and-regenerative" className="text-[#64717E] text-[15px] leading-6">Med Spa & Regenerative</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* PRODUCTS Column */}
                        <div className="flex flex-col gap-6 md:w-[20%] w-full">
                            <h3 className="text-[15px] leading-6 text-[#252525] font-semibold uppercase">PRODUCTS</h3>
                            <ul className="space-y-2">
                                <li><Link href="/elevate/patient-access-and-scheduling" className="text-[#64717E] text-[15px] leading-6">Patient Access & Scheduling</Link></li>
                                <li><Link href="/elevate/patient-engagement-and-communication" className="text-[#64717E] text-[15px] leading-6">Patient Engagement & Communication</Link></li>
                                <li><Link href="/elevate/care-workflow-automation" className="text-[#64717E] text-[15px] leading-6">Care Workflow Automation (Between Visits)</Link></li>
                                <li><Link href="/elevate/revenue-growth-and-reactivation" className="text-[#64717E] text-[15px] leading-6">Revenue Growth & Reactivation</Link></li>
                                <li><Link href="/elevate/programs-labs-and-membership-ops" className="text-[#64717E] text-[15px] leading-6">Programs, Labs & Membership Ops</Link></li>
                            </ul>
                        </div>
                        {/* RESOURCES Column */}
                        <div className="flex flex-col gap-6 md:w-[20%] w-full">
                            <h3 className="text-[15px] leading-6 text-[#252525] font-semibold uppercase">RESOURCES</h3>
                            <ul className="space-y-2">
                                <li><Link href="/elevate/practice-score" className="text-[#64717E] text-[15px] leading-6 flex items-center gap-1">Assess your practice <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link></li>
                                <li><Link href="/" className="text-[#64717E] text-[15px] leading-6">Integrations & partners</Link></li>
                                <li><Link href="/" className="text-[#64717E] text-[15px] leading-6">Growth Blog</Link></li>
                                <li><Link href="/" className="text-[#64717E] text-[15px] leading-6">Security & HIPAA</Link></li>
                                <li><Link href="/" className="text-[#64717E] text-[15px] leading-6">Support Center</Link></li>
                            </ul>
                        </div>
                        <div className="flex flex-col md:items-end gap-6 md:w-[30%] w-full">
                            <div className="flex flex-row items-center gap-4 mb-3">
                                <Image
                                    src="/images/soc2-logo.svg"
                                    alt="Steer Elevate Logo"
                                    width={70}
                                    height={70}
                                    priority
                                    className="h-auto w-auto"
                                />
                                <Image
                                    src="/images/logo-HIPPA.svg"
                                    alt="Steer Elevate Logo"
                                    width={100}
                                    height={40}
                                    priority
                                    className="h-auto w-auto"
                                />
                            </div>
                            {/* <ImageComponent
                                src="ps-badges-soc2-logos.webp"
                                alt="ps-badges-soc2-logos"
                                width={150} height={75}
                                className="w-[150px] h-[75px]  md:items-end"
                                cdn={false}
                                sizes="(min-width: 768px) 120px, 100vw"
                            /> */}
                            <div className=" flex flex-col md:items-end ">
                                <Link href="tel:(214) 945-2952" className="text-[15px] text-[#64717E] leading-6 mb-1">(214) 945-2952</Link>
                                <Link href="#" className="text-[15px] text-[#64717E] leading-6 mb-1">hello@steerhealth.ai</Link>
                                <p className="text-[15px] text-[#64717E] leading-6">Mon-Fri 8:00 am to 6:00 pm CST</p>
                                <p className="text-[15px] text-[#64717E] leading-6"> Sat 7:00am to 4:00 pm CST</p>
                            </div>
                            <div className="md:block hidden"><FooterSocialIcons /></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image src={`/images/hlines.webp`} alt="border_img" width={1200} height={10} />
                    </div>
                    <div className="flex md:flex-row flex-col justify-between py-3 mx-auto">
                        <p className="text-[11px] text-[#64717E] text-left leading-5 md:my-0 my-4">© {new Date().getFullYear()} Steer Health Inc. All right reserved.</p>
                        <div className="flex gap-4 md:mb-0 mb-4">
                            <nav aria-label="Footer menu">
                                <ul className="w-full flex flex-col sm:flex-row flex-wrap justify-start gap-1 sm:gap-4 lg:gap-8">
                                    {copyrightMenuItems && copyrightMenuItems?.map((item, index) => (
                                        <li key={index} className="shrink-0">
                                            <Link
                                                href={item.href}
                                                className="text-[11px] text-[#858694] leading-5"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="md:hidden block"><FooterSocialIcons /></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer