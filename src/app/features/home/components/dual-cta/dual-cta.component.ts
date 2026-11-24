import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-home-dual-cta',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RevealDirective],
  template: `
    <section class="py-20 bg-midnight text-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Candidates Card (Strict Amber Isolation) -->
          <div
            appReveal
            [appRevealDirection]="'left'"
            class="glass rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-cyan/40 transition-all duration-300"
          >
            <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div>
              <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold block mb-3">
                For Engineering Candidates
              </span>
              <h3 class="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
                Advance Your Engineering Career
              </h3>
              <p class="text-base text-ice/85 leading-relaxed mb-8">
                Connect your engineering expertise with American companies shaping high-growth infrastructure programs. Access competitive compensation, structured interview prep, and technical alignment.
              </p>
            </div>

            <div>
              <app-button variant="amber-cta" href="/candidates">
                Submit Your Resume
              </app-button>
            </div>
          </div>

          <!-- Employers Card -->
          <div
            appReveal
            [appRevealDirection]="'right'"
            class="glass rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-electric/40 transition-all duration-300"
          >
            <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-royal/15 blur-[100px] rounded-full pointer-events-none"></div>

            <div>
              <span class="text-xs font-mono uppercase tracking-widest text-electric font-bold block mb-3">
                For US Employers
              </span>
              <h3 class="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
                Hire Specialized Engineering Talent
              </h3>
              <p class="text-base text-ice/85 leading-relaxed mb-8">
                Overcome technical talent shortages with pre-screened Indian engineering professionals specialized in HVAC, Mechanical, Electrical, and Simulation disciplines.
              </p>
            </div>

            <div>
              <app-button variant="primary" href="/employers">
                Hire Engineering Talent
              </app-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class DualCtaComponent {}
