import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { ButtonComponent } from './button.component';
import { provideRouter } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <app-button
      [variant]="variant()"
      [type]="type()"
      [disabled]="disabled()"
      [href]="href()"
      [isExternal]="isExternal()"
      [ariaLabel]="ariaLabel()"
    >
      Click Me
    </app-button>
  `
})
class TestHostComponent {
  variant = signal<'primary' | 'ghost' | 'amber-cta'>('primary');
  type = signal<'button' | 'submit'>('button');
  disabled = signal(false);
  href = signal<string | undefined>(undefined);
  isExternal = signal(false);
  ariaLabel = signal<string | undefined>(undefined);
}

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

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
      imports: [TestHostComponent, ButtonComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create default primary button', () => {
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn).toBeTruthy();
    expect(btn.type).toBe('button');
    expect(btn.classList.contains('bg-royal')).toBe(true);
    expect(btn.classList.contains('glow-cyan')).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Click Me');
  });

  it('should render ghost variant classes', () => {
    host.variant.set('ghost');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.classList.contains('bg-transparent')).toBe(true);
    expect(btn.classList.contains('border-white/20')).toBe(true);
  });

  it('should render amber-cta variant classes', () => {
    host.variant.set('amber-cta');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.classList.contains('bg-amber')).toBe(true);
    expect(btn.classList.contains('text-midnight')).toBe(true);
    expect(btn.classList.contains('glow-amber')).toBe(true);
  });

  it('should disable the button when disabled is true', () => {
    host.disabled.set(true);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.disabled).toBe(true);
    expect(btn.classList.contains('disabled:opacity-50')).toBe(true);
  });

  it('should render internal routerLink anchor when href is provided without isExternal', () => {
    host.href.set('/features');
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
    expect(anchor.getAttribute('href')).toBe('/features');
  });

  it('should render external anchor with target and rel when isExternal is true', () => {
    host.href.set('https://example.com');
    host.isExternal.set(true);
    fixture.detectChanges();
    const anchor = fixture.nativeElement.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('https://example.com');
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should apply aria-label when provided', () => {
    host.ariaLabel.set('Interactive action');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.getAttribute('aria-label')).toBe('Interactive action');
  });

  it('should initialize magnetic hover GSAP quickTo on mousemove', () => {
    const quickToSpy = vi.spyOn(gsap, 'quickTo').mockReturnValue(Object.assign(vi.fn(), { tween: {} as any }));
    const singleFixture = TestBed.createComponent(ButtonComponent);
    singleFixture.detectChanges();

    expect(quickToSpy).toHaveBeenCalledWith(expect.any(HTMLElement), 'x', expect.any(Object));
    expect(quickToSpy).toHaveBeenCalledWith(expect.any(HTMLElement), 'y', expect.any(Object));

    singleFixture.destroy();
  });

  it('should skip magnetic hover if prefers-reduced-motion matches', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as any);

    const quickToSpy = vi.spyOn(gsap, 'quickTo');
    const singleFixture = TestBed.createComponent(ButtonComponent);
    singleFixture.detectChanges();

    expect(quickToSpy).not.toHaveBeenCalled();
    singleFixture.destroy();
  });

  it('should not update magnetic position on mousemove if disabled is true', () => {
    const mockQuickTo = Object.assign(vi.fn(), { tween: {} as any });
    vi.spyOn(gsap, 'quickTo').mockReturnValue(mockQuickTo);
    const singleFixture = TestBed.createComponent(ButtonComponent);
    singleFixture.componentRef.setInput('disabled', true);
    singleFixture.detectChanges();

    const btn = singleFixture.nativeElement.querySelector('button');
    btn.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }));

    expect(mockQuickTo).not.toHaveBeenCalled();
    singleFixture.destroy();
  });

  it('should direct test ButtonComponent properties and amber-cta variant', () => {
    const singleFixture = TestBed.createComponent(ButtonComponent);
    expect(singleFixture.componentInstance.variant).toBe('primary');

    singleFixture.componentRef.setInput('variant', 'amber-cta');
    singleFixture.detectChanges();
    const btn = singleFixture.nativeElement.querySelector('button, a');
    expect(btn.classList.contains('bg-amber')).toBe(true);
  });
});
