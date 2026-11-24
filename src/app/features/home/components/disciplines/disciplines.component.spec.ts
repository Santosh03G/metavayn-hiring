import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DisciplinesComponent } from './disciplines.component';
import { provideRouter } from '@angular/router';

describe('DisciplinesComponent', () => {
  let fixture: ComponentFixture<DisciplinesComponent>;
  let component: DisciplinesComponent;

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
      imports: [DisciplinesComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render 5 engineering discipline tilt cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.discipline-card');
    expect(cards.length).toBe(5);
  });

  it('should render section heading with Industry Expertise badge', () => {
    const heading = fixture.nativeElement.querySelector('app-section-heading');
    expect(heading).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Engineering Disciplines We Staff');
  });

  it('should render role pills and category explore links on each card', () => {
    const links = fixture.nativeElement.querySelectorAll('a[href^="/categories/"]');
    expect(links.length).toBe(5);

    const firstCard = fixture.nativeElement.querySelector('.discipline-card');
    const pills = firstCard.querySelectorAll('span.rounded-md');
    expect(pills.length).toBeGreaterThan(0);
  });
});
