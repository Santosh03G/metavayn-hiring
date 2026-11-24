import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { FEATURED_JOBS, JobListing } from '../../data/jobs.data';
import { DISCIPLINES } from '../../data/disciplines.data';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, TiltCardDirective, RevealDirective],
  template: `
    <div class="min-h-screen bg-midnight text-white selection:bg-cyan selection:text-midnight">
      <!-- Hero Header -->
      <section class="py-16 md:py-20 border-b border-white/10 relative overflow-hidden">
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-widest mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
            US Client Opportunities
          </span>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
            Representative Engineering Roles
          </h1>
          <p class="text-base sm:text-lg text-ice/80 max-w-2xl mx-auto leading-relaxed mb-6">
            Explore sample role requirements from active US client mandates across HVAC, Mechanical, Electrical, Data Center, and Simulation sectors.
          </p>

          <!-- Mandatory Illustrative Disclaimer Notice -->
          <div class="illustrative-disclaimer inline-block">
            <p class="text-xs text-slate font-mono bg-navy/60 border border-white/10 rounded-full px-4 py-1.5">
              Note: All listings shown below are illustrative representations of client requirements. Metavayn does not publish live vacancies without active mandate agreements.
            </p>
          </div>
        </div>
      </section>

      <!-- Search & Multi-Filter Controls -->
      <section class="py-10 bg-navy/40 border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col gap-6">
            <!-- Search & Location Row -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Keyword Search -->
              <div class="relative md:col-span-2">
                <input
                  type="text"
                  [value]="searchQuery()"
                  (input)="onSearchInput($event)"
                  placeholder="Search by title, technical skill, or tool (e.g. Revit, FEA, ETAP)..."
                  class="w-full bg-navy/80 border border-white/15 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-slate focus:outline-none focus:border-cyan transition-colors"
                />
                <svg class="w-5 h-5 text-slate absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>

              <!-- Location Search -->
              <div class="relative">
                <input
                  type="text"
                  [value]="locationQuery()"
                  (input)="onLocationInput($event)"
                  placeholder="Location (e.g. Remote, East Coast)..."
                  class="w-full bg-navy/80 border border-white/15 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-slate focus:outline-none focus:border-cyan transition-colors"
                />
                <svg class="w-5 h-5 text-slate absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
            </div>

            <!-- Discipline Filter Pills -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                (click)="setDiscipline('all')"
                class="px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer"
                [class.bg-cyan]="selectedDiscipline() === 'all'"
                [class.text-midnight]="selectedDiscipline() === 'all'"
                [class.bg-navy/80]="selectedDiscipline() !== 'all'"
                [class.text-ice]="selectedDiscipline() !== 'all'"
                [class.border]="selectedDiscipline() !== 'all'"
                [class.border-white/10]="selectedDiscipline() !== 'all'"
              >
                All Disciplines ({{ allJobs.length }})
              </button>

              @for (d of disciplines; track d.id) {
                <button
                  type="button"
                  (click)="setDiscipline(d.slug)"
                  class="px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer"
                  [class.bg-cyan]="selectedDiscipline() === d.slug"
                  [class.text-midnight]="selectedDiscipline() === d.slug"
                  [class.bg-navy/80]="selectedDiscipline() !== d.slug"
                  [class.text-ice]="selectedDiscipline() !== d.slug"
                  [class.border]="selectedDiscipline() !== d.slug"
                  [class.border-white/10]="selectedDiscipline() !== d.slug"
                >
                  {{ d.name }}
                </button>
              }
            </div>

            <!-- Results Counter -->
            <div class="flex items-center justify-between text-xs text-slate">
              <span>Showing {{ filteredJobs().length }} illustrative opportunities</span>
              @if (hasActiveFilters()) {
                <button
                  type="button"
                  (click)="resetFilters()"
                  class="text-cyan hover:underline cursor-pointer"
                >
                  Clear all filters
                </button>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Job Cards Grid -->
      <section class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          @if (filteredJobs().length > 0) {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (job of filteredJobs(); track job.id; let i = $index) {
                <div
                  appReveal
                  [appRevealDelay]="i * 0.05"
                  appTilt
                  [maxTilt]="5"
                  class="job-card glass rounded-2xl p-7 border border-white/10 hover:border-cyan/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
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

                    <h3 class="font-heading font-bold text-xl text-white mb-3 group-hover:text-cyan transition-colors">
                      {{ job.title }}
                    </h3>

                    <!-- Meta Details -->
                    <div class="space-y-1.5 mb-4 text-xs text-slate">
                      <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-slate shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>{{ job.location }} ({{ job.workType }})</span>
                      </div>
                      <div class="flex items-center gap-2 text-cyan font-medium">
                        <svg class="w-4 h-4 text-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                  <!-- Actions -->
                  <div class="pt-4 border-t border-white/10 flex items-center justify-between">
                    <a
                      [routerLink]="['/jobs', job.id]"
                      class="text-xs text-ice/70 hover:text-cyan transition-colors"
                    >
                      View Details →
                    </a>
                    <app-button variant="primary" [href]="'/candidates?role=' + job.id" class="text-xs">
                      Apply Now
                    </app-button>
                  </div>
                </div>
              }
            </div>
          } @else {
            <!-- Empty State Notice -->
            <div class="empty-state text-center py-20 glass rounded-3xl p-8 max-w-xl mx-auto border border-white/10">
              <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-3">No Results</span>
              <h3 class="text-2xl font-heading font-bold text-white mb-3">No matching opportunities found</h3>
              <p class="text-sm text-slate mb-6">
                Try adjusting your search query, location filter, or switching to "All Disciplines".
              </p>
              <button
                type="button"
                (click)="resetFilters()"
                class="px-5 py-2 rounded-lg bg-electric text-white text-xs font-semibold hover:bg-royal transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          }

          <!-- Dual Conversion CTA -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            <!-- Candidate Panel (Amber Isolated) -->
            <div class="glass rounded-2xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-2">General Intake</span>
                <h4 class="font-heading font-bold text-xl text-white mb-3">Don't see your exact role?</h4>
                <p class="text-sm text-ice/80 mb-6">
                  Submit your engineering credentials to our talent network. We match candidates continuously as active client mandates arrive.
                </p>
              </div>
              <div>
                <app-button variant="amber-cta" href="/candidates">Submit Your Resume</app-button>
              </div>
            </div>

            <!-- Employer Panel -->
            <div class="glass rounded-2xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono uppercase tracking-widest text-electric font-bold block mb-2">Hiring Teams</span>
                <h4 class="font-heading font-bold text-xl text-white mb-3">Building an engineering team?</h4>
                <p class="text-sm text-ice/80 mb-6">
                  Connect with specialized Indian engineers vetted for American infrastructure, manufacturing, and simulation standards.
                </p>
              </div>
              <div>
                <app-button variant="primary" href="/employers">Hire Engineering Talent</app-button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class JobsComponent implements OnInit {
  private route = inject(ActivatedRoute);

  readonly allJobs = FEATURED_JOBS;
  readonly disciplines = DISCIPLINES;

  readonly searchQuery = signal<string>('');
  readonly locationQuery = signal<string>('');
  readonly selectedDiscipline = signal<string>('all');

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['q']) this.searchQuery.set(params['q']);
      if (params['location']) this.locationQuery.set(params['location']);
      if (params['discipline']) this.selectedDiscipline.set(params['discipline']);
    });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onLocationInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.locationQuery.set(input.value);
  }

  setDiscipline(slug: string): void {
    this.selectedDiscipline.set(slug);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.locationQuery.set('');
    this.selectedDiscipline.set('all');
  }

  hasActiveFilters = computed(() => {
    return this.searchQuery().trim().length > 0 ||
           this.locationQuery().trim().length > 0 ||
           this.selectedDiscipline() !== 'all';
  });

  filteredJobs = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const loc = this.locationQuery().trim().toLowerCase();
    const disc = this.selectedDiscipline();

    return this.allJobs.filter(job => {
      const matchesDiscipline = disc === 'all' || job.disciplineSlug === disc;
      const matchesLocation = !loc || job.location.toLowerCase().includes(loc);
      const matchesSearch = !q ||
        job.title.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.tags.some(tag => tag.toLowerCase().includes(q));

      return matchesDiscipline && matchesLocation && matchesSearch;
    });
  });
}
