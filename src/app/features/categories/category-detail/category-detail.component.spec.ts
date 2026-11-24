import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CategoryDetailComponent } from './category-detail.component';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';

describe('CategoryDetailComponent', () => {
  let fixture: ComponentFixture<CategoryDetailComponent>;
  let component: CategoryDetailComponent;
  let componentRef: ComponentRef<CategoryDetailComponent>;

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
      imports: [CategoryDetailComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render discipline hero and core focus areas for valid slug', () => {
    componentRef.setInput('slug', 'hvac-thermal');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('HVAC & Thermal Systems');
    expect(text).toContain('Core Technical Focus');

    const focusPills = fixture.nativeElement.querySelectorAll('.focus-pill');
    expect(focusPills.length).toBeGreaterThanOrEqual(4);
  });

  it('should render sample roles with disclaimer and clean cards without illustrative badge', () => {
    componentRef.setInput('slug', 'hvac-thermal');
    fixture.detectChanges();

    const badges = fixture.nativeElement.querySelectorAll('.illustrative-badge');
    expect(badges.length).toBe(0);

    const disclaimer = fixture.nativeElement.querySelector('.illustrative-disclaimer');
    expect(disclaimer).toBeTruthy();
    expect(disclaimer.textContent).toContain('illustrative representations of client requirements');
  });

  it('should isolate amber CTA exclusively for candidate resume submission', () => {
    componentRef.setInput('slug', 'hvac-thermal');
    fixture.detectChanges();

    const amberBtn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    expect(amberBtn).toBeTruthy();
    expect(amberBtn.textContent).toContain('Submit Your Resume');

    const applyNowBtn = fixture.nativeElement.querySelector('.role-card app-button[variant="primary"]');
    expect(applyNowBtn).toBeTruthy();
    expect(applyNowBtn.textContent).toContain('Apply Now');
  });

  it('should display clean 404 state when invalid slug is provided', () => {
    componentRef.setInput('slug', 'non-existent-discipline');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Practice Area Not Found');
    const backBtn = fixture.nativeElement.querySelector('a[href="/categories"]');
    expect(backBtn).toBeTruthy();
  });
});
