import { Metadata } from "next";
import Script from "next/script";
import { seoGenerateMetadata } from "@/components/Seo";
import { loadSteernotesPage } from "@/sanity/loader/loadQuery";
import FlexibleContent from "@/components/FlexibleContent/SteerNotes";
import BaseLayout from "@/components/SteerNotes/BaseLayout";


export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data: page } = await loadSteernotesPage()
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL+'/steernotes';

    return {
      ...seoGenerateMetadata({
        title: page?.seo?.metaTitle || 'SteerNotes',
        description: page?.seo?.metaDescription || '',
        url: baseUrl,
        imageUrl: page?.seo?.metaImage || "",
      })
    };
  } catch (error) {
    console.error('Error loading SteerNotes page metadata:', error);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL+'/steernotes';
    return {
      ...seoGenerateMetadata({
        title: 'SteerNotes',
        description: '',
        url: baseUrl,
        imageUrl: "",
      })
    };
  }
}

export default async function SteernotesPage() {
  try {
    const { data: steernotesPage } = await loadSteernotesPage()
    
    if (!steernotesPage) {
      return (
        <BaseLayout page="steernotes">
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Page not found</p>
          </div>
        </BaseLayout>
      );
    }
    
    return (
      <>
        <BaseLayout page="steernotes">
          <FlexibleContent data={steernotesPage} page="steernotes" />
        </BaseLayout>
      </>
    )
  } catch (error) {
    console.error('Error loading SteerNotes page:', error);
    return (
      <BaseLayout page="steernotes">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-2">Failed to load page content</p>
            <p className="text-gray-500 text-sm">Please check your network connection and try again.</p>
          </div>
        </div>
      </BaseLayout>
    );
  }
}
