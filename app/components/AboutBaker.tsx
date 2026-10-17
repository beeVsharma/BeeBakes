"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, ShieldCheck, MapPin } from "lucide-react";
import Image from "next/image";
import { WHATSAPP_BASE_URL } from "@/lib/constants";

export default function AboutBaker() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="scroll-mt-28 px-4 py-20 md:scroll-mt-32 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Image & studio visual */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="relative"
          >
            <div className="absolute -left-6 -top-6 h-56 w-56 rounded-full bg-[var(--color-gold)]/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white p-3 shadow-[0_30px_80px_rgba(73,45,20,0.12)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/gallery_1_1781078553517.webp"
                  alt="Vartika crafting artisanal eggless cakes at Bee Bakes studio in Bikaner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Floating trust badge */}
              <div className="absolute bottom-6 left-6 right-6 apple-glass-card rounded-[1.5rem] p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gold)]/12 text-[var(--color-gold)]">
                    <Heart className="h-5 w-5 fill-[var(--color-gold)]/20" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)]">
                      Bikaner Home Studio
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Handcrafted in small batches • 100% Eggless
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Story content */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="max-w-xl"
          >
            <p className="mb-3 text-base md:text-lg font-semibold tracking-[0.1em] uppercase text-[var(--color-gold)]">
              Meet the Baker
            </p>
            <h2 className="balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-[var(--color-text-dark)] md:text-5xl">
              Crafted with heart by Vartika in Bikaner
            </h2>

            <p className="pretty mt-6 text-base leading-relaxed text-[var(--color-text-muted)]">
              Bee Bakes started with a simple belief: eggless cakes should never taste like a compromise. Working from our dedicated home bakery studio in Bikaner, every single order is personally baked, frosted, and finished fresh by Vartika.
            </p>

            <p className="pretty mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">
              Instead of overly sweet fondants and artificial syrups, our focus stays on real ingredients — pure dairy butter, rich Belgian cocoa, and artisanal creams that let authentic flavours shine with a calmer, cleaner aesthetic.
            </p>

            {/* Core commitments grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="surface rounded-2xl p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-dark)]">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  <span>100% Eggless Kitchen</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">
                  Strictly vegetarian environment with pure ingredients for total peace of mind.
                </p>
              </div>

              <div className="surface rounded-2xl p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-dark)]">
                  <Sparkles className="h-4 w-4 text-[var(--color-gold)]" />
                  <span>Bespoke Custom Designs</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">
                  Tailored themes, photo toppers, and personalized finishes for birthdays & anniversaries.
                </p>
              </div>

              <div className="surface rounded-2xl p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-dark)]">
                  <Heart className="h-4 w-4 text-[var(--color-gold)]" />
                  <span>Zero Preservatives</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">
                  Baked exclusively against order confirmation so your dessert arrives moist and fresh.
                </p>
              </div>

              <div className="surface rounded-2xl p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-dark)]">
                  <MapPin className="h-4 w-4 text-[var(--color-gold)]" />
                  <span>Local Bikaner Takeaway</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">
                  Easy self-pickup from our home studio with careful packaging designed to travel safely.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`${WHATSAPP_BASE_URL}?text=Hi%20Vartika%2C%20I%20would%20like%20to%20know%20more%20about%20your%20cakes.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--color-text-dark)] px-7 py-3 text-sm font-medium text-white shadow-[0_14px_36px_rgba(47,34,27,0.18)] transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 hover:bg-[var(--color-gold)]"
              >
                Chat with Vartika on WhatsApp
              </a>
              <a
                href="#range"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[var(--color-card-border)] bg-white/80 px-6 py-3 text-sm font-medium text-[var(--color-text-dark)] shadow-sm transition-all duration-200 active:scale-[0.97] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              >
                Explore Full Menu
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
