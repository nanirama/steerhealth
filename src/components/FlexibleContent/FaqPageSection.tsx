'use client'
import React from "react";
import ButtonComponent from "@/components/Elements/ButtonComponent";
import FaqPageList from "./FaqPageList";
import BlogFaqHeader from "../Elements/BlogFaqHeader";
import CategoryTabs from '../Elements/CategoryTabs';

const FaqPageSection = ({ data }: any) => {
    return (
        <>
            <div className="w-full pt-10 pb-4 bg-white">
                <div className="max-w-7xl mx-auto px-4">

                    <BlogFaqHeader
                        heading="All Questions"
                        subheading="Stay in loop with the latest in trends in personalized medicine."
                    />

                    <div className="blogfaq_sectabs">
                        <CategoryTabs
                            titleLabel="Categories:"
                            categories={data?.faqCategories}
                            renderPanelContent={(items) => <FaqPageList faqs={items} />}
                        />
                        {/* <Tabs>
                            <TabList>
                                <div className="flex md:flex-row flex-col gap-4 md:justify-center justify-start md:items-center items-start flex-wrap md:mx-auto md:mb-5 mb-0 ">
                                    <h4 className="md:text-2xl text-xl text-[#1D1718] font3 ">Categories:</h4>
                                    {data?.faqCategories && data?.faqCategories.map((item: any, index: any) => (
                                        <Tab key={index}>
                                            {item?.title}
                                        </Tab>
                                    ))}
                                </div>
                            </TabList>

                            {data?.faqCategories && data?.faqCategories.map((item: any, index: any) => (
                                <TabPanel key={index}>
                                    <FaqPageList faqs={item?.faqs} />
                                </TabPanel>
                            ))}
                        </Tabs> */}
                    </div>

                </div >
            </div >

            <div className="w-full bg-white md:pb-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 flex md:flex-row flex-col gap-4 md:justify-between justify-center items-center">
                    {data?.reachOutUsLabel && (
                        <h4 className="text-base text-[#1D1718] leading-[140%] font3 text-center">{data?.reachOutUsLabel}</h4>
                    )}
                    <ButtonComponent button={data?.ctaButtonPrimary} />
                </div>
            </div>            
        </>
    )
}
export default FaqPageSection