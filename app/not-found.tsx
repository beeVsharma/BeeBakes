import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Bee Bakes by Vartika",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="text-center">
        <p className="text-lg font-bold tracking-[0.24em] uppercase text-[var(--color-gold)] italic">
          404
        </p>
        <h1 className="balance mt-4 text-4xl font-semibold text-[var(--color-text-dark)] md:text-5xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
          The page you are looking for does not exist — but our cakes do.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-gold-hover)]"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
