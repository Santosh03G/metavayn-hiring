import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { FEATURED_JOBS } from '../../../../data/jobs.data';

@Component({
  selector: 'app-home-featured-roles',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeadingComponent, ButtonComponent, RevealDirective],
  template: `
    <section class="py-24 bg-midnight text-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <app-section-heading
          badge="Sample Opportunities"
          title="Featured Engineering Roles"
          subtitle="Representative positions demonstrating technical requirements from our active US client network"
          [centered]="true"
        ></app-section-heading>

        <!-- Mandatory Disclaimer Notice -->
        <div class="max-w-3xl mx-auto mt-4 mb-14 text-center">
          <p class="text-xs text-ice/85 font-mono bg-navy/75 border border-white/15 rounded-full px-5 py-2 inline-block backdrop-blur-md shadow-md shadow-black/20">
            Note: All listings shown below are illustrative representations of client requirements. Metavayn does not publish live vacancies without active mandate agreements.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          @for (job of jobs; track job.id; let i = $index) {
            <div
              appReveal
              [appRevealDirection]="'up'"
              [appRevealDelay]="i * 0.1"
              class="role-card glass rounded-2xl p-7 border border-white/10 hover:border-cyan/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              <div>
                <!-- Header with Illustrative Badge -->
                <div class="flex items-center justify-between gap-2 mb-4">
                  <span class="text-xs font-semibold text-cyan uppercase tracking-wider font-sans">
                    {{ job.discipline }}
                  </span>
                  <span class="illustrative-badge text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-electric/20 text-cyan border border-cyan/30">
                    Illustrative listing
                  </span>
                </div>

                <h3 class="font-heading font-bold text-2xl text-white mb-3 group-hover:text-cyan transition-colors">
                  {{ job.title }}
                </h3>

                <!-- Meta Details -->
                <div class="space-y-2 mb-4 text-xs text-slate">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{{ job.location }} ({{ job.workType }})</span>
                  </div>
                  <div class="flex items-center gap-2 text-cyan font-medium">
                    <svg class="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ job.compensation }}</span>
                  </div>
                </div>

                <p class="text-sm text-ice/75 leading-relaxed mb-6 font-normal">
                  {{ job.description }}
                </p>

                <!-- Technical Skill Tags -->
                <div class="flex flex-wrap gap-1.5 mb-6">
                  @for (tag of job.tags; track tag) {
                    <span class="text-xs bg-navy/80 text-ice/85 border border-white/5 px-2.5 py-1 rounded-md">
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>

              <!-- Action -->
              <div class="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  [routerLink]="['/jobs', job.id]"
                  class="text-xs text-ice/70 hover:text-cyan transition-colors"
                >
                  View Details
                </a>
                <app-button variant="primary" href="/candidates" class="text-xs">
                  Apply Now
                </app-button>
              </div>
            </div>
          }
        </div>

        <!-- View All Roles CTA -->
        <div class="mt-14 text-center">
          <app-button variant="ghost" href="/jobs">
            View All Job Openings
          </app-button>
        </div>
      </div>
    </section>
  `
})
export class FeaturedRolesComponent {
  readonly jobs = FEATURED_JOBS.slice(0, 3);
}
