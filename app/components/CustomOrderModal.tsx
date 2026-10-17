"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "./FocusTrap";
import { submitOrder } from "@/app/actions/submit-order";
import type { SubmitResult } from "@/app/actions/submit-order";

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CustomOrderFormData = {
  name: string;
  occasion: string;
  weight: string;
  flavor: string;
  details: string;
};

type FormErrors = Partial<Record<keyof CustomOrderFormData, string>>;

const initialFormData: CustomOrderFormData = {
  name: "",
  occasion: "",
  weight: "",
  flavor: "",
  details: "",
};

export default function CustomOrderModal({
  isOpen,
  onClose,
}: CustomOrderModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] =
    useState<CustomOrderFormData>(initialFormData);
  const [isPending, startTransition] = useTransition();

  const triggerRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 640);
    updateMobile();
    window.addEventListener("resize", updateMobile, { passive: true });
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (formData.name.trim().length < 2)
      nextErrors.name = "Please enter your full name.";
    if (!formData.occasion) nextErrors.occasion = "Choose the occasion.";
    if (!formData.weight) nextErrors.weight = "Pick a size.";
    if (formData.flavor.trim().length < 3)
      nextErrors.flavor = "Add at least one flavor idea.";
    if (formData.details.trim().length < 10)
      nextErrors.details = "Add a few more details.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmitError("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    startTransition(async () => {
      const result: SubmitResult = await submitOrder(formData);

      if (!result.success) {
        setSubmitError(result.error);
        return;
      }

      // Server validated & rate-limited — safe to open WhatsApp
      const popup = window.open(
        result.whatsappUrl,
        "_blank",
        "noopener,noreferrer",
      );
      if (!popup) {
        setSubmitError("WhatsApp popup blocked. Allow popups and try again.");
        return;
      }

      setSubmitError("");
      setIsSubmitted(true);
    });
  };

  const handleClose = useCallback(() => {
    onClose();
    const timer = window.setTimeout(() => {
      setIsSubmitted(false);
      setSubmitError("");
      setErrors({});
      setFormData(initialFormData);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose, isOpen]);

  const isSubmitting = isPending;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            aria-hidden="true"
            className="fixed inset-0 z-[100] bg-[rgba(47,34,27,0.58)] backdrop-blur-sm"
          />

          <div
            className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4"
            role="presentation"
          >
            <FocusTrap active={isOpen} returnFocusRef={triggerRef}>
              <motion.div
                drag={isMobile ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0.55, bottom: 0.55 }}
                dragSnapToOrigin={true}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 90 || info.velocity.y > 400) {
                    handleClose();
                  }
                }}
                initial={
                  isMobile
                    ? { y: "100%", opacity: 0.8 }
                    : { opacity: 0, scale: 0.96, y: 16 }
                }
                animate={
                  isMobile
                    ? { y: 0, opacity: 1 }
                    : { opacity: 1, scale: 1, y: 0 }
                }
                exit={
                  isMobile
                    ? { y: "100%", opacity: 0.5 }
                    : { opacity: 0, scale: 0.96, y: 16 }
                }
                transition={{
                  type: "spring",
                  stiffness: 440,
                  damping: 33.5,
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="custom-order-title"
                className="surface relative w-full max-w-2xl max-h-[88vh] sm:max-h-[90vh] overflow-y-auto hide-scrollbar rounded-t-[2rem] sm:rounded-[2rem] border-t border-white/70 shadow-[0_24px_60px_rgba(73,45,20,0.2)]"
              >
                {/* Mobile drag-down pull pill */}
                <div
                  className="flex sm:hidden w-full items-center justify-center pt-3 pb-1.5 touch-none"
                  aria-hidden="true"
                >
                  <div className="h-1.5 w-12 rounded-full bg-[var(--color-card-border)]/80" />
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="absolute right-3.5 top-3.5 z-10 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/90 text-[var(--color-text-dark)] shadow-[0_12px_28px_rgba(73,45,20,0.12)] transition-all active:scale-[0.96] hover:bg-white md:right-4 md:top-4"
                  aria-label="Close custom order form"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {isSubmitted ? (
                  <div className="p-8 text-center sm:p-10 md:p-12">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-gold)]/12 text-[var(--color-gold)]">
                      <svg
                        className="h-10 w-10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3
                      id="custom-order-title"
                      className="mt-6 text-2xl font-semibold text-[var(--color-text-dark)] sm:text-3xl"
                    >
                      Request sent
                    </h3>
                    <p className="pretty mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
                      Your details were opened in WhatsApp. Send the message and
                      we will continue from there.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-text-dark)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-gold)]"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="p-6 sm:p-8 md:p-10">
                    <div className="text-center">
                      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
                        Custom order
                      </p>
                      <h3
                        id="custom-order-title"
                        className="balance text-2xl font-semibold text-[var(--color-text-dark)] sm:text-3xl"
                      >
                        Design your dream cake
                      </h3>
                      <p className="pretty mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-text-muted)]">
                        Tell us the size, flavor, and finish you want. The form
                        is short on purpose so the handoff stays easy.
                      </p>
                    </div>

                    {submitError && (
                      <div
                        role="alert"
                        className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                      >
                        {submitError}
                      </div>
                    )}

                    <form
                      onSubmit={handleSubmit}
                      className="mt-8 space-y-5"
                      noValidate
                    >
                      <div>
                        <label
                          className="mb-1 block text-sm font-medium text-[var(--color-text-dark)]"
                          htmlFor="order-name"
                        >
                          Your name
                        </label>
                        <input
                          id="order-name"
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full rounded-2xl border border-[var(--color-card-border)] bg-white px-4 py-3 text-[var(--color-text-dark)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gold)] disabled:opacity-60"
                          placeholder="Riya Puri"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={
                            errors.name ? "name-error" : undefined
                          }
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            role="alert"
                            className="mt-1 text-xs text-red-600"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            className="mb-1 block text-sm font-medium text-[var(--color-text-dark)]"
                            htmlFor="order-occasion"
                          >
                            Occasion
                          </label>
                          <select
                            id="order-occasion"
                            required
                            name="occasion"
                            value={formData.occasion}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full rounded-2xl border border-[var(--color-card-border)] bg-white px-4 py-3 text-[var(--color-text-dark)] focus:border-[var(--color-gold)] disabled:opacity-60"
                            aria-invalid={Boolean(errors.occasion)}
                            aria-describedby={
                              errors.occasion ? "occasion-error" : undefined
                            }
                          >
                            <option value="">Select one</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.occasion && (
                            <p
                              id="occasion-error"
                              role="alert"
                              className="mt-1 text-xs text-red-600"
                            >
                              {errors.occasion}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            className="mb-1 block text-sm font-medium text-[var(--color-text-dark)]"
                            htmlFor="order-size"
                          >
                            Weight or size
                          </label>
                          <select
                            id="order-size"
                            required
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full rounded-2xl border border-[var(--color-card-border)] bg-white px-4 py-3 text-[var(--color-text-dark)] focus:border-[var(--color-gold)] disabled:opacity-60"
                            aria-invalid={Boolean(errors.weight)}
                            aria-describedby={
                              errors.weight ? "weight-error" : undefined
                            }
                          >
                            <option value="">Select one</option>
                            <option value="0.5 kg">0.5 kg</option>
                            <option value="1 kg">1 kg</option>
                            <option value="2 kg+">2 kg+</option>
                            <option value="Custom tiered">Custom tiered</option>
                          </select>
                          {errors.weight && (
                            <p
                              id="weight-error"
                              role="alert"
                              className="mt-1 text-xs text-red-600"
                            >
                              {errors.weight}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          className="mb-1 block text-sm font-medium text-[var(--color-text-dark)]"
                          htmlFor="order-flavor"
                        >
                          Flavor preference
                        </label>
                        <input
                          id="order-flavor"
                          required
                          type="text"
                          name="flavor"
                          value={formData.flavor}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full rounded-2xl border border-[var(--color-card-border)] bg-white px-4 py-3 text-[var(--color-text-dark)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gold)] disabled:opacity-60"
                          placeholder="Chocolate truffle, red velvet, mango"
                          aria-invalid={Boolean(errors.flavor)}
                          aria-describedby={
                            errors.flavor ? "flavor-error" : undefined
                          }
                        />
                        {errors.flavor && (
                          <p
                            id="flavor-error"
                            role="alert"
                            className="mt-1 text-xs text-red-600"
                          >
                            {errors.flavor}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="mb-1 block text-sm font-medium text-[var(--color-text-dark)]"
                          htmlFor="order-details"
                        >
                          Theme or design details
                        </label>
                        <textarea
                          id="order-details"
                          required
                          name="details"
                          value={formData.details}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          rows={4}
                          className="w-full resize-none rounded-2xl border border-[var(--color-card-border)] bg-white px-4 py-3 text-[var(--color-text-dark)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gold)] disabled:opacity-60"
                          placeholder="Add colors, theme ideas, or size notes."
                          aria-invalid={Boolean(errors.details)}
                          aria-describedby={
                            errors.details ? "details-error" : undefined
                          }
                        />
                        {errors.details && (
                          <p
                            id="details-error"
                            role="alert"
                            className="mt-1 text-xs text-red-600"
                          >
                            {errors.details}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#25D366] px-5 py-3.5 text-base font-semibold text-white shadow-[0_14px_36px_rgba(37,211,102,0.24)] transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 hover:bg-[#1ebd5a] disabled:opacity-60 disabled:hover:translate-y-0"
                      >
                        {isSubmitting ? "Sending..." : "Continue on WhatsApp"}
                      </button>
                    </form>
                  </div>
                )}
              </motion.div>
            </FocusTrap>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
