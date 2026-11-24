import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { provideRouter } from '@angular/router';

describe('CategoriesComponent', () => {
  let fixture: ComponentFixture<CategoriesComponent>;
  let component: CategoriesComponent;

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
      imports: [CategoriesComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render 5 discipline practice area cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.discipline-card');
    expect(cards.length).toBe(5);
  });

  it('should render links to all 5 practice area detail pages', () => {
    const links = fixture.nativeElement.querySelectorAll('a[href^="/categories/"]');
    expect(links.length).toBe(5);
  });

  it('should isolate amber CTA exclusively to candidate resume submission', () => {
    const amberBtn = fixture.nativeElement.querySelector('app-button[variant="amber-cta"]');
    expect(amberBtn).toBeTruthy();
    expect(amberBtn.textContent).toContain('Submit Your Resume');

    const primaryBtn = fixture.nativeElement.querySelector('app-button[variant="primary"]');
    expect(primaryBtn).toBeTruthy();
    expect(primaryBtn.textContent).toContain('Hire Engineering Talent');
  });
});
