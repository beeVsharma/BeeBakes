"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Camera, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturesBar from "./components/FeaturesBar";
import AnimatedSection from "./components/AnimatedSection";
import ProductCard from "./components/ProductCard";
import CustomCakes from "./components/CustomCakes";
import AboutBaker from "./components/AboutBaker";
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

let splashListeners: Array<() => void> = [];
const splashStore = {
  subscribe(listener: () => void) {
    splashListeners.push(listener);
    return () => {
      splashListeners = splashListeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false;
    }
    try {
      return !sessionStorage.getItem("beebakes_splash_shown");
    } catch {
      return false;
    }
  },
  dismiss() {
    try {
      sessionStorage.setItem("beebakes_splash_shown", "1");
    } catch {
      // ignore storage errors
    }
    splashListeners.forEach((l) => l());
  },
};

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const showSplash = useSyncExternalStore(
    splashStore.subscribe,
    splashStore.getSnapshot,
    () => false,
  );
  const [splashDismissed, setSplashDismissed] = useState(false);
  const isSplashActive = showSplash && !splashDismissed;

  const dismissSplash = () => {
    splashStore.dismiss();
    setSplashDismissed(true);
    document.body.style.overflow = "";
  };

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
    if (!isSplashActive) return;

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      dismissSplash();
    }, 1200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isSplashActive]);

  return (
    <>
      <SplashScreen isVisible={isSplashActive} onDismiss={dismissSplash} />
      <div
        className="transition-opacity duration-700"
        style={{
          opacity: isSplashActive ? 0 : 1,
          pointerEvents: isSplashActive ? "none" : "auto",
        }}
      >
        <main
          id="content"
          className="relative min-h-screen overflow-x-clip bg-[var(--color-bg-light)]"
        >
          <Navbar onOpenCustomOrder={() => setIsCustomOrderOpen(true)} />

          <div id="home">
            <Hero />
          </div>

          <FeaturesBar />

          <AnimatedSection
            id="products"
            className="scroll-mt-28 py-20 px-4 md:scroll-mt-32 md:py-24"
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

          <AboutBaker />

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
            className="scroll-mt-28 py-20 px-4 md:scroll-mt-32 md:py-24"
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

          {/* ── FAQ Section — "Baking & delivery in Bikaner" ── */}
          <AnimatedSection id="faq" className="scroll-mt-28 py-20 px-4 md:scroll-mt-32 md:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-14 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
                <div>
                  <p className="mb-3 text-lg md:text-xl font-bold tracking-[0.24em] uppercase text-[var(--color-gold)] italic">
                    Common Questions
                  </p>
                  <h2 className="balance max-w-xl text-3xl font-semibold text-[var(--color-text-dark)] md:text-4xl">
                    Baking & delivery in Bikaner
                  </h2>
                </div>
                <p className="pretty max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)]">
                  Quick answers to the questions we get most often. If something isn&rsquo;t covered here, drop us a message on WhatsApp.
                </p>
              </div>

              <div className="mx-auto max-w-3xl divide-y divide-[var(--color-card-border)]">
                <details className="group py-5" open>
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-[var(--color-text-dark)] md:text-lg">
                    How much advance notice do I need to place an order?
                    <span className="ml-4 text-[var(--color-gold)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    We ask for at least 48 hours for custom cakes so we can bake fresh and give proper attention to design. Cookies and standard flavours can sometimes be ready same-day — just confirm availability on WhatsApp.
                  </p>
                </details>

                <details className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-[var(--color-text-dark)] md:text-lg">
                    Are all your cakes eggless?
                    <span className="ml-4 text-[var(--color-gold)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    Yes, every cake and cookie we make is 100% eggless. We use premium-quality butter, cream, and vegetarian ingredients. No compromise on taste or texture.
                  </p>
                </details>

                <details className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-[var(--color-text-dark)] md:text-lg">
                    Do you deliver across Bikaner?
                    <span className="ml-4 text-[var(--color-gold)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    We currently operate as a takeaway-from-home studio in Bikaner. You can pick up your order directly from our home kitchen. For special arrangements, message us on WhatsApp and we&rsquo;ll work something out.
                  </p>
                </details>

                <details className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-[var(--color-text-dark)] md:text-lg">
                    Can I get a fully custom design with photo toppers and themes?
                    <span className="ml-4 text-[var(--color-gold)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    Absolutely. Share your theme, color preferences, and any photos on WhatsApp. We handle photo toppers, name toppers, custom shapes, and themed designs for birthdays, anniversaries, and corporate events.
                  </p>
                </details>

                <details className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-[var(--color-text-dark)] md:text-lg">
                    What is the price range for cakes?
                    <span className="ml-4 text-[var(--color-gold)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    Our cakes start at ₹400 for a 1 Pound classic flavour (vanilla, black forest) and go up to ₹800 for premium cheesecakes (Biscoff, Nutella). Cookies start at ₹220 per box. Custom designs may vary — just ask for a quote on WhatsApp.
                  </p>
                </details>
              </div>
            </div>

            {/* FAQPage JSON-LD for Google rich results */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "How much advance notice do I need to place an order?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "We ask for at least 48 hours for custom cakes so we can bake fresh and give proper attention to design. Cookies and standard flavours can sometimes be ready same-day — just confirm availability on WhatsApp.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Are all your cakes eggless?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, every cake and cookie we make is 100% eggless. We use premium-quality butter, cream, and vegetarian ingredients. No compromise on taste or texture.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Do you deliver across Bikaner?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "We currently operate as a takeaway-from-home studio in Bikaner. You can pick up your order directly from our home kitchen. For special arrangements, message us on WhatsApp.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Can I get a fully custom design with photo toppers and themes?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Absolutely. Share your theme, color preferences, and any photos on WhatsApp. We handle photo toppers, name toppers, custom shapes, and themed designs for birthdays, anniversaries, and corporate events.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What is the price range for cakes?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Our cakes start at ₹400 for a 1 Pound classic flavour and go up to ₹800 for premium cheesecakes. Cookies start at ₹220 per box. Custom designs may vary.",
                      },
                    },
                  ],
                }),
              }}
            />
          </AnimatedSection>

          <footer
            id="footer"
            className="border-t border-[var(--color-card-border)] px-4 pt-14 pb-28 md:py-16"
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
                      Featured cakes
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
                      href="#about"
                      className="hover:text-[var(--color-gold)]"
                    >
                      About Vartika
                    </a>
                  </li>
                  <li>
                    <a
                      href="#range"
                      className="hover:text-[var(--color-gold)]"
                    >
                      Explore menu
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="hover:text-[var(--color-gold)]"
                    >
                      Common questions
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
                  Bakery Studio
                </h4>
                <ul className="space-y-2.5 text-sm text-[var(--color-text-muted)]">
                  <li className="font-medium text-[var(--color-text-dark)]">Bee Bakes by Vartika</li>
                  <li>Home Bakery Studio</li>
                  <li>Bikaner, Rajasthan 334001</li>
                  <li>Takeaway & Local Pick-up</li>
                  <li className="pt-1 text-xs text-[var(--color-gold)] font-medium">9:00 AM – 9:00 PM (Bake-to-order)</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-dark)]">
                  Follow & Connect
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
                <p className="mt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
                  Fresh cake videos, behind-the-counter bakes, and daily orders showcased on Instagram.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-7xl border-t border-[var(--color-card-border)] pt-8 text-center text-xs text-[var(--color-text-muted)]">
              <p>
                © {new Date().getFullYear()} Bee Bakes by Vartika. All rights reserved. • 100% Eggless Custom Cakes, Artisan Cookies & Cheesecakes in Bikaner, Rajasthan.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
