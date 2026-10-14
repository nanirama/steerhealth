import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function GET() {
  const isDev = SITE_URL.includes("localhost") || SITE_URL.includes("beingbuilt.org");

  const content = isDev
    ? `
User-agent: *
Disallow: /
# Disallow all crawling in development/staging
    `.trim()
    : `
User-agent: *
Disallow: /admin/studio/
Disallow: /drafts/
Disallow: /preview/
Disallow: /api/
Disallow: /internal/
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
    `.trim();

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
