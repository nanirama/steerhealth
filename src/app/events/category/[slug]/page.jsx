
import { seoGenerateMetadata } from "@/components/Seo";
import BaseLayout from "@/components/Common/BaseLayout";
import { notFound } from 'next/navigation';
import EventListWithPagination from "@/components/Elements/Events/EventListWithPagination";
import EventHeader from '@/components/Elements/Events/EventHeader'
import { loadEventCategoryBySlug } from '@/sanity/loader/loadQuery'
import ProductsHeader from '@/components/Elements/ProductsHeader'
import LatestBlogsHeader from "@/components/Elements/Blog/LatestBlogsHeader";


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/events/${slug}`;

  const { data: page } = await loadEventCategoryBySlug(slug);

  return seoGenerateMetadata({
    title: page?.seo?.metaTitle || '',
    description: page?.seo?.metaDescription || '',
    url: pageUrl,
  });
}


export default async function EventPage({ params }) {
  const { slug } = await params;
  if (!slug) return notFound();
  const { data: page } = await loadEventCategoryBySlug(slug);
  if (!page) return notFound();

  return (
    <BaseLayout>
      <div className="w-full md:pb-10 pb-6 bg-white">
          <EventHeader/>
          <LatestBlogsHeader title={page?.title} categories={page?.blogCategories} />
          {page.allEvents && page.allEvents.length > 0 ? (
            <EventListWithPagination data={page.allEvents} />
          ) : (
            <div className="max-w-7xl mx-auto px-4"><p className="text-2xl font2 font-semibold leading-[100%] text-[#1D1718] mb-6 text-center">No Posts available</p></div>
          )}
        </div>
      
    </BaseLayout>
  );
}