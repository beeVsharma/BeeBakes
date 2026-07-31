"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface FocusTrapProps {
  children: ReactNode;
  active: boolean;
  /** Element to return focus to when the trap deactivates */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export default function FocusTrap({ children, active, returnFocusRef }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and trap focus when active
  useEffect(() => {
    if (!active) return;

    // Lock scroll
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Capture ref value inside the effect so cleanup uses the same reference
    const returnTarget = returnFocusRef?.current ?? null;

    // Move focus into modal on open
    const container = containerRef.current;
    if (container) {
      const firstFocusable = container.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
      firstFocusable?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !container) return;

      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
      ).filter((el) => !el.closest("[hidden]"));

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      // Restore focus to trigger element using the captured reference
      if (returnTarget) {
        returnTarget.focus();
      }
    };
  }, [active, returnFocusRef]);

  return <div ref={containerRef}>{children}</div>;
}
