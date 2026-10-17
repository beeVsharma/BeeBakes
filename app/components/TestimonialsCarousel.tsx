"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The cake looked neat on the table and held up well on the drive home. It was sweet without feeling heavy.",
    name: "Riya Puri",
    role: "Birthday order",
    rating: 5,
  },
  {
    quote:
      "We asked for a red velvet finish with a simple look. The result felt clean, not overdecorated, and the whole family liked it.",
    name: "Abhishek Pandey",
    role: "Family celebration",
    rating: 5,
  },
  {
    quote:
      "The cookie box was fresh and well packed. It worked as a small office gift and did not feel generic.",
    name: "Harleen Kaur",
    role: "Corporate order",
    rating: 4,
  },
  {
    quote:
      "The order moved through WhatsApp quickly, and the size guidance was practical. That made the decision easy.",
    name: "Preet Singh",
    role: "Custom cake",
    rating: 5,
  },
  {
    quote:
      "The tin cake was the part people remembered because it looked thoughtful and arrived without damage.",
    name: "Tara Sharma",
    role: "Gift order",
    rating: 5,
  },
];

type TestimonialData = (typeof testimonials)[number];

function StarRating({ rating }: { rating: number }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} className="flex gap-1">
      {Array.from({ length: rating }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className="h-4 w-4 fill-[var(--color-gold)] text-[var(--color-gold)]"
        />
      ))}
    </div>
  );
}

function TestimonialItem({
  testimonial,
  delay = 0,
  className = "",
}: {
  testimonial: TestimonialData;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 34,
        delay: shouldReduceMotion ? 0 : delay,
      }}
      className={`surface rounded-[1.75rem] p-5 sm:p-6 transition-all duration-200 active:scale-[0.98] ${className}`}
    >
      <StarRating rating={testimonial.rating} />
      <p className="pretty mt-4 text-sm leading-relaxed text-[var(--color-text-dark)]">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-5">
        <p className="font-semibold text-[var(--color-text-dark)]">
          {testimonial.name}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          {testimonial.role}
        </p>
      </div>
    </motion.article>
  );
}

export default function TestimonialsCarousel() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {/* Featured testimonial */}
      <motion.article
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
        whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 34,
        }}
        className="surface rounded-[2rem] p-6 sm:p-7 lg:col-span-7"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)]">
          Featured note
        </p>
        <StarRating rating={testimonials[0].rating} />
        <p className="pretty mt-5 text-[1.7rem] leading-[1.28] tracking-[-0.015em] text-[var(--color-text-dark)] md:text-[1.9rem]">
          &ldquo;{testimonials[0].quote}&rdquo;
        </p>
        <div className="mt-7">
          <p className="font-semibold text-[var(--color-text-dark)]">
            {testimonials[0].name}
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            {testimonials[0].role}
          </p>
        </div>
      </motion.article>

      {/* Side testimonials */}
      <div className="grid gap-4 lg:col-span-5">
        {testimonials.slice(1, 3).map((testimonial, index) => (
          <TestimonialItem
            key={testimonial.name}
            testimonial={testimonial}
            delay={index * 0.08}
          />
        ))}
      </div>

      {/* Bottom testimonials */}
      <div className="grid gap-4 md:grid-cols-2 lg:col-span-12">
        {testimonials.slice(3).map((testimonial, index) => (
          <TestimonialItem
            key={testimonial.name}
            testimonial={testimonial}
            delay={index * 0.08 + 0.08}
          />
        ))}
      </div>
    </div>
  );
}
