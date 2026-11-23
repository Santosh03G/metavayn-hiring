import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideRouter } from '@angular/router';
import { SmoothScrollService } from '../../services/smooth-scroll.service';
import { vi } from 'vitest';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;
  let mockScrollService: { scrollTo: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockScrollService = { scrollTo: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        provideRouter([]),
        { provide: SmoothScrollService, useValue: mockScrollService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the exact mandatory honest disclosure statement', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain(
      'Metavayn is an India-based engineering recruitment company serving employers and engineering professionals in the United States.'
    );
  });

  it('should render 3 section column titles', () => {
    const headings = fixture.nativeElement.querySelectorAll('h3');
    expect(headings.length).toBe(3);
    const titles = Array.from(headings).map((h) => (h as HTMLElement).textContent?.trim());
    expect(titles).toContain('For Candidates');
    expect(titles).toContain('For Employers');
    expect(titles).toContain('Company');
  });

  it('should call scrollTo(0) when back to top is clicked', () => {
    const backToTopBtn = fixture.nativeElement.querySelector('.back-to-top-btn');
    expect(backToTopBtn).toBeTruthy();
    backToTopBtn.click();
    expect(mockScrollService.scrollTo).toHaveBeenCalledWith(0);
  });

  it('should render social links with appropriate aria-labels', () => {
    const socialLinks = fixture.nativeElement.querySelectorAll('a[aria-label]');
    const labels = Array.from(socialLinks).map((a) => (a as HTMLElement).getAttribute('aria-label'));
    expect(labels).toContain('LinkedIn');
    expect(labels).toContain('X (Twitter)');
    expect(labels).toContain('GitHub');
  });

  it('should contain the blueprint grid overlay and midnight background', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer.classList.contains('bg-midnight')).toBe(true);

    const gridOverlay = fixture.nativeElement.querySelector('.blueprint-grid');
    expect(gridOverlay).toBeTruthy();
  });
});
