import { Metadata } from "next";
import { seoGenerateMetadata } from "@/components/Seo";
import { loadP2PContactPage } from "@/sanity/loader/loadQuery";
import FlexibleContent from "@/components/FlexibleContent";


export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await loadP2PContactPage()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/p2p-landingpage/contact-us`;
  return {
    ...seoGenerateMetadata({
      title: page?.seo?.metaTitle,
      description: page?.seo?.metaDescription,
      url: pageUrl,
      imageUrl: page?.seo?.metaImage || "",
    })
  };
}

export default async function Power2Practice() {
  const { data: page } = await loadP2PContactPage()
  
  return (
    <>
      <FlexibleContent data={page} page="p2p-landingpage" /> 
    </>
  )
}