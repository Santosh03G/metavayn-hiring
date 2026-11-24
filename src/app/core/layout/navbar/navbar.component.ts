import { Component, OnInit, OnDestroy, HostListener, inject, signal, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Subscription, filter } from 'rxjs';
import { gsap } from 'gsap';

export interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LogoComponent, ButtonComponent],
  template: `
    <!-- Top-level floating header container -->
    <header
      class="fixed top-0 left-0 right-0 z-40 pointer-events-none transition-all duration-300"
      [class.pt-3]="!isScrolled()"
      [class.pt-2]="isScrolled()"
      [class.-translate-y-28]="isHidden()"
      [class.translate-y-0]="!isHidden()"
    >
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <!-- Floating Glass Capsule Navbar -->
        <nav
          class="pointer-events-auto rounded-2xl border transition-all duration-300 flex items-center justify-between"
          [class.glass]="isScrolled()"
          [class.bg-midnight/70]="!isScrolled()"
          [class.bg-midnight/90]="isScrolled()"
          [class.backdrop-blur-2xl]="true"
          [class.border-white/10]="true"
          [class.shadow-[0_12px_40px_rgba(0,0,0,0.55)]]="true"
          [class.border-t-white/20]="true"
          [class.py-2.5]="isScrolled()"
          [class.py-3.5]="!isScrolled()"
          [class.px-4]="true"
          [class.sm:px-6]="true"
        >
          <!-- Left: Logo & Live Status Radar -->
          <div class="flex items-center gap-3 shrink-0">
            <app-logo></app-logo>

            <!-- Live Status Radar Micro-Pill -->
            <div class="radar-badge hidden xl:flex items-center gap-2 pl-3 border-l border-white/10 text-[11px] font-mono text-cyan tracking-wide select-none">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
              </span>
              <span>US Mandates Active</span>
            </div>
          </div>

          <!-- Center: Desktop Navigation Links Capsule -->
          <div class="hidden lg:flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-md desktop-nav">
            @for (item of desktopNavItems; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="text-white bg-white/10 shadow-[0_0_15px_rgba(34,211,238,0.15)] border-white/15 active-link"
                class="relative px-3.5 py-1.5 rounded-lg text-xs font-medium text-ice/80 hover:text-white hover:bg-white/5 transition-all duration-200 whitespace-nowrap border border-transparent flex items-center gap-1.5 group select-none cursor-pointer"
              >
                <span>{{ item.label }}</span>
                <!-- Active Route Indicator Dot -->
                <span class="active-dot hidden w-1 h-1 rounded-full bg-cyan shadow-[0_0_6px_#22D3EE]"></span>
              </a>
            }
          </div>

          <!-- Right: Desktop Action Button (Strict Amber Isolation) -->
          <div class="hidden lg:flex items-center gap-3 shrink-0 desktop-cta">
            <app-button variant="amber-cta" href="/candidates" class="text-xs whitespace-nowrap">
              <span>Submit Your Resume</span>
              <span class="transition-transform duration-200 group-hover:translate-x-0.5 ml-1">→</span>
            </app-button>
          </div>

          <!-- Mobile Hamburger Button -->
          <div class="flex lg:hidden items-center">
            <button
              type="button"
              (click)="toggleMobileMenu()"
              class="p-2 rounded-xl text-ice hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan transition-colors"
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
        </nav>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    @if (isMobileMenuOpen()) {
      <div
        class="mobile-drawer fixed inset-0 z-50 bg-midnight/98 backdrop-blur-2xl flex flex-col justify-between p-5 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <!-- Mobile Drawer Header -->
        <div class="flex items-center justify-between pb-5 border-b border-white/10">
          <app-logo (click)="closeMobileMenu()"></app-logo>
          
          <div class="flex items-center gap-3">
            <!-- Mobile Telemetry Indicator -->
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-[11px] font-mono text-cyan select-none">
              <span class="relative flex h-1.5 w-1.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan"></span>
              </span>
              <span>Active Mandates</span>
            </div>

            <button
              type="button"
              (click)="closeMobileMenu()"
              class="p-2 rounded-xl text-ice hover:text-white bg-white/5 active:scale-95 transition-all"
              aria-label="Close menu"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Staggered Links with Touch-Active Physics -->
        <div class="flex flex-col gap-2 py-5 overflow-y-auto">
          @for (item of mobileNavItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-white/10 text-cyan border-l-2 border-cyan shadow-[0_0_15px_rgba(34,211,238,0.15)] font-semibold"
              [routerLinkActiveOptions]="{ exact: item.path === '/' }"
              (click)="closeMobileMenu()"
              class="mobile-nav-link text-lg sm:text-xl font-heading text-ice/90 hover:text-white py-3 px-3.5 rounded-xl flex items-center justify-between group active:scale-[0.98] active:bg-white/10 transition-all cursor-pointer"
            >
              <span>{{ item.label }}</span>
              <span class="text-xs text-slate group-hover:text-cyan transition-colors">→</span>
            </a>
          }
        </div>

        <!-- Bottom Mobile CTA with Safe Area Handling -->
        <div class="pt-5 border-t border-white/10 flex flex-col gap-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <app-button variant="amber-cta" href="/candidates" class="w-full text-center py-1">
            Submit Your Resume
          </app-button>
          <div class="text-center text-[11px] text-slate font-mono">
            India Operational Hub • Direct US Placement
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host a.active-link .active-dot {
      display: block !important;
    }
    .border-white-10, .border-white\\/10 {
      border-color: rgba(255, 255, 255, 0.1);
    }
    .bg-midnight\\/95 {
      background-color: rgba(10, 19, 48, 0.95);
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

  readonly desktopNavItems: NavItem[] = [
    { label: 'Jobs', path: '/jobs' },
    { label: 'Disciplines', path: '/categories' },
    { label: 'Candidates', path: '/candidates' },
    { label: 'Employers', path: '/employers' },
    { label: 'Resources', path: '/resources' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  readonly mobileNavItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Search Jobs', path: '/jobs' },
    { label: 'Engineering Disciplines', path: '/categories' },
    { label: 'For Candidates', path: '/candidates' },
    { label: 'For Employers', path: '/employers' },
    { label: 'Career Resources', path: '/resources' },
    { label: 'About Metavayn', path: '/about' },
    { label: 'Contact Us', path: '/contact' }
  ];

  // Alias for backward compatibility
  readonly navItems = this.desktopNavItems;

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.handleWindowScroll, { passive: true });
    });

    this.sub.add(
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => {
        this.closeMobileMenu();
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

    if (nextState && isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const links = document.querySelectorAll('.mobile-nav-link');
        if (links.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.fromTo(links, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out' });
        }
      }, 10);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.handleWindowScroll);
      document.body.style.overflow = '';
    }
    this.sub.unsubscribe();
  }
}
