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
          subtitle="How we evaluate technical ability, coordinate interviews, and support engineers and employers through day one"
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
          <!-- Central Animated SVG Progress Rail (Desktop) -->
          <div class="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-1 bg-white/10 rounded-full overflow-hidden" aria-hidden="true">
            <div #progressRail class="w-full bg-cyan shadow-[0_0_12px_#22D3EE] h-0 transition-all duration-300"></div>
          </div>

          <!-- Mobile Continuous Subway Progress Rail -->
          <div class="block md:hidden absolute left-5 top-5 bottom-8 w-0.5 bg-gradient-to-b from-cyan via-cyan/40 to-transparent" aria-hidden="true"></div>

          <div class="space-y-8 md:space-y-16">
            @for (step of currentSteps(); track step.number; let i = $index) {
              <div
                class="timeline-step relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 pl-14 md:pl-0"
                [class.md:flex-row-reverse]="i % 2 === 1"
              >
                <!-- Mobile Node (Pinned on left progress rail) -->
                <div class="md:hidden absolute left-0 top-1 w-10 h-10 rounded-full bg-navy border-2 border-cyan text-cyan font-bold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)] shrink-0 z-10">
                  {{ step.number }}
                </div>

                <!-- Step Content Card -->
                <div class="w-full md:w-1/2 glass p-5 sm:p-8 rounded-2xl border border-white/10 hover:border-cyan/40 active:scale-[0.99] transition-all duration-300">
                  <div class="flex items-center gap-3 mb-3">
                    <span class="text-xs font-mono uppercase tracking-widest text-cyan font-bold px-2 py-0.5 rounded bg-cyan/10 border border-cyan/20">
                      Step {{ step.number }}
                    </span>
                    <h3 class="font-heading font-bold text-lg sm:text-xl text-white">{{ step.title }}</h3>
                  </div>
                  <p class="text-sm text-ice/85 leading-relaxed mb-4 font-normal">
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

                <!-- Central Milestone Node Dot (Desktop) -->
                <div class="hidden md:flex w-10 h-10 rounded-full bg-navy border-2 border-cyan text-cyan font-bold items-center justify-center text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)] shrink-0 z-10">
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
      description: 'Share your engineering background, software experience, and US code familiarity through our candidate portal.',
      details: ['Online profile submission', 'Confidential registration', 'Discipline & tools selection']
    },
    {
      number: '02',
      title: 'Technical Screening',
      description: 'A structured discussion evaluating your design calculations, 3D modeling samples, and code adherence.',
      details: ['CAD / BIM portfolio review', 'Calculation sheet checks', 'US code familiarity (ASHRAE, ASME, IEEE)']
    },
    {
      number: '03',
      title: 'Opportunity Matching',
      description: 'Review matching roles that fit your technical background and compensation expectations.',
      details: ['Project scope review', 'USD compensation alignment', 'Direct role presentations']
    },
    {
      number: '04',
      title: 'Interview Briefing',
      description: 'Detailed briefings on client technical stacks, project drawings, and interview expectations.',
      details: ['Project technical briefings', 'Tooling & environment prep', 'Interview logistics']
    },
    {
      number: '05',
      title: 'Offer & Onboarding Support',
      description: 'Hands-on help with contract evaluation, remote tool setup, and day-one onboarding.',
      details: ['Clear terms & rate review', 'VDI & software access setup', 'Day-one team onboarding']
    }
  ];

  readonly employerSteps: TimelineStep[] = [
    {
      number: '01',
      title: 'Role Intake',
      description: 'Define your project requirements, CAD/BIM standards, software tools, and timeline.',
      details: ['Scope & specifications brief', 'Software & tool requirements', 'Timezone overlap requirements']
    },
    {
      number: '02',
      title: 'Targeted Sourcing',
      description: 'We source candidates from our network in India who have proven experience with American codes and calculation standards.',
      details: ['Direct technical candidate search', 'Degree & credential verification', 'Calculation & tooling evaluation']
    },
    {
      number: '03',
      title: 'Shortlist Delivery',
      description: 'Review complete candidate dossiers with sample calculations and interview notes within 48 to 72 hours.',
      details: ['Candidate technical profile', 'Evaluator interview notes', 'Availability & rate confirmation']
    },
    {
      number: '04',
      title: 'Coordinated Interviews',
      description: 'We schedule technical rounds directly with your team, manage timezone coordination, and handle candidate feedback.',
      details: ['Direct calendar scheduling', 'Timezone overlap management', 'Candidate feedback delivery']
    },
    {
      number: '05',
      title: 'Placement & Integration',
      description: 'Support through contract signing and remote setup so engineers start delivering from day one.',
      details: ['Contract finalization', 'VDI & environment setup', 'Ongoing placement follow-up']
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
