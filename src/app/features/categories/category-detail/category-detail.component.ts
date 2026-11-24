import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { DISCIPLINES } from '../../../data/disciplines.data';
import { FEATURED_JOBS } from '../../../data/jobs.data';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, RevealDirective],
  template: `
    <div class="min-h-screen bg-midnight text-white selection:bg-cyan selection:text-midnight">
      @if (discipline(); as d) {
        <!-- Breadcrumbs -->
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4" aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-xs font-mono text-ice/75">
            <li>
              <a routerLink="/" class="hover:text-cyan transition-colors">Home</a>
            </li>
            <li class="text-white/30">/</li>
            <li>
              <a routerLink="/categories" class="hover:text-cyan transition-colors">Practice Areas</a>
            </li>
            <li class="text-white/30">/</li>
            <li class="text-cyan font-semibold truncate">{{ d.name }}</li>
          </ol>
        </nav>

        <!-- Hero Section -->
        <section appReveal class="py-12 md:py-20 border-b border-white/10 relative overflow-hidden">
          <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="max-w-4xl">
              <!-- Sector Badge -->
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-widest mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
                Engineering Practice Area
              </span>

              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
                {{ d.name }}
              </h1>
              <p class="text-lg sm:text-xl text-cyan font-medium mb-6 font-sans">
                {{ d.heroSubtitle }}
              </p>
              <p class="text-base sm:text-lg text-ice/80 leading-relaxed font-normal mb-8">
                {{ d.fullOverview }}
              </p>

              <!-- Quick CTAs -->
              <div class="flex flex-wrap items-center gap-4">
                <app-button variant="amber-cta" href="/candidates">
                  Submit Your Resume
                </app-button>
                <app-button variant="ghost" href="/contact">
                  Hire {{ d.name }} Engineers
                </app-button>
              </div>
            </div>
          </div>
        </section>

        <!-- Core Technical Focus -->
        <section appReveal class="py-16 md:py-20 bg-navy/30 border-b border-white/10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-12">
              <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-2">Technical Capabilities</span>
              <h2 class="text-2xl sm:text-3xl font-heading font-bold text-white">Core Technical Focus</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (focus of d.coreFocusAreas; track focus) {
                <div class="focus-pill glass rounded-xl p-6 border border-white/10 flex items-start gap-4 hover:border-cyan/30 transition-all duration-300">
                  <div class="w-8 h-8 rounded-lg bg-navy/80 border border-white/10 flex items-center justify-center text-cyan shrink-0 mt-0.5">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-white mb-1">{{ focus }}</h3>
                    <p class="text-xs text-slate">Vetted for commercial and industrial US program specifications.</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Representative Opportunities -->
        <section appReveal class="py-16 md:py-24">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-2">Sample Roles</span>
                <h2 class="text-2xl sm:text-3xl font-heading font-bold text-white">Representative Opportunities</h2>
              </div>
              <a routerLink="/jobs" class="text-xs font-mono text-cyan hover:underline inline-flex items-center gap-1">
                <span>View all illustrative vacancies</span>
                <span>→</span>
              </a>
            </div>

            <!-- Mandatory Disclaimer Notice -->
            <div class="mb-10 illustrative-disclaimer">
              <p class="text-xs text-slate font-mono bg-navy/60 border border-white/10 rounded-full px-4 py-1.5 inline-block">
                Note: All listings shown below are illustrative representations of client requirements. Metavayn does not publish live vacancies without active mandate agreements.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              @for (job of jobs(); track job.id) {
                <div class="role-card glass rounded-2xl p-7 border border-white/10 hover:border-cyan/40 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-4">
                      <span class="text-xs font-semibold text-cyan uppercase tracking-wider font-sans">{{ job.discipline }}</span>
                      <span class="illustrative-badge text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-electric/20 text-cyan border border-cyan/30">
                        Illustrative listing
                      </span>
                    </div>

                    <h3 class="font-heading font-bold text-xl text-white mb-3 group-hover:text-cyan transition-colors">
                      {{ job.title }}
                    </h3>

                    <div class="space-y-1.5 mb-4 text-xs text-slate">
                      <div>{{ job.location }} ({{ job.workType }})</div>
                      <div class="text-cyan font-medium">{{ job.compensation }}</div>
                    </div>

                    <p class="text-sm text-ice/75 leading-relaxed mb-6 font-normal">
                      {{ job.description }}
                    </p>

                    <div class="flex flex-wrap gap-1.5 mb-6">
                      @for (tag of job.tags; track tag) {
                        <span class="text-xs bg-navy/80 text-ice/85 border border-white/5 px-2.5 py-1 rounded-md">
                          {{ tag }}
                        </span>
                      }
                    </div>
                  </div>

                  <div class="pt-4 border-t border-white/10 flex items-center justify-between">
                    <a [routerLink]="['/jobs', job.id]" class="text-xs text-ice/70 hover:text-cyan transition-colors">View Details</a>
                    <app-button variant="primary" href="/candidates" class="text-xs">Apply Now</app-button>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Discipline Conversion Banner -->
        <section appReveal class="py-16 bg-navy/40 border-t border-white/10">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-3">Take The Next Step</span>
            <h2 class="text-3xl font-heading font-bold text-white mb-4">Advance in {{ d.name }}</h2>
            <p class="text-sm sm:text-base text-ice/80 mb-8 max-w-2xl mx-auto">
              Submit your engineering credentials to be considered for active and upcoming US client mandates in this discipline.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <app-button variant="amber-cta" href="/candidates">
                Submit Your Resume
              </app-button>
              <a routerLink="/categories" class="text-xs text-slate hover:text-white transition-colors">
                ← Browse all practice areas
              </a>
            </div>
          </div>
        </section>
      } @else {
        <!-- 404 Fallback State -->
        <section class="py-32 text-center">
          <div class="max-w-xl mx-auto px-4">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-3">Notice</span>
            <h1 class="text-3xl font-heading font-bold text-white mb-4">Practice Area Not Found</h1>
            <p class="text-sm text-slate mb-8">
              The requested engineering discipline does not exist or may have been renamed.
            </p>
            <a routerLink="/categories" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-electric text-white text-sm font-semibold hover:bg-royal transition-colors">
              <span>View All Practice Areas</span>
              <span>→</span>
            </a>
          </div>
        </section>
      }
    </div>
  `
})
export class CategoryDetailComponent {
  readonly slug = input.required<string>();

  readonly discipline = computed(() => DISCIPLINES.find(d => d.slug === this.slug()));
  readonly jobs = computed(() => FEATURED_JOBS.filter(j => j.disciplineSlug === this.slug()));
}
