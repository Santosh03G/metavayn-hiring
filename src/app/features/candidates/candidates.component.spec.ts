import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CandidatesComponent } from './candidates.component';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CandidatesComponent', () => {
  let fixture: ComponentFixture<CandidatesComponent>;
  let component: CandidatesComponent;

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
      imports: [CandidatesComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ role: 'hvac-lead-design', discipline: 'hvac-thermal' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should initialize and pre-populate target role and discipline from query parameters', () => {
    expect(component.selectedDiscipline()).toBe('hvac-thermal');
    expect(component.selectedRoleInterest()).toBe('hvac-lead-design');
  });

  it('should strictly isolate amber CTA to the final resume submission action', () => {
    // Navigate to stage 3
    component.currentStage.set(3);
    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    expect(submitBtn).toBeTruthy();
    expect(submitBtn.textContent).toContain('Submit Your Resume');
  });

  it('should display mandatory honest disclosure banner and consent checkbox', () => {
    component.currentStage.set(3);
    fixture.detectChanges();

    const disclosureText = fixture.nativeElement.textContent;
    expect(disclosureText).toContain('India-based engineering recruitment firm');
    expect(disclosureText).toContain('visa sponsorship');
  });

  it('should validate form and show confirmation reference on successful submission', () => {
    component.fullName.set('Arun Kumar');
    component.email.set('arun.kumar@example.com');
    component.phone.set('+91 99887 76655');
    component.location.set('Bengaluru, India');
    component.selectedDiscipline.set('hvac-thermal');
    component.experienceLevel.set('5-8 years (Senior Engineer)');
    component.resumeText.set('6 years senior HVAC design engineering in Revit MEP and central chiller plants.');
    component.agreedToTerms.set(true);

    component.submitApplication();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(true);
    expect(component.submissionReference()).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Application Received');
  });

  it('should prevent submission when required terms agreement is not checked', () => {
    component.fullName.set('Arun Kumar');
    component.email.set('arun.kumar@example.com');
    component.phone.set('+91 99887 76655');
    component.location.set('Bengaluru, India');
    component.selectedDiscipline.set('hvac-thermal');
    component.experienceLevel.set('5-8 years (Senior Engineer)');
    component.resumeText.set('6 years senior HVAC design engineering in Revit MEP and central chiller plants.');
    component.agreedToTerms.set(false);

    component.submitApplication();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(false);
    expect(component.formErrors().length).toBeGreaterThan(0);
  });
});
