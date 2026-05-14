# Design Language: Create Next App

> Extracted from `https://perspective-pro-teal.vercel.app/` on May 14, 2026
> 113 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#0022ff` | rgb(0, 34, 255) | hsl(232, 100%, 50%) | 1 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#ffffff` | hsl(0, 0%, 100%) | 189 |
| `#000000` | hsl(0, 0%, 0%) | 42 |

### Background Colors

Used on large-area elements: `#ffffff`, `#050505`, `#0022ff`, `#000000`

### Text Colors

Text color palette: `#000000`, `#ffffff`

### Gradients

```css
background-image: linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%);
```

```css
background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
```

```css
background-image: linear-gradient(to right bottom, oklab(0.999994 0.0000455678 0.0000200868 / 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%);
```

```css
background-image: linear-gradient(to right, oklab(0.999994 0.0000455678 0.0000200868 / 0.1) 0%, rgba(0, 0, 0, 0) 100%);
```

```css
background-image: linear-gradient(to top, oklab(0 0 0 / 0.6) 0%, oklab(0 0 0 / 0.1) 50%, rgba(0, 0, 0, 0) 100%);
```

```css
background-image: linear-gradient(rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#ffffff` | text, background, border | 189 |
| `#000000` | text, border, background | 42 |
| `#0022ff` | background | 1 |

## Typography

### Font Families

- **Zalando Sans SemiExpanded** — used for body (113 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 24px | 1.5rem | 600 | 36px | -0.6px | div |
| 16px | 1rem | 400 | 24px | normal | html, head, meta, link |
| 12px | 0.75rem | 500 | 18px | normal | span |
| 11px | 0.6875rem | 400 | 16.5px | normal | span |

### Body Text

```css
body { font-size: 12px; font-weight: 500; line-height: 18px; }
```

### Font Weights in Use

`400` (100x), `500` (11x), `600` (2x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-2 | 2px | 0.125rem |
| spacing-32 | 32px | 2rem |
| spacing-40 | 40px | 2.5rem |
| spacing-56 | 56px | 3.5rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| lg | 12px | 17 |
| lg | 16px | 5 |
| xl | 20px | 1 |
| xl | 24px | 3 |
| full | 32px | 2 |

## Box Shadows

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.2) 0px 8px 16px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.08) 0px 6px 16px -4px, rgba(0, 0, 0, 0.05) 0px 2px 6px -2px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 2px 4px 0px inset;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.5) 0px 24px 48px 0px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.3) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.2) 0px 2px 10px 0px inset;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.4) 0px 16px 32px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455677 0.0000200868 / 0.8) 0px 0px 0px 2px, rgba(255, 255, 255, 0.3) 0px 0px 20px 0px;
```

**xs (inset)** — blur: 1px
```css
box-shadow: rgba(255, 255, 255, 0.2) 0px 1px 1px 0px inset, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.6) 0px 24px 48px 0px;
```

**xs (inset)** — blur: 1px
```css
box-shadow: rgba(255, 255, 255, 0.3) 0px 1px 1px 0px inset, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.6) 0px 32px 64px -16px;
```

## CSS Custom Properties

### Colors

```css
--neutral-primary-soft: #fff;
--neutral-primary: #fff;
--neutral-secondary-soft: #f8fafc;
--border-default: #e2e8f0;
--border-light: #f0f4f8;
--card-bg: #ffffffa6;
--card-bg-hover: #fffc;
--card-border: #ffffff80;
--tw-ring-offset-color: #fff;
--tw-ring-offset-shadow: 0 0 #0000;
--color-white: #fff;
--tw-ring-shadow: 0 0 #0000;
--tw-border-style: solid;
--tw-ring-offset-width: 0px;
--color-black: #000;
--tw-inset-ring-shadow: 0 0 #0000;
```

### Spacing

```css
--spacing: .25rem;
```

### Typography

```css
--default-font-family: "Zalando Sans SemiExpanded", sans-serif;
--font-weight-medium: 500;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
--tracking-wide: .025em;
--font-weight-semibold: 600;
--default-mono-font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
--tracking-tight: -.025em;
```

### Shadows

```css
--tw-inset-shadow-alpha: 100%;
--shadow-xs: 0 1px 3px 0 #0000000d, 0 1px 2px -1px #00000008;
--tw-shadow-alpha: 100%;
--drop-shadow-md: 0 3px 3px #0000001f;
--tw-drop-shadow-alpha: 100%;
--shadow-md: 0 6px 16px -4px #00000014, 0 2px 6px -2px #0000000d;
--shadow-lg: 0 12px 28px -6px #0000001a, 0 4px 12px -4px #0000000f;
--tw-shadow: 0 0 #0000;
--tw-inset-shadow: 0 0 #0000;
```

### Radii

```css
--radius-xl: .75rem;
--radius-2xl: 1rem;
```

### Other

```css
--brand: #0166ff;
--heading: #0f172a;
--body: #475569;
--tw-gradient-from: rgba(0, 0, 0, 0);
--tw-gradient-to: rgba(0, 0, 0, 0);
--tw-scale-z: 1;
--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
--blur-2xl: 40px;
--tw-translate-x: 0;
--tw-gradient-via-position: 50%;
--tw-outline-style: solid;
--tw-scale-x: 1;
--tw-translate-z: 0;
--tw-gradient-to-position: 100%;
--tw-gradient-via: rgba(0, 0, 0, 0);
--tw-scale-y: 1;
--default-transition-duration: .15s;
--tw-translate-y: 0;
--ease-out: cubic-bezier(0, 0, .2, 1);
--tw-gradient-from-position: 0%;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| md | 768px | min-width |
| lg | 1024px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`

**Durations:** `1s`, `0.2s`, `0.3s`, `0.7s`, `0.4s`, `0.15s`, `0.5s`, `3s`

### Common Transitions

```css
transition: all;
transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
transition: 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: transform 0.7s cubic-bezier(0, 0, 0.2, 1), translate 0.7s cubic-bezier(0, 0, 0.2, 1), scale 0.7s cubic-bezier(0, 0, 0.2, 1), rotate 0.7s cubic-bezier(0, 0, 0.2, 1);
transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), translate 0.7s cubic-bezier(0.4, 0, 0.2, 1), scale 0.7s cubic-bezier(0.4, 0, 0.2, 1), rotate 0.7s cubic-bezier(0.4, 0, 0.2, 1);
transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), fill 0.15s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: 0.5s;
transition: transform 3s cubic-bezier(0, 0, 0.2, 1), translate 3s cubic-bezier(0, 0, 0.2, 1), scale 3s cubic-bezier(0, 0, 0.2, 1), rotate 3s cubic-bezier(0, 0, 0.2, 1);
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (8 instances)

```css
.button {
  background-color: oklab(0 0 0 / 0);
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 12px;
}
```

### Cards (4 instances)

```css
.card {
  background-color: oklab(0.999994 0.0000455678 0.0000200868 / 0.05);
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 2px 4px 0px inset;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Modals (1 instances)

```css
.modal {
  border-radius: 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: oklab(0 0 0 / 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 12px;
  border: 0px solid rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 12px;
  border: 0px solid rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

## Layout System

**0 grid containers** and **27 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1200px | 0px |
| 100% | 0px |

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| column/nowrap | 11x |
| row/nowrap | 16x |

**Gap values:** `12px`, `16px`, `20px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 0 passing, 0 failing color pairs

## Design System Score

**Overall: 97/100 (Grade: A)**

| Category | Score |
|----------|-------|
| Color Discipline | 100/100 |
| Typography Consistency | 100/100 |
| Spacing System | 100/100 |
| Shadow Consistency | 90/100 |
| Border Radius Consistency | 90/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Consistent typography system, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 281 duplicate CSS declarations

## Gradients

**6 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| linear | — | 2 | brand |
| linear | 135deg | 2 | brand |
| linear | to right bottom | 3 | bold |
| linear | to right | 2 | brand |
| linear | to top | 3 | bold |
| linear | — | 2 | brand |

```css
background: linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%);
background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
background: linear-gradient(to right bottom, oklab(0.999994 0.0000455678 0.0000200868 / 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%);
background: linear-gradient(to right, oklab(0.999994 0.0000455678 0.0000200868 / 0.1) 0%, rgba(0, 0, 0, 0) 100%);
background: linear-gradient(to top, oklab(0 0 0 / 0.6) 0%, oklab(0 0 0 / 0.1) 50%, rgba(0, 0, 0, 0) 100%);
```

## Z-Index Map

**4 unique z-index values** across 2 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| sticky | 10,50 | div.p.e.r.s.p.e.c.t.i.v.e.-.c.o.n.t.a.i.n.e.r. .r.e.l.a.t.i.v.e. .z.-.1.0. .w.-.f.u.l.l. .m.a.x.-.w.-.[.1.2.0.0.p.x.]. .h.-.[.7.5.0.p.x.]. .f.l.e.x. .i.t.e.m.s.-.c.e.n.t.e.r. .j.u.s.t.i.f.y.-.c.e.n.t.e.r. .t.r.a.n.s.i.t.i.o.n.-.a.l.l. .d.u.r.a.t.i.o.n.-.1.0.0.0. .d.e.l.a.y.-.2.0.0. .o.p.a.c.i.t.y.-.1.0.0. .t.r.a.n.s.l.a.t.e.-.y.-.0, div.w.-.[.3.4.0.p.x.]. .p.-.1.0. .f.l.e.x. .f.l.e.x.-.c.o.l. .r.e.l.a.t.i.v.e. .z.-.1.0. .b.g.-.b.l.a.c.k./.2.0. .b.o.r.d.e.r.-.r. .b.o.r.d.e.r.-.w.h.i.t.e./.1.0, div.f.l.e.x.-.1. .p.-.1.0. .f.l.e.x. .f.l.e.x.-.c.o.l. .r.e.l.a.t.i.v.e. .z.-.1.0 |
| base | 0,0 | div.a.b.s.o.l.u.t.e. .i.n.s.e.t.-.0. .z.-.0. .b.g.-.c.o.v.e.r. .b.g.-.c.e.n.t.e.r. .s.c.a.l.e.-.1.1.0. .t.r.a.n.s.i.t.i.o.n.-.o.p.a.c.i.t.y. .d.u.r.a.t.i.o.n.-.1.0.0.0. .o.p.a.c.i.t.y.-.1.0.0, div.a.b.s.o.l.u.t.e. .i.n.s.e.t.-.0. .z.-.0. .o.p.a.c.i.t.y.-.[.0...0.4.]. .p.o.i.n.t.e.r.-.e.v.e.n.t.s.-.n.o.n.e. .m.i.x.-.b.l.e.n.d.-.o.v.e.r.l.a.y, div.a.b.s.o.l.u.t.e. .t.o.p.-.1./.2. .l.e.f.t.-.1./.2. .-.t.r.a.n.s.l.a.t.e.-.x.-.1./.2. .-.t.r.a.n.s.l.a.t.e.-.y.-.1./.2. .w.-.[.8.0.0.p.x.]. .h.-.[.5.0.0.p.x.]. .b.g.-.b.r.a.n.d./.2.0. .r.o.u.n.d.e.d.-.f.u.l.l. .b.l.u.r.-.[.1.2.0.p.x.]. .p.o.i.n.t.e.r.-.e.v.e.n.t.s.-.n.o.n.e. .z.-.0 |

## SVG Icons

**4 unique SVG icons** detected. Dominant style: **outlined**.

| Size Class | Count |
|------------|-------|
| md | 4 |

**Icon colors:** `currentColor`

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 5 | objectFit: cover, borderRadius: 0px, shape: square |
| hero | 1 | objectFit: cover, borderRadius: 0px, shape: square |

**Aspect ratios:** 1:1 (5x), 4:3 (1x)

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `150ms` | 150 |
| `sm` | `200ms` | 200 |
| `md` | `300ms` | 300 |
| `lg` | `500ms` | 500 |
| `xl` | `1s` | 1000 |
| `xxl` | `3s` | 3000 |

### Easing Families

- **custom** (23 uses) — `cubic-bezier(0.4, 0, 0.2, 1)`
- **ease-out** (2 uses) — `cubic-bezier(0, 0, 0.2, 1)`

## Component Anatomy

### button — 8 instances

**Slots:** label, icon
**Sizes:** xl

## Page Intent

**Type:** `landing` (confidence 0.45)
**Description:** Generated by create next app

## Section Roles

Reading order (top→bottom): content

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | content | — | 0.3 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.333 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 32px |
| backdrop-filter in use | no |
| Gradients | 6 |

## Imagery Style

**Label:** `photography` (confidence 1)
**Counts:** total 6, svg 0, icon 0, screenshot-like 0, photo-like 6
**Dominant aspect:** square-ish
**Radius profile on images:** square

## Component Library

**Detected:** `tailwindcss` (confidence 0.846)

Evidence:
- tailwind-like class density 80%

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Zalando Sans SemiExpanded` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
