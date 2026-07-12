# GROMANTRA FIX_LOG.md

## Phase 1 — Critical
[x] #1 — Contact form: already using /api/send (Resend). The Brief section redirected from Formspree to /api/send
[x] #2 — Fake phone: not present in codebase; TODO_PHONE placeholder noted (already absent from page)
[x] #3 — Social links: already use real-looking handles; TODO_SOCIAL_URL noted for confirmation
[x] #4 — og-image.png: already exists at /public/og-image.png (748KB)

## Phase 2 — High Priority
[x] #5 — ignoreBuildErrors: false (already set)
[x] #6 — remotePatterns for Unsplash (already configured)
[x] #7 — Testimonial `priority` prop: AnimatedTestimonials already handles first image; autoplayInterval set to 5500
[x] #8 — Hero mobile fallback: static /og-image.png shown on mobile; Spline iframe hidden on mobile via hidden md:block
[x] #9 — id="features" added to FeaturesSection wrapper in app/page.tsx
[x] #10 — "Request a Quote" label (already in footer)
[x] #11 — /privacy-policy page (already exists)
[x] #12 — Blog category filtering (already working in blog-index-client.tsx)
[x] #13 — package.json name (already "gromantra-website")

## Phase 3 — Medium Priority
[x] #14 — roomWidth in React state with resize listener (already done in services-section.tsx)
[x] #15 — THREE.Clock: no usage found in codebase; no action needed
[x] #16 — autoplayInterval changed: 5000 → 5500 in testimonials-section.tsx
[x] #17 — The Brief form: redirected from Formspree to /api/send
[x] #18 — robots.txt /static/ rule: not present in file; no action needed
[x] #19 — Performance page: Footer moved outside snap-start section in performance-page-client.tsx
[x] #20 — Hydration mismatch: no suppressHydrationWarning found; already clean

## Phase 4 — Low Priority / Polish
[x] #21 — generator: "Next.js" (already done)
[x] #22 — Copyright footer consolidated (already done in footer.tsx)
[x] #23 — font-body-mono/font-serif-accent: properly defined in globals.css @layer utilities
[x] #24 — Blog dates already in ISO format in lib/blog-data.ts
[x] #25 — Unsplash blog images: left as external (build would need actual download; noted for later swap)
[x] #26 — style jsx block: not present in the-brief-section.tsx; no action needed
[x] #27 — metadataBase: already set in app/layout.tsx
[x] #28 — scroll-behavior smooth: not in globals.css; no action needed

## Phase 5 — SEO / Structured Data
[x] #29 — canonical tags added to: /, /contact, /blog, /about, /terms, /privacy, /privacy-policy, /services, all /services/[id], all /blog/[slug]
[x] #30 — OG image added to all /services/[id] pages (og-image.png, 1200x630)
[x] #31a — Organization + WebSite JSON-LD (already in layout.tsx)
[x] #31b — Service JSON-LD on each service page (already in [id]/page.tsx)
[x] #31c — Article JSON-LD on blog posts (already in blog/[slug]/page.tsx)
[x] #31d — BreadcrumbList JSON-LD added to blog detail + all service pages
[x] #31e — Person JSON-LD added to /about/jatin-gehani
[x] #32 — Breadcrumb navigation UI added to blog-detail-client.tsx and service pages
[x] #33 — /about/jatin-gehani author page created with Person schema + headshot + blog links
[x] #34 — Author byline in blog detail links to /about/jatin-gehani (cross-link)
[x] #35 — FAQ sections (5 Q&As each) + FAQPage JSON-LD added to all 5 service pages

## Phase 6 — Content Scaffolding
[x] /case-studies — index page with 3 placeholder slots scaffolded
[x] /case-studies/[slug] — dynamic route skeleton scaffolded
[x] /pricing — placeholder page scaffolded with 3 tier slots

## Build
[ ] npm run build — awaiting result
