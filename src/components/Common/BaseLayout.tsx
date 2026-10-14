import React from "react";
import Header from "@/components/Common/header";
import Footer from "@/components/Common/footer";
import { loadLatestPosts, loadAllProducts, loadAllCategories,loadAllCaseStudies, loadSettings } from "@/sanity/loader/loadQuery";
import ForumHealthBanner from "./ForumHealthBanner";


export default async function BaseLayout({
    children,
    page,
    category
}: {
    children: React.ReactNode;
    page?:string;
    category?:string
}) {
    const [
        { data: latestPost },
        { data: products },
        { data: categories },
        { data: casestudies },
        settingsResponse,
    ] = await Promise.all([
        loadLatestPosts(1),
        loadAllProducts(),
        loadAllCategories(),
        loadAllCaseStudies(),
        loadSettings()
    ]);
    return (
        <>
            {(settingsResponse?.data as any)?.enableTopbanner && (
                /* @ts-ignore - JSX component with settings prop */
                <ForumHealthBanner settings={settingsResponse.data} />
            )}
            <Header page={page} category={category} latestPost={latestPost[0]} products={products} categories={categories} casestudies={casestudies} />
            {children}
            <Footer />
        </>
    );
};