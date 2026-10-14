
import { seoGenerateMetadata } from "@/components/Seo";
import BaseLayout from "@/components/Common/BaseLayout";
import FlexibleContent from "@/components/FlexibleContent";
import { notFound } from 'next/navigation';

import { loadPlatformPageBySlug } from '@/sanity/loader/loadQuery'
import PlatformsHeader from '@/components/Elements/PlatformsHeader'



export async function generateMetadata({ params }) {
  const { slug, category } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/${category}/${slug}`;

  const { data: page } = await loadPlatformPageBySlug(slug, category);

  return seoGenerateMetadata({
    title: page?.seo?.metaTitle || '',
    description: page?.seo?.metaDescription || '',
    url: pageUrl,
    imageUrl: page?.seo?.metaImage || '',
  });
}


export default async function BlogPost({ params }) {
  const { slug, category } = await params;
  if (!slug) return notFound();
  const { data: page } = await loadPlatformPageBySlug(slug, category);
  if (!page) return notFound();



  return (
    <BaseLayout category={'solutions'}>
      <PlatformsHeader category={category} platform={slug} categoryTitle={page?.categoryTitle} />
      <FlexibleContent
        data={page}
        page={`${category}-${slug}`}
        category={'solutions'}
      />
    </BaseLayout>
  );
}