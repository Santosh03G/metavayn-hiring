import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface CommunicationChannel {
  category: string;
  title: string;
  email: string;
  badge: string;
  description: string;
  locations?: string;
  timing: string;
  actionText: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, TiltCardDirective, RevealDirective],
  template: `
    <div class="min-h-screen bg-midnight text-white selection:bg-cyan selection:text-midnight">
      <!-- Hero Header Section -->
      <section class="py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal/15 blur-[140px] rounded-full pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <!-- Breadcrumb Navigation -->
          <nav aria-label="Breadcrumb" class="mb-6">
            <ol class="inline-flex items-center gap-2 text-xs font-mono text-ice/75">
              <li><a routerLink="/" class="hover:text-cyan transition-colors">Home</a></li>
              <li class="text-white/30">/</li>
              <li class="text-cyan font-semibold">Contact</li>
            </ol>
          </nav>

          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan/10 border border-cyan/25 text-cyan text-xs font-mono uppercase tracking-widest mb-6">
            <span class="relative flex h-1.5 w-1.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan"></span>
            </span>
            Recruitment & Operations Communications
          </span>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight max-w-4xl mx-auto">
            Connect with the Metavayn Recruitment Team
          </h1>

          <p class="text-base sm:text-lg text-ice/85 max-w-3xl mx-auto leading-relaxed mb-6 font-normal">
            Direct recruiting coordination and technical capability matching across US and Indian engineering hubs. We operate dedicated communication lines for US hiring leaders, prospective engineering contractors, and operational partners.
          </p>

          <!-- Honest Operations Disclosure Banner -->
          <div class="inline-block max-w-2xl mx-auto mb-8">
            <div class="text-xs text-ice/90 font-mono bg-navy/75 border border-white/15 rounded-2xl px-5 py-3.5 text-left sm:text-center leading-relaxed backdrop-blur-md shadow-lg shadow-black/25">
              <span class="text-cyan font-bold mr-1.5">Operations Disclosure:</span>
              Operations based in India. Direct recruiting coordination across IST and US EST/PST business hours. We do not maintain US physical offices or offer direct US employment.
            </div>
          </div>
        </div>
      </section>

      <!-- 3 Direct Communication Channels Section -->
      <section class="py-16 md:py-20 border-b border-white/10 bg-navy/10 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Direct Inboxes</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
              Direct Communication Channels
            </h2>
            <p class="text-sm sm:text-base text-ice/70 max-w-2xl mx-auto">
              Route your query directly to the appropriate team for rapid turnaround without generic ticketing queues.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (channel of communicationChannels; track channel.title) {
              <div appTilt appReveal class="bg-navy/50 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan/30 transition-all">
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-cyan">
                      {{ channel.category }}
                    </span>
                    <span class="text-xs font-mono text-slate">{{ channel.badge }}</span>
                  </div>

                  <h3 class="text-xl font-heading font-bold text-white mb-2">
                    {{ channel.title }}
                  </h3>

                  <div class="mb-4">
                    <a
                      [href]="'mailto:' + channel.email"
                      class="text-sm font-mono text-cyan hover:underline break-all inline-flex items-center gap-1.5"
                    >
                      <svg class="w-4 h-4 text-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      {{ channel.email }}
                    </a>
                  </div>

                  <p class="text-xs sm:text-sm text-ice/70 leading-relaxed mb-4">
                    {{ channel.description }}
                  </p>

                  @if (channel.locations) {
                    <div class="text-xs font-mono text-slate mb-2">
                      <span class="text-white/80 font-semibold">Locations:</span> {{ channel.locations }}
                    </div>
                  }
                </div>

                <div class="pt-4 border-t border-white/10 text-xs font-mono text-slate flex items-center justify-between">
                  <span>{{ channel.timing }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Interactive General Message Form Section -->
      <section class="py-16 md:py-24 border-b border-white/10 relative">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Direct Message</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
              Send a General Inquiry
            </h2>
            <p class="text-sm sm:text-base text-ice/70">
              Have a specific question about our candidate screening methodology, pricing structure, or cross-border compliance? Send us a message directly.
            </p>
          </div>

          <div class="contact-form bg-navy/40 border border-white/10 rounded-2xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm">
            @if (!isSubmitted()) {
              <!-- Error Summary Banner -->
              @if (formErrors().length > 0) {
                <div class="mb-6 p-4 rounded-xl bg-crimson/10 border border-crimson/30 text-crimson text-xs sm:text-sm font-mono space-y-1">
                  <div class="font-bold flex items-center gap-2 mb-1 text-crimson">
                    <svg class="w-4 h-4 text-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    Please correct the following:
                  </div>
                  @for (err of formErrors(); track $index) {
                    <p class="text-white/80">&bull; {{ err }}</p>
                  }
                </div>
              }

              <form (submit)="$event.preventDefault(); sendMessage()" class="space-y-6">
                <!-- Name and Email grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
                      Full Name <span class="text-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      [value]="name()"
                      (input)="name.set($any($event.target).value)"
                      placeholder="e.g. Marcus Vance"
                      class="w-full bg-navy/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate/50 text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
                      Email Address <span class="text-cyan">*</span>
                    </label>
                    <input
                      type="email"
                      [value]="email()"
                      (input)="email.set($any($event.target).value)"
                      placeholder="e.g. marcus@vanceengineering.com"
                      class="w-full bg-navy/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate/50 text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                    />
                  </div>
                </div>

                <!-- Inquiry Type Selection -->
                <div>
                  <label class="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
                    Inquiry Type <span class="text-cyan">*</span>
                  </label>
                  <select
                    [value]="inquiryType()"
                    (change)="inquiryType.set($any($event.target).value)"
                    class="w-full bg-navy/80 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                  >
                    @for (type of inquiryTypes; track type) {
                      <option [value]="type" class="bg-navy text-white">{{ type }}</option>
                    }
                  </select>
                </div>

                <!-- Message -->
                <div>
                  <label class="block text-xs font-mono uppercase tracking-wider text-slate mb-2">
                    Message <span class="text-cyan">*</span>
                  </label>
                  <textarea
                    rows="5"
                    [value]="message()"
                    (input)="message.set($any($event.target).value)"
                    placeholder="Provide details about your project, candidate inquiry, or operational question (minimum 15 characters)..."
                    class="w-full bg-navy/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate/50 text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors resize-none"
                  ></textarea>
                </div>

                <!-- Submit Button: strictly variant="primary", NEVER amber! -->
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div class="text-xs text-slate font-mono">
                    Direct confidential dispatch &bull; 1 business day SLA
                  </div>
                  <app-button variant="primary" (click)="sendMessage()">
                    Send Message
                  </app-button>
                </div>
              </form>
            } @else {
              <!-- Post-Submission Confirmation Screen -->
              <div class="p-4 sm:p-8 text-center relative overflow-hidden">
                <div class="w-16 h-16 rounded-full bg-cyan/10 border border-cyan/40 text-cyan flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>

                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-wider mb-4">
                  Reference: {{ submissionReference() }}
                </span>

                <h3 class="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
                  Message Received
                </h3>

                <p class="text-sm sm:text-base text-ice/80 max-w-lg mx-auto leading-relaxed mb-6">
                  Thank you, <span class="text-white font-semibold">{{ name() }}</span>. Your inquiry regarding <span class="text-cyan font-mono">{{ inquiryType() }}</span> has been routed to our recruitment leads. We will review your message and respond within 1 business day.
                </p>

                <div class="p-4 rounded-xl bg-midnight/80 border border-white/10 max-w-md mx-auto mb-8 text-left text-xs text-slate font-mono">
                  <div class="text-white font-bold mb-1">Confirmation Details:</div>
                  <div>Reference ID: <span class="text-cyan">{{ submissionReference() }}</span></div>
                  <div>Sender: {{ email() }}</div>
                  <div>Response SLA: Within 1 business day</div>
                </div>

                <div class="flex justify-center">
                  <app-button variant="ghost" (click)="resetForm()">
                    Send Another Message
                  </app-button>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Fast-Track Direct Cards Section (Strict Amber isolation on candidate) -->
      <section class="py-16 md:py-24 bg-gradient-to-b from-navy/20 to-midnight relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <span class="text-xs font-mono uppercase tracking-widest text-cyan mb-2 block">Fast-Track Routing</span>
            <h2 class="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
              Direct Access Portals
            </h2>
            <p class="text-sm sm:text-base text-ice/70 max-w-2xl mx-auto">
              Skip general correspondence by using our specialized workflows for candidates and engineering hiring managers.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <!-- Candidate Card: STRICT AMBER ISOLATION -->
            <div appTilt appReveal class="bg-navy/40 border border-amber/30 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between">
              <div class="absolute -top-24 right-0 w-64 h-64 bg-amber/10 blur-[100px] rounded-full pointer-events-none"></div>

              <div>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber text-xs font-mono uppercase tracking-wider mb-4">
                  For Engineers
                </span>
                <h3 class="text-2xl font-heading font-bold text-white mb-3">
                  Are You an Engineer Seeking US Placements?
                </h3>
                <p class="text-sm text-ice/70 leading-relaxed mb-6">
                  Skip the general inbox. Upload your resume, select your domain practice (HVAC, Piping, Structural, Electrical, Simulation), and enter our technical evaluation pipeline directly.
                </p>
              </div>

              <div class="pt-4 border-t border-white/10 flex items-center justify-between">
                <span class="text-xs font-mono text-slate">Direct talent screening</span>
                <!-- STRICT AMBER CTA: ONLY THIS BUTTON ON THE ENTIRE PAGE USES variant="amber-cta" -->
                <app-button variant="amber-cta" href="/candidates">
                  Submit Your Resume
                </app-button>
              </div>
            </div>

            <!-- Employer Card: Primary CTA -->
            <div appTilt appReveal class="bg-navy/40 border border-cyan/30 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between">
              <div class="absolute -top-24 right-0 w-64 h-64 bg-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>

              <div>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono uppercase tracking-wider mb-4">
                  For US Employers
                </span>
                <h3 class="text-2xl font-heading font-bold text-white mb-3">
                  Need Pre-Vetted Engineering Talent?
                </h3>
                <p class="text-sm text-ice/70 leading-relaxed mb-6">
                  Define your engineering discipline, tool requirements (Revit, ANSYS, SolidWorks), and engagement model. Our Practice Leads deliver candidate dossiers within 48 hours.
                </p>
              </div>

              <div class="pt-4 border-t border-white/10 flex items-center justify-between">
                <span class="text-xs font-mono text-slate">24h requirement scoping</span>
                <app-button variant="primary" href="/employers">
                  Hire Engineering Talent
                </app-button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ContactComponent {
  // Form signals
  name = signal<string>('');
  email = signal<string>('');
  inquiryType = signal<string>('Hiring US Engineering Talent');
  message = signal<string>('');

  // Status signals
  isSubmitted = signal<boolean>(false);
  submissionReference = signal<string>('');
  formErrors = signal<string[]>([]);

  readonly inquiryTypes: string[] = [
    'Hiring US Engineering Talent',
    'Candidate Applications & Screening',
    'Cross-Border Operations & Compliance',
    'General Inquiry & Partnerships',
  ];

  readonly communicationChannels: CommunicationChannel[] = [
    {
      category: 'Engineering Candidates',
      title: 'Candidate Applications & Resumes',
      email: 'hiring@metavayn.com',
      badge: 'Talent Network',
      description: 'Submit your resume, portfolio, and CAD/BIM samples. Direct inquiries regarding technical screening and interview timelines.',
      timing: 'Response within 24 hours',
      actionText: 'Email Candidate Team'
    },
    {
      category: 'US Hiring Teams',
      title: 'Employer & Partner Inquiries',
      email: 'partners@metavayn.com',
      badge: 'Client Engagements',
      description: 'Discuss technical requirements, team sizing, domain expertise, and US engineering code alignment with our Practice Leads.',
      timing: 'Direct consult within 1 business day',
      actionText: 'Email Partner Team'
    },
    {
      category: 'Delivery Operations',
      title: 'Operations Hubs & Screening Labs',
      email: 'operations@metavayn.com',
      badge: 'India Centers',
      description: 'Coordinating technical assessment centers, verified workstation infrastructure, and recruiter operations.',
      locations: 'Bengaluru, Pune, Hyderabad',
      timing: 'Mon-Fri 9 AM - 8 PM IST',
      actionText: 'Email Operations'
    }
  ];

  sendMessage(): void {
    const errors: string[] = [];
    const nameVal = this.name().trim();
    const emailVal = this.email().trim();
    const typeVal = this.inquiryType().trim();
    const msgVal = this.message().trim();

    if (!nameVal) {
      errors.push('Full name is required.');
    } else if (nameVal.length < 2) {
      errors.push('Full name must be at least 2 characters.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      errors.push('Email address is required.');
    } else if (!emailRegex.test(emailVal)) {
      errors.push('Please enter a valid email address.');
    }

    if (!typeVal) {
      errors.push('Inquiry type is required.');
    }

    if (!msgVal) {
      errors.push('Message is required.');
    } else if (msgVal.length < 15) {
      errors.push('Message must be at least 15 characters long.');
    }

    if (errors.length > 0) {
      this.formErrors.set(errors);
      this.isSubmitted.set(false);
      return;
    }

    this.formErrors.set([]);
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    this.submissionReference.set(`MV-MSG-${randomCode}`);
    this.isSubmitted.set(true);
  }

  resetForm(): void {
    this.name.set('');
    this.email.set('');
    this.inquiryType.set('Hiring US Engineering Talent');
    this.message.set('');
    this.formErrors.set([]);
    this.submissionReference.set('');
    this.isSubmitted.set(false);
  }
}
