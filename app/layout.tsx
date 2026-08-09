import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Outfit } from "next/font/google";
import Script from "next/script";
import {
  BUSINESS_NAME,
  PHONE_NUMBER,
  BUSINESS_EMAIL,
  INSTAGRAM_URL,
  SITE_URL,
} from "@/lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  verification: {
    google: "Hca-qpGb9D8wj9StU5v_s2lFgR9sdrk_IUGXbjhewc8",
  },
  title:
    "Bee Bakes by Vartika | Custom Cakes, Cookies, and Dessert Boxes in Bikaner",
  description:
    "Handmade eggless cakes, artisan cookies, and custom dessert boxes baked fresh in Bikaner. Simple ordering, careful finishing, and delivery for celebrations.",
  keywords: [
    "bakery",
    "custom cakes",
    "Bikaner",
    "eggless cakes",
    "artisan cookies",
    "dessert boxes",
    "Bee Bakes",
  ],
  authors: [{ name: "Bee Bakes by Vartika" }],
  creator: "Bee Bakes by Vartika",
  applicationName: "Bee Bakes by Vartika",
  openGraph: {
    title: "Bee Bakes by Vartika",
    description:
      "Handmade eggless cakes, artisan cookies, and custom dessert boxes baked fresh in Bikaner.",
    type: "website",
    locale: "en_IN",
    siteName: "Bee Bakes by Vartika",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/images/logo.jpg`,
        width: 1200,
        height: 630,
        alt: "Bee Bakes by Vartika logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Bee Bakes by Vartika",
    description:
      "Handmade eggless cakes, artisan cookies, and custom dessert boxes baked fresh in Bikaner.",
    images: [`${SITE_URL}/images/logo.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "theme-color": "#fbf7f1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: BUSINESS_NAME,
    description:
      "Handmade eggless cakes, artisan cookies, and custom dessert boxes baked fresh in Bikaner, Rajasthan.",
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    email: BUSINESS_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bikaner",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    sameAs: [INSTAGRAM_URL],
    servesCuisine: "Bakery",
    priceRange: "Rs 599 – Rs 1,499",
    hasMap: "https://maps.google.com/?q=Bikaner,Rajasthan",
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="schema-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-bg-light)] text-[var(--color-text-dark)]">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
