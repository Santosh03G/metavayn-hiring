import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  inject,
  NgZone,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  @Input() appRevealDelay = 0;
  @Input() appRevealDuration = 0.7;
  @Input() appRevealStagger = 0;
  @Input() appRevealDirection: 'up' | 'down' | 'left' | 'right' = 'up';

  private trigger: ScrollTrigger | null = null;
  private tween: gsap.core.Tween | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.el.nativeElement.style.opacity = '1';
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      let xOffset = 0;
      let yOffset = 0;

      if (this.appRevealDirection === 'up') yOffset = 24;
      else if (this.appRevealDirection === 'down') yOffset = -24;
      else if (this.appRevealDirection === 'left') xOffset = 24;
      else if (this.appRevealDirection === 'right') xOffset = -24;

      this.tween = gsap.fromTo(
        this.el.nativeElement,
        { opacity: 0, x: xOffset, y: yOffset },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: this.appRevealDuration,
          delay: this.appRevealDelay,
          stagger: this.appRevealStagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.el.nativeElement,
            start: 'top 85%',
            once: true,
            onRefresh: (self) => {
              this.trigger = self;
            }
          }
        }
      );

      this.trigger = (this.tween as unknown as { scrollTrigger?: ScrollTrigger })?.scrollTrigger ?? this.trigger;
    });
  }

  ngOnDestroy(): void {
    this.tween?.kill();
    this.trigger?.kill();
  }
}
