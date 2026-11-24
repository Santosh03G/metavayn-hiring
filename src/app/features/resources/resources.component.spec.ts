import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ResourcesComponent } from './resources.component';
import { provideRouter } from '@angular/router';

describe('ResourcesComponent', () => {
  let fixture: ComponentFixture<ResourcesComponent>;
  let component: ResourcesComponent;

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
      imports: [ResourcesComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render all resource articles by default', () => {
    const cards = fixture.nativeElement.querySelectorAll('.resource-card');
    expect(cards.length).toBeGreaterThanOrEqual(6);
  });

  it('should filter resources when category tab is selected', () => {
    component.setCategory('us-codes');
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.resource-card');
    expect(cards.length).toBeGreaterThanOrEqual(2);
    cards.forEach((card: HTMLElement) => {
      expect(card.textContent).toContain('US Code');
    });
  });

  it('should isolate amber CTA to candidate resume submission', () => {
    const amberBtns = fixture.nativeElement.querySelectorAll('app-button[variant="amber-cta"]');
    expect(amberBtns.length).toBe(1);
    expect(amberBtns[0].textContent).toContain('Submit Your Resume');
  });
});
