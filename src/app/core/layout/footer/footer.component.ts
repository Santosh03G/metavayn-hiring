import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent],
  template: `
    <footer class="relative bg-midnight text-ice border-t border-white/10 overflow-hidden">
      <!-- Blueprint Grid Overlay -->
      <div class="absolute inset-0 blueprint-grid opacity-40 pointer-events-none"></div>
      <!-- Subtle Cyan Glow Ambient Spot -->
      <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          <!-- Column 1: Brand & Disclosure (Spans 2 cols on lg) -->
          <div class="lg:col-span-2 flex flex-col gap-4">
            <app-logo></app-logo>
            <p class="text-sm text-slate leading-relaxed max-w-sm mt-2">
              Connecting exceptional engineering talent with companies shaping the future.
            </p>

            <!-- Mandatory Honest Disclosure Box -->
            <div class="glass p-4 rounded-xl border border-white/10 mt-2 max-w-md">
              <p class="text-xs text-ice/90 leading-relaxed font-sans">
                <span class="text-cyan font-semibold block mb-1">Honest Disclosure:</span>
                Metavayn is an India-based engineering recruitment company serving employers and engineering professionals in the United States.
              </p>
            </div>

            <!-- Social Icons -->
            <div class="flex items-center gap-3 mt-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-navy/80 hover:bg-royal/40 flex items-center justify-center text-ice hover:text-cyan border border-white/10 transition-colors" aria-label="LinkedIn">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-navy/80 hover:bg-royal/40 flex items-center justify-center text-ice hover:text-cyan border border-white/10 transition-colors" aria-label="X (Twitter)">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-navy/80 hover:bg-royal/40 flex items-center justify-center text-ice hover:text-cyan border border-white/10 transition-colors" aria-label="GitHub">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          <!-- Column 2: For Candidates -->
          <div>
            <h3 class="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">For Candidates</h3>
            <ul class="space-y-2.5 text-sm text-slate">
              <li><a routerLink="/jobs" class="hover:text-cyan transition-colors">Search Jobs</a></li>
              <li><a routerLink="/categories" class="hover:text-cyan transition-colors">Job Categories</a></li>
              <li><a routerLink="/candidates" class="hover:text-cyan transition-colors">Candidate Guide</a></li>
              <li><a routerLink="/resources" class="hover:text-cyan transition-colors">Career Resources</a></li>
              <li><a routerLink="/resources" class="hover:text-cyan transition-colors">Compensation Insights</a></li>
            </ul>
          </div>

          <!-- Column 3: For Employers -->
          <div>
            <h3 class="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">For Employers</h3>
            <ul class="space-y-2.5 text-sm text-slate">
              <li><a routerLink="/employers" class="hover:text-cyan transition-colors">US Talent Solutions</a></li>
              <li><a routerLink="/categories" class="hover:text-cyan transition-colors">Practice Disciplines</a></li>
              <li><a routerLink="/employers" class="hover:text-cyan transition-colors">Hiring FAQs</a></li>
              <li><a routerLink="/contact" class="hover:text-cyan transition-colors">Talent Consultation</a></li>
            </ul>
          </div>

          <!-- Column 4: Company -->
          <div>
            <h3 class="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul class="space-y-2.5 text-sm text-slate">
              <li><a routerLink="/about" class="hover:text-cyan transition-colors">About Metavayn</a></li>
              <li><a routerLink="/contact" class="hover:text-cyan transition-colors">Contact Us</a></li>
              <li><a routerLink="/about" class="hover:text-cyan transition-colors">Privacy Policy</a></li>
              <li><a routerLink="/about" class="hover:text-cyan transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <!-- Sub-Footer Bottom Bar -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate">
          <div>
            © 2026 Metavayn. All rights reserved.
            <span class="inline-block mx-2 text-white/20">|</span>
            <span class="text-slate/80">Illustrative sample listings — Independent Recruiting Firm.</span>
          </div>

          <!-- Back to Top Button -->
          <button
            type="button"
            (click)="scrollToTop()"
            class="back-to-top-btn inline-flex items-center gap-1.5 text-ice hover:text-cyan transition-colors group p-1 focus:outline-none focus:ring-1 focus:ring-cyan rounded cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <svg class="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  private smoothScroll = inject(SmoothScrollService);

  scrollToTop(): void {
    this.smoothScroll.scrollTo(0);
  }
}
