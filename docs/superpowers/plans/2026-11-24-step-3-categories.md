# Step 3: Categories / Practice Areas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete Categories / Practice Areas subsystem, including the Categories Hub Page (`/categories`), dynamic Discipline Detail Page (`/categories/:slug`), enriched domain data models, and illustrative job matching.

**Architecture:** Data-driven Angular 19+ architecture using standalone components, signal route input binding (`slug = input.required<string>()`), shared animation directives (`appTilt`, `appReveal`), and strict Amber Isolation for candidate conversion.

**Tech Stack:** Angular 19+ (Signals, Standalone), Tailwind CSS, GSAP ScrollTrigger, Vitest / `@angular/build:unit-test`.

**Spec:** `docs/superpowers/specs/2026-11-24-step-3-categories-design.md`

## Global Constraints

- **Strict Amber Isolation:** `#F59E0B` (`variant="amber-cta"`, `.glow-amber`) is reserved **EXCLUSIVELY** for the candidate conversion "Submit Your Resume" button.
- **Mandatory Honest Disclosure:** All job listings on detail pages are illustrative representations of client requirements and must carry `<span class="illustrative-badge">Illustrative listing</span>` and the disclaimer banner.
- **US Terminology:** "Submit Your Resume" (never "CV"), "Candidate", "Engineering Recruiting Firm", "Apply Now", "Compensation".
- **Zero Misleading Claims:** No claims of US physical offices, visa sponsorship, or direct client partnerships.
- **TDD:** Write failing tests first, watch them fail, implement minimal code to pass, refactor.
- **Production Build:** `npm run build` must succeed with zero errors.

---

### Task 1: Mock Data Models & Data Sets Expansion

**Files:**
- Modify: `src/app/data/disciplines.data.ts`
- Modify: `src/app/data/jobs.data.ts`
- Modify: `src/app/data/data.spec.ts`

**Interfaces:**
- Consumes: Existing `Discipline` and `JobListing` interfaces
- Produces: Enriched `Discipline` model with `heroSubtitle`, `fullOverview`, and `coreFocusAreas`, plus 5 illustrative job entries in `FEATURED_JOBS` covering all 5 disciplines.

- [ ] **Step 1: Write failing unit tests for data models**

Update `src/app/data/data.spec.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { TRUST_METRICS } from './trust-metrics.data';
import { DISCIPLINES } from './disciplines.data';
import { FEATURED_JOBS } from './jobs.data';

describe('Data Sets', () => {
  it('should have 4 trust metrics with required fields', () => {
    expect(TRUST_METRICS.length).toBe(4);
    TRUST_METRICS.forEach(metric => {
      expect(metric.label).toBeTruthy();
      expect(metric.value).toBeGreaterThan(0);
      expect(metric.description).toBeTruthy();
    });
  });

  it('should have 5 engineering disciplines with detail metadata', () => {
    expect(DISCIPLINES.length).toBe(5);
    DISCIPLINES.forEach(discipline => {
      expect(discipline.id).toBeTruthy();
      expect(discipline.slug).toBeTruthy();
      expect(discipline.name).toBeTruthy();
      expect(discipline.shortDescription).toBeTruthy();
      expect(discipline.heroSubtitle).toBeTruthy();
      expect(discipline.fullOverview).toBeTruthy();
      expect(discipline.iconName).toBeTruthy();
      expect(discipline.roles.length).toBeGreaterThan(0);
      expect(discipline.coreFocusAreas.length).toBeGreaterThanOrEqual(4);
    });
  });

  it('should have illustrative job listings covering all 5 disciplines', () => {
    expect(FEATURED_JOBS.length).toBeGreaterThanOrEqual(5);
    const disciplineSlugs = new Set(FEATURED_JOBS.map(j => j.disciplineSlug));
    expect(disciplineSlugs.size).toBe(5);

    FEATURED_JOBS.forEach(job => {
      expect(job.id).toBeTruthy();
      expect(job.title).toBeTruthy();
      expect(job.discipline).toBeTruthy();
      expect(job.disciplineSlug).toBeTruthy();
      expect(job.location).toBeTruthy();
      expect(job.workType).toBeTruthy();
      expect(job.compensation).toBeTruthy();
      expect(job.isIllustrative).toBe(true);
      expect(job.tags.length).toBeGreaterThan(0);
    });
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/data/data.spec.ts --watch=false
```
Expected: FAIL (missing fields on disciplines and missing jobs for mechanical and electrical).

- [ ] **Step 3: Update `src/app/data/disciplines.data.ts`**

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

export const DISCIPLINES: Discipline[] = [
  {
    id: 'hvac-thermal',
    slug: 'hvac-thermal',
    name: 'HVAC & Thermal Systems',
    shortDescription: 'Heating, ventilation, air conditioning, and thermal distribution design for industrial and commercial facilities.',
    heroSubtitle: 'Specialized thermal load calculations, central plant architectures, and building ventilation engineering.',
    fullOverview: 'We recruit Indian mechanical and thermal engineering talent skilled in central chilled-water systems, variable refrigerant flow (VRF), industrial boiler plants, and air-side distribution. Our candidates have deep familiarity with ASHRAE 90.1, 62.1, and 55 standards, advanced energy modeling software, and commercial HVAC mechanical packages.',
    iconName: 'wind',
    roles: ['Mechanical Systems Design', 'Thermal Analysis', 'Central Plant Engineering', 'CFD Simulation', 'Building Automation (BAS)'],
    coreFocusAreas: [
      'Central Chilled Water & Boiler Plant Sizing',
      'Hydronic & Air-Side Distribution Modeling',
      'Building Energy Simulation (EnergyPlus, Trace 700/3D)',
      'Cleanroom & Laboratory Pressurization Design',
      'ASHRAE & LEED Baseline Compliance'
    ]
  },
  {
    id: 'mechanical',
    slug: 'mechanical',
    name: 'Mechanical Engineering',
    shortDescription: 'Machinery design, 3D parametric CAD modeling, structural FEA, and precision electro-mechanical packaging.',
    heroSubtitle: 'Robust machinery engineering, complex kinematic assemblies, and manufacturing-ready documentation.',
    fullOverview: 'Our mechanical talent pool encompasses engineers specialized in industrial machinery, heavy equipment, electro-mechanical mechanisms, and robotic packaging. With expertise in SolidWorks, PTC Creo, and Siemens NX, our placed professionals integrate GD&T (ASME Y14.5), structural stress calculations, and design for manufacturing/assembly (DFMA).',
    iconName: 'cog',
    roles: ['Machine Design', 'SolidWorks / Creo Modeling', 'GD&T & Tolerance Stackup', 'Structural FEA', 'Tooling & Fixtures'],
    coreFocusAreas: [
      'Complex 3D Parametric CAD Assembly Modeling',
      'GD&T Application & Tolerance Stackup Analysis (ASME Y14.5)',
      'Weldment, Sheet Metal & Casting Design',
      'Design for Manufacturability & Assembly (DFMA)',
      'Structural FEA & Component Fatigue Optimization'
    ]
  },
  {
    id: 'electrical',
    slug: 'electrical',
    name: 'Electrical & Power Systems',
    shortDescription: 'Medium and low-voltage power distribution, substations, single-line schematics, and protective coordination.',
    heroSubtitle: 'Mission-critical electrical distribution, protection studies, and industrial automation control.',
    fullOverview: 'Metavayn connects US utilities, industrial EPCs, and mission-critical developers with Indian electrical power engineers. Candidates possess specialized experience in medium and low-voltage switchgear, single-line diagrams, substation physical layouts, protective relay coordination (ETAP/SKM), and NFPA 70 / National Electrical Code (NEC) compliance.',
    iconName: 'zap',
    roles: ['Power Distribution (MV/LV)', 'Single-Line Diagrams', 'Substation Design', 'PLC & SCADA Integration', 'Arc Flash Studies'],
    coreFocusAreas: [
      'Medium & Low Voltage Power Distribution (Up to 34.5kV)',
      'Single-Line, Three-Line & Control Schematics',
      'Short Circuit, Protective Device Coordination & Arc Flash (ETAP/SKM)',
      'Substation Physical Layouts & Grounding Grid Design',
      'PLC, SCADA & Industrial Control System Architecture'
    ]
  },
  {
    id: 'data-center',
    slug: 'data-center',
    name: 'Data Center Infrastructure',
    shortDescription: 'Mission-critical electrical distribution, high-density cooling architectures, and resilient backup systems.',
    heroSubtitle: 'High-density computational cooling, 2N redundant power paths, and continuous availability engineering.',
    fullOverview: 'With hyper-scaler demand surging, Metavayn specializes in sourcing high-caliber mission-critical facilities engineers. Our candidates engineer Tier III and Tier IV data center facilities, liquid cooling loops, hot/cold aisle containment, rotary and static UPS configurations, and emergency standby generation systems.',
    iconName: 'server',
    roles: ['Mission Critical Facilities', 'Redundant Cooling Architecture', 'UPS & Backup Generators', 'Power Density Modeling', 'Commissioning (Cx)'],
    coreFocusAreas: [
      'High-Density Liquid & Air Cooling Topology (Direct-to-Chip, CDU)',
      '2N & N+1 Redundant Electrical Power Train Architecture',
      'Emergency Standby Diesel Generation & Fuel System Sizing',
      'Computational Fluid Dynamics for Server Room Airflow',
      'Data Center Commissioning (Level 1-5 Cx Protocol)'
    ]
  },
  {
    id: 'engineering-analysis',
    slug: 'engineering-analysis',
    name: 'Engineering Analysis & Simulation',
    shortDescription: 'Advanced computational fluid dynamics, finite element analysis, and multi-physics verification.',
    heroSubtitle: 'High-fidelity numerical simulation, structural non-linear FEA, and fluid-thermal multi-physics.',
    fullOverview: 'We curate top Indian simulation specialists who perform advanced virtual validation before physical prototyping. Candidates utilize ANSYS, Abaqus, and COMSOL to execute non-linear structural mechanics, dynamic shock/vibration, conjugate heat transfer (CHT), and multi-phase fluid simulations.',
    iconName: 'activity',
    roles: ['Finite Element Analysis (FEA)', 'Computational Fluid Dynamics (CFD)', 'Thermal & Stress Verification', 'Modal & Vibration Dynamics', 'ANSYS / Abaqus Modeling'],
    coreFocusAreas: [
      'Non-Linear Structural & Plasticity Finite Element Analysis',
      'Conjugate Heat Transfer (CHT) & Thermal Transient Modeling',
      'Modal, Harmonic & Random Vibration Dynamic Simulation',
      'Turbulence & Multi-Phase Fluid Dynamics (ANSYS Fluent/CFX)',
      'Fatigue Life Estimation & Failure Mode Simulation'
    ]
  }
];
```

- [ ] **Step 4: Update `src/app/data/jobs.data.ts`**

Add representative illustrative jobs for Mechanical Engineering and Electrical & Power Systems:
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
  isIllustrative: boolean;
}

export const FEATURED_JOBS: JobListing[] = [
  {
    id: 'hvac-lead-design',
    title: 'HVAC Systems Design Engineer',
    discipline: 'HVAC & Thermal Systems',
    disciplineSlug: 'hvac-thermal',
    location: 'Remote (US East Coast Client)',
    workType: 'Remote',
    compensation: '$85,000 - $110,000 USD / Equiv.',
    description: 'Design and sizing of commercial hydronic piping, air distribution, and chilled water central plant systems adhering to ASHRAE 90.1 standards.',
    tags: ['Revit MEP', 'AutoCAD', 'ASHRAE 90.1', 'Central Plant Design', 'Cooling Towers'],
    isIllustrative: true
  },
  {
    id: 'mechanical-machine-design',
    title: 'Senior Mechanical Design Engineer',
    discipline: 'Mechanical Engineering',
    disciplineSlug: 'mechanical',
    location: 'Remote (US Midwest Client)',
    workType: 'Remote',
    compensation: '$88,000 - $115,000 USD / Equiv.',
    description: 'Parametric CAD machine design, precision kinematics, and GD&T tolerance stackups for industrial automated assembly equipment.',
    tags: ['SolidWorks', 'PTC Creo', 'GD&T (ASME Y14.5)', 'DFMA', 'Machine Design'],
    isIllustrative: true
  },
  {
    id: 'electrical-power-distribution',
    title: 'Power Systems Distribution Engineer',
    discipline: 'Electrical & Power Systems',
    disciplineSlug: 'electrical',
    location: 'Remote (US South Client)',
    workType: 'Remote',
    compensation: '$90,000 - $120,000 USD / Equiv.',
    description: 'Execute medium-voltage single-line diagrams, substation layouts, and protective relay coordination studies using ETAP.',
    tags: ['ETAP', 'Single-Line Diagrams', 'Medium Voltage', 'Substation Design', 'NFPA 70/NEC'],
    isIllustrative: true
  },
  {
    id: 'datacenter-electrical-lead',
    title: 'Data Center Electrical Infrastructure Engineer',
    discipline: 'Data Center Infrastructure',
    disciplineSlug: 'data-center',
    location: 'Remote (US West Coast Client)',
    workType: 'Remote',
    compensation: '$95,000 - $125,000 USD / Equiv.',
    description: 'Lead single-line schematic architecture, emergency standby generation, and redundant N+1 UPS power path calculations for hyperscale data centers.',
    tags: ['Single-Line Diagrams', 'Medium Voltage (13.8kV)', 'Rotary UPS', 'SKM PowerTools', 'Coordination Studies'],
    isIllustrative: true
  },
  {
    id: 'mechanical-fea-cfd',
    title: 'Mechanical Analysis Engineer (FEA/CFD)',
    discipline: 'Engineering Analysis & Simulation',
    disciplineSlug: 'engineering-analysis',
    location: 'Remote (US Northeast Client)',
    workType: 'Remote',
    compensation: '$92,000 - $118,000 USD / Equiv.',
    description: 'Execute static structural, transient thermal, and hydrodynamic CFD simulations for heavy equipment enclosures and heat transfer assemblies.',
    tags: ['ANSYS Mechanical', 'Abaqus', 'SolidWorks Simulation', 'Nonlinear FEA', 'Thermal Analysis'],
    isIllustrative: true
  }
];
```

- [ ] **Step 5: Run tests to verify they pass**

```powershell
npm test -- src/app/data/data.spec.ts --watch=false
```
Expected: PASS (3 tests passed).

- [ ] **Step 6: Commit Task 1 changes**

```powershell
git add src/app/data/
git commit -m "feat(data): expand discipline metadata and illustrative jobs for all 5 sectors"
```

---

### Task 2: Categories Hub Page (`CategoriesComponent`)

**Files:**
- Modify: `src/app/features/categories/categories.component.ts`
- Create: `src/app/features/categories/categories.component.spec.ts`

**Interfaces:**
- Consumes: `PageIntroComponent`, `ButtonComponent`, `TiltCardDirective`, `RevealDirective`, `DISCIPLINES`
- Produces: Production `<app-categories>` hub page with 5 tilt cards, sector overview, and dual CTA.

- [ ] **Step 1: Write failing unit test for `CategoriesComponent`**

Create `src/app/features/categories/categories.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { provideRouter } from '@angular/router';

describe('CategoriesComponent', () => {
  let fixture: ComponentFixture<CategoriesComponent>;
  let component: CategoriesComponent;

  beforeAll(() => {
    if (typeof window !== 'undefined' && !window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }),
      });
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render 5 discipline practice area cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.discipline-card');
    expect(cards.length).toBe(5);
  });

  it('should render links to all 5 practice area detail pages', () => {
    const links = fixture.nativeElement.querySelectorAll('a[href^="/categories/"]');
    expect(links.length).toBe(5);
  });

  it('should isolate amber CTA exclusively to candidate resume submission', () => {
    const amberBtn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    expect(amberBtn).toBeTruthy();
    expect(amberBtn.textContent).toContain('Submit Your Resume');

    const primaryBtn = fixture.nativeElement.querySelector('app-button[variant="primary"]');
    expect(primaryBtn).toBeTruthy();
    expect(primaryBtn.textContent).toContain('Hire Engineering Talent');
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/features/categories/categories.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement `CategoriesComponent`**

Update `src/app/features/categories/categories.component.ts`:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageIntroComponent } from '../../core/layout/page-intro/page-intro.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { DISCIPLINES } from '../../data/disciplines.data';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PageIntroComponent,
    ButtonComponent,
    TiltCardDirective,
    RevealDirective
  ],
  template: `
    <div class="min-h-screen bg-midnight text-white selection:bg-cyan selection:text-midnight">
      <!-- Page Hero Header -->
      <app-page-intro
        badge="Specialized Practice Areas"
        title="Engineering Disciplines We Staff"
        subtitle="Deep technical recruitment connecting India's top engineering specialists with American infrastructure, manufacturing, and mission-critical programs."
      ></app-page-intro>

      <!-- Practice Areas Grid -->
      <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (discipline of disciplines; track discipline.id; let i = $index) {
              <div
                appReveal
                [appRevealDelay]="i * 0.1"
                appTilt
                [maxTilt]="7"
                class="discipline-card glass rounded-2xl p-8 border border-white/10 hover:border-cyan/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              >
                <div>
                  <!-- Icon Header -->
                  <div class="w-14 h-14 rounded-xl bg-navy/80 border border-white/10 flex items-center justify-center text-cyan mb-6 group-hover:scale-110 group-hover:border-cyan/40 transition-all duration-300">
                    <svg class="w-7 h-7 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                      @switch (discipline.iconName) {
                        @case ('wind') {
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
                        }
                        @case ('cog') {
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                          <circle cx="12" cy="12" r="3"/>
                        }
                        @case ('zap') {
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        }
                        @case ('server') {
                          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                          <line x1="6" y1="6" x2="6.01" y2="6"/>
                          <line x1="6" y1="18" x2="6.01" y2="18"/>
                        }
                        @case ('activity') {
                          <path stroke-linecap="round" stroke-linejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        }
                        @default {
                          <path stroke-linecap="round" stroke-linejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        }
                      }
                    </svg>
                  </div>

                  <h3 class="font-heading font-bold text-2xl text-white mb-3 group-hover:text-cyan transition-colors">
                    {{ discipline.name }}
                  </h3>
                  <p class="text-sm text-ice/80 leading-relaxed mb-6 font-normal">
                    {{ discipline.shortDescription }}
                  </p>

                  <!-- Technical Roles Pills -->
                  <div class="flex flex-wrap gap-1.5 mb-8">
                    @for (role of discipline.roles; track role) {
                      <span class="text-xs bg-navy/80 text-ice/85 border border-white/5 px-2.5 py-1 rounded-md">
                        {{ role }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Footer Explore Link -->
                <a
                  [routerLink]="['/categories', discipline.slug]"
                  class="inline-flex items-center gap-2 text-sm text-cyan font-semibold hover:text-white transition-colors pt-4 border-t border-white/10 group-hover:border-cyan/30"
                >
                  <span>Explore Practice Area</span>
                  <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            }
          </div>

          <!-- Value Callout Banner -->
          <div
            appReveal
            class="mt-20 glass rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden text-center max-w-4xl mx-auto"
          >
            <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan/10 blur-[80px] rounded-full pointer-events-none"></div>
            <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-3">
              Precision Talent Pipeline
            </span>
            <h3 class="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
              Vetted for American Engineering Standards
            </h3>
            <p class="text-sm sm:text-base text-ice/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Every technical candidate in our practice areas undergoes rigorous evaluation across engineering fundamentals, US code compliance, and advanced simulation and CAD toolsets.
            </p>
          </div>

          <!-- Dual Conversion CTA -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <!-- Candidates Panel (Amber Isolated) -->
            <div class="glass rounded-2xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-2">For Engineers</span>
                <h4 class="font-heading font-bold text-xl text-white mb-3">Advance Your Technical Career</h4>
                <p class="text-sm text-ice/80 mb-6">Explore aligned roles with US companies shaping high-growth engineering initiatives.</p>
              </div>
              <div>
                <app-button variant="amber-cta" href="/candidates">Submit Your Resume</app-button>
              </div>
            </div>

            <!-- Employers Panel -->
            <div class="glass rounded-2xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono uppercase tracking-widest text-electric font-bold block mb-2">For Employers</span>
                <h4 class="font-heading font-bold text-xl text-white mb-3">Hire Specialized Talent</h4>
                <p class="text-sm text-ice/80 mb-6">Overcome domestic talent shortages with pre-screened Indian engineering specialists.</p>
              </div>
              <div>
                <app-button variant="primary" href="/employers">Hire Engineering Talent</app-button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class CategoriesComponent {
  readonly disciplines = DISCIPLINES;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```powershell
npm test -- src/app/features/categories/categories.component.spec.ts --watch=false
```
Expected: PASS (3 tests passed).

- [ ] **Step 5: Commit Task 2 changes**

```powershell
git add src/app/features/categories/
git commit -m "feat(categories): implement production CategoriesComponent hub with tilt cards and dual CTA"
```

---

### Task 3: Dynamic Category Detail Page (`CategoryDetailComponent`)

**Files:**
- Create: `src/app/features/categories/category-detail/category-detail.component.ts`
- Create: `src/app/features/categories/category-detail/category-detail.component.spec.ts`

**Interfaces:**
- Consumes: `input.required<string>()` (route input binding), `ButtonComponent`, `RevealDirective`, `TiltCardDirective`, `DISCIPLINES`, `FEATURED_JOBS`
- Produces: Standalone `CategoryDetailComponent` for `/categories/:slug`

- [ ] **Step 1: Write failing unit test for `CategoryDetailComponent`**

Create `src/app/features/categories/category-detail/category-detail.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CategoryDetailComponent } from './category-detail.component';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';

describe('CategoryDetailComponent', () => {
  let fixture: ComponentFixture<CategoryDetailComponent>;
  let component: CategoryDetailComponent;
  let componentRef: ComponentRef<CategoryDetailComponent>;

  beforeAll(() => {
    if (typeof window !== 'undefined' && !window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }),
      });
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDetailComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render discipline hero and core focus areas for valid slug', () => {
    componentRef.setInput('slug', 'hvac-thermal');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('HVAC & Thermal Systems');
    expect(text).toContain('Core Technical Focus');

    const focusPills = fixture.nativeElement.querySelectorAll('.focus-pill');
    expect(focusPills.length).toBeGreaterThanOrEqual(4);
  });

  it('should render illustrative sample roles with mandatory badge and disclaimer', () => {
    componentRef.setInput('slug', 'hvac-thermal');
    fixture.detectChanges();

    const badges = fixture.nativeElement.querySelectorAll('.illustrative-badge');
    expect(badges.length).toBeGreaterThan(0);
    badges.forEach((badge: HTMLElement) => {
      expect(badge.textContent).toContain('Illustrative listing');
    });

    const disclaimer = fixture.nativeElement.querySelector('.illustrative-disclaimer');
    expect(disclaimer).toBeTruthy();
    expect(disclaimer.textContent).toContain('illustrative representations of client requirements');
  });

  it('should isolate amber CTA exclusively for candidate resume submission', () => {
    componentRef.setInput('slug', 'hvac-thermal');
    fixture.detectChanges();

    const amberBtn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    expect(amberBtn).toBeTruthy();
    expect(amberBtn.textContent).toContain('Submit Your Resume');

    const applyNowBtn = fixture.nativeElement.querySelector('.role-card app-button[variant="primary"]');
    expect(applyNowBtn).toBeTruthy();
    expect(applyNowBtn.textContent).toContain('Apply Now');
  });

  it('should display clean 404 state when invalid slug is provided', () => {
    componentRef.setInput('slug', 'non-existent-discipline');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Practice Area Not Found');
    const backBtn = fixture.nativeElement.querySelector('a[href="/categories"]');
    expect(backBtn).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/features/categories/category-detail/category-detail.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement `CategoryDetailComponent`**

Create `src/app/features/categories/category-detail/category-detail.component.ts`:
```typescript
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { DISCIPLINES } from '../../../data/disciplines.data';
import { FEATURED_JOBS } from '../../../data/jobs.data';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, RevealDirective],
  template: `
    <div class="min-h-screen bg-midnight text-white selection:bg-cyan selection:text-midnight">
      @if (discipline(); as d) {
        <!-- Breadcrumbs -->
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4" aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-xs font-mono text-slate">
            <li>
              <a routerLink="/" class="hover:text-cyan transition-colors">Home</a>
            </li>
            <li class="text-white/30">/</li>
            <li>
              <a routerLink="/categories" class="hover:text-cyan transition-colors">Practice Areas</a>
            </li>
            <li class="text-white/30">/</li>
            <li class="text-cyan font-semibold truncate">{{ d.name }}</li>
          </ol>
        </nav>

        <!-- Hero Section -->
        <section class="py-12 md:py-20 border-b border-white/10 relative overflow-hidden">
          <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="max-w-4xl">
              <!-- Sector Badge -->
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-widest mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
                Engineering Practice Area
              </span>

              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
                {{ d.name }}
              </h1>
              <p class="text-lg sm:text-xl text-cyan font-medium mb-6 font-sans">
                {{ d.heroSubtitle }}
              </p>
              <p class="text-base sm:text-lg text-ice/80 leading-relaxed font-normal mb-8">
                {{ d.fullOverview }}
              </p>

              <!-- Quick CTAs -->
              <div class="flex flex-wrap items-center gap-4">
                <app-button variant="amber-cta" href="/candidates">
                  Submit Your Resume
                </app-button>
                <app-button variant="ghost" href="/contact">
                  Hire {{ d.name }} Engineers
                </app-button>
              </div>
            </div>
          </div>
        </section>

        <!-- Core Technical Focus -->
        <section class="py-16 md:py-20 bg-navy/30 border-b border-white/10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-12">
              <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-2">Technical Capabilities</span>
              <h2 class="text-2xl sm:text-3xl font-heading font-bold text-white">Core Technical Focus</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (focus of d.coreFocusAreas; track focus) {
                <div class="focus-pill glass rounded-xl p-6 border border-white/10 flex items-start gap-4 hover:border-cyan/30 transition-all duration-300">
                  <div class="w-8 h-8 rounded-lg bg-navy/80 border border-white/10 flex items-center justify-center text-cyan shrink-0 mt-0.5">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-white mb-1">{{ focus }}</h3>
                    <p class="text-xs text-slate">Vetted for commercial and industrial US program specifications.</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Representative Opportunities -->
        <section class="py-16 md:py-24">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-2">Sample Roles</span>
                <h2 class="text-2xl sm:text-3xl font-heading font-bold text-white">Representative Opportunities</h2>
              </div>
              <a routerLink="/jobs" class="text-xs font-mono text-cyan hover:underline inline-flex items-center gap-1">
                <span>View all illustrative vacancies</span>
                <span>→</span>
              </a>
            </div>

            <!-- Mandatory Disclaimer Notice -->
            <div class="mb-10 illustrative-disclaimer">
              <p class="text-xs text-slate font-mono bg-navy/60 border border-white/10 rounded-full px-4 py-1.5 inline-block">
                Note: All listings shown below are illustrative representations of client requirements. Metavayn does not publish live vacancies without active mandate agreements.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              @for (job of jobs(); track job.id) {
                <div class="role-card glass rounded-2xl p-7 border border-white/10 hover:border-cyan/40 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-4">
                      <span class="text-xs font-semibold text-cyan uppercase tracking-wider font-sans">{{ job.discipline }}</span>
                      <span class="illustrative-badge text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-electric/20 text-cyan border border-cyan/30">
                        Illustrative listing
                      </span>
                    </div>

                    <h3 class="font-heading font-bold text-xl text-white mb-3 group-hover:text-cyan transition-colors">
                      {{ job.title }}
                    </h3>

                    <div class="space-y-1.5 mb-4 text-xs text-slate">
                      <div>{{ job.location }} ({{ job.workType }})</div>
                      <div class="text-cyan font-medium">{{ job.compensation }}</div>
                    </div>

                    <p class="text-sm text-ice/75 leading-relaxed mb-6 font-normal">
                      {{ job.description }}
                    </p>

                    <div class="flex flex-wrap gap-1.5 mb-6">
                      @for (tag of job.tags; track tag) {
                        <span class="text-xs bg-navy/80 text-ice/85 border border-white/5 px-2.5 py-1 rounded-md">
                          {{ tag }}
                        </span>
                      }
                    </div>
                  </div>

                  <div class="pt-4 border-t border-white/10 flex items-center justify-between">
                    <a [routerLink]="['/jobs', job.id]" class="text-xs text-ice/70 hover:text-cyan transition-colors">View Details</a>
                    <app-button variant="primary" href="/candidates" class="text-xs">Apply Now</app-button>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Discipline Conversion Banner -->
        <section class="py-16 bg-navy/40 border-t border-white/10">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-3">Take The Next Step</span>
            <h2 class="text-3xl font-heading font-bold text-white mb-4">Advance in {{ d.name }}</h2>
            <p class="text-sm sm:text-base text-ice/80 mb-8 max-w-2xl mx-auto">
              Submit your engineering credentials to be considered for active and upcoming US client mandates in this discipline.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <app-button variant="amber-cta" href="/candidates">
                Submit Your Resume
              </app-button>
              <a routerLink="/categories" class="text-xs text-slate hover:text-white transition-colors">
                ← Browse all practice areas
              </a>
            </div>
          </div>
        </section>
      } @else {
        <!-- 404 Fallback State -->
        <section class="py-32 text-center">
          <div class="max-w-xl mx-auto px-4">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-3">Notice</span>
            <h1 class="text-3xl font-heading font-bold text-white mb-4">Practice Area Not Found</h1>
            <p class="text-sm text-slate mb-8">
              The requested engineering discipline does not exist or may have been renamed.
            </p>
            <a routerLink="/categories" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-electric text-white text-sm font-semibold hover:bg-royal transition-colors">
              <span>View All Practice Areas</span>
              <span>→</span>
            </a>
          </div>
        </section>
      }
    </div>
  `
})
export class CategoryDetailComponent {
  readonly slug = input.required<string>();

  readonly discipline = computed(() => DISCIPLINES.find(d => d.slug === this.slug()));
  readonly jobs = computed(() => FEATURED_JOBS.filter(j => j.disciplineSlug === this.slug()));
}
```

- [ ] **Step 4: Run tests to verify they pass**

```powershell
npm test -- src/app/features/categories/category-detail/category-detail.component.spec.ts --watch=false
```
Expected: PASS (4 tests passed).

- [ ] **Step 5: Commit Task 3 changes**

```powershell
git add src/app/features/categories/category-detail/
git commit -m "feat(categories): add CategoryDetailComponent with route param resolution, focus areas, and filtered illustrative roles"
```

---

### Task 4: Route Wiring, End-to-End Verification & Whole-Branch Review

**Files:**
- Modify: `src/app/app.routes.ts`
- Modify: `src/app/app.routes.spec.ts`

**Interfaces:**
- Consumes: `CategoryDetailComponent`
- Produces: Complete, verified practice areas routing hierarchy.

- [ ] **Step 1: Write failing unit test in `app.routes.spec.ts`**

Update `src/app/app.routes.spec.ts`:
```typescript
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('AppRoutes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
  });

  it('should define routes for all key pages including category detail', () => {
    const router = TestBed.inject(Router);
    const routeConfig = router.config;

    const paths = routeConfig.map(r => r.path);
    expect(paths).toContain('');
    expect(paths).toContain('jobs');
    expect(paths).toContain('jobs/:id');
    expect(paths).toContain('categories');
    expect(paths).toContain('categories/:slug');
    expect(paths).toContain('candidates');
    expect(paths).toContain('employers');
    expect(paths).toContain('resources');
    expect(paths).toContain('about');
    expect(paths).toContain('contact');
    expect(paths).toContain('**');
  });

  it('should resolve lazy loaded components for all routes', async () => {
    const router = TestBed.inject(Router);
    const routeConfig = router.config;

    for (const route of routeConfig) {
      if (route.loadComponent) {
        const component = await (route.loadComponent as () => Promise<unknown>)();
        expect(component).toBeTruthy();
      }
    }
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/app.routes.spec.ts --watch=false
```
Expected: FAIL (missing `categories/:slug`).

- [ ] **Step 3: Update `src/app/app.routes.ts`**

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'jobs',
    loadComponent: () => import('./features/jobs/jobs.component').then(m => m.JobsComponent),
  },
  {
    path: 'jobs/:id',
    loadComponent: () => import('./features/jobs/job-detail/job-detail.component').then(m => m.JobDetailComponent),
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent),
  },
  {
    path: 'categories/:slug',
    loadComponent: () => import('./features/categories/category-detail/category-detail.component').then(m => m.CategoryDetailComponent),
  },
  {
    path: 'candidates',
    loadComponent: () => import('./features/candidates/candidates.component').then(m => m.CandidatesComponent),
  },
  {
    path: 'employers',
    loadComponent: () => import('./features/employers/employers.component').then(m => m.EmployersComponent),
  },
  {
    path: 'resources',
    loadComponent: () => import('./features/resources/resources.component').then(m => m.ResourcesComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
  }
];
```

- [ ] **Step 4: Enable `withComponentInputBinding` in `app.config.ts` if not already enabled**

Check `src/app/app.config.ts` to ensure `withComponentInputBinding()` is passed to `provideRouter`.

- [ ] **Step 5: Run full test suite and production build**

```powershell
npm test -- --watch=false
npm run build
```
Expected: 100% test pass rate, 0 build errors.

- [ ] **Step 6: Commit and merge**

```powershell
git add src/app/app.routes.ts src/app/app.routes.spec.ts src/app/app.config.ts
git commit -m "feat(routes): register categories/:slug with component input binding"
```
