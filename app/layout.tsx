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
    "Eggless custom cakes, artisan cookies & dessert boxes baked fresh in Bikaner. ₹220–₹800. Order in 3 steps on WhatsApp — takeaway from our home studio.",
  keywords: [
    "bakery",
    "custom cakes",
    "Bikaner",
    "eggless cakes",
    "artisan cookies",
    "dessert boxes",
    "Bee Bakes",
    "cake in Bikaner",
    "birthday cake Bikaner",
    "custom cake Bikaner",
    "eggless bakery Bikaner",
    "cheesecake Bikaner",
    "anniversary cake Bikaner",
    "homemade cookies Bikaner",
    "Vartika Sharma bakery",
  ],
  authors: [{ name: "Bee Bakes by Vartika" }],
  creator: "Bee Bakes by Vartika",
  applicationName: "Bee Bakes by Vartika",
  openGraph: {
    title: "Bee Bakes by Vartika | Custom Cakes & Cookies in Bikaner",
    description:
      "Eggless custom cakes, artisan cookies & dessert boxes baked fresh in Bikaner. ₹220–₹800. Order on WhatsApp.",
    type: "website",
    locale: "en_IN",
    siteName: "Bee Bakes by Vartika",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/images/cake_london_caramel.webp`,
        width: 1200,
        height: 630,
        alt: "Bee Bakes by Vartika — Handmade eggless cakes baked fresh in Bikaner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bee Bakes by Vartika | Custom Cakes & Cookies in Bikaner",
    description:
      "Eggless custom cakes, artisan cookies & dessert boxes. ₹220–₹800. Order on WhatsApp from Bikaner.",
    images: [`${SITE_URL}/images/cake_london_caramel.webp`],
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
    founder: {
      "@type": "Person",
      name: "Vartika Sharma",
      jobTitle: "Founder & Pastry Chef",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bikaner",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Bikaner",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    sameAs: [INSTAGRAM_URL],
    servesCuisine: "Bakery",
    priceRange: "₹220 – ₹800",
    paymentAccepted: "Cash, UPI, Online Transfer",
    currenciesAccepted: "INR",
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
