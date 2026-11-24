import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FinalBannerComponent } from './final-banner.component';
import { provideRouter } from '@angular/router';

describe('FinalBannerComponent', () => {
  let fixture: ComponentFixture<FinalBannerComponent>;
  let component: FinalBannerComponent;

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
      imports: [FinalBannerComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FinalBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render headline and centered amber CTA button', () => {
    expect(fixture.nativeElement.textContent).toContain("Ready to Build What's Next?");
    const btn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Submit Your Resume');
  });
});
