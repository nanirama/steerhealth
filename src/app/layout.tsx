import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

import PageLoaderWrapper from "@/components/Common/PageLoaderWrapper";
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Steer Health Inc",
  "alternateName": "Steer Health",
  "url": "https://steerhealth.io/",
  "logo": "https://steerhealth.io/_next/image?url=%2Fimages%2Flogo.webp&w=640&q=75",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "(214) 945-2952",
    "contactType": "customer service",
    "contactOption": "TollFree",
    "areaServed": "US",
    "availableLanguage": "en"
  },
  "sameAs": [
    "https://www.facebook.com/steerhealth/",
    "https://www.instagram.com/steerhealth/",
    "https://www.youtube.com/@SteerHealth",
    "https://www.linkedin.com/company/steerhealth/",
    "https://steerhealth.io/"
  ]
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Steer Health Inc",
  "operatingSystem": "Windows, macOS, Android, Apple iOS",
  "applicationCategory": "BusinessApplication",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.6,
    "ratingCount": 1324
  },
  "offers": {
    "@type": "Offer",
    "price": 99,
    "priceCurrency": "USD"
  }
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://steerhealth.io'),
  title: 'Steer Health | Patient Scheduling Software',
  description: 'Discover Steer Health`s Patient scheduling software, enhance engagement, and improve revenue growth with intelligent solutions.',
  icons: {
    icon: '/favicon.ico', // default favicon
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png', // for iOS devices
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const isDev = SITE_URL.includes("localhost") || SITE_URL.includes("steerhealth.beingbuilt.org");
  return (
    <html lang="en">
      <head>
        {/* Inline critical CSS for faster rendering */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face{font-family:InterVariable;font-style:normal;font-weight:100 900;font-display:swap;src:url("/fonts/InterVariable.woff2") format("woff2")}
          @font-face{font-family:GilroyMedium;font-display:swap;src:url('/fonts/GilroyMedium.woff2') format('woff2')}
          body{font-family:InterVariable;background-color:#f5f5f5;margin:0}
          .font-inter{font-family:InterVariable}
        `}} />
        
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://matomo.steerhealth.io" crossOrigin="anonymous" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1NXMGBKMK7"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1NXMGBKMK7');
          `}
        </Script>
        {/* Google Tag Manager */}
        {isDev ? (
          <Script id="gtm-script" strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PK7LXNZ3');`}
          </Script>
        )
          : (
            <Script id="gtm-script" strategy="lazyOnload">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KZTWGXHS');`}
            </Script>
          )}

        {/* End Google Tag Manager */}

        {/* Steer Health Tag Manager */}
        <Script id="steerhealth-mtm" strategy="lazyOnload">
          {`
            var _mtm = window._mtm = window._mtm || [];
            _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
            (function() {
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; 
              g.src='https://matomo.steerhealth.io/js/container_fXwOEgMX.js'; 
              s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
        {/* End Steer Health Tag Manager */}

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {isDev ? (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PK7LXNZ3"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )
          :
          (
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-KZTWGXHS"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
          )}

        {/* End Google Tag Manager (noscript) */}
        <PageLoaderWrapper>
          {children}
        </PageLoaderWrapper>
      </body>
    </html>
  );
}
