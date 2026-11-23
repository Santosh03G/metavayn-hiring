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
