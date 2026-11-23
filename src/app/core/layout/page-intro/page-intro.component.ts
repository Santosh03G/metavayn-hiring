import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ElementRef,
  PLATFORM_ID,
  viewChild,
  NgZone
} from '@angular/core';
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
  private ngZone = inject(NgZone);
  readonly isVisible = signal(false);

  private overlayRef = viewChild<ElementRef<HTMLElement>>('overlay');
  private contentRef = viewChild<ElementRef<HTMLElement>>('content');
  private timeline: gsap.core.Timeline | null = null;
  private animTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const seen = sessionStorage.getItem('metavayn_intro_seen');
    const prefersReducedMotion =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    if (seen === 'true' || prefersReducedMotion) {
      this.isVisible.set(false);
      return;
    }

    sessionStorage.setItem('metavayn_intro_seen', 'true');
    this.isVisible.set(true);

    this.animTimer = setTimeout(() => {
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

    this.ngZone.runOutsideAngular(() => {
      this.timeline = gsap.timeline({
        onComplete: () => {
          this.ngZone.run(() => {
            this.isVisible.set(false);
          });
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
    });
  }

  ngOnDestroy(): void {
    if (this.animTimer) {
      clearTimeout(this.animTimer);
      this.animTimer = null;
    }
    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }
  }
}
