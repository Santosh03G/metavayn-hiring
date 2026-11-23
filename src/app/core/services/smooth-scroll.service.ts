import { Injectable, inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class SmoothScrollService {
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private lenis: Lenis | null = null;
  private tickerCallback: ((time: number) => void) | null = null;

  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.lenis) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      this.lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      this.tickerCallback = (time: number) => {
        this.lenis?.raf(time * 1000);
      };

      gsap.ticker.add(this.tickerCallback);
      gsap.ticker.lagSmoothing(0);
    });
  }

  scrollTo(target: string | HTMLElement, options?: Record<string, unknown>): void {
    if (this.lenis) {
      this.lenis.scrollTo(target, options);
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView?.({ behavior: 'smooth' });
      } else {
        target.scrollIntoView?.({ behavior: 'smooth' });
      }
    }
  }

  destroy(): void {
    if (this.tickerCallback) {
      gsap.ticker.remove(this.tickerCallback);
      this.tickerCallback = null;
    }
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
  }
}
