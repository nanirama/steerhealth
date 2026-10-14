'use client';
import React from "react";
import EventListWithPagination from "@/components/Elements/Events/EventListWithPagination";

import EventSmallCard from "@/components/Elements/Events/EventSmallCard";

import InTheLoopSlider from "@/components/Elements/InTheLoopSlider";

import CategoryTabs from "@/components/Elements/CategoryTabs";

const EventPageSection = ({ data }: any) => {    
    if(!data?.allEvents) return false;
    const allEvents = data?.allEvents ? data?.allEvents : []
    return (
        <>
            <div className="w-full md:py-10 py-6 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto">
                    {/* <EventHeader /> */}

                    
                    {(allEvents && allEvents.length>0) ? (
                        <div className="blogfaq_sectabs mb-20">
                         <CategoryTabs
                             titleLabel="Categories:"
                             categories={data?.eventCategories}
                             allItemsLabel="All Events"
                             allItemsData={allEvents}
                             renderPanelContent={(items: any) => <EventListWithPagination data={items} />}
                         />
                     </div>

                    ) : (
                        <p className="text-center text-gray-500">No events found.</p>
                    )}



                </div>
                <InTheLoopSlider data={data?.allPosts} heading="Voices from Our Events" />
                
            </div>
            <div className="w-full bg-[#f5f5f7] md:py-16 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className='text-[36px] text-black font-semibold font2 leading-[120%] mb-10'>More from Events</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {allEvents && allEvents.slice(0, 8).map((item: any, index: any) => (
                            <EventSmallCard key={index}
                                title={item?.title}
                                expert={item?.expert}
                                datetime={item?.date}
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
export default EventPageSection