import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Bee Bakes by Vartika",
  description: "Privacy policy for Bee Bakes by Vartika.",
};

export default function PrivacyPage() {
  return (
    <main className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-medium text-[var(--color-gold)] hover:underline">
          Back home
        </Link>
        <h1 className="balance mt-6 text-4xl font-semibold text-[var(--color-text-dark)] md:text-5xl">
          Privacy Policy
        </h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          <p>
            Bee Bakes by Vartika collects only the details needed to respond to orders, confirm
            preferences, and complete delivery coordination.
          </p>
          <p>
            Information shared through WhatsApp or the custom order form is used only for order handling
            and customer support.
          </p>
          <p>
            We do not sell personal information. If you want a copy of your submitted details removed,
            contact us through WhatsApp or email.
          </p>
        </div>
      </div>
    </main>
  );
}
