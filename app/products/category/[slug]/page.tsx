import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allProducts, slugify } from "@/lib/products";
import { SITE_URL, BUSINESS_NAME } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const categories = [...new Set(allProducts.map((p) => p.category))];
  return categories.map((c) => ({ slug: slugify(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = [...new Set(allProducts.map((p) => p.category))].find(
    (c) => slugify(c) === slug,
  );
  if (!category) return {};

  const title = `${category} | ${BUSINESS_NAME}`;
  const description = `Browse our ${category.toLowerCase()} — eggless, baked fresh in Bikaner. Order on WhatsApp.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/products/category/${slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/products/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = [...new Set(allProducts.map((p) => p.category))].find(
    (c) => slugify(c) === slug,
  );
  if (!category) notFound();

  const items = allProducts.filter((p) => p.category === category);

  return (
    <main className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/#products"
          className="text-sm font-medium text-[var(--color-gold)] hover:underline"
        >
          ← Back home
        </Link>
        <h1 className="balance mt-6 text-4xl font-semibold text-[var(--color-text-dark)] md:text-5xl">
          {category}
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
          {category} from Bee Bakes by Vartika — baked fresh in Bikaner. Order
          on WhatsApp.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.title}
              href={`/products/${slugify(p.title)}`}
              className="group overflow-hidden rounded-3xl border border-[var(--color-card-border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(73,45,20,0.1)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-secondary)]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-[var(--color-text-dark)]">
                  {p.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--color-gold)]">
                  {p.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
