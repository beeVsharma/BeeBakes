"use client";

import { useState, useEffect } from "react";
import { Camera, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturesBar from "./components/FeaturesBar";
import AnimatedSection from "./components/AnimatedSection";
import ProductCard from "./components/ProductCard";
import CustomCakes from "./components/CustomCakes";
import ExploreRange from "./components/ExploreRange";
import InstagramFeed from "./components/InstagramFeed";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import StickyMobileCTA from "./components/StickyMobileCTA";
import ProductModal from "./components/ProductModal";
import type { Product } from "@/lib/products";
import CustomOrderModal from "./components/CustomOrderModal";
import SplashScreen from "./components/SplashScreen";
import { featuredProducts } from "@/lib/products";
import {
  PHONE_NUMBER,
  WHATSAPP_BASE_URL,
  INSTAGRAM_URL,
  BUSINESS_EMAIL,
} from "@/lib/constants";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleEmailClick = () => {
    const email = BUSINESS_EMAIL;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).catch(() => fallbackCopy(email));
    } else {
      fallbackCopy(email);
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const fallbackCopy = (text: string) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  };

  useEffect(() => {
    // Lock scroll and reset position so splash is always centred in viewport
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <SplashScreen isVisible={isLoading} />
      <div
        className="transition-opacity duration-700"
        style={{
          opacity: isLoading ? 0 : 1,
          pointerEvents: isLoading ? "none" : "auto",
        }}
      >
        <main
          id="content"
          className="relative min-h-screen overflow-hidden bg-[var(--color-bg-light)]"
        >
          <Navbar onOpenCustomOrder={() => setIsCustomOrderOpen(true)} />

          <div id="home">
            <Hero />
          </div>

          <FeaturesBar />

          <AnimatedSection
            id="products"
            className="scroll-mt-0 py-20 px-4 md:scroll-mt-0 md:py-24"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-14 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
                <div>
                  <p className="mb-3 text-lg md:text-xl font-bold tracking-[0.24em] uppercase text-[var(--color-gold)] italic">
                    Featured Cakes
                  </p>
                  <h2 className="balance max-w-xl text-4xl font-semibold text-[var(--color-text-dark)] md:text-5xl">
                    Our most talked-about cakes, baked fresh
                  </h2>
                </div>
                <p className="pretty max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)]">
                  A curated edit of our viral sensations and house favorites.
                  Crafted with premium ingredients and designed for tables that
                  deserve a memorable center piece.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {featuredProducts.map((product, idx) => (
                  <ProductCard
                    key={`${product.title}-${idx}`}
                    image={product.image}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    delay={idx * 0.08}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>

          <CustomCakes onOpenCustomOrder={() => setIsCustomOrderOpen(true)} />

          <ExploreRange
            onSelectProduct={(product) => setSelectedProduct(product)}
          />

          <AnimatedSection className="scroll-mt-28 py-20 px-4 md:scroll-mt-32 md:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-14 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
                <div>
                  <p className="mb-3 text-lg md:text-xl font-bold tracking-[0.24em] uppercase text-[var(--color-gold)] italic">
                    Simple ordering
                  </p>
                  <h2 className="balance max-w-xl text-4xl font-semibold text-[var(--color-text-dark)] md:text-5xl">
                    Three steps, without the usual back-and-forth
                  </h2>
                </div>
                <p className="pretty max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)]">
                  Pick a cake, share your details, and let us handle the finish.
                  The process stays lightweight so you can move from idea to
                  order without filling out a long form.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <article className="surface rounded-[1.75rem] p-7 shadow-[0_24px_60px_rgba(73,45,20,0.08)]">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-gold)]/10 text-2xl font-semibold text-[var(--color-gold)]">
                    1
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold text-[var(--color-text-dark)]">
                    Choose your cake
                  </h3>
                  <p className="pretty text-sm leading-relaxed text-[var(--color-text-muted)]">
                    Browse the signature edit or ask for a custom design if you
                    already know the occasion and flavor.
                  </p>
                </article>
                <article className="surface rounded-[1.75rem] p-7 shadow-[0_24px_60px_rgba(73,45,20,0.08)]">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-gold)]/10 text-2xl font-semibold text-[var(--color-gold)]">
                    2
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold text-[var(--color-text-dark)]">
                    Share the details
                  </h3>
                  <p className="pretty text-sm leading-relaxed text-[var(--color-text-muted)]">
                    Send size, flavor, occasion, and any reference notes. We
                    keep the form short and practical.
                  </p>
                </article>
                <article className="surface rounded-[1.75rem] p-7 shadow-[0_24px_60px_rgba(73,45,20,0.08)]">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-gold)]/10 text-2xl font-semibold text-[var(--color-gold)]">
                    3
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold text-[var(--color-text-dark)]">
                    Confirm and receive
                  </h3>
                  <p className="pretty text-sm leading-relaxed text-[var(--color-text-muted)]">
                    We confirm the order on WhatsApp and keep the delivery or
                    pickup steps easy to follow.
                  </p>
                </article>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            id="testimonials"
            className="scroll-mt-0 py-20 px-4 md:scroll-mt-0 md:py-24"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-14 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
                <div>
                  <p className="mb-3 text-lg md:text-xl font-bold tracking-[0.24em] uppercase text-[var(--color-gold)] italic">
                    Customer notes
                  </p>
                  <h2 className="balance max-w-xl text-3xl font-semibold text-[var(--color-text-dark)] md:text-4xl">
                    Feedback that tells the real story
                  </h2>
                </div>
                <p className="pretty max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)]">
                  A good bakery page needs proof that feels specific. These
                  notes lean toward clear details instead of polished slogans.
                </p>
              </div>

              <TestimonialsCarousel />
            </div>
          </AnimatedSection>

          <StickyMobileCTA />

          <InstagramFeed />

          <ProductModal
            product={selectedProduct}
            isOpen={Boolean(selectedProduct)}
            onClose={() => setSelectedProduct(null)}
          />

          <CustomOrderModal
            isOpen={isCustomOrderOpen}
            onClose={() => setIsCustomOrderOpen(false)}
          />

          <footer
            id="footer"
            className="border-t border-[var(--color-card-border)] px-4 py-14 md:py-16"
          >
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_.9fr_.9fr_.8fr] lg:gap-12">
              <div>
                <h3 className="balance text-3xl font-semibold text-[var(--color-text-dark)] md:text-4xl">
                  Bee Bakes{" "}
                  <span className="mt-1 block text-xl font-normal italic text-[var(--color-gold)]">
                    by Vartika
                  </span>
                </h3>
                <p className="mt-4 max-w-md text-sm leading-[1.7] text-[var(--color-text-muted)]">
                  Eggless custom cakes, artisan cookies, and dessert boxes baked
                  for celebrations that need a clean finish and reliable timing.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-white px-4 py-2 text-sm text-[var(--color-text-dark)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:shadow-[0_12px_24px_rgba(73,45,20,0.08)]"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call
                  </a>
                  <a
                    href={`${WHATSAPP_BASE_URL}?text=Hi%20Bee%20Bakes%2C%20I%20would%20like%20to%20place%20an%20order.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-white px-4 py-2 text-sm text-[var(--color-text-dark)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:shadow-[0_12px_24px_rgba(73,45,20,0.08)]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${BUSINESS_EMAIL}`}
                    onClick={handleEmailClick}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-white px-4 py-2 text-sm text-[var(--color-text-dark)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:shadow-[0_12px_24px_rgba(73,45,20,0.08)]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {copiedEmail ? "Copied!" : "Email"}
                  </a>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-dark)]">
                  Quick links
                </h4>
                <ul className="space-y-2.5 text-sm text-[var(--color-text-muted)]">
                  <li>
                    <a
                      href="#products"
                      className="hover:text-[var(--color-gold)]"
                    >
                      Our cakes
                    </a>
                  </li>
                  <li>
                    <a
                      href="#custom-cakes"
                      className="hover:text-[var(--color-gold)]"
                    >
                      Custom cakes
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="hover:text-[var(--color-gold)]"
                    >
                      Customer notes
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-[var(--color-gold)]"
                    >
                      Privacy policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-[var(--color-gold)]"
                    >
                      Terms of service
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-dark)]">
                  Visit
                </h4>
                <ul className="space-y-2.5 text-sm text-[var(--color-text-muted)]">
                  <li>Premium Cloud Bakery</li>
                  <li>Bikaner, Rajasthan</li>
                  <li>Order slot confirmation on WhatsApp</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-dark)]">
                  Follow
                </h4>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-white px-4 py-2 text-sm text-[var(--color-text-dark)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:shadow-[0_12px_24px_rgba(73,45,20,0.08)]"
                >
                  <Camera className="h-4 w-4" aria-hidden="true" />
                  Instagram
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
