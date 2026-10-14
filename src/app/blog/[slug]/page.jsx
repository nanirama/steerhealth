import { seoGenerateMetadata } from "@/components/Seo";
import BaseLayout from '@/components/Common/BaseLayout';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';


import BlogHeader from "@/components/Elements/Blog/BlogHeader"
import LatestBlogsHeader from "@/components/Elements/Blog/LatestBlogsHeader";
import BlogListWithPagination from "@/components/Elements/Blog/BlogListWithPagination";

import { ArticleHeader } from "@/components/Elements/Blog/ArticleHeader"
import { ArticleMetaBar } from "@/components/Elements/Blog/ArticleMetaBar"
import { ArticleBody } from "@/components/Elements/Blog/ArticleBody"
import { ArticleMainImage } from "@/components/Elements/Blog/ArticleMainImage"
import { ArticleCTA } from "@/components/Elements/Blog/ArticleCTA"
import { ArticlePressContacts } from "@/components/Elements/Blog/ArticlePressContacts"
import { RelatedArticles } from "@/components/Elements/Blog/RelatedArticles"

import BlogCta from "@/components/Elements/Blog/BlogCta"

import { 
  loadPost, 
  loadLatestPosts, 
  loadBlogCategoryBySlug,
  getAllPostSlugs,
  getAllBlogCategorySlugs
} from "@/sanity/loader/loadQuery"

import Image from "next/image";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/blog/${slug}`

  // Try blog post
  const { data: post } = await loadPost(slug)
  if (post) {
    return seoGenerateMetadata({
      title: post?.seo?.metaTitle || post?.title,
      description: post?.seo?.metaDescription || "",
      url: pageUrl,
      imageUrl: post?.seo?.metaImage || "",
    })
  }

  // Try blog category
  const { data: category } = await loadBlogCategoryBySlug(slug)
  if (category) {
    return seoGenerateMetadata({
      title: category?.seo?.metaTitle || category?.title,
      description: category?.seo?.metaDescription || "",
      url: pageUrl,
      imageUrl: category?.seo?.metaImage || "",
    })
  }

  return {}
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs()
  const categories = await getAllBlogCategorySlugs()

  return [
    ...posts.map((slug) => ({ slug })),
    ...categories.map((slug) => ({ slug })),
  ]
}
export default async function BlogPost({ params }) {
  const { slug } = await params;
  if (!slug) return notFound();
  const [postResult, latestPostsData] = await Promise.all([
    loadPost(slug),
    loadLatestPosts(3)
  ]);
  if (postResult?.data) {
    const post = postResult.data
    return (
      <BaseLayout>
        <div className={`w-full bg-white`}>
          <BlogHeader />
          <main className="max-w-[820px] mx-auto px-4 py-4 md:pt-16">
            <ArticleHeader
              categories={post?.categories}
              date={dayjs(post?.publishedAt).format('MMMM D, YYYY')}
              title={post?.title}
              description={post?.expert}            
            />
            <ArticleMetaBar title={post?.title} url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`} />
            <ArticleMainImage image={post?.mainImage} title={post?.title} />
            <ArticleBody content={post?.body} />
            {post?.blogCta && <ArticleCTA data={post?.blogCta} />}
            <ArticlePressContacts />
            <RelatedArticles data={latestPostsData?.data} />
          </main>
          <BlogCta/>
        </div>
      </BaseLayout>
    );
  }

  const { data: category } = await loadBlogCategoryBySlug(slug)
  if (category) {
    return (
      <BaseLayout>
        <div className="w-full md:pb-10 pb-6 bg-white">
          <BlogHeader />
          <LatestBlogsHeader title={category?.title} categories={category?.blogCategories} />
          {category.allPosts?.length > 0 ? (
            <BlogListWithPagination data={category.allPosts} />
          ) : (
            <div className="max-w-7xl mx-auto px-4">
              <p className="text-2xl font-semibold text-center">No Posts available</p>
            </div>
          )}
        </div>
      </BaseLayout>
    )
  }

  return notFound()  
}