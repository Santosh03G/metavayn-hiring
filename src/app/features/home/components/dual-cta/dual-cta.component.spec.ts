import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DualCtaComponent } from './dual-cta.component';
import { provideRouter } from '@angular/router';

describe('DualCtaComponent', () => {
  let fixture: ComponentFixture<DualCtaComponent>;
  let component: DualCtaComponent;

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
      imports: [DualCtaComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DualCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render candidate and employer split panels', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Advance Your Engineering Career');
    expect(content).toContain('Hire Specialized Engineering Talent');
  });

  it('should render amber CTA for candidates and primary CTA for employers', () => {
    const amberBtn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    const primaryBtn = fixture.nativeElement.querySelector('app-button[variant="primary"]');

    expect(amberBtn).toBeTruthy();
    expect(amberBtn.textContent).toContain('Submit Your Resume');
    expect(primaryBtn).toBeTruthy();
    expect(primaryBtn.textContent).toContain('Hire Engineering Talent');
  });
});
