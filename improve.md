# Vertika / Bee Bakes audit

This is a focused design and front-end audit of the current Next.js site. The goal is not to rewrite the project, but to identify the biggest visual and product-quality issues and suggest practical fixes in the same stack.

## Summary

The site already has a warm premium direction, but it still reads like a polished template in several places. The strongest opportunities are:

1. Reduce the generic "all sections centered in equal-width grids" feel.
2. Tighten typography and spacing so the page feels more editorial and less brochure-like.
3. Replace placeholder UI patterns like dead links, repeated carousels, and flat cards.
4. Improve accessibility and form behavior in the modals and navigation.
5. Add a clearer information hierarchy so the homepage has one strong story instead of many similar blocks.

## What is working

- The brand palette is consistent across the page.
- The hero has a clear visual focus and good product imagery.
- Framer Motion is used for entry transitions and gives the page some life.
- The product modal and custom-order modal already create a conversion path.

## Main issues and solutions

### 1) Typography still feels template-like

Current references:
- `C:\Users\PREET\Desktop\vertikaa\app\layout.tsx:4-11`
- `C:\Users\PREET\Desktop\vertikaa\app\globals.css:36-45`
- `C:\Users\PREET\Desktop\vertikaa\app\components\Hero.tsx:16-54`

Issues:
- Playfair + Lato is pleasant, but it is common and safe rather than distinctive.
- The hero headline is very large, but the line break is hard-coded, which can create awkward wrapping on smaller widths.
- Many sections use the same centered heading pattern, so hierarchy starts to blur.

Solutions:
- Keep the serif/sans pairing, but make the display type more intentional with tighter tracking and a more controlled scale.
- Remove hard-coded line breaks from hero copy and let text wrap naturally.
- Limit body text width to around 60-70 characters.
- Introduce a stronger scale for section labels, subtitles, and supporting copy.

### 2) The layout is too symmetrical

Current references:
- `C:\Users\PREET\Desktop\vertikaa\app\page.tsx:79-109`
- `C:\Users\PREET\Desktop\vertikaa\app\page.tsx:118-164`
- `C:\Users\PREET\Desktop\vertikaa\app\page.tsx:167-185`
- `C:\Users\PREET\Desktop\vertikaa\app\components\FeaturesBar.tsx:46-67`
- `C:\Users\PREET\Desktop\vertikaa\app\components\ExploreRange.tsx:54-79`
- `C:\Users\PREET\Desktop\vertikaa\app\components\InstagramFeed.tsx:37-88`
- `C:\Users\PREET\Desktop\vertikaa\app\page.tsx:207-263`

Issues:
- Featured products are a perfectly even 4-card grid.
- The "How to order" section is a 3-step equal column layout.
- The Instagram feed is a 6-up grid.
- The footer is a 4-column block with similar visual weight in each column.
- This is the most common AI-generated page structure.

Solutions:
- Break the symmetry with one larger featured card, one offset editorial block, or a mixed grid.
- Let one section become a story-led showcase instead of another card row.
- Use a wider hero with more negative space, then make later sections more compact or more editorial.
- Avoid repeating the same centered heading treatment for every block.

### 3) Surface styling is clean but still generic

Current references:
- `C:\Users\PREET\Desktop\vertikaa\app\globals.css:18-30`
- `C:\Users\PREET\Desktop\vertikaa\app\globals.css:55-65`
- `C:\Users\PREET\Desktop\vertikaa\app\components\FeaturesBar.tsx:46-67`
- `C:\Users\PREET\Desktop\vertikaa\app\components\ProductCard.tsx:31-79`
- `C:\Users\PREET\Desktop\vertikaa\app\components\ProductModal.tsx:29-79`

Issues:
- Cards rely on the standard border + white background + shadow recipe.
- Shadows are soft but still default-looking.
- Sections alternate between light cream and white without much texture or depth.

Solutions:
- Replace some card borders with softer surface contrast or tinted backgrounds.
- Use one accent color consistently, but desaturate it slightly and apply it more selectively.
- Add subtle grain, gradient haze, or an ambient background layer to large sections.
- Vary corner radius more intentionally instead of using the same rounded style everywhere.

### 4) Product browsing is not fully honest yet

Current references:
- `C:\Users\PREET\Desktop\vertikaa\app\components\ExploreRange.tsx:7-18`
- `C:\Users\PREET\Desktop\vertikaa\app\components\ExploreRange.tsx:31-79`

Issues:
- The category tabs are present, but they do not actually filter anything.
- Several cards reuse the same images, which makes the section feel like a mockup rather than a real catalog.

Solutions:
- Either wire the tabs to real filtered content or remove the fake filtering affordance.
- Use fewer items, but make each one real and distinct.
- Consider a curated editorial strip instead of a pretend category browser.

### 5) Navigation and footer have dead ends

Current references:
- `C:\Users\PREET\Desktop\vertikaa\app\components\Navbar.tsx:19-103`
- `C:\Users\PREET\Desktop\vertikaa\app\page.tsx:217-236`

Issues:
- The navigation is missing a visible active state for the current section.
- There is no skip link for keyboard users.
- Several footer links point to `#`, which is a dead link.
- `About` and `Contact` both point to the same or weak anchors.

Solutions:
- Add a skip-to-content link near the top of the layout.
- Show the active section in the nav on scroll.
- Replace dead footer links with real destinations or remove them.
- Make the footer a useful navigation area, not just decorative filler.

### 6) Accessibility is partially there, but not finished

Current references:
- `C:\Users\PREET\Desktop\vertikaa\app\components\Navbar.tsx:66-72`
- `C:\Users\PREET\Desktop\vertikaa\app\components\ProductModal.tsx:17-79`
- `C:\Users\PREET\Desktop\vertikaa\app\components\CustomOrderModal.tsx:60-209`
- `C:\Users\PREET\Desktop\vertikaa\app\components\StickyMobileCTA.tsx:19-47`

Issues:
- Focus rings are not consistently designed across buttons and form fields.
- The mobile menu button has an aria label, but it does not expose expanded state.
- The modals do not appear to trap focus or handle Escape-to-close.
- The sticky mobile CTA appears and disappears, but there is no dismiss action.

Solutions:
- Add consistent focus styles to every interactive element.
- Mark toggle controls with `aria-expanded` and `aria-controls`.
- Add keyboard dismissal and focus management to modals.
- Give the mobile CTA an optional close state, or keep it simpler and less intrusive.

### 7) Form behavior needs real validation and cleaner copy

Current references:
- `C:\Users\PREET\Desktop\vertikaa\app\components\CustomOrderModal.tsx:21-57`
- `C:\Users\PREET\Desktop\vertikaa\app\components\CustomOrderModal.tsx:121-205`

Issues:
- The form only uses required fields, so it is easy to send low-quality requests.
- The success flow opens WhatsApp immediately, then shows a thank-you state even if the tab is blocked.
- The placeholder copy is generic and feels pasted in.

Solutions:
- Add inline validation for name length, flavor, and details.
- Show confirmation only after the handoff action is actually triggered.
- Use more specific helper text, for example expected turnaround or size guidance.
- Replace generic placeholder examples like "John Doe" with warmer, brand-specific language if possible.

### 8) Testimonials read as generic marketing content

Current references:
- `C:\Users\PREET\Desktop\vertikaa\app\components\TestimonialsCarousel.tsx:7-38`
- `C:\Users\PREET\Desktop\vertikaa\app\components\TestimonialsCarousel.tsx:64-135`

Issues:
- Every testimonial is a five-star quote in a very similar tone.
- The carousel pattern is common and adds motion, but not much differentiation.

Solutions:
- Replace the carousel with a denser quote wall, a highlighted pull quote, or a mixed-media testimonial block.
- Use more specific, less polished customer quotes.
- Add one or two lower-key reviews so the section feels believable.

### 9) Motion is pleasant but could be more disciplined

Current references:
- `C:\Users\PREET\Desktop\vertikaa\app\components\AnimatedSection.tsx:1-24`
- `C:\Users\PREET\Desktop\vertikaa\app\components\ProductCard.tsx:22-80`
- `C:\Users\PREET\Desktop\vertikaa\app\components\Hero.tsx:16-91`

Issues:
- Many blocks animate on entry, which is nice, but the page can feel busy on a long scroll.
- Some motion is decorative rather than meaningfully guiding attention.

Solutions:
- Reduce the number of simultaneous entry animations.
- Use staggered motion only where it helps hierarchy.
- Respect reduced-motion preferences for users who need it.

### 10) Metadata and code hygiene can be stronger

Current references:
- `C:\Users\PREET\Desktop\vertikaa\app\layout.tsx:1-28`
- `C:\Users\PREET\Desktop\vertikaa\app\page.tsx:1-4`
- `C:\Users\PREET\Desktop\vertikaa\app\components\StickyMobileCTA.tsx:7-9`

Issues:
- Metadata is present, but it is missing a fuller social card setup like `twitter` and a strong share image.
- `page.tsx` imports `motion` but does not use it.
- `StickyMobileCTA` defines `isExpanded` but never uses it.

Solutions:
- Expand metadata for sharing and SEO.
- Remove unused imports and dead state.
- Keep the codebase tidy so UI polish does not get buried under clutter.

## Prioritized fix plan

### Phase 1: Highest impact, lowest risk

1. Improve typography scale and remove forced line breaks.
2. Add real focus states and keyboard support.
3. Remove dead links and fix anchor targets.
4. Clean metadata and unused code.

### Phase 2: Visual polish

1. Make the page less symmetrical.
2. Introduce more distinctive surfaces and depth.
3. Refine spacing between sections and inside cards.
4. Reduce default-looking borders and shadows.

### Phase 3: Product quality

1. Wire real filtering or remove fake category tabs.
2. Upgrade the testimonial section to feel more authentic.
3. Improve form validation and confirmation flow.
4. Add modal focus management and mobile CTA control.

## Recommended direction

If this were my pass on the site, I would keep the current brand warmth but move it toward a more editorial bakery identity:

- Fewer repeated grids.
- One strong hero story.
- Better section contrast through layout, not just color.
- More believable content.
- More disciplined motion.

That would make the site feel less like a starter template and more like a crafted small business brand.
