import { Metadata } from "next";
import Script from "next/script";
import { seoGenerateMetadata } from "@/components/Seo";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import FlexibleContent from "@/components/FlexibleContent";
import BaseLayout from "@/components/Common/BaseLayout";


export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await loadHomePage()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    ...seoGenerateMetadata({
      title: page?.seo?.metaTitle,
      description: page?.seo?.metaDescription,
      url: baseUrl,
      imageUrl: page?.seo?.metaImage || "",
    })
  };
}

export default async function Home() {
  const { data: homePage } = await loadHomePage()
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Steer Health",
    "description": "Steer Health is an AI-driven healthcare growth and automation platform serving providers and clinics. It boosts revenue, reduces administrative burden, and enhances patient engagement and access.",
    "image": "https://steerhealth.io/images/logo.webp",
    "url": "https://steerhealth.io/",
    "telephone": "+1-214-945-2952",
    "email": "hello@steerhealth.ai",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5605 N MacArthur Blvd Ste 1009",
      "addressLocality": "Irving",
      "addressRegion": "TX",
      "postalCode": "75038",
      "addressCountry": "US"
    },
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 07:00-16:00"
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "32.8889205",
      "longitude": "-96.9649952"
    },
    "priceRange": "$$",
    "founder": "Sridhar Yerramreddy",
    "employee":
    {
      "@type": "Person",
      "name": "Sridhar Yerramreddy",
      "jobTitle": "CEO"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-214-945-2952",
      "contactType": "customer service",
      "areaServed": "US"
    },
    "sameAs": [
      "https://www.linkedin.com/company/steerhealth"
    ]
  }
  return (
    <>
      <Script
        id="schema-org-home"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrg),
        }}
      />
      <BaseLayout page="home">
        <FlexibleContent data={homePage} page="home" />
      </BaseLayout>
    </>
  )
}