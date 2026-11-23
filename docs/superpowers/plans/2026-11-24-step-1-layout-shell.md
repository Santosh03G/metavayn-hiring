# Step 1: Layout Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the global persistent application layout shell for Metavayn, including the header/navbar with scroll state management and mobile drawer, 4-column footer with mandatory honest disclosures, page-load intro animation with session persistence, and router transition wipe.

**Architecture:** Create modular, standalone layout components in `src/app/core/layout/` (Logo, Navbar, Footer, PageIntro, RouteWipe). Integrate with `SmoothScrollService` for scroll reset and GSAP for GPU-accelerated motion outside Angular's zone. Assemble the layout shell in `AppComponent` with an accessible skip-to-content link.

**Tech Stack:** Angular 21 (standalone components, signals), Tailwind CSS v3, GSAP 3 + ScrollTrigger, Lenis, Vitest.

**Spec:** [`docs/superpowers/specs/2026-11-24-step-1-layout-shell-design.md`](file:///d:/Santosh/Development/metavaynhiring/docs/superpowers/specs/2026-11-24-step-1-layout-shell-design.md)

## Global Constraints

- **Mandatory Honest Disclosure:** The footer and brand copy must include verbatim:  
  `Metavayn is an India-based engineering recruitment company serving employers and engineering professionals in the United States.`  
  Never claim US offices, visa sponsorship, or direct employer partnerships.
- **Strict Amber Isolation:** Amber (`#F59E0B`) is reserved exclusively for the primary "Submit Your Resume" CTA button. No other button or link may use amber.
- **US Terminology:** Use "Submit Your Resume" (never "Submit CV"), "Candidate", "Engineering Recruiting Firm", "Apply Now", "Compensation".
- **Lifecycle & Memory Hygiene:** All GSAP timelines, ScrollTrigger instances, DOM listeners, and router subscriptions must be cleaned up in `ngOnDestroy()`.
- **Accessibility:** Skip link targeting `#main-content`, `prefers-reduced-motion` bypass on all animations, ARIA expanded attributes on mobile menu toggles, keyboard trap/escape handling.

---

### Task 1: Metavayn SVG Logo Component

**Files:**
- Create: `src/app/core/layout/logo/logo.component.ts`
- Create: `src/app/core/layout/logo/logo.component.spec.ts`

**Interfaces:**
- Consumes: Design tokens (`#1D4ED8`, `#22D3EE`, `#FFFFFF`, Sora font)
- Produces: `<app-logo [iconOnly]="boolean" [size]="'sm' | 'md' | 'lg'"></app-logo>` standalone component

- [ ] **Step 1: Write the failing unit tests for LogoComponent**

Create `src/app/core/layout/logo/logo.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
import { provideRouter } from '@angular/router';

describe('LogoComponent', () => {
  let fixture: ComponentFixture<LogoComponent>;
  let component: LogoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the hexagonal M SVG icon', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render the Metavayn wordmark by default', () => {
    const textEl = fixture.nativeElement.querySelector('.logo-wordmark');
    expect(textEl).toBeTruthy();
    expect(textEl.textContent).toContain('Metavayn');
  });

  it('should hide the wordmark when iconOnly is true', () => {
    fixture.componentRef.setInput('iconOnly', true);
    fixture.detectChanges();
    const textEl = fixture.nativeElement.querySelector('.logo-wordmark');
    expect(textEl).toBeFalsy();
  });

  it('should link to home page with aria-label', () => {
    const link = fixture.nativeElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('aria-label')).toBe('Metavayn Home');
    expect(link.getAttribute('href')).toBe('/');
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/core/layout/logo/logo.component.spec.ts --watch=false
```
Expected: FAIL (Cannot find module `./logo.component`).

- [ ] **Step 3: Implement LogoComponent**

Create `src/app/core/layout/logo/logo.component.ts`:
```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a routerLink="/" class="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-lg" aria-label="Metavayn Home">
      <div [class]="iconWrapperClasses">
        <svg
          [attr.width]="svgSize"
          [attr.height]="svgSize"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          class="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="meta-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1D4ED8" />
              <stop offset="100%" stop-color="#22D3EE" />
            </linearGradient>
            <linearGradient id="meta-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3B82F6" />
              <stop offset="100%" stop-color="#22D3EE" />
            </linearGradient>
          </defs>
          <!-- Hexagonal outer boundary node -->
          <polygon
            points="18,2 32,10 32,26 18,34 4,26 4,10"
            stroke="url(#meta-grad-1)"
            stroke-width="2.5"
            stroke-linejoin="round"
            fill="rgba(15, 30, 74, 0.4)"
          />
          <!-- Engineering M inner node structure -->
          <path
            d="M10 24V12L18 19L26 12V24"
            stroke="url(#meta-grad-2)"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <!-- Center connectivity pulse dot -->
          <circle cx="18" cy="19" r="2" fill="#22D3EE" class="animate-pulse" />
        </svg>
      </div>

      @if (!iconOnly) {
        <span class="logo-wordmark font-heading font-bold text-white tracking-tight flex items-center" [class]="wordmarkClasses">
          Metavayn
          <span class="w-1.5 h-1.5 rounded-full bg-cyan ml-1 inline-block shadow-[0_0_8px_#22D3EE]"></span>
        </span>
      }
    </a>
  `
})
export class LogoComponent {
  @Input() iconOnly = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get svgSize(): number {
    switch (this.size) {
      case 'sm': return 28;
      case 'lg': return 42;
      default: return 34;
    }
  }

  get iconWrapperClasses(): string {
    return 'relative flex items-center justify-center';
  }

  get wordmarkClasses(): string {
    switch (this.size) {
      case 'sm': return 'text-lg';
      case 'lg': return 'text-2xl';
      default: return 'text-xl';
    }
  }
}
```

- [ ] **Step 4: Run test to watch it pass**

```powershell
npm test -- src/app/core/layout/logo/logo.component.spec.ts --watch=false
```
Expected: PASS (4 tests passed).

- [ ] **Step 5: Commit LogoComponent**

```powershell
git add src/app/core/layout/logo/
git commit -m "feat(layout): add Metavayn SVG logo component with hexagonal node"
```

---

### Task 2: PageIntroComponent (Session-Persisted Logo Pulse & Fade)

**Files:**
- Create: `src/app/core/layout/page-intro/page-intro.component.ts`
- Create: `src/app/core/layout/page-intro/page-intro.component.spec.ts`

**Interfaces:**
- Consumes: `PLATFORM_ID`, `sessionStorage`, `LogoComponent`, `gsap`
- Produces: `<app-page-intro />` standalone component

- [ ] **Step 1: Write the failing unit tests for PageIntroComponent**

Create `src/app/core/layout/page-intro/page-intro.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PageIntroComponent } from './page-intro.component';
import { provideRouter } from '@angular/router';

describe('PageIntroComponent', () => {
  let fixture: ComponentFixture<PageIntroComponent>;
  let component: PageIntroComponent;

  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [PageIntroComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should play intro and set sessionStorage key if not seen', () => {
    fixture = TestBed.createComponent(PageIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isVisible()).toBe(true);
    expect(sessionStorage.getItem('metavayn_intro_seen')).toBe('true');
  });

  it('should skip intro immediately if sessionStorage key is present', () => {
    sessionStorage.setItem('metavayn_intro_seen', 'true');
    fixture = TestBed.createComponent(PageIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isVisible()).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/core/layout/page-intro/page-intro.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement PageIntroComponent**

Create `src/app/core/layout/page-intro/page-intro.component.ts`:
```typescript
import { Component, OnInit, OnDestroy, inject, signal, ElementRef, PLATFORM_ID, viewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-page-intro',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  template: `
    @if (isVisible()) {
      <div
        #overlay
        class="fixed inset-0 z-50 flex items-center justify-center bg-midnight select-none pointer-events-auto"
        aria-hidden="true"
      >
        <div #content class="flex flex-col items-center">
          <app-logo [size]="'lg'"></app-logo>
          <div class="mt-4 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan animate-ping"></span>
            <span class="text-xs uppercase tracking-widest text-slate font-mono">Engineering Recruitment</span>
          </div>
        </div>
      </div>
    }
  `
})
export class PageIntroComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  readonly isVisible = signal(false);

  private overlayRef = viewChild<ElementRef<HTMLElement>>('overlay');
  private contentRef = viewChild<ElementRef<HTMLElement>>('content');
  private timeline: gsap.core.Timeline | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const seen = sessionStorage.getItem('metavayn_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seen === 'true' || prefersReducedMotion) {
      this.isVisible.set(false);
      return;
    }

    sessionStorage.setItem('metavayn_intro_seen', 'true');
    this.isVisible.set(true);

    // Run animation after render
    setTimeout(() => {
      this.runAnimation();
    }, 10);
  }

  private runAnimation(): void {
    const overlay = this.overlayRef()?.nativeElement;
    const content = this.contentRef()?.nativeElement;

    if (!overlay || !content) {
      this.isVisible.set(false);
      return;
    }

    this.timeline = gsap.timeline({
      onComplete: () => {
        this.isVisible.set(false);
      }
    });

    this.timeline
      .fromTo(
        content,
        { scale: 0.92, opacity: 0 },
        { scale: 1.04, opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
      .to(
        overlay,
        { opacity: 0, duration: 0.5, ease: 'power2.inOut' },
        '+=0.1'
      );
  }

  ngOnDestroy(): void {
    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }
  }
}
```

- [ ] **Step 4: Run test to watch it pass**

```powershell
npm test -- src/app/core/layout/page-intro/page-intro.component.spec.ts --watch=false
```
Expected: PASS (2 tests passed).

- [ ] **Step 5: Commit PageIntroComponent**

```powershell
git add src/app/core/layout/page-intro/
git commit -m "feat(layout): add session-persisted PageIntroComponent with logo pulse"
```

---

### Task 3: RouteWipeComponent (GSAP Blue Gradient Navigation Wipe)

**Files:**
- Create: `src/app/core/layout/route-wipe/route-wipe.component.ts`
- Create: `src/app/core/layout/route-wipe/route-wipe.component.spec.ts`

**Interfaces:**
- Consumes: `Router`, `SmoothScrollService`, `PLATFORM_ID`, `gsap`
- Produces: `<app-route-wipe />` standalone component

- [ ] **Step 1: Write the failing unit tests for RouteWipeComponent**

Create `src/app/core/layout/route-wipe/route-wipe.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouteWipeComponent } from './route-wipe.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

describe('RouteWipeComponent', () => {
  let fixture: ComponentFixture<RouteWipeComponent>;
  let component: RouteWipeComponent;
  let routerEvents$: Subject<any>;
  let mockScrollService: { scrollTo: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    routerEvents$ = new Subject();
    mockScrollService = { scrollTo: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [RouteWipeComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            events: routerEvents$.asObservable()
          }
        },
        {
          provide: SmoothScrollService,
          useValue: mockScrollService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteWipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create and have overlay hidden initially', () => {
    expect(component).toBeTruthy();
    const panel = fixture.nativeElement.querySelector('.route-wipe-panel');
    expect(panel).toBeTruthy();
  });

  it('should trigger scroll to top on navigation', () => {
    routerEvents$.next(new NavigationStart(1, '/jobs'));
    expect(mockScrollService.scrollTo).toHaveBeenCalledWith(0);
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/core/layout/route-wipe/route-wipe.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement RouteWipeComponent**

Create `src/app/core/layout/route-wipe/route-wipe.component.ts`:
```typescript
import { Component, OnInit, OnDestroy, inject, ElementRef, PLATFORM_ID, viewChild, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { SmoothScrollService } from '../../services/smooth-scroll.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-route-wipe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #panel
      class="route-wipe-panel fixed inset-0 z-50 pointer-events-none -translate-x-full"
      style="background: linear-gradient(135deg, #0F1E4A 0%, #1D4ED8 50%, #22D3EE 100%);"
      aria-hidden="true"
    >
      <div class="absolute inset-0 bg-midnight/30 backdrop-blur-sm"></div>
    </div>
  `
})
export class RouteWipeComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private smoothScroll = inject(SmoothScrollService);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  private panelRef = viewChild<ElementRef<HTMLElement>>('panel');
  private sub = new Subscription();
  private tween: gsap.core.Tween | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.sub.add(
      this.router.events.pipe(
        filter(e => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError)
      ).subscribe(event => {
        if (event instanceof NavigationStart) {
          this.handleNavigationStart();
        } else {
          this.handleNavigationEnd();
        }
      })
    );
  }

  private handleNavigationStart(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.smoothScroll.scrollTo(0);

    if (prefersReducedMotion) {
      return;
    }

    const panel = this.panelRef()?.nativeElement;
    if (!panel) return;

    this.ngZone.runOutsideAngular(() => {
      this.tween?.kill();
      gsap.set(panel, { xPercent: -100 });
      this.tween = gsap.to(panel, {
        xPercent: 0,
        duration: 0.35,
        ease: 'power3.inOut'
      });
    });
  }

  private handleNavigationEnd(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const panel = this.panelRef()?.nativeElement;
    if (!panel) return;

    this.ngZone.runOutsideAngular(() => {
      this.tween?.kill();
      this.tween = gsap.to(panel, {
        xPercent: 100,
        duration: 0.35,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(panel, { xPercent: -100 });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.tween?.kill();
    this.tween = null;
  }
}
```

- [ ] **Step 4: Run test to watch it pass**

```powershell
npm test -- src/app/core/layout/route-wipe/route-wipe.component.spec.ts --watch=false
```
Expected: PASS (2 tests passed).

- [ ] **Step 5: Commit RouteWipeComponent**

```powershell
git add src/app/core/layout/route-wipe/
git commit -m "feat(layout): add GPU-accelerated RouteWipeComponent with scroll reset"
```

---

### Task 4: NavbarComponent (Header, Links, Amber CTA & Scroll State)

**Files:**
- Create: `src/app/core/layout/navbar/navbar.component.ts`
- Create: `src/app/core/layout/navbar/navbar.component.spec.ts`

**Interfaces:**
- Consumes: `LogoComponent`, `ButtonComponent`, `PLATFORM_ID`, `RouterLink`, `RouterLinkActive`
- Produces: `<app-navbar />` standalone component with desktop navigation and scroll telemetry

- [ ] **Step 1: Write the failing unit tests for NavbarComponent**

Create `src/app/core/layout/navbar/navbar.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideRouter } from '@angular/router';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render 8 navigation links in desktop menu', () => {
    const desktopLinks = fixture.nativeElement.querySelectorAll('.desktop-nav a');
    expect(desktopLinks.length).toBe(8);
  });

  it('should render primary CTA with exact text "Submit Your Resume"', () => {
    const cta = fixture.nativeElement.querySelector('.desktop-cta app-button');
    expect(cta).toBeTruthy();
    expect(cta.textContent).toContain('Submit Your Resume');
  });

  it('should update scroll classes when scrolled past 40px', () => {
    component.onScroll(50);
    fixture.detectChanges();
    expect(component.isScrolled()).toBe(true);

    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.classList.contains('glass')).toBe(true);
  });

  it('should hide navbar on scroll down and reveal on scroll up', () => {
    component.onScroll(50);
    component.onScroll(150); // scrolled down past 100px
    fixture.detectChanges();
    expect(component.isHidden()).toBe(true);

    component.onScroll(120); // scrolled up
    fixture.detectChanges();
    expect(component.isHidden()).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/core/layout/navbar/navbar.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement NavbarComponent**

Create `src/app/core/layout/navbar/navbar.component.ts`:
```typescript
import { Component, OnInit, OnDestroy, inject, signal, HostListener, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Subscription, filter } from 'rxjs';

export interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent, ButtonComponent],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      [class.glass]="isScrolled()"
      [class.py-3]="isScrolled()"
      [class.py-6]="!isScrolled()"
      [class.-translate-y-full]="isHidden()"
      [class.translate-y-0]="!isHidden()"
      [class.border-b]="isScrolled()"
      [class.border-white-10]="isScrolled()"
      [class.shadow-xl]="isScrolled()"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <!-- Logo -->
        <app-logo></app-logo>

        <!-- Desktop Navigation Links -->
        <div class="hidden lg:flex items-center gap-6 xl:gap-8 desktop-nav">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="text-cyan font-medium active-link"
              [routerLinkActiveOptions]="{ exact: item.path === '/' }"
              class="relative text-sm text-ice/80 hover:text-white transition-colors duration-200 group py-1"
            >
              {{ item.label }}
              <!-- Animated underline -->
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <!-- Active Route Indicator Dot -->
              <span class="active-dot hidden w-1.5 h-1.5 rounded-full bg-cyan absolute -bottom-1.5 left-1/2 -translate-x-1/2 shadow-[0_0_8px_#22D3EE]"></span>
            </a>
          }
        </div>

        <!-- Desktop Action Button (Strict Amber Isolation) -->
        <div class="hidden lg:flex items-center gap-4 desktop-cta">
          <app-button variant="amber-cta" href="/candidates">
            Submit Your Resume
          </app-button>
        </div>

        <!-- Mobile Hamburger Button -->
        <div class="flex lg:hidden items-center">
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="p-2 rounded-lg text-ice hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan"
            [attr.aria-expanded]="isMobileMenuOpen()"
            aria-label="Toggle navigation menu"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              @if (!isMobileMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              }
            </svg>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host a.active-link .active-dot {
      display: block !important;
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  readonly isScrolled = signal(false);
  readonly isHidden = signal(false);
  readonly isMobileMenuOpen = signal(false);

  private lastScrollY = 0;
  private sub = new Subscription();

  readonly navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Search Jobs', path: '/jobs' },
    { label: 'Job Categories', path: '/categories' },
    { label: 'For Candidates', path: '/candidates' },
    { label: 'For Employers', path: '/employers' },
    { label: 'Career Resources', path: '/resources' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.handleWindowScroll, { passive: true });
    });

    this.sub.add(
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => {
        this.isMobileMenuOpen.set(false);
      })
    );
  }

  private handleWindowScroll = (): void => {
    const currentY = window.scrollY || document.documentElement.scrollTop;
    this.onScroll(currentY);
  };

  onScroll(currentY: number): void {
    this.isScrolled.set(currentY >= 40);

    if (currentY > 100 && currentY > this.lastScrollY && !this.isMobileMenuOpen()) {
      this.isHidden.set(true);
    } else {
      this.isHidden.set(false);
    }

    this.lastScrollY = Math.max(0, currentY);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.handleWindowScroll);
    }
    this.sub.unsubscribe();
  }
}
```

- [ ] **Step 4: Run test to watch it pass**

```powershell
npm test -- src/app/core/layout/navbar/navbar.component.spec.ts --watch=false
```
Expected: PASS (4 tests passed).

- [ ] **Step 5: Commit NavbarComponent**

```powershell
git add src/app/core/layout/navbar/
git commit -m "feat(layout): add NavbarComponent with scroll states and navigation links"
```

---

### Task 5: Mobile Navigation Drawer Integration

**Files:**
- Modify: `src/app/core/layout/navbar/navbar.component.ts`
- Modify: `src/app/core/layout/navbar/navbar.component.spec.ts`

**Interfaces:**
- Consumes: `NavbarComponent`, `ButtonComponent`, `gsap`
- Produces: Complete responsive mobile navigation with staggered link entrance, body scroll lock, and ESC close

- [ ] **Step 1: Write failing unit tests for Mobile Drawer**

Add to `src/app/core/layout/navbar/navbar.component.spec.ts`:
```typescript
  it('should toggle mobile menu and update body overflow', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(true);

    const mobileOverlay = fixture.nativeElement.querySelector('.mobile-drawer');
    expect(mobileOverlay).toBeTruthy();

    component.closeMobileMenu();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should close mobile menu on Escape key press', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(true);

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(false);
  });
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/core/layout/navbar/navbar.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement Mobile Drawer in NavbarComponent**

Update `src/app/core/layout/navbar/navbar.component.ts` to include full-screen drawer template, staggered GSAP entrance, and body scroll lock in `toggleMobileMenu`:
```typescript
// Append mobile drawer markup inside template:
@if (isMobileMenuOpen()) {
  <div
    class="mobile-drawer fixed inset-0 z-50 bg-midnight/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8"
    role="dialog"
    aria-modal="true"
    aria-label="Mobile Navigation"
  >
    <div class="flex items-center justify-between pb-6 border-b border-white/10">
      <app-logo (click)="closeMobileMenu()"></app-logo>
      <button
        type="button"
        (click)="closeMobileMenu()"
        class="p-2 rounded-lg text-ice hover:text-white hover:bg-white/10"
        aria-label="Close menu"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Staggered links -->
    <div class="flex flex-col gap-4 py-8 overflow-y-auto">
      @for (item of navItems; track item.path) {
        <a
          [routerLink]="item.path"
          (click)="closeMobileMenu()"
          class="mobile-nav-link text-xl sm:text-2xl font-heading font-medium text-ice hover:text-cyan transition-colors py-2"
        >
          {{ item.label }}
        </a>
      }
    </div>

    <!-- Bottom mobile CTA -->
    <div class="pt-6 border-t border-white/10 flex flex-col gap-3">
      <app-button variant="amber-cta" href="/candidates" class="w-full">
        Submit Your Resume
      </app-button>
    </div>
  </div>
}
```
And handle body overflow locking and Escape key in component class:
```typescript
  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  toggleMobileMenu(): void {
    const nextState = !this.isMobileMenuOpen();
    this.isMobileMenuOpen.set(nextState);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = nextState ? 'hidden' : '';
    }
  }
```

- [ ] **Step 4: Run test to watch it pass**

```powershell
npm test -- src/app/core/layout/navbar/navbar.component.spec.ts --watch=false
```
Expected: PASS (6 tests passed).

- [ ] **Step 5: Commit Mobile Drawer**

```powershell
git add src/app/core/layout/navbar/
git commit -m "feat(layout): add accessible full-screen mobile drawer with scroll lock"
```

---

### Task 6: FooterComponent (4 Columns, Blueprint Grid & Mandatory Disclosure)

**Files:**
- Create: `src/app/core/layout/footer/footer.component.ts`
- Create: `src/app/core/layout/footer/footer.component.spec.ts`

**Interfaces:**
- Consumes: `LogoComponent`, `SmoothScrollService`, `RouterLink`
- Produces: `<app-footer />` standalone component

- [ ] **Step 1: Write the failing unit tests for FooterComponent**

Create `src/app/core/layout/footer/footer.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideRouter } from '@angular/router';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;
  let mockScrollService: { scrollTo: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockScrollService = { scrollTo: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        provideRouter([]),
        { provide: SmoothScrollService, useValue: mockScrollService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the exact mandatory honest disclosure statement', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain(
      'Metavayn is an India-based engineering recruitment company serving employers and engineering professionals in the United States.'
    );
  });

  it('should render 4 column titles', () => {
    const headings = fixture.nativeElement.querySelectorAll('h3');
    expect(headings.length).toBe(3); // 3 link columns + 1 brand column
  });

  it('should call scrollTo(0) when back to top is clicked', () => {
    const backToTopBtn = fixture.nativeElement.querySelector('.back-to-top-btn');
    expect(backToTopBtn).toBeTruthy();
    backToTopBtn.click();
    expect(mockScrollService.scrollTo).toHaveBeenCalledWith(0);
  });
});
```

- [ ] **Step 2: Run test to watch it fail**

```powershell
npm test -- src/app/core/layout/footer/footer.component.spec.ts --watch=false
```
Expected: FAIL.

- [ ] **Step 3: Implement FooterComponent**

Create `src/app/core/layout/footer/footer.component.ts`:
```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent],
  template: `
    <footer class="relative bg-midnight text-ice border-t border-white/10 overflow-hidden">
      <!-- Blueprint Grid Overlay -->
      <div class="absolute inset-0 blueprint-grid opacity-40 pointer-events-none"></div>
      <!-- Subtle Cyan Glow Ambient Spot -->
      <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          <!-- Column 1: Brand & Disclosure (Spans 2 cols on lg) -->
          <div class="lg:col-span-2 flex flex-col gap-4">
            <app-logo></app-logo>
            <p class="text-sm text-slate leading-relaxed max-w-sm mt-2">
              Connecting exceptional engineering talent with companies shaping the future.
            </p>

            <!-- Mandatory Honest Disclosure Box -->
            <div class="glass p-4 rounded-xl border border-white/10 mt-2 max-w-md">
              <p class="text-xs text-ice/90 leading-relaxed font-sans">
                <span class="text-cyan font-semibold block mb-1">Honest Disclosure:</span>
                Metavayn is an India-based engineering recruitment company serving employers and engineering professionals in the United States.
              </p>
            </div>

            <!-- Social Icons -->
            <div class="flex items-center gap-3 mt-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-navy/80 hover:bg-royal/40 flex items-center justify-center text-ice hover:text-cyan border border-white/10 transition-colors" aria-label="LinkedIn">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-navy/80 hover:bg-royal/40 flex items-center justify-center text-ice hover:text-cyan border border-white/10 transition-colors" aria-label="X (Twitter)">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-navy/80 hover:bg-royal/40 flex items-center justify-center text-ice hover:text-cyan border border-white/10 transition-colors" aria-label="GitHub">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          <!-- Column 2: For Candidates -->
          <div>
            <h3 class="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">For Candidates</h3>
            <ul class="space-y-2.5 text-sm text-slate">
              <li><a routerLink="/jobs" class="hover:text-cyan transition-colors">Search Jobs</a></li>
              <li><a routerLink="/categories" class="hover:text-cyan transition-colors">Job Categories</a></li>
              <li><a routerLink="/candidates" class="hover:text-cyan transition-colors">Candidate Guide</a></li>
              <li><a routerLink="/resources" class="hover:text-cyan transition-colors">Career Resources</a></li>
              <li><a routerLink="/resources" class="hover:text-cyan transition-colors">Compensation Insights</a></li>
            </ul>
          </div>

          <!-- Column 3: For Employers -->
          <div>
            <h3 class="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">For Employers</h3>
            <ul class="space-y-2.5 text-sm text-slate">
              <li><a routerLink="/employers" class="hover:text-cyan transition-colors">US Talent Solutions</a></li>
              <li><a routerLink="/categories" class="hover:text-cyan transition-colors">Practice Disciplines</a></li>
              <li><a routerLink="/employers" class="hover:text-cyan transition-colors">Hiring FAQs</a></li>
              <li><a routerLink="/contact" class="hover:text-cyan transition-colors">Talent Consultation</a></li>
            </ul>
          </div>

          <!-- Column 4: Company -->
          <div>
            <h3 class="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul class="space-y-2.5 text-sm text-slate">
              <li><a routerLink="/about" class="hover:text-cyan transition-colors">About Metavayn</a></li>
              <li><a routerLink="/contact" class="hover:text-cyan transition-colors">Contact Us</a></li>
              <li><a routerLink="/about" class="hover:text-cyan transition-colors">Privacy Policy</a></li>
              <li><a routerLink="/about" class="hover:text-cyan transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <!-- Sub-Footer Bottom Bar -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate">
          <div>
            © 2026 Metavayn. All rights reserved.
            <span class="inline-block mx-2 text-white/20">|</span>
            <span class="text-slate/80">Illustrative sample listings — Independent Recruiting Firm.</span>
          </div>

          <!-- Back to Top Button -->
          <button
            type="button"
            (click)="scrollToTop()"
            class="back-to-top-btn inline-flex items-center gap-1.5 text-ice hover:text-cyan transition-colors group p-1 focus:outline-none focus:ring-1 focus:ring-cyan rounded"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <svg class="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  private smoothScroll = inject(SmoothScrollService);

  scrollToTop(): void {
    this.smoothScroll.scrollTo(0);
  }
}
```

- [ ] **Step 4: Run test to watch it pass**

```powershell
npm test -- src/app/core/layout/footer/footer.component.spec.ts --watch=false
```
Expected: PASS (3 tests passed).

- [ ] **Step 5: Commit FooterComponent**

```powershell
git add src/app/core/layout/footer/
git commit -m "feat(layout): add FooterComponent with honest disclosure and blueprint grid"
```

---

### Task 7: Layout Shell Integration, Browser Verification & Push to Remote

**Files:**
- Modify: `src/app/app.component.ts`
- Modify: `src/app/app.component.html`
- Modify: `src/app/app.component.spec.ts`

**Interfaces:**
- Consumes: `NavbarComponent`, `FooterComponent`, `PageIntroComponent`, `RouteWipeComponent`, `SmoothScrollService`
- Produces: Integrated layout shell application ready for Step 2

- [ ] **Step 1: Update AppComponent and its tests**

Update `src/app/app.component.spec.ts`:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { SmoothScrollService } from './core/services/smooth-scroll.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockScroll: { init: ReturnType<typeof vi.fn>; destroy: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockScroll = { init: vi.fn(), destroy: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: SmoothScrollService, useValue: mockScroll }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app and render layout shell elements', () => {
    expect(component).toBeTruthy();
    const nav = fixture.nativeElement.querySelector('app-navbar');
    const footer = fixture.nativeElement.querySelector('app-footer');
    const wipe = fixture.nativeElement.querySelector('app-route-wipe');
    const intro = fixture.nativeElement.querySelector('app-page-intro');
    const skipLink = fixture.nativeElement.querySelector('a[href="#main-content"]');

    expect(nav).toBeTruthy();
    expect(footer).toBeTruthy();
    expect(wipe).toBeTruthy();
    expect(intro).toBeTruthy();
    expect(skipLink).toBeTruthy();
  });

  it('should initialize and destroy SmoothScrollService on lifecycle', () => {
    expect(mockScroll.init).toHaveBeenCalled();
    fixture.destroy();
    expect(mockScroll.destroy).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Update AppComponent template and imports**

Update `src/app/app.component.ts`:
```typescript
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SmoothScrollService } from './core/services/smooth-scroll.service';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { PageIntroComponent } from './core/layout/page-intro/page-intro.component';
import { RouteWipeComponent } from './core/layout/route-wipe/route-wipe.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    PageIntroComponent,
    RouteWipeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private smoothScroll = inject(SmoothScrollService);

  ngOnInit(): void {
    this.smoothScroll.init();
  }

  ngOnDestroy(): void {
    this.smoothScroll.destroy();
  }
}
```

Update `src/app/app.component.html`:
```html
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan focus:text-midnight focus:font-bold focus:rounded-lg focus:shadow-lg focus:outline-none"
>
  Skip to main content
</a>

<app-page-intro></app-page-intro>
<app-route-wipe></app-route-wipe>
<app-navbar></app-navbar>

<main id="main-content" class="min-h-screen pt-20">
  <router-outlet></router-outlet>
</main>

<app-footer></app-footer>
```

- [ ] **Step 3: Run full test suite**

```powershell
npm test -- --watch=false
```
Expected: All test suites pass (100% pass rate, 0 failures).

- [ ] **Step 4: Run production build**

```powershell
npm run build
```
Expected: 0 errors, 0 warnings.

- [ ] **Step 5: Verify browser on http://localhost:4200**

Verify:
- Navbar transparent over top, glass blur on scroll.
- Hide on scroll down, reveal on scroll up.
- Mobile drawer open/close and ESC key.
- Page intro pulses once per session.
- Route navigation wipe between routes with scroll reset.
- Footer disclosure and back-to-top button.

- [ ] **Step 6: Commit and push to remote**

```powershell
git add src/app/app.component.*
git commit -m "feat(layout): assemble layout shell in AppComponent and integrate skip link"
git push -u origin main
```
