"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Product, Category } from "@/lib/products";
import { categories, allProducts } from "@/lib/products";
import { WHATSAPP_NUMBER } from "@/lib/constants";

type Props = {
  onSelectProduct: (product: Product) => void;
};

export default function ExploreRange({ onSelectProduct }: Props) {
  const [activeTab, setActiveTab] = useState<Category>("All Items");

  const visibleProducts =
    activeTab === "All Items"
      ? allProducts
      : allProducts.filter((product) => product.category === activeTab);

  return (
    <section
      id="range"
      className="scroll-mt-28 px-4 py-20 md:scroll-mt-32 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-3 text-lg md:text-xl font-bold tracking-[0.24em] uppercase text-[var(--color-gold)] italic">
              Curated range
            </p>
            <h2 className="balance max-w-xl text-4xl font-semibold leading-[0.96] text-[var(--color-text-dark)] md:text-5xl">
              Explore a focused range that still feels complete
            </h2>
          </div>
          <p className="pretty max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)]">
            A curated selection across our most-loved categories — pick a tab to
            find what suits your occasion, whether it is a birthday, a gift, or
            a simple treat.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter by cake category"
          className="mb-10 flex overflow-x-auto hide-scrollbar gap-3 border-b border-[var(--color-card-border)] pb-4"
        >
          {categories.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium ${
                  isActive
                    ? "bg-[var(--color-text-dark)] text-white"
                    : "bg-white/75 text-[var(--color-text-muted)] hover:text-[var(--color-text-dark)]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            Showing{" "}
            <span className="font-semibold text-[var(--color-text-dark)]">
              {visibleProducts.length}
            </span>{" "}
            items
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Live updates based on the selected category
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {visibleProducts.map((product, idx) => (
            <motion.article
              key={product.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.05, duration: 0.45 }}
              onClick={() => onSelectProduct(product)}
              className={`surface group flex flex-col justify-between overflow-hidden rounded-[1.6rem] cursor-pointer hover:shadow-[0_12px_24px_rgba(73,45,20,0.06)] transition-all duration-300 ${
                activeTab === "All Items" && idx === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div
                    className={`relative overflow-hidden bg-[var(--color-bg-secondary)] ${activeTab === "All Items" && idx === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      {product.category}
                    </p>
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <h3 className="pretty text-lg font-semibold text-[var(--color-text-dark)]">
                        {product.title}
                      </h3>
                      <p className="shrink-0 text-sm font-semibold text-[var(--color-gold)]">
                        {product.price}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <span className="inline-flex items-center justify-center rounded-full border border-[var(--color-card-border)] bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-dark)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-white">
                    See details
                  </span>
                </div>
              </div>
            </motion.article>
          ))}

          {/* Custom order info card */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="surface rounded-[1.6rem] p-6 flex flex-col justify-between border border-dashed border-[var(--color-gold)]/30 bg-[var(--color-gold)]/[0.02]"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                Custom Orders
              </span>
              <h3 className="mt-3 text-lg font-semibold text-[var(--color-text-dark)]">
                Looking for customization?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {activeTab === "Cookies"
                  ? "We offer healthy options of whole wheat and gluten-free cookies made with premium ghee or butter as per your requirements."
                  : "We offer complete personalization for all cakes including custom themes, shapes, eggless builds, and special sizing according to your choice."}
              </p>

              {/* Bullet list details to fill the gap naturally */}
              {activeTab === "Cookies" ? (
                <ul className="mt-5 space-y-2.5 text-xs text-[var(--color-text-muted)]">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span>Healthy whole wheat options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span>Made with pure ghee or butter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span>Gluten-free cookies on request</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span>Customizable gift packs & sizes</span>
                  </li>
                </ul>
              ) : (
                <ul className="mt-5 space-y-2.5 text-xs text-[var(--color-text-muted)]">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span>Choose custom sizes & layers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span>Personalized photo & name toppers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span>100% Eggless builds available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span>Custom theme designs & colors</span>
                  </li>
                </ul>
              )}
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Bee%20Bakes%2C%20I%20would%20like%20to%20place%20a%20customized%20order.`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[var(--color-gold)] px-4 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-[var(--color-gold)]/95 shadow-[0_4px_12px_rgba(159,102,54,0.15)]"
            >
              Ask on WhatsApp
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
