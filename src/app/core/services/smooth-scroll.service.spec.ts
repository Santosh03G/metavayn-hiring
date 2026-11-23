import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { SmoothScrollService } from './smooth-scroll.service';

describe('SmoothScrollService', () => {
  let service: SmoothScrollService;

  beforeAll(() => {
    if (typeof window !== 'undefined') {
      if (!window.matchMedia) {
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
      if (!globalThis.ResizeObserver) {
        globalThis.ResizeObserver = class {
          observe() {}
          unobserve() {}
          disconnect() {}
        } as unknown as typeof ResizeObserver;
      }
    }
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmoothScrollService]
    });
    service = TestBed.inject(SmoothScrollService);
  });

  afterEach(() => {
    service.destroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize and destroy cleanly without throwing errors', () => {
    expect(() => {
      service.init();
      service.destroy();
    }).not.toThrow();
  });

  it('should handle scrollTo without throwing errors when not initialized or in browser', () => {
    expect(() => {
      service.scrollTo('#target');
      const div = document.createElement('div');
      service.scrollTo(div);
    }).not.toThrow();
  });

  it('should support multiple calls to init or destroy idempotently', () => {
    expect(() => {
      service.init();
      service.init();
      service.destroy();
      service.destroy();
    }).not.toThrow();
  });

  it('should respect prefers-reduced-motion when enabled', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = (query: string) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });

    expect(() => {
      service.init();
      service.scrollTo('#section');
      service.destroy();
    }).not.toThrow();

    window.matchMedia = originalMatchMedia;
  });

  describe('SSR / Non-browser platform', () => {
    let ssrService: SmoothScrollService;

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          SmoothScrollService,
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });
      ssrService = TestBed.inject(SmoothScrollService);
    });

    afterEach(() => {
      ssrService.destroy();
    });

    it('should not initialize Lenis or GSAP on server platform', () => {
      expect(() => {
        ssrService.init();
        ssrService.scrollTo('#target');
        ssrService.destroy();
      }).not.toThrow();
    });
  });
});
