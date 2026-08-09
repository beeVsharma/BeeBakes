"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  isVisible: boolean;
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * 2 * Math.PI;
  const distance = i % 2 === 0 ? 88 : 112;
  const sizes = [6, 4, 3, 5, 4, 3, 6, 4, 3, 5, 4, 3, 6, 4, 3, 5, 4, 3, 6, 4];
  const delays = [
    0, 0.04, 0.08, 0.02, 0.06, 0.1, 0.03, 0.07, 0.01, 0.05, 0, 0.04, 0.08, 0.02,
    0.06, 0.1, 0.03, 0.07, 0.01, 0.05,
  ];
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: sizes[i],
    delay: delays[i],
  };
});

export default function SplashScreen({ isVisible }: SplashScreenProps) {
  const circumference = 2 * Math.PI * 62;
  const [ringComplete, setRingComplete] = useState(false);
  const logoControls = useAnimation();
  const ringControls = useAnimation();

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(async () => {
      setRingComplete(true);
      ringControls.start({
        scale: 0,
        opacity: 0,
        transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
      });
      await logoControls.start({
        scale: [1, 1.2, 0.92, 1.08, 1],
        transition: { duration: 0.55, ease: "easeOut" },
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [isVisible, logoControls, ringControls]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#fbf7f1" }}
        >
          {/* ── Rich background layer ── */}

          {/* Top-left large warm glow */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-[rgba(159,102,54,0.10)] blur-[90px]" />
          {/* Bottom-right large peach glow */}
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-[32rem] w-[32rem] rounded-full bg-[rgba(239,215,190,0.55)] blur-[100px]" />
          {/* Top-right accent */}
          <div className="pointer-events-none absolute right-10 top-10 h-56 w-56 rounded-full bg-[rgba(255,237,210,0.6)] blur-[60px]" />
          {/* Bottom-left accent */}
          <div className="pointer-events-none absolute bottom-16 left-12 h-48 w-48 rounded-full bg-[rgba(159,102,54,0.07)] blur-[50px]" />

          {/* Decorative floating dots — scattered around */}
          {[
            { cx: "8%", cy: "12%", r: 5 },
            { cx: "92%", cy: "8%", r: 4 },
            { cx: "5%", cy: "55%", r: 3 },
            { cx: "95%", cy: "45%", r: 6 },
            { cx: "15%", cy: "88%", r: 4 },
            { cx: "85%", cy: "85%", r: 5 },
            { cx: "50%", cy: "5%", r: 3 },
            { cx: "50%", cy: "95%", r: 4 },
            { cx: "22%", cy: "35%", r: 3 },
            { cx: "78%", cy: "65%", r: 3 },
          ].map((dot, i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute rounded-full bg-[rgba(159,102,54,0.18)]"
              style={{
                left: dot.cx,
                top: dot.cy,
                width: dot.r * 2,
                height: dot.r * 2,
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Decorative corner arcs */}
          <svg
            className="pointer-events-none absolute left-0 top-0 h-64 w-64 opacity-[0.06]"
            viewBox="0 0 256 256"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="0"
              cy="0"
              r="180"
              stroke="rgba(159,102,54,1)"
              strokeWidth="1.5"
            />
            <circle
              cx="0"
              cy="0"
              r="220"
              stroke="rgba(159,102,54,1)"
              strokeWidth="1"
            />
          </svg>
          <svg
            className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 opacity-[0.06]"
            viewBox="0 0 256 256"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="256"
              cy="256"
              r="180"
              stroke="rgba(159,102,54,1)"
              strokeWidth="1.5"
            />
            <circle
              cx="256"
              cy="256"
              r="220"
              stroke="rgba(159,102,54,1)"
              strokeWidth="1"
            />
          </svg>

          {/* ── Central content ── */}
          <div className="relative flex items-center justify-center">
            {/* Particle burst */}
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: "rgba(159,102,54,0.78)",
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={
                  ringComplete
                    ? {
                        x: p.x,
                        y: p.y,
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.3, 1, 0],
                      }
                    : { x: 0, y: 0, opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
              />
            ))}

            {/* SVG Ring */}
            <motion.svg
              className="absolute"
              width="136"
              height="136"
              viewBox="0 0 136 136"
              fill="none"
              aria-hidden="true"
              animate={ringControls}
              initial={{ scale: 1, opacity: 1 }}
            >
              <circle
                cx="68"
                cy="68"
                r="62"
                stroke="rgba(159,102,54,0.12)"
                strokeWidth="3"
              />
              <motion.circle
                cx="68"
                cy="68"
                r="62"
                stroke="rgba(159,102,54,0.8)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 5.0, ease: "easeInOut" }}
                style={{ transformOrigin: "68px 68px", rotate: "-90deg" }}
              />
            </motion.svg>

            {/* Ambient glow behind logo */}
            <motion.div
              className="absolute h-36 w-36 rounded-full bg-[rgba(159,102,54,0.12)] blur-2xl"
              animate={
                ringComplete
                  ? { scale: 2, opacity: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.5 }}
            />

            {/* Logo */}
            <motion.div
              initial={{ scale: 0.78, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={logoControls}
                className="relative h-[96px] w-[96px] overflow-hidden rounded-full border-[3px] border-white bg-white shadow-[0_0_0_6px_rgba(159,102,54,0.08),0_20px_60px_rgba(73,45,20,0.18)]"
              >
                <Image
                  src="/images/logo.jpg"
                  alt="Bee Bakes by Vartika"
                  fill
                  sizes="96px"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.65, ease: "easeOut" }}
            className="mt-8 flex flex-col items-center gap-1 text-center"
          >
            <p
              className="text-[1.5rem] font-semibold tracking-tight text-[var(--color-text-dark)]"
              style={{ fontFamily: "var(--font-fraunces, serif)" }}
            >
              Bee Bakes
            </p>
            <p className="text-sm italic text-[var(--color-gold)]">
              by Vartika
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.9 }}
            className="mt-4 text-xs tracking-[0.24em] uppercase text-[var(--color-text-muted)]"
          >
            Baking something special&hellip;
          </motion.p>

          {/* Welcome notice — AI concept disclosure */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-6 max-w-xs px-6 text-center"
          >
            <p
              className="text-3xl font-bold text-[var(--color-text-dark)]"
              style={{ fontFamily: "var(--font-fraunces, serif)" }}
            >
              Welcome
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-text-muted)]">
              All cake designs shown on this website are AI-generated concept
              illustrations. Every cake you order is hand-crafted fresh, exactly
              to your design.
            </p>
          </motion.div>

          {/* Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: ringComplete ? 0 : 1 }}
            transition={{ delay: ringComplete ? 0 : 0.75, duration: 0.3 }}
            className="mt-7 flex items-center gap-2.5"
            aria-label="Loading"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]"
                animate={{ scale: [1, 1.55, 1], opacity: [0.35, 1, 0.35] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
