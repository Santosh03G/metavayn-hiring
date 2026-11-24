import { TestBed, ComponentFixture } from '@angular/core/testing';
import { JobsComponent } from './jobs.component';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('JobsComponent', () => {
  let fixture: ComponentFixture<JobsComponent>;
  let component: JobsComponent;

  beforeAll(() => {
    if (typeof window !== 'undefined' && !window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }),
      });
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ q: '', location: '', discipline: '' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render all 5 illustrative job cards by default', () => {
    const cards = fixture.nativeElement.querySelectorAll('.job-card');
    expect(cards.length).toBe(5);
  });

  it('should display illustrative listing badge and disclaimer on job board', () => {
    const badges = fixture.nativeElement.querySelectorAll('.illustrative-badge');
    expect(badges.length).toBe(5);

    const disclaimer = fixture.nativeElement.querySelector('.illustrative-disclaimer');
    expect(disclaimer).toBeTruthy();
    expect(disclaimer.textContent).toContain('illustrative representations of client requirements');
  });

  it('should filter jobs when discipline tab is changed', () => {
    component.setDiscipline('hvac-thermal');
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.job-card');
    expect(cards.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('HVAC Systems Design Engineer');
  });

  it('should isolate amber CTA exclusively to candidate resume submission', () => {
    const amberBtn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    expect(amberBtn).toBeTruthy();
    expect(amberBtn.textContent).toContain('Submit Your Resume');

    const applyBtns = fixture.nativeElement.querySelectorAll('.job-card app-button[variant="primary"]');
    expect(applyBtns.length).toBe(5);
    applyBtns.forEach((btn: HTMLElement) => {
      expect(btn.textContent).toContain('Apply Now');
    });
  });

  it('should display empty state with reset filters button when no jobs match search', () => {
    component.searchQuery.set('non-existent-skill-or-title');
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.job-card');
    expect(cards.length).toBe(0);

    const emptyNotice = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyNotice).toBeTruthy();
    expect(emptyNotice.textContent).toContain('No matching opportunities found');
  });

  it('should render the unified engineering mandate cockpit container', () => {
    const cockpit = fixture.nativeElement.querySelector('.mandate-cockpit');
    expect(cockpit).toBeTruthy();
  });

  it('should display mandate disclosure badge with pulse indicator', () => {
    const badge = fixture.nativeElement.querySelector('.mandate-pulse-badge');
    expect(badge).toBeTruthy();
    expect(badge.textContent).toContain('Illustrative Mandates');
  });

  it('should display search keyboard shortcut indicator', () => {
    const shortcutBadge = fixture.nativeElement.querySelector('.search-shortcut');
    expect(shortcutBadge).toBeTruthy();
    expect(shortcutBadge.textContent).toContain('/');
  });

  it('should clear search input when clear button is clicked', () => {
    component.searchQuery.set('Revit');
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.search-clear-btn');
    expect(clearBtn).toBeTruthy();
    clearBtn.click();
    fixture.detectChanges();

    expect(component.searchQuery()).toBe('');
  });

  it('should display active filter chips and clear all filters button when filters applied', () => {
    component.searchQuery.set('CFD');
    component.setDiscipline('simulation-fea');
    fixture.detectChanges();

    const activeChips = fixture.nativeElement.querySelectorAll('.active-filter-chip');
    expect(activeChips.length).toBeGreaterThan(0);

    const clearAllBtn = fixture.nativeElement.querySelector('.clear-all-btn');
    expect(clearAllBtn).toBeTruthy();
    clearAllBtn.click();
    fixture.detectChanges();

    expect(component.searchQuery()).toBe('');
    expect(component.selectedDiscipline()).toBe('all');
  });
});
