import React, { useState, useEffect } from 'react'
import ImageComponent from '../Elements/ImageComponent';
import Link from 'next/link';


import HeaderClientsSlider from './HeaderClientsSlider';


const solutions = [
    {
        name: "Hospitals",
        learnmore: "Cut costs and connect care across every department.",
        image: 'hospitals-menu-img.webp',
        href: '/who-we-serve/hospitals',
    },
    {
        name: "ASC's",
        learnmore: "Run operating rooms smoother with automated workflows.",
        image: 'asc-menu-img.webp',
        href: "/who-we-serve/ambulatory-surgery-centers",

    },
    {
        name: "Medical Groups",
        learnmore: "Grow visits and simplify intake, no-shows, and reputation.",
        image: 'clinics-menu-img.webp',
        href: "/who-we-serve/medical-groups",

    },
    {
        name: "Functional Medicine",
        learnmore: "Care with easy intake, virtual visits, and engagement.",
        image: 'fm-menu-img.webp',
        href: "/who-we-serve/functional-medicine",

    },
];

const HeaderSolutionsMenu = ({categories}:any) => {

    const [hoveredItem, setHoveredItem] = useState(solutions[0]);
    useEffect(() => {

    }, [hoveredItem]);
    return (
        <>

            <div className="w-full mx-auto max-w-7xl overflow-hidden py-12">
                <h3 className='text-xl font-semibold font2 text-[#171717] mb-4'>Solutions For</h3>

                <div className="grid xl:grid-cols-12 grid-cols-4 gap-20">
                    <div className='grid lg:grid-cols-4 grid-cols-2 gap-4 xl:col-span-10 col-span-3'>
                        {solutions.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="group flex md:rounded-[16px] rounded-[12px] overflow-hidden hover:bg-[#F9FAFB] p-4 flex-col items-center text-center transition duration-300"
                            >
                                <div className="relative mb-4 w-full overflow-hidden md:rounded-[16px] rounded-[12px]  ">
                                    <ImageComponent
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        width={200}
                                        height={120}
                                        cdn={false}
                                        sizes="(max-width: 640px) 100vw, 200px  "
                                        className="md:rounded-[16px] rounded-[12px] w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h4 className={`${item.name=='Functional Medicine' && 'tracking-tight'} text-2xl font2 font-semibold text-[#171717] mb-2`}>
                                    {item.name}
                                </h4>
                                <p className="text-sm font3 text-[#5C5C5C]">
                                    {item.learnmore}
                                </p>
                            </Link>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2 xl:col-span-2 -mt-12 relative'>
                        <span className='bg-[#EBEBEB] !w-[2px] h-full absolute top-0 -left-6'></span>
                        <h4 className='font-semibold text-[#171717] text-xl font2 mb-2'>Features</h4>
                        <ul className='flex flex-col gap-3'>
                            {categories && categories.map((category: any, index: number) => (
                                <li key={index}><Link href={`/blog/${category.slug}`} className='text-base text-[#5C5C5C] font3 capitalize hover:text-[#171717]'>{category?.title}</Link></li>  
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-0 w-full !bg-[#F7F7F7] overflow-hidden">
                <div className='mx-auto max-w-[1366px]'>
                    <HeaderClientsSlider />
                </div>
            </div>
        </>
    )
}
export default HeaderSolutionsMenu