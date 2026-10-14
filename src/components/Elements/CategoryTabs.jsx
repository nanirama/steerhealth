'use client';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

export default function CategoryTabs({
    titleLabel,
    categories,
    allItemsLabel,
    allItemsData,
    renderPanelContent,
}) {
    return (
        <Tabs>
            <TabList>
                <div className="flex md:flex-row flex-col gap-2 md:justify-center justify-start md:items-center items-start flex-wrap md:mx-auto md:mb-3 mb-0">
                    <h4 className="md:text-2xl text-xl text-[#1D1718] font3">{titleLabel}</h4>

                    {allItemsLabel && allItemsData && <Tab>{allItemsLabel}</Tab>}

                    {categories?.map((item, index) => (
                        <Tab key={index}>{item?.title}</Tab>
                    ))}
                </div>
            </TabList>

            {allItemsData && allItemsData && (
                <TabPanel>{renderPanelContent(allItemsData)}</TabPanel>
            )}

            {categories?.map((item, index) => (
                <TabPanel key={index}>{renderPanelContent(item?.events || item?.faqs)}</TabPanel>
            ))}
        </Tabs>
    );
}
