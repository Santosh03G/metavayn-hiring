import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { TiltCardDirective } from '../../../../shared/directives/tilt-card.directive';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { DISCIPLINES } from '../../../../data/disciplines.data';

@Component({
  selector: 'app-home-disciplines',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeadingComponent, TiltCardDirective, RevealDirective],
  template: `
    <section class="py-24 bg-midnight text-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <app-section-heading
          badge="Industry Expertise"
          title="Engineering Disciplines We Staff"
          subtitle="Deep domain technical recruitment across America's core engineering and mission-critical infrastructure sectors"
          [centered]="true"
        ></app-section-heading>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
          @for (discipline of disciplines; track discipline.id; let i = $index) {
            <div
              appReveal
              [appRevealDelay]="i * 0.1"
              appTilt
              [maxTilt]="7"
              class="discipline-card glass rounded-2xl p-7 border border-white/10 hover:border-cyan/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              <div>
                <!-- Icon Header -->
                <div class="w-12 h-12 rounded-xl bg-navy/80 border border-white/10 flex items-center justify-center text-cyan mb-5 group-hover:scale-110 group-hover:border-cyan/40 transition-all duration-300">
                  <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                    @switch (discipline.iconName) {
                      @case ('wind') {
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
                      }
                      @case ('cog') {
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                        <circle cx="12" cy="12" r="3"/>
                      }
                      @case ('zap') {
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      }
                      @case ('server') {
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                        <line x1="6" y1="6" x2="6.01" y2="6"/>
                        <line x1="6" y1="18" x2="6.01" y2="18"/>
                      }
                      @default {
                        <path stroke-linecap="round" stroke-linejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      }
                    }
                  </svg>
                </div>

                <h3 class="font-heading font-bold text-xl text-white mb-2 group-hover:text-cyan transition-colors">
                  {{ discipline.name }}
                </h3>
                <p class="text-sm text-ice/75 leading-relaxed mb-6 font-normal">
                  {{ discipline.shortDescription }}
                </p>

                <!-- Key Role Pills -->
                <div class="flex flex-wrap gap-1.5 mb-6">
                  @for (role of discipline.roles; track role) {
                    <span class="text-xs bg-navy/80 text-ice/85 border border-white/5 px-2.5 py-1 rounded-md">
                      {{ role }}
                    </span>
                  }
                </div>
              </div>

              <!-- Footer link -->
              <a
                [routerLink]="['/categories', discipline.slug]"
                class="inline-flex items-center gap-2 text-sm text-cyan font-medium hover:text-white transition-colors pt-4 border-t border-white/10"
              >
                <span>Explore Discipline Roles</span>
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class DisciplinesComponent {
  readonly disciplines = DISCIPLINES;
}
