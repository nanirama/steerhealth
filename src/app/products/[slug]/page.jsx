
import { seoGenerateMetadata } from "@/components/Seo";
import BaseLayout from "@/components/Common/BaseLayout";
import FlexibleContent from "@/components/FlexibleContent";
import { notFound } from 'next/navigation';

import { loadProductsPageBySlug, loadAllProducts } from '@/sanity/loader/loadQuery'
import ProductsHeader from '@/components/Elements/ProductsHeader'



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/products/${slug}`;

  const { data: page } = await loadProductsPageBySlug(slug);

  return seoGenerateMetadata({
    title: page?.seo?.metaTitle || '',
    description: page?.seo?.metaDescription || '',
    url: pageUrl,
    imageUrl: page?.seo?.metaImage || '',
  });
}


export default async function ProductPage({ params }) {
  const { slug } = await params;
  if (!slug) return notFound();
  const [
    { data: page },
    { data: products },
  ] = await Promise.all([
    loadProductsPageBySlug(slug),
    loadAllProducts(),
  ]);
  if (!page) return notFound();
  return (
    <BaseLayout category={'solutions'}>
      <ProductsHeader category={'Products'} product={slug} products={products} />
      <FlexibleContent
        data={page}
        page={slug}
      />      
    </BaseLayout>
  );
}