import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { productBySlug, allProductsWithSlugs, slugify } from "@/lib/products";
import { SITE_URL, WHATSAPP_BASE_URL, BUSINESS_NAME } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allProductsWithSlugs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};

  const title = `${product.title} | ${BUSINESS_NAME}`;
  const description = `${product.description} Made eggless and baked fresh in Bikaner. Order on WhatsApp.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/products/${product.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/products/${product.slug}`,
      images: [{ url: `${SITE_URL}${product.image}` }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: `${SITE_URL}${product.image}`,
    description: product.description,
    brand: { "@type": "Brand", name: BUSINESS_NAME },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price.replace(/[^\d]/g, ""),
      availability: "https://schema.org/InStock",
    },
  };

  const orderText = encodeURIComponent(
    `Hi ${BUSINESS_NAME}! I'd like to order: ${product.title} (${product.price})`,
  );

  return (
    <main className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#products"
          className="text-sm font-medium text-[var(--color-gold)] hover:underline"
        >
          ← Back to all products
        </Link>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-[var(--color-bg-secondary)]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="balance text-3xl font-semibold text-[var(--color-text-dark)] md:text-4xl">
              {product.title}
            </h1>
            <p className="mt-3 text-2xl font-semibold text-[var(--color-gold)]">
              {product.price}
            </p>

            {product.category && (
              <Link
                href={`/products/category/${slugify(product.category)}`}
                className="mt-4 inline-block rounded-full border border-[var(--color-card-border)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              >
                {product.category}
              </Link>
            )}

            <p className="pretty mt-5 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
              {product.fullDescription ?? product.description}
            </p>

            <ul className="mt-6 space-y-1.5 text-sm text-[var(--color-text-muted)]">
              {product.weight && <li>⚖️ {product.weight}</li>}
              {product.deliveryTime && <li>⏱️ {product.deliveryTime}</li>}
            </ul>

            {product.ingredients && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-dark)]">
                  Ingredients
                </h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <li
                      key={ing}
                      className="rounded-full bg-white px-3 py-1 text-xs text-[var(--color-text-muted)]"
                    >
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={`${WHATSAPP_BASE_URL}?text=${orderText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-gold-hover)]"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
