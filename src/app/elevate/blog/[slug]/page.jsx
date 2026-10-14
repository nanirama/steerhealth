import { seoGenerateMetadata } from "@/components/Seo";
import BaseLayout from "@/components/Elevate/BaseLayout";
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';



import { ArticleHeader } from "@/components/Elements/Blog/ArticleHeader"
import { ArticleMetaBar } from "@/components/Elements/Blog/ArticleMetaBar"
import { ArticleBody } from "@/components/Elements/Blog/ArticleBody"
import { ArticleMainImage } from "@/components/Elements/Blog/ArticleMainImage"
import { ArticleCTA } from "@/components/Elements/Blog/ArticleCTA"
import { ArticlePressContacts } from "@/components/Elements/Blog/ArticlePressContacts"


import { 
  loadElevatePost,
  getAllElevatePostSlugs,
} from "@/sanity/loader/loadQuery"

import Image from "next/image";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/elevate/blog/${slug}`

  // Try blog post
  const { data: post } = await loadElevatePost(slug)
  if (post) {
    return seoGenerateMetadata({
      title: post?.seo?.metaTitle || post?.title,
      description: post?.seo?.metaDescription || "",
      url: pageUrl,
      imageUrl: post?.seo?.metaImage || "",
    })
  }


  return {}
}

export async function generateStaticParams() {
  const posts = await getAllElevatePostSlugs()

  return [
    ...posts.map((slug) => ({ slug })),
  ]
}
export default async function BlogPost({ params }) {
  const { slug } = await params;
  if (!slug) return notFound();
  const [postResult] = await Promise.all([
    loadElevatePost(slug)
  ]);
  if (postResult?.data) {
    const post = postResult.data
    return (
      <BaseLayout page="elevate">
        <div className={`w-full bg-white`}>
          {/* <BlogHeader /> */}
          <main className="max-w-[820px] mx-auto px-4 py-4 md:pt-16">
            <ArticleHeader
              categories={post?.categories}
              date={dayjs(post?.publishedAt).format('MMMM D, YYYY')}
              title={post?.title}
              description={post?.expert}
            />
            <ArticleMetaBar title={post?.title} url={`${process.env.NEXT_PUBLIC_SITE_URL}/elevate/blog/${slug}`} />
            <ArticleMainImage image={post?.mainImage} title={post?.title} />
            <ArticleBody content={post?.body} />
            {post?.blogCta && <ArticleCTA data={post?.blogCta} />}
            <ArticlePressContacts />
            {/* <RelatedArticles data={latestPostsData?.data} /> */}
          </main>
          {/* <BlogCta/> */}
        </div>
      </BaseLayout>
    );
  }



  return notFound()
}