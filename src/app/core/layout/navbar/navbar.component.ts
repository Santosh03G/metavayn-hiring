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

    <!-- Mobile Drawer Overlay -->
    @if (isMobileMenuOpen()) {
      <div
        class="mobile-drawer fixed inset-0 z-50 bg-midnight/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div class="flex items-center justify-between pb-6 border-b border-white-10">
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
        <div class="pt-6 border-t border-white-10 flex flex-col gap-3">
          <app-button variant="amber-cta" href="/candidates" class="w-full">
            Submit Your Resume
          </app-button>
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
