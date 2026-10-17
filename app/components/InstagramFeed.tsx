"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { INSTAGRAM_URL } from "@/lib/constants";

const images = [
  {
    src: "/images/gallery_2_1781078565474.webp",
    alt: "Vanilla layered cake with fresh berries on top",
  },
  {
    src: "/images/gallery_5_1781078610969.webp",
    alt: "Artisan cookie box gift set, neatly packaged",
  },
  {
    src: "/images/gallery_6_1781078622372.webp",
    alt: "Caramel and butterscotch cake with clean finish",
  },
];

export default function InstagramFeed() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="mb-3 text-base md:text-lg font-semibold tracking-[0.1em] uppercase text-[var(--color-gold)]">
              Behind the counter
            </p>
            <h2 className="balance max-w-md text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-dark)] md:text-4xl">
              A visual feed that feels a little more like a mosaic
            </h2>
          </div>
          <p className="pretty max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)]">
            Each piece here is a real Bee Bakes creation — cakes, cookies, and
            dessert boxes that left our kitchen and made it to someone&rsquo;s
            table or celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {images.map((img, idx) => {
            return (
              <motion.a
                key={img.src}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${img.alt} — view on Instagram (opens in new tab)`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 34,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                }}
                className="surface group relative overflow-hidden rounded-[1.5rem] aspect-[4/3] sm:aspect-square md:aspect-[4/3] transition-transform duration-200 active:scale-[0.98]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                {/* CSS group-hover overlay — no React state needed */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(47,34,27,0.55)] px-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ExternalLink className="h-6 w-6" aria-hidden="true" />
                  <p className="mt-2 text-xs tracking-[0.14em] uppercase text-white/80">
                    View on Instagram
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-white/80 px-6 py-3 text-sm font-medium text-[var(--color-text-dark)] transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            View more on Instagram
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
