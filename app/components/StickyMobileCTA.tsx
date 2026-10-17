"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";
import { PHONE_NUMBER, WHATSAPP_BASE_URL } from "@/lib/constants";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 px-4 md:hidden"
        >
          <div className="mx-auto flex max-w-lg items-center gap-2.5 rounded-[1.75rem] apple-glass-card p-2.5 shadow-[0_20px_50px_rgba(73,45,20,0.18)]">
            <a
              href={`tel:${PHONE_NUMBER}`}
              aria-label="Call Bee Bakes"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[var(--color-text-dark)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 active:scale-[0.97]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>
            <a
              href={`${WHATSAPP_BASE_URL}?text=Hi%20Bee%20Bakes%2C%20I%20would%20like%20to%20order%20a%20cake.`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp (opens in new tab)"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 active:scale-[0.97]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-2xl border border-[var(--color-card-border)] bg-white/90 text-[var(--color-text-dark)] shadow-sm transition-all duration-200 active:scale-[0.95]"
              aria-label="Dismiss quick contact bar"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
