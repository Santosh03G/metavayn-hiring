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
      class="route-wipe-panel fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none -translate-x-full"
      style="background: linear-gradient(90deg, rgba(34, 211, 238, 0) 0%, rgba(29, 78, 216, 0.7) 25%, #22D3EE 80%, #FFFFFF 100%); box-shadow: 0 0 16px #22D3EE, 0 0 32px rgba(34, 211, 238, 0.6);"
      aria-hidden="true"
    >
      <!-- Leading Photon Particle Head -->
      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 -mr-1 rounded-full bg-white blur-[1px] shadow-[0_0_12px_#FFFFFF,0_0_24px_#22D3EE]"></div>
      <!-- Ambient Laser Refraction Veil -->
      <div class="absolute top-[3px] left-0 w-full h-8 bg-gradient-to-b from-cyan/15 to-transparent pointer-events-none"></div>
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
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
