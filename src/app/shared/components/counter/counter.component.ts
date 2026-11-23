import { Component, Input, ElementRef, inject, NgZone, PLATFORM_ID, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="font-heading font-bold text-3xl md:text-5xl text-white">
      {{ prefix }}{{ displayValue() }}{{ suffix }}
    </span>
  `
})
export class CounterComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  @Input({ required: true }) targetValue!: number;
  @Input() duration = 2;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() decimals = 0;

  displayValue = signal<string>('0');
  private tween: gsap.core.Tween | null = null;
  private trigger: ScrollTrigger | null = null;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.displayValue.set(this.targetValue.toFixed(this.decimals));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.displayValue.set(this.targetValue.toFixed(this.decimals));
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const obj = { val: 0 };
      this.tween = gsap.to(obj, {
        val: this.targetValue,
        duration: this.duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.el.nativeElement,
          start: 'top 85%',
          once: true,
          onRefresh: (self) => {
            this.trigger = self;
          }
        },
        onUpdate: () => {
          this.ngZone.run(() => {
            this.displayValue.set(obj.val.toFixed(this.decimals));
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.tween?.kill();
    this.trigger?.kill();
  }
}
