"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Clock, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FocusTrap from "./FocusTrap";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { Product } from "@/lib/products";
import { slugify } from "@/lib/products";

type Props = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductModal({ product, isOpen, onClose }: Props) {
  // Ref for focus restoration when modal closes
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          {/* Backdrop — separate from modal content so exit animation works correctly */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-[rgba(47,34,27,0.55)] backdrop-blur-sm"
          />

          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="presentation"
          >
            <FocusTrap active={isOpen} returnFocusRef={triggerRef}>
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-modal-title"
                aria-describedby="product-modal-description"
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 18 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="surface relative max-h-[92vh] w-full max-w-3xl overflow-y-auto hide-scrollbar rounded-[1.5rem] md:rounded-[2rem]"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--color-text-dark)] shadow-[0_12px_28px_rgba(73,45,20,0.12)] transition-transform duration-300 hover:scale-105 hover:bg-white md:right-4 md:top-4 md:h-10 md:w-10"
                  aria-label="Close product details"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="grid md:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-[15rem] bg-[var(--color-bg-secondary)] sm:min-h-[18rem] md:min-h-[24rem]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col p-5 sm:p-6 md:p-8">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">
                      Bee Bakes exclusive
                    </p>
                    <h2
                      id="product-modal-title"
                      className="balance mt-2 text-2xl font-semibold text-[var(--color-text-dark)] sm:text-3xl"
                    >
                      {product.title}
                    </h2>
                    <p className="mt-3 text-xl font-semibold text-[var(--color-gold)] sm:text-2xl">
                      {product.price}
                    </p>

                    <p
                      id="product-modal-description"
                      className="pretty mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]"
                    >
                      {product.fullDescription || product.description}
                    </p>

                    <div className="mt-5 space-y-3">
                      {product.weight && (
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                          <ShoppingCart
                            className="h-4 w-4 text-[var(--color-gold)]"
                            aria-hidden="true"
                          />
                          <span>Weight: {product.weight}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                        <Clock
                          className="h-4 w-4 text-[var(--color-gold)]"
                          aria-hidden="true"
                        />
                        <span>Takeaway From Home</span>
                      </div>
                    </div>

                    {product.ingredients && product.ingredients.length > 0 && (
                      <div className="mt-5">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-text-dark)]">
                          Ingredients
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {product.ingredients.map((ingredient) => (
                            <span
                              key={ingredient}
                              className="rounded-full bg-[var(--color-bg-secondary)] px-3 py-1 text-xs text-[var(--color-text-dark)]"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Bee%20Bakes%2C%20I%20would%20like%20to%20order%20${encodeURIComponent(product.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-text-dark)] px-5 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-gold)]"
                    >
                      <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                      Continue on WhatsApp
                      <span className="sr-only">(opens in new tab)</span>
                    </a>

                    <Link
                      href={`/products/${slugify(product.title)}`}
                      onClick={onClose}
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-card-border)] bg-white px-5 py-3 text-sm font-medium text-[var(--color-text-dark)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      View full product page
                    </Link>
                  </div>
                </div>
              </motion.div>
            </FocusTrap>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
