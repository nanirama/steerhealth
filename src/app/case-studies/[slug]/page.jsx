
import { seoGenerateMetadata } from "@/components/Seo";
import BaseLayout from "@/components/Common/BaseLayout";
import FlexibleContent from "@/components/FlexibleContent";
import { notFound } from 'next/navigation';

import CaseStudyHeroSection from "@/components/Elements/CaseStudyHeroSection";
import CasestudyContentSection from "@/components/Elements/CasestudyContentSection";

import { loadCasestudiesPageBySlug } from '@/sanity/loader/loadQuery'



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/case-studies/${slug}`;

  const { data: page } = await loadCasestudiesPageBySlug(slug);

  return seoGenerateMetadata({
    title: page?.seo?.metaTitle || '',
    description: page?.seo?.metaDescription || '',
    url: pageUrl,
    imageUrl: page?.seo?.metaImage || '',
  });
}


export default async function IntegrationPage({ params }) {
  const { slug } = await params;
  if (!slug) return notFound();
  const { data: page } = await loadCasestudiesPageBySlug(slug);
  if (!page) return notFound();
  return (
    <BaseLayout>
      <CaseStudyHeroSection data={page}/>
      <CasestudyContentSection data={page}/>
      <FlexibleContent
        data={page}
      />
    </BaseLayout>
  );
}