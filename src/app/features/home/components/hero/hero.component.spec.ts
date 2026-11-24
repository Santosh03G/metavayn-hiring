import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { provideRouter, Router } from '@angular/router';
import { SmoothScrollService } from '../../../../core/services/smooth-scroll.service';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let component: HeroComponent;
  let router: Router;
  let mockScrollService: { scrollTo: ReturnType<typeof vi.fn> };

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
    mockScrollService = { scrollTo: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [
        provideRouter([]),
        { provide: SmoothScrollService, useValue: mockScrollService }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render the headline and subtext', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain("Build What's Next");
    expect(text).toContain('Connecting Engineering Talent with America');
  });

  it('should render primary CTA and strictly isolated amber CTA', () => {
    const buttons = fixture.nativeElement.querySelectorAll('app-button');
    expect(buttons.length).toBe(2);

    const amberBtn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    expect(amberBtn).toBeTruthy();
    expect(amberBtn.textContent).toContain('Submit Your Resume');
  });

  it('should navigate to /jobs with query parameters on search submit', () => {
    component.searchQuery.set('HVAC');
    component.locationQuery.set('Remote');
    component.onSearch();

    expect(router.navigate).toHaveBeenCalledWith(['/jobs'], {
      queryParams: { q: 'HVAC', location: 'Remote' }
    });
  });

  it('should trigger scroll to trust-strip on scroll indicator click', () => {
    const indicator = fixture.nativeElement.querySelector('.scroll-indicator');
    expect(indicator).toBeTruthy();
    indicator.click();

    expect(mockScrollService.scrollTo).toHaveBeenCalledWith('#trust-strip');
  });
});
