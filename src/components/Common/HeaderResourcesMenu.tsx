import React from 'react'
import Image from "next/image";
import Link from 'next/link';

import HeaderClientsSlider from './HeaderClientsSlider';





const HeaderResourcesMenu = ({ latestPost, casestudies }: { latestPost: any, casestudies: any }) => {


    const caseStudyitems = [
        ...casestudies.map((cs: any) => ({
            name: cs.title,
            href: `/case-studies/${cs.slug}` // dynamic link
        }))
    ];


    const resourceSections = [
        {
            items: [
                {
                    name: latestPost?.title,
                    href: `/blog/${latestPost?.slug}`,
                    subtitle: "Read Blog",
                    isMainItem: true,
                },
            ],
            viewAllText: "All Blogs",
            viewAllHref: "/blog",
            width: '40%',
        },
        {
            title: "Case Studies",

            items: caseStudyitems,
            viewAllText: "All Case Studies",
            viewAllHref: "/case-studies",
            width: '30%',
        },
        {
            title: "EHR Integration",
            items: [
                { name: "Epic", href: "/integrations/epic" },
                { name: "Chrono", href: "/integrations/drchrono" },
                { name: "Patient2Practise", href: "/integrations/meditech" },
            ],
            viewAllText: "All Integrations",
            viewAllHref: "/ehr",
            width: '30%',
        },
    ]
    return (
        <>
            <div className="w-full mx-auto max-w-5xl overflow-hidden">
                <div className="p-8">
                    <div className="flex flex-row gap-x-4">
                        {resourceSections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className={`w-[${section.width}]`}>

                                {/* Section Items */}
                                <div className="space-y-4 mb-6">
                                    {section?.title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{section?.title}</h3>}
                                    {section.items.map((item: any, itemIndex) => (
                                        <div key={itemIndex}>
                                            {item?.isMainItem ? (
                                                /* Blog Title with Gray Background */
                                                <div className='flex flex-row gap-4 items-start'>
                                                    <div> <div className="rounded-lg w-[130px] h-[130px]">
                                                        <Image src={latestPost?.mainImage} width={130} height={130} alt='navigate-menu-image' />
                                                    </div> {/*  */}
                                                    </div>
                                                    <div className=''>
                                                        <h3 className="text-xs font-medium text-[#335CFF] uppercase tracking-wider mb-4">Category</h3>
                                                        <h4 className="text-lg font-semibold font2 text-[#171717] mb-2">{item.name}</h4>
                                                        <Link href={item.href} className="text-sm text-[#5C5C5C] hover:text-blue-700">
                                                            {item?.subtitle}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Regular Menu Items */
                                                <div className="flex items-center gap-4">

                                                    <Link
                                                        href={item.href}
                                                        className="text-base text-[#5C5C5C] hover:text-gray-900 transition-all duration-200"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    {item.badge && (
                                                        <span className={`${item.badgeColor} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* View All Link */}
                                <Link
                                    href={section.viewAllHref}
                                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group border-t border-[#EBEBEB] pt-6 w-full"
                                >
                                    {section.viewAllText}
                                    <svg
                                        className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-0 w-full  !bg-[#F7F7F7] overflow-hidden">
                <div className=' mx-auto max-w-[1366px] '>
                    <HeaderClientsSlider />
                </div>
            </div>
        </>
    )
}
export default HeaderResourcesMenu