import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { provideRouter } from '@angular/router';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let component: AboutComponent;

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
      imports: [AboutComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render mission and honest operations disclosure', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Bridging Indian Engineering Excellence with US Infrastructure');
    expect(text).toContain('Operations based in India');
    expect(text).toContain('recruitment firm');
  });

  it('should render all 4 core operational principles', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Genuine Technical Depth');
    expect(text).toContain('Cross-Border Transparency');
    expect(text).toContain('Authentic US Code Rigor');
    expect(text).toContain('Mutual Value Creation');
  });

  it('should strictly isolate amber CTA to candidate resume submission', () => {
    const amberBtns = fixture.nativeElement.querySelectorAll('app-button[variant="amber-cta"]');
    expect(amberBtns.length).toBe(1);
    expect(amberBtns[0].textContent).toContain('Submit Your Resume');

    const primaryBtns = fixture.nativeElement.querySelectorAll('app-button[variant="primary"]');
    expect(primaryBtns.length).toBeGreaterThanOrEqual(1);
    expect(primaryBtns[0].textContent).toContain('Hire Engineering Talent');
  });
});
