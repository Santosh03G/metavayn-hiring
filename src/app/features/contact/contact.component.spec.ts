import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { provideRouter } from '@angular/router';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;

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
      imports: [ContactComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render contact channels and India operational hub details', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Connect with the Metavayn Recruitment Team');
    expect(text).toContain('hiring@metavayn.com');
    expect(text).toContain('partners@metavayn.com');
    expect(text).toContain('Operations based in India');
  });

  it('should isolate amber CTA exclusively to candidate resume submission and use primary for general inquiry', () => {
    const submitBtn = fixture.nativeElement.querySelector('.contact-form app-button[variant="primary"]');
    expect(submitBtn).toBeTruthy();
    expect(submitBtn.textContent).toContain('Send Message');

    const amberBtns = fixture.nativeElement.querySelectorAll('app-button[variant="amber-cta"]');
    expect(amberBtns.length).toBe(1);
    expect(amberBtns[0].textContent).toContain('Submit Your Resume');
  });

  it('should submit inquiry and show confirmation reference on valid form submission', () => {
    component.name.set('Marcus Vance');
    component.email.set('marcus@vanceengineering.com');
    component.inquiryType.set('Hiring US Engineering Talent');
    component.message.set('Interested in exploring mechanical simulation capacity for Q3 projects.');

    component.sendMessage();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(true);
    expect(component.submissionReference()).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Message Received');
  });

  it('should show validation errors when submitting incomplete message', () => {
    component.name.set('');
    component.sendMessage();
    fixture.detectChanges();

    expect(component.isSubmitted()).toBe(false);
    expect(component.formErrors().length).toBeGreaterThan(0);
  });
});
