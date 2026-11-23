import { Directive, ElementRef, HostListener, Input, inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltCardDirective {
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  @Input() maxTilt = 8;
  @Input() scale = 1.02;

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -this.maxTilt;
    const rotateY = ((x - centerX) / centerX) * this.maxTilt;

    this.el.nativeElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.scale}, ${this.scale}, ${this.scale})`;
    this.el.nativeElement.style.transition = 'transform 0.1s ease-out';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.el.nativeElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    this.el.nativeElement.style.transition = 'transform 0.4s ease-out';
  }
}
