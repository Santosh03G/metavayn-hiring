import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageIntroComponent } from '../../core/layout/page-intro/page-intro.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { DISCIPLINES } from '../../data/disciplines.data';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PageIntroComponent,
    ButtonComponent,
    TiltCardDirective,
    RevealDirective
  ],
  template: `
    <div class="min-h-screen bg-midnight text-white selection:bg-cyan selection:text-midnight">
      <!-- Page Hero Header -->
      <app-page-intro
        badge="Specialized Practice Areas"
        title="Engineering Disciplines We Staff"
        subtitle="Deep technical recruitment connecting India's top engineering specialists with American infrastructure, manufacturing, and mission-critical programs."
      ></app-page-intro>

      <!-- Visible Page Hero Header -->
      <header class="pt-12 pb-8 md:pt-16 md:pb-10 text-center relative overflow-hidden" appReveal>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-widest mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
            Specialized Practice Areas
          </span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight mb-6">
            Engineering Disciplines We Staff
          </h1>
          <p class="max-w-3xl mx-auto text-base sm:text-lg text-ice/80 leading-relaxed font-normal">
            Deep technical recruitment connecting India's top engineering specialists with American infrastructure, manufacturing, and mission-critical programs.
          </p>
        </div>
      </header>

      <!-- Practice Areas Grid -->
      <section class="py-12 md:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (discipline of disciplines; track discipline.id; let i = $index) {
              <div
                appReveal
                [appRevealDelay]="i * 0.1"
                appTilt
                [maxTilt]="7"
                class="discipline-card glass rounded-2xl p-8 border border-white/10 hover:border-cyan/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              >
                <div>
                  <!-- Icon Header -->
                  <div class="w-14 h-14 rounded-xl bg-navy/80 border border-white/10 flex items-center justify-center text-cyan mb-6 group-hover:scale-110 group-hover:border-cyan/40 transition-all duration-300">
                    <svg class="w-7 h-7 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
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
                        @case ('activity') {
                          <path stroke-linecap="round" stroke-linejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        }
                        @default {
                          <path stroke-linecap="round" stroke-linejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        }
                      }
                    </svg>
                  </div>

                  <h3 class="font-heading font-bold text-2xl text-white mb-3 group-hover:text-cyan transition-colors">
                    {{ discipline.name }}
                  </h3>
                  <p class="text-sm text-ice/80 leading-relaxed mb-6 font-normal">
                    {{ discipline.shortDescription }}
                  </p>

                  <!-- Technical Roles Pills -->
                  <div class="flex flex-wrap gap-1.5 mb-8">
                    @for (role of discipline.roles; track role) {
                      <span class="text-xs bg-navy/80 text-ice/85 border border-white/5 px-2.5 py-1 rounded-md">
                        {{ role }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Footer Explore Link -->
                <a
                  [routerLink]="['/categories', discipline.slug]"
                  class="inline-flex items-center gap-2 text-sm text-cyan font-semibold hover:text-white transition-colors pt-4 border-t border-white/10 group-hover:border-cyan/30"
                >
                  <span>Explore Practice Area</span>
                  <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            }
          </div>

          <!-- Value Callout Banner -->
          <div
            appReveal
            class="mt-20 glass rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden text-center max-w-4xl mx-auto"
          >
            <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan/10 blur-[80px] rounded-full pointer-events-none"></div>
            <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-3">
              Precision Talent Pipeline
            </span>
            <h3 class="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
              Vetted for American Engineering Standards
            </h3>
            <p class="text-sm sm:text-base text-ice/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Every technical candidate in our practice areas undergoes rigorous evaluation across engineering fundamentals, US code compliance, and advanced simulation and CAD toolsets.
            </p>
          </div>

          <!-- Dual Conversion CTA -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <!-- Candidates Panel (Amber Isolated) -->
            <div class="glass rounded-2xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-2">For Engineers</span>
                <h4 class="font-heading font-bold text-xl text-white mb-3">Advance Your Technical Career</h4>
                <p class="text-sm text-ice/80 mb-6">Explore aligned roles with US companies shaping high-growth engineering initiatives.</p>
              </div>
              <div>
                <app-button variant="amber-cta" href="/candidates">Submit Your Resume</app-button>
              </div>
            </div>

            <!-- Employers Panel -->
            <div class="glass rounded-2xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <span class="text-xs font-mono uppercase tracking-widest text-electric font-bold block mb-2">For Employers</span>
                <h4 class="font-heading font-bold text-xl text-white mb-3">Hire Specialized Talent</h4>
                <p class="text-sm text-ice/80 mb-6">Overcome domestic talent shortages with pre-screened Indian engineering specialists.</p>
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
export class CategoriesComponent {
  readonly disciplines = DISCIPLINES;
}
