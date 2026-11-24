import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FeaturedRolesComponent } from './featured-roles.component';
import { provideRouter } from '@angular/router';

describe('FeaturedRolesComponent', () => {
  let fixture: ComponentFixture<FeaturedRolesComponent>;
  let component: FeaturedRolesComponent;

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
      imports: [FeaturedRolesComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render 3 featured role cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.role-card');
    expect(cards.length).toBe(3);
  });

  it('should display "Illustrative listing" badge on every role card', () => {
    const badges = fixture.nativeElement.querySelectorAll('.illustrative-badge');
    expect(badges.length).toBe(3);
    badges.forEach((b: HTMLElement) => {
      expect(b.textContent).toContain('Illustrative listing');
    });
  });
});
