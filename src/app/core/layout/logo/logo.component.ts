import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a routerLink="/" class="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-lg" aria-label="Metavayn Home">
      <div [class]="iconWrapperClasses">
        <svg
          [attr.width]="svgSize"
          [attr.height]="svgSize"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          class="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="meta-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1D4ED8" />
              <stop offset="100%" stop-color="#22D3EE" />
            </linearGradient>
            <linearGradient id="meta-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3B82F6" />
              <stop offset="100%" stop-color="#22D3EE" />
            </linearGradient>
          </defs>
          <!-- Hexagonal outer boundary node -->
          <polygon
            points="18,2 32,10 32,26 18,34 4,26 4,10"
            stroke="url(#meta-grad-1)"
            stroke-width="2.5"
            stroke-linejoin="round"
            fill="rgba(15, 30, 74, 0.4)"
          />
          <!-- Engineering M inner node structure -->
          <path
            d="M10 24V12L18 19L26 12V24"
            stroke="url(#meta-grad-2)"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <!-- Center connectivity pulse dot -->
          <circle cx="18" cy="19" r="2" fill="#22D3EE" class="animate-pulse" />
        </svg>
      </div>

      @if (!iconOnly) {
        <span class="logo-wordmark font-heading font-bold text-white tracking-tight flex items-center" [class]="wordmarkClasses">
          Metavayn
          <span class="w-1.5 h-1.5 rounded-full bg-cyan ml-1 inline-block shadow-[0_0_8px_#22D3EE]"></span>
        </span>
      }
    </a>
  `
})
export class LogoComponent {
  @Input() iconOnly = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get svgSize(): number {
    switch (this.size) {
      case 'sm': return 28;
      case 'lg': return 42;
      default: return 34;
    }
  }

  get iconWrapperClasses(): string {
    return 'relative flex items-center justify-center';
  }

  get wordmarkClasses(): string {
    switch (this.size) {
      case 'sm': return 'text-lg';
      case 'lg': return 'text-2xl';
      default: return 'text-xl';
    }
  }
}
