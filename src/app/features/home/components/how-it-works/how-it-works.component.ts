import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  inject,
  signal,
  PLATFORM_ID,
  NgZone,
  ElementRef,
  viewChild
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface TimelineStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

@Component({
  selector: 'app-home-how-it-works',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent],
  template: `
    <section #sectionPin class="py-24 bg-midnight text-white relative overflow-hidden">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <app-section-heading
          badge="Process Overview"
          title="How It Works"
          subtitle="A transparent, step-by-step roadmap from initial introduction to successful placement"
          [centered]="true"
        ></app-section-heading>

        <!-- Track Switcher Toggle -->
        <div class="flex justify-center mt-10 mb-16">
          <div class="p-1.5 rounded-xl bg-navy/80 border border-white/10 flex items-center gap-2">
            <button
              type="button"
              (click)="setTrack('candidates')"
              class="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer"
              [class.bg-cyan]="activeTrack() === 'candidates'"
              [class.text-midnight]="activeTrack() === 'candidates'"
              [class.text-ice]="activeTrack() !== 'candidates'"
              [class.hover:text-white]="activeTrack() !== 'candidates'"
            >
              For Candidates
            </button>
            <button
              type="button"
              (click)="setTrack('employers')"
              class="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer"
              [class.bg-cyan]="activeTrack() === 'employers'"
              [class.text-midnight]="activeTrack() === 'employers'"
              [class.text-ice]="activeTrack() !== 'employers'"
              [class.hover:text-white]="activeTrack() !== 'employers'"
            >
              For Employers
            </button>
          </div>
        </div>

        <!-- Timeline Steps Container -->
        <div class="relative max-w-4xl mx-auto">
          <!-- Central Animated SVG Progress Rail -->
          <div class="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-1 bg-white/10 rounded-full overflow-hidden" aria-hidden="true">
            <div #progressRail class="w-full bg-cyan shadow-[0_0_12px_#22D3EE] h-0 transition-all duration-300"></div>
          </div>

          <div class="space-y-10 md:space-y-16">
            @for (step of currentSteps(); track step.number; let i = $index) {
              <div
                class="timeline-step relative flex flex-col md:flex-row items-center gap-8"
                [class.md:flex-row-reverse]="i % 2 === 1"
              >
                <!-- Step Content Card -->
                <div class="w-full md:w-1/2 glass p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-cyan/40 transition-all duration-300">
                  <div class="flex items-center gap-3 mb-3">
                    <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold px-2 py-0.5 rounded bg-cyan/10 border border-cyan/20">
                      Step {{ step.number }}
                    </span>
                    <h3 class="font-heading font-bold text-xl text-white">{{ step.title }}</h3>
                  </div>
                  <p class="text-sm text-ice/85 leading-relaxed mb-4">
                    {{ step.description }}
                  </p>
                  
                  <!-- Deliverables Checklist -->
                  <div class="mt-5 pt-4 border-t border-white/10">
                    <ul class="space-y-2.5">
                      @for (detail of step.details; track $index) {
                        <li class="flex items-center gap-2.5 text-xs sm:text-sm font-medium group/item">
                          <span class="step-check-badge flex items-center justify-center w-5 h-5 rounded-md bg-cyan/15 border border-cyan/35 text-cyan shrink-0 transition-colors group-hover/item:bg-cyan group-hover/item:text-midnight">
                            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span class="step-detail-point text-ice group-hover/item:text-white transition-colors">{{ detail }}</span>
                        </li>
                      }
                    </ul>
                  </div>
                </div>

                <!-- Central Milestone Node Dot -->
                <div class="w-10 h-10 rounded-full bg-navy border-2 border-cyan text-cyan font-bold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)] shrink-0 z-10">
                  {{ step.number }}
                </div>

                <!-- Empty Balancing Space for Alternate Grid -->
                <div class="hidden md:block w-1/2"></div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class HowItWorksComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  readonly activeTrack = signal<'candidates' | 'employers'>('candidates');

  private sectionPinRef = viewChild<ElementRef<HTMLElement>>('sectionPin');
  private progressRailRef = viewChild<ElementRef<HTMLElement>>('progressRail');
  private scrollTriggerInstance: ScrollTrigger | null = null;

  readonly candidateSteps: TimelineStep[] = [
    {
      number: '01',
      title: 'Submit Resume',
      description: 'Upload your credentials and highlight your engineering discipline, software tools, and career objectives.',
      details: ['Online intake submission', 'Confidential profile registration', 'Discipline alignment check']
    },
    {
      number: '02',
      title: 'Technical Screening',
      description: 'In-depth consultation with a technical recruiter evaluating your modeling, simulation, and engineering fundamentals.',
      details: ['CAD/FEA tool verification', 'Project portfolio review', 'US code familiarity (ASHRAE, ASME, IEEE)']
    },
    {
      number: '03',
      title: 'Opportunity Matching',
      description: 'Review vetted, illustrative opportunities matching your compensation expectations and engineering focus.',
      details: ['Targeted role presentations', 'Compensation alignment', 'Client project scope review']
    },
    {
      number: '04',
      title: 'Interview Briefing',
      description: 'Comprehensive preparation for technical interview rounds with hiring managers and engineering leads.',
      details: ['Technical briefing documents', 'Mock technical discussions', 'Team culture overview']
    },
    {
      number: '05',
      title: 'Offer & Onboarding Support',
      description: 'Dedicated support through contract evaluation, compensation negotiation, and engagement launch.',
      details: ['Terms review & signing', 'Hardware & tooling setup', 'Ongoing placement support']
    }
  ];

  readonly employerSteps: TimelineStep[] = [
    {
      number: '01',
      title: 'Role Intake',
      description: 'Define precise engineering requirements, simulation packages, CAD tooling, and program timelines.',
      details: ['Technical specification brief', 'Seniority & domain scoping', 'Engagement model selection']
    },
    {
      number: '02',
      title: 'Targeted Sourcing',
      description: 'We query our specialized Indian engineering network for rigorously qualified technical talent.',
      details: ['Domain-specific candidate pool', 'Verification of engineering degrees', 'Skill & tooling vetting']
    },
    {
      number: '03',
      title: 'Shortlist Delivery',
      description: 'Receive curated technical candidate dossiers within 48 to 72 hours of mandate finalization.',
      details: ['Detailed candidate dossier', 'Technical interview notes', 'Availability & compensation fit']
    },
    {
      number: '04',
      title: 'Coordinated Interviews',
      description: 'Structured interview scheduling directly with technical leads, complete with briefing coordination.',
      details: ['Seamless schedule management', 'Technical assessment coordination', 'Feedback collection']
    },
    {
      number: '05',
      title: 'Placement & Integration',
      description: 'Onboarding coordination to ensure rapid, friction-free productivity from day one.',
      details: ['Onboarding guidance', 'Milestone follow-up', 'Long-term engagement success check']
    }
  ];

  currentSteps(): TimelineStep[] {
    return this.activeTrack() === 'candidates' ? this.candidateSteps : this.employerSteps;
  }

  setTrack(track: 'candidates' | 'employers'): void {
    this.activeTrack.set(track);
    this.refreshTimeline();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScrollTimeline();
  }

  private initScrollTimeline(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const section = this.sectionPinRef()?.nativeElement;
    const rail = this.progressRailRef()?.nativeElement;
    if (!section || !rail) return;

    this.ngZone.runOutsideAngular(() => {
      this.scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        end: 'bottom 85%',
        scrub: 0.5,
        onUpdate: (self) => {
          rail.style.height = `${self.progress * 100}%`;
        }
      });
    });
  }

  private refreshTimeline(): void {
    if (this.scrollTriggerInstance) {
      ScrollTrigger.refresh();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
      this.scrollTriggerInstance = null;
    }
  }
}
