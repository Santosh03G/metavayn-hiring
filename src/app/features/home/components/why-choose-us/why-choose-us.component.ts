import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

export interface Pillar {
  title: string;
  description: string;
  iconSvg: string;
}

@Component({
  selector: 'app-home-why-choose-us',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, RevealDirective],
  template: `
    <section class="py-24 bg-ice text-ink relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <app-section-heading
          badge="Why Metavayn"
          title="Engineered for Technical Precision"
          subtitle="We evaluate calculation sheets and project drawings directly before introducing candidates to US hiring managers"
          theme="light"
          [centered]="true"
        ></app-section-heading>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          @for (pillar of pillars; track pillar.title; let i = $index) {
            <div
              appReveal
              [appRevealDelay]="i * 0.1"
              class="pillar-card bg-white rounded-2xl p-8 sm:p-10 border border-slate/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div class="w-14 h-14 rounded-xl bg-ice flex items-center justify-center text-royal mb-6 group-hover:scale-110 group-hover:bg-royal group-hover:text-white transition-all duration-300">
                  <svg class="w-7 h-7 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2" [innerHTML]="getSafeSvg(pillar.iconSvg)"></svg>
                </div>

                <h3 class="font-heading font-bold text-2xl text-ink mb-3 group-hover:text-royal transition-colors">
                  {{ pillar.title }}
                </h3>
                <p class="text-slate text-base leading-relaxed">
                  {{ pillar.description }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class WhyChooseUsComponent {
  private readonly sanitizer = inject(DomSanitizer);

  getSafeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  readonly pillars: Pillar[] = [
    {
      title: 'Engineering-Focused Recruiting',
      description: 'Our technical team reviews thermal models, FEA meshes, and single-line schematics directly. You interview engineers who already know your software and codes.',
      iconSvg: '<circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>'
    },
    {
      title: 'Aligned Opportunities',
      description: 'Engineers work directly on active American projects with US engineering directors, contributing to real production deliverables every day.',
      iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>'
    },
    {
      title: 'Candidate-First Guidance',
      description: "Candidates receive upfront USD compensation ranges and interview briefings. We don't hide pay rates or push candidates into ill-fitting roles.",
      iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path stroke-linecap="round" stroke-linejoin="round" d="M23 21v-2a4 4 0 00-3-3.87"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 3.13a4 4 0 010 7.75"/>'
    },
    {
      title: 'Strict Confidentiality',
      description: 'We protect your identity and work history under bilateral non-disclosure. Profiles are submitted to employers only after candidate approval.',
      iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>'
    }
  ];
}
