import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { DISCIPLINES } from '../../data/disciplines.data';
import {
  EmployerInquiry,
  HEADCOUNT_OPTIONS,
  ENGAGEMENT_MODELS,
  validateEmployerInquiry
} from '../../data/employer.model';

interface ValuePillar {
  tag: string;
  title: string;
  description: string;
  highlights: string[];
}

interface DisciplineCapability {
  slug: string;
  title: string;
  focus: string;
  deliverables: string[];
  standards: string[];
  tools: string[];
}

interface WorkflowStep {
  number: string;
  title: string;
  timeline: string;
  description: string;
  deliverables: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-employers',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, TiltCardDirective, RevealDirective],
  template: `
    <div class="min-h-screen bg-midnight text-white selection:bg-cyan selection:text-midnight">
      <!-- Hero Header Section -->
      <section class="py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal/15 blur-[140px] rounded-full pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-widest mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
            For US Engineering Leaders & Hiring Teams
          </span>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight max-w-4xl mx-auto">
            Scale US Engineering Capacity with Vetted Indian Talent
          </h1>

          <p class="text-base sm:text-lg text-ice/80 max-w-3xl mx-auto leading-relaxed mb-6">
            Deploy specialized mechanical, HVAC, electrical, structural, and simulation engineers trained in authentic US codes and CAD/BIM tooling. Flexible remote engagements with guaranteed domain proficiency.
          </p>

          <!-- Honest Disclosure Notice Banner -->
          <div class="inline-block max-w-2xl mx-auto mb-8">
            <div class="text-xs text-slate font-mono bg-navy/60 border border-white/10 rounded-2xl px-5 py-3 text-left sm:text-center leading-relaxed">
              <span class="text-cyan font-bold mr-1.5">Disclosure:</span>
              Operations based in India. Metavayn operates as an Indian engineering recruitment firm connecting US hiring teams with remote technical talent. We do not maintain US physical offices or offer direct US employment.
            </div>
          </div>

          <!-- Hero Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <app-button variant="primary" (click)="scrollToInquiry()">
              Request Engineering Talent
            </app-button>
            <app-button variant="ghost" (click)="scrollToSection('capabilities')">
              Explore Practice Areas
            </app-button>
          </div>
        </div>
      </section>

      <!-- 4 Key Value Pillars Section -->
      <section class="py-20 border-b border-white/10 bg-navy/10 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Value Proposition</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              Engineered for US Technical Rigor
            </h2>
            <p class="text-base text-ice/70 max-w-2xl mx-auto">
              We bridge the cross-border gap by strictly evaluating candidates against authentic American engineering standards, production software workflows, and real-time collaboration norms.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (pillar of valuePillars; track pillar.title) {
              <div
                appTilt
                appReveal
                class="bg-navy/40 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan/40 transition-colors duration-300"
              >
                <div>
                  <span class="text-[11px] font-mono uppercase tracking-wider text-cyan px-2.5 py-1 rounded bg-cyan/10 border border-cyan/20 inline-block mb-4">
                    {{ pillar.tag }}
                  </span>
                  <h3 class="text-lg font-bold text-white mb-2">{{ pillar.title }}</h3>
                  <p class="text-xs text-ice/70 leading-relaxed mb-4">{{ pillar.description }}</p>
                </div>

                <div class="border-t border-white/10 pt-4 mt-auto">
                  <div class="text-[10px] font-mono uppercase tracking-wider text-slate mb-2">Key Highlights:</div>
                  <ul class="space-y-1.5">
                    @for (highlight of pillar.highlights; track highlight) {
                      <li class="text-xs text-ice/80 flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan shrink-0"></span>
                        {{ highlight }}
                      </li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- 5 Discipline Capability Showcase Section -->
      <section id="capabilities" class="py-20 border-b border-white/10 bg-midnight relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Practice Disciplines</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              Comprehensive Engineering Capabilities
            </h2>
            <p class="text-base text-ice/70 max-w-2xl mx-auto">
              Our pre-vetted engineers deliver production-grade calculations, 3D CAD/BIM models, and fabrication deliverables across 5 specialized domains.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            @for (cap of capabilities; track cap.slug) {
              <div
                appTilt
                appReveal
                class="bg-navy/50 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan/40 transition-colors duration-300"
              >
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-mono text-cyan uppercase tracking-wider">Discipline</span>
                    <span class="text-[11px] font-mono text-slate px-2 py-0.5 rounded bg-white/5 border border-white/10">US Codes</span>
                  </div>
                  <h3 class="text-xl font-bold text-white mb-2">{{ cap.title }}</h3>
                  <p class="text-xs text-cyan font-mono mb-4">{{ cap.focus }}</p>

                  <div class="mb-4">
                    <div class="text-[11px] font-mono uppercase tracking-wider text-slate mb-2">Sample Deliverables:</div>
                    <ul class="space-y-1.5">
                      @for (item of cap.deliverables; track item) {
                        <li class="text-xs text-ice/80 flex items-start gap-1.5">
                          <span class="text-cyan text-sm leading-none mt-0.5">&bull;</span>
                          <span>{{ item }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                </div>

                <div class="border-t border-white/10 pt-4 mt-4 space-y-3">
                  <div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-slate mb-1">Applicable US Standards:</div>
                    <div class="flex flex-wrap gap-1.5">
                      @for (std of cap.standards; track std) {
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-ice/80 border border-white/10">
                          {{ std }}
                        </span>
                      }
                    </div>
                  </div>

                  <div>
                    <div class="text-[10px] font-mono uppercase tracking-wider text-slate mb-1">Software Ecosystem:</div>
                    <div class="flex flex-wrap gap-1.5">
                      @for (tool of cap.tools; track tool) {
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/20">
                          {{ tool }}
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- 4-Step Engagement Process Section -->
      <section class="py-20 border-b border-white/10 bg-navy/20 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Deployment Workflow</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              4-Step Remote Engineering Onboarding
            </h2>
            <p class="text-base text-ice/70 max-w-2xl mx-auto">
              From requirement scoping to day-one productivity within 14 business days, guaranteed by rigorous pre-screening.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (step of workflowSteps; track step.number) {
              <div
                appTilt
                appReveal
                class="bg-navy/40 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan/40 transition-colors duration-300"
              >
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-3xl font-mono font-bold text-cyan">{{ step.number }}</span>
                    <span class="text-[11px] font-mono text-slate px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {{ step.timeline }}
                    </span>
                  </div>
                  <h3 class="text-lg font-bold text-white mb-2">{{ step.title }}</h3>
                  <p class="text-xs text-ice/70 leading-relaxed mb-4">{{ step.description }}</p>
                </div>

                <div class="border-t border-white/10 pt-3">
                  <div class="text-[10px] font-mono uppercase tracking-wider text-slate mb-2">Milestones:</div>
                  <ul class="space-y-1">
                    @for (item of step.deliverables; track item) {
                      <li class="text-xs text-ice/80 flex items-center gap-1.5">
                        <span class="w-1 h-1 rounded-full bg-cyan"></span>
                        {{ item }}
                      </li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Interactive Talent Inquiry Form Section -->
      <section id="inquiry-form" class="py-20 border-b border-white/10 bg-midnight relative">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Direct Engagement</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              Request Specialized Engineering Talent
            </h2>
            <p class="text-base text-ice/70 max-w-xl mx-auto">
              Share your technical requirements. A Practice Director will review your specifications and schedule a scoping call within 24 business hours.
            </p>
          </div>

          <!-- Form or Confirmation Screen -->
          <div class="inquiry-form">
            @if (!isSubmitted()) {
              <div class="bg-navy/50 border border-white/15 rounded-2xl p-6 sm:p-10 shadow-xl relative backdrop-blur-sm">
                <!-- Validation Errors Alert -->
                @if (formErrors().length > 0) {
                  <div class="rounded-xl bg-red-500/10 border border-red-500/30 p-4 mb-8 text-left">
                    <div class="text-red-400 text-xs font-mono font-bold mb-2">Please complete all required fields:</div>
                    <ul class="list-disc list-inside text-xs text-red-300 space-y-1">
                      @for (err of formErrors(); track err) {
                        <li>{{ err }}</li>
                      }
                    </ul>
                  </div>
                }

                <!-- Contact & Company Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
                      Company Name <span class="text-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      [value]="companyName()"
                      (input)="companyName.set($any($event.target).value)"
                      placeholder="e.g. Apex Engineering Solutions LLC"
                      class="w-full bg-navy/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate/50 text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
                      Contact Name <span class="text-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      [value]="contactName()"
                      (input)="contactName.set($any($event.target).value)"
                      placeholder="e.g. David Miller"
                      class="w-full bg-navy/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate/50 text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                    />
                  </div>
                </div>

                <!-- Email & Phone Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
                      Corporate Business Email <span class="text-cyan">*</span>
                    </label>
                    <input
                      type="email"
                      [value]="businessEmail()"
                      (input)="businessEmail.set($any($event.target).value)"
                      placeholder="e.g. david.miller@apexeng.com"
                      class="w-full bg-navy/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate/50 text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
                      Phone Number <span class="text-cyan">*</span>
                    </label>
                    <input
                      type="tel"
                      [value]="phone()"
                      (input)="phone.set($any($event.target).value)"
                      placeholder="e.g. +1 555-234-5678"
                      class="w-full bg-navy/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate/50 text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                    />
                  </div>
                </div>

                <!-- Disciplines Multi-Select Chips -->
                <div class="mb-6">
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-xs font-mono uppercase tracking-wider text-slate">
                      Required Discipline(s) <span class="text-cyan">*</span>
                    </label>
                    <a routerLink="/disciplines" class="text-[11px] font-mono text-cyan hover:underline">
                      View all disciplines &rarr;
                    </a>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    @for (disc of disciplines; track disc.slug) {
                      <button
                        type="button"
                        (click)="toggleDiscipline(disc.slug)"
                        class="px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 border cursor-pointer focus:outline-none"
                        [ngClass]="selectedDisciplines().includes(disc.slug)
                          ? 'bg-cyan text-midnight border-cyan font-bold shadow-lg shadow-cyan/20'
                          : 'bg-navy/70 text-ice/80 border-white/15 hover:border-white/30'"
                      >
                        {{ disc.name }}
                      </button>
                    }
                  </div>
                </div>

                <!-- Headcount & Engagement Model Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
                      Target Headcount <span class="text-cyan">*</span>
                    </label>
                    <div class="space-y-2">
                      @for (opt of headcountOptions; track opt) {
                        <button
                          type="button"
                          (click)="headcount.set(opt)"
                          class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono border transition-all cursor-pointer focus:outline-none"
                          [ngClass]="headcount() === opt
                            ? 'bg-cyan/20 border-cyan text-cyan font-semibold'
                            : 'bg-navy/70 border-white/10 text-ice/70 hover:text-white hover:border-white/20'"
                        >
                          {{ opt }}
                        </button>
                      }
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
                      Engagement Model <span class="text-cyan">*</span>
                    </label>
                    <div class="space-y-2">
                      @for (model of engagementModels; track model) {
                        <button
                          type="button"
                          (click)="engagementModel.set(model)"
                          class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono border transition-all cursor-pointer focus:outline-none"
                          [ngClass]="engagementModel() === model
                            ? 'bg-cyan/20 border-cyan text-cyan font-semibold'
                            : 'bg-navy/70 border-white/10 text-ice/70 hover:text-white hover:border-white/20'"
                        >
                          {{ model }}
                        </button>
                      }
                    </div>
                  </div>
                </div>

                <!-- Project Requirements Overview -->
                <div class="mb-8">
                  <label class="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
                    Project / Engineering Requirements Overview <span class="text-cyan">*</span>
                  </label>
                  <textarea
                    rows="4"
                    [value]="projectOverview()"
                    (input)="projectOverview.set($any($event.target).value)"
                    placeholder="Describe your project scope, CAD/BIM tools required, US code requirements (e.g. ASHRAE 90.1, ASME B31.3), and target timeline..."
                    class="w-full bg-navy/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate/50 text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors resize-none"
                  ></textarea>
                </div>

                <!-- Submit Button: strictly variant="primary" -->
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div class="text-xs text-slate font-mono">
                    Direct confidential review &bull; 24h response SLA
                  </div>
                  <app-button variant="primary" (click)="submitInquiry()">
                    Submit Talent Request
                  </app-button>
                </div>
              </div>
            } @else {
              <!-- Post-Submission Confirmation Screen -->
              <div class="bg-navy/60 border border-cyan/30 rounded-2xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan/15 blur-3xl rounded-full pointer-events-none"></div>

                <!-- Checkmark Icon -->
                <div class="w-16 h-16 rounded-full bg-cyan/10 border border-cyan/40 text-cyan flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>

                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-wider mb-4">
                  Reference: {{ submissionReference() }}
                </span>

                <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                  Inquiry Received
                </h2>

                <p class="text-base text-ice/80 max-w-xl mx-auto leading-relaxed mb-8">
                  Thank you, <span class="text-white font-semibold">{{ contactName() }}</span>. We have received your engineering talent request for <span class="text-white font-semibold">{{ companyName() }}</span>.
                </p>

                <!-- Next Steps Roadmap -->
                <div class="max-w-2xl mx-auto bg-midnight/70 border border-white/10 rounded-xl p-6 mb-8 text-left">
                  <h3 class="text-xs font-mono uppercase tracking-widest text-cyan mb-4 font-bold">What Happens Next</h3>
                  <div class="space-y-4">
                    <div class="flex items-start gap-3">
                      <span class="w-6 h-6 rounded-full bg-cyan/20 text-cyan text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <div>
                        <h4 class="text-sm font-semibold text-white">Requirement Scoping (Within 24 Hours)</h4>
                        <p class="text-xs text-slate">A Practice Lead reviews your code specifications, software requirements, and project timeline to assemble matching candidate profiles.</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <span class="w-6 h-6 rounded-full bg-cyan/20 text-cyan text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <div>
                        <h4 class="text-sm font-semibold text-white">Pre-Vetted Candidate Dossiers</h4>
                        <p class="text-xs text-slate">You receive curated technical dossiers including verified CAD/BIM samples, calculation workbooks, and US code evaluations.</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <span class="w-6 h-6 rounded-full bg-cyan/20 text-cyan text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <div>
                        <h4 class="text-sm font-semibold text-white">Technical Video Interviews & Kickoff</h4>
                        <p class="text-xs text-slate">Conduct live 1-on-1 interviews with shortlisted engineers. Selected talent deploys remotely with full IP protection.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex justify-center">
                  <app-button variant="ghost" (click)="resetForm()">
                    Submit Another Talent Request
                  </app-button>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Employer FAQs Accordion Section -->
      <section class="py-20 border-b border-white/10 bg-navy/20 relative">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Direct Answers</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              Frequently Asked Questions for Employers
            </h2>
            <p class="text-base text-ice/70">
              Transparent answers regarding contracts, timezone overlap, US code verification, and India-based operations.
            </p>
          </div>

          <div class="space-y-4">
            @for (faq of faqs; track $index) {
              <div class="bg-navy/60 border border-white/10 rounded-xl overflow-hidden transition-colors">
                <button
                  type="button"
                  (click)="toggleFaq($index)"
                  class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span class="text-sm sm:text-base font-semibold text-white">{{ faq.question }}</span>
                  <span class="text-cyan text-lg font-mono transition-transform duration-200" [ngClass]="openFaqIndex() === $index ? 'rotate-45' : ''">
                    +
                  </span>
                </button>
                @if (openFaqIndex() === $index) {
                  <div class="px-6 pb-5 pt-1 text-xs sm:text-sm text-ice/80 leading-relaxed border-t border-white/5">
                    {{ faq.answer }}
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Candidate Secondary Card (STRICT AMBER CTA ISOLATION) -->
      <section class="py-16 bg-gradient-to-b from-navy/30 to-midnight relative">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div appTilt appReveal class="bg-navy/50 border border-amber/30 rounded-2xl p-8 sm:p-10 relative overflow-hidden">
            <div class="absolute -top-24 right-0 w-64 h-64 bg-amber/10 blur-[100px] rounded-full pointer-events-none"></div>

            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs font-mono uppercase tracking-wider mb-4">
              Engineering Candidates
            </span>
            <h3 class="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
              Are You an Engineer Seeking US Client Engagements?
            </h3>
            <p class="text-sm sm:text-base text-ice/70 max-w-xl mx-auto mb-6">
              Connect your domain expertise in HVAC, piping, structural, electrical, or simulation directly with US engineering leaders. Remote contractor placements with USD-benchmarked compensation.
            </p>
            <div class="flex justify-center">
              <!-- Strictly isolated amber CTA: ONLY this button uses variant="amber-cta" -->
              <app-button variant="amber-cta" href="/candidates">
                Submit Your Resume
              </app-button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class EmployersComponent {
  // Form signals
  companyName = signal<string>('');
  contactName = signal<string>('');
  businessEmail = signal<string>('');
  phone = signal<string>('');
  selectedDisciplines = signal<string[]>([]);
  headcount = signal<string>('');
  engagementModel = signal<string>('');
  projectOverview = signal<string>('');

  // UI & status signals
  isSubmitted = signal<boolean>(false);
  submissionReference = signal<string>('');
  formErrors = signal<string[]>([]);
  openFaqIndex = signal<number | null>(null);

  // Constants & references
  readonly disciplines = DISCIPLINES;
  readonly headcountOptions = HEADCOUNT_OPTIONS;
  readonly engagementModels = ENGAGEMENT_MODELS;

  readonly valuePillars: ValuePillar[] = [
    {
      tag: 'US Code Rigor',
      title: 'Authentic US Code Mastery',
      description: 'Deep working familiarity with ASHRAE 90.1 & 62.1, ASME Section VIII & B31.3, NFPA 70 (NEC), IEEE, and IBC standard specifications.',
      highlights: ['Zero code translation lag', 'ASME & ASHRAE verified portfolios', 'Standardized calculation sheets']
    },
    {
      tag: 'CAD / BIM Mastery',
      title: 'Turnkey Tool Readiness',
      description: 'Immediate production-level proficiency in Autodesk Revit MEP, BIM 360, SolidWorks, ANSYS Fluent, ETAP, and Bluebeam without ramp-up overhead.',
      highlights: ['Native Revit template integration', 'LOD 300-400 modeling standards', 'Automated clash detection']
    },
    {
      tag: 'Financial Leverage',
      title: '40-60% Cost Efficiency',
      description: 'Transparent USD billing structures that deliver substantial operating leverage compared to domestic US contract talent.',
      highlights: ['Zero US employer payroll burden', 'Straightforward monthly USD invoicing', 'Flexible scaling without overhead']
    },
    {
      tag: 'Timezone Overlap',
      title: 'Real-Time Collaboration',
      description: 'Engineered overlap of 3 to 4 hours daily with US Eastern (EST) and Pacific (PST) business hours for seamless team alignment.',
      highlights: ['Daily standup participation', 'Rapid same-day design iterations', 'Overnight sprint turnaround']
    }
  ];

  readonly capabilities: DisciplineCapability[] = [
    {
      slug: 'hvac-thermal',
      title: 'HVAC & Thermal Systems',
      focus: 'Commercial HVAC, Cleanrooms & District Cooling',
      deliverables: [
        'Detailed heating & cooling load calculations',
        'Revit MEP ductwork and hydronic piping BIM layouts',
        'Airflow CFD and thermal dissipation simulations',
        'Equipment schedules and submittal reviews'
      ],
      standards: ['ASHRAE 90.1', 'ASHRAE 62.1', 'SMACNA', 'IMC'],
      tools: ['Revit MEP', 'Trane TRACE 700 / 3D', 'Carrier HAP', 'ANSYS Fluent']
    },
    {
      slug: 'piping-pressure',
      title: 'Piping & Pressure Systems',
      focus: 'Oil & Gas, Power Generation & Process Piping',
      deliverables: [
        'CAESAR II piping stress and flexibility analysis',
        'P&ID development and 3D plant routing',
        'ASME Section VIII pressure vessel design & sizing',
        'Isometric fabrication drawings with BOM'
      ],
      standards: ['ASME B31.1', 'ASME B31.3', 'ASME Section VIII', 'API 650'],
      tools: ['CAESAR II', 'AutoCAD Plant 3D', 'PV Elite', 'Navisworks']
    },
    {
      slug: 'structural-civil',
      title: 'Structural & Civil Modeling',
      focus: 'Industrial Facilities, Steel Frames & Skids',
      deliverables: [
        'STAAD.Pro / ETABS finite element structural analysis',
        'Tekla steel detailing and connection design',
        'Seismic and wind load analysis for industrial skids',
        'Reinforced concrete foundation design'
      ],
      standards: ['AISC 360', 'ACI 318', 'ASCE 7-16/22', 'AWS D1.1'],
      tools: ['STAAD.Pro', 'Tekla Structures', 'ETABS', 'Revit Structure']
    },
    {
      slug: 'electrical-power',
      title: 'Electrical & Power Distribution',
      focus: 'Industrial Substations & Mission-Critical Power',
      deliverables: [
        'ETAP short-circuit, arc-flash & protection coordination studies',
        'Single-line diagrams (SLD) and panel schedule design',
        'Cable tray routing, voltage drop & conduit sizing',
        'Emergency standby generator and UPS topology sizing'
      ],
      standards: ['NFPA 70 (NEC)', 'NFPA 70E', 'IEEE 1584', 'IEEE 141'],
      tools: ['ETAP', 'SKM Power*Tools', 'Revit Electrical', 'AutoCAD Electrical']
    },
    {
      slug: 'data-center',
      title: 'Data Center & Critical Facilities',
      focus: 'Hyperscale & Colocation Infrastructure',
      deliverables: [
        'White space thermal CFD modeling (hot/cold aisle containment)',
        'Tier III/IV redundant electrical and cooling topologies',
        'PUE optimization and liquid cooling manifold design',
        'Generator yard and fuel system layout design'
      ],
      standards: ['TIA-942', 'Uptime Institute', 'ASHRAE TC 9.9', 'NFPA 75/76'],
      tools: ['6SigmaDCX / Future Facilities', 'Revit BIM', 'ANSYS Icepak', 'Bluebeam']
    }
  ];

  readonly workflowSteps: WorkflowStep[] = [
    {
      number: '01',
      title: 'Technical Discovery',
      timeline: 'Day 1 - 2',
      description: 'We analyze your engineering deliverables, CAD/BIM templates, US code compliance standards, and required software stack.',
      deliverables: ['Scope & code requirements matrix', 'Software & template alignment']
    },
    {
      number: '02',
      title: 'Rigorous Vetting',
      timeline: 'Day 3 - 5',
      description: 'Candidates complete scenario-based design tests, code audits, and live technical interviews with senior practice leads.',
      deliverables: ['ASME / ASHRAE test evaluation', 'Revit work sample audit']
    },
    {
      number: '03',
      title: 'Client Interviews',
      timeline: 'Week 2',
      description: 'Review verified technical dossiers, CAD work samples, and conduct live 1-on-1 video interviews with pre-vetted engineers.',
      deliverables: ['Comprehensive talent dossiers', 'Direct video evaluations']
    },
    {
      number: '04',
      title: 'Remote Deployment',
      timeline: 'Week 2 - 3',
      description: 'Rapid kickoff with secure remote access setup, bilateral NDA execution, and daily collaboration overlap.',
      deliverables: ['Bilateral NDA & IP assignment', 'Sprint & standup integration']
    }
  ];

  readonly faqs: FaqItem[] = [
    {
      question: 'What is Metavayn\'s corporate structure and operational location?',
      answer: 'Operations based in India: Metavayn operates as an Indian engineering recruitment firm connecting US hiring teams with remote technical talent. We do not maintain US physical offices or offer direct US employment; all placements are structured as remote contractor or technical offshore engagements directly supporting your US team.'
    },
    {
      question: 'How do you ensure candidate familiarity with US building codes and standards?',
      answer: 'All our engineers undergo pre-qualification on US standards (ASHRAE, ASME, NFPA, IEEE, IBC). We evaluate actual calculation workbooks, drawing packages, and Revit/BIM models rather than relying solely on resumes.'
    },
    {
      question: 'How do working hours and timezone collaboration work?',
      answer: 'Our engineers work a hybrid schedule with a mandatory 3 to 4 hours of real-time overlap during US business hours (Eastern or Pacific). This ensures timely participation in morning standups, sprint planning, and design coordination meetings.'
    },
    {
      question: 'How are contracts, payments, and IP protection managed?',
      answer: 'Engagements are invoiced in USD with transparent terms. Full intellectual property ownership remains 100% with your firm from day one, backed by comprehensive bilateral NDAs and strict IP assignment agreements.'
    },
    {
      question: 'What if a placed engineer does not meet project expectations?',
      answer: 'We provide a 14-day evaluation period. If an engineer is not the right fit for your workflows, we supply a replacement candidate within 5 business days at zero additional search fee.'
    }
  ];

  toggleDiscipline(slug: string): void {
    const curr = this.selectedDisciplines();
    if (curr.includes(slug)) {
      this.selectedDisciplines.set(curr.filter(s => s !== slug));
    } else {
      this.selectedDisciplines.set([...curr, slug]);
    }
  }

  toggleFaq(index: number): void {
    if (this.openFaqIndex() === index) {
      this.openFaqIndex.set(null);
    } else {
      this.openFaqIndex.set(index);
    }
  }

  scrollToInquiry(): void {
    if (typeof document !== 'undefined') {
      const el = document.getElementById('inquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  scrollToSection(id: string): void {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  submitInquiry(): void {
    const inquiry: EmployerInquiry = {
      companyName: this.companyName(),
      contactName: this.contactName(),
      businessEmail: this.businessEmail(),
      phone: this.phone(),
      disciplines: this.selectedDisciplines(),
      headcount: this.headcount(),
      engagementModel: this.engagementModel(),
      projectOverview: this.projectOverview()
    };

    const errors = validateEmployerInquiry(inquiry);
    if (errors.length > 0) {
      this.formErrors.set(errors);
      this.isSubmitted.set(false);
      return;
    }

    this.formErrors.set([]);
    const refCode = `MV-EMP-${Math.floor(100000 + Math.random() * 900000)}`;
    this.submissionReference.set(refCode);
    this.isSubmitted.set(true);
  }

  resetForm(): void {
    this.isSubmitted.set(false);
    this.submissionReference.set('');
    this.formErrors.set([]);
    this.companyName.set('');
    this.contactName.set('');
    this.businessEmail.set('');
    this.phone.set('');
    this.selectedDisciplines.set([]);
    this.headcount.set('');
    this.engagementModel.set('');
    this.projectOverview.set('');
  }
}
