# Photography Portfolio — Design Spec

**Client:** Rohit Kumar — Automotive & Wildlife Photographer (multi-genre)
**Approach:** "The Auteur" — Full cinematic, scroll-driven storytelling
**Date:** 2026-04-10

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** GSAP + ScrollTrigger, Framer Motion
- **Gallery Components:** ReactBits — Circular Gallery (landing), Dome Gallery (portfolio)
- **Image Optimization:** next/image with responsive srcsets, blur-up placeholders, lazy loading

### Gallery Component Installation

```bash
npx shadcn@latest add @react-bits/CircularGallery-TS-TW
npx shadcn@latest add @react-bits/DomeGallery-TS-TW
```

**Circular Gallery** — OGL-based 3D cylindrical carousel. Renders via WebGL canvas. Accepts `items` (array of `{ image, text }`), `bend`, `textColor`, `borderRadius`, `font`, `scrollSpeed`, `scrollEase`. Dependencies: `ogl`.

**Dome Gallery** — CSS 3D transform-based hemisphere gallery. Accepts `images` (array of `string | { src, alt }`), `fit`, `minRadius`, `segments`, `dragDampening`, `grayscale`, `imageBorderRadius`, and more. Dependencies: `@use-gesture/react`.

Both components are used with **default styling** — no custom theme wrappers applied.

---

## Site Architecture

Three pages, all sharing a fixed navigation and dark cinematic aesthetic.

### 1. Landing Page (Scroll-driven, 3 scenes)

**Scene 1 — Film Opening Hero (4 beats):**

1. **Black screen** — Page loads to pure black with subtle film grain texture overlay. 1-second pause builds anticipation.
2. **Name reveal** — "ROHIT KUMAR" fades in with letter-by-letter stagger animation (Syne, 800 weight, wide tracking). Genre tagline fades below: "AUTOMOTIVE · WILDLIFE · PORTRAIT".
3. **Signature photo reveal** — On scroll, a signature photograph scales up from center with a cinematic crop animation: starts as a narrow horizontal slit that expands vertically to fill the viewport. Name text parallaxes upward and fades.
4. **Transition to Circular Gallery** — The signature photo zooms past the camera and morphs into the first item of the Circular Gallery. The 3D cylindrical carousel rotates into view as the user continues scrolling. Seamless transition, no hard cut.

**Scene 2 — Circular Gallery (Selected Work):**

- ReactBits Circular Gallery component with **default styling** (no custom theme applied)
- Props: `bend={5}`, `borderRadius={0.16}`, `scrollEase={0.04}`, `scrollSpeed={1.9}`, `textColor="#ffffff"`
- Accepts `items` as `{ image: string, text: string }[]` — curated 8-12 best works across genres
- Container: `height: 600px`, `position: relative`
- Section heading "SELECTED WORK" animates in with split-text reveal
- Clicking a photo opens a lightbox with GSAP-animated entry

**Scene 3 — Contact CTA:**

- "LET'S WORK TOGETHER" heading with split-text animation on viewport entry
- Subtitle: "Have a project in mind? Let's create something extraordinary."
- "GET IN TOUCH" button with the signature gradient background (#18230F → #255F38 → #CE2626 → #FFFDEB)
- On click, the button triggers an iris-open animation (GSAP) that expands into a contact form
- Form fields: Name, Email, Message — fade in staggered
- "SEND MESSAGE" button with green→red gradient
- On successful submit, a checkmark animation plays and the form collapses back to the CTA button
- Social links below the CTA

### 2. Portfolio Page

- Cinematic title reveal on page load
- **Category filters:** Pill-style buttons — All / Wildlife / Automotive / Portrait / Events
  - Active filter indicated with genre-appropriate styling (border + background tint)
  - Selecting a category triggers a GSAP morph animation as the dome reshuffles
- ReactBits Dome Gallery component with **default styling** (no custom theme applied)
  - Props: `fit={0.5}`, `minRadius={650}`, `maxVerticalRotationDeg={0}`, `segments={34}`, `dragDampening={2}`, `grayscale={false}`
  - Accepts `images` as `(string | { src: string, alt?: string })[]`
  - Container: `width: 100vw`, `height: 100vh`
  - All images lazy-loaded with blur-up placeholder technique
  - Images served via next/image with quality optimization and responsive srcsets
- Clicking a photo opens a full-screen lightbox with swipe navigation

### 3. About Page

- Split layout: photographer portrait on the left, bio text on the right
- Portrait image has a parallax float effect on scroll
- Bio text reveals paragraph by paragraph with staggered fade-up animations on viewport entry
- Animated stat counters (GSAP countTo on viewport entry):
  - Projects completed (e.g., 500+)
  - Years of experience (e.g., 8+)
  - Clients served (e.g., 50+)
  - Stats use gradient text (#255F38 → #CE2626)
- Equipment/process section below with horizontal scroll cards

---

## Navigation

- **Fixed navbar**, starts transparent
- Hidden during film-opening hero sequence (Beats 1-2), reveals after Beat 2 with a fade-down animation
- **Left:** "RK" logo mark (Syne, 800 weight)
- **Center/Right:** HOME / PORTFOLIO / ABOUT / CONTACT (Space Grotesk, 0.8rem, letter-spacing 2px)
- Active page indicated by green→red gradient underline
- Hover: gradient underline animates in from left
- **Mobile:** Hamburger icon (two asymmetric lines), opens full-screen dark overlay with staggered link animations

---

## Typography

| Tier | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Syne | 800 | Hero name, page titles, section headings |
| Heading | Syne | 600-700 | Sub-headings, nav links, CTA buttons |
| Body | Space Grotesk | 300-400 | Paragraphs, descriptions, form labels |
| Label | Syne / Space Grotesk | 500 | Category filters, small caps, genre tags |

- Display text uses tight letter-spacing (-1px)
- Labels and nav use wide letter-spacing (2-6px)
- Body text at 300 weight for an elegant, light feel

---

## Color Palette

### Base (Dark)
| Token | Hex | Usage |
|-------|-----|-------|
| Background | #000000 | Page background, hero |
| Rich Black | #0A0A0A | Form inputs, card backgrounds |
| Surface | #141414 | Elevated cards, sections |
| Elevated | #1A1A1A | Hover states, borders |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | #FFFFFF | Headings, hero text |
| Secondary | #A0A0A0 | Body text, descriptions |
| Muted | #5A5A5A | Placeholder text, subtle labels |

### Signature Gradient (Unified Brand Identity)
| Color | Hex | Association |
|-------|-----|-------------|
| Deep Forest | #18230F | Nature / wildlife |
| Vivid Green | #255F38 | Nature / wildlife |
| Racing Red | #CE2626 | Automotive / speed |
| Headlight Cream | #FFFDEB | Automotive / light |

**Gradient application:** `linear-gradient(135deg, #18230F, #255F38, #CE2626, #FFFDEB)`

Used for: CTA buttons, active nav underlines, section dividers, stat counter text, hover accents, the send button. Not applied to the gallery components.

---

## Animation Strategy

Every section is a scene. GSAP + ScrollTrigger drives all scroll-based animations. Framer Motion handles component-level transitions (page transitions, filter changes).

| Element | Animation | Library |
|---------|-----------|---------|
| Hero black screen | Timed pause (1s) | GSAP |
| Name reveal | Letter-by-letter stagger | GSAP SplitText |
| Tagline | Fade in + slide up | GSAP |
| Signature photo | Horizontal slit → full viewport | GSAP ScrollTrigger |
| Photo → Gallery morph | Scale + position tween | GSAP ScrollTrigger |
| Section headings | Split-text reveal | GSAP SplitText |
| Circular Gallery | Scroll-driven rotation | ReactBits (built-in) |
| Dome Gallery | Scroll-driven navigation | ReactBits (built-in) |
| Category filter change | Dome reshuffle morph | GSAP |
| Contact CTA expand | Iris-open from button center | GSAP |
| Form fields | Staggered fade-in | GSAP |
| Stat counters | countTo animation | GSAP |
| Bio paragraphs | Fade-up on viewport entry | GSAP ScrollTrigger |
| Nav reveal | Fade-down after hero Beat 2 | GSAP |
| Mobile menu | Full-screen overlay + staggered links | Framer Motion |
| Page transitions | Fade/slide between routes | Framer Motion |
| Lightbox | Scale + fade entry | GSAP |

---

## Performance Strategy

Heavy photography files require careful optimization:

- **next/image** for all photos — automatic WebP/AVIF conversion, responsive srcsets, quality optimization
- **Blur-up placeholders** — low-quality blurred preview while full image loads
- **Lazy loading** — images outside viewport load on demand (native + Intersection Observer)
- **Landing page curated set** — only 8-12 optimized images, not the full portfolio
- **Portfolio page** — progressive loading as user scrolls/navigates the dome
- **GSAP tree-shaking** — import only used plugins (ScrollTrigger, SplitText)
- **Code splitting** — each page is its own route, gallery components dynamically imported
- **Static generation (SSG)** — About page and shell pre-rendered at build time
- **Font optimization** — next/font for Syne and Space Grotesk, self-hosted with display swap

---

## Responsive Behavior

- **Desktop (1200px+):** Full cinematic experience as designed
- **Tablet (768-1199px):** Galleries scale down, About page stacks vertically, nav collapses to hamburger
- **Mobile (< 768px):** Hero sequence simplified (no horizontal slit, direct scale-up), galleries adapt to smaller viewport, full-screen mobile menu, contact form goes full-width
- All animations respect `prefers-reduced-motion` — falls back to simple fade transitions

---

## Component Structure

```
app/
├── layout.tsx              — Root layout, fonts, metadata
├── page.tsx                — Landing page (3 scenes)
├── portfolio/page.tsx      — Portfolio page (Dome Gallery + filters)
├── about/page.tsx          — About page
├── components/
│   ├── ui/
│   │   ├── CircularGallery.tsx — ReactBits component (OGL-based, installed via shadcn)
│   │   └── DomeGallery.tsx     — ReactBits component (@use-gesture/react, installed via shadcn)
│   ├── Navigation.tsx      — Fixed nav with scroll-aware visibility
│   ├── HeroSequence.tsx    — 4-beat film opening
│   ├── WorkGallery.tsx     — Circular Gallery wrapper for landing page
│   ├── PortfolioGallery.tsx — Dome Gallery wrapper with filter integration
│   ├── ContactCTA.tsx      — Expanding contact form
│   ├── Lightbox.tsx        — Full-screen image viewer
│   ├── CategoryFilters.tsx — Portfolio filter pills
│   ├── AboutStats.tsx      — Animated stat counters
│   └── MobileMenu.tsx      — Full-screen mobile overlay
├── lib/
│   ├── animations.ts       — GSAP animation presets/utilities
│   └── images.ts           — Image data and category mapping
└── styles/
    └── globals.css          — Tailwind config, grain texture, custom utilities
```
