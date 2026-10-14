
import { seoGenerateMetadata } from "@/components/Seo";
import BaseLayout from "@/components/Common/BaseLayout";
import FlexibleContent from "@/components/FlexibleContent";
import { notFound } from 'next/navigation';
import Head from "next/head";
import Script from "next/script";

import { loadSolutionsPageBySlug, loadAllSolutions } from '@/sanity/loader/loadQuery'
import SolutionsHeader from '@/components/Elements/SolutionsHeader'



export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageUrl = `${baseUrl}/who-we-serve/${slug}`;

  const { data: page } = await loadSolutionsPageBySlug(slug);

  return seoGenerateMetadata({
    title: page?.seo?.metaTitle || '',
    description: page?.seo?.metaDescription || '',
    url: pageUrl,
    imageUrl: page?.seo?.metaImage || '',
  });
}


export default async function BlogPost({ params }) {
  const { slug } = await params;
  if (!slug) return notFound();
  const [
    { data: page },
    { data: solutions },
  ] = await Promise.all([
    loadSolutionsPageBySlug(slug),
    loadAllSolutions(),
  ]);
  if (!page) return notFound();
  return (
    <>
      {slug === 'functional-medicine' && (
        <Head>
          <Script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              _linkedin_partner_id = "4994676";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            `,
            }}
          />
          <Script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              (function(l) {
                if (!l){
                  window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                  window.lintrk.q=[];
                }
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src="https://px.ads.linkedin.com/collect/?pid=4994676&fmt=gif"
            />
          </noscript>
        </Head>
      )}
      <BaseLayout category={'solutions'}>
        <SolutionsHeader category={'Solutions for'} platform={slug} solutions={solutions} />
        <FlexibleContent
          data={page}
          page={slug}
        />
      </BaseLayout>
    </>
  );
}