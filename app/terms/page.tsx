import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Bee Bakes by Vartika",
  description: "Terms of service for Bee Bakes by Vartika.",
};

export default function TermsPage() {
  return (
    <main className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--color-gold)] hover:underline"
        >
          Back home
        </Link>
        <h1 className="balance mt-6 text-4xl font-semibold text-[var(--color-text-dark)] md:text-5xl">
          Terms of Service
        </h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <p>
            Orders are confirmed through direct communication. Final timing,
            pricing, and availability are based on the selected design and
            schedule.
          </p>
          <p>
            Custom cakes may require advance notice. Delivery windows can vary
            depending on location and production load.
          </p>
          <p>
            By placing an order, you agree to share accurate contact details and
            acknowledge that custom work may differ slightly from reference
            images.
          </p>
        </div>
      </div>
    </main>
  );
}
