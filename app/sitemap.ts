import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { allProducts, allProductsWithSlugs, slugify } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Product detail pages — every item in catalogue
  const productRoutes: MetadataRoute.Sitemap = allProductsWithSlugs.map(
    (p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  // Category listing pages
  const categoryRoutes: MetadataRoute.Sitemap = [
    ...new Set(allProducts.map((p) => p.category)),
  ].map((c) => ({
    url: `${SITE_URL}/products/category/${slugify(c)}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...routes, ...productRoutes, ...categoryRoutes];
}
