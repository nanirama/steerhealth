import { Metadata } from "next";
import Script from "next/script";
import { seoGenerateMetadata } from "@/components/Seo";
import { loadElevateHomePage, loadAllElevatePosts } from "@/sanity/loader/loadQuery";
import FlexibleContent from "@/components/FlexibleContent/Elevate";
import BaseLayout from "@/components/Elevate/BaseLayout";
import ElevateBlogCard from "@/components/Elements/Blog/ElevateBlogCard";
import dayjs from 'dayjs';


export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await loadElevateHomePage()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL+'/elevate';

  return {
    ...seoGenerateMetadata({
      title: page?.seo?.metaTitle,
      description: page?.seo?.metaDescription,
      url: baseUrl,
      imageUrl: page?.seo?.metaImage || "",
    })
  };
}

export default async function Home() {
  const { data: homePage } = await loadElevateHomePage()
  const { data: elevatePosts } = await loadAllElevatePosts()
  
  return (
    <>
      <BaseLayout page="elevate">
      <div className="w-full py-6">
            <div className="max-w-7xl mx-auto px-4 mb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex md:flex-row flex-col md:gap-4 gap-2 justify-between md:py-6 py-2 w-full overflow-hidden">
                    <h1 className="md:text-[60px] text-[40px] text-[#1D1718] font2 font-semibold leading-[100%] md:mb-6 mb-2">Steer Elevate Blog</h1>
                    <p className="text-2xl text-[#1D1718] leading-[140%] font3 text-right md:mb-3 mb-3">Stay in loop with the latest in trends in personalized medicine.</p>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-4">
          {elevatePosts && Array.isArray(elevatePosts) && elevatePosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {elevatePosts.map((post: any, index: number) => (
                <ElevateBlogCard
                  key={post._id || index}
                  title={post.title}
                  category={post.categories && post.categories[0] ? post.categories[0].title : "PRESS RELEASE"}
                  publishedAt={dayjs(post.publishedAt).format('MMMM D, YYYY')}
                  image={post.mainImage}
                  imageAlt={post.title}
                  href={post.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-[#1D1718] font3">No Blog Posts</p>
            </div>
          )}
        </div>
      </BaseLayout>
    </>
  )
}