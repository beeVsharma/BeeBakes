"use client";

import { memo, useState } from "react";
import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Cake, EggOff } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
  price: string;
  delay?: number;
  onClick?: () => void;
};

const ProductCard = memo(function ProductCard({
  title,
  description,
  image,
  price,
  delay = 0,
  onClick,
}: Props) {
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group h-full ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View details for ${title}` : undefined}
    >
      <div className="surface flex h-full flex-col overflow-hidden rounded-[1.75rem]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-secondary)]">
          <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-dark)] shadow-[0_10px_24px_rgba(73,45,20,0.08)]">
            <EggOff
              className="h-3 w-3 text-[var(--color-gold)]"
              aria-hidden="true"
            />
            Eggless
          </div>

          {!loaded && !imgError && (
            <div className="absolute inset-0 animate-pulse bg-white/30" />
          )}

          {imgError ? (
            <div className="absolute inset-0 grid place-items-center">
              <Cake
                className="h-12 w-12 text-[var(--color-gold)]/30"
                aria-hidden="true"
              />
            </div>
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              onLoad={() => setLoaded(true)}
              onError={() => setImgError(true)}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(47,34,27,0.18),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <h3 className="pretty text-lg font-semibold text-[var(--color-text-dark)] sm:text-xl">
              {title}
            </h3>
            <p className="pretty mt-2.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {description}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-lg font-semibold text-[var(--color-gold)]">
              {price}
            </p>
            {/* Visual affordance only — click is handled by the outer article element */}
            <span
              aria-hidden="true"
              className="mt-3.5 inline-flex items-center justify-center rounded-full border border-[var(--color-card-border)] bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-dark)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-white"
            >
              See details
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

export default ProductCard;
