import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WhyChooseUsComponent } from './why-choose-us.component';

describe('WhyChooseUsComponent', () => {
  let fixture: ComponentFixture<WhyChooseUsComponent>;
  let component: WhyChooseUsComponent;

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
      imports: [WhyChooseUsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WhyChooseUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render 4 value pillar cards', () => {
    const pillars = fixture.nativeElement.querySelectorAll('.pillar-card');
    expect(pillars.length).toBe(4);
  });

  it('should render light theme section heading', () => {
    const heading = fixture.nativeElement.querySelector('app-section-heading');
    expect(heading).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Engineered for Technical Precision');
  });

  it('should render all 4 pillar titles properly', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Engineering-Focused Recruiting');
    expect(text).toContain('Aligned Opportunities');
    expect(text).toContain('Candidate-First Guidance');
    expect(text).toContain('Strict Confidentiality');
  });
});
