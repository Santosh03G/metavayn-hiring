import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideRouter, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;

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
      imports: [NavbarComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    fixture.destroy();
  });

  it('should toggle mobile menu and update body overflow', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(true);

    const mobileOverlay = fixture.nativeElement.querySelector('.mobile-drawer');
    expect(mobileOverlay).toBeTruthy();
    expect(document.body.style.overflow).toBe('hidden');

    component.closeMobileMenu();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('should close mobile menu on Escape key press', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(true);

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('should close mobile menu when clicking close button or links', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector('.mobile-drawer button[aria-label="Close menu"]');
    expect(closeBtn).toBeTruthy();
    closeBtn.click();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(false);

    component.toggleMobileMenu();
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('.mobile-nav-link');
    expect(link).toBeTruthy();
    link.click();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should close mobile menu when clicking logo in drawer', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();

    const logoInDrawer = fixture.nativeElement.querySelector('.mobile-drawer app-logo');
    expect(logoInDrawer).toBeTruthy();
    logoInDrawer.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should render 8 links and primary CTA button inside mobile drawer', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();

    const mobileLinks = fixture.nativeElement.querySelectorAll('.mobile-nav-link');
    expect(mobileLinks.length).toBe(8);

    const cta = fixture.nativeElement.querySelector('.mobile-drawer app-button[variant="amber-cta"]');
    expect(cta).toBeTruthy();
    expect(cta.textContent).toContain('Submit Your Resume');
  });

  it('should animate mobile links with gsap when opened and reduced motion is false', async () => {
    const gsapSpy = vi.spyOn(gsap, 'fromTo');
    component.toggleMobileMenu();
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 25));
    expect(gsapSpy).toHaveBeenCalledWith(
      expect.anything(),
      { opacity: 0, y: 15 },
      expect.objectContaining({ opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out' })
    );
    gsapSpy.mockRestore();
  });

  it('should skip gsap animation when prefers-reduced-motion matches', async () => {
    const gsapSpy = vi.spyOn(gsap, 'fromTo');
    const matchMediaSpy = vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });

    component.toggleMobileMenu();
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 25));
    expect(gsapSpy).not.toHaveBeenCalled();

    matchMediaSpy.mockRestore();
    gsapSpy.mockRestore();
  });

  it('should create NavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render 7 navigation links in desktop menu', () => {
    const desktopLinks = fixture.nativeElement.querySelectorAll('.desktop-nav a');
    expect(desktopLinks.length).toBe(7);
  });

  it('should render clean brand logo without radar badge', () => {
    const badge = fixture.nativeElement.querySelector('.radar-badge');
    expect(badge).toBeFalsy();
    const logo = fixture.nativeElement.querySelector('app-logo');
    expect(logo).toBeTruthy();
  });

  it('should render primary CTA with exact text "Submit Your Resume"', () => {
    const cta = fixture.nativeElement.querySelector('.desktop-cta app-button');
    expect(cta).toBeTruthy();
    expect(cta.textContent).toContain('Submit Your Resume');
  });

  it('should update scroll classes when scrolled past 40px', () => {
    component.onScroll(50);
    fixture.detectChanges();
    expect(component.isScrolled()).toBe(true);

    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.classList.contains('glass')).toBe(true);
  });

  it('should hide navbar on scroll down and reveal on scroll up', () => {
    component.onScroll(50);
    component.onScroll(150); // scrolled down past 100px
    fixture.detectChanges();
    expect(component.isHidden()).toBe(true);

    component.onScroll(120); // scrolled up
    fixture.detectChanges();
    expect(component.isHidden()).toBe(false);
  });

  it('should not hide navbar when scrolling down if mobile menu is open', () => {
    component.isMobileMenuOpen.set(true);
    component.onScroll(50);
    component.onScroll(150);
    fixture.detectChanges();
    expect(component.isHidden()).toBe(false);
  });

  it('should toggle mobile menu open state when toggle button is clicked', () => {
    expect(component.isMobileMenuOpen()).toBe(false);
    const toggleButton = fixture.nativeElement.querySelector('button[aria-label="Toggle navigation menu"]');
    expect(toggleButton).toBeTruthy();

    toggleButton.click();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(true);

    toggleButton.click();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should close mobile menu on NavigationEnd event', () => {
    component.isMobileMenuOpen.set(true);
    const router = TestBed.inject(Router);
    (router.events as Subject<any>).next(new NavigationEnd(1, '/jobs', '/jobs'));
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should remove scroll listener on ngOnDestroy', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    fixture.destroy();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeSpy.mockRestore();
  });
});

describe('NavbarComponent (SSR)', () => {
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

  it('should initialize and destroy without window events in server platform', async () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const fixture = TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    }).createComponent(NavbarComponent);

    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();

    fixture.destroy();

    expect(addSpy).not.toHaveBeenCalledWith('scroll', expect.any(Function), expect.anything());
    expect(removeSpy).not.toHaveBeenCalledWith('scroll', expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
