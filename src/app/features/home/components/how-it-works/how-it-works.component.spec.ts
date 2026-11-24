import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HowItWorksComponent } from './how-it-works.component';

describe('HowItWorksComponent', () => {
  let fixture: ComponentFixture<HowItWorksComponent>;
  let component: HowItWorksComponent;

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
      imports: [HowItWorksComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render 5 steps for candidate track by default', () => {
    expect(component.activeTrack()).toBe('candidates');
    const steps = fixture.nativeElement.querySelectorAll('.timeline-step');
    expect(steps.length).toBe(5);
    expect(fixture.nativeElement.textContent).toContain('Submit Resume');
  });

  it('should switch to employers track when toggled', () => {
    component.setTrack('employers');
    fixture.detectChanges();

    expect(component.activeTrack()).toBe('employers');
    expect(fixture.nativeElement.textContent).toContain('Role Intake');
  });

  it('should render structured deliverable points with micro-check badges for each step', () => {
    const checkBadges = fixture.nativeElement.querySelectorAll('.step-check-badge');
    expect(checkBadges.length).toBeGreaterThan(0);

    const stepPoints = fixture.nativeElement.querySelectorAll('.step-detail-point');
    expect(stepPoints.length).toBeGreaterThan(0);
    stepPoints.forEach((point: HTMLElement) => {
      expect(point.classList.contains('text-ice')).toBe(true);
    });
  });
});
