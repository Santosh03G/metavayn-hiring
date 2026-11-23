import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionHeadingComponent } from './section-heading.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { By } from '@angular/platform-browser';

describe('SectionHeadingComponent', () => {
  let component: SectionHeadingComponent;
  let fixture: ComponentFixture<SectionHeadingComponent>;

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
      imports: [SectionHeadingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SectionHeadingComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Section Title');
    fixture.detectChanges();
  });

  it('should create and display the title', () => {
    expect(component).toBeTruthy();
    const heading = fixture.nativeElement.querySelector('h2');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toContain('Test Section Title');
  });

  it('should have appReveal directive applied to container', () => {
    const directiveEl = fixture.debugElement.query(By.directive(RevealDirective));
    expect(directiveEl).toBeTruthy();
  });

  it('should display eyebrow badge when provided', () => {
    fixture.componentRef.setInput('eyebrow', 'Platform Capabilities');
    fixture.detectChanges();
    const eyebrowEl = fixture.nativeElement.querySelector('.text-cyan');
    expect(eyebrowEl).toBeTruthy();
    expect(eyebrowEl.textContent).toContain('Platform Capabilities');
    const cyanDot = eyebrowEl.querySelector('span.bg-cyan');
    expect(cyanDot).toBeTruthy();
  });

  it('should not display eyebrow element when not provided', () => {
    const eyebrowEl = fixture.nativeElement.querySelector('.text-cyan');
    expect(eyebrowEl).toBeNull();
  });

  it('should display subtitle when provided', () => {
    fixture.componentRef.setInput('subtitle', 'This is a description of the section');
    fixture.detectChanges();
    const sub = fixture.nativeElement.querySelector('p');
    expect(sub).toBeTruthy();
    expect(sub.textContent).toContain('This is a description of the section');
  });

  it('should support centered layout', () => {
    fixture.componentRef.setInput('centered', true);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('div');
    expect(container.classList.contains('text-center')).toBe(true);
    expect(container.classList.contains('mx-auto')).toBe(true);
  });

  it('should render dark theme styles by default', () => {
    fixture.componentRef.setInput('subtitle', 'Subtitle text');
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector('h2');
    const subtitle = fixture.nativeElement.querySelector('p');
    expect(heading.classList.contains('text-white')).toBe(true);
    expect(subtitle.classList.contains('text-slate-300')).toBe(true);
  });

  it('should render light theme styles when theme is light', () => {
    fixture.componentRef.setInput('theme', 'light');
    fixture.componentRef.setInput('subtitle', 'Subtitle text');
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector('h2');
    const subtitle = fixture.nativeElement.querySelector('p');
    expect(heading.classList.contains('text-ink')).toBe(true);
    expect(subtitle.classList.contains('text-slate')).toBe(true);
  });
});
