"use server";

import { z } from "zod";
import { headers } from "next/headers";

// ── Rate limiting ──
// ponytail: in-memory map, resets on server restart. Swap with Redis if deployed multi-instance.

const rateMap = new Map<
  string,
  {
    count30s: number;
    ts30s: number;
    countH: number;
    tsH: number;
    countD: number;
    tsD: number;
  }
>();

function rateLimit(ip: string): { ok: false; error: string } | { ok: true } {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? {
    count30s: 0,
    ts30s: now,
    countH: 0,
    tsH: now,
    countD: 0,
    tsD: now,
  };

  // Reset windows
  if (now - entry.ts30s > 30000) {
    entry.count30s = 0;
    entry.ts30s = now;
  }
  if (now - entry.tsH > 3600000) {
    entry.countH = 0;
    entry.tsH = now;
  }
  if (now - entry.tsD > 86400000) {
    entry.countD = 0;
    entry.tsD = now;
  }

  if (entry.count30s >= 3)
    return {
      ok: false,
      error: "Thoda ruko — 30 sec me ek baar baat karte hain 🐝",
    };
  if (entry.countH >= 10)
    return {
      ok: false,
      error: "Aaj kaafi ho gaye! Kal fir se baat karte hain 😊",
    };
  if (entry.countD >= 25)
    return {
      ok: false,
      error: "Aaj ka limit ho gaya. Kal naya order bhejna 🙏",
    };

  entry.count30s++;
  entry.countH++;
  entry.countD++;
  rateMap.set(ip, entry);
  return { ok: true };
}

// ── Schema ──

const orderSchema = z.object({
  name: z.string().min(2, "Name at least 2 characters"),
  occasion: z.string().min(1, "Occasion select karo"),
  weight: z.string().min(1, "Weight select karo"),
  flavor: z.string().min(3, "Flavor at least 3 characters"),
  details: z.string().min(10, "Details at least 10 characters"),
});

export type OrderInput = z.infer<typeof orderSchema>;

export type SubmitResult =
  { success: true; whatsappUrl: string } | { success: false; error: string };

export async function submitOrder(data: OrderInput): Promise<SubmitResult> {
  // Validate
  const parsed = orderSchema.safeParse(data);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { success: false, error: first?.message ?? "Invalid data" };
  }

  // Rate limit
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown";

  const limit = rateLimit(ip);
  if (!limit.ok) return { success: false, error: limit.error };

  // Build WhatsApp URL
  const message = [
    `Hi Bee Bakes by Vartika, I would like to design a custom cake.`,
    `Name: ${data.name}`,
    `Occasion: ${data.occasion}`,
    `Weight or size: ${data.weight}`,
    `Flavor preference: ${data.flavor}`,
    `Design details: ${data.details}`,
    `Please let me know the next steps.`,
  ].join("\n");

  const whatsappUrl = `https://wa.me/918866785016?text=${encodeURIComponent(message)}`;

  return { success: true, whatsappUrl };
}
