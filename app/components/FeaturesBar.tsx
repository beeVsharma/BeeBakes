"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock3, Sparkles, Truck } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Careful ingredient selection",
    subtitle: "Fresh dairy, balanced sweetness, and a finish that travels well.",
  },
  {
    icon: Clock3,
    title: "Fast, practical turnaround",
    subtitle: "Most standard orders can be confirmed without a long back and forth.",
  },
  {
    icon: Sparkles,
    title: "Custom finishes",
    subtitle: "Clean decoration, tiered cakes, and gift-ready packaging when needed.",
  },
  {
    icon: Truck,
    title: "Local delivery support",
    subtitle: "Built for Bikaner orders that need a simple, reliable handoff.",
  },
];

export default function FeaturesBar() {
  return (
    <section className="border-y border-[var(--color-card-border)] bg-[rgba(255,255,255,0.42)] px-4 py-8 md:py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <p className="mb-3 text-lg md:text-xl font-bold tracking-[0.24em] uppercase text-[var(--color-gold)] italic">
            Why it feels different
          </p>
          <h2 className="balance max-w-md text-3xl font-semibold text-[var(--color-text-dark)] md:text-4xl">
            A quieter bakery workflow, presented with more care
          </h2>
          <p className="pretty mt-4 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
            We keep the page and the process lightweight. The aim is less visual noise, clearer ordering,
            and a better sense of what you are actually buying.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="surface rounded-[1.5rem] p-5 shadow-[0_18px_45px_rgba(73,45,20,0.08)]"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-[var(--color-text-dark)]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {feature.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
