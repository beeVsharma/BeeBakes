// Shared business constants — reads from .env.local, falls back to defaults

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918866785016";

export const PHONE_NUMBER =
  process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+918866785016";

export const BUSINESS_EMAIL =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "beebakes.sharma97@gmail.com";

export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://www.instagram.com/beebakes_vartika/";

export const BUSINESS_NAME =
  process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Bee Bakes by Vartika";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bee-bakes.vercel.app";

export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
