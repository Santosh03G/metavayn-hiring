import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EmployersComponent } from './employers.component';
import { provideRouter } from '@angular/router';

describe('EmployersComponent', () => {
  let fixture: ComponentFixture<EmployersComponent>;
  let component: EmployersComponent;

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
      imports: [EmployersComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render hero with honest operations disclosure', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Scale US Engineering Capacity with Vetted Indian Talent');
    expect(text).toContain('Operations based in India');
  });

  it('should isolate amber CTA exclusively to the candidate secondary link and use primary for employer submit', () => {
    const employerSubmitBtn = fixture.nativeElement.querySelector('.inquiry-form app-button[variant="primary"]');
    expect(employerSubmitBtn).toBeTruthy();
    expect(employerSubmitBtn.textContent).toContain('Submit Talent Request');

    const amberBtns = fixture.nativeElement.querySelectorAll('app-button[variant="amber-cta"]');
    expect(amberBtns.length).toBe(1);
    expect(amberBtns[0].textContent).toContain('Submit Your Resume');
  });

  it('should toggle discipline selection in inquiry form', () => {
    expect(component.selectedDisciplines().length).toBe(0);
    component.toggleDiscipline('hvac-thermal');
    expect(component.selectedDisciplines()).toContain('hvac-thermal');
    component.toggleDiscipline('hvac-thermal');
    expect(component.selectedDisciplines().length).toBe(0);
  });

  it('should submit inquiry and display reference confirmation when form is valid', () => {
    component.companyName.set('Apex Engineering Solutions LLC');
    component.contactName.set('David Miller');
    component.businessEmail.set('david.miller@apexeng.com');
    component.phone.set('+1 555-234-5678');
    component.selectedDisciplines.set(['hvac-thermal']);
    component.headcount.set('1-2 Engineers');
    component.engagementModel.set('Dedicated Full-Time Remote');
    component.projectOverview.set('Need 2 skilled Revit MEP design engineers for commercial HVAC projects.');

    component.submitInquiry();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(true);
    expect(component.submissionReference()).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Inquiry Received');
  });

  it('should show validation errors when submitting an incomplete form', () => {
    component.companyName.set('');
    component.submitInquiry();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(false);
    expect(component.formErrors().length).toBeGreaterThan(0);
  });
});
