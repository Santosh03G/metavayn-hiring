import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { CounterComponent } from '../../shared/components/counter/counter.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    SectionHeadingComponent,
    CounterComponent,
    RevealDirective,
    TiltCardDirective
  ],
  template: `
    <main class="min-h-screen bg-midnight text-white selection:bg-cyan selection:text-midnight blueprint-grid">
      <!-- Hero / Foundation Intro Section -->
      <section class="relative pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div appReveal [appRevealDelay]="0.1" class="mb-6">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-royal/20 text-cyan border border-cyan/30 shadow-lg shadow-cyan/10">
            <span class="w-2 h-2 rounded-full bg-cyan animate-pulse"></span>
            Metavayn Step 0 Living Sandbox
          </span>
        </div>

        <h1 appReveal [appRevealDelay]="0.2" class="text-4xl sm:text-6xl lg:text-7xl font-bold font-heading tracking-tight max-w-4xl mb-6">
          Precision Hiring Engineered for the <span class="text-gradient">Agentic Era</span>
        </h1>

        <p appReveal [appRevealDelay]="0.3" class="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
          Interactive foundation testing suite verifying Lenis smooth scroll, GSAP scroll triggers, 3D tilt interactions, and design token ergonomics.
        </p>

        <!-- Button Variants Matrix (All featuring magnetic cursor physics) -->
        <div appReveal [appRevealDelay]="0.4" class="flex flex-wrap items-center justify-center gap-4 mb-6">
          <app-button variant="primary">
            Primary Magnetic
          </app-button>
          <app-button variant="ghost">
            Ghost Interactive
          </app-button>
          <app-button variant="amber-cta">
            Amber Action
          </app-button>
          <app-button variant="primary" [disabled]="true">
            Disabled Button
          </app-button>
        </div>
      </section>

      <!-- Section Headings Showcase (Dark & Light Modes with Scroll Reveal) -->
      <section class="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <!-- Dark Mode Heading -->
        <div class="p-8 rounded-2xl glass glow-cyan">
          <app-section-heading
            eyebrow="Dark Mode Component"
            title="Surgical Precision Architecture"
            subtitle="Evaluating deep typography scales and high-contrast dark palette tokens in high-density viewports."
            [centered]="false"
            theme="dark"
          ></app-section-heading>
        </div>

        <!-- Light Mode Heading Box -->
        <div class="p-8 rounded-2xl bg-white text-ink shadow-2xl">
          <app-section-heading
            eyebrow="Light Mode Component"
            title="Dual-Theme Foundation Rigor"
            subtitle="Testing high-clarity contrast ratio and typography token hierarchy against crisp ice backgrounds."
            [centered]="true"
            theme="light"
          ></app-section-heading>
        </div>
      </section>

      <!-- 3D Tilt Cards with Glass Styling -->
      <section class="py-20 px-6 max-w-7xl mx-auto">
        <app-section-heading
          eyebrow="Interactive Micro-interactions"
          title="3D Tilt Physics & Glassmorphism"
          subtitle="Physics-driven 3D tilt responding to cursor vector coordinates with silky cubic easing."
          [centered]="true"
          theme="dark"
        ></app-section-heading>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div appTilt class="glass p-8 rounded-2xl border border-white/10 glow-cyan flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center mb-6 text-cyan font-bold">
                01
              </div>
              <h3 class="text-xl font-bold font-heading mb-3">AI Matching Matrix</h3>
              <p class="text-slate-300 text-sm leading-relaxed mb-6">
                Direct neural vector search aligning engineering DNA with technical team topologies.
              </p>
            </div>
            <app-button variant="ghost">Learn More</app-button>
          </div>

          <div appTilt class="glass p-8 rounded-2xl border border-white/10 glow-amber flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-amber/10 border border-amber/30 flex items-center justify-center mb-6 text-amber font-bold">
                02
              </div>
              <h3 class="text-xl font-bold font-heading mb-3">Autonomous Agents</h3>
              <p class="text-slate-300 text-sm leading-relaxed mb-6">
                Continuous candidate assessment loops, code review telemetry, and cultural cadence verification.
              </p>
            </div>
            <app-button variant="amber-cta">Explore Agents</app-button>
          </div>

          <div appTilt class="glass p-8 rounded-2xl border border-white/10 glow-cyan flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center mb-6 text-cyan font-bold">
                03
              </div>
              <h3 class="text-xl font-bold font-heading mb-3">Zero-Latency Pipeline</h3>
              <p class="text-slate-300 text-sm leading-relaxed mb-6">
                Real-time offer negotiation, verifiable credentials, and frictionless onboarding workflows.
              </p>
            </div>
            <app-button variant="primary">View Pipeline</app-button>
          </div>
        </div>
      </section>

      <!-- Scroll-Triggered Counters -->
      <section class="py-20 px-6 max-w-7xl mx-auto">
        <div class="p-10 rounded-3xl glass border border-white/10">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div class="pt-4 md:pt-0">
              <app-counter [targetValue]="99" suffix="%" [duration]="2"></app-counter>
              <div class="text-xs uppercase tracking-wider text-slate-400 mt-2 font-medium">Match Accuracy</div>
            </div>
            <div class="pt-4 md:pt-0">
              <app-counter [targetValue]="500" prefix="+" [duration]="2.5"></app-counter>
              <div class="text-xs uppercase tracking-wider text-slate-400 mt-2 font-medium">Roles Filled</div>
            </div>
            <div class="pt-4 md:pt-0">
              <app-counter [targetValue]="24" suffix="h" [duration]="1.8"></app-counter>
              <div class="text-xs uppercase tracking-wider text-slate-400 mt-2 font-medium">Avg Time to Hire</div>
            </div>
            <div class="pt-4 md:pt-0">
              <app-counter [targetValue]="15" prefix="$" suffix="M+" [duration]="2.2"></app-counter>
              <div class="text-xs uppercase tracking-wider text-slate-400 mt-2 font-medium">Candidate Value</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Scrollable Test Section for Lenis Smooth Scroll -->
      <section class="py-32 px-6 max-w-5xl mx-auto text-center">
        <div appReveal class="p-12 rounded-3xl glass border border-cyan/20 glow-cyan">
          <span class="text-cyan font-mono text-sm tracking-widest uppercase">Lenis Telemetry Active</span>
          <h2 class="text-3xl font-heading font-bold mt-4 mb-4">Smooth Scrolling Experience Validated</h2>
          <p class="text-slate-300 max-w-xl mx-auto mb-8">
            Scroll momentum, delta normalization, and seamless virtual momentum interpolation are active across the DOM tree.
          </p>
          <app-button variant="primary">Back to Top</app-button>
        </div>
      </section>
    </main>
  `
})
export class HomeComponent {}
