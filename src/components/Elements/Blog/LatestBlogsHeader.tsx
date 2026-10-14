import React from "react"

import CategoryModal from './CategoryModal';

const LatestBlogsHeader = ({title="Latest Blogs", categories}:any) => {
    return (
        <div className="w-full py-6">
            <div className="max-w-7xl mx-auto px-4 mb-10">
                <div className="flex md:flex-row flex-col md:gap-4 gap-2 justify-between md:py-10 py-2 w-full overflow-hidden">
                    <h1 className="md:text-[60px] text-[40px] text-[#1D1718] font2 font-semibold leading-[100%] md:mb-6 mb-2">{title}</h1>
                    <p className="text-2xl text-[#1D1718] leading-[140%] font3 md:mb-8 mb-3 md:max-w-sm">Stay in loop with the latest in trends in personalized medicine.</p>
                </div>
                <CategoryModal categories={categories} />                
            </div>
        </div>
    )
}


export default LatestBlogsHeader