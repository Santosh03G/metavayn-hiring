import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <div [class]="centered ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'" appReveal>
      @if (eyebrow) {
        <div class="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-royal/20 text-cyan border border-cyan/20">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
          {{ eyebrow }}
        </div>
      }
      <h2 [class]="theme === 'light' ? 'text-ink text-3xl md:text-5xl font-bold tracking-tight font-heading mb-4' : 'text-white text-3xl md:text-5xl font-bold tracking-tight font-heading mb-4'">
        {{ title }}
      </h2>
      @if (subtitle) {
        <p [class]="theme === 'light' ? 'text-slate text-lg md:text-xl font-normal leading-relaxed' : 'text-slate-300 text-lg md:text-xl font-normal leading-relaxed'">
          {{ subtitle }}
        </p>
      }
    </div>
  `
})
export class SectionHeadingComponent {
  @Input() eyebrow?: string;
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() centered = false;
  @Input() theme: 'dark' | 'light' = 'dark';
}
