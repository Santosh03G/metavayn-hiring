import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevealDirective } from './reveal.directive';
import { gsap } from 'gsap';

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: `
    <div appReveal [appRevealDelay]="0.2" [appRevealDuration]="0.8" [appRevealStagger]="0.1" [appRevealDirection]="'up'">
      Default Content
    </div>
  `
})
class TestHostComponent {}

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: `
    <div appReveal [appRevealDirection]="direction">Directional Content</div>
  `
})
class TestDirectionHostComponent {
  direction: 'up' | 'down' | 'left' | 'right' = 'down';
}

describe('RevealDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let gsapSpy: ReturnType<typeof vi.spyOn>;

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

  beforeEach(() => {
    gsapSpy = vi.spyOn(gsap, 'fromTo');
    TestBed.configureTestingModule({
      imports: [TestHostComponent, TestDirectionHostComponent]
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create host component with directive', () => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect(gsapSpy).toHaveBeenCalled();
  });

  it('should configure GSAP animation with correct inputs for up direction', () => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    expect(gsapSpy).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ opacity: 0, x: 0, y: 24 }),
      expect.objectContaining({
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        stagger: 0.1,
        ease: 'power3.out'
      })
    );
  });

  it('should calculate correct offsets for down, left, and right directions', () => {
    const dirFixture = TestBed.createComponent(TestDirectionHostComponent);
    dirFixture.componentInstance.direction = 'down';
    dirFixture.detectChanges();

    expect(gsapSpy).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ opacity: 0, x: 0, y: -24 }),
      expect.anything()
    );

    gsapSpy.mockClear();
    const leftFixture = TestBed.createComponent(TestDirectionHostComponent);
    leftFixture.componentInstance.direction = 'left';
    leftFixture.detectChanges();

    expect(gsapSpy).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ opacity: 0, x: 24, y: 0 }),
      expect.anything()
    );

    gsapSpy.mockClear();
    const rightFixture = TestBed.createComponent(TestDirectionHostComponent);
    rightFixture.componentInstance.direction = 'right';
    rightFixture.detectChanges();

    expect(gsapSpy).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ opacity: 0, x: -24, y: 0 }),
      expect.anything()
    );
  });

  it('should immediately set opacity to 1 without animation when prefers-reduced-motion is true', () => {
    const origMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('div') as HTMLElement;
    expect(element.style.opacity).toBe('1');
    expect(gsapSpy).not.toHaveBeenCalled();

    window.matchMedia = origMatchMedia;
  });

  it('should clean up tween and trigger on destroy', () => {
    const mockKill = vi.fn();
    const mockTriggerKill = vi.fn();
    gsapSpy.mockReturnValue({
      kill: mockKill,
      scrollTrigger: { kill: mockTriggerKill }
    } as unknown as gsap.core.Tween);

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    expect(() => fixture.destroy()).not.toThrow();
    expect(mockKill).toHaveBeenCalled();
  });

  describe('SSR / Non-browser platform', () => {
    it('should not register ScrollTrigger or run gsap animation on server', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }]
      });

      const serverFixture = TestBed.createComponent(TestHostComponent);
      serverFixture.detectChanges();

      expect(serverFixture.componentInstance).toBeTruthy();
      expect(gsapSpy).not.toHaveBeenCalled();
    });
  });
});
