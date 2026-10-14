import React from "react";
import Image from "next/image";
import ImageComponent from '../Elements/ImageComponent';
import FooterSocialIcons from "./FooterSocialIcons";
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
            <div className={`w-full py-8 bg-white`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex md:flex-row flex-col justify-between mt-8 my-4 md:gap-0 gap-10">

                        <div className="flex flex-col gap-6 md:w-[30%] w-full">
                            <Link href="#">
                                <ImageComponent
                                    src="footer_steer_health_logo.webp"
                                    alt="Steer Health Logo"
                                    width={161} height={32}
                                    className="w-[160px] h-[32px]"
                                    priority={false}
                                    sizes="(min-width: 768px) 161px, 100vw"
                                />
                            </Link>
                            <div className="inline-flex ">
                                <Link href={`/contact-us`} className="bg-[#335CFF] cursor-pointer group relative inline-flex flex-row gap-4 items-center justify-between leading-[24px] text-white font-medium rounded-[8px] py-3 px-4 text-sm"><span>Schedule a demo</span>
                                    <div className="relative ml-1 h-5 w-5 overflow-hidden">
                                        <div className="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -translate-x-4"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <p className="text-xs text-[252525] leading-[16px] font-medium max-w-[160px] md:mb-0 mb-4">Get a demo and discover how to Empower teams & Supercharge Growth!</p>
                        </div>
                        <div className="flex flex-col gap-6 md:w-[15%]  w-full">
                            <h3 className="text-[15px] leading-[24px] text-[#252525] font3 font-semibold font3">AI Platform</h3>
                            <ul>
                                <li className="py-2"><Link href="/drive-growth" className="text-[#64717E] text-[15px] leading-[24px] font3">Drive Growth</Link></li>
                                <li className="py-2"><Link href="/reduce-costs" className="text-[#64717E] text-[15px] leading-[24px] font3 ">Reduce Costs</Link></li>
                                <li className="py-2"><Link href="/simplify-work" className="text-[#64717E] text-[15px] leading-[24px] font3">Simplify Work</Link></li>
                                <li className="py-2"><Link href="/products/digital-front-door" className="text-[#64717E] text-[15px] leading-[24px] font3">Digital Front Door</Link></li>
                                <li className="py-2"><Link href="/products/fast-track-care" className="text-[#64717E] text-[15px] font3 leading-[24px]">FastTrackCare</Link></li>
                                <li className="py-2"><Link href="/products/steer-clinical-notes" className="text-[#64717E] text-[15px] leading-[24px] font3 ">SteerNotes</Link></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6 md:w-[15%]  w-full">
                            <h3 className="text-[15px] leading-[24px] text-[#252525] font-semibold font3">Who We Serve</h3>
                            <ul>
                                <li className="py-2"><Link href="/who-we-serve/hospitals" className="text-[#64717E] text-[15px] font3 leading-[24px]">Hospitals</Link></li>
                                <li className="py-2"><Link href="/who-we-serve/ambulatory-surgery-centers" className="text-[#64717E] text-[15px] font3 leading-[24px]">ASC’s</Link></li>
                                <li className="py-2"><Link href="/who-we-serve/medical-groups" className="text-[#64717E] text-[15px] font3 leading-[24px]">Medical Groups</Link></li>
                                <li className="py-2"><Link href="/who-we-serve/functional-medicine" className="text-[#64717E] text-[15px] leading-[24px]">Functional Health</Link></li>

                            </ul>
                        </div>
                        <div className="flex flex-col gap-6 md:w-[15%]  w-full">
                            <h3 className="text-[15px] leading-[24px] text-[#252525] font-semibold font3">Company</h3>
                            <ul>
                                <li className="py-2"><Link href="/about" className="text-[#64717E] text-[15px] leading-[24px] font3">Mission & Vision</Link></li>
                                <li className="py-2"><Link href="/security" className="text-[#64717E] text-[15px] leading-[24px] font3">Security</Link></li>
                                <li className="py-2"><Link href="/blog" className="text-[#64717E] text-[15px] leading-[24px] font3">Blogs</Link></li>
                                <li className="py-2"><Link href="/faq" className="text-[#64717E] text-[15px] leading-[24px] font3">FAQ’s</Link></li>
                            </ul>
                        </div>
                        <div className="flex flex-col md:items-end gap-6 md:w-[20%] w-full">
                            <Link href="#">
                                <ImageComponent
                                    src="footer_logo.webp"
                                    alt="Steer Health Logo"
                                    width={190} height={60}
                                    className="w-[190px] h-[60px]"
                                    priority={false}
                                    sizes="(min-width: 768px) 190px, 100vw"
                                />
                            </Link>
                            <ImageComponent
                                src="ps-badges-soc2-logos.webp"
                                alt="ps-badges-soc2-logos"
                                width={150} height={75}
                                className="w-[150px] h-[75px]  md:items-end"
                                cdn={false}
                                sizes="(min-width: 768px) 120px, 100vw"
                            />
                            <div className=" flex flex-col md:items-end ">
                                <Link href="tel:(214) 945-2952" className="text-[15px] text-[#64717E] leading-[24px] mb-1">(214) 945-2952</Link>
                                <Link href="#" className="text-[15px] text-[#64717E] leading-[24px] mb-1">hello@steerhealth.ai</Link>
                                <p className="text-[15px] text-[#64717E] leading-[24px]">Mon-Fri 8:00 am to 6:00 pm CST</p>
                                <p className="text-[15px] text-[#64717E] leading-[24px]"> Sat 7:00am to 4:00 pm CST</p>
                            </div>
                            <div className="md:block hidden"><FooterSocialIcons/></div>
                            

                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image src={`/images/hlines.webp`} alt="border_img" width={1200} height={10} />
                    </div>
                    <div className="flex md:flex-row flex-col justify-between py-[12px] mx-auto">
                        <p className="text-[13px] text-[#64717E] text-left leading-[20px] md:my-0 my-4">© {new Date().getFullYear()} Steer Health Inc. All right reserved.</p>
                        <div className="flex gap-4 md:mb-0 mb-4">
                            <nav aria-label="Footer menu">
                                <ul className="w-full flex flex-col sm:flex-row flex-wrap justify-start gap-1 sm:gap-4 lg:gap-8">
                                    {copyrightMenuItems && copyrightMenuItems?.map((item, index) => (
                                        <li key={index} className="flex-shrink-0">
                                            <Link
                                                href={item.href}
                                                className="text-[13px] text-[#64717E] leading-[20px]"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="md:hidden block"><FooterSocialIcons/></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer