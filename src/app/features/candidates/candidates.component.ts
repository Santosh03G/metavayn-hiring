import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { DISCIPLINES } from '../../data/disciplines.data';
import { FEATURED_JOBS } from '../../data/jobs.data';
import {
  CandidateApplication,
  EXPERIENCE_LEVELS,
  COMMON_US_CODES,
  COMMON_TOOLS,
  validateCandidateApplication
} from '../../data/candidate.model';

interface VettingStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-candidates',
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
            India Talent Network
          </span>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
            Work with Top US Engineering Firms
          </h1>
          <p class="text-base sm:text-lg text-ice/80 max-w-3xl mx-auto leading-relaxed mb-6">
            Directly connect your domain expertise in HVAC, Mechanical, Electrical, and Simulation with leading US client mandates. High-impact remote roles with USD-benchmarked remuneration.
          </p>

          <!-- Honest Disclosure Banner -->
          <div class="inline-block max-w-2xl mx-auto mb-4">
            <div class="text-xs text-ice/90 font-mono bg-navy/75 border border-white/15 rounded-2xl px-5 py-3.5 text-left sm:text-center leading-relaxed backdrop-blur-md shadow-lg shadow-black/25">
              <span class="text-cyan font-bold mr-1.5">Disclosure:</span>
              Metavayn is an India-based engineering recruitment firm connecting top engineering talent in India with US engineering clients. Placements are structured as remote contractor or direct-hire services without US visa sponsorship.
            </div>
          </div>

          <div>
            <a routerLink="/jobs" class="text-xs font-mono text-cyan hover:underline inline-flex items-center gap-1">
              View sample client mandates &rarr;
            </a>
          </div>
        </div>
      </section>

      <!-- Main Interactive Intake Funnel Section -->
      <section class="py-16 bg-navy/20 relative">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          @if (!isSubmitted()) {
            <!-- Stepper Indicator -->
            <div class="mb-12">
              <div class="flex items-center justify-between max-w-lg mx-auto relative">
                <!-- Connector line -->
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 z-0"></div>
                <div
                  class="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-cyan to-royal transition-all duration-500 z-0"
                  [style.width]="currentStage() === 1 ? '0%' : currentStage() === 2 ? '50%' : '100%'"
                ></div>

                <!-- Stage 1 Button -->
                <button
                  type="button"
                  (click)="goToStage(1)"
                  class="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300"
                    [ngClass]="currentStage() >= 1 ? 'bg-cyan text-midnight ring-4 ring-cyan/20' : 'bg-navy border border-white/20 text-slate'"
                  >
                    1
                  </div>
                  <span
                    class="text-xs font-mono mt-2 font-medium transition-colors"
                    [ngClass]="currentStage() === 1 ? 'text-cyan' : 'text-slate'"
                  >
                    Profile
                  </span>
                </button>

                <!-- Stage 2 Button -->
                <button
                  type="button"
                  (click)="goToStage(2)"
                  class="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300"
                    [ngClass]="currentStage() >= 2 ? 'bg-cyan text-midnight ring-4 ring-cyan/20' : 'bg-navy border border-white/20 text-slate'"
                  >
                    2
                  </div>
                  <span
                    class="text-xs font-mono mt-2 font-medium transition-colors"
                    [ngClass]="currentStage() === 2 ? 'text-cyan' : 'text-slate'"
                  >
                    Technical
                  </span>
                </button>

                <!-- Stage 3 Button -->
                <button
                  type="button"
                  (click)="goToStage(3)"
                  class="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300"
                    [ngClass]="currentStage() === 3 ? 'bg-cyan text-midnight ring-4 ring-cyan/20' : 'bg-navy border border-white/20 text-slate'"
                  >
                    3
                  </div>
                  <span
                    class="text-xs font-mono mt-2 font-medium transition-colors"
                    [ngClass]="currentStage() === 3 ? 'text-cyan' : 'text-slate'"
                  >
                    Verification
                  </span>
                </button>
              </div>
            </div>

            <!-- Form Card Wrapper -->
            <div class="bg-navy/60 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan/5 blur-3xl rounded-full pointer-events-none"></div>

              <!-- Stage 1: Personal Profile & Discipline -->
              @if (currentStage() === 1) {
                <div>
                  <div class="mb-8 border-b border-white/10 pb-4">
                    <h2 class="text-2xl font-heading font-bold text-white mb-2">Personal Profile & Discipline</h2>
                    <p class="text-sm text-ice/70">Provide your contact details and primary engineering domain.</p>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <!-- Full Name -->
                    <div>
                      <label class="block text-xs font-mono text-ice/80 uppercase tracking-wider mb-2">
                        Full Name <span class="text-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        [value]="fullName()"
                        (input)="fullName.set($any($event.target).value)"
                        placeholder="e.g. Arun Kumar"
                        class="w-full bg-navy/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate focus:outline-none focus:border-cyan transition-colors"
                      />
                    </div>

                    <!-- Email -->
                    <div>
                      <label class="block text-xs font-mono text-ice/80 uppercase tracking-wider mb-2">
                        Email Address <span class="text-cyan">*</span>
                      </label>
                      <input
                        type="email"
                        [value]="email()"
                        (input)="email.set($any($event.target).value)"
                        placeholder="arun.kumar@example.com"
                        class="w-full bg-navy/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate focus:outline-none focus:border-cyan transition-colors"
                      />
                    </div>

                    <!-- Phone Number -->
                    <div>
                      <label class="block text-xs font-mono text-ice/80 uppercase tracking-wider mb-2">
                        Phone / WhatsApp <span class="text-cyan">*</span>
                      </label>
                      <input
                        type="tel"
                        [value]="phone()"
                        (input)="phone.set($any($event.target).value)"
                        placeholder="+91 99887 76655"
                        class="w-full bg-navy/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate focus:outline-none focus:border-cyan transition-colors"
                      />
                    </div>

                    <!-- Location in India -->
                    <div>
                      <label class="block text-xs font-mono text-ice/80 uppercase tracking-wider mb-2">
                        Location in India <span class="text-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        [value]="location()"
                        (input)="location.set($any($event.target).value)"
                        placeholder="e.g. Bengaluru, Pune, Hyderabad, Chennai"
                        class="w-full bg-navy/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate focus:outline-none focus:border-cyan transition-colors"
                      />
                    </div>
                  </div>

                  <!-- Primary Engineering Discipline Selection -->
                  <div class="mb-8">
                    <label class="block text-xs font-mono text-ice/80 uppercase tracking-wider mb-3">
                      Select Primary Engineering Discipline <span class="text-cyan">*</span>
                    </label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      @for (disc of disciplines; track disc.id) {
                        <button
                          type="button"
                          (click)="selectDiscipline(disc.slug)"
                          class="p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between"
                          [ngClass]="selectedDiscipline() === disc.slug ? 'bg-cyan/15 border-cyan shadow-sm shadow-cyan/20' : 'bg-navy/40 border-white/10 hover:border-white/25'"
                        >
                          <div>
                            <span class="block text-sm font-semibold text-white mb-1">{{ disc.name }}</span>
                            <span class="text-xs text-slate line-clamp-2">{{ disc.shortDescription }}</span>
                          </div>
                          @if (selectedDiscipline() === disc.slug) {
                            <span class="inline-flex items-center gap-1 text-[11px] font-mono text-cyan mt-3">
                              <span class="w-1.5 h-1.5 rounded-full bg-cyan"></span>
                              Selected
                            </span>
                          }
                        </button>
                      }
                    </div>
                  </div>

                  <!-- Specific Role Interest (Filtered by discipline) -->
                  <div class="mb-8">
                    <label class="block text-xs font-mono text-ice/80 uppercase tracking-wider mb-2">
                      Specific Target Role Interest (Optional)
                    </label>
                    <select
                      [value]="selectedRoleInterest()"
                      (change)="selectedRoleInterest.set($any($event.target).value)"
                      class="w-full bg-navy/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan transition-colors"
                    >
                      <option value="" class="bg-midnight text-white">General Application / Open to Any Relevant Role</option>
                      @for (job of availableRoles(); track job.id) {
                        <option [value]="job.id" class="bg-midnight text-white">
                          {{ job.title }} ({{ job.discipline }})
                        </option>
                      }
                    </select>
                  </div>

                  <!-- Navigation Actions -->
                  <div class="flex justify-end pt-4 border-t border-white/10">
                    <app-button variant="primary" (click)="goToStage(2)">
                      Continue to Technical Skills &rarr;
                    </app-button>
                  </div>
                </div>
              }

              <!-- Stage 2: Technical Expertise & US Standards -->
              @if (currentStage() === 2) {
                <div>
                  <div class="mb-8 border-b border-white/10 pb-4">
                    <h2 class="text-2xl font-heading font-bold text-white mb-2">Technical Expertise & US Standards</h2>
                    <p class="text-sm text-ice/70">Specify your engineering seniority, primary software stack, and US regulatory familiarity.</p>
                  </div>

                  <!-- Experience Level Tier -->
                  <div class="mb-8">
                    <label class="block text-xs font-mono text-ice/80 uppercase tracking-wider mb-3">
                      Experience Level <span class="text-cyan">*</span>
                    </label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      @for (level of experienceLevels; track level) {
                        <button
                          type="button"
                          (click)="experienceLevel.set(level)"
                          class="p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer"
                          [ngClass]="experienceLevel() === level ? 'bg-cyan/15 border-cyan text-white shadow-sm shadow-cyan/20' : 'bg-navy/40 border-white/10 text-ice/80 hover:border-white/25'"
                        >
                          <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold">{{ level }}</span>
                            @if (experienceLevel() === level) {
                              <span class="w-2 h-2 rounded-full bg-cyan"></span>
                            }
                          </div>
                        </button>
                      }
                    </div>
                  </div>

                  <!-- CAD & Simulation Tools Multi-Select -->
                  <div class="mb-8">
                    <div class="flex items-center justify-between mb-3">
                      <label class="text-xs font-mono text-ice/80 uppercase tracking-wider">
                        CAD, BIM & Simulation Tools (Select all that apply)
                      </label>
                      <span class="text-xs font-mono text-cyan">{{ selectedTools().length }} selected</span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                      @for (tool of commonTools; track tool) {
                        <button
                          type="button"
                          (click)="toggleTool(tool)"
                          class="px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer border"
                          [ngClass]="selectedTools().includes(tool) ? 'bg-cyan text-midnight border-cyan font-bold shadow-sm' : 'bg-navy/60 text-ice/80 border-white/15 hover:border-white/30'"
                        >
                          {{ tool }}
                        </button>
                      }
                    </div>
                  </div>

                  <!-- US Engineering Codes Checkboxes -->
                  <div class="mb-8">
                    <div class="flex items-center justify-between mb-3">
                      <label class="text-xs font-mono text-ice/80 uppercase tracking-wider">
                        US Codes & Regulatory Standards Familiarity
                      </label>
                      <span class="text-xs font-mono text-cyan">{{ selectedUsCodes().length }} selected</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      @for (code of commonUsCodes; track code) {
                        <label
                          class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors"
                          [ngClass]="selectedUsCodes().includes(code) ? 'bg-cyan/10 border-cyan/40' : 'bg-navy/40 border-white/10 hover:border-white/20'"
                        >
                          <input
                            type="checkbox"
                            [checked]="selectedUsCodes().includes(code)"
                            (change)="toggleUsCode(code)"
                            class="w-4 h-4 rounded border-white/20 bg-navy/80 text-cyan focus:ring-cyan focus:ring-offset-0 focus:ring-1"
                          />
                          <span class="text-xs text-ice/90 font-mono">{{ code }}</span>
                        </label>
                      }
                    </div>
                  </div>

                  <!-- Navigation Actions -->
                  <div class="flex justify-between pt-4 border-t border-white/10">
                    <app-button variant="ghost" (click)="goToStage(1)">
                      &larr; Back
                    </app-button>
                    <app-button variant="primary" (click)="goToStage(3)">
                      Continue to Verification &rarr;
                    </app-button>
                  </div>
                </div>
              }

              <!-- Stage 3: Verification & Resume Submission -->
              @if (currentStage() === 3) {
                <div>
                  <div class="mb-8 border-b border-white/10 pb-4">
                    <h2 class="text-2xl font-heading font-bold text-white mb-2">Verification & Resume Submission</h2>
                    <p class="text-sm text-ice/70">Acknowledge recruitment disclosures and summarize your engineering background.</p>
                  </div>

                  <!-- LinkedIn / Portfolio URL -->
                  <div class="mb-6">
                    <label class="block text-xs font-mono text-ice/80 uppercase tracking-wider mb-2">
                      LinkedIn Profile or Portfolio URL
                    </label>
                    <input
                      type="url"
                      [value]="linkedinUrl()"
                      (input)="linkedinUrl.set($any($event.target).value)"
                      placeholder="https://linkedin.com/in/yourprofile"
                      class="w-full bg-navy/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate focus:outline-none focus:border-cyan transition-colors"
                    />
                  </div>

                  <!-- Resume Summary Textarea -->
                  <div class="mb-6">
                    <div class="flex items-center justify-between mb-2">
                      <label class="text-xs font-mono text-ice/80 uppercase tracking-wider">
                        Resume Summary & Key Project Accomplishments <span class="text-cyan">*</span>
                      </label>
                      <span class="text-xs font-mono text-slate">Min 20 characters</span>
                    </div>
                    <textarea
                      rows="5"
                      [value]="resumeText()"
                      (input)="resumeText.set($any($event.target).value)"
                      placeholder="Describe your design engineering experience, major projects delivered to US/global clients, key sizing/FEA accomplishments, and software tools mastered..."
                      class="w-full bg-navy/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate focus:outline-none focus:border-cyan transition-colors"
                    ></textarea>
                  </div>

                  <!-- Mandatory Honest Disclosure Notice Banner -->
                  <div class="rounded-xl bg-amber/10 border border-amber/30 p-5 mb-6 text-left">
                    <div class="flex items-start gap-3">
                      <div class="w-2.5 h-2.5 rounded-full bg-amber mt-1.5 shrink-0 animate-pulse"></div>
                      <div>
                        <h4 class="text-amber font-mono text-xs font-bold uppercase tracking-wider mb-1">
                          Operational Scope & Visa Disclosure
                        </h4>
                        <p class="text-xs text-ice/90 leading-relaxed">
                          Metavayn is an India-based engineering recruitment firm connecting top engineering talent in India with US engineering clients. Placements are structured as direct remote contractor engagements or offshore services. Metavayn does not provide US visa sponsorship or employment authorization under any circumstance.
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Mandatory Consent Checkbox -->
                  <div class="mb-6">
                    <label class="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        [checked]="agreedToTerms()"
                        (change)="agreedToTerms.set($any($event.target).checked)"
                        class="mt-1 w-4 h-4 rounded border-white/20 bg-navy/80 text-amber focus:ring-amber focus:ring-offset-0 focus:ring-1"
                      />
                      <span class="text-xs text-ice/80 leading-relaxed group-hover:text-white transition-colors">
                        I acknowledge and agree that Metavayn operates as an India-based engineering recruitment firm and does not provide US visa sponsorship. I confirm that all submitted background details and credentials are genuine and verifiable.
                      </span>
                    </label>
                  </div>

                  <!-- Form Errors Alert -->
                  @if (formErrors().length > 0) {
                    <div class="rounded-xl bg-red-500/10 border border-red-500/30 p-4 mb-6 text-left">
                      <div class="text-red-400 text-xs font-mono font-bold mb-2">Please correct the following before submission:</div>
                      <ul class="list-disc list-inside text-xs text-red-300 space-y-1">
                        @for (err of formErrors(); track err) {
                          <li>{{ err }}</li>
                        }
                      </ul>
                    </div>
                  }

                  <!-- Navigation Actions (Strict Amber CTA Isolation) -->
                  <div class="flex justify-between items-center pt-4 border-t border-white/10">
                    <app-button variant="ghost" (click)="goToStage(2)">
                      &larr; Back
                    </app-button>
                    <!-- Strictly isolated Amber CTA: Only this submission action uses variant="amber-cta" -->
                    <app-button variant="amber-cta" (click)="submitApplication()">
                      Submit Your Resume
                    </app-button>
                  </div>
                </div>
              }
            </div>
          } @else {
            <!-- Post-Submission Confirmation View -->
            <div class="bg-navy/60 border border-cyan/30 rounded-2xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
              <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan/15 blur-3xl rounded-full pointer-events-none"></div>

              <!-- Animated Checkmark Icon -->
              <div class="w-16 h-16 rounded-full bg-cyan/10 border border-cyan/40 text-cyan flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>

              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-wider mb-4">
                Reference: {{ submissionReference() }}
              </span>

              <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                Application Received
              </h2>

              <p class="text-base text-ice/80 max-w-xl mx-auto leading-relaxed mb-8">
                Thank you, <span class="text-white font-semibold">{{ fullName() }}</span>. Your candidate profile has been queued for our senior technical review team. We evaluate US code alignment and domain depth within 48 to 72 business hours.
              </p>

              <!-- Next Steps Roadmap -->
              <div class="max-w-2xl mx-auto bg-midnight/60 border border-white/10 rounded-xl p-6 mb-8 text-left">
                <h3 class="text-xs font-mono uppercase tracking-widest text-cyan mb-4 font-bold">Next Steps in Your Journey</h3>
                <div class="space-y-4">
                  <div class="flex items-start gap-3">
                    <span class="w-6 h-6 rounded-full bg-cyan/20 text-cyan text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <h4 class="text-sm font-semibold text-white">Technical Dossier Review (48-72h)</h4>
                      <p class="text-xs text-slate">Our Principal Engineers assess your CAD samples, calculation sheets, and American standard competencies.</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="w-6 h-6 rounded-full bg-cyan/20 text-cyan text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <h4 class="text-sm font-semibold text-white">Domain Competency Interview</h4>
                      <p class="text-xs text-slate">A 45-minute live technical discussion covering ASME/ASHRAE/NEC problem-solving scenarios.</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="w-6 h-6 rounded-full bg-cyan/20 text-cyan text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div>
                      <h4 class="text-sm font-semibold text-white">US Client Matching & Offer</h4>
                      <p class="text-xs text-slate">Direct presentation to hiring executives with transparent USD-benchmarked compensation terms.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <app-button variant="primary" href="/jobs">
                  Explore Sample Roles
                </app-button>
                <app-button variant="ghost" (click)="resetForm()">
                  Submit Another Profile
                </app-button>
              </div>
            </div>
          }

        </div>
      </section>

      <!-- Candidate Vetting Journey (4-Step Cards) -->
      <section class="py-20 border-t border-white/10 bg-midnight relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Rigorous Vetting</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              The Metavayn Candidate Journey
            </h2>
            <p class="text-base text-ice/70 max-w-2xl mx-auto">
              Our 4-stage technical verification highlights your real engineering competence directly to US hiring directors.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (step of vettingSteps; track step.number) {
              <div
                appTilt
                appReveal
                class="bg-navy/40 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan/40 transition-colors duration-300"
              >
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-2xl font-mono font-bold text-cyan">{{ step.number }}</span>
                    <span class="text-[11px] font-mono text-slate px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {{ step.duration }}
                    </span>
                  </div>
                  <h3 class="text-lg font-bold text-white mb-2">{{ step.title }}</h3>
                  <p class="text-xs text-ice/70 leading-relaxed mb-4">{{ step.description }}</p>
                </div>
                <div class="border-t border-white/10 pt-3">
                  <div class="text-[10px] font-mono uppercase tracking-wider text-slate mb-2">Key Criteria:</div>
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

      <!-- Candidate FAQs Accordion -->
      <section class="py-20 border-t border-white/10 bg-navy/20 relative">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Clear Answers</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              Candidate Frequently Asked Questions
            </h2>
            <p class="text-base text-ice/70">
              Honest transparency regarding working conditions, compensation models, and overseas engagement.
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
    </div>
  `
})
export class CandidatesComponent implements OnInit {
  private route = inject(ActivatedRoute);

  // Stepper & Submission state
  currentStage = signal<1 | 2 | 3>(1);
  isSubmitted = signal<boolean>(false);
  submissionReference = signal<string>('');
  formErrors = signal<string[]>([]);
  openFaqIndex = signal<number | null>(null);

  // Form Fields
  fullName = signal<string>('');
  email = signal<string>('');
  phone = signal<string>('');
  location = signal<string>('');
  selectedDiscipline = signal<string>('');
  selectedRoleInterest = signal<string>('');
  experienceLevel = signal<string>('');
  selectedTools = signal<string[]>([]);
  selectedUsCodes = signal<string[]>([]);
  linkedinUrl = signal<string>('');
  resumeText = signal<string>('');
  agreedToTerms = signal<boolean>(false);

  // Constants
  readonly disciplines = DISCIPLINES;
  readonly featuredJobs = FEATURED_JOBS;
  readonly experienceLevels = EXPERIENCE_LEVELS;
  readonly commonTools = COMMON_TOOLS;
  readonly commonUsCodes = COMMON_US_CODES;

  // Filtered roles based on chosen discipline
  availableRoles = computed(() => {
    const disc = this.selectedDiscipline();
    if (!disc) return this.featuredJobs;
    return this.featuredJobs.filter(j => j.disciplineSlug === disc);
  });

  readonly vettingSteps: VettingStep[] = [
    {
      number: '01',
      title: 'Technical Portfolio Audit',
      duration: 'Day 1 - 2',
      description: 'Review of past commercial calculation sheets, 3D CAD/BIM model samples, and code adherence.',
      deliverables: ['Revit / SolidWorks drawing review', 'ASHRAE / ASME calculation audit']
    },
    {
      number: '02',
      title: 'Principal Scenario Interview',
      duration: 'Day 3 - 5',
      description: 'Live 60-minute technical session with an industry practice lead evaluating US standards problem solving.',
      deliverables: ['Real-time code application', 'English technical communication']
    },
    {
      number: '03',
      title: 'Curated Client Matching',
      duration: 'Week 2',
      description: 'Your verified profile dossier is directly pitched to US Engineering Directors and Practice Leads.',
      deliverables: ['Targeted role presentations', 'Bypassing generic HR portals']
    },
    {
      number: '04',
      title: 'High-Yield Placement',
      duration: 'Week 3',
      description: 'Final client interviews followed by cross-border contracts pegged to US Dollar benchmarks.',
      deliverables: ['USD-benchmarked remuneration', 'Direct engineering collaboration']
    }
  ];

  readonly faqs: FaqItem[] = [
    {
      question: 'Does Metavayn provide or sponsor US work visas (such as H-1B or L-1)?',
      answer: 'No. Metavayn operates exclusively as an India-based engineering recruitment firm. All roles are structured as direct remote contractor engagements or cross-border technical services performed from India. We do not provide or sponsor US employment visas.'
    },
    {
      question: 'How does compensation work for Indian engineers working with US clients?',
      answer: 'Placements carry compensation pegged to US Dollar market benchmarks (or paid in INR pegged to agreed USD equivalents). Engineers routinely achieve top 1% domestic compensation multiples while remaining in India.'
    },
    {
      question: 'What working hours and time zones are expected?',
      answer: 'Most US clients require a 3 to 4 hour daily collaboration overlap during US East Coast (EST) or Pacific (PST) business hours. The remainder of engineering deliverables are managed asynchronously.'
    },
    {
      question: 'What hardware and software tools are needed for remote work?',
      answer: 'Candidates should have a reliable high-speed fiber internet connection and a dedicated workspace. Clients typically provide licensed cloud licenses (AutoCAD, Revit, SolidWorks) or secure cloud Virtual Desktop Infrastructure (VDI).'
    },
    {
      question: 'What if my specific discipline or role is not listed in the sample roles?',
      answer: 'You can submit your resume selecting the "General Application" option. Our recruiting practice frequently takes on confidential mandates across specialized MEP, industrial automation, and civil engineering disciplines.'
    }
  ];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['discipline']) {
        this.selectedDiscipline.set(params['discipline']);
      }
      if (params['role']) {
        this.selectedRoleInterest.set(params['role']);
        if (!params['discipline']) {
          const match = this.featuredJobs.find(j => j.id === params['role']);
          if (match) {
            this.selectedDiscipline.set(match.disciplineSlug);
          }
        }
      }
    });
  }

  goToStage(stage: 1 | 2 | 3): void {
    this.currentStage.set(stage);
  }

  selectDiscipline(slug: string): void {
    this.selectedDiscipline.set(slug);
    // If the currently selected role does not match this discipline, reset role interest
    const currentRole = this.selectedRoleInterest();
    if (currentRole) {
      const match = this.featuredJobs.find(j => j.id === currentRole);
      if (match && match.disciplineSlug !== slug) {
        this.selectedRoleInterest.set('');
      }
    }
  }

  toggleTool(tool: string): void {
    const curr = this.selectedTools();
    if (curr.includes(tool)) {
      this.selectedTools.set(curr.filter(t => t !== tool));
    } else {
      this.selectedTools.set([...curr, tool]);
    }
  }

  toggleUsCode(code: string): void {
    const curr = this.selectedUsCodes();
    if (curr.includes(code)) {
      this.selectedUsCodes.set(curr.filter(c => c !== code));
    } else {
      this.selectedUsCodes.set([...curr, code]);
    }
  }

  toggleFaq(index: number): void {
    if (this.openFaqIndex() === index) {
      this.openFaqIndex.set(null);
    } else {
      this.openFaqIndex.set(index);
    }
  }

  submitApplication(): void {
    const application: CandidateApplication = {
      fullName: this.fullName(),
      email: this.email(),
      phone: this.phone(),
      location: this.location(),
      discipline: this.selectedDiscipline(),
      roleInterest: this.selectedRoleInterest() || undefined,
      experienceLevel: this.experienceLevel(),
      softwareTools: this.selectedTools(),
      usCodes: this.selectedUsCodes(),
      linkedinUrl: this.linkedinUrl(),
      resumeText: this.resumeText(),
      agreedToTerms: this.agreedToTerms()
    };

    const errors = validateCandidateApplication(application);
    if (errors.length > 0) {
      this.formErrors.set(errors);
      this.isSubmitted.set(false);
      return;
    }

    this.formErrors.set([]);
    const refCode = `MV-CAND-${Math.floor(100000 + Math.random() * 900000)}`;
    this.submissionReference.set(refCode);
    this.isSubmitted.set(true);
  }

  resetForm(): void {
    this.isSubmitted.set(false);
    this.currentStage.set(1);
    this.submissionReference.set('');
    this.formErrors.set([]);
    this.fullName.set('');
    this.email.set('');
    this.phone.set('');
    this.location.set('');
    this.selectedDiscipline.set('');
    this.selectedRoleInterest.set('');
    this.experienceLevel.set('');
    this.selectedTools.set([]);
    this.selectedUsCodes.set([]);
    this.linkedinUrl.set('');
    this.resumeText.set('');
    this.agreedToTerms.set(false);
  }
}
