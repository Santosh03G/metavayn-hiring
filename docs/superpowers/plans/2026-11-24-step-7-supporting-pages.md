# Step 7: Supporting Pages Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete Supporting Pages subsystem (`/about`, `/resources`, `/contact`), delivering corporate narrative, technical guides and whitepapers, direct communication channels, general inquiry form, and strict Amber CTA isolation.

**Architecture:** Reactive Angular 19+ standalone components using signals, shared UI primitives (`ButtonComponent`, `TiltCardDirective`, `RevealDirective`), and strict Amber Isolation (Amber is reserved exclusively for the candidate conversion "Submit Your Resume" button).

**Tech Stack:** Angular 19+ (Signals, Standalone Components), Tailwind CSS, Vitest / `@angular/build:unit-test`.

**Spec:** `docs/superpowers/specs/2026-11-24-step-7-supporting-pages-design.md`

## Global Constraints

- **Strict Amber Isolation:** `#F59E0B` (`variant="amber-cta"`, `.glow-amber`) is reserved **EXCLUSIVELY** for the candidate conversion "Submit Your Resume" button. All other actions use `variant="primary"` or `variant="ghost"`.
- **Mandatory Honest Disclosure:** Operations are India-based; Metavayn is an engineering recruitment firm. Zero claims of US physical offices or visa sponsorship.
- **US Terminology:** "Compensation", "Candidate", "Engineering Recruiting Firm", "Submit Your Resume".
- **TDD:** Write failing tests first, watch them fail for the right reasons, implement minimal code to pass, refactor.
- **Production Build:** `npm run build` must succeed with zero errors.

---

### Task 1: About Component (`AboutComponent`)

**Files:**
- Modify: `src/app/features/about/about.component.ts`
- Create: `src/app/features/about/about.component.spec.ts`

**Interfaces:**
- Consumes: `ButtonComponent`, `TiltCardDirective`, `RevealDirective`
- Produces: Production `<app-about>` page with mission, honest operations disclosure, 4 core principles, delivery presence, and dual conversion CTA with isolated Amber button.

- [ ] **Step 1: Write failing unit test for `AboutComponent`**

Create `src/app/features/about/about.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { provideRouter } from '@angular/router';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let component: AboutComponent;

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
      imports: [AboutComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render mission and honest operations disclosure', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Bridging Indian Engineering Excellence with US Infrastructure');
    expect(text).toContain('Operations based in India');
    expect(text).toContain('recruitment firm');
  });

  it('should render all 4 core operational principles', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Genuine Technical Depth');
    expect(text).toContain('Cross-Border Transparency');
    expect(text).toContain('Authentic US Code Rigor');
    expect(text).toContain('Mutual Value Creation');
  });

  it('should strictly isolate amber CTA to candidate resume submission', () => {
    const amberBtns = fixture.nativeElement.querySelectorAll('app-button[variant="amber-cta"]');
    expect(amberBtns.length).toBe(1);
    expect(amberBtns[0].textContent).toContain('Submit Your Resume');

    const primaryBtns = fixture.nativeElement.querySelectorAll('app-button[variant="primary"]');
    expect(primaryBtns.length).toBeGreaterThanOrEqual(1);
    expect(primaryBtns[0].textContent).toContain('Hire Engineering Talent');
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/features/about/about.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/app/features/about/about.component.ts`**

Implement complete standalone `AboutComponent`:
- Standalone imports: `CommonModule, RouterLink, ButtonComponent, TiltCardDirective, RevealDirective`
- Sections:
  1. Hero section with eyebrow "Our Mission & Roots", title "Bridging Indian Engineering Excellence with US Infrastructure", subtitle, and honest disclosure banner.
  2. 4 Core Principles cards (Technical Depth, Cross-Border Transparency, US Code Rigor, Mutual Value Creation).
  3. Operations & Delivery Network details (India hubs: Bengaluru, Pune, Hyderabad, Chennai, Delhi NCR; US collaboration hours).
  4. Dual Conversion CTA (Candidate panel with isolated Amber button `variant="amber-cta"`, Employer panel with `variant="primary"`).

- [ ] **Step 4: Run test to verify it passes**

```powershell
npm test -- src/app/features/about/about.component.spec.ts --watch=false
```
Expected: PASS (3 tests passed).

- [ ] **Step 5: Git commit**

```powershell
git add src/app/features/about/
git commit -m "feat(about): implement production AboutComponent with mission, honest disclosure, and dual CTA"
```

---

### Task 2: Resources Component & Data (`ResourcesComponent`)

**Files:**
- Create: `src/app/data/resources.data.ts`
- Create: `src/app/data/resources.spec.ts`
- Modify: `src/app/features/resources/resources.component.ts`
- Create: `src/app/features/resources/resources.component.spec.ts`

**Interfaces:**
- Consumes: `RESOURCES`, `ResourceArticle`, `ButtonComponent`, `TiltCardDirective`, `RevealDirective`
- Produces: Production `<app-resources>` page with technical whitepapers, category tabs, search/filter, and dual conversion CTA.

- [ ] **Step 1: Write failing unit test for resources data & component**

Create `src/app/data/resources.spec.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { RESOURCES, RESOURCE_CATEGORIES } from './resources.data';

describe('Resources Data', () => {
  it('should define resource categories and articles', () => {
    expect(RESOURCE_CATEGORIES.length).toBeGreaterThanOrEqual(4);
    expect(RESOURCES.length).toBeGreaterThanOrEqual(6);
  });

  it('should have required fields on all resource items', () => {
    RESOURCES.forEach(r => {
      expect(r.id).toBeTruthy();
      expect(r.title).toBeTruthy();
      expect(r.category).toBeTruthy();
      expect(r.categoryName).toBeTruthy();
      expect(r.readTime).toBeTruthy();
      expect(r.summary).toBeTruthy();
      expect(r.tags.length).toBeGreaterThan(0);
    });
  });
});
```

Create `src/app/features/resources/resources.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ResourcesComponent } from './resources.component';
import { provideRouter } from '@angular/router';

describe('ResourcesComponent', () => {
  let fixture: ComponentFixture<ResourcesComponent>;
  let component: ResourcesComponent;

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
      imports: [ResourcesComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render all resource articles by default', () => {
    const cards = fixture.nativeElement.querySelectorAll('.resource-card');
    expect(cards.length).toBeGreaterThanOrEqual(6);
  });

  it('should filter resources when category tab is selected', () => {
    component.setCategory('us-codes');
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.resource-card');
    expect(cards.length).toBeGreaterThanOrEqual(2);
    cards.forEach((card: HTMLElement) => {
      expect(card.textContent).toContain('US Code');
    });
  });

  it('should isolate amber CTA to candidate resume submission', () => {
    const amberBtns = fixture.nativeElement.querySelectorAll('app-button[variant="amber-cta"]');
    expect(amberBtns.length).toBe(1);
    expect(amberBtns[0].textContent).toContain('Submit Your Resume');
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/data/resources.spec.ts src/app/features/resources/resources.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/app/data/resources.data.ts` and `src/app/features/resources/resources.component.ts`**

Implement resources dataset with technical guides covering:
1. "ASHRAE 90.1 vs IS Codes: Bridging Indian HVAC Design for US Commercial Facilities" (`us-codes`)
2. "ASME Y14.5 GD&T Playbook: Precision Machining Conventions for American OEMs" (`us-codes`)
3. "Hyperscale Data Center Electrical Architectures: NFPA 70 Article 645 & Uptime Tier Standards" (`us-codes`)
4. "Setting Up Low-Latency Remote CAD/BIM Infrastructure Across US-India Timezones" (`remote-work`)
5. "Effective Overlap Protocols for US-India Engineering Sprint Collaboration" (`remote-work`)
6. "2026 US-India Engineering Compensation & Hourly Rate Benchmark Report" (`compensation`)

Implement `ResourcesComponent` with category tabs, search input, responsive cards grid with tags and read times, and dual conversion CTA at bottom with strict Amber button.

- [ ] **Step 4: Run test to verify it passes**

```powershell
npm test -- src/app/data/resources.spec.ts src/app/features/resources/resources.component.spec.ts --watch=false
```
Expected: PASS.

- [ ] **Step 5: Git commit**

```powershell
git add src/app/data/resources.data.ts src/app/data/resources.spec.ts src/app/features/resources/
git commit -m "feat(resources): implement production ResourcesComponent and engineering technical guides dataset"
```

---

### Task 3: Contact Component (`ContactComponent`)

**Files:**
- Modify: `src/app/features/contact/contact.component.ts`
- Create: `src/app/features/contact/contact.component.spec.ts`

**Interfaces:**
- Consumes: `ButtonComponent`, `TiltCardDirective`, `RevealDirective`
- Produces: Production `<app-contact>` page with direct channels, honest operating hours and India locations, interactive general inquiry form with validation and confirmation, and fast-track dual CTAs.

- [ ] **Step 1: Write failing unit test for `ContactComponent`**

Create `src/app/features/contact/contact.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { provideRouter } from '@angular/router';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;

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
      imports: [ContactComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render contact channels and India operational hub details', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Connect with the Metavayn Recruitment Team');
    expect(text).toContain('hiring@metavayn.com');
    expect(text).toContain('partners@metavayn.com');
    expect(text).toContain('Operations based in India');
  });

  it('should isolate amber CTA exclusively to candidate resume submission and use primary for general inquiry', () => {
    const submitBtn = fixture.nativeElement.querySelector('.contact-form app-button[variant="primary"]');
    expect(submitBtn).toBeTruthy();
    expect(submitBtn.textContent).toContain('Send Message');

    const amberBtns = fixture.nativeElement.querySelectorAll('app-button[variant="amber-cta"]');
    expect(amberBtns.length).toBe(1);
    expect(amberBtns[0].textContent).toContain('Submit Your Resume');
  });

  it('should submit inquiry and show confirmation reference on valid form submission', () => {
    component.name.set('Marcus Vance');
    component.email.set('marcus@vanceengineering.com');
    component.inquiryType.set('Hiring US Engineering Talent');
    component.message.set('Interested in exploring mechanical simulation capacity for Q3 projects.');

    component.sendMessage();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(true);
    expect(component.submissionReference()).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Message Received');
  });

  it('should show validation errors when submitting incomplete message', () => {
    component.name.set('');
    component.sendMessage();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(false);
    expect(component.formErrors().length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/features/contact/contact.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/app/features/contact/contact.component.ts`**

Implement complete standalone `ContactComponent`:
- Standalone imports: `CommonModule, RouterLink, ButtonComponent, TiltCardDirective, RevealDirective`
- Sections:
  1. Hero with headline, subtitle, and honest operations note ("Operations based in India. Direct recruiting coordination across IST and US EST/PST business hours").
  2. 3 Direct Communication Channels:
     - Candidate Inquiries (`hiring@metavayn.com`)
     - Employer & Partner Inquiries (`partners@metavayn.com`)
     - Operations Hubs (Bengaluru, Pune, Hyderabad; Mon-Fri 9 AM - 8 PM IST)
  3. Interactive General Message Form (`.contact-form`):
     - Name, Email, Inquiry Type dropdown, Message (textarea).
     - Validation helper checking name, email, inquiry type, message length (min 15 chars).
     - Submit button: `<app-button variant="primary" (click)="sendMessage()">Send Message</app-button>` (Strictly `variant="primary"`, NEVER amber!).
     - Confirmation state: Reference ID (`MV-MSG-XXXXXX`), follow-up assurance (within 1 business day), and reset button.
  4. Fast-Track Direct Cards:
     - Candidate card with `<app-button variant="amber-cta" href="/candidates">Submit Your Resume</app-button>` (Strict Amber isolation!).
     - Employer card with `<app-button variant="primary" href="/employers">Hire Engineering Talent</app-button>`.

- [ ] **Step 4: Run test to verify it passes**

```powershell
npm test -- src/app/features/contact/contact.component.spec.ts --watch=false
```
Expected: PASS (4 tests passed).

- [ ] **Step 5: Git commit**

```powershell
git add src/app/features/contact/
git commit -m "feat(contact): implement interactive ContactComponent with inquiry form, channel routing, and strict Amber isolation"
```

---

### Task 4: End-to-End Verification, Whole-Branch Review & Remote Push

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
git merge --ff-only step-7-supporting-pages
git push origin main step-7-supporting-pages
```
