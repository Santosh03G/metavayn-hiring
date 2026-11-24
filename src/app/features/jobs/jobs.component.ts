import { Component, OnInit, inject, signal, computed, ViewChild, ElementRef, HostListener } from '@angular/core';
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
          <!-- Live Status Telemetry Badge -->
          <div class="mandate-pulse-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-widest mb-6 select-none">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
            </span>
            <span>US Client Opportunities • Illustrative Mandates</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
            Representative <span class="text-gradient">Engineering Roles</span>
          </h1>
          <p class="text-base sm:text-lg text-ice/80 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
            Explore sample role requirements from active US client mandates across HVAC, Mechanical, Electrical, Data Center, and Simulation engineering disciplines.
          </p>

          <!-- Mandatory Illustrative Disclaimer Notice -->
          <div class="illustrative-disclaimer inline-block">
            <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-navy/60 border border-white/10 text-xs text-ice/85 font-mono backdrop-blur-md">
              <svg class="w-4 h-4 text-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Note: All listings shown below are illustrative representations of client requirements. Metavayn does not publish live vacancies without active mandate agreements.</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Engineering Mandate Cockpit (Search & Segmented Matrix) -->
      <section class="py-8 sm:py-12 relative z-20 -mt-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mandate-cockpit glass-cockpit rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
            
            <!-- Dual Input Command Row -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-3.5 mb-5">
              <!-- Keyword Search -->
              <div class="lg:col-span-7 relative group">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan/70 group-focus-within:text-cyan transition-colors">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                
                <input
                  #searchInput
                  type="text"
                  [value]="searchQuery()"
                  (input)="onSearchInput($event)"
                  placeholder="Search by title, technical skill, or tool (e.g. Revit, FEA, ETAP)..."
                  class="glass-input w-full rounded-xl py-3.5 pl-11 pr-20 text-sm text-white placeholder:text-ice/70 focus:outline-none"
                />

                <div class="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  @if (searchQuery()) {
                    <button
                      type="button"
                      (click)="clearSearch()"
                      class="search-clear-btn p-1 text-ice hover:text-white rounded-md bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label="Clear search query"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  }
                  <kbd class="search-shortcut hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-ice border border-white/20 bg-white/10 select-none pointer-events-none">
                    /
                  </kbd>
                </div>
              </div>

              <!-- Location Search -->
              <div class="lg:col-span-5 relative group">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan/70 group-focus-within:text-cyan transition-colors">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>

                <input
                  type="text"
                  [value]="locationQuery()"
                  (input)="onLocationInput($event)"
                  placeholder="Filter location (e.g. Remote, East Coast)..."
                  class="glass-input w-full rounded-xl py-3.5 pl-11 pr-10 text-sm text-white placeholder:text-ice/70 focus:outline-none"
                />

                @if (locationQuery()) {
                  <button
                    type="button"
                    (click)="clearLocation()"
                    class="location-clear-btn absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-ice hover:text-white rounded-md bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                    aria-label="Clear location filter"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                }
              </div>
            </div>

            <!-- Segmented Discipline Filters (Wrapping grid with zero scrollbars) -->
            <div class="flex flex-wrap items-center gap-2 pt-3 border-t border-white/10">
              <span class="text-xs font-mono uppercase tracking-wider text-cyan font-semibold flex items-center gap-1.5 pr-2">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan inline-block"></span>
                Discipline:
              </span>

              <button
                type="button"
                (click)="setDiscipline('all')"
                class="px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                [class.bg-cyan]="selectedDiscipline() === 'all'"
                [class.text-midnight]="selectedDiscipline() === 'all'"
                [class.shadow-[0_0_15px_rgba(34,211,238,0.35)]]="selectedDiscipline() === 'all'"
                [class.bg-white/10]="selectedDiscipline() !== 'all'"
                [class.hover:bg-white/20]="selectedDiscipline() !== 'all'"
                [class.text-white]="selectedDiscipline() !== 'all'"
                [class.border]="selectedDiscipline() !== 'all'"
                [class.border-white/15]="selectedDiscipline() !== 'all'"
              >
                <span>All Disciplines</span>
                <span class="px-1.5 py-0.5 rounded-full text-[10px] font-bold" [class.bg-midnight/25]="selectedDiscipline() === 'all'" [class.bg-cyan/20]="selectedDiscipline() !== 'all'" [class.text-cyan]="selectedDiscipline() !== 'all'">
                  {{ allJobs.length }}
                </span>
              </button>

              @for (d of disciplines; track d.id) {
                <button
                  type="button"
                  (click)="setDiscipline(d.slug)"
                  class="px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                  [class.bg-cyan]="selectedDiscipline() === d.slug"
                  [class.text-midnight]="selectedDiscipline() === d.slug"
                  [class.shadow-[0_0_15px_rgba(34,211,238,0.35)]]="selectedDiscipline() === d.slug"
                  [class.bg-white/10]="selectedDiscipline() !== d.slug"
                  [class.hover:bg-white/20]="selectedDiscipline() !== d.slug"
                  [class.text-white]="selectedDiscipline() !== d.slug"
                  [class.border]="selectedDiscipline() !== d.slug"
                  [class.border-white/15]="selectedDiscipline() !== d.slug"
                >
                  <span>{{ d.name }}</span>
                  <span class="px-1.5 py-0.5 rounded-full text-[10px] font-bold" [class.bg-midnight/25]="selectedDiscipline() === d.slug" [class.bg-cyan/20]="selectedDiscipline() !== d.slug" [class.text-cyan]="selectedDiscipline() !== d.slug">
                    {{ getJobCountForDiscipline(d.slug) }}
                  </span>
                </button>
              }
            </div>

            <!-- Active Filter Chips & Feedback Bar -->
            <div class="flex flex-wrap items-center justify-between gap-3 pt-4 mt-3 border-t border-white/10 text-xs">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-ice/90">Showing <span class="text-cyan font-bold">{{ filteredJobs().length }}</span> illustrative opportunities</span>

                @if (searchQuery()) {
                  <span class="active-filter-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan/10 border border-cyan/30 text-cyan text-xs">
                    <span>Query: "{{ searchQuery() }}"</span>
                    <button (click)="clearSearch()" class="hover:text-white cursor-pointer">×</button>
                  </span>
                }

                @if (locationQuery()) {
                  <span class="active-filter-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan/10 border border-cyan/30 text-cyan text-xs">
                    <span>Location: "{{ locationQuery() }}"</span>
                    <button (click)="clearLocation()" class="hover:text-white cursor-pointer">×</button>
                  </span>
                }

                @if (selectedDiscipline() !== 'all') {
                  <span class="active-filter-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan/10 border border-cyan/30 text-cyan text-xs">
                    <span>Discipline: {{ getSelectedDisciplineName() }}</span>
                    <button (click)="setDiscipline('all')" class="hover:text-white cursor-pointer">×</button>
                  </span>
                }
              </div>

              @if (hasActiveFilters()) {
                <button
                  type="button"
                  (click)="resetFilters()"
                  class="clear-all-btn text-cyan hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-medium"
                >
                  <span>Reset All Filters</span>
                  <span>↺</span>
                </button>
              }
            </div>

          </div>
        </div>
      </section>

      <!-- Job Cards Grid -->
      <section class="py-12 md:py-20">
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
                    <!-- Header -->
                    <div class="flex items-center justify-between gap-2 mb-4">
                      <span class="text-xs font-semibold text-cyan uppercase tracking-wider font-sans">
                        {{ job.discipline }}
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

  @ViewChild('searchInput') searchInputElement?: ElementRef<HTMLInputElement>;

  readonly allJobs = FEATURED_JOBS;
  readonly disciplines = DISCIPLINES;

  readonly searchQuery = signal<string>('');
  readonly locationQuery = signal<string>('');
  readonly selectedDiscipline = signal<string>('all');

  @HostListener('window:keydown', ['$event'])
  handleKeyboardShortcut(event: KeyboardEvent): void {
    if (event.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      event.preventDefault();
      this.searchInputElement?.nativeElement.focus();
    }
  }

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

  clearSearch(): void {
    this.searchQuery.set('');
  }

  clearLocation(): void {
    this.locationQuery.set('');
  }

  setDiscipline(slug: string): void {
    this.selectedDiscipline.set(slug);
  }

  getJobCountForDiscipline(slug: string): number {
    return this.allJobs.filter(job => job.disciplineSlug === slug).length;
  }

  getSelectedDisciplineName(): string {
    const d = this.disciplines.find(item => item.slug === this.selectedDiscipline());
    return d ? d.name : this.selectedDiscipline();
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
