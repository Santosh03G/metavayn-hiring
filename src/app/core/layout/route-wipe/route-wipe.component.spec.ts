import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouteWipeComponent } from './route-wipe.component';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subject } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { SmoothScrollService } from '../../services/smooth-scroll.service';
import { gsap } from 'gsap';

describe('RouteWipeComponent', () => {
  let fixture: ComponentFixture<RouteWipeComponent>;
  let component: RouteWipeComponent;
  let routerEvents$: Subject<any>;
  let mockScrollService: { scrollTo: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    routerEvents$ = new Subject();
    mockScrollService = { scrollTo: vi.fn() };

    if (typeof window !== 'undefined') {
      window.matchMedia = ((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      })) as unknown as typeof window.matchMedia;
    }

    await TestBed.configureTestingModule({
      imports: [RouteWipeComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            events: routerEvents$.asObservable()
          }
        },
        {
          provide: SmoothScrollService,
          useValue: mockScrollService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteWipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    vi.restoreAllMocks();
  });

  it('should create and have overlay hidden initially', () => {
    expect(component).toBeTruthy();
    const panel = fixture.nativeElement.querySelector('.route-wipe-panel');
    expect(panel).toBeTruthy();
    expect(panel.classList.contains('-translate-x-full')).toBe(true);
    expect(panel.getAttribute('aria-hidden')).toBe('true');
  });

  it('should trigger scroll to top on navigation start', () => {
    routerEvents$.next(new NavigationStart(1, '/jobs'));
    expect(mockScrollService.scrollTo).toHaveBeenCalledWith(0);
  });

  it('should animate wipe in on NavigationStart using gsap.to', () => {
    const gsapSetSpy = vi.spyOn(gsap, 'set');
    const gsapToSpy = vi.spyOn(gsap, 'to');

    routerEvents$.next(new NavigationStart(1, '/about'));

    expect(gsapSetSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ xPercent: -100 })
    );
    expect(gsapToSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        xPercent: 0,
        duration: 0.35,
        ease: 'power3.inOut'
      })
    );
  });

  it('should animate wipe out on NavigationEnd', () => {
    const gsapToSpy = vi.spyOn(gsap, 'to');

    routerEvents$.next(new NavigationEnd(1, '/about', '/about'));

    expect(gsapToSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        xPercent: 100,
        duration: 0.35,
        ease: 'power3.inOut'
      })
    );
  });

  it('should animate wipe out on NavigationCancel and NavigationError', () => {
    const gsapToSpy = vi.spyOn(gsap, 'to');

    routerEvents$.next(new NavigationCancel(1, '/cancelled', 'User abort'));
    expect(gsapToSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ xPercent: 100 })
    );

    gsapToSpy.mockClear();

    routerEvents$.next(new NavigationError(1, '/error', new Error('Route not found')));
    expect(gsapToSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ xPercent: 100 })
    );
  });

  it('should reset position to -100% when NavigationEnd animation completes', () => {
    let capturedOnComplete: (() => void) | undefined;
    vi.spyOn(gsap, 'to').mockImplementation((target: any, vars: any) => {
      if (vars?.xPercent === 100 && typeof vars?.onComplete === 'function') {
        capturedOnComplete = vars.onComplete;
      }
      return { kill: vi.fn() } as unknown as gsap.core.Tween;
    });
    const gsapSetSpy = vi.spyOn(gsap, 'set');

    routerEvents$.next(new NavigationEnd(1, '/jobs', '/jobs'));
    expect(capturedOnComplete).toBeDefined();

    capturedOnComplete!();
    expect(gsapSetSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ xPercent: -100 })
    );
  });

  it('should bypass visual animation if prefers-reduced-motion is active', () => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;

    const gsapToSpy = vi.spyOn(gsap, 'to');

    routerEvents$.next(new NavigationStart(1, '/contact'));
    expect(mockScrollService.scrollTo).toHaveBeenCalledWith(0);
    expect(gsapToSpy).not.toHaveBeenCalled();

    routerEvents$.next(new NavigationEnd(1, '/contact', '/contact'));
    expect(gsapToSpy).not.toHaveBeenCalled();
  });

  it('should cleanly kill tween and unsubscribe on ngOnDestroy', () => {
    const mockTween = {
      kill: vi.fn()
    };
    vi.spyOn(gsap, 'to').mockReturnValue(mockTween as unknown as gsap.core.Tween);

    routerEvents$.next(new NavigationStart(1, '/contact'));

    fixture.destroy();
    expect(mockTween.kill).toHaveBeenCalled();
  });

  describe('SSR / Non-browser platform', () => {
    it('should not subscribe or animate in non-browser platform', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [RouteWipeComponent],
        providers: [
          {
            provide: Router,
            useValue: {
              events: routerEvents$.asObservable()
            }
          },
          {
            provide: SmoothScrollService,
            useValue: mockScrollService
          },
          {
            provide: PLATFORM_ID,
            useValue: 'server'
          }
        ]
      });

      const ssrFixture = TestBed.createComponent(RouteWipeComponent);
      ssrFixture.detectChanges();

      const gsapToSpy = vi.spyOn(gsap, 'to');
      routerEvents$.next(new NavigationStart(1, '/server-test'));

      expect(mockScrollService.scrollTo).not.toHaveBeenCalled();
      expect(gsapToSpy).not.toHaveBeenCalled();

      ssrFixture.destroy();
    });
  });
});
