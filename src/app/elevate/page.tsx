import { Metadata } from "next";
import Script from "next/script";
import { seoGenerateMetadata } from "@/components/Seo";
import { loadElevateHomePage } from "@/sanity/loader/loadQuery";
import FlexibleContent from "@/components/FlexibleContent/Elevate";
import BaseLayout from "@/components/Elevate/BaseLayout";


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
  
  return (
    <>
     
      <BaseLayout page="elevate">
        <FlexibleContent data={homePage}  />
      </BaseLayout>
    </>
  )
}