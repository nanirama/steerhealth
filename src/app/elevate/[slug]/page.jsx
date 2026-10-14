
import { seoGenerateMetadata } from "@/components/Seo";
import { notFound } from 'next/navigation';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import FlexibleContent from "@/components/FlexibleContent/Elevate";
import BaseLayout from "@/components/Elevate/BaseLayout";

import {
  loadElevateSolutionsPageBySlug,
  loadElevateProductsPageBySlug
 } from '@/sanity/loader/loadQuery'



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/elevate/${slug}`;

  // Try elevateSolutions first
  const { data: elevateSolution } = await loadElevateSolutionsPageBySlug(slug)
  if (elevateSolution) {
    return seoGenerateMetadata({
      title: elevateSolution?.seo?.metaTitle || "",
      description: elevateSolution?.seo?.metaDescription || "",
      url: pageUrl,
      imageUrl: elevateSolution?.seo?.metaImage || "",
    })
  }

  // Try elevateProducts
  const { data: elevateProduct } = await loadElevateProductsPageBySlug(slug)
  if (elevateProduct) {
    return seoGenerateMetadata({
      title: elevateProduct?.seo?.metaTitle || "",
      description: elevateProduct?.seo?.metaDescription || "",
      url: pageUrl,
      imageUrl: elevateProduct?.seo?.metaImage || "",
    })
  }

  return {}
}

export async function generateStaticParams() {
  const elevateSolutions = await generateStaticSlugs('elevateSolutions')
  const elevateProducts = await generateStaticSlugs('elevateProducts')

  return [
    ...elevateSolutions.map((item) => ({ slug: item.slug })),
    ...elevateProducts.map((item) => ({ slug: item.slug })),
  ]
}


export default async function BlogPost({ params }) {
  const { slug } = await params;
  if (!slug) return notFound();

  // Try elevateSolutions first
  const { data: elevateSolution } = await loadElevateSolutionsPageBySlug(slug);
  if (elevateSolution) {
    return (
      <BaseLayout page={elevateSolution?.title}>
        <FlexibleContent data={elevateSolution} postType="elevateSolutions"  />
      </BaseLayout>
    );
  }

  // Try elevateProducts
  const { data: elevateProduct } = await loadElevateProductsPageBySlug(slug);
  if (elevateProduct) {
    return (
      <BaseLayout page={elevateProduct?.title} category="elevateProducts">
        <FlexibleContent data={elevateProduct} postType="elevateProducts" />
      </BaseLayout>
    );
  }

  return notFound();
}