# Step 2: Home Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete interactive Home Page for Metavayn consisting of 8 sections: Hero with 2D Canvas "Talent Network" and search bar, Trust Strip with configurable counters, 5 Engineering Discipline tilt cards, Light Ice "Why Choose Us" section, GSAP Pinned Dual-Track "How It Works" timeline, Featured Illustrative Roles, Dual Candidate/Employer CTA split panel, and Final Glow CTA Banner.

**Architecture:** Decompose the home page into standalone sub-components inside `src/app/features/home/components/`. Extract shared mock data models into `src/app/data/`. Coordinate animations via GSAP and `SmoothScrollService` running outside Angular's zone with strict reduced-motion fallbacks and lifecycle teardowns.

**Tech Stack:** Angular 21 (standalone components, signals), Tailwind CSS v3, GSAP 3 + ScrollTrigger, Lenis, Lucide Angular, Vitest.

**Spec:** [`docs/superpowers/specs/2026-11-24-step-2-home-page-design.md`](file:///d:/Santosh/Development/metavaynhiring/docs/superpowers/specs/2026-11-24-step-2-home-page-design.md)

## Global Constraints

- **Strict Amber Isolation:** Amber (`#F59E0B`, `variant="amber-cta"`, `.glow-amber`) is reserved **EXCLUSIVELY** for the primary "Submit Your Resume" action button. No other button, card, badge, or text may use amber.
- **Mandatory Honest Disclosure:** Metavayn is an India-based engineering recruitment company serving employers and engineering professionals in the United States. Every sample job role must be labelled with the badge `"Illustrative listing"`. Zero fabricated client logos.
- **US Terminology:** "Submit Your Resume", "Candidate", "Engineering Recruiting Firm", "Apply Now", "Compensation".
- **Lifecycle & Memory Hygiene:** Clean up all GSAP timelines, ScrollTrigger instances, `requestAnimationFrame` loops, and DOM event listeners in `ngOnDestroy()`.
- **Accessibility & Motion:** `prefers-reduced-motion` must bypass animations across canvas and ScrollTrigger pinning; keyboard focus rings and ARIA attributes must be present on interactive elements.

---

### Task 1: Mock Data Models & Data Sets

**Files:**
- Create: `src/app/data/trust-metrics.data.ts`
- Create: `src/app/data/disciplines.data.ts`
- Create: `src/app/data/jobs.data.ts`
- Create: `src/app/data/data.spec.ts`

**Interfaces:**
- Consumes: TypeScript interfaces
- Produces: `TRUST_METRICS`, `DISCIPLINES`, `FEATURED_JOBS`, and data types `TrustMetric`, `Discipline`, `JobListing`

- [ ] **Step 1: Write the unit test verifying mock data integrity**

Create `src/app/data/data.spec.ts`:
```typescript
import { TRUST_METRICS } from './trust-metrics.data';
import { DISCIPLINES } from './disciplines.data';
import { FEATURED_JOBS } from './jobs.data';

describe('Home Page Mock Data', () => {
  it('should have 4 trust metrics defined with positive target numbers', () => {
    expect(TRUST_METRICS.length).toBe(4);
    TRUST_METRICS.forEach(metric => {
      expect(metric.value).toBeGreaterThan(0);
      expect(metric.label).toBeTruthy();
    });
  });

  it('should have 5 core engineering disciplines defined', () => {
    expect(DISCIPLINES.length).toBe(5);
    const slugs = DISCIPLINES.map(d => d.slug);
    expect(slugs).toContain('hvac-thermal');
    expect(slugs).toContain('mechanical');
    expect(slugs).toContain('electrical');
    expect(slugs).toContain('data-center');
    expect(slugs).toContain('engineering-analysis');
  });

  it('should have 3 featured illustrative jobs all flagged with isIllustrative=true', () => {
    expect(FEATURED_JOBS.length).toBe(3);
    FEATURED_JOBS.forEach(job => {
      expect(job.isIllustrative).toBe(true);
      expect(job.title).toBeTruthy();
      expect(job.compensation).toBeTruthy();
      expect(job.tags.length).toBeGreaterThan(0);
    });
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/data/data.spec.ts --watch=false
```
Expected: FAIL (Cannot find module `./trust-metrics.data`).

- [ ] **Step 3: Implement data files**

Create `src/app/data/trust-metrics.data.ts`:
```typescript
export interface TrustMetric {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
}

// TODO: Replace illustrative launch metrics with certified operational metrics once available
export const TRUST_METRICS: TrustMetric[] = [
  {
    value: 5,
    label: 'Engineering Disciplines',
    description: 'HVAC, Mechanical, Electrical, Data Center & Analysis'
  },
  {
    value: 100,
    suffix: '%',
    label: 'Domain-First Screening',
    description: 'Technical evaluation led by engineering specialists'
  },
  {
    value: 48,
    suffix: 'h',
    label: 'Average Shortlist Time',
    description: 'Vetted candidate dossier turnaround'
  },
  {
    value: 15,
    suffix: '+',
    label: 'US Project Sectors',
    description: 'Infrastructure, energy, mission critical & manufacturing'
  }
];
```

Create `src/app/data/disciplines.data.ts`:
```typescript
export interface Discipline {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  iconName: string;
  roles: string[];
}

export const DISCIPLINES: Discipline[] = [
  {
    id: 'hvac-thermal',
    slug: 'hvac-thermal',
    name: 'HVAC & Thermal Systems',
    shortDescription: 'Heating, ventilation, air conditioning, and thermal distribution design for industrial and commercial facilities.',
    iconName: 'wind',
    roles: ['Mechanical Systems Design', 'Thermal Analysis', 'Central Plant Engineering', 'CFD Simulation', 'Building Automation (BAS)']
  },
  {
    id: 'mechanical',
    slug: 'mechanical',
    name: 'Mechanical Engineering',
    shortDescription: 'Machinery design, 3D parametric CAD modeling, structural FEA, and precision electro-mechanical packaging.',
    iconName: 'cog',
    roles: ['Machine Design', 'SolidWorks / Creo Modeling', 'GD&T & Tolerance Stackup', 'Structural FEA', 'Tooling & Fixtures']
  },
  {
    id: 'electrical',
    slug: 'electrical',
    name: 'Electrical & Power Systems',
    shortDescription: 'Medium and low-voltage power distribution, substations, single-line schematics, and protective coordination.',
    iconName: 'zap',
    roles: ['Power Distribution (MV/LV)', 'Single-Line Diagrams', 'Substation Design', 'PLC & SCADA Integration', 'Arc Flash Studies']
  },
  {
    id: 'data-center',
    slug: 'data-center',
    name: 'Data Center Infrastructure',
    shortDescription: 'Mission-critical electrical distribution, high-density cooling architectures, and resilient backup systems.',
    iconName: 'server',
    roles: ['Mission Critical Facilities', 'Redundant Cooling Architecture', 'UPS & Backup Generators', 'Power Density Modeling', 'Commissioning (Cx)']
  },
  {
    id: 'engineering-analysis',
    slug: 'engineering-analysis',
    name: 'Engineering Analysis & Simulation',
    shortDescription: 'Advanced computational fluid dynamics, finite element analysis, and multi-physics verification.',
    iconName: 'activity',
    roles: ['Finite Element Analysis (FEA)', 'Computational Fluid Dynamics (CFD)', 'Thermal & Stress Verification', 'Modal & Vibration Dynamics', 'ANSYS / Abaqus Modeling']
  }
];
```

Create `src/app/data/jobs.data.ts`:
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
    id: 'mechanical-fea-cfd',
    title: 'Mechanical Analysis Engineer (FEA/CFD)',
    discipline: 'Engineering Analysis & Simulation',
    disciplineSlug: 'engineering-analysis',
    location: 'Remote (US Midwest Client)',
    workType: 'Remote',
    compensation: '$90,000 - $115,000 USD / Equiv.',
    description: 'Execute static structural, transient thermal, and hydrodynamic CFD simulations for heavy equipment enclosures and heat transfer assemblies.',
    tags: ['ANSYS Mechanical', 'Abaqus', 'SolidWorks Simulation', 'Nonlinear FEA', 'Thermal Analysis'],
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
  }
];
```

- [ ] **Step 4: Run test to watch it pass**

```powershell
npm test -- src/app/data/data.spec.ts --watch=false
```
Expected: PASS (3 tests passed).

- [ ] **Step 5: Commit mock data files**

```powershell
git add src/app/data/
git commit -m "feat(data): add mock data models for trust metrics, disciplines, and illustrative jobs"
```

---

### Task 2: HeroComponent (Interactive Canvas Talent Network & Search)

**Files:**
- Create: `src/app/features/home/components/hero/hero.component.ts`
- Create: `src/app/features/home/components/hero/hero.component.spec.ts`

**Interfaces:**
- Consumes: `ButtonComponent`, `SmoothScrollService`, `Router`, `PLATFORM_ID`, `NgZone`, `gsap`
- Produces: `<app-home-hero />` standalone component

- [ ] **Step 1: Write the failing unit tests for HeroComponent**

Create `src/app/features/home/components/hero/hero.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { provideRouter, Router } from '@angular/router';
import { SmoothScrollService } from '../../../../core/services/smooth-scroll.service';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let component: HeroComponent;
  let router: Router;
  let mockScrollService: { scrollTo: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockScrollService = { scrollTo: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [
        provideRouter([]),
        { provide: SmoothScrollService, useValue: mockScrollService }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render the headline and subtext', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain("Build What's Next");
    expect(text).toContain('Connecting Engineering Talent with America');
  });

  it('should render primary CTA and strictly isolated amber CTA', () => {
    const buttons = fixture.nativeElement.querySelectorAll('app-button');
    expect(buttons.length).toBe(2);

    const amberBtn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    expect(amberBtn).toBeTruthy();
    expect(amberBtn.textContent).toContain('Submit Your Resume');
  });

  it('should navigate to /jobs with query parameters on search submit', () => {
    component.searchQuery.set('HVAC');
    component.locationQuery.set('Remote');
    component.onSearch();

    expect(router.navigate).toHaveBeenCalledWith(['/jobs'], {
      queryParams: { q: 'HVAC', location: 'Remote' }
    });
  });

  it('should trigger scroll to trust-strip on scroll indicator click', () => {
    const indicator = fixture.nativeElement.querySelector('.scroll-indicator');
    expect(indicator).toBeTruthy();
    indicator.click();

    expect(mockScrollService.scrollTo).toHaveBeenCalledWith('#trust-strip');
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/features/home/components/hero/hero.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement HeroComponent with Canvas Talent Network**

Create `src/app/features/home/components/hero/hero.component.ts`:
```typescript
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  inject,
  signal,
  ElementRef,
  PLATFORM_ID,
  NgZone,
  viewChild
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SmoothScrollService } from '../../../../core/services/smooth-scroll.service';
import { gsap } from 'gsap';

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  template: `
    <section class="min-h-screen relative flex items-center justify-center overflow-hidden pt-24 pb-16 bg-midnight text-white">
      <!-- 2D Canvas Interactive Talent Network -->
      <canvas #networkCanvas class="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true"></canvas>

      <!-- Ambient Glow Orbs -->
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-royal/20 blur-[130px] rounded-full pointer-events-none"></div>
      <div class="absolute top-1/2 -right-32 w-96 h-96 bg-cyan/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <!-- Eyebrow Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/80 border border-cyan/30 text-xs sm:text-sm text-cyan font-medium mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <span class="w-2 h-2 rounded-full bg-cyan animate-pulse"></span>
          <span>Specialized Engineering Recruitment for US Industries</span>
        </div>

        <!-- Headline with Word-by-Word Reveal -->
        <h1 class="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
          <span class="word inline-block mr-2 text-white">Build</span>
          <span class="word inline-block mr-2 text-white">What's</span>
          <span class="word inline-block mr-3 text-gradient">Next.</span>
          <span class="word inline-block mr-2 text-white">Advance</span>
          <span class="word inline-block mr-2 text-white">Your</span>
          <span class="word inline-block mr-2 text-white">Engineering</span>
          <span class="word inline-block text-cyan">Career.</span>
        </h1>

        <!-- Subtext -->
        <p class="text-base sm:text-lg md:text-xl text-ice/85 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Connecting Engineering Talent with America's Leading Industries.
        </p>

        <!-- Hero Dual Action CTAs (Strict Amber Isolation) -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          <app-button variant="primary" href="/jobs" class="w-full sm:w-auto">
            Search Jobs
          </app-button>
          <app-button variant="amber-cta" href="/candidates" class="w-full sm:w-auto">
            Submit Your Resume
          </app-button>
        </div>

        <!-- Compact Job Search Bar -->
        <form (ngSubmit)="onSearch()" class="glass w-full max-w-3xl p-3 sm:p-3.5 rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-3">
          <div class="relative w-full flex-1">
            <span class="absolute inset-y-0 left-3 flex items-center text-slate pointer-events-none">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </span>
            <input
              type="text"
              name="searchQuery"
              [ngModel]="searchQuery()"
              (ngModelChange)="searchQuery.set($event)"
              placeholder="Job title, skill, or discipline (e.g. HVAC)..."
              class="w-full pl-10 pr-4 py-2.5 bg-navy/60 rounded-xl text-sm text-white placeholder-slate focus:outline-none focus:ring-2 focus:ring-cyan border border-white/5"
            />
          </div>

          <div class="relative w-full md:w-56">
            <span class="absolute inset-y-0 left-3 flex items-center text-slate pointer-events-none">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </span>
            <input
              type="text"
              name="locationQuery"
              [ngModel]="locationQuery()"
              (ngModelChange)="locationQuery.set($event)"
              placeholder="Location or Remote"
              class="w-full pl-10 pr-4 py-2.5 bg-navy/60 rounded-xl text-sm text-white placeholder-slate focus:outline-none focus:ring-2 focus:ring-cyan border border-white/5"
            />
          </div>

          <button
            type="submit"
            class="w-full md:w-auto px-6 py-2.5 rounded-xl bg-electric hover:bg-royal text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-electric/25 cursor-pointer whitespace-nowrap"
          >
            <span>Search</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </form>

        <!-- Scroll Indicator -->
        <button
          type="button"
          (click)="scrollToTrustStrip()"
          class="scroll-indicator mt-16 text-ice/60 hover:text-cyan transition-colors flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan rounded-lg p-1"
          aria-label="Scroll to content"
        >
          <span class="text-xs uppercase tracking-widest font-mono">Explore</span>
          <div class="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center p-1">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce"></span>
          </div>
        </button>
      </div>
    </section>
  `
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private router = inject(Router);
  private smoothScroll = inject(SmoothScrollService);

  readonly searchQuery = signal('');
  readonly locationQuery = signal('');

  private canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('networkCanvas');
  private animationFrameId: number | null = null;
  private nodes: ParticleNode[] = [];
  private mouse = { x: -1000, y: -1000 };
  private boundVisibilityHandler = this.onVisibilityChange.bind(this);
  private boundMouseMoveHandler = this.onMouseMove.bind(this);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.animateHeadline();
    this.initCanvas();
  }

  private animateHeadline(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const words = document.querySelectorAll('app-home-hero .word');
    if (words.length > 0) {
      gsap.from(words, {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out'
      });
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.createNodes(canvas.width, canvas.height);
      if (prefersReducedMotion) {
        this.renderFrame(ctx, canvas, true);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', this.boundMouseMoveHandler, { passive: true });
    document.addEventListener('visibilitychange', this.boundVisibilityHandler);

    if (prefersReducedMotion) {
      this.renderFrame(ctx, canvas, true);
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.renderFrame(ctx, canvas, false);
        this.animationFrameId = requestAnimationFrame(loop);
      };
      this.animationFrameId = requestAnimationFrame(loop);
    });
  }

  private createNodes(width: number, height: number): void {
    const count = Math.min(55, Math.floor((width * height) / 25000));
    this.nodes = [];
    for (let i = 0; i < count; i++) {
      this.nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 1,
        color: Math.random() > 0.4 ? '#22D3EE' : '#3B82F6'
      });
    }
  }

  private renderFrame(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, staticMode: boolean): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      if (!staticMode) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Subtle repulsion from cursor
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          node.x -= (dx / dist) * 0.8;
          node.y -= (dy / dist) * 0.8;
        }
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.globalAlpha = 0.7;
      ctx.fill();

      // Connecting lines
      for (let j = i + 1; j < this.nodes.length; j++) {
        const other = this.nodes[j];
        const dist = Math.hypot(node.x - other.x, node.y - other.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = '#22D3EE';
          ctx.globalAlpha = (1 - dist / 120) * 0.22;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  private onMouseMove(e: MouseEvent): void {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  private onVisibilityChange(): void {
    if (document.hidden && this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    } else if (!document.hidden && !this.animationFrameId) {
      const canvas = this.canvasRef()?.nativeElement;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.ngZone.runOutsideAngular(() => {
          const loop = () => {
            this.renderFrame(ctx, canvas, false);
            this.animationFrameId = requestAnimationFrame(loop);
          };
          this.animationFrameId = requestAnimationFrame(loop);
        });
      }
    }
  }

  onSearch(): void {
    const q = this.searchQuery().trim();
    const location = this.locationQuery().trim();
    this.router.navigate(['/jobs'], {
      queryParams: {
        ...(q ? { q } : {}),
        ...(location ? { location } : {})
      }
    });
  }

  scrollToTrustStrip(): void {
    this.smoothScroll.scrollTo('#trust-strip');
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      window.removeEventListener('mousemove', this.boundMouseMoveHandler);
      document.removeEventListener('visibilitychange', this.boundVisibilityHandler);
    }
  }
}
```

- [ ] **Step 4: Run test to watch it pass**

```powershell
npm test -- src/app/features/home/components/hero/hero.component.spec.ts --watch=false
```
Expected: PASS (4 tests passed).

- [ ] **Step 5: Commit HeroComponent**

```powershell
git add src/app/features/home/components/hero/
git commit -m "feat(home): add HeroComponent with interactive canvas talent network and search"
```

---

### Task 3: TrustStripComponent & DisciplinesComponent

**Files:**
- Create: `src/app/features/home/components/trust-strip/trust-strip.component.ts`
- Create: `src/app/features/home/components/trust-strip/trust-strip.component.spec.ts`
- Create: `src/app/features/home/components/disciplines/disciplines.component.ts`
- Create: `src/app/features/home/components/disciplines/disciplines.component.spec.ts`

**Interfaces:**
- Consumes: `CounterComponent`, `SectionHeadingComponent`, `TiltCardDirective`, `RevealDirective`, `TRUST_METRICS`, `DISCIPLINES`
- Produces: `<app-home-trust-strip />` and `<app-home-disciplines />` standalone components

- [ ] **Step 1: Write failing unit tests for TrustStripComponent and DisciplinesComponent**

Create `src/app/features/home/components/trust-strip/trust-strip.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TrustStripComponent } from './trust-strip.component';

describe('TrustStripComponent', () => {
  let fixture: ComponentFixture<TrustStripComponent>;
  let component: TrustStripComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustStripComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TrustStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render 4 metric counters', () => {
    const counters = fixture.nativeElement.querySelectorAll('app-counter');
    expect(counters.length).toBe(4);
  });

  it('should display discipline metric', () => {
    expect(fixture.nativeElement.textContent).toContain('Engineering Disciplines');
  });
});
```

Create `src/app/features/home/components/disciplines/disciplines.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DisciplinesComponent } from './disciplines.component';
import { provideRouter } from '@angular/router';

describe('DisciplinesComponent', () => {
  let fixture: ComponentFixture<DisciplinesComponent>;
  let component: DisciplinesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisciplinesComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render 5 engineering discipline tilt cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.discipline-card');
    expect(cards.length).toBe(5);
  });

  it('should render section heading with Industry Expertise badge', () => {
    const heading = fixture.nativeElement.querySelector('app-section-heading');
    expect(heading).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Engineering Disciplines We Staff');
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/features/home/components/trust-strip/trust-strip.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement TrustStripComponent and DisciplinesComponent**

Create `src/app/features/home/components/trust-strip/trust-strip.component.ts`:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../../../shared/components/counter/counter.component';
import { TRUST_METRICS } from '../../../../data/trust-metrics.data';

@Component({
  selector: 'app-home-trust-strip',
  standalone: true,
  imports: [CommonModule, CounterComponent],
  template: `
    <section id="trust-strip" class="relative bg-navy/60 backdrop-blur-md border-y border-white/10 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          @for (metric of metrics; track metric.label) {
            <div class="flex flex-col items-center text-center">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-2">
                <app-counter
                  [target]="metric.value"
                  [suffix]="metric.suffix || ''"
                  [prefix]="metric.prefix || ''"
                ></app-counter>
              </div>
              <h3 class="text-sm font-semibold text-cyan uppercase tracking-wider mb-1 font-sans">
                {{ metric.label }}
              </h3>
              <p class="text-xs text-slate max-w-[200px]">
                {{ metric.description }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class TrustStripComponent {
  readonly metrics = TRUST_METRICS;
}
```

Create `src/app/features/home/components/disciplines/disciplines.component.ts`:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { TiltCardDirective } from '../../../../shared/directives/tilt-card.directive';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { DISCIPLINES } from '../../../../data/disciplines.data';

@Component({
  selector: 'app-home-disciplines',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeadingComponent, TiltCardDirective, RevealDirective],
  template: `
    <section class="py-24 bg-midnight text-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <app-section-heading
          badge="Industry Expertise"
          title="Engineering Disciplines We Staff"
          subtitle="Deep domain technical recruitment across America's core engineering and mission-critical infrastructure sectors"
          [centered]="true"
        ></app-section-heading>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
          @for (discipline of disciplines; track discipline.id; let i = $index) {
            <div
              appReveal="up"
              [delay]="i * 0.1"
              appTilt
              [maxTilt]="7"
              class="discipline-card glass rounded-2xl p-7 border border-white/10 hover:border-cyan/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              <div>
                <!-- Icon Header -->
                <div class="w-12 h-12 rounded-xl bg-navy/80 border border-white/10 flex items-center justify-center text-cyan mb-5 group-hover:scale-110 group-hover:border-cyan/40 transition-all duration-300">
                  <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
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
                      @default {
                        <path stroke-linecap="round" stroke-linejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      }
                    }
                  </svg>
                </div>

                <h3 class="font-heading font-bold text-xl text-white mb-2 group-hover:text-cyan transition-colors">
                  {{ discipline.name }}
                </h3>
                <p class="text-sm text-ice/75 leading-relaxed mb-6 font-normal">
                  {{ discipline.shortDescription }}
                </p>

                <!-- Key Role Pills -->
                <div class="flex flex-wrap gap-1.5 mb-6">
                  @for (role of discipline.roles; track role) {
                    <span class="text-xs bg-navy/80 text-ice/85 border border-white/5 px-2.5 py-1 rounded-md">
                      {{ role }}
                    </span>
                  }
                </div>
              </div>

              <!-- Footer link -->
              <a
                [routerLink]="['/categories', discipline.slug]"
                class="inline-flex items-center gap-2 text-sm text-cyan font-medium hover:text-white transition-colors pt-4 border-t border-white/10"
              >
                <span>Explore Discipline Roles</span>
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class DisciplinesComponent {
  readonly disciplines = DISCIPLINES;
}
```

- [ ] **Step 4: Run tests to watch them pass**

```powershell
npm test -- src/app/features/home/components/trust-strip/trust-strip.component.spec.ts --watch=false
npm test -- src/app/features/home/components/disciplines/disciplines.component.spec.ts --watch=false
```
Expected: PASS (4 tests passed).

- [ ] **Step 5: Commit TrustStripComponent & DisciplinesComponent**

```powershell
git add src/app/features/home/components/trust-strip/ src/app/features/home/components/disciplines/
git commit -m "feat(home): add TrustStripComponent and DisciplinesComponent with tilt cards"
```

---

### Task 4: WhyChooseUsComponent (Light Ice Theme & Value Pillars)

**Files:**
- Create: `src/app/features/home/components/why-choose-us/why-choose-us.component.ts`
- Create: `src/app/features/home/components/why-choose-us/why-choose-us.component.spec.ts`

**Interfaces:**
- Consumes: `SectionHeadingComponent`, `RevealDirective`
- Produces: `<app-home-why-choose-us />` standalone component

- [ ] **Step 1: Write the failing unit tests for WhyChooseUsComponent**

Create `src/app/features/home/components/why-choose-us/why-choose-us.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WhyChooseUsComponent } from './why-choose-us.component';

describe('WhyChooseUsComponent', () => {
  let fixture: ComponentFixture<WhyChooseUsComponent>;
  let component: WhyChooseUsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyChooseUsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WhyChooseUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render 4 value pillar cards', () => {
    const pillars = fixture.nativeElement.querySelectorAll('.pillar-card');
    expect(pillars.length).toBe(4);
  });

  it('should render light theme section heading', () => {
    const heading = fixture.nativeElement.querySelector('app-section-heading');
    expect(heading).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Engineered for Technical Precision');
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/features/home/components/why-choose-us/why-choose-us.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement WhyChooseUsComponent**

Create `src/app/features/home/components/why-choose-us/why-choose-us.component.ts`:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

export interface Pillar {
  title: string;
  description: string;
  iconSvg: string;
}

@Component({
  selector: 'app-home-why-choose-us',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, RevealDirective],
  template: `
    <section class="py-24 bg-ice text-ink relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <app-section-heading
          badge="Why Metavayn"
          title="Engineered for Technical Precision"
          subtitle="A specialized engineering recruiting practice grounded in domain literacy, rigorous screening, and candidate respect"
          theme="light"
          [centered]="true"
        ></app-section-heading>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          @for (pillar of pillars; track pillar.title; let i = $index) {
            <div
              appReveal="up"
              [delay]="i * 0.1"
              class="pillar-card bg-white rounded-2xl p-8 sm:p-10 border border-slate/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div class="w-14 h-14 rounded-xl bg-ice flex items-center justify-center text-royal mb-6 group-hover:scale-110 group-hover:bg-royal group-hover:text-white transition-all duration-300">
                  <svg class="w-7 h-7 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2" [innerHTML]="pillar.iconSvg"></svg>
                </div>

                <h3 class="font-heading font-bold text-2xl text-ink mb-3 group-hover:text-royal transition-colors">
                  {{ pillar.title }}
                </h3>
                <p class="text-slate text-base leading-relaxed">
                  {{ pillar.description }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class WhyChooseUsComponent {
  readonly pillars: Pillar[] = [
    {
      title: 'Engineering-Focused Recruiting',
      description: 'We speak the technical language of thermal loads, FEA meshes, single-line schematics, and mission-critical redundancies. No generic keyword matching.',
      iconSvg: '<circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>'
    },
    {
      title: 'Aligned Opportunities',
      description: 'Direct connection to US employers requiring specialized Indian engineering expertise for high-impact industrial and infrastructure programs.',
      iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>'
    },
    {
      title: 'Candidate-First Guidance',
      description: 'Transparent compensation insights, thorough technical interview coaching, and dedicated guidance at every milestone of your career transition.',
      iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path stroke-linecap="round" stroke-linejoin="round" d="M23 21v-2a4 4 0 00-3-3.87"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 3.13a4 4 0 010 7.75"/>'
    },
    {
      title: 'Strict Confidentiality',
      description: 'Your professional credentials and personal identity are protected with strict non-disclosure. We never distribute profiles without explicit candidate consent.',
      iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>'
    }
  ];
}
```

- [ ] **Step 4: Run test to watch it pass**

```powershell
npm test -- src/app/features/home/components/why-choose-us/why-choose-us.component.spec.ts --watch=false
```
Expected: PASS (2 tests passed).

- [ ] **Step 5: Commit WhyChooseUsComponent**

```powershell
git add src/app/features/home/components/why-choose-us/
git commit -m "feat(home): add WhyChooseUsComponent in Light Ice theme with 4 pillars"
```

---

### Task 5: HowItWorksComponent (Pinned Dual-Track Timeline)

**Files:**
- Create: `src/app/features/home/components/how-it-works/how-it-works.component.ts`
- Create: `src/app/features/home/components/how-it-works/how-it-works.component.spec.ts`

**Interfaces:**
- Consumes: `SectionHeadingComponent`, `gsap`, `ScrollTrigger`, `PLATFORM_ID`, `NgZone`
- Produces: `<app-home-how-it-works />` standalone component with dual-track toggle and pinned scroll timeline

- [ ] **Step 1: Write the failing unit tests for HowItWorksComponent**

Create `src/app/features/home/components/how-it-works/how-it-works.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HowItWorksComponent } from './how-it-works.component';

describe('HowItWorksComponent', () => {
  let fixture: ComponentFixture<HowItWorksComponent>;
  let component: HowItWorksComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorksComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render 5 steps for candidate track by default', () => {
    expect(component.activeTrack()).toBe('candidates');
    const steps = fixture.nativeElement.querySelectorAll('.timeline-step');
    expect(steps.length).toBe(5);
    expect(fixture.nativeElement.textContent).toContain('Submit Resume');
  });

  it('should switch to employers track when toggled', () => {
    component.setTrack('employers');
    fixture.detectChanges();

    expect(component.activeTrack()).toBe('employers');
    expect(fixture.nativeElement.textContent).toContain('Role Intake');
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/features/home/components/how-it-works/how-it-works.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement HowItWorksComponent with Pinned GSAP ScrollTrigger**

Create `src/app/features/home/components/how-it-works/how-it-works.component.ts`:
```typescript
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  inject,
  signal,
  PLATFORM_ID,
  NgZone,
  ElementRef,
  viewChild
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface TimelineStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

@Component({
  selector: 'app-home-how-it-works',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent],
  template: `
    <section #sectionPin class="py-24 bg-midnight text-white relative overflow-hidden">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <app-section-heading
          badge="Process Overview"
          title="How It Works"
          subtitle="A transparent, step-by-step roadmap from initial introduction to successful placement"
          [centered]="true"
        ></app-section-heading>

        <!-- Track Switcher Toggle -->
        <div class="flex justify-center mt-10 mb-16">
          <div class="p-1.5 rounded-xl bg-navy/80 border border-white/10 flex items-center gap-2">
            <button
              type="button"
              (click)="setTrack('candidates')"
              class="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer"
              [class.bg-cyan]="activeTrack() === 'candidates'"
              [class.text-midnight]="activeTrack() === 'candidates'"
              [class.text-ice]="activeTrack() !== 'candidates'"
              [class.hover:text-white]="activeTrack() !== 'candidates'"
            >
              For Candidates
            </button>
            <button
              type="button"
              (click)="setTrack('employers')"
              class="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer"
              [class.bg-cyan]="activeTrack() === 'employers'"
              [class.text-midnight]="activeTrack() === 'employers'"
              [class.text-ice]="activeTrack() !== 'employers'"
              [class.hover:text-white]="activeTrack() !== 'employers'"
            >
              For Employers
            </button>
          </div>
        </div>

        <!-- Timeline Steps Container -->
        <div class="relative max-w-4xl mx-auto">
          <!-- Central Animated SVG Progress Rail -->
          <div class="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-1 bg-white/10 rounded-full overflow-hidden" aria-hidden="true">
            <div #progressRail class="w-full bg-cyan shadow-[0_0_12px_#22D3EE] h-0 transition-all duration-300"></div>
          </div>

          <div class="space-y-10 md:space-y-16">
            @for (step of currentSteps(); track step.number; let i = $index) {
              <div
                class="timeline-step relative flex flex-col md:flex-row items-center gap-8"
                [class.md:flex-row-reverse]="i % 2 === 1"
              >
                <!-- Step Content Card -->
                <div class="w-full md:w-1/2 glass p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-cyan/40 transition-all duration-300">
                  <div class="flex items-center gap-3 mb-3">
                    <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold px-2 py-0.5 rounded bg-cyan/10 border border-cyan/20">
                      Step {{ step.number }}
                    </span>
                    <h3 class="font-heading font-bold text-xl text-white">{{ step.title }}</h3>
                  </div>
                  <p class="text-sm text-ice/80 leading-relaxed mb-4">
                    {{ step.description }}
                  </p>
                  <ul class="space-y-1 text-xs text-slate">
                    @for (detail of step.details; track detail) {
                      <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
                        <span>{{ detail }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Central Milestone Node Dot -->
                <div class="w-10 h-10 rounded-full bg-navy border-2 border-cyan text-cyan font-bold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)] shrink-0 z-10">
                  {{ step.number }}
                </div>

                <!-- Empty Balancing Space for Alternate Grid -->
                <div class="hidden md:block w-1/2"></div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class HowItWorksComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  readonly activeTrack = signal<'candidates' | 'employers'>('candidates');

  private sectionPinRef = viewChild<ElementRef<HTMLElement>>('sectionPin');
  private progressRailRef = viewChild<ElementRef<HTMLElement>>('progressRail');
  private scrollTriggerInstance: ScrollTrigger | null = null;

  readonly candidateSteps: TimelineStep[] = [
    {
      number: '01',
      title: 'Submit Resume',
      description: 'Upload your credentials and highlight your engineering discipline, software tools, and career objectives.',
      details: ['Online intake submission', 'Confidential profile registration', 'Discipline alignment check']
    },
    {
      number: '02',
      title: 'Technical Screening',
      description: 'In-depth consultation with a technical recruiter evaluating your modeling, simulation, and engineering fundamentals.',
      details: ['CAD/FEA tool verification', 'Project portfolio review', 'US code familiarity (ASHRAE, ASME, IEEE)']
    },
    {
      number: '03',
      title: 'Opportunity Matching',
      description: 'Review vetted, illustrative opportunities matching your compensation expectations and engineering focus.',
      details: ['Targeted role presentations', 'Compensation alignment', 'Client project scope review']
    },
    {
      number: '04',
      title: 'Interview Briefing',
      description: 'Comprehensive preparation for technical interview rounds with hiring managers and engineering leads.',
      details: ['Technical briefing documents', 'Mock technical discussions', 'Team culture overview']
    },
    {
      number: '05',
      title: 'Offer & Onboarding Support',
      description: 'Dedicated support through contract evaluation, compensation negotiation, and engagement launch.',
      details: ['Terms review & signing', 'Hardware & tooling setup', 'Ongoing placement support']
    }
  ];

  readonly employerSteps: TimelineStep[] = [
    {
      number: '01',
      title: 'Role Intake',
      description: 'Define precise engineering requirements, simulation packages, CAD tooling, and program timelines.',
      details: ['Technical specification brief', 'Seniority & domain scoping', 'Engagement model selection']
    },
    {
      number: '02',
      title: 'Targeted Sourcing',
      description: 'We query our specialized Indian engineering network for rigorously qualified technical talent.',
      details: ['Domain-specific candidate pool', 'Verification of engineering degrees', 'Skill & tooling vetting']
    },
    {
      number: '03',
      title: 'Shortlist Delivery',
      description: 'Receive curated technical candidate dossiers within 48 to 72 hours of mandate finalization.',
      details: ['Detailed candidate dossier', 'Technical interview notes', 'Availability & compensation fit']
    },
    {
      number: '04',
      title: 'Coordinated Interviews',
      description: 'Structured interview scheduling directly with technical leads, complete with briefing coordination.',
      details: ['Seamless schedule management', 'Technical assessment coordination', 'Feedback collection']
    },
    {
      number: '05',
      title: 'Placement & Integration',
      description: 'Onboarding coordination to ensure rapid, friction-free productivity from day one.',
      details: ['Onboarding guidance', 'Milestone follow-up', 'Long-term engagement success check']
    }
  ];

  currentSteps(): TimelineStep[] {
    return this.activeTrack() === 'candidates' ? this.candidateSteps : this.employerSteps;
  }

  setTrack(track: 'candidates' | 'employers'): void {
    this.activeTrack.set(track);
    this.refreshTimeline();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScrollTimeline();
  }

  private initScrollTimeline(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const section = this.sectionPinRef()?.nativeElement;
    const rail = this.progressRailRef()?.nativeElement;
    if (!section || !rail) return;

    this.ngZone.runOutsideAngular(() => {
      this.scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        end: 'bottom 85%',
        scrub: 0.5,
        onUpdate: (self) => {
          rail.style.height = `${self.progress * 100}%`;
        }
      });
    });
  }

  private refreshTimeline(): void {
    if (this.scrollTriggerInstance) {
      ScrollTrigger.refresh();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
      this.scrollTriggerInstance = null;
    }
  }
}
```

- [ ] **Step 4: Run test to watch it pass**

```powershell
npm test -- src/app/features/home/components/how-it-works/how-it-works.component.spec.ts --watch=false
```
Expected: PASS (2 tests passed).

- [ ] **Step 5: Commit HowItWorksComponent**

```powershell
git add src/app/features/home/components/how-it-works/
git commit -m "feat(home): add HowItWorksComponent with pinned dual-track timeline"
```

---

### Task 6: FeaturedRolesComponent & DualCtaComponent

**Files:**
- Create: `src/app/features/home/components/featured-roles/featured-roles.component.ts`
- Create: `src/app/features/home/components/featured-roles/featured-roles.component.spec.ts`
- Create: `src/app/features/home/components/dual-cta/dual-cta.component.ts`
- Create: `src/app/features/home/components/dual-cta/dual-cta.component.spec.ts`

**Interfaces:**
- Consumes: `ButtonComponent`, `SectionHeadingComponent`, `RevealDirective`, `FEATURED_JOBS`
- Produces: `<app-home-featured-roles />` and `<app-home-dual-cta />` standalone components

- [ ] **Step 1: Write failing unit tests for FeaturedRolesComponent and DualCtaComponent**

Create `src/app/features/home/components/featured-roles/featured-roles.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FeaturedRolesComponent } from './featured-roles.component';
import { provideRouter } from '@angular/router';

describe('FeaturedRolesComponent', () => {
  let fixture: ComponentFixture<FeaturedRolesComponent>;
  let component: FeaturedRolesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedRolesComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render 3 featured role cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.role-card');
    expect(cards.length).toBe(3);
  });

  it('should display "Illustrative listing" badge on every role card', () => {
    const badges = fixture.nativeElement.querySelectorAll('.illustrative-badge');
    expect(badges.length).toBe(3);
    badges.forEach((b: HTMLElement) => {
      expect(b.textContent).toContain('Illustrative listing');
    });
  });
});
```

Create `src/app/features/home/components/dual-cta/dual-cta.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DualCtaComponent } from './dual-cta.component';
import { provideRouter } from '@angular/router';

describe('DualCtaComponent', () => {
  let fixture: ComponentFixture<DualCtaComponent>;
  let component: DualCtaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DualCtaComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DualCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render candidate and employer split panels', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Advance Your Engineering Career');
    expect(content).toContain('Hire Specialized Engineering Talent');
  });

  it('should render amber CTA for candidates and primary CTA for employers', () => {
    const amberBtn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    const primaryBtn = fixture.nativeElement.querySelector('app-button[variant="primary"]');

    expect(amberBtn).toBeTruthy();
    expect(amberBtn.textContent).toContain('Submit Your Resume');
    expect(primaryBtn).toBeTruthy();
    expect(primaryBtn.textContent).toContain('Hire Engineering Talent');
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/features/home/components/featured-roles/featured-roles.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement FeaturedRolesComponent and DualCtaComponent**

Create `src/app/features/home/components/featured-roles/featured-roles.component.ts`:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FEATURED_JOBS } from '../../../../data/jobs.data';

@Component({
  selector: 'app-home-featured-roles',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeadingComponent, ButtonComponent, RevealDirective],
  template: `
    <section class="py-24 bg-midnight text-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <app-section-heading
          badge="Sample Opportunities"
          title="Featured Engineering Roles"
          subtitle="Representative positions demonstrating technical requirements from our active US client network"
          [centered]="true"
        ></app-section-heading>

        <!-- Mandatory Disclaimer Notice -->
        <div class="max-w-3xl mx-auto mt-4 mb-14 text-center">
          <p class="text-xs text-slate font-mono bg-navy/60 border border-white/10 rounded-full px-4 py-1.5 inline-block">
            Note: All listings shown below are illustrative representations of client requirements. Metavayn does not publish live vacancies without active mandate agreements.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          @for (job of jobs; track job.id; let i = $index) {
            <div
              appReveal="up"
              [delay]="i * 0.1"
              class="role-card glass rounded-2xl p-7 border border-white/10 hover:border-cyan/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              <div>
                <!-- Header with Illustrative Badge -->
                <div class="flex items-center justify-between gap-2 mb-4">
                  <span class="text-xs font-semibold text-cyan uppercase tracking-wider font-sans">
                    {{ job.discipline }}
                  </span>
                  <span class="illustrative-badge text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-electric/20 text-cyan border border-cyan/30">
                    Illustrative listing
                  </span>
                </div>

                <h3 class="font-heading font-bold text-2xl text-white mb-3 group-hover:text-cyan transition-colors">
                  {{ job.title }}
                </h3>

                <!-- Meta Details -->
                <div class="space-y-2 mb-4 text-xs text-slate">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{{ job.location }} ({{ job.workType }})</span>
                  </div>
                  <div class="flex items-center gap-2 text-cyan font-medium">
                    <svg class="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ job.compensation }}</span>
                  </div>
                </div>

                <p class="text-sm text-ice/75 leading-relaxed mb-6 font-normal">
                  {{ job.description }}
                </p>

                <!-- Technical Skill Tags -->
                <div class="flex flex-wrap gap-1.5 mb-6">
                  @for (tag of job.tags; track tag) {
                    <span class="text-xs bg-navy/80 text-ice/85 border border-white/5 px-2.5 py-1 rounded-md">
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>

              <!-- Action -->
              <div class="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  [routerLink]="['/jobs', job.id]"
                  class="text-xs text-ice/70 hover:text-cyan transition-colors"
                >
                  View Details
                </a>
                <app-button variant="primary" href="/candidates" class="text-xs">
                  Apply Now
                </app-button>
              </div>
            </div>
          }
        </div>

        <!-- View All Roles CTA -->
        <div class="mt-14 text-center">
          <app-button variant="ghost" href="/jobs">
            View All Job Openings
          </app-button>
        </div>
      </div>
    </section>
  `
})
export class FeaturedRolesComponent {
  readonly jobs = FEATURED_JOBS;
}
```

Create `src/app/features/home/components/dual-cta/dual-cta.component.ts`:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-home-dual-cta',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RevealDirective],
  template: `
    <section class="py-20 bg-midnight text-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Candidates Card (Strict Amber Isolation) -->
          <div
            appReveal="left"
            class="glass rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-cyan/40 transition-all duration-300"
          >
            <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div>
              <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-3">
                For Engineering Candidates
              </span>
              <h3 class="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
                Advance Your Engineering Career
              </h3>
              <p class="text-base text-ice/85 leading-relaxed mb-8">
                Connect your engineering expertise with American companies shaping high-growth infrastructure programs. Access competitive compensation, structured interview prep, and technical alignment.
              </p>
            </div>

            <div>
              <app-button variant="amber-cta" href="/candidates">
                Submit Your Resume
              </app-button>
            </div>
          </div>

          <!-- Employers Card -->
          <div
            appReveal="right"
            class="glass rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-electric/40 transition-all duration-300"
          >
            <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-royal/15 blur-[100px] rounded-full pointer-events-none"></div>

            <div>
              <span class="text-xs font-mono uppercase tracking-widest text-electric font-bold block mb-3">
                For US Employers
              </span>
              <h3 class="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
                Hire Specialized Engineering Talent
              </h3>
              <p class="text-base text-ice/85 leading-relaxed mb-8">
                Overcome technical talent shortages with pre-screened Indian engineering professionals specialized in HVAC, Mechanical, Electrical, and Simulation disciplines.
              </p>
            </div>

            <div>
              <app-button variant="primary" href="/employers">
                Hire Engineering Talent
              </app-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class DualCtaComponent {}
```

- [ ] **Step 4: Run tests to watch them pass**

```powershell
npm test -- src/app/features/home/components/featured-roles/featured-roles.component.spec.ts --watch=false
npm test -- src/app/features/home/components/dual-cta/dual-cta.component.spec.ts --watch=false
```
Expected: PASS (4 tests passed).

- [ ] **Step 5: Commit FeaturedRolesComponent & DualCtaComponent**

```powershell
git add src/app/features/home/components/featured-roles/ src/app/features/home/components/dual-cta/
git commit -m "feat(home): add FeaturedRolesComponent and DualCtaComponent"
```

---

### Task 7: FinalBannerComponent, HomeComponent Assembly & Verification

**Files:**
- Create: `src/app/features/home/components/final-banner/final-banner.component.ts`
- Create: `src/app/features/home/components/final-banner/final-banner.component.spec.ts`
- Modify: `src/app/features/home/home.component.ts`
- Modify: `src/app/features/home/home.component.spec.ts`

**Interfaces:**
- Consumes: All 8 home sub-components
- Produces: Complete production Home Page

- [ ] **Step 1: Write unit tests for FinalBannerComponent and HomeComponent**

Create `src/app/features/home/components/final-banner/final-banner.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FinalBannerComponent } from './final-banner.component';
import { provideRouter } from '@angular/router';

describe('FinalBannerComponent', () => {
  let fixture: ComponentFixture<FinalBannerComponent>;
  let component: FinalBannerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalBannerComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FinalBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render headline and centered amber CTA button', () => {
    expect(fixture.nativeElement.textContent).toContain("Ready to Build What's Next?");
    const btn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Submit Your Resume');
  });
});
```

Create `src/app/features/home/home.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';
import { SmoothScrollService } from '../../core/services/smooth-scroll.service';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        { provide: SmoothScrollService, useValue: { scrollTo: vi.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should assemble all 8 home page sections', () => {
    expect(fixture.nativeElement.querySelector('app-home-hero')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-trust-strip')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-disciplines')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-why-choose-us')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-how-it-works')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-featured-roles')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-dual-cta')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-final-banner')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Implement FinalBannerComponent**

Create `src/app/features/home/components/final-banner/final-banner.component.ts`:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-home-final-banner',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, RevealDirective],
  template: `
    <section class="py-24 bg-midnight text-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          appReveal="up"
          class="relative bg-gradient-to-r from-navy/90 via-royal/40 to-navy/90 rounded-3xl p-10 sm:p-16 lg:p-20 border border-cyan/30 text-center shadow-[0_0_50px_rgba(34,211,238,0.2)] overflow-hidden"
        >
          <!-- Blueprint Grid Texture Overlay -->
          <div class="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"></div>
          <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan/15 blur-[120px] rounded-full pointer-events-none"></div>

          <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold mb-4 block">
              Take The Next Step
            </span>
            <h2 class="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
              Ready to Build What's Next?
            </h2>
            <p class="text-base sm:text-lg text-ice/85 mb-10 leading-relaxed font-normal">
              Connect your specialized engineering expertise with companies shaping the future of infrastructure, energy, and advanced manufacturing across the United States.
            </p>

            <!-- Centered Amber Action Button (Strict Amber Isolation) -->
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <app-button variant="amber-cta" href="/candidates">
                Submit Your Resume
              </app-button>
            </div>

            <p class="mt-8 text-xs text-slate">
              Looking to hire engineers?
              <a routerLink="/contact" class="text-cyan underline hover:text-white transition-colors ml-1">
                Consult our talent acquisition team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class FinalBannerComponent {}
```

- [ ] **Step 3: Update HomeComponent**

Update `src/app/features/home/home.component.ts`:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { TrustStripComponent } from './components/trust-strip/trust-strip.component';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FeaturedRolesComponent } from './components/featured-roles/featured-roles.component';
import { DualCtaComponent } from './components/dual-cta/dual-cta.component';
import { FinalBannerComponent } from './components/final-banner/final-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    TrustStripComponent,
    DisciplinesComponent,
    WhyChooseUsComponent,
    HowItWorksComponent,
    FeaturedRolesComponent,
    DualCtaComponent,
    FinalBannerComponent
  ],
  template: `
    <app-home-hero></app-home-hero>
    <app-home-trust-strip></app-home-trust-strip>
    <app-home-disciplines></app-home-disciplines>
    <app-home-why-choose-us></app-home-why-choose-us>
    <app-home-how-it-works></app-home-how-it-works>
    <app-home-featured-roles></app-home-featured-roles>
    <app-home-dual-cta></app-home-dual-cta>
    <app-home-final-banner></app-home-final-banner>
  `
})
export class HomeComponent {}
```

- [ ] **Step 4: Run full test suite & production build**

```powershell
npm test -- --watch=false
npm run build
```
Expected: 100% pass rate, 0 failures, 0 errors.

- [ ] **Step 5: Verify browser on http://localhost:4200**

Verify:
- Hero canvas renders and responds to cursor.
- Headline word-by-word reveal triggers.
- Compact search bar navigates to `/jobs?q=...`.
- Trust counters animate on scroll.
- 5 Discipline tilt cards tilt on mousemove and glow on hover.
- Why Choose Us renders in crisp Light Ice theme.
- How It Works pinned timeline tracks progress via animated rail.
- Featured roles display `"Illustrative listing"` badges.
- Split CTA and Final Banner render centered Amber buttons.

- [ ] **Step 6: Commit and push**

```powershell
git add src/app/features/home/
git commit -m "feat(home): assemble all 8 sections into production HomeComponent"
git push -u origin main
```
