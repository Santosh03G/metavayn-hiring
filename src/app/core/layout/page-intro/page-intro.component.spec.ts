import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PageIntroComponent } from './page-intro.component';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LogoComponent } from '../logo/logo.component';
import { gsap } from 'gsap';

describe('PageIntroComponent', () => {
  let fixture: ComponentFixture<PageIntroComponent>;
  let component: PageIntroComponent;

  beforeEach(async () => {
    sessionStorage.clear();
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
      imports: [PageIntroComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  afterEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('should play intro and set sessionStorage key if not seen', () => {
    fixture = TestBed.createComponent(PageIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isVisible()).toBe(true);
    expect(sessionStorage.getItem('metavayn_intro_seen')).toBe('true');

    const overlay = fixture.debugElement.query(By.css('.fixed.inset-0'));
    expect(overlay).toBeTruthy();

    const logo = fixture.debugElement.query(By.directive(LogoComponent));
    expect(logo).toBeTruthy();

    const text = fixture.debugElement.query(By.css('span.tracking-widest'));
    expect(text.nativeElement.textContent).toContain('Engineering Recruitment');
  });

  it('should skip intro immediately if sessionStorage key is present', () => {
    sessionStorage.setItem('metavayn_intro_seen', 'true');
    fixture = TestBed.createComponent(PageIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isVisible()).toBe(false);
    const overlay = fixture.debugElement.query(By.css('.fixed.inset-0'));
    expect(overlay).toBeNull();
  });

  it('should skip intro immediately if prefers-reduced-motion matches', () => {
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

    fixture = TestBed.createComponent(PageIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isVisible()).toBe(false);
  });

  it('should not throw and should stay hidden when rendered on non-browser platform', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [PageIntroComponent],
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    });

    fixture = TestBed.createComponent(PageIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isVisible()).toBe(false);
  });

  it('should construct GSAP timeline with onComplete callback that sets isVisible to false', () => {
    let capturedTimelineConfig: gsap.TimelineVars | undefined;
    const mockTimeline = {
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    };

    vi.spyOn(gsap, 'timeline').mockImplementation((config?: gsap.TimelineVars) => {
      capturedTimelineConfig = config;
      return mockTimeline as unknown as gsap.core.Timeline;
    });

    fixture = TestBed.createComponent(PageIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Trigger runAnimation directly to test timeline construction
    (component as any).runAnimation();

    expect(gsap.timeline).toHaveBeenCalled();
    expect(capturedTimelineConfig?.onComplete).toBeDefined();

    // Simulate GSAP timeline onComplete
    capturedTimelineConfig!.onComplete!();
    expect(component.isVisible()).toBe(false);
  });

  it('should kill timeline and clear animation timer on destroy', () => {
    const mockTimeline = {
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    };
    vi.spyOn(gsap, 'timeline').mockReturnValue(mockTimeline as unknown as gsap.core.Timeline);

    fixture = TestBed.createComponent(PageIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    (component as any).runAnimation();

    fixture.destroy();
    expect(mockTimeline.kill).toHaveBeenCalled();
  });
});
