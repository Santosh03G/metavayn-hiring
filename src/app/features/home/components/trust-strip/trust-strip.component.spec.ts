import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TrustStripComponent } from './trust-strip.component';

describe('TrustStripComponent', () => {
  let fixture: ComponentFixture<TrustStripComponent>;
  let component: TrustStripComponent;

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
      imports: [TrustStripComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TrustStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render 4 metric counters', () => {
    const counters = fixture.nativeElement.querySelectorAll('app-counter');
    expect(counters.length).toBe(4);
  });

  it('should display discipline metric', () => {
    expect(fixture.nativeElement.textContent).toContain('Engineering Disciplines');
  });

  it('should have id="trust-strip" for smooth scroll targeting', () => {
    const section = fixture.nativeElement.querySelector('#trust-strip');
    expect(section).toBeTruthy();
  });
});
