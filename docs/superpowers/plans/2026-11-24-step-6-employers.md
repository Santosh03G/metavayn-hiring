# Step 6: Employers / Hiring Partners Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete Employers Experience (`/employers`), featuring value propositions for US engineering leaders, interactive talent inquiry intake form with real-time validation and confirmation reference generation, engagement workflow roadmap, discipline capabilities, employer FAQs, and strict Amber CTA isolation.

**Architecture:** Reactive Angular 19+ standalone component using signals, reactive validation helper, shared UI primitives (`ButtonComponent`, `TiltCardDirective`, `RevealDirective`), and strict Amber Isolation (Amber is reserved exclusively for the candidate secondary CTA).

**Tech Stack:** Angular 19+ (Signals, Standalone Components), Tailwind CSS, Vitest / `@angular/build:unit-test`.

**Spec:** `docs/superpowers/specs/2026-11-24-step-6-employers-design.md`

## Global Constraints

- **Strict Amber Isolation:** `#F59E0B` (`variant="amber-cta"`, `.glow-amber`) is reserved **EXCLUSIVELY** for the candidate conversion "Submit Your Resume" button. All employer inquiry CTAs use `variant="primary"` (Royal/Electric Blue).
- **Mandatory Honest Disclosure:** Operations are India-based; Metavayn is an engineering recruitment firm connecting Indian talent with US clients. Zero claims of US physical offices or visa sponsorship.
- **US Terminology:** "Compensation", "Candidate", "Engineering Recruiting Firm", "Submit Your Resume" (when linking candidates).
- **TDD:** Write failing tests first, watch them fail for the right reasons, implement minimal code to pass, refactor.
- **Production Build:** `npm run build` must succeed with zero errors.

---

### Task 1: Employer Model & Validation Utilities

**Files:**
- Create: `src/app/data/employer.model.ts`
- Create: `src/app/data/employer.spec.ts`

**Interfaces:**
- Consumes: None (standalone model & constants)
- Produces: `EmployerInquiry` interface, `HEADCOUNT_OPTIONS`, `ENGAGEMENT_MODELS`, and `validateEmployerInquiry` helper.

- [ ] **Step 1: Write failing unit test for employer model & constants**

Create `src/app/data/employer.spec.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import {
  HEADCOUNT_OPTIONS,
  ENGAGEMENT_MODELS,
  validateEmployerInquiry,
  EmployerInquiry
} from './employer.model';

describe('Employer Model & Utilities', () => {
  it('should define headcount and engagement options', () => {
    expect(HEADCOUNT_OPTIONS.length).toBeGreaterThanOrEqual(3);
    expect(ENGAGEMENT_MODELS.length).toBeGreaterThanOrEqual(3);
  });

  it('should validate a complete employer inquiry', () => {
    const validInquiry: EmployerInquiry = {
      companyName: 'Apex Engineering Solutions LLC',
      contactName: 'David Miller',
      businessEmail: 'david.miller@apexeng.com',
      phone: '+1 555-234-5678',
      disciplines: ['hvac-thermal', 'mechanical'],
      headcount: '1-2 Engineers',
      engagementModel: 'Dedicated Full-Time Remote',
      projectOverview: 'Looking for 2 HVAC engineers proficient in Revit MEP and ASHRAE 90.1 calculations.'
    };

    const errors = validateEmployerInquiry(validInquiry);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when required fields are missing or invalid', () => {
    const invalidInquiry: Partial<EmployerInquiry> = {
      companyName: '',
      contactName: '',
      businessEmail: 'not-an-email',
      disciplines: []
    };

    const errors = validateEmployerInquiry(invalidInquiry as EmployerInquiry);
    expect(errors).toContain('Company name is required.');
    expect(errors).toContain('Contact person name is required.');
    expect(errors).toContain('Valid corporate email address is required.');
    expect(errors).toContain('At least one engineering discipline must be selected.');
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/data/employer.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/app/data/employer.model.ts`**

```typescript
export interface EmployerInquiry {
  companyName: string;
  contactName: string;
  businessEmail: string;
  phone: string;
  disciplines: string[];
  headcount: string;
  engagementModel: string;
  projectOverview: string;
}

export const HEADCOUNT_OPTIONS: string[] = [
  '1-2 Engineers',
  '3-5 Engineers',
  '5-10 Engineers',
  '10+ Engineers (Dedicated Pod)'
];

export const ENGAGEMENT_MODELS: string[] = [
  'Dedicated Full-Time Remote',
  'Contract / Project Surge Augmentation',
  'Contract-to-Hire Placement'
];

export function validateEmployerInquiry(inquiry: EmployerInquiry): string[] {
  const errors: string[] = [];

  if (!inquiry.companyName || inquiry.companyName.trim().length < 2) {
    errors.push('Company name is required.');
  }

  if (!inquiry.contactName || inquiry.contactName.trim().length < 2) {
    errors.push('Contact person name is required.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!inquiry.businessEmail || !emailRegex.test(inquiry.businessEmail)) {
    errors.push('Valid corporate email address is required.');
  }

  if (!inquiry.phone || inquiry.phone.trim().length < 7) {
    errors.push('Phone number is required.');
  }

  if (!inquiry.disciplines || inquiry.disciplines.length === 0) {
    errors.push('At least one engineering discipline must be selected.');
  }

  if (!inquiry.headcount) {
    errors.push('Target headcount is required.');
  }

  if (!inquiry.engagementModel) {
    errors.push('Engagement model is required.');
  }

  if (!inquiry.projectOverview || inquiry.projectOverview.trim().length < 15) {
    errors.push('Project / role overview (minimum 15 characters) is required.');
  }

  return errors;
}
```

- [ ] **Step 4: Run test to verify it passes**

```powershell
npm test -- src/app/data/employer.spec.ts --watch=false
```
Expected: PASS (3 tests passed).

- [ ] **Step 5: Git commit**

```powershell
git add src/app/data/
git commit -m "feat(data): add EmployerInquiry model, constants, and validation helper"
```

---

### Task 2: Interactive Employers Experience (`EmployersComponent`)

**Files:**
- Modify: `src/app/features/employers/employers.component.ts`
- Create: `src/app/features/employers/employers.component.spec.ts`

**Interfaces:**
- Consumes: `ButtonComponent`, `TiltCardDirective`, `RevealDirective`, `DISCIPLINES`, `HEADCOUNT_OPTIONS`, `ENGAGEMENT_MODELS`, `validateEmployerInquiry`, `EmployerInquiry`
- Produces: Production `<app-employers>` view with hero, value pillars, capabilities, 4-step workflow, talent inquiry form with validation, confirmation state, FAQs, and candidate secondary CTA with strict Amber isolation.

- [ ] **Step 1: Write failing unit test for `EmployersComponent`**

Create `src/app/features/employers/employers.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EmployersComponent } from './employers.component';
import { provideRouter } from '@angular/router';

describe('EmployersComponent', () => {
  let fixture: ComponentFixture<EmployersComponent>;
  let component: EmployersComponent;

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
      imports: [EmployersComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render hero with honest operations disclosure', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Scale US Engineering Capacity with Vetted Indian Talent');
    expect(text).toContain('Operations based in India');
  });

  it('should isolate amber CTA exclusively to the candidate secondary link and use primary for employer submit', () => {
    const employerSubmitBtn = fixture.nativeElement.querySelector('.inquiry-form app-button[variant="primary"]');
    expect(employerSubmitBtn).toBeTruthy();
    expect(employerSubmitBtn.textContent).toContain('Submit Talent Request');

    const amberBtns = fixture.nativeElement.querySelectorAll('app-button[variant="amber-cta"]');
    expect(amberBtns.length).toBe(1);
    expect(amberBtns[0].textContent).toContain('Submit Your Resume');
  });

  it('should toggle discipline selection in inquiry form', () => {
    expect(component.selectedDisciplines().length).toBe(0);
    component.toggleDiscipline('hvac-thermal');
    expect(component.selectedDisciplines()).toContain('hvac-thermal');
    component.toggleDiscipline('hvac-thermal');
    expect(component.selectedDisciplines().length).toBe(0);
  });

  it('should submit inquiry and display reference confirmation when form is valid', () => {
    component.companyName.set('Apex Engineering Solutions LLC');
    component.contactName.set('David Miller');
    component.businessEmail.set('david.miller@apexeng.com');
    component.phone.set('+1 555-234-5678');
    component.selectedDisciplines.set(['hvac-thermal']);
    component.headcount.set('1-2 Engineers');
    component.engagementModel.set('Dedicated Full-Time Remote');
    component.projectOverview.set('Need 2 skilled Revit MEP design engineers for commercial HVAC projects.');

    component.submitInquiry();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(true);
    expect(component.submissionReference()).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Inquiry Received');
  });

  it('should show validation errors when submitting an incomplete form', () => {
    component.companyName.set('');
    component.submitInquiry();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(false);
    expect(component.formErrors().length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/features/employers/employers.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/app/features/employers/employers.component.ts`**

Implement complete standalone `EmployersComponent`:
- Hero with headline, subtitle, honest operations notice, and anchor button to inquiry form (`variant="primary"`).
- 4 Key Value Pillars (US Code Rigor, Turnkey Tool Readiness, 40-60% Cost Efficiency, Timezone Collaboration).
- 5 Discipline Capability Showcase cards with sample engineering deliverables.
- 4-step Engagement Process (Discovery -> Technical Evaluation -> Client Interviews -> Remote Deployment).
- Interactive Talent Inquiry Form:
  - Company, Contact, Email, Phone.
  - Discipline multi-select chips.
  - Headcount dropdown / pills.
  - Engagement model dropdown / pills.
  - Project requirements textarea.
  - Submit button: `<app-button variant="primary" (click)="submitInquiry()">Submit Talent Request</app-button>` (Strictly `variant="primary"`!).
  - Post-submission confirmation panel with reference ID (`MV-EMP-XXXXXX`) and 24h consultation promise.
- Employer FAQs accordion.
- Candidate Secondary Card with strict Amber button: `<app-button variant="amber-cta" href="/candidates">Submit Your Resume</app-button>`.

- [ ] **Step 4: Run test to verify it passes**

```powershell
npm test -- src/app/features/employers/employers.component.spec.ts --watch=false
```
Expected: PASS (5 tests passed).

- [ ] **Step 5: Git commit**

```powershell
git add src/app/features/employers/
git commit -m "feat(employers): implement interactive EmployersComponent with talent inquiry form and strict Amber isolation"
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
git merge --ff-only step-6-employers
git push origin main step-6-employers
```
