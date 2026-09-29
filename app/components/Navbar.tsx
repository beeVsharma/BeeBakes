"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

type NavLink = {
  name: string;
  href: string;
  id: string;
};

const navLinks: NavLink[] = [
  { name: "Home", href: "#home", id: "home" },
  { name: "Creations", href: "#products", id: "products" },
  { name: "Custom", href: "#custom-cakes", id: "custom-cakes" },
  { name: "About", href: "#about", id: "about" },
  { name: "Notes", href: "#testimonials", id: "testimonials" },
];

export default function Navbar({
  onOpenCustomOrder,
}: {
  onOpenCustomOrder: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Ref to hamburger button so we can restore focus when menu closes
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 32);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    hamburgerRef.current?.focus();
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    closeMobileMenu();
    // scroll after menu-close animation + body scroll-lock cleared
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[var(--color-card-border)] bg-[rgba(251,247,241,0.88)] py-2.5 shadow-[0_12px_40px_rgba(73,45,20,0.08)] backdrop-blur-xl md:py-3"
          : "border-transparent bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
        <a
          href="#home"
          className="group flex items-center gap-3"
          aria-label="Bee Bakes by Vartika — Home"
        >
          <div
            className="relative h-10 w-10 overflow-hidden rounded-full md:h-12 md:w-12"
            aria-hidden="true"
          >
            <Image
              src="/images/logo.jpg"
              alt="Bee Bakes Logo"
              fill
              sizes="(max-width: 768px) 40px, 48px"
              className="object-cover"
              priority
            />
          </div>
          <span className="leading-tight">
            <span className="block text-lg font-semibold tracking-tight text-[var(--color-text-dark)] md:text-2xl">
              Bee Bakes
            </span>
            <span className="block text-[0.72rem] italic text-[var(--color-gold)] md:text-sm">
              by Vartika
            </span>
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-2 md:flex"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium tracking-wide ${
                  isActive
                    ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                    : "text-[var(--color-text-dark)] hover:bg-white/80 hover:text-[var(--color-gold)]"
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <button
            type="button"
            onClick={onOpenCustomOrder}
            className="ml-2 rounded-full bg-[var(--color-text-dark)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(47,34,27,0.18)] hover:-translate-y-0.5 hover:bg-[var(--color-gold)]"
          >
            Order now
          </button>
        </nav>

        <button
          ref={hamburgerRef}
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[var(--color-card-border)] bg-white/70 p-2 text-[var(--color-text-dark)] md:hidden"
          onClick={() => setMobileMenuOpen((value) => !value)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[var(--color-card-border)] bg-[rgba(251,247,241,0.98)] backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`rounded-2xl px-4 py-3 text-base font-medium ${
                      isActive
                        ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                        : "text-[var(--color-text-dark)] hover:bg-white/80 hover:text-[var(--color-gold)]"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  onOpenCustomOrder();
                }}
                className="mt-2 rounded-2xl bg-[var(--color-text-dark)] px-4 py-3 text-left text-base font-medium text-white hover:bg-[var(--color-gold)]"
              >
                Start a custom order
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
