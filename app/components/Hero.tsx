"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-light)] pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top_left,rgba(159,102,54,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(239,227,215,0.7),transparent_26%)]" />
      <div className="absolute left-[8%] top-1/4 h-72 w-72 rounded-full bg-[var(--color-gold)]/8 blur-3xl" />
      <div className="absolute right-[12%] top-[18%] h-80 w-80 rounded-full bg-white/45 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-lg md:text-xl font-bold tracking-[0.24em] uppercase text-[var(--color-gold)] italic"
          >
            Bikaner bakery studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="balance max-w-3xl text-[2.1rem] font-semibold leading-[0.94] text-[var(--color-text-dark)] sm:text-5xl md:text-7xl lg:text-8xl"
          >
            Custom cakes with a calmer, cleaner finish
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.75 }}
            className="pretty mt-4 max-w-lg text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base md:text-lg"
          >
            Eggless cakes, artisan cookies, and dessert boxes baked fresh in
            Bikaner. The result stays polished, practical, and easy to
            coordinate from first message to final handoff.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.65 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-text-dark)] px-7 py-3.5 text-sm font-medium text-white shadow-[0_14px_36px_rgba(47,34,27,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-gold)] hover:shadow-[0_18px_42px_rgba(159,102,54,0.24)]"
            >
              Browse the collection
            </a>
            <a
              href="#custom-cakes"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-card-border)] bg-white/75 px-7 py-3.5 text-sm font-medium text-[var(--color-text-dark)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:shadow-[0_16px_34px_rgba(73,45,20,0.08)]"
            >
              Start a custom order
            </a>
          </motion.div>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3 md:mt-10">
            <div className="surface rounded-2xl px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Turnaround
              </p>
              <p className="mt-1 text-lg font-semibold text-[var(--color-text-dark)]">
                24 to 48 hours
              </p>
            </div>
            <div className="surface rounded-2xl px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Style
              </p>
              <p className="mt-1 text-lg font-semibold text-[var(--color-text-dark)]">
                Clean, elegant, eggless
              </p>
            </div>
            <div className="surface rounded-2xl px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Ordering
              </p>
              <p className="mt-1 text-lg font-semibold text-[var(--color-text-dark)]">
                WhatsApp coordination
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
          className="relative lg:justify-self-end w-full"
        >
          <div className="absolute -left-6 top-10 h-36 w-36 rounded-full bg-[var(--color-gold)]/12 blur-3xl md:h-40 md:w-40" />

          <div className="grid grid-cols-2 gap-4 h-[25rem] sm:h-[30rem] lg:h-[34rem] w-full">
            {/* Left Tall Card - Main Cake */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2.5 shadow-[0_20px_50px_rgba(73,45,20,0.12)]">
              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/images/hero_paris_cake_1781078465181.webp"
                  alt="A tall custom celebration cake finished with clean floral decoration"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right Column - Split secondary items */}
            <div className="grid grid-rows-2 gap-4 h-full">
              {/* Top: Chocolate cake */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2.5 shadow-[0_20px_50px_rgba(73,45,20,0.12)]">
                <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/images/cake_chocolate_1781078477202.webp"
                    alt="Belgian Chocolate Bliss cake"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Bottom: Cookies */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2.5 shadow-[0_20px_50px_rgba(73,45,20,0.12)]">
                <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/images/cookies_premium_1781081328320.webp"
                    alt="Artisan chocolate chip cookies"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 surface max-w-[90%] rounded-[1.5rem] px-5 py-3.5 shadow-[0_20px_50px_rgba(73,45,20,0.16)] sm:left-6 sm:translate-x-0 sm:max-w-xs">
            <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--color-gold)]">
              Handcrafted in Bikaner
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
              Eggless custom cakes, fresh artisan cookies, and celebration
              dessert boxes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
