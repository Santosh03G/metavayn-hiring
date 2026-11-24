import { TestBed, ComponentFixture } from '@angular/core/testing';
import { JobDetailComponent } from './job-detail.component';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';

describe('JobDetailComponent', () => {
  let fixture: ComponentFixture<JobDetailComponent>;
  let component: JobDetailComponent;
  let componentRef: ComponentRef<JobDetailComponent>;

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
      imports: [JobDetailComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render role specifications and US codes for valid job ID', () => {
    componentRef.setInput('id', 'hvac-lead-design');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('HVAC Systems Design Engineer');
    expect(text).toContain('Key Responsibilities');
    expect(text).toContain('Required Technical Qualifications');
    expect(text).toContain('US Code & Standard Compliance');
  });

  it('should display illustrative listing badge and mandatory disclaimer on detail page', () => {
    componentRef.setInput('id', 'hvac-lead-design');
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.illustrative-badge');
    expect(badge).toBeTruthy();
    expect(badge.textContent).toContain('Illustrative listing');

    const disclaimer = fixture.nativeElement.querySelector('.illustrative-disclaimer');
    expect(disclaimer).toBeTruthy();
    expect(disclaimer.textContent).toContain('illustrative representations of client requirements');
  });

  it('should isolate amber CTA exclusively for candidate resume submission', () => {
    componentRef.setInput('id', 'hvac-lead-design');
    fixture.detectChanges();

    const amberBtns = fixture.nativeElement.querySelectorAll('app-button[variant="amber-cta"]');
    expect(amberBtns.length).toBeGreaterThanOrEqual(1);
    amberBtns.forEach((btn: HTMLElement) => {
      expect(btn.textContent).toContain('Submit Your Resume');
    });
  });

  it('should display clean 404 state when invalid job ID is provided', () => {
    componentRef.setInput('id', 'non-existent-role');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Opportunity Not Found');
    const backBtn = fixture.nativeElement.querySelector('a[href="/jobs"]');
    expect(backBtn).toBeTruthy();
  });
});
