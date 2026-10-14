
import { seoGenerateMetadata } from "@/components/Seo";
import BaseLayout from "@/components/Common/BaseLayout";
import FlexibleContent from "@/components/FlexibleContent";
import { notFound } from 'next/navigation';

import { loadIntegrationsPageBySlug } from '@/sanity/loader/loadQuery'



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/integrations/${slug}`;

  const { data: page } = await loadIntegrationsPageBySlug(slug);

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
  const { data: page } = await loadIntegrationsPageBySlug(slug);
  if (!page) return notFound();
  return (
    <BaseLayout>
      <FlexibleContent
        data={page}
        page={slug}
      />
    </BaseLayout>
  );
}