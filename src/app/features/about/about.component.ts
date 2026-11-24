import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface OperationalPrinciple {
  number: string;
  title: string;
  tagline: string;
  description: string;
  pillars: string[];
}

interface DeliveryCluster {
  title: string;
  badge: string;
  focus: string;
}

interface OperatingMetric {
  value: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, TiltCardDirective, RevealDirective],
  template: `
    <div class="min-h-screen bg-midnight text-white selection:bg-cyan selection:text-midnight">
      <!-- Hero Header Section -->
      <section class="py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-royal/15 blur-[140px] rounded-full pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <!-- Breadcrumb Navigation -->
          <nav aria-label="Breadcrumb" class="mb-6">
            <ol class="inline-flex items-center gap-2 text-xs font-mono text-ice/75">
              <li><a routerLink="/" class="hover:text-cyan transition-colors">Home</a></li>
              <li class="text-white/30">/</li>
              <li class="text-cyan font-semibold">About</li>
            </ol>
          </nav>

          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-widest mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
            Our Mission & Roots
          </span>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight max-w-4xl mx-auto">
            Bridging Indian Engineering Excellence with US Infrastructure
          </h1>

          <p class="text-base sm:text-lg text-ice/85 max-w-3xl mx-auto leading-relaxed mb-6 font-normal">
            We started Metavayn to solve a persistent issue in American engineering: finding qualified mechanical, electrical, and structural engineers who know US building codes and industrial standards. India has deep engineering talent, but generic staffing agencies cannot evaluate calculation sheets or Revit models. We test technical skills on real project drawings so US teams can hire with confidence.
          </p>

          <!-- Honest Disclosure Banner -->
          <div class="inline-block max-w-2xl mx-auto mb-8">
            <div class="text-xs text-ice/90 font-mono bg-navy/75 border border-white/15 rounded-2xl px-5 py-3.5 text-left sm:text-center leading-relaxed backdrop-blur-md shadow-lg shadow-black/25">
              <span class="text-cyan font-bold mr-1.5">Disclosure:</span>
              Operations based in India. Metavayn operates transparently as an India-based specialized engineering recruitment firm connecting top engineering talent in India with US engineering clients. Placements are structured as remote contractor or direct-hire services without US physical offices or visa sponsorship.
            </div>
          </div>

          <!-- Hero Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <app-button variant="primary" href="/employers">
              Hire Engineering Talent
            </app-button>
            <app-button variant="ghost" (click)="scrollToSection('principles')">
              Our Operational Principles
            </app-button>
          </div>
        </div>
      </section>

      <!-- Key Metrics Section -->
      <section class="py-12 border-b border-white/10 bg-navy/20 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            @for (metric of metrics; track metric.label) {
              <div class="p-4 rounded-xl border border-white/5 bg-navy/30">
                <div class="text-3xl sm:text-4xl font-heading font-bold text-cyan mb-1">{{ metric.value }}</div>
                <div class="text-sm font-semibold text-white mb-1">{{ metric.label }}</div>
                <div class="text-xs text-slate font-mono">{{ metric.description }}</div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- 4 Core Operational Principles Section -->
      <section id="principles" class="py-20 border-b border-white/10 bg-midnight relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">How We Work</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              Our 4 Core Principles
            </h2>
            <p class="text-base text-ice/70 max-w-2xl mx-auto">
              Every placement is direct, honest about location, and backed by genuine technical checks.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            @for (principle of principles; track principle.title) {
              <div
                appTilt
                appReveal
                class="bg-navy/40 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-cyan/40 transition-colors duration-300 relative group"
              >
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-xs font-mono uppercase tracking-widest text-cyan px-2.5 py-1 rounded bg-cyan/10 border border-cyan/20">
                      Principle {{ principle.number }}
                    </span>
                    <span class="text-xs text-slate font-mono">{{ principle.tagline }}</span>
                  </div>

                  <h3 class="text-xl font-bold text-white mb-3 group-hover:text-cyan transition-colors">
                    {{ principle.title }}
                  </h3>

                  <p class="text-sm text-ice/70 leading-relaxed mb-6">
                    {{ principle.description }}
                  </p>
                </div>

                <div class="border-t border-white/10 pt-4 mt-auto">
                  <div class="text-[11px] font-mono uppercase tracking-wider text-slate mb-3">Commitment in Practice:</div>
                  <ul class="space-y-2">
                    @for (pillar of principle.pillars; track pillar) {
                      <li class="text-xs text-ice/80 flex items-start gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan shrink-0 mt-1.5"></span>
                        <span>{{ pillar }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Operations & Delivery Network Presence Section -->
      <section class="py-20 border-b border-white/10 bg-navy/15 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-5">
              <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Delivery Infrastructure</span>
              <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                Nationwide Delivery Network
              </h2>
              <p class="text-base text-ice/85 leading-relaxed mb-6 font-normal">
                Our recruiting network spans India's major industrial and engineering centers, bringing together experienced engineers who have worked in multinational consultancies and complex industrial projects.
              </p>

              <div class="space-y-4 mb-8">
                <div class="flex items-start gap-3 p-4 rounded-xl bg-navy/40 border border-white/10">
                  <div class="w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0 font-mono text-sm font-bold">
                    4h+
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-white">US Synchronous Timezone Overlap</h4>
                    <p class="text-xs text-ice/75">Engineers maintain minimum 4-hour daily overlap with US EST, CST, or PST working windows for seamless sprint planning, code review, and coordination.</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 p-4 rounded-xl bg-navy/40 border border-white/10">
                  <div class="w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0 font-mono text-sm font-bold">
                    IP
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-white">Security & IP Safeguards</h4>
                    <p class="text-xs text-ice/75">Enterprise-grade confidentiality, comprehensive bilateral non-disclosure agreements, and SOC2-aligned secure cloud environments.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-7">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                @for (cluster of deliveryClusters; track cluster.title) {
                  <div
                    appTilt
                    class="bg-navy/40 border border-white/15 rounded-xl p-5 hover:border-cyan/40 hover:bg-navy/60 transition-all duration-300 shadow-md group"
                  >
                    <div class="flex items-center justify-between mb-2 gap-2">
                      <span class="text-sm sm:text-base font-bold text-white group-hover:text-cyan transition-colors">{{ cluster.title }}</span>
                      <span class="text-[10px] font-mono uppercase tracking-wider text-cyan px-2 py-0.5 rounded bg-cyan/10 border border-cyan/25 shrink-0 whitespace-nowrap">
                        {{ cluster.badge }}
                      </span>
                    </div>
                    <p class="text-xs text-ice/80 leading-relaxed font-normal">
                      {{ cluster.focus }}
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Dual Conversion CTA Section -->
      <section class="py-20 relative bg-gradient-to-b from-midnight via-navy/30 to-midnight">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Get Started</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
              Partner with Metavayn
            </h2>
            <p class="text-base text-ice/70 max-w-xl mx-auto">
              Whether you are an engineering executive scaling production capacity or an elite engineer seeking top-tier US engagements.
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
                  Access vetted mechanical, HVAC, electrical, and structural engineers fluent in US building codes, ASME standards, and production CAD/BIM pipelines.
                </p>
                <ul class="space-y-2 mb-8">
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
                    Custom technical benchmarking & code validation
                  </li>
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
                    Flexible contractor and direct-hire engagement options
                  </li>
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
                    Direct interview with pre-screened technical portfolios
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
                <h3 class="text-2xl font-bold text-white mb-3">Accelerate Your Engineering Career</h3>
                <p class="text-sm text-ice/70 leading-relaxed mb-6">
                  Join our verified engineering network. Work remotely with premier US design firms, gain exposure to complex infrastructure projects, and earn USD-benchmarked compensation.
                </p>
                <ul class="space-y-2 mb-8">
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber"></span>
                    Direct placement with US engineering leaders
                  </li>
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber"></span>
                    Competitive international compensation benchmarks
                  </li>
                  <li class="text-xs text-ice/80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber"></span>
                    Continuous upskilling in advanced US engineering codes
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
export class AboutComponent {
  readonly metrics: OperatingMetric[] = [
    { value: '100%', label: 'US Code Verified', description: 'IBC, ASHRAE, ASME, NFPA rigor' },
    { value: '4h+', label: 'Daily US Overlap', description: 'Synchronous EST/CST/PST hours' },
    { value: '14-Day', label: 'Average Match Time', description: 'From role spec to interview' },
    { value: '96%', label: 'Placement Retention', description: 'Long-term client engagements' }
  ];

  readonly principles: OperationalPrinciple[] = [
    {
      number: '01',
      title: 'Genuine Technical Depth',
      tagline: 'Direct Engineering Review',
      description: 'We evaluate calculation sheets, 3D BIM models, and code knowledge before any interview. Every candidate is assessed on actual standards they will use on the job.',
      pillars: [
        'Domain-specific technical interviews led by senior engineers',
        'Direct testing on authentic design calculations and sizing',
        'Comprehensive CAD/BIM model audit for standards compliance'
      ]
    },
    {
      number: '02',
      title: 'Cross-Border Transparency',
      tagline: 'Upfront Operations',
      description: 'We are completely upfront about how we operate. As an India-based engineering recruitment firm, we provide direct clarity on remote contractor arrangements, compensation, and billing without inflated claims.',
      pillars: [
        'Clear operations disclosure and remote contractor structures',
        'Direct communication and collaborative engagement workflows',
        'Transparent fee models with no hidden margins or lock-in'
      ]
    },
    {
      number: '03',
      title: 'Authentic US Code Rigor',
      tagline: 'Practical Code Fluency',
      description: 'Engineering drawings and calculations must meet US municipal, state, and national codes. Our candidates demonstrate practical fluency in American regulatory frameworks, calculation methods, and submittal standards.',
      pillars: [
        'Deep alignment with ASHRAE, ASME, NFPA, IBC, and NEC standards',
        'Fluency in US imperial units, drafting standards, and schedule conventions',
        'Knowledge of state-specific energy codes including California Title 24'
      ]
    },
    {
      number: '04',
      title: 'Mutual Value Creation',
      tagline: 'Fair Global Engagements',
      description: 'Successful cross-border collaboration requires fair outcomes for everyone. US teams get dependable engineering capacity for critical projects, and Indian engineers earn competitive USD-benchmarked compensation for their technical skill.',
      pillars: [
        'Competitive USD-benchmarked compensation for engineers',
        'Reliable engineering capacity for US project deadlines',
        'Direct collaboration on complex American infrastructure programs'
      ]
    }
  ];

  readonly deliveryClusters: DeliveryCluster[] = [
    {
      title: 'Computational Simulation & Analysis',
      badge: 'CFD / FEA / HPC',
      focus: 'High-performance computing, advanced CFD/FEA simulation, thermal modeling, and multiphysics analysis.'
    },
    {
      title: 'Mechanical & Industrial Systems',
      badge: 'ASME / ISO COMPLIANT',
      focus: 'Heavy equipment design, industrial HVAC machinery, ASME pressure vessel modeling, and GD&T precision detailing.'
    },
    {
      title: 'BIM & Structural Infrastructure',
      badge: 'US AEC STANDARDS',
      focus: 'Structural BIM modeling, Revit parametric families, civil drafting, and automated clash-detection pipelines.'
    },
    {
      title: 'Electrical & Power Distribution',
      badge: 'NEC / IEEE CODES',
      focus: 'Industrial power distribution design, substation engineering, ETAP modeling, and renewable energy integration.'
    },
    {
      title: 'Mission-Critical & Thermal AEC',
      badge: 'ASHRAE / TIER III+',
      focus: 'Data center cooling infrastructure, cleanroom ventilation systems, and commercial energy load modeling.'
    }
  ];

  scrollToSection(elementId: string): void {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
