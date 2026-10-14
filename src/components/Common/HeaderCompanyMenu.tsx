import React from 'react'
import Link from 'next/link';
import ImageComponent from '../Elements/ImageComponent';
import HeaderClientsSlider from './HeaderClientsSlider';



const menuSections = [
    {
        title: "About Us",
        items: [
            { name: "About Us", href: "/about" },
            { name: "Security", href: "/security" },            
            { name: "FAQs", href: "/faq" },
            { name: "Careers", href: "/careers" },
        ],
    },
    {
        title: "Legal",
        items: [
            { name: "Terms of use", href: "/terms-of-use" },
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Cookie Notice", href: "/cookie-notice" },
            { name: "Developer Agreement", href: "/developer-agreement" },
        ],
    },
    {
        title: "Contact Us",
        items: [
             { name: "Contact Us", href: "/contact-us" },
             { name: "Drop us a message and we will surely reach out.", href: "/contact-us" },
        ],
    },
]


const HeaderCompanyMenu = () => {
    return (
        <>
            <div className="w-full mx-auto max-w-7xl overflow-hidden">
                <div className="flex items-start">
                    <div className="flex-1 py-8">
                        <div className="grid grid-cols-3 gap-x-12 ">
                            {menuSections.map((section, sectionIndex) => (
                                <div key={sectionIndex}>
                                    {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        {section?.href ? (
                                            <Link href={section?.href}>{section.title}</Link>
                                        ): (section.title)}
                                       
                                    </h3> */}
                                    {section.items.length > 0 && (
                                        <ul className="space-y-4">
                                            {section.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    <Link
                                                        href={item.href}
                                                        className="text-base text-[#5C5C5C] hover:text-gray-900 transition-all duration-200"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 p-8">
                        <ImageComponent
                            src="hdr-dd-platform-img.webp"
                            alt="image"
                            width={600}
                            height={600}
                            sizes="(max-width: 640px) 100vw, 600px"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-0 w-full  !bg-[#F7F7F7] overflow-hidden">
                <div className=' mx-auto max-w-[1366px] w-full '>
                    <HeaderClientsSlider />
                </div>
            </div>
        </>
    )
}
export default HeaderCompanyMenu