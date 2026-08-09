# Vertikaa

> Clean landing page. Next.js 16 App Router.

## Stack

- Next.js 16.2.7, React 19, TypeScript 5
- Tailwind CSS v4 (@tailwindcss/postcss)
- framer-motion 12, lucide-react
- Playwright, Turbopack
- Pages: /, /privacy, /terms

## Rules

- Server components default — client only for motion/interactions
- Tailwind v4 syntax use karo — @apply avoid
- SEO metadata har page me (metadata export)
- Sitemap + robots.txt maintain karo
- Turbopack dev server se build time check karo
- Content-driven — data fetching minimal rakho

## Evaluator Loop Rules

After writing any code, run evaluator agent automatically.

Loop: Write Code → Evaluator Agent → FAILED? → Fix → Evaluate Again → PASSED → Done

Rules:

- ANY score below 7 = FAILED
- Read feedback.md for exact fixes
- Max 2 evaluation rounds
- If round 2 also FAIL — stop and report to user

Fail conditions:

- Server/client component boundary violation = FAIL
- SEO metadata missing on any page = FAIL
- Motion (framer-motion) not degrading on reduced-motion = FAIL
- Tailwind v4 syntax errors = FAIL
- Missing error handling = FAIL
- Incomplete feature = FAIL
- Dead code present = FAIL
- Missing loading/error states = FAIL
- Generic UI with no thought = FAIL
- `npm run build` errors = FAIL
- Turbopack dev server issues = FAIL
