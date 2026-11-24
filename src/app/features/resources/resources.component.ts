import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { RESOURCES, RESOURCE_CATEGORIES, ResourceArticle, ResourceCategory } from '../../data/resources.data';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ButtonComponent, TiltCardDirective, RevealDirective],
  template: `
    <div class="min-h-screen bg-midnight text-white selection:bg-cyan selection:text-midnight">
      <!-- Hero Header Section -->
      <section class="py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-royal/15 blur-[140px] rounded-full pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <!-- Breadcrumb Navigation -->
          <nav aria-label="Breadcrumb" class="mb-6">
            <ol class="inline-flex items-center gap-2 text-xs font-mono text-slate">
              <li><a routerLink="/" class="hover:text-cyan transition-colors">Home</a></li>
              <li class="text-white/20">/</li>
              <li class="text-cyan">Resources</li>
            </ol>
          </nav>

          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-widest mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
            Engineering Intelligence & Guides
          </span>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight max-w-4xl mx-auto">
            Technical Whitepapers, US Code Playbooks & Benchmarks
          </h1>

          <p class="text-base sm:text-lg text-ice/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Practical engineering guides, US vs Indian code crosswalks, remote infrastructure playbooks, and compensation intelligence for cross-border engineering teams.
          </p>

          <!-- Interactive Search Bar -->
          <div class="max-w-xl mx-auto relative mb-4">
            <div class="relative">
              <input
                type="text"
                [value]="searchQuery()"
                (input)="onSearch($event)"
                placeholder="Search guides by title, standard (ASHRAE, ASME, NFPA), or keyword..."
                class="w-full bg-navy/60 border border-white/15 rounded-xl pl-11 pr-10 py-3.5 text-sm text-white placeholder-slate focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-colors"
              />
              <svg
                class="w-5 h-5 text-slate absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              @if (searchQuery()) {
                <button
                  type="button"
                  (click)="clearSearch()"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-white p-1"
                  aria-label="Clear search"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Category Filter Tabs & Status Bar -->
      <section class="py-8 border-b border-white/10 bg-navy/20 sticky top-0 z-20 backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <!-- Category Tabs -->
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              @for (cat of categories; track cat.id) {
                <button
                  type="button"
                  (click)="setCategory(cat.id)"
                  class="px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200"
                  [ngClass]="{
                    'bg-cyan text-midnight font-bold shadow-lg shadow-cyan/20': selectedCategory() === cat.id,
                    'bg-navy/50 text-ice/70 hover:text-white hover:bg-navy/80 border border-white/10': selectedCategory() !== cat.id
                  }"
                >
                  {{ cat.name }}
                </button>
              }
            </div>

            <!-- Counter Info -->
            <div class="text-xs font-mono text-slate">
              Showing <span class="text-cyan font-bold">{{ filteredResources().length }}</span> of {{ allResources.length }} technical guides
            </div>
          </div>
        </div>
      </section>

      <!-- Resource Guides Grid Section -->
      <section class="py-16 md:py-20 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          @if (filteredResources().length > 0) {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (article of filteredResources(); track article.id) {
                <article
                  appTilt
                  appReveal
                  class="resource-card bg-navy/40 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan/40 transition-all duration-300 group"
                >
                  <div>
                    <!-- Top Category & Read Time Bar -->
                    <div class="flex items-center justify-between gap-2 mb-4">
                      <span class="text-xs font-mono uppercase tracking-wider text-cyan px-2.5 py-1 rounded bg-cyan/10 border border-cyan/20 font-semibold">
                        {{ article.categoryName }}
                      </span>
                      <span class="text-xs font-mono text-slate flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ article.readTime }}
                      </span>
                    </div>

                    <!-- Title -->
                    <h3 class="text-lg font-bold text-white group-hover:text-cyan transition-colors line-clamp-2 mb-3">
                      {{ article.title }}
                    </h3>

                    <!-- Summary -->
                    <p class="text-sm text-ice/70 leading-relaxed line-clamp-3 mb-6">
                      {{ article.summary }}
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-1.5 mb-6">
                      @for (tag of article.tags; track tag) {
                        <span class="text-[11px] font-mono text-slate bg-navy/80 border border-white/10 px-2 py-0.5 rounded">
                          {{ tag }}
                        </span>
                      }
                    </div>
                  </div>

                  <!-- Footer Meta & Link -->
                  <div class="border-t border-white/10 pt-4 mt-auto flex items-center justify-between text-xs font-mono">
                    <span class="text-slate">
                      {{ article.publishedDate || 'Nov 2026' }}
                    </span>
                    <span class="text-cyan group-hover:underline inline-flex items-center gap-1 font-semibold">
                      Read Guide &rarr;
                    </span>
                  </div>
                </article>
              }
            </div>
          } @else {
            <!-- Empty State -->
            <div class="text-center py-20 bg-navy/30 border border-white/10 rounded-2xl p-8 max-w-lg mx-auto">
              <svg class="w-12 h-12 text-slate mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-xl font-bold text-white mb-2">No Guides Found</h3>
              <p class="text-sm text-ice/70 mb-6">
                No technical articles matched your current query or category filter.
              </p>
              <button
                type="button"
                (click)="resetFilters()"
                class="px-4 py-2 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono font-semibold hover:bg-cyan hover:text-midnight transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          }
        </div>
      </section>

      <!-- Dual Conversion CTA Section -->
      <section class="py-20 relative bg-gradient-to-b from-midnight via-navy/30 to-midnight border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Take the Next Step</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
              Partner with Metavayn
            </h2>
            <p class="text-base text-ice/70 max-w-xl mx-auto">
              Put these technical playbooks and standards into practice across your engineering workflows.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <!-- Employer Panel -->
            <div
              appTilt
              class="bg-navy/50 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-cyan/40 transition-all duration-300 shadow-xl"
            >
              <div>
                <span class="text-xs font-mono uppercase tracking-wider text-cyan px-2.5 py-1 rounded bg-cyan/10 border border-cyan/20 inline-block mb-4">
                  For US Engineering Teams
                </span>
                <h3 class="text-2xl font-bold text-white mb-3">Scale Your Technical Capacity</h3>
                <p class="text-sm text-ice/70 leading-relaxed mb-6">
                  Deploy vetted engineers fluent in ASHRAE, ASME, NFPA, and US CAD/BIM standards directly into your sprint teams.
                </p>
                <ul class="space-y-2 mb-8">
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
                    Permit-ready US code compliance from day one
                  </li>
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
                    4+ hours daily synchronous US working hours overlap
                  </li>
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
                    Immediate access to pre-benchmarked technical talent
                  </li>
                </ul>
              </div>

              <div class="pt-4 border-t border-white/10">
                <app-button variant="primary" href="/employers">
                  Hire Engineering Talent
                </app-button>
              </div>
            </div>

            <!-- Candidate Panel (Strictly isolates amber-cta) -->
            <div
              appTilt
              class="bg-navy/50 border border-amber/30 rounded-2xl p-8 flex flex-col justify-between hover:border-amber/60 transition-all duration-300 shadow-xl"
            >
              <div>
                <span class="text-xs font-mono uppercase tracking-wider text-amber px-2.5 py-1 rounded bg-amber/10 border border-amber/30 inline-block mb-4">
                  For Indian Engineers
                </span>
                <h3 class="text-2xl font-bold text-white mb-3">Advance Your Global Career</h3>
                <p class="text-sm text-ice/70 leading-relaxed mb-6">
                  Work directly on premier US architecture, engineering, and manufacturing infrastructure projects with international compensation.
                </p>
                <ul class="space-y-2 mb-8">
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber"></span>
                    Direct engagements with elite US design practices
                  </li>
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber"></span>
                    USD-benchmarked compensation & rapid career growth
                  </li>
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber"></span>
                    Advanced US codes and standards certification pathways
                  </li>
                </ul>
              </div>

              <div class="pt-4 border-t border-white/10">
                <!-- Strictly isolated Amber CTA: Only candidate resume submission uses variant="amber-cta" -->
                <app-button variant="amber-cta" href="/candidates">
                  Submit Your Resume
                </app-button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ResourcesComponent {
  readonly categories: ResourceCategory[] = RESOURCE_CATEGORIES;
  readonly allResources: ResourceArticle[] = RESOURCES;

  readonly selectedCategory = signal<string>('all');
  readonly searchQuery = signal<string>('');

  readonly filteredResources = computed(() => {
    const category = this.selectedCategory();
    const query = this.searchQuery().trim().toLowerCase();

    return this.allResources.filter(article => {
      const matchesCategory = category === 'all' || article.category === category;
      const matchesQuery =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.categoryName.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  });

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input?.value ?? '');
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  resetFilters(): void {
    this.selectedCategory.set('all');
    this.searchQuery.set('');
  }
}
