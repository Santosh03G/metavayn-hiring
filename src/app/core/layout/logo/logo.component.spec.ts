import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
import { provideRouter } from '@angular/router';

describe('LogoComponent', () => {
  let fixture: ComponentFixture<LogoComponent>;
  let component: LogoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the hexagonal M SVG icon', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render the Metavayn wordmark by default', () => {
    const textEl = fixture.nativeElement.querySelector('.logo-wordmark');
    expect(textEl).toBeTruthy();
    expect(textEl.textContent).toContain('Metavayn');
  });

  it('should hide the wordmark when iconOnly is true', () => {
    fixture.componentRef.setInput('iconOnly', true);
    fixture.detectChanges();
    const textEl = fixture.nativeElement.querySelector('.logo-wordmark');
    expect(textEl).toBeFalsy();
  });

  it('should link to home page with aria-label', () => {
    const link = fixture.nativeElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('aria-label')).toBe('Metavayn Home');
    expect(link.getAttribute('href')).toBe('/');
  });

  it('should adjust svg size and wordmark classes based on size input', () => {
    // Default size 'md'
    let svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('34');
    expect(svg.getAttribute('height')).toBe('34');

    // Size 'sm'
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('28');
    let textEl = fixture.nativeElement.querySelector('.logo-wordmark');
    expect(textEl.classList.contains('text-lg')).toBe(true);

    // Size 'lg'
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('42');
    textEl = fixture.nativeElement.querySelector('.logo-wordmark');
    expect(textEl.classList.contains('text-2xl')).toBe(true);
  });
});
