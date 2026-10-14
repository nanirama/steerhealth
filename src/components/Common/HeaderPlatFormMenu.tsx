import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import ImageComponent from '../Elements/ImageComponent';


import HeaderClientsSlider from './HeaderClientsSlider';

const solutions = [
    {
        name: "Drive Growth",
        learnmore: "Optimize care capacity to expand patient volume and maximize revenue.",
        image: 'drive-growth.webp',
        icon: 'drive-growth.webp',
        href: "/drive-growth"
    },
    {
        name: "Reduce Costs",
        learnmore: "Eliminate patient leakage and secure downstream revenue with Steer.",
        image: 'reduce-costs.webp',
        href: "/reduce-costs",
        icon: 'reduce-costs.webp'
    },
    {
        name: "Simplify Work",
        learnmore: "Boost efficiency and lower operational overhead with intelligent automation.",
        image: 'simplify-work.webp',
        icon: 'simplify-work.webp',
        href: "/simplify-work"
    },
];


const HeaderPlatFormMenu = ({products}:any) => {
    const [hoveredItem, setHoveredItem] = useState(solutions[0]);
    useEffect(() => {

    }, [hoveredItem]);
    return (
        <>
            <div className="w-full mx-auto max-w-7xl overflow-hidden py-12">
                <h3 className='text-xl font-semibold font2 text-[#171717] mb-4'>Value We Deliver</h3>
                
                <div className="grid xl:grid-cols-12 grid-cols-4 gap-20">
                    <div className='grid grid-cols-3 gap-8 xl:col-span-10 col-span-3'>
                        {solutions.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="group flex rounded-[16 md:rounded-[16px] rounded-[12px] overflow-hidden hover:bg-[#F9FAFB] p-4 flex-col items-center text-center  transition duration-300"
                            >
                                <div className="relative mb-4 w-full overflow-hidden md:rounded-[16px] rounded-[12px]">
                                    <ImageComponent
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        width={200}
                                        height={120}
                                        sizes="(max-width: 640px) 100vw, 200px"
                                        className="md:rounded-[16px] rounded-[12px] w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h4 className="text-2xl  font2 font-semibold text-[#171717] mb-2">
                                    {item.name}
                                </h4>
                                 <p className="text-sm font3 text-[#5C5C5C]">
                                    {item.learnmore}
                                </p>
                            </Link>
                        ))}
                    </div>
                   
                    <div className='flex flex-col gap-2 xl:col-span-2 -mt-12 relative'>
                         <span className='bg-[#EBEBEB] !w-[1px] h-full absolute top-0 -left-6'></span>
                        <h4 className='font-semibold text-[#171717] text-xl font2 mb-2'>Products</h4>
                        <ul className='flex flex-col gap-3'>
                            {products && products.map((item: any, index: number) => (
                                <li key={index}><Link href={`/products/${item?.slug}`} className='text-base text-[#5C5C5C] font3 capitalize hover:text-[#171717]'>{item?.title}</Link></li>
                            ))} 
                        </ul>
                    </div>  
                </div>
            </div>
            <div className="flex flex-col gap-0 w-full  !bg-[#F7F7F7] overflow-hidden">
                <div className='mx-auto max-w-[1366px]'>
                    <HeaderClientsSlider />
                </div>
            </div>
        </>
    )
}
export default HeaderPlatFormMenu