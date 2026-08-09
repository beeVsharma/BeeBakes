# Hyperframes Composition Brief: Bee Bakes by Vartika

## Objective

Create a short launch-style brag video for Bee Bakes by Vartika, a Bikaner custom-cake bakery.

## Output

- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds

## Source Material

- Project root: `C:\Users\PREET\Desktop\vertikaa`
- Primary files read: `app/page.tsx`, `app/components/Hero.tsx`, `app/components/CustomCakes.tsx`, `app/components/FeaturesBar.tsx`, `app/components/TestimonialsCarousel.tsx`, `lib/products.ts`, `lib/constants.ts`, `app/globals.css`
- Product name: Bee Bakes by Vartika
- Tagline / strongest claim: "Custom cakes with a calmer, cleaner finish" (hero h1)
- Key UI or visual moment to recreate: the cake product cards with gold italic labels ("Featured Cakes") and the three-step "Simple ordering" flow
- Copy that must appear verbatim:
  - "Custom cakes with a calmer, cleaner finish"
  - "Eggless cakes, artisan cookies, and dessert boxes baked fresh in Bikaner"
  - "100% Eggless builds available"
  - "Everything is baked close to the delivery window."
  - "1 Choose your cake / 2 Share the details / 3 Confirm and receive"
  - "Order on WhatsApp"
  - Cake names + prices: "London Viral Whipped Caramel Cream Cake — Rs 700", "Tiramisu Cake — Rs 600", "Biscoff Cheesecake — Rs 800"

## Creative Direction

- Tone preset: **polished**
- Creative direction: quiet premium product film for a small-city bakery
- Interpretation: few scenes, longer holds, confidence through restraint. Cream/gold/cocoa palette straight from the site CSS variables. Serif display for warmth, sans body for clarity. Soft crossfades and gentle wipes.
- Angle: A quiet premium bakery reveal — calm, elegant, eggless. Real cakes, real rupee prices, honest claims.
- Hook: Serif "Bee Bakes" + italic gold "by Vartika" + "Custom cakes with a calmer, cleaner finish" over a soft gold halo on deep cocoa.
- Outro / punchline: "Order on WhatsApp." then the logo lock with a single dry hit.
- Avoid:
  - Generic SaaS language ("streamline your workflow")
  - Abstract filler visuals
  - Unrelated visual redesign (keep the site's cream/gold/cocoa)

## Visual Identity

- Background: `#fbf7f1` (light cream) for most scenes; `#2f221b` (deep cocoa) for hook/outro
- Text: `#2f221b` (dark cocoa) on light; `#fbf7f1` (cream) on dark
- Muted text: `#6f5846`
- Accent: `#9f6636` (gold)
- Display font: warm serif (Playfair Display) — matches the site's italic gold headings
- Body font: system sans (Inter)
- Visual references from the project: cake card images (assets/images/cake_london_caramel.webp, cake_tiramisu.webp, cake_cheesecake_biscoff.webp), gold italic section labels

## Storyboard

Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:

1. Brand lockup — 3.5s (0.0–3.5) — "Bee Bakes / by Vartika / Custom cakes with a calmer, cleaner finish", gold halo, dark cocoa board
2. The cakes — 6.5s (3.5–10.0) — "Featured Cakes", three real cake cards enter one by one with names + rupee prices
3. The promise — 4.0s (10.0–14.0) — "100% Eggless builds / Baked close to delivery / Bikaner, Rajasthan"
4. The flow — 4.0s (14.0–18.0) — "Simple ordering", three steps + WhatsApp confirmation bubble
5. Logo out — 2.0s (18.0–20.0) — "Order on WhatsApp." then logo lock

## Audio

- Audio role: warm premium bed with sparse professional accents
- Audio arc: warm open → rhythmic cake placements → calm stats → resolved flow → quiet close
- Music: `assets/music/happy-beats-business-moves-vol-9-by-ende-dot-app.mp3` (already copied)
- Music treatment: start immediately at ~0.4s, warm full-bed posture, fade out under the final logo hit
- Music cue guidance: bundled preset read (`happy-beats-business-moves-vol-9...music-cues.md`). Strong cues at 3.70s, 4.23s, 5.28s, 6.34s, 7.92s, 8.44s, 10.54s, 12.65s, 23.17s. Beat grid every ~0.52s.
  - Hook wordmark lock → 3.70s (strong)
  - Cake card 1 → 6.34s, card 2 → 8.44s, card 3 → 10.54s (strong)
  - Stat rows → snap to beats from 11.06s
  - Ordering steps → snap to beats from 14.76s
  - Logo lock → ~19.5s (music ducks)
- Audio-reactive treatment: subtle; use music RMS/bass to make the hero halo and cake-card presence breathe. No waveform/equalizer visuals.
- Audio-coupled moments:
  - Brand lockup — halo + wordmark land on 3.70s cue
  - Cake cards — each lands on a beat with a card sound
  - WhatsApp bubble — soft click
  - Final logo — single impact bell hit, music ducks under
- SFX selection guidance:
  - Cake card reveal: `casino/card-slide-1.ogg` (low HF risk) at resolution
  - Step / stat arrivals: `interface/click_003.ogg` or `ui/click2.ogg` (low) — sparse
  - WhatsApp bubble: `interface/click_003.ogg` (low)
  - Logo payoff: `impact/impactBell_heavy_000.ogg` (medium) — the only loud moment
- SFX analysis guidance: `~/.claude/plugins/cache/brag/brag/0.2.2/skills/brag/assets/sfx/sfx-analysis.md` read; low/medium HF risk files chosen
- Exact SFX choice: Hyperframes chooses filenames, timestamps, density, and volume based on the implemented animation
- Audio files: copied into `brag-output/composition/assets/` (music + 5 SFX)

## Hyperframes Instructions

Load the composition-building Hyperframes domain skills — `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`. /brag is its own workflow: do not enter the `hyperframes` entry-point intent interview. Prefer native Hyperframes conventions.

Requirements:

- Show at least one real UI, copy, or visual element from the source project (real cake images, verbatim copy).
- Keep all text readable in the final render (WCAG contrast + reading-time floors).
- Keep the video within 15–25 seconds (target 20s).
- Include the planned music/SFX layer.
- Subtle audio-reactive treatment on the halo + cake presence (delegate extraction to hyperframes-creative).
- Beat-lock major reveals to strong cues within ±0.15s; snap sequential reveals to the beat grid within ±0.10s.
- Run `hyperframes check` before render — it is brag's single gate.
