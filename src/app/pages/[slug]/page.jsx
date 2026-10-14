
import { seoGenerateMetadata } from "@/components/Seo";
import BaseLayout from "@/components/Common/BaseLayout";
import FlexibleContent from "@/components/FlexibleContent";
import { notFound } from 'next/navigation';
import PlatformsHeader from '@/components/Elements/PlatformsHeader'
import LunaIndexPage from '@/components/Luna'

import { loadPageBySlug,
  loadLandingPageBySlug,
  getAllPagesSlugs,
  getAllLandingPagesSlugs,
  getAllPltformsSlugs,
  loadPlatformPageBySlug
 } from '@/sanity/loader/loadQuery'



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/${slug}`;

  const { data: page } = await loadPageBySlug(slug)
  if (page) {
    return seoGenerateMetadata({
      title: page?.seo?.metaTitle || "",
      description: page?.seo?.metaDescription || "",
      url: pageUrl,
      imageUrl: page?.seo?.metaImage || "",
    })
  }

  // Try landing page
  const { data: landing } = await loadLandingPageBySlug(slug)
  if (landing) {
    return seoGenerateMetadata({
      title: landing?.seo?.metaTitle || "",
      description: landing?.seo?.metaDescription || "",
      url: pageUrl,
      imageUrl: landing?.seo?.metaImage || "",
    })
  }

   const { data: platform } = await loadPlatformPageBySlug('overview',slug)
  if (platform) {
    return seoGenerateMetadata({
      title: platform?.seo?.metaTitle || "",
      description: platform?.seo?.metaDescription || "",
      url: pageUrl,
      imageUrl: platform?.seo?.metaImage || "",
    })
  }

  return {}
}

// Helper function to validate and sanitize slugs
function isValidSlug(slug){
  if (!slug || typeof slug !== 'string') return false;
  // Filter out URLs (http:// or https://)
  if (slug.startsWith('http://') || slug.startsWith('https://')) return false;
  // Filter out slugs with invalid filesystem characters
  if (slug.includes('://') || slug.includes('%')) return false;
  // Filter out empty strings
  if (slug.trim().length === 0) return false;
  return true;
}

export async function generateStaticParams() {
  const pages = await getAllPagesSlugs()
  const landings = await getAllLandingPagesSlugs()
  const platforms = await getAllPltformsSlugs()

  // Filter out invalid slugs (URLs, empty, etc.)
  const validPages = Array.isArray(pages) ? pages.filter(isValidSlug) : [];
  const validLandings = Array.isArray(landings) ? landings.filter(isValidSlug) : [];
  const validPlatforms = Array.isArray(platforms) ? platforms.filter(isValidSlug) : [];

  return [
    ...validPages.map((slug) => ({ slug })),
    ...validLandings.map((slug) => ({ slug })),
    ...validPlatforms.map((slug) => ({ slug })),
  ]
}


export default async function BlogPost({ params }) {
  const { slug } = await params;
  if (!slug) return notFound();
  const { data: page } = await loadPageBySlug(slug);
  if (page) {
    return (
      <BaseLayout>
        <FlexibleContent
          data={page}
          page={slug}
        />
      </BaseLayout>
    );
  }
  const { data: landing } = await loadLandingPageBySlug(slug)
  if (landing) {
    if(slug==='hospitals-and-health-systems' || slug==='ambulatory-surgery-centers' || slug==='ascs' || slug==='medical-groups'|| slug==='functional-medicine'){
      return (
        <BaseLayout category={'solutions'}>
          <FlexibleContent
            data={landing}
            page={`home`}
            category={'solutions'}
          />
        </BaseLayout>
      )
    }
    if(slug==='try-luna'){
      return <LunaIndexPage/>;
    }    
    return (
        <FlexibleContent data={landing} page="p2p-landingpage" />
    )
  }
  const { data: platform } = await loadPlatformPageBySlug('overview',slug)
  if (platform) {
    return (
        <BaseLayout category={'solutions'}>
          <PlatformsHeader category={slug} platform={'overview'} categoryTitle={platform?.categoryTitle} />
          <FlexibleContent
            data={platform}
            page={`${slug}-overview`}
            category={'solutions'}
          />
        </BaseLayout>
    )
  }
  return notFound();
  
}