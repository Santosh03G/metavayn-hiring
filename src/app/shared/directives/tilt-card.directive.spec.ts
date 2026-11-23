import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiltCardDirective } from './tilt-card.directive';

@Component({
  standalone: true,
  imports: [TiltCardDirective],
  template: `
    <div appTilt [maxTilt]="10" [scale]="1.05" style="width: 200px; height: 100px;">Card</div>
  `
})
class TestTiltHostComponent {}

@Component({
  standalone: true,
  imports: [TiltCardDirective],
  template: `
    <div appTilt>Default Card</div>
  `
})
class TestDefaultTiltHostComponent {}

describe('TiltCardDirective', () => {
  let fixture: ComponentFixture<TestTiltHostComponent>;
  let element: HTMLElement;

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
    TestBed.configureTestingModule({
      imports: [TestTiltHostComponent, TestDefaultTiltHostComponent]
    });
    fixture = TestBed.createComponent(TestTiltHostComponent);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('div');

    // Mock getBoundingClientRect for deterministic coordinates
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 100,
      right: 300,
      bottom: 200,
      x: 100,
      y: 100,
      toJSON: () => {}
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create host component with tilt directive', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply 3D transform on mousemove based on cursor position and inputs', () => {
    // Center is (200, 150) in client coordinates
    // Move to (250, 125):
    // x = 250 - 100 = 150; centerX = 100 -> (150 - 100)/100 = 0.5
    // rotateY = 0.5 * 10 = 5deg
    // y = 125 - 100 = 25; centerY = 50 -> (25 - 50)/50 = -0.5
    // rotateX = -0.5 * -10 = 5deg
    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 250,
      clientY: 125,
      bubbles: true
    });
    element.dispatchEvent(mouseMoveEvent);

    expect(element.style.transform).toBe('perspective(1000px) rotateX(5deg) rotateY(5deg) scale3d(1.05, 1.05, 1.05)');
    expect(element.style.transition).toBe('transform 0.1s ease-out');
  });

  it('should reset transform on mouseleave', () => {
    const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true });
    element.dispatchEvent(mouseLeaveEvent);

    expect(element.style.transform).toBe('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    expect(element.style.transition).toBe('transform 0.4s ease-out');
  });

  it('should use default maxTilt and scale when not specified', () => {
    const defaultFixture = TestBed.createComponent(TestDefaultTiltHostComponent);
    defaultFixture.detectChanges();
    const defaultEl = defaultFixture.nativeElement.querySelector('div') as HTMLElement;

    vi.spyOn(defaultEl, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    });

    // Move to right edge: clientX = 100, clientY = 50 (centerY)
    // x = 100, centerX = 50 -> (100 - 50)/50 = 1 -> rotateY = 1 * 8 = 8deg
    // y = 50, centerY = 50 -> rotateX = 0deg
    // default scale = 1.02
    defaultEl.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 50 }));

    expect(defaultEl.style.transform).toBe('perspective(1000px) rotateX(0deg) rotateY(8deg) scale3d(1.02, 1.02, 1.02)');
  });

  it('should not apply tilt when prefers-reduced-motion is true', () => {
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

    element.dispatchEvent(new MouseEvent('mousemove', { clientX: 250, clientY: 125 }));

    expect(element.style.transform).toBe('');

    window.matchMedia = origMatchMedia;
  });

  describe('SSR / Non-browser platform', () => {
    it('should safely ignore mousemove and mouseleave on server platform', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [TestTiltHostComponent],
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }]
      });

      const serverFixture = TestBed.createComponent(TestTiltHostComponent);
      serverFixture.detectChanges();
      const serverEl = serverFixture.nativeElement.querySelector('div') as HTMLElement;

      expect(() => {
        serverEl.dispatchEvent(new MouseEvent('mousemove', { clientX: 200, clientY: 200 }));
        serverEl.dispatchEvent(new MouseEvent('mouseleave'));
      }).not.toThrow();
    });
  });
});
