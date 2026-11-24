# Design Specification: Metavayn Step 3 — Categories / Practice Areas

**Date:** 2026-11-24  
**Status:** Approved by User  
**Target Repository:** `https://github.com/Santosh03G/metavayn-hiring.git`  
**Execution Context:** Step 3 of 9-step Metavayn roadmap  
**Branch:** `step-3-categories`

---

## 1. Executive Summary & Objective

Metavayn is an India-based engineering recruitment firm connecting skilled Indian technical talent with US employers across HVAC & Thermal, Mechanical, Electrical, Data Center Infrastructure, and Engineering Analysis disciplines.

Step 3 establishes the **Categories / Practice Areas subsystem**, delivering:
1. **Categories Hub Page (`/categories`)**: An interactive index showcasing Metavayn's 5 core engineering disciplines with 3D tilt cards, scope highlights, role pills, domain alignment summary, and dual conversion CTAs.
2. **Dynamic Category Detail Page (`/categories/:slug`)**: A data-driven detail page for each discipline featuring breadcrumb navigation, discipline hero overview, core technical capabilities, filtered illustrative sample roles with mandatory badges and disclaimer, dual conversion CTAs, and a graceful 404 fallback.
3. **Data Model Enrichment**: Adding expanded descriptions, subtitles, and focus areas in `src/app/data/disciplines.data.ts`, and ensuring all 5 disciplines have illustrative sample job listings in `src/app/data/jobs.data.ts`.

---

## 2. Invariants & Brand Rules

1. **Strict Amber Isolation:**
   - The Amber color (`#F59E0B`, `variant="amber-cta"`, `.glow-amber`) is reserved **EXCLUSIVELY** for the primary candidate conversion action: **"Submit Your Resume"** (or discipline-specific variant e.g. "Submit Your Resume for [Discipline]").
   - All other action buttons (e.g. "View Practice Area", "Apply Now", "Inquire About Engineers", "Hire Engineering Talent") must strictly use `variant="primary"`, `variant="ghost"`, or standard cyan/blue links.

2. **Mandatory Honest Disclosure & Illustrative Badges:**
   - Metavayn operates in India, providing recruiting services to US employers.
   - Zero misleading claims of physical US office locations, US visa sponsorship, or direct employer partnerships.
   - All job listings on detail pages are illustrative representations of client requirements and must carry the badge `<span class="illustrative-badge">Illustrative listing</span>`.
   - The disclaimer banner must be displayed above job cards: *"Note: All listings shown below are illustrative representations of client requirements. Metavayn does not publish live vacancies without active mandate agreements."*

3. **US Terminology:**
   - "Submit Your Resume" (never "CV"), "Candidate", "Engineering Recruiting Firm", "Apply Now", "Compensation" (`$85,000 - $110,000 USD / Equiv.`).

4. **Production Build & Test Standard:**
   - 100% test-driven development (TDD): Failing tests written first, passing verified.
   - Clean production build (`npm run build`) with zero TypeScript, SCSS, or bundle budget errors.

---

## 3. Architecture & Routing

### 3.1 Routing Configuration (`src/app/app.routes.ts`)
```typescript
{
  path: 'categories',
  loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent),
},
{
  path: 'categories/:slug',
  loadComponent: () => import('./features/categories/category-detail/category-detail.component').then(m => m.CategoryDetailComponent),
}
```

### 3.2 Dynamic Route Parameter Binding
`CategoryDetailComponent` utilizes Angular 19's input route binding:
```typescript
readonly slug = input.required<string>();
readonly discipline = computed(() => DISCIPLINES.find(d => d.slug === this.slug()));
readonly jobs = computed(() => FEATURED_JOBS.filter(j => j.disciplineSlug === this.slug()));
```

---

## 4. Component Specifications

### 4.1 Categories Hub Page (`src/app/features/categories/categories.component.ts`)
- **Page Header**: `<app-page-intro badge="Specialized Practice Areas" title="Engineering Disciplines We Staff" subtitle="..." />`
- **Discipline Grid**: Responsive 3-column / 2-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`).
  - Cards wrapped in `[appTilt]` and `[appReveal]`.
  - Icon container with Lucide SVG.
  - Discipline Name & Short Description.
  - Role tags pills (`span.rounded-md`).
  - Link: `"Explore Practice Area →"` pointing to `['/categories', discipline.slug]`.
- **Domain Value Proposition**: Glass card detailing technical vetting rigor, engineering-literate recruitment consultants, and US program alignment.
- **Dual CTA Section**: Candidates panel with Amber CTA (`variant="amber-cta"`, "Submit Your Resume") + Employers panel (`variant="primary"`, "Hire Engineering Talent").

### 4.2 Category Detail Page (`src/app/features/categories/category-detail/category-detail.component.ts`)
- **Breadcrumbs**: Home (`/`) > Practice Areas (`/categories`) > `{{ discipline.name }}`.
- **Hero Header**:
  - Lucide SVG icon with cyan glow.
  - Sector badge: `Engineering Practice Area`.
  - Headline: `{{ discipline.name }}`.
  - Subtitle: `{{ discipline.heroSubtitle }}`.
  - Comprehensive Overview: `{{ discipline.fullOverview }}`.
- **Core Focus Technical Capabilities**:
  - Section heading: `"Core Technical Focus"`.
  - Grid of focus areas (`discipline.coreFocusAreas`) detailing key sub-disciplines (e.g., Central Plant Design, Mission-Critical Cooling, Finite Element Analysis).
- **Representative Opportunities**:
  - Section heading: `"Representative Opportunities"`.
  - Illustrative disclaimer banner.
  - Job card grid displaying matched roles from `FEATURED_JOBS`.
  - Each card displays `"Illustrative listing"` badge, location, work type, compensation, tags, and "Apply Now" button (`variant="primary"`).
  - If no jobs match, renders an illustrative intake card inviting candidates to submit resumes for upcoming client mandates.
- **Dual Conversion Banner**:
  - Candidate Callout with isolated Amber CTA button (`variant="amber-cta"`, `"Submit Your Resume for {{ discipline.name }}"`).
  - Employer consultation callout with link to `/contact`.
- **404 State**:
  - If `discipline()` resolves to `undefined`, displays a clean "Practice Area Not Found" banner with a button navigating back to `/categories`.

---

## 5. Mock Data Architecture

### 5.1 Discipline Interface Extension (`src/app/data/disciplines.data.ts`)
```typescript
export interface Discipline {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  heroSubtitle: string;
  fullOverview: string;
  iconName: string;
  roles: string[];
  coreFocusAreas: string[];
}
```

The 5 disciplines:
1. `hvac-thermal`: HVAC & Thermal Systems
2. `mechanical`: Mechanical Engineering
3. `electrical`: Electrical & Power Systems
4. `data-center`: Data Center Infrastructure
5. `engineering-analysis`: Engineering Analysis & Simulation

### 5.2 Job Listings (`src/app/data/jobs.data.ts`)
Ensure each of the 5 disciplines has at least 1 illustrative sample job with:
- `isIllustrative: true`
- Clear US client client references (`"Remote (US Client)"`)
- USD compensation format (`"$85,000 - $110,000 USD / Equiv."`)

---

## 6. Testing & Quality Strategy

1. **Unit Test Coverage**:
   - `data.spec.ts`: Verify data integrity, all 5 disciplines have required fields, all jobs have `isIllustrative: true`.
   - `categories.component.spec.ts`: Verify 5 discipline cards rendered, navigation links present, Amber button isolated.
   - `category-detail.component.spec.ts`: Verify breadcrumbs, hero rendering, core focus areas, illustrative jobs, Amber CTA button, and 404 fallback for invalid slugs.
   - `app.routes.spec.ts`: Verify lazy loading of `/categories` and `/categories/:slug`.
2. **Environment Mocks**:
   - `beforeAll` mock for `window.matchMedia` in all specs using GSAP/directives.
   - `afterEach(() => fixture.destroy())` for clean teardown.
3. **Build & Typecheck**:
   - `npx tsc --noEmit` exits with 0 errors.
   - `npm run build` exits with 0 errors.
