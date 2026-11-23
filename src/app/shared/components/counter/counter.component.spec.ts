import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { CounterComponent } from './counter.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

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

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('in browser with animations enabled', () => {
    let gsapToSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(async () => {
      gsapToSpy = vi.spyOn(gsap, 'to');

      await TestBed.configureTestingModule({
        imports: [CounterComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(CounterComponent);
      component = fixture.componentInstance;
      component.targetValue = 500;
      component.prefix = '$';
      component.suffix = 'k+';
      component.duration = 1.5;
      fixture.detectChanges();
    });

    it('should create and render initial prefix and suffix', () => {
      expect(component).toBeTruthy();
      const text = fixture.nativeElement.textContent;
      expect(text).toContain('$');
      expect(text).toContain('k+');
    });

    it('should initialize gsap.to with ScrollTrigger config', () => {
      expect(gsapToSpy).toHaveBeenCalledWith(
        expect.objectContaining({ val: 0 }),
        expect.objectContaining({
          val: 500,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: expect.objectContaining({
            trigger: fixture.nativeElement,
            start: 'top 85%',
            once: true,
          })
        })
      );
    });

    it('should kill tween and trigger on ngOnDestroy', () => {
      const mockTween = { kill: vi.fn() } as any;
      const mockTrigger = { kill: vi.fn() } as any;
      (component as any).tween = mockTween;
      (component as any).trigger = mockTrigger;

      fixture.destroy();

      expect(mockTween.kill).toHaveBeenCalled();
      expect(mockTrigger.kill).toHaveBeenCalled();
    });

    it('should synchronously capture ScrollTrigger and kill both tween and scrollTrigger on destroy', () => {
      const mockTrigger = { kill: vi.fn() } as any;
      const mockTween = {
        kill: vi.fn(),
        scrollTrigger: mockTrigger
      } as any;
      gsapToSpy.mockReturnValue(mockTween);

      const localFixture = TestBed.createComponent(CounterComponent);
      localFixture.componentInstance.targetValue = 100;
      localFixture.detectChanges();

      expect((localFixture.componentInstance as any).trigger).toBe(mockTrigger);

      localFixture.destroy();
      expect(mockTween.kill).toHaveBeenCalled();
      expect(mockTrigger.kill).toHaveBeenCalled();
    });
  });

  describe('prefers-reduced-motion', () => {
    it('should set target value immediately without gsap.to animation', async () => {
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

      const gsapToSpy = vi.spyOn(gsap, 'to');

      await TestBed.configureTestingModule({
        imports: [CounterComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(CounterComponent);
      component = fixture.componentInstance;
      component.targetValue = 250;
      component.decimals = 2;
      component.suffix = '%';
      fixture.detectChanges();

      expect(gsapToSpy).not.toHaveBeenCalled();
      expect(component.displayValue()).toBe('250.00');
      expect(fixture.nativeElement.textContent).toContain('250.00%');
    });
  });

  describe('server-side rendering (SSR)', () => {
    it('should set target value directly when platform is not browser', async () => {
      const gsapToSpy = vi.spyOn(gsap, 'to');

      await TestBed.configureTestingModule({
        imports: [CounterComponent],
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }]
      }).compileComponents();

      fixture = TestBed.createComponent(CounterComponent);
      component = fixture.componentInstance;
      component.targetValue = 99;
      component.decimals = 0;
      fixture.detectChanges();

      expect(gsapToSpy).not.toHaveBeenCalled();
      expect(component.displayValue()).toBe('99');
    });
  });
});
