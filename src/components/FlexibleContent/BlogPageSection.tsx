import React from "react";
import dayjs from 'dayjs';
import BlogListWithPagination from "@/components/Elements/Blog/BlogListWithPagination";

import BlogHeader from "@/components/Elements/Blog/BlogHeader"

import LatestBlogsHeader from "@/components/Elements/Blog/LatestBlogsHeader";
import BlogSmallCard from "@/components/Elements/Blog/BlogSmallCard";

import InTheLoopSlider from "@/components/Elements/InTheLoopSlider";

const BlogPageSection = ({ data }: any) => {
    return (
        <>
            <div className="w-full md:py-10 py-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <BlogHeader />
                    <LatestBlogsHeader categories={data?.blogCategories} />
                    <BlogListWithPagination data={data?.allPosts || []} />
                    
                </div>
                <InTheLoopSlider data={data?.allPosts} />
                <div className="max-w-7xl mx-auto px-4">
                        <h2 className='text-[36px] text-black font-semibold font2 leading-[120%] mb-10'>More from SteerBlogs</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            {data?.allPosts && data?.allPosts.slice(0, 8).map((item: any, index: any) => (
                                <BlogSmallCard key={index}
                                    title={item?.title}
                                    category={item?.categories && item?.categories[0] && item?.categories[0]?.title}
                                    publishedAt={dayjs(item?.publishedAt).format('MMMM D, YYYY')}
                                    image={item?.mainImage}
                                    imageAlt={item?.title}
                                    href={item?.slug}
                                    className="p-0"
                                />
                            ))}
                        </div>
                    </div>
            </div>
        </>
    )
}
// const BlogPageSection = ({ data }: any) => {
//     return (
//         <>
//             <div className="w-full md:py-10 py-6 bg-white">
//                 <div className="max-w-7xl mx-auto px-4">

//                     <BlogFaqHeader
//                         heading="All Blogs"
//                         subheading="Stay in loop with the latest in trends in personalized medicine."
//                     />

//                     <div className="blogfaq_sectabs mb-20">
//                         <CategoryTabs
//                             titleLabel="Categories:"
//                             categories={data?.blogCategories}
//                             allItemsLabel="All Articles"
//                             allItemsData={data?.allPosts}
//                             renderPanelContent={(items: any) => <BlogListWithPagination data={items} />}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
export default BlogPageSection