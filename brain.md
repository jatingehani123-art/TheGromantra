# 🧠 GROMANTRA — Project Brain

> **Always read this file before making any changes.**
> This is the single source of truth for project structure, design system, known quirks, and coding rules.
> Update this file whenever you add pages, components, fix bugs, or change architecture.

---

## 📋 Project Overview

- **Name**: GROMANTRA — Digital Signal Architecture Agency
- **Owner**: Jatin Gehani (Founder & System Architect)
- **Primary Target Region**: Udaipur, Rajasthan, India (with national & global reach)
- **Domain**: https://thegromantra.com
- **Repo**: https://github.com/jatingehani123-art/TheGromantra (branch: `master`)
- **Local Path**: `c:\Users\Jatin Gehani\OneDrive\Desktop\digital-marketing-website`
- **Dev Server**: `npm run dev` (localhost:3000)
- **Email**: gromantra0957@gmail.com

---

## 🛠️ Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js | ^16.2.1 |
| Language | TypeScript | ^5 |
| React | React + React DOM | 19.2.0 |
| Styling | Tailwind CSS v4 (PostCSS) | ^4.1.9 |
| Animation | Framer Motion | ^12.38.0 |
| Animation | GSAP + ScrollTrigger | ^3.15.0 |
| Smooth Scroll | Lenis | ^1.3.25 |
| 3D | React Three Fiber + Drei | ^9.6.1 / ^10.7.7 |
| Icons | Lucide React | ^0.454.0 |
| Analytics | Vercel Analytics | latest |
| CSS Merge | tailwind-merge + clsx | ^2.5.5 / ^2.1.1 |

---

## ⚠️ CRITICAL KNOWN QUIRK — Tailwind CSS v4 Inline Style Rule

**This is the most important rule in this file. Violating it will cause invisible elements to intercept clicks.**

### The Bug
Tailwind CSS v4 (JIT) does **NOT reliably compile** the following utility classes:
- `-z-10` → computed as `z-index: auto` instead of `-10`
- `pointer-events-none` → compiled to `pointer-events: auto` in some contexts

### The Fix — Always Use Inline Styles
For **any decorative/overlay/background element** (glow divs, SVG overlays, grid backgrounds, connecting lines), use **inline styles** instead of Tailwind classes:

```tsx
// ❌ WRONG — will NOT compile correctly in Tailwind v4:
<div className="absolute -z-10 pointer-events-none" />

// ✅ CORRECT — use inline styles:
<div className="absolute" style={{ zIndex: -10, pointerEvents: 'none' }} />
```

### Elements That MUST Use Inline Styles
Every time you create any of these, use inline styles for z-index/pointer-events:
- Ambient background glow divs (blur-[Npx] opacity-NN)
- SVG grid overlays
- SVG connecting line canvases inside grid components
- Decorative pseudo-element substitutes
- Any element with `absolute` positioning behind interactive content

---

## 📁 File Structure

```
digital-marketing-website/
├── app/
│   ├── layout.tsx               # Root layout (fonts, metadata, overlays, Lenis, SiteLoader)
│   ├── page.tsx                 # Homepage (/ route)
│   ├── globals.css              # Global styles + design tokens + animations
│   ├── sitemap.ts               # XML sitemap generator
│   ├── about/
│   │   ├── page.tsx             # /about route
│   │   └── jatin-gehani/page.tsx # /about/jatin-gehani (author profile + Person schema)
│   ├── api/send/route.ts        # Contact form API (Resend email service)
│   ├── blog/page.tsx            # /blog route (renders BlogIndexClient)
│   ├── case-studies/
│   │   ├── page.tsx             # /case-studies index (3 placeholder slots)
│   │   └── [slug]/page.tsx      # /case-studies/[slug] skeleton
│   ├── contact/page.tsx         # /contact route
│   ├── pricing/page.tsx         # /pricing route (3 tier slots, placeholder)
│   ├── privacy/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── services/
│   │   ├── page.tsx             # /services route (5-card grid with ambient glow)
│   │   └── [id]/page.tsx        # /services/[id] dynamic route
│   └── terms/page.tsx
│
├── components/
│   ├── navbar.tsx               # Fixed navbar wrapper → TubelightNavbar
│   ├── footer.tsx               # Thin wrapper → CinematicFooter
│   ├── about/
│   │   ├── FinalCTA.tsx
│   │   ├── HeroScene.tsx
│   │   ├── NeuralNetwork.tsx    # Interactive SVG node graph (framer-motion)
│   │   ├── OperatorSection.tsx
│   │   ├── OriginTimeline.tsx
│   │   ├── TerminalIntro.tsx
│   │   ├── ValuesCubes.tsx
│   │   └── WhyGromantra.tsx
│   ├── blog/
│   │   ├── blog-detail-client.tsx
│   │   └── blog-index-client.tsx
│   ├── home/
│   │   ├── 3d-model-section.tsx
│   │   ├── collaborators-section.tsx
│   │   ├── dashboard-preview-section.tsx
│   │   ├── distortion-clock-section.tsx
│   │   ├── features-section.tsx
│   │   ├── hero-section.tsx
│   │   ├── how-it-works-section.tsx
│   │   ├── pricing-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── services-section.tsx     # Horizontal scroll services (home)
│   │   ├── signal-board-section.tsx
│   │   ├── testimonials-section.tsx
│   │   └── the-brief-section.tsx    # Form → /api/send
│   ├── services/
│   │   ├── branding-page-client.tsx
│   │   ├── performance-page-client.tsx
│   │   ├── seo-page-client.tsx
│   │   ├── service-detail-client.tsx
│   │   ├── service-faq.tsx
│   │   ├── social-page-client.tsx
│   │   └── webdev-page-client.tsx
│   └── ui/
│       ├── animated-testimonials.tsx
│       ├── contact-form.tsx
│       ├── glowing-effect.tsx
│       ├── loading-animation.tsx
│       ├── motion-footer.tsx     # CinematicFooter (GSAP ScrollTrigger, Plus Jakarta Sans)
│       ├── site-loader.tsx       # Kinetic typography site loader
│       ├── social-links.tsx
│       ├── testimonial-cards.tsx
│       └── tubelight-navbar.tsx  # Floating pill navbar (framer-motion)
│
├── lib/
│   ├── blog-data.ts             # All blog post content (POSTS_DATA Record<string, BlogPost>)
│   ├── lenis-provider.tsx       # ReactLenis smooth scroll provider
│   └── utils.ts                 # cn() utility (clsx + tailwind-merge)
│
├── public/
│   ├── logo.png                 # Brand logo 32x32
│   ├── og-image.png             # OG image 1200x630
│   ├── grid.svg                 # Background grid pattern
│   └── jatin.jpeg               # Author avatar
│
├── brain.md                     # ← THIS FILE
├── FIX_LOG.md                   # Historical fix tracker (all phases complete)
├── next.config.mjs              # Next.js config
├── postcss.config.mjs           # @tailwindcss/postcss plugin
└── package.json                 # name: gromantra-website
```

---

## 🎨 Design System

### Color Palette
```
Background:   #0F1115  (--background)
Void:         #050508  (--gm-void)
Foreground:   #ffffff
Card:         #171A1F  (--card)
Border:       #1a1a1a / #343C43 (--gm-border)
Primary:      #1D4ED8  (--gm-primary) — electric blue
Signal/Cyan:  #5EC6FF  (--gm-signal)
Plasma:       #7B61FF  (--gm-plasma)
Muted text:   rgba(255,255,255,0.7) / #A0A0B0 (--gm-data)
```

### Typography (Google Fonts via next/font)
| Font | CSS Var | Usage |
|---|---|---|
| Space Grotesk | --font-display | Headings, logo, display |
| Inter | --font-sans | Body (default) |
| JetBrains Mono | --font-mono | Code, labels, terminal |
| Press Start 2P | --font-pixel | Pixel/retro accents |

Tailwind classes: `font-display`, `font-body-mono`, `font-pixel`

### Custom CSS Utilities (globals.css @layer utilities)
```
.gradient-primary    .gradient-accent    .glow-cyan    .glow-blue
.card-glass          .card-glass-hover   .signal-pulse .ticker-track
.clip-reveal-up      .clip-reveal-left   .stagger-1..8 .text-gromantra-glow
.font-display        .font-body-mono     .font-pixel
```

### Global Overlays (app/layout.tsx)
- `.grain-overlay` — fixed, z-9999, 6% opacity, SVG noise, pointer-events:none
- `.scanline-overlay` — fixed, z-9998, 3% opacity, scanlines, pointer-events:none

### Motion Tokens
```
--ease-expo: cubic-bezier(0.16, 1, 0.3, 1)
--duration-reveal: 0.8s
--stagger: 80ms
```

---

## 🗺️ Page Routes & Component Map

| Route | Key Client Components |
|---|---|
| `/` | HeroSection, FeaturesSection, ServicesSection, DistortionClockSection, SignalBoardSection, CollaboratorsSection, TestimonialsSection, TheBriefSection |
| `/about` | TerminalIntro, HeroScene, NeuralNetwork, OperatorSection, OriginTimeline, ValuesCubes, WhyGromantra, FinalCTA |
| `/about/jatin-gehani` | Inline author profile + Person schema |
| `/services` | Inline 5-card grid (SEO, Social Media, Web Dev, Performance, Branding) |
| `/services/[id]` | seo/social/webdev/performance/branding-page-client.tsx |
| `/blog` | blog-index-client.tsx |
| `/blog/[slug]` | blog-detail-client.tsx |
| `/contact` | Inline |
| `/pricing` | Inline placeholder |
| `/case-studies` | Inline placeholder |

---

## 📝 Services Data

| id | Name | Lucide Icon |
|---|---|---|
| seo | SEO | Target |
| social-media | Social Media & Content | Megaphone |
| web-development | Web Development | Monitor |
| performance-marketing | Performance Marketing | BarChart3 |
| branding | Branding (Design/Video) | Palette |

---

## 📝 Blog Data (lib/blog-data.ts)

All posts by Jatin Gehani. Add new posts to `POSTS_DATA` record AND `POSTS` array in `app/blog/page.tsx`.

Existing slugs: `generative-engine-optimization-geo-playbook`, `server-side-data-architecture-paid-media`, `high-conversion-web-engineering-inp-cac`, `brand-identity-scale`, `seo-technical-foundations`, `performance-marketing-2024`, `architecting-growth-systems`

BlogBlock types: `"paragraph"` | `"heading2"` | `"heading3"` | `"list"` | `"quote"`

---

## 🔧 Key Patterns

### Adding a New Page
1. Create `app/[route]/page.tsx` with `export const metadata`
2. Import `Navbar` + `Footer`
3. Add `alternates.canonical` in metadata
4. Use `style={{ zIndex: -10, pointerEvents: 'none' }}` on ALL overlay elements
5. Add to `app/sitemap.ts`

### Adding a New Service
1. Add to `SERVICES` in `app/services/page.tsx`
2. Create `components/services/[name]-page-client.tsx`
3. Map new id in `app/services/[id]/page.tsx`
4. Add metadata + FAQPage JSON-LD

### Adding a New Blog Post
1. Add to `POSTS_DATA` in `lib/blog-data.ts`
2. Add to `POSTS` array in `app/blog/page.tsx`
3. Date format: `YYYY-MM-DD`

---

## 🔑 SEO Architecture

- `metadataBase`: `https://thegromantra.com`
- OG image: `/og-image.png` (1200×630)
- JSON-LD schemas present: Organization, WebSite, Service, Article, Person, FAQPage, BreadcrumbList
- All pages have canonical URLs

---

## 🚨 Gotchas

1. **No `tailwind.config.js`** — Tailwind v4 reads from CSS via `@import "tailwindcss"` in globals.css
2. **PostCSS plugin**: `@tailwindcss/postcss` (not `tailwindcss`)
3. **TypeScript**: `ignoreBuildErrors: false` — fix errors before building
4. **Remote images**: Only `images.unsplash.com` allowed in next.config.mjs
5. **`"use client"` required** for: useState, useEffect, framer-motion, GSAP, event handlers
6. **Footer font**: Plus Jakarta Sans loaded inline in motion-footer.tsx (not via next/font)
7. **DevTools Protection**: `DisableDevTools` component in layout.tsx disables F12, right-click, inspect, Ctrl+Shift+I/J/C, and Ctrl+U. `devIndicators: false` set in `next.config.mjs`.
8. **reCAPTCHA Security**: All intake forms (`ContactForm` & `TheBriefSection`) require Google reCAPTCHA verification via `ReCAPTCHA` component (`components/ui/recaptcha.tsx`). Supports `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` env var.

---

## 🔄 Git

- Branch: `master`
- Remote: `https://github.com/jatingehani123-art/TheGromantra.git`
- Commit format: `fix:` | `feat:` | `refactor:` | `docs:`

---

## 📌 Social Links

| Platform | URL |
|---|---|
| Instagram | https://www.instagram.com/gromantraa?igsh=MXA5NnUzbGRqaWVmcA== |
| LinkedIn | https://www.linkedin.com/in/the-gromantra |
| X / Twitter | https://x.com/thegromantra |

---

*Last updated: 2026-07-26 | Always update this file after major changes.*
