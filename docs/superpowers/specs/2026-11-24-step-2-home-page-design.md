# Step 2: Home Page Design Specification

**Author:** Antigravity  
**Date:** 2026-11-24  
**Project:** Metavayn (Engineering Recruitment Platform)  
**Status:** Approved  
**Scope:** Step 2 — Home Page (Hero, Trust Strip, Disciplines, Why Choose Us, How It Works, Featured Roles, Dual CTA, Final Banner)

---

## 1. Overview & Purpose

Step 2 delivers the complete interactive **Home Page** for Metavayn. The page communicates Metavayn's honest positioning as an India-based engineering recruitment firm connecting skilled Indian engineers with US companies across HVAC, Mechanical, Electrical, Data Center, and Analysis disciplines.

The page features 8 sequential sections:
1. **Hero Section:** Full-viewport Midnight background with an interactive 2D Canvas "Talent Network", word-by-word staggered headline reveal, dual CTAs (Primary + strictly isolated Amber "Submit Your Resume"), compact job search bar, and scroll indicator.
2. **Trust Strip:** Counter strip consuming configurable metrics from `src/app/data/trust-metrics.data.ts` (with explicit TODO placeholder tags; zero fake client logos).
3. **Disciplines Tilt Cards:** 5 domain practice cards (HVAC & Thermal, Mechanical, Electrical, Data Center, Analysis) utilizing `[appTilt]`, Lucide icons, role lists, and soft cyan hover glow.
4. **Why Choose Us:** Crisp Light Ice (`#EAF2FF`) section transition with 4 value pillars and staggered scroll reveals.
5. **How It Works Timeline:** Pinned GSAP ScrollTrigger timeline with dual-track toggle ("For Candidates" 5 steps, "For Employers" 5 steps) and synchronized SVG progress rail.
6. **Featured Illustrative Roles:** 3 sample engineering job cards from `src/app/data/jobs.data.ts`, prominently marked with `"Illustrative listing"` badges and clear disclaimer copy.
7. **Dual CTA:** Split-panel layout contrasting candidate career acceleration with employer hiring solutions.
8. **Final Banner:** Immersive glow banner with centered magnetic Amber CTA button.

---

## 2. Global Constraints & Brand Invariants

- **Strict Amber Isolation:** The brand amber color (`#F59E0B`, `variant="amber-cta"`, `.glow-amber`) is reserved **EXCLUSIVELY** for the primary "Submit Your Resume" action button. No other button, card, badge, or text may use amber.
- **Mandatory Honest Disclosure & Illustrative Labeling:**
  - Metavayn is an India-based recruiting firm serving US employers and engineers.
  - Never claim US offices, visa sponsorship, or direct employer partnerships.
  - Every sample job role must be explicitly labelled with the badge `"Illustrative listing"`.
  - Trust metrics must use real or clearly annotated placeholder configs without fabricated client logos.
- **US Terminology:** "Submit Your Resume" (never "Submit CV"), "Candidate", "Engineering Recruiting Firm", "Apply Now", "Compensation".
- **Performance & Reduced Motion:**
  - 2D Canvas loop must run outside Angular's zone (`ngZone.runOutsideAngular`), pause on tab blur (`visibilitychange`), and render a static constellation if `prefers-reduced-motion` is active.
  - GSAP ScrollTriggers and Lenis smooth scrolling must clean up cleanly in `ngOnDestroy()`.

---

## 3. Component Architecture & Decomposition

The home feature will be implemented in `src/app/features/home/` using focused section sub-components:

```
src/app/features/home/
├── home.component.ts (Container assembling the 8 sections)
├── components/
│   ├── hero/
│   │   ├── hero.component.ts (Canvas, headline reveal, search bar, dual CTA, scroll indicator)
│   │   └── hero.component.spec.ts
│   ├── trust-strip/
│   │   ├── trust-strip.component.ts (4 metric counters with CounterComponent)
│   │   └── trust-strip.component.spec.ts
│   ├── disciplines/
│   │   ├── disciplines.component.ts (5 engineering discipline tilt cards)
│   │   └── disciplines.component.spec.ts
│   ├── why-choose-us/
│   │   ├── why-choose-us.component.ts (Light Ice section, 4 value pillars)
│   │   └── why-choose-us.component.spec.ts
│   ├── how-it-works/
│   │   ├── how-it-works.component.ts (GSAP pinned dual-track timeline)
│   │   └── how-it-works.component.spec.ts
│   ├── featured-roles/
│   │   ├── featured-roles.component.ts (3 illustrative job cards from mock data)
│   │   └── featured-roles.component.spec.ts
│   ├── dual-cta/
│   │   ├── dual-cta.component.ts (Split panel for Candidates vs Employers)
│   │   └── dual-cta.component.spec.ts
│   └── final-banner/
│       ├── final-banner.component.ts (Glow banner with magnetic Amber CTA)
│       └── final-banner.component.spec.ts
```

Shared Mock Data Models:
```
src/app/data/
├── trust-metrics.data.ts (Placeholder metrics with TODO tags)
├── disciplines.data.ts (5 engineering disciplines, descriptions, and role tags)
└── jobs.data.ts (Sample illustrative job listings)
```

---

## 4. Section Detailed Specifications

### 4.1 Section 1: Hero (`HeroComponent`)

- **Selector:** `app-home-hero`
- **Background & Canvas:**
  - Full viewport height (`min-h-screen relative flex items-center justify-center overflow-hidden pt-20 pb-16`) on Deep Midnight (`#0A1330`).
  - 2D Canvas rendering 50 nodes drifting in cyan (`#22D3EE`) and electric blue (`#3B82F6`), connecting with lines when distance $< 120\text{px}$.
  - Gentle mouse repulsion and connection lines.
  - Pauses on `document.visibilitychange` when hidden.
  - Renders static constellation when `prefers-reduced-motion` matches.
  - Cleans up `cancelAnimationFrame` in `ngOnDestroy`.
- **Headline & Staggered Reveal:**
  - Eyebrow badge: Glowing cyan dot + *"Specialized Engineering Recruitment for US Industries"*.
  - Headline: *"Build What's Next. Advance Your Engineering Career."* (staggered word reveal with GSAP `y: 28 -> 0`, `opacity: 0 -> 1`).
  - Subtext: *"Connecting Engineering Talent with America's Leading Industries."*
- **CTAs (Strict Amber Isolation):**
  - Primary CTA: `<app-button variant="primary" href="/jobs">Search Jobs</app-button>`
  - Secondary CTA (Amber): `<app-button variant="amber-cta" href="/candidates">Submit Your Resume</app-button>`
- **Compact Search Bar:**
  - Sleek `.glass` card with inputs for Title/Skill and Location, submitting to `/jobs?q=...&location=...`.
- **Scroll Indicator:**
  - Subtle mouse icon linking to `#trust-strip`.

---

### 4.2 Section 2: Trust Strip (`TrustStripComponent`)

- **Selector:** `app-home-trust-strip`
- **Data:** `src/app/data/trust-metrics.data.ts`
  - Disciplines Covered: `5`
  - Technical Screening: `100%`
  - Shortlist Delivery: `48` Hours
  - Talent Reach: `15+` Major Engineering Hubs
- **Presentation:** 4-column glass container (`bg-navy/60 backdrop-blur-md border-y border-white/10 py-10`) incorporating `CounterComponent` instances.

---

### 4.3 Section 3: Disciplines ("Industry Expertise") (`DisciplinesComponent`)

- **Selector:** `app-home-disciplines`
- **Header:** `SectionHeadingComponent` (`badge="Industry Expertise"`, `title="Engineering Disciplines We Staff"`, `subtitle="Focused technical recruiting for mission-critical American infrastructure"`).
- **Cards:** 5 domain cards (HVAC & Thermal, Mechanical, Electrical, Data Center, Analysis) from `src/app/data/disciplines.data.ts`.
- **Interactions:**
  - 3D Physics tilt with `[appTilt]` (`maxTilt="7"`).
  - Glass card styling (`.glass border border-white/10 rounded-2xl p-6`).
  - Staggered scroll reveal using `[appReveal]="'up'"`.
  - Cyan hover glow elevation (`hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]`).
  - Role pills and category exploration link.

---

### 4.4 Section 4: Why Choose Us (`WhyChooseUsComponent`)

- **Selector:** `app-home-why-choose-us`
- **Theme Transition:** Light Ice (`#EAF2FF`) background with high-contrast ink text (`text-ink`).
- **Header:** `SectionHeadingComponent` in light mode (`theme="light"`, `badge="Why Metavayn"`, `title="Engineered for Technical Precision"`).
- **Four Pillars:**
  1. *Engineering-Focused Recruiting* (Domain comprehension of thermal, mechanical, electrical codes).
  2. *Aligned Opportunities* (Direct connection to US employers requiring specialized skills).
  3. *Candidate-First Guidance* (Transparent compensation, interview coaching, and respect).
  4. *Strict Confidentiality* (Privacy protection, no profile distribution without candidate consent).
- **Card Styling:** White elevation cards (`bg-white rounded-2xl p-8 border border-slate/10 shadow-sm hover:shadow-lg`).

---

### 4.5 Section 5: How It Works Pinned Timeline (`HowItWorksComponent`)

- **Selector:** `app-home-how-it-works`
- **Theme:** Deep Midnight (`bg-midnight text-white py-24 relative`).
- **Header:** `SectionHeadingComponent` (`badge="Process Overview"`, `title="How It Works"`).
- **Dual-Track Switcher:** Toggle buttons for **For Candidates** (default) and **For Employers**.
- **GSAP Pinned Timeline:**
  - Viewport pins while user scrolls through the 5 steps.
  - Animated vertical SVG progress rail fills with glowing cyan as steps are reached.
  - Active steps highlight with `.glass` border illumination and cyan badge indicators.
- **Candidates Track (5 Steps):**
  1. Submit Resume -> 2. Technical Screening -> 3. Opportunity Matching -> 4. Interview Preparation -> 5. Offer Support.
- **Employers Track (5 Steps):**
  1. Role Intake -> 2. Targeted Sourcing -> 3. Shortlist Delivery -> 4. Coordinated Interviews -> 5. Placement & Integration.
- **Reduced-Motion:** Falls back to static sequential list without pin/scrub.
- **Cleanup:** Disposes ScrollTrigger instances in `ngOnDestroy`.

---

### 4.6 Section 6: Featured Illustrative Roles (`FeaturedRolesComponent`)

- **Selector:** `app-home-featured-roles`
- **Header:** `SectionHeadingComponent` (`badge="Sample Opportunities"`, `title="Featured Engineering Roles"`).
- **Data:** Sourced from `src/app/data/jobs.data.ts`:
  1. *HVAC Systems Design Engineer*
  2. *Mechanical Analysis Engineer (FEA/CFD)*
  3. *Data Center Electrical Infrastructure Engineer*
- **Honest Labeling:**
  - Every card features an `"Illustrative listing"` badge (`bg-electric/20 text-cyan border border-cyan/30 text-xs px-2.5 py-0.5 rounded-full font-mono`).
  - Clear section disclaimer: *"All positions shown are illustrative samples demonstrating typical requirements from our employer network."*
- **Actions:** "Apply Now" button and bottom "View All Roles" button routing to `/jobs`.

---

### 4.7 Section 7: Dual CTA Split Panel (`DualCtaComponent`)

- **Selector:** `app-home-dual-cta`
- **Structure:** 2-column split cards:
  - **Candidates Panel:** *"Advance Your Engineering Career"*, copy, and strictly isolated Amber button `<app-button variant="amber-cta" href="/candidates">Submit Your Resume</app-button>`.
  - **Employers Panel:** *"Hire Specialized Engineering Talent"*, copy, and primary button `<app-button variant="primary" href="/employers">Hire Engineering Talent</app-button>`.

---

### 4.8 Section 8: Final CTA Banner (`FinalBannerComponent`)

- **Selector:** `app-home-final-banner`
- **Visuals:** Immersive `.glass` banner with ambient cyan glow (`glow-cyan`), `.blueprint-grid` texture, and centered magnetic Amber CTA button:
  `<app-button variant="amber-cta" href="/candidates">Submit Your Resume</app-button>`.
- Secondary inquiry link for employers to `/contact`.

---

## 5. Testing & Verification Strategy

1. **Unit Testing (`npm test` via Vitest):**
   - `HeroComponent`: Canvas initialization, mouse listener handling, visibility pause, reduced motion static draw, search form navigation, dual CTA rendering.
   - `TrustStripComponent`: Renders all 4 configured metrics with CounterComponent instances.
   - `DisciplinesComponent`: Renders all 5 discipline tilt cards with correct category routerLinks and `[appTilt]`.
   - `WhyChooseUsComponent`: Renders 4 pillars with light theme section heading.
   - `HowItWorksComponent`: Track toggle (Candidates vs Employers), step count (5 steps per track), ScrollTrigger lifecycle cleanup.
   - `FeaturedRolesComponent`: Renders 3 mock roles, verifies `"Illustrative listing"` badge present on every card.
   - `DualCtaComponent`: Renders split candidate and employer cards with respective CTA variants.
   - `FinalBannerComponent`: Renders centered Amber CTA button and inquiry link.
   - `HomeComponent`: Integrates all 8 sub-components in correct sequence.
2. **Production Build (`npm run build`):**
   - 0 TypeScript errors, 0 SCSS/CSS errors, clean chunk split.
3. **Browser Verification (`http://localhost:4200`):**
   - Hero canvas interactive motion and word-by-word reveal.
   - Pinned How It Works scroll timeline scrub.
   - 3D tilt and magnetic button physics.
   - Light Ice to Midnight transitions.
   - Zero console errors.
