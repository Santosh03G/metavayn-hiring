import { Component, Input, ElementRef, inject, NgZone, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (href) {
      @if (isExternal) {
        <a
          [href]="href"
          target="_blank"
          rel="noopener noreferrer"
          [class]="buttonClasses"
          [attr.aria-label]="ariaLabel"
        >
          <span #content class="inline-flex items-center gap-2 pointer-events-none">
            <ng-content></ng-content>
          </span>
        </a>
      } @else {
        <a
          [routerLink]="href"
          [class]="buttonClasses"
          [attr.aria-label]="ariaLabel"
        >
          <span #content class="inline-flex items-center gap-2 pointer-events-none">
            <ng-content></ng-content>
          </span>
        </a>
      }
    } @else {
      <button
        [type]="type"
        [disabled]="disabled"
        [class]="buttonClasses"
        [attr.aria-label]="ariaLabel"
      >
        <span #content class="inline-flex items-center gap-2 pointer-events-none">
          <ng-content></ng-content>
        </span>
      </button>
    }
  `
})
export class ButtonComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  @Input() variant: 'primary' | 'ghost' | 'amber-cta' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() href?: string;
  @Input() isExternal = false;
  @Input() ariaLabel?: string;

  private quickToX?: (n: number) => void;
  private quickToY?: (n: number) => void;
  private mouseMoveHandler?: (e: MouseEvent) => void;
  private mouseLeaveHandler?: () => void;

  get buttonClasses(): string {
    const base = 'relative inline-flex items-center justify-center font-semibold rounded-xl px-6 py-3 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';
    
    switch (this.variant) {
      case 'amber-cta':
        return `${base} bg-amber text-midnight font-bold glow-amber hover:brightness-110 active:scale-95`;
      case 'ghost':
        return `${base} bg-transparent text-white border border-white/20 hover:border-cyan hover:text-cyan active:scale-95`;
      case 'primary':
      default:
        return `${base} bg-royal text-white hover:bg-electric glow-cyan active:scale-95`;
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.ngZone.runOutsideAngular(() => {
      const container = this.el.nativeElement.querySelector('button, a');
      if (!container) return;

      this.quickToX = gsap.quickTo(container, 'x', { duration: 0.3, ease: 'power2.out' });
      this.quickToY = gsap.quickTo(container, 'y', { duration: 0.3, ease: 'power2.out' });

      this.mouseMoveHandler = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const distCenterRelX = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
        const distCenterRelY = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
        this.quickToX?.(distCenterRelX);
        this.quickToY?.(distCenterRelY);
      };

      this.mouseLeaveHandler = () => {
        this.quickToX?.(0);
        this.quickToY?.(0);
      };

      container.addEventListener('mousemove', this.mouseMoveHandler);
      container.addEventListener('mouseleave', this.mouseLeaveHandler);
    });
  }

  ngOnDestroy(): void {
    const container = this.el.nativeElement.querySelector('button, a');
    if (container) {
      if (this.mouseMoveHandler) container.removeEventListener('mousemove', this.mouseMoveHandler);
      if (this.mouseLeaveHandler) container.removeEventListener('mouseleave', this.mouseLeaveHandler);
    }
  }
}
