# Step 5: Candidates Experience & Application Funnel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete Candidate Experience (`/candidates`), featuring a multi-stage interactive intake funnel, pre-population via query parameters (`?role=[id]`, `?discipline=[slug]`), technical skill & US code profiling, mandatory honest disclosure acknowledgments, candidate journey timeline, FAQ section, and strict Amber CTA isolation.

**Architecture:** Reactive Angular 19+ standalone component with reactive form controls, signal-based stage navigation, query parameter synchronization via `ActivatedRoute`, shared UI primitives (`ButtonComponent`, `TiltCardDirective`, `RevealDirective`), and strict Amber Isolation for the final submission action.

**Tech Stack:** Angular 19+ (Signals, Reactive Forms, Standalone Components), Tailwind CSS, Vitest / `@angular/build:unit-test`.

**Spec:** `docs/superpowers/specs/2026-11-24-step-5-candidates-design.md`

## Global Constraints

- **Strict Amber Isolation:** `#F59E0B` (`variant="amber-cta"`, `.glow-amber`) is reserved **EXCLUSIVELY** for the candidate conversion "Submit Your Resume" button.
- **Mandatory Honest Disclosure:** Operations are India-based; Metavayn is an engineering recruitment firm connecting Indian talent with US clients. No claims of US physical branch offices or US visa sponsorship.
- **US Terminology:** "Submit Your Resume" (never "CV"), "Candidate", "Engineering Recruiting Firm", "Compensation".
- **TDD:** Write failing tests first, watch them fail for the right reasons, implement minimal code to pass, refactor.
- **Production Build:** `npm run build` must succeed with zero errors.

---

### Task 1: Candidate Model & Validation Utilities

**Files:**
- Create: `src/app/data/candidate.model.ts`
- Create: `src/app/data/candidate.spec.ts`

**Interfaces:**
- Consumes: `DISCIPLINES`, `FEATURED_JOBS`
- Produces: `CandidateApplication` interface, `EXPERIENCE_LEVELS`, `COMMON_US_CODES`, `COMMON_TOOLS`, and validation helper.

- [ ] **Step 1: Write failing unit test for candidate model & constants**

Create `src/app/data/candidate.spec.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import {
  EXPERIENCE_LEVELS,
  COMMON_US_CODES,
  COMMON_TOOLS,
  validateCandidateApplication,
  CandidateApplication
} from './candidate.model';

describe('Candidate Model & Utilities', () => {
  it('should define experience levels and technical options', () => {
    expect(EXPERIENCE_LEVELS.length).toBeGreaterThanOrEqual(4);
    expect(COMMON_US_CODES.length).toBeGreaterThanOrEqual(5);
    expect(COMMON_TOOLS.length).toBeGreaterThanOrEqual(8);
  });

  it('should validate a complete candidate application', () => {
    const validApp: CandidateApplication = {
      fullName: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      location: 'Bengaluru, India',
      discipline: 'hvac-thermal',
      roleInterest: 'hvac-lead-design',
      experienceLevel: '5-8 years',
      softwareTools: ['Revit MEP', 'AutoCAD'],
      usCodes: ['ASHRAE 90.1 (Energy Standard)'],
      linkedinUrl: 'https://linkedin.com/in/rahulsharma',
      resumeText: 'Experienced HVAC design engineer with 6 years designing central plants...',
      agreedToTerms: true
    };

    const errors = validateCandidateApplication(validApp);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when required fields or mandatory disclosures are missing', () => {
    const invalidApp: Partial<CandidateApplication> = {
      fullName: '',
      email: 'invalid-email',
      agreedToTerms: false
    };

    const errors = validateCandidateApplication(invalidApp as CandidateApplication);
    expect(errors).toContain('Full name is required.');
    expect(errors).toContain('Valid email is required.');
    expect(errors).toContain('You must acknowledge the recruitment operations disclosure.');
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/data/candidate.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/app/data/candidate.model.ts`**

```typescript
export interface CandidateApplication {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  discipline: string;
  roleInterest?: string;
  experienceLevel: string;
  softwareTools: string[];
  usCodes: string[];
  linkedinUrl: string;
  resumeText: string;
  agreedToTerms: boolean;
}

export const EXPERIENCE_LEVELS: string[] = [
  '1-3 years (Junior / Associate)',
  '3-5 years (Mid-Level Engineer)',
  '5-8 years (Senior Engineer)',
  '8+ years (Lead / Principal / Architect)'
];

export const COMMON_US_CODES: string[] = [
  'ASHRAE 90.1 (Energy Efficiency)',
  'ASHRAE 62.1 (Ventilation)',
  'ASME Y14.5 (GD&T)',
  'ASME BPVC (Pressure Vessels)',
  'NFPA 70 / NEC (Electrical)',
  'IEEE 1584 (Arc Flash Hazard)',
  'Uptime Institute Tier Standards'
];

export const COMMON_TOOLS: string[] = [
  'Revit MEP',
  'AutoCAD',
  'SolidWorks',
  'PTC Creo',
  'Siemens NX',
  'ANSYS Mechanical',
  'ANSYS Fluent / CFX',
  'ETAP',
  'SKM PowerTools',
  'Trane Trace 700 / EnergyPlus'
];

export function validateCandidateApplication(app: CandidateApplication): string[] {
  const errors: string[] = [];

  if (!app.fullName || app.fullName.trim().length < 2) {
    errors.push('Full name is required.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!app.email || !emailRegex.test(app.email)) {
    errors.push('Valid email is required.');
  }

  if (!app.phone || app.phone.trim().length < 8) {
    errors.push('Phone number is required.');
  }

  if (!app.location || app.location.trim().length < 2) {
    errors.push('Current location in India is required.');
  }

  if (!app.discipline) {
    errors.push('Primary engineering discipline is required.');
  }

  if (!app.experienceLevel) {
    errors.push('Experience level is required.');
  }

  if (!app.resumeText || app.resumeText.trim().length < 20) {
    errors.push('Resume summary or profile details (min 20 characters) required.');
  }

  if (!app.agreedToTerms) {
    errors.push('You must acknowledge the recruitment operations disclosure.');
  }

  return errors;
}
```

- [ ] **Step 4: Run test to verify it passes**

```powershell
npm test -- src/app/data/candidate.spec.ts --watch=false
```
Expected: PASS (3 tests passed).

- [ ] **Step 5: Git commit**

```powershell
git add src/app/data/
git commit -m "feat(data): add CandidateApplication model, constants, and validation helper"
```

---

### Task 2: Interactive Candidates Experience (`CandidatesComponent`)

**Files:**
- Modify: `src/app/features/candidates/candidates.component.ts`
- Create: `src/app/features/candidates/candidates.component.spec.ts`

**Interfaces:**
- Consumes: `ActivatedRoute`, `Router`, `ButtonComponent`, `TiltCardDirective`, `RevealDirective`, `DISCIPLINES`, `FEATURED_JOBS`, `CandidateApplication`
- Produces: Production `<app-candidates>` page with multi-stage intake funnel, pre-population via `ActivatedRoute.queryParams`, candidate vetting timeline, honest disclosure checkpoints, FAQ accordion, and strict Amber CTA isolation.

- [ ] **Step 1: Write failing unit test for `CandidatesComponent`**

Create `src/app/features/candidates/candidates.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CandidatesComponent } from './candidates.component';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CandidatesComponent', () => {
  let fixture: ComponentFixture<CandidatesComponent>;
  let component: CandidatesComponent;

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
      imports: [CandidatesComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ role: 'hvac-lead-design', discipline: 'hvac-thermal' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should initialize and pre-populate target role and discipline from query parameters', () => {
    expect(component.selectedDiscipline()).toBe('hvac-thermal');
    expect(component.selectedRoleInterest()).toBe('hvac-lead-design');
  });

  it('should strictly isolate amber CTA to the final resume submission action', () => {
    // Navigate to stage 3
    component.currentStage.set(3);
    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    expect(submitBtn).toBeTruthy();
    expect(submitBtn.textContent).toContain('Submit Your Resume');
  });

  it('should display mandatory honest disclosure banner and consent checkbox', () => {
    component.currentStage.set(3);
    fixture.detectChanges();

    const disclosureText = fixture.nativeElement.textContent;
    expect(disclosureText).toContain('India-based engineering recruitment firm');
    expect(disclosureText).toContain('visa sponsorship');
  });

  it('should validate form and show confirmation reference on successful submission', () => {
    component.fullName.set('Arun Kumar');
    component.email.set('arun.kumar@example.com');
    component.phone.set('+91 99887 76655');
    component.location.set('Bengaluru, India');
    component.selectedDiscipline.set('hvac-thermal');
    component.experienceLevel.set('5-8 years');
    component.resumeText.set('6 years senior HVAC design engineering in Revit MEP and central chiller plants.');
    component.agreedToTerms.set(true);

    component.submitApplication();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(true);
    expect(component.submissionReference()).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Application Received');
  });

  it('should prevent submission when required terms agreement is not checked', () => {
    component.fullName.set('Arun Kumar');
    component.email.set('arun.kumar@example.com');
    component.phone.set('+91 99887 76655');
    component.location.set('Bengaluru, India');
    component.selectedDiscipline.set('hvac-thermal');
    component.experienceLevel.set('5-8 years');
    component.resumeText.set('6 years senior HVAC design engineering in Revit MEP and central chiller plants.');
    component.agreedToTerms.set(false);

    component.submitApplication();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(false);
    expect(component.formErrors().length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/features/candidates/candidates.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/app/features/candidates/candidates.component.ts`**

Implement complete standalone `CandidatesComponent` with:
- Signals for multi-stage funnel (`currentStage = signal<1 | 2 | 3>(1)`), inputs, tools toggle, codes toggle, submission state.
- Query params subscription from `ActivatedRoute`.
- Stage navigation with validation.
- Stage 1: Personal profile & discipline selection.
- Stage 2: Technical experience tier, tool chips, US code checkboxes.
- Stage 3: LinkedIn URL, resume text summary, honest recruitment disclosure acknowledgment.
- Amber CTA button (`variant="amber-cta"`) for final submission.
- Confirmation screen with generated reference code and next-steps timeline.
- 4-step Candidate Vetting Journey section.
- Candidate FAQ section with clear honest statements regarding remote placement, compensation, and visa status.

- [ ] **Step 4: Run test to verify it passes**

```powershell
npm test -- src/app/features/candidates/candidates.component.spec.ts --watch=false
```
Expected: PASS (5 tests passed).

- [ ] **Step 5: Git commit**

```powershell
git add src/app/features/candidates/
git commit -m "feat(candidates): implement interactive CandidatesComponent intake funnel, query sync, and isolated Amber CTA"
```

---

### Task 3: End-to-End Verification, Whole-Branch Review & Remote Push

**Files:**
- Verification only

- [ ] **Step 1: Run full unit test suite**

```powershell
npm test -- --watch=false
```
Expected: 100% pass across all test suites.

- [ ] **Step 2: Run production build**

```powershell
npm run build
```
Expected: Production build succeeds with 0 errors.

- [ ] **Step 3: Whole-branch review and merge**

```powershell
git checkout main
git merge --ff-only step-5-candidates
git push origin main step-5-candidates
```
