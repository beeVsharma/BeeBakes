"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

export default function CustomCakes({
  onOpenCustomOrder,
}: {
  onOpenCustomOrder: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="custom-cakes"
      className="scroll-mt-28 px-4 py-20 md:scroll-mt-32 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          className="relative"
        >
          <div className="absolute -left-8 top-12 h-44 w-44 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white p-3 shadow-[0_30px_80px_rgba(73,45,20,0.14)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:aspect-[5/6]">
              <Image
                src="/images/cake_custom_1781078532175.webp"
                alt="A custom celebration cake with neat finishing and layered decoration"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute right-6 top-6 rounded-full bg-[var(--color-text-dark)] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white">
              Custom made
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-base md:text-lg font-semibold tracking-[0.1em] uppercase text-[var(--color-gold)]">
            Made just for you
          </p>
          <h2 className="balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-[var(--color-text-dark)] md:text-5xl">
            Custom cakes for birthdays, anniversaries, and the events in between
          </h2>

          {/* Occasion chips for semantic search & buyer inspiration */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["🎂 Birthday Cakes", "💍 Anniversary Cakes", "👶 Baby Shower", "🎁 Festive & Gift Boxes", "🎉 Milestone Parties"].map((occasion) => (
              <span
                key={occasion}
                className="rounded-full border border-[var(--color-card-border)] bg-white/75 px-3 py-1.5 text-xs font-medium text-[var(--color-text-dark)] shadow-sm backdrop-blur-sm transition-all active:scale-[0.96]"
              >
                {occasion}
              </span>
            ))}
          </div>

          <p className="pretty mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)]">
            Share the theme, flavor, and size for your Bikaner celebration. We turn that into an eggless cake that fits the table instead of trying to overpower it. The result looks deliberate, travels safely, and tastes fresh.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="surface rounded-2xl px-4 py-4">
              <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                Personalized design
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Share references, colors, and a rough mood.
              </p>
            </div>
            <div className="surface rounded-2xl px-4 py-4">
              <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                Fresh ingredients
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Everything is baked close to the delivery window.
              </p>
            </div>
          </div>

          <ul className="mt-8 space-y-3 text-[var(--color-text-dark)]">
            <li className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/12 text-[var(--color-gold)]"
              >
                <Check className="h-4 w-4" />
              </span>
              <span>
                Best for celebration cakes, gift orders, and smaller tiered
                builds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/12 text-[var(--color-gold)]"
              >
                <Check className="h-4 w-4" />
              </span>
              <span>
                Choose from chocolate, fruit, vanilla, and richer dessert-style
                finishes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/12 text-[var(--color-gold)]"
              >
                <Check className="h-4 w-4" />
              </span>
              <span>
                WhatsApp confirmation keeps the ordering flow fast and easy to
                track.
              </span>
            </li>
          </ul>

          <button
            type="button"
            onClick={onOpenCustomOrder}
            className="mt-10 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--color-text-dark)] px-7 py-3 text-sm font-medium text-white shadow-[0_14px_36px_rgba(47,34,27,0.18)] transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 hover:bg-[var(--color-gold)]"
          >
            Design your cake
          </button>
        </motion.div>
      </div>
    </section>
  );
}
