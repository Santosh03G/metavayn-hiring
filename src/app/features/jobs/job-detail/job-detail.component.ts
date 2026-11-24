import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { FEATURED_JOBS } from '../../../data/jobs.data';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, RevealDirective],
  template: `
    <div class="min-h-screen bg-midnight text-white selection:bg-cyan selection:text-midnight">
      @if (job(); as j) {
        <!-- Breadcrumbs -->
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4" aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-xs font-mono text-slate">
            <li>
              <a routerLink="/" class="hover:text-cyan transition-colors">Home</a>
            </li>
            <li class="text-white/30">/</li>
            <li>
              <a routerLink="/jobs" class="hover:text-cyan transition-colors">Job Openings</a>
            </li>
            <li class="text-white/30">/</li>
            <li class="text-cyan font-semibold truncate">{{ j.title }}</li>
          </ol>
        </nav>

        <!-- Role Hero -->
        <section appReveal class="py-12 md:py-16 border-b border-white/10 relative overflow-hidden">
          <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div class="max-w-3xl">
                <!-- Badges Row -->
                <div class="flex flex-wrap items-center gap-3 mb-4">
                  <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20">
                    {{ j.discipline }}
                  </span>
                  <span class="illustrative-badge text-[11px] font-mono px-3 py-1 rounded-full bg-electric/20 text-cyan border border-cyan/30">
                    Illustrative listing
                  </span>
                </div>

                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 tracking-tight">
                  {{ j.title }}
                </h1>

                <!-- Meta Details -->
                <div class="flex flex-wrap items-center gap-6 text-sm text-slate mb-6">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{{ j.location }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span>{{ j.workType }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-cyan font-semibold">
                    <svg class="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ j.compensation }}</span>
                  </div>
                </div>

                <p class="text-base text-ice/80 leading-relaxed font-normal mb-8">
                  {{ j.description }}
                </p>

                <!-- Technical Tag Pills -->
                <div class="flex flex-wrap gap-2">
                  @for (tag of j.tags; track tag) {
                    <span class="text-xs bg-navy/80 text-ice/85 border border-white/5 px-3 py-1 rounded-md">
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>

              <!-- Quick Apply Card -->
              <div class="glass rounded-2xl p-6 sm:p-8 border border-white/10 lg:w-80 shrink-0 flex flex-col justify-between">
                <div>
                  <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-2">Apply Directly</span>
                  <h3 class="font-heading font-bold text-lg text-white mb-3">Interested in this role?</h3>
                  <p class="text-xs text-slate mb-6">
                    Submit your credentials to our recruitment team to be considered for client mandates matching this specification.
                  </p>
                </div>
                <div>
                  <app-button variant="amber-cta" [href]="'/candidates?role=' + j.id" class="w-full text-center">
                    Submit Your Resume
                  </app-button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Mandatory Disclaimer Notice -->
        <section class="py-6 bg-navy/40 border-b border-white/10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 illustrative-disclaimer">
            <p class="text-xs text-slate font-mono">
              Notice: All listings shown below are illustrative representations of client requirements from active US client engagements. Metavayn operates as an engineering recruitment firm; all roles are subject to direct client interview coordination and candidate qualifications.
            </p>
          </div>
        </section>

        <!-- Role Specification Body -->
        <section class="py-16 md:py-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <!-- Left 2 Cols: Responsibilities & Qualifications -->
              <div class="lg:col-span-2 space-y-12">
                <!-- Responsibilities -->
                <div>
                  <h2 class="text-xl sm:text-2xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-cyan"></span>
                    <span>Key Responsibilities</span>
                  </h2>
                  <ul class="space-y-3">
                    @for (item of j.responsibilities; track item) {
                      <li class="flex items-start gap-3 text-sm text-ice/80 leading-relaxed">
                        <span class="text-cyan font-bold mt-0.5">›</span>
                        <span>{{ item }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Qualifications -->
                <div>
                  <h2 class="text-xl sm:text-2xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-cyan"></span>
                    <span>Required Technical Qualifications</span>
                  </h2>
                  <ul class="space-y-3">
                    @for (qual of j.qualifications; track qual) {
                      <li class="flex items-start gap-3 text-sm text-ice/80 leading-relaxed">
                        <span class="text-cyan font-bold mt-0.5">›</span>
                        <span>{{ qual }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>

              <!-- Right Col: Tooling & Code Compliance -->
              <div class="space-y-8">
                <!-- Software Matrix -->
                <div class="glass rounded-2xl p-6 border border-white/10">
                  <h3 class="font-heading font-bold text-base text-white mb-4">Engineering Software & Tooling</h3>
                  <div class="flex flex-wrap gap-2">
                    @for (tool of j.preferredTools; track tool) {
                      <span class="text-xs font-mono bg-navy/80 text-cyan border border-cyan/20 px-3 py-1 rounded-md">
                        {{ tool }}
                      </span>
                    }
                  </div>
                </div>

                <!-- US Codes & Standards -->
                <div class="glass rounded-2xl p-6 border border-white/10">
                  <h3 class="font-heading font-bold text-base text-white mb-4">US Code & Standard Compliance</h3>
                  <ul class="space-y-2">
                    @for (code of j.relevantCodes; track code) {
                      <li class="text-xs text-ice/80 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan shrink-0"></span>
                        <span>{{ code }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Bottom Sticky Candidate CTA -->
                <div class="glass rounded-2xl p-6 border border-white/10 text-center">
                  <p class="text-xs text-slate mb-4">Ready to be matched with US opportunities like this?</p>
                  <app-button variant="amber-cta" [href]="'/candidates?role=' + j.id" class="w-full">
                    Submit Your Resume
                  </app-button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Related Opportunities -->
        @if (relatedJobs().length > 0) {
          <section class="py-16 bg-navy/30 border-t border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-xl sm:text-2xl font-heading font-bold text-white">Similar Engineering Opportunities</h2>
                <a routerLink="/jobs" class="text-xs font-mono text-cyan hover:underline">View all openings →</a>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                @for (related of relatedJobs(); track related.id) {
                  <div class="glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div class="flex items-center justify-between gap-2 mb-2">
                        <span class="text-xs text-cyan uppercase font-semibold">{{ related.discipline }}</span>
                        <span class="illustrative-badge text-[10px] font-mono px-2 py-0.5 rounded bg-electric/20 text-cyan">
                          Illustrative listing
                        </span>
                      </div>
                      <h3 class="font-heading font-bold text-lg text-white mb-2">{{ related.title }}</h3>
                      <p class="text-xs text-slate mb-4">{{ related.compensation }} • {{ related.location }}</p>
                    </div>
                    <div>
                      <a [routerLink]="['/jobs', related.id]" class="text-xs text-cyan hover:underline">View Role Details →</a>
                    </div>
                  </div>
                }
              </div>
            </div>
          </section>
        }
      } @else {
        <!-- 404 Fallback -->
        <section class="py-32 text-center">
          <div class="max-w-xl mx-auto px-4">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-3">Notice</span>
            <h1 class="text-3xl font-heading font-bold text-white mb-4">Opportunity Not Found</h1>
            <p class="text-sm text-slate mb-8">
              The requested illustrative engineering role does not exist or has been updated.
            </p>
            <a routerLink="/jobs" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-electric text-white text-sm font-semibold hover:bg-royal transition-colors">
              <span>View All Opportunities</span>
              <span>→</span>
            </a>
          </div>
        </section>
      }
    </div>
  `
})
export class JobDetailComponent {
  readonly id = input.required<string>();

  readonly job = computed(() => FEATURED_JOBS.find(j => j.id === this.id()));
  readonly relatedJobs = computed(() => {
    const current = this.job();
    if (!current) return [];
    return FEATURED_JOBS.filter(j => j.disciplineSlug === current.disciplineSlug && j.id !== current.id);
  });
}
