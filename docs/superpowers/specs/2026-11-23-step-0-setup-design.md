# Design Specification: Metavayn Step 0 - Project Setup & Shared Foundations

**Date:** 2026-11-23  
**Status:** Approved by User  
**Target Repository:** `https://github.com/Santosh03G/metavayn-hiring.git`  
**Execution Context:** Step 0 of 9-step Metavayn roadmap

---

## 1. Executive Summary & Objective

Metavayn is an India-based engineering recruitment firm that connects skilled engineering candidates with US companies. 
This specification establishes **Step 0: Setup & Foundational Shared Layer**. It sets up the root Angular project, styling token system, smooth scroll service, core motion directives, reusable UI components, and lazy-loaded route structure, providing a verified base before layout and page development commences.

### Key Constraints & Rules
- **Non-nested Root App:** Angular CLI must initialize directly in the project root (`--directory .`), retaining existing `.agents/` configuration and documentation.
- **Brand Positioning:** India-based recruitment firm serving US companies; strictly honest disclosures; US terminology ("Submit Your Resume", "Candidate", "Engineering Recruiting Firm", "Apply Now", "Compensation").
- **Strict Amber Isolation:** `#F59E0B` (amber) is exclusively reserved for the "Submit Your Resume" primary CTA button.
- **Motion Lifecycle Hygiene:** All GSAP ScrollTrigger instances must be killed in `ngOnDestroy` / `takeUntilDestroyed` hooks; `prefers-reduced-motion` must be respected globally.
- **One Step at a Time:** Only Step 0 deliverables are constructed in this phase.

---

## 2. Technical Stack & Environment

- **Angular:** 21.x / standalone components, signals, lazy-loaded routes (`loadComponent`).
- **Styling:** SCSS, Tailwind CSS with custom theme extensions, PostCSS, Autoprefixer.
- **Typography:** Google Fonts — Sora (display/headings: 500, 600, 700), Inter (body: 400, 500, 600).
- **Motion & Physics:** GSAP 3.x (`gsap`, `ScrollTrigger`), `@studio-freight/lenis` (or `lenis`), `lucide-angular` icons.
- **TypeScript & Build:** Strict TypeScript, `@angular/build:application` (Vite/esbuild).
- **Version Control:** Git on branch `main`, remote origin `https://github.com/Santosh03G/metavayn-hiring.git`.

---

## 3. Design System & Style Tokens

### 3.1 Color Palette
Defined as CSS variables in `src/styles.scss` and mapped in `tailwind.config.js`:
- `--color-midnight`: `#0A1330` (Primary deep dark surface)
- `--color-navy`: `#0F1E4A` (Card and container dark surface)
- `--color-royal`: `#1D4ED8` (Primary brand blue)
- `--color-electric`: `#3B82F6` (Interactive links & accents)
- `--color-cyan`: `#22D3EE` (Highlights, node canvas glows, tags)
- `--color-ice`: `#EAF2FF` (Light contrast section background)
- `--color-white`: `#FFFFFF` (Primary text on dark surfaces)
- `--color-ink`: `#0F172A` (Body text on light backgrounds)
- `--color-slate`: `#475569` (Muted text / descriptions)
- `--color-amber`: `#F59E0B` (Dedicated CTA for "Submit Your Resume")

### 3.2 Typography Tokens
- Heading: `'Sora', sans-serif`
- Body: `'Inter', sans-serif`

### 3.3 Custom Utility Classes
- `.glass`: `background: rgba(15, 30, 74, 0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08);`
- `.glow-cyan`: `box-shadow: 0 0 30px -5px rgba(34, 211, 238, 0.35);`
- `.glow-amber`: `box-shadow: 0 0 30px -5px rgba(245, 158, 11, 0.4);`
- `.blueprint-grid`: Coordinate grid SVG/CSS pattern on midnight backgrounds.
- `.text-gradient`: `background: linear-gradient(135deg, #FFFFFF 0%, #22D3EE 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`

---

## 4. Architecture & Component Specifications

### 4.1 SmoothScrollService (`src/app/core/services/smooth-scroll.service.ts`)
- **Scope:** Root singleton (`providedIn: 'root'`).
- **Integration:**
  - Creates Lenis instance inside `NgZone.runOutsideAngular` to prevent continuous change detection loops.
  - Links Lenis scroll tick to GSAP:
    ```typescript
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    ```
  - Queries `window.matchMedia('(prefers-reduced-motion: reduce)')`. If reduced motion is preferred, smooth scrolling is bypassed.
  - Exposes `destroy()` to safely remove ticker listener and destroy Lenis instance.

### 4.2 Shared Primitives (`src/app/shared/`)

#### 4.2.1 ButtonComponent (`src/app/shared/components/button/button.component.ts`)
- **Inputs:**
  - `variant: 'primary' | 'ghost' | 'amber-cta'` (default: `'primary'`)
  - `type: 'button' | 'submit'` (default: `'button'`)
  - `disabled: boolean` (default: `false`)
  - `href?: string` (renders routerLink or standard `<a>` if external)
  - `ariaLabel?: string`
- **Behavior:**
  - Magnetic hover effect using GSAP `quickTo` on mouse movement within button bounding rect; smoothly resets to $(0,0)$ on mouse leave.
  - Amber variant carries the `.glow-amber` styling and is reserved for resume submission.

#### 4.2.2 SectionHeadingComponent (`src/app/shared/components/section-heading/section-heading.component.ts`)
- **Inputs:**
  - `eyebrow?: string`
  - `title: string`
  - `subtitle?: string`
  - `centered: boolean` (default: `false`)
  - `theme: 'dark' | 'light'` (default: `'dark'`)
- **Behavior:**
  - Displays eyebrow badge with cyan indicator line, Sora title, and Inter subtitle.
  - Applies scroll reveal animation via GSAP ScrollTrigger on initial viewport entry.

#### 4.2.3 CounterComponent (`src/app/shared/components/counter/counter.component.ts`)
- **Inputs:**
  - `targetValue: number`
  - `duration: number` (default: `2.0` seconds)
  - `prefix?: string`
  - `suffix?: string`
  - `decimals: number` (default: `0`)
- **Behavior:**
  - Renders a signal-based animated number that counts smoothly from 0 to `targetValue` when revealed via ScrollTrigger.

#### 4.2.4 RevealDirective (`src/app/shared/directives/reveal.directive.ts`)
- **Selector:** `[appReveal]`
- **Inputs:**
  - `appRevealDelay: number` (seconds, default: `0`)
  - `appRevealStagger: number` (seconds, default: `0`)
  - `appRevealDirection: 'up' | 'down' | 'left' | 'right'` (default: `'up'`)
- **Lifecycle:**
  - Creates a GSAP `fromTo` tween on the host element (`opacity: 0, y: 24` $\to$ `opacity: 1, y: 0`, ease: `power3.out`, duration: `0.7s`).
  - Automatically kills the associated `ScrollTrigger` in `ngOnDestroy`.
  - Disables movement when reduced motion is detected.

#### 4.2.5 TiltCardDirective (`src/app/shared/directives/tilt-card.directive.ts`)
- **Selector:** `[appTilt]`
- **Behavior:**
  - Calculates relative cursor offset on `mousemove` and transforms the card in 3D (`perspective(1000px) rotateX(...) rotateY(...) scale3d(1.02, 1.02, 1.02)`).
  - Resets smoothly to initial transform on `mouseleave`.

---

## 5. Route Architecture & Living Foundation Sandbox

### 5.1 Route Configuration (`src/app/app.routes.ts`)
Configured with lazy-loaded standalone components:
- `''` $\to$ `HomeComponent` (Acts as living sandbox for Step 0)
- `'jobs'` $\to$ `JobsComponent`
- `'jobs/:id'` $\to$ `JobDetailComponent`
- `'categories'` $\to$ `CategoriesComponent`
- `'candidates'` $\to$ `CandidatesComponent`
- `'employers'` $\to$ `EmployersComponent`
- `'resources'` $\to$ `ResourcesComponent`
- `'about'` $\to$ `AboutComponent`
- `'contact'` $\to$ `ContactComponent`
- `'**'` $\to$ `NotFoundComponent`

### 5.2 Sandbox Verification View
In Step 0, `HomeComponent` renders an interactive visual verification matrix containing:
1. Palette and typography verification cards.
2. Section heading examples in dark and light modes with scroll reveals.
3. Buttons in `primary`, `ghost`, and `amber-cta` with magnetic hover testing.
4. Glassmorphism cards with `[appTilt]` 3D movement.
5. Counter component triggers.
6. Scrollable test blocks validating smooth Lenis scrolling.

---

## 6. Verification & Quality Gates

1. **Unit Tests (TDD):**
   - Unit tests for `ButtonComponent`, `SectionHeadingComponent`, `CounterComponent`, `SmoothScrollService`, and route configuration.
   - Run tests and verify 100% pass rate.
2. **Production Build:**
   - Run `ng build` and verify clean output with 0 warnings/errors.
3. **Browser & Visual Verification:**
   - Launch `ng serve` on `http://localhost:4200`.
   - Verify responsiveness at 1440px desktop and 390px mobile.
   - Confirm zero console errors.
4. **Git Repository Setup:**
   - Initialize git, set main branch, stage and commit Step 0 baseline.
   - Configure remote `https://github.com/Santosh03G/metavayn-hiring.git`.
