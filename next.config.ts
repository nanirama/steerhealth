/** @type {import('next').NextConfig} */

const redirectsList = require("./redirects.json");

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize initial page load by reducing redirects processing time
  trailingSlash: false,
  
  async redirects() {
    return redirectsList;
  },

  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap.xml" },
      { source: "/robots.txt", destination: "/api/robots.txt" },
      { source: "/:slug", destination: "/pages/:slug" },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "cdn.cms.steerhealth.io" },
    ],
    unoptimized: isDev, // 🚀 Disable optimization in dev to skip caching
    minimumCacheTTL: isDev ? 0 : 60 * 60 * 24, // 0 in dev, 1 day in prod
  },
  experimental: {
    optimizeCss: isDev 
      ? false 
      : {
          // Production-only Critters options
          pruneSource: true,
          mergeStylesheets: true,
          preload: 'swap',
        },
  },

  // Enable compression for faster response
  compress: true,
  poweredByHeader: false,
  output: "standalone",
  
  // Optimize build output
  productionBrowserSourceMaps: false,

  async headers() {
    return isDev
      ? [
          // 🚫 Disable caching for everything in development
          {
            source: "/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "no-store, no-cache, must-revalidate, proxy-revalidate",
              },
            ],
          },
        ]
      : [
          // ✅ Production cache headers with compression
          {
            source: "/fonts/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable",
              },
            ],
          },
          {
            source: "/images/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable",
              },
            ],
          },
          {
            source: "/_next/static/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable",
              },
            ],
          },
          {
            source: "/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=3600, s-maxage=3600",
              },
            ],
          },
        ];
  },
};

export default nextConfig;
