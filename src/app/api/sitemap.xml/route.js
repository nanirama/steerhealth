import { groq } from "next-sanity";
import { client } from '@/sanity/lib/client'

const SITE_URL = `${process.env.NEXT_PUBLIC_SITE_URL}`; // Change this to your actual domain

const query = groq`
  *[_type in ["page", "post", "blogCategory","products", "platforms", "solutions","integrations","landingPages"]] {
    "slug": slug.current,
    _type,
    "categorySlug": category->slug.current,
    _updatedAt
  }
`;
export async function GET() {
  try {
    const items = await client.fetch(query);

    const sortedItems = items.sort((a, b) => a._type.localeCompare(b._type));


    // Define static pages
    const staticPages = [
      { url: `${SITE_URL}/` },
    ];

    // Generate dynamic URLs
    const dynamicPages = sortedItems
    //.filter((item) => !(item._type === "page" && item.slug === "blog"))
    //.filter((item) => !(item._type === "services" && item.slug === "men-s-health"))
    .filter((item) => !(item._type === "page" && item.slug === "p2p-contact-us"))
    .map((item) => {
      let path = item.slug;
      if (item._type === "page") path = `${item.slug}`;
      if (item._type === "post") path = `blog/${item.slug}`;
      if (item._type === "landingPages") path = `${item.slug}`;
      if (item._type === "blogCategory") path = `blog/${item.slug}`;
      if (item._type === "products") path = `products/${item.slug}`;
      if (item._type === "solutions") path = `who-we-serve/${item.slug}`;
      if (item._type === "platforms"){
        if (item.slug === "overview"){
          path = `${item.categorySlug}`;
        }
        else
        {
          path = `${item.categorySlug}/${item.slug}`;
        }        
      }
      if (item._type === "integrations") path = `integrations/${item.slug}`;
      
      return {
        url: `${SITE_URL}/${path}`,
        lastMod: new Date(item._updatedAt).toISOString(),
      };
    });

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[...staticPages, ...dynamicPages]
        .map(({ url, lastMod }) => `
          <url>
            <loc>${url}</loc>
            ${lastMod ? `<lastmod>${lastMod}</lastmod>` : ""}
          </url>
        `)
        .join("")}
    </urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Failed to generate sitemap", { status: 500 });
  }
}
