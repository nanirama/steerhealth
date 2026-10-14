import { seoGenerateMetadata } from "@/components/Seo";
import BaseLayout from '@/components/Common/BaseLayout';
import { notFound } from 'next/navigation';
import { urlForImage } from '@/sanity/lib/utils';
import FlexibleContent from "@/components/FlexibleContent";
import EventHeader from '@/components/Elements/Events/EventHeader'
import EventInfoSection from "@/components/Elements/Events/EventInfoSection";
import EventFormSection  from "@/components/Elements/Events/EventFormSection";
import EventBodySection from "@/components/Elements/Events/EventBodySection"

import BeckersCeoCfoIndex from "@/components/BeckersCeoCfo";

import { loadEvent } from '@/sanity/loader/loadQuery'
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/events/${slug}`;
  const { data: page } = await loadEvent(slug);
  return seoGenerateMetadata({
    title: page?.seo?.metaTitle,
    description: page?.seo?.metaDescription,
    url: pageUrl,
    imageUrl: page?.seo?.metaImage || '',
  });
}
export default async function EventPost({ params }) {
  const { slug } = await params;
  if (!slug) return notFound();
  const [postResults] = await Promise.all([
    loadEvent(slug)
  ]);
  if (!postResults) return notFound();
  const post = postResults?.data; 

  if (!post) return notFound();

  const featuredImageUrl = post?.mainImage &&
    urlForImage(post?.mainImage)
      ?.height(600)
      ?.width(800)
      .format('webp')
      ?.fit('crop')?.url();

  const featuredBlueImageUrl = post?.mainImage &&
    urlForImage(post?.mainImage)
      ?.height(84)
      ?.width(192)
      ?.blur(50)
      .format('webp')
      ?.fit('crop')?.url();

  const authorImageUrl = post?.authorData?.image &&
    urlForImage(post?.authorData?.image)
      ?.height(100)
      ?.width(100)
      .format('webp')
      ?.fit('crop')?.url();

  //post.sections = post?.sections || [];


  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/events/${slug}`;

  console.log('post',post.isLandingPage)

  console.log('slugslug',slug)

  if(post.isLandingPage) {
    
    if(slug==='beckers-ceo-cfo'){
      return(
        <BeckersCeoCfoIndex/>
      )
    }
    else if(slug==='a4m-tnc'){
      return(
        <EventBodySection post={post} />
      )
    }
    else
    {
      return(
        <FlexibleContent
          data={post}
          page={slug}
        />
      )
    }
    
  }
  else
  {
    return (
    <BaseLayout>
      <div className={`w-full bg-white`}>
        {/* <EventHeader /> */}
        {post?.showHeaderForm ? <EventFormSection post={post}/> : <EventInfoSection post={post} featuredImageUrl={featuredImageUrl} pageUrl={pageUrl}  />}
        <EventBodySection post={post} />
      </div>
    </BaseLayout>
  );
  }

  
}