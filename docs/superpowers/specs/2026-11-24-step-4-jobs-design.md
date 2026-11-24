# Design Specification: Metavayn Step 4 — Jobs & Opportunities Experience

**Date:** 2026-11-24  
**Status:** Approved by User  
**Target Repository:** `https://github.com/Santosh03G/metavayn-hiring.git`  
**Execution Context:** Step 4 of 9-step Metavayn roadmap  
**Branch:** `step-4-jobs`

---

## 1. Executive Summary & Objective

Metavayn connects skilled Indian technical talent with US employers across HVAC & Thermal, Mechanical, Electrical, Data Center Infrastructure, and Engineering Analysis disciplines.

Step 4 establishes the **Jobs & Opportunities Experience**, delivering:
1. **Interactive Job Board (`/jobs`)**: A reactive engineering job catalog with multi-facet filtering (keyword search, location query, engineering discipline selector tabs, work type filter), live results counting, empty-state reset, illustrative listing badges, mandatory disclaimer banner, and dual conversion CTAs.
2. **Dynamic Job Detail View (`/jobs/:id`)**: A comprehensive role specification view featuring breadcrumb navigation, discipline badge, illustrative badge, compensation indicator, detailed responsibilities, technical qualifications & tooling requirements, US code compliance standards (ASHRAE, ASME, IEEE, NEC), direct resume submission pathway (isolated Amber CTA), related opportunities, and a graceful 404 fallback.
3. **Data Model Enrichment (`src/app/data/jobs.data.ts`)**: Extending `JobListing` with `responsibilities: string[]`, `qualifications: string[]`, `preferredTools: string[]`, and `relevantCodes: string[]` across all 5 representative opportunities.

---

## 2. Invariants & Brand Rules

1. **Strict Amber Isolation:**
   - The Amber color (`#F59E0B`, `variant="amber-cta"`, `.glow-amber`) is reserved **EXCLUSIVELY** for candidate resume conversion: **"Submit Your Resume"** (or role-specific variant "Submit Your Resume for this Role").
   - "Apply Now" buttons on job cards and detail pages must strictly use `variant="primary"` or route to `/candidates?role=[id]`.
   - Secondary buttons and employer actions use `variant="ghost"`, `variant="primary"`, or standard cyan/blue links.

2. **Mandatory Honest Disclosure & Illustrative Badges:**
   - Metavayn operates in India, providing recruitment services to US companies.
   - Zero misleading claims of physical US office locations, US visa sponsorship, or direct employer partnerships.
   - All job listings are illustrative representations of client requirements and must carry the badge `<span class="illustrative-badge">Illustrative listing</span>`.
   - The disclaimer banner must be displayed above the listings on `/jobs` and on `/jobs/:id`:
     *"Note: All listings shown below are illustrative representations of client requirements. Metavayn does not publish live vacancies without active mandate agreements."*

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
  path: 'jobs',
  loadComponent: () => import('./features/jobs/jobs.component').then(m => m.JobsComponent),
},
{
  path: 'jobs/:id',
  loadComponent: () => import('./features/jobs/job-detail/job-detail.component').then(m => m.JobDetailComponent),
}
```

### 3.2 Dynamic Route Parameter Binding
`JobDetailComponent` utilizes Angular 19's input route binding:
```typescript
readonly id = input.required<string>();
readonly job = computed(() => FEATURED_JOBS.find(j => j.id === this.id()));
readonly relatedJobs = computed(() => {
  const current = this.job();
  if (!current) return [];
  return FEATURED_JOBS.filter(j => j.disciplineSlug === current.disciplineSlug && j.id !== current.id);
});
```

---

## 4. Component Specifications

### 4.1 Jobs Board Page (`src/app/features/jobs/jobs.component.ts`)
- **Page Header**: Section title `"Representative Engineering Roles"`, subtitle explaining that listings reflect active US client mandate specifications.
- **Mandatory Disclaimer Notice**: Distinct pill banner displayed above the filter bar.
- **Multi-Filter Bar**:
  - Keyword search input (`q`): filters title, description, and tags.
  - Location search input (`location`): filters location string.
  - Discipline tabs: `All`, `HVAC & Thermal Systems`, `Mechanical Engineering`, `Electrical & Power Systems`, `Data Center Infrastructure`, `Engineering Analysis & Simulation`.
  - Work type select: `All Types`, `Remote`, `Hybrid`, `On-Site`.
  - Results count indicator (e.g. `"Showing 5 illustrative opportunities"`).
  - Empty state with reset filters button when zero results match.
- **Job Cards Grid**:
  - Discipline badge & `<span class="illustrative-badge">Illustrative listing</span>`.
  - Title, location, work type (`Remote`), compensation indicator (`$85k–$125k USD / Equiv.`).
  - Technical tag pills.
  - Actions: "View Details" link to `/jobs/:id` and "Apply Now" button (`variant="primary"`) routing to `/candidates?role=[id]`.
- **Dual Conversion CTA Section**:
  - Candidates panel with isolated Amber CTA (`variant="amber-cta"`, "Submit Your Resume").
  - Employers panel with primary CTA (`variant="primary"`, "Hire Engineering Talent").

### 4.2 Job Detail Page (`src/app/features/jobs/job-detail/job-detail.component.ts`)
- **Breadcrumbs**: `Home / Job Openings / [Job Title]`.
- **Role Hero**:
  - Illustrative badge `<span class="illustrative-badge">Illustrative listing</span>`.
  - Discipline badge.
  - Title, Location (`Remote (US Client)`), Work Type, Compensation (`$85k–$125k USD / Equiv.`).
  - Primary Application CTA: Isolated Amber button (`variant="amber-cta"`, "Submit Your Resume for this Role") routing to `/candidates?role=[id]`.
- **Disclaimer Banner**: Mandatory illustrative representation disclosure.
- **Role Scope & Responsibilities**: 4–5 detailed bullet points.
- **Technical Qualifications & Tooling**: Required CAD/FEA packages (Revit, SolidWorks, ANSYS, ETAP) and US engineering codes (ASHRAE 90.1, ASME Y14.5, NFPA 70/NEC).
- **Related Opportunities**: Similar sample roles in the same discipline.
- **404 Fallback**: Clean "Role Not Found" screen with a return link to `/jobs`.

---

## 5. Mock Data Architecture (`src/app/data/jobs.data.ts`)

```typescript
export interface JobListing {
  id: string;
  title: string;
  discipline: string;
  disciplineSlug: string;
  location: string;
  workType: 'Remote' | 'Hybrid' | 'On-Site';
  compensation: string;
  description: string;
  tags: string[];
  responsibilities: string[];
  qualifications: string[];
  preferredTools: string[];
  relevantCodes: string[];
  isIllustrative: boolean;
}
```

All 5 representative roles populated with complete technical engineering data.

---

## 6. Testing Strategy

1. **`data.spec.ts`**: Verify all 5 jobs have responsibilities, qualifications, preferredTools, relevantCodes, and `isIllustrative: true`.
2. **`jobs.component.spec.ts`**: Verify rendering of all 5 jobs, reactive search filtering, discipline tab switching, empty state reset, and strict Amber isolation.
3. **`job-detail.component.spec.ts`**: Verify breadcrumbs, role hero, technical qualifications, US codes, isolated Amber CTA button, related roles, and 404 fallback.
4. **`app.routes.spec.ts`**: Verify route resolution for `jobs` and `jobs/:id`.
5. **Full Suite**: `npm test -- --watch=false` (100% pass) and `npm run build` (0 errors).
