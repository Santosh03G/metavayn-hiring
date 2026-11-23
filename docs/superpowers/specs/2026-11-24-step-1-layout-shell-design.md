# Step 1: Layout Shell Design Specification

**Author:** Antigravity  
**Date:** 2026-11-24  
**Project:** Metavayn (Engineering Recruitment Platform)  
**Status:** Approved  
**Scope:** Step 1 — Layout Shell (Navbar, Footer, Page Intro, Route Transition Wipe, and Application Shell)

---

## 1. Overview & Purpose

Step 1 implements the persistent global layout shell that frames the entire Metavayn experience. The shell delivers:
1. **Header & Navigation (`NavbarComponent`):** Premium header featuring an SVG wordmark with a hexagonal "M" engineering node, 8 desktop navigation links with animated underline hover and active states, smart hide-on-scroll down / reveal-on-scroll up behavior, full-screen mobile drawer, and the strictly isolated primary Amber `#F59E0B` "Submit Your Resume" CTA.
2. **Footer (`FooterComponent`):** 4-column structured footer on deep midnight background with subtle blueprint grid texture, prominent mandatory honest disclosure, social connect icons, and legal placeholder links.
3. **Page-Load Intro (`PageIntroComponent`):** 1.2s high-impact logo pulse with cyan aura and smooth fade-out, persisted via `sessionStorage` to run once per browser session and bypass on revisits or reduced motion.
4. **Route Transition Wipe (`RouteWipeComponent`):** 0.7s GPU-accelerated dual-layer blue gradient wipe listening to Angular Router navigation events, synchronously resetting the scroll position to the top at midpoint via `SmoothScrollService`.
5. **App Shell Integration (`AppComponent`):** Unifies intro, wipe, navbar, main outlet with accessibility skip link, and footer.

---

## 2. Global Constraints & Brand Rules

- **India-Based Honest Disclosure:** The footer and brand copy must explicitly state:  
  *"Metavayn is an India-based engineering recruitment company serving employers and engineering professionals in the United States."*  
  Never claim US offices, visa sponsorship, or direct employer partnerships.
- **Strict Amber Isolation:** Amber (`#F59E0B`) is reserved exclusively for the primary "Submit Your Resume" CTA button. No other buttons or links in the navbar or footer may use amber.
- **US Terminology:** "Submit Your Resume" (never "Submit CV"), "Candidate", "Engineering Recruiting Firm", "Apply Now", "Compensation".
- **Performance & Memory Hygiene:** All GSAP timelines, ScrollTrigger listeners, and DOM subscriptions must run outside Angular's zone when appropriate and be destroyed cleanly in `ngOnDestroy()`.

---

## 3. Architecture & Component Tree

```
AppComponent (src/app/app.component.ts)
├── <a href="#main-content"> (Skip to Content Link)
├── PageIntroComponent (src/app/core/layout/page-intro/page-intro.component.ts)
├── RouteWipeComponent (src/app/core/layout/route-wipe/route-wipe.component.ts)
├── NavbarComponent (src/app/core/layout/navbar/navbar.component.ts)
│   ├── Logo SVG (Hexagonal Node + Sora Wordmark)
│   ├── Desktop Nav Links (Home, Jobs, Categories, Candidates, Employers, Resources, About, Contact)
│   ├── ButtonComponent (variant="amber-cta", href="/candidates", "Submit Your Resume")
│   └── Mobile Drawer (Overlay, Staggered Links, Mobile Amber CTA)
├── <main id="main-content">
│   └── <router-outlet />
└── FooterComponent (src/app/core/layout/footer/footer.component.ts)
    ├── Col 1: Brand Wordmark + Mandatory Honest Disclosure + Social Icons
    ├── Col 2: Candidates Links
    ├── Col 3: Employers Links
    ├── Col 4: Company & Legal Links
    └── Sub-Footer Bar (Copyright, Regulatory Badge, Back-to-Top Button)
```

---

## 4. Component Detailed Specifications

### 4.1 NavbarComponent (`src/app/core/layout/navbar/navbar.component.ts`)

- **Selector:** `app-navbar`
- **Imports:** `CommonModule`, `RouterLink`, `RouterLinkActive`, `ButtonComponent`
- **Visual Design:**
  - `fixed top-0 left-0 right-0 z-40 transition-all duration-300`
  - **State A (Page Top, $y < 40\text{px}$):** Transparent background, `py-6`, no border, no shadow.
  - **State B (Scrolled, $y \ge 40\text{px}$):** Compact padding (`py-3.5`), `.glass` (`rgba(15, 30, 74, 0.8)` with `backdrop-blur-md`), bottom border `border-b border-white/10`, elevation shadow.
  - **Scroll Direction State:**
    - Scrolling down past $100\text{px}$: `-translate-y-full` (hides).
    - Scrolling up: `translate-y-0` (reveals).
- **Navigation Links:**
  - Links: `Home` (`/`), `Search Jobs` (`/jobs`), `Job Categories` (`/categories`), `For Candidates` (`/candidates`), `For Employers` (`/employers`), `Career Resources` (`/resources`), `About Us` (`/about`), `Contact` (`/contact`).
  - Active styling: `routerLinkActive="text-cyan font-medium"` with persistent cyan indicator dot.
  - Hover styling: Expanding cyan underline (`scale-x-0 group-hover:scale-x-100 transition-transform`).
- **Primary CTA:**
  - `<app-button variant="amber-cta" href="/candidates">Submit Your Resume</app-button>`
- **Mobile Menu Drawer:**
  - Toggle button with animated hamburger-to-X icon.
  - Fullscreen overlay: `fixed inset-0 z-50 bg-midnight/95 backdrop-blur-2xl p-8 flex flex-col justify-between`.
  - Links animated with GSAP stagger on open (`y: 20 -> 0`, `opacity: 0 -> 1`).
  - Closes on link click, `Escape` key, or close button click.
  - Locks body scroll (`document.body.style.overflow = 'hidden'`) while open.

---

### 4.2 FooterComponent (`src/app/core/layout/footer/footer.component.ts`)

- **Selector:** `app-footer`
- **Imports:** `CommonModule`, `RouterLink`
- **Visual Design:**
  - Deep Midnight background (`#0A1330`) with `.blueprint-grid` subtle overlay.
  - Top border `border-t border-white/10` with soft cyan ambient gradient.
- **Content Columns (4-Column Grid):**
  1. **Brand & Disclosure:**
     - Metavayn SVG logo + tagline *"Connecting exceptional engineering talent with companies shaping the future."*
     - Mandatory Disclosure: *"Metavayn is an India-based engineering recruitment company serving employers and engineering professionals in the United States."*
     - Social icon links (LinkedIn, X, GitHub) with `aria-label` and hover glows.
  2. **Candidates:**
     - Search Jobs (`/jobs`), Job Categories (`/categories`), Candidate Guide (`/candidates`), Career Resources (`/resources`), Compensation Insights (`/resources`).
  3. **Employers:**
     - US Talent Solutions (`/employers`), Practice Disciplines (HVAC, Mechanical, Electrical, Data Center, Analysis), Hiring FAQs (`/employers`), Request Talent Consultation (`/contact`).
  4. **Company & Legal:**
     - About Metavayn (`/about`), Contact Us (`/contact`), Privacy Policy (`/privacy`), Terms of Service (`/terms`).
- **Sub-Footer Bar:**
  - Copyright: `© 2026 Metavayn. All rights reserved.`
  - Illustrative badge: *"Illustrative sample listings — Independent Recruiting Firm."*
  - Back-to-Top button: calls `SmoothScrollService.scrollTo(0)` with smooth arrow animation.

---

### 4.3 PageIntroComponent (`src/app/core/layout/page-intro/page-intro.component.ts`)

- **Selector:** `app-page-intro`
- **Visuals:** Fullscreen midnight fixed overlay (`fixed inset-0 z-50 bg-midnight flex items-center justify-center`).
- **Persistence & Skip Rules:**
  - Read `sessionStorage.getItem('metavayn_intro_seen')`.
  - If present or `prefers-reduced-motion` or not in browser: immediately hide (`isVisible = false`).
  - If absent: set `sessionStorage.setItem('metavayn_intro_seen', 'true')` and play sequence.
- **GSAP Animation Sequence (Max 1.2s):**
  - $0.0\text{s} - 0.7\text{s}$: Logo pulse (`scale: 0.92 -> 1.04`, glowing cyan drop shadow).
  - $0.7\text{s} - 1.2\text{s}$: Fade out (`opacity: 1 -> 0`, `scale: 1.03`), after which `isVisible.set(false)`.

---

### 4.4 RouteWipeComponent (`src/app/core/layout/route-wipe/route-wipe.component.ts`)

- **Selector:** `app-route-wipe`
- **Visuals:** Dual-layer blue gradient overlay (`fixed inset-0 z-50 pointer-events-none`) with `linear-gradient(135deg, #0F1E4A 0%, #1D4ED8 50%, #22D3EE 100%)`.
- **Router Event Orchestration:**
  - Listens to `NavigationStart`:
    - Checks `prefers-reduced-motion`. If enabled, resets scroll to top immediately and exits.
    - Otherwise, animates panel from left to right: `xPercent: -100 -> 0` (0.35s, ease `power3.inOut`).
    - At midpoint ($xPercent = 0$): calls `SmoothScrollService.scrollTo(0)`.
  - Listens to `NavigationEnd`, `NavigationCancel`, `NavigationError`:
    - Animates panel out to right: `xPercent: 0 -> 100` (0.35s, ease `power3.inOut`), then resets to `-100%`.

---

### 4.5 AppComponent (`src/app/app.component.ts`)

- **Template:**
  - Accessibility skip link.
  - `<app-page-intro />`
  - `<app-route-wipe />`
  - `<app-navbar />`
  - `<main id="main-content" class="min-h-screen pt-20"> <router-outlet /> </main>`
  - `<app-footer />`
- **Lifecycle:**
  - `SmoothScrollService.init()` on `ngOnInit()`.
  - `SmoothScrollService.destroy()` on `ngOnDestroy()`.

---

## 5. Testing & Verification Strategy

1. **Unit Testing (`npm test` via Vitest):**
   - `NavbarComponent`: Verify 8 navigation links rendered; verify amber CTA button rendered with text "Submit Your Resume"; verify scroll state changes classes; verify mobile drawer toggle opens/closes and toggles body overflow.
   - `FooterComponent`: Verify disclosure text is present verbatim; verify 4 column headings and link counts; verify back-to-top button triggers `SmoothScrollService.scrollTo(0)`.
   - `PageIntroComponent`: Verify `sessionStorage` skipping logic; verify reduced-motion bypass; verify animation completion unmounts overlay.
   - `RouteWipeComponent`: Verify subscription to router events; verify scroll reset on navigation; verify reduced-motion bypass.
   - `AppComponent`: Verify all shell components compile and render together with `<router-outlet>`.
2. **Production Build (`npm run build`):**
   - 0 TypeScript compilation errors, 0 SCSS/CSS errors, clean bundle output.
3. **Browser Verification (`http://localhost:4200`):**
   - Navbar transparency over hero, glass blur on scroll, hide on scroll down, show on scroll up.
   - Mobile drawer smooth open/close.
   - Route transition wipe between pages.
   - Footer layout, blueprint grid, honest disclosure, back-to-top scroll.
   - Zero console errors.
