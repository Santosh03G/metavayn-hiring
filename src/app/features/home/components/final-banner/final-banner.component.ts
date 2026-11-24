import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-home-final-banner',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, RevealDirective],
  template: `
    <section class="py-24 bg-midnight text-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          appReveal="up"
          class="relative bg-gradient-to-r from-navy/90 via-royal/40 to-navy/90 rounded-3xl p-10 sm:p-16 lg:p-20 border border-cyan/30 text-center shadow-[0_0_50px_rgba(34,211,238,0.2)] overflow-hidden"
        >
          <!-- Blueprint Grid Texture Overlay -->
          <div class="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"></div>
          <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan/15 blur-[120px] rounded-full pointer-events-none"></div>

          <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold mb-4 block">
              Take The Next Step
            </span>
            <h2 class="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
              Ready to Build What's Next?
            </h2>
            <p class="text-base sm:text-lg text-ice/85 mb-10 leading-relaxed font-normal">
              Connect your specialized engineering expertise with companies shaping the future of infrastructure, energy, and advanced manufacturing across the United States.
            </p>

            <!-- Centered Amber Action Button (Strict Amber Isolation) -->
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <app-button variant="amber-cta" href="/candidates">
                Submit Your Resume
              </app-button>
            </div>

            <p class="mt-8 text-xs text-slate">
              Looking to hire engineers?
              <a routerLink="/contact" class="text-cyan underline hover:text-white transition-colors ml-1">
                Consult our talent acquisition team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class FinalBannerComponent {}
