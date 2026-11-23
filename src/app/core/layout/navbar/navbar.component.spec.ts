import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideRouter, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

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
    fixture.destroy();
  });

  it('should create NavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render 8 navigation links in desktop menu', () => {
    const desktopLinks = fixture.nativeElement.querySelectorAll('.desktop-nav a');
    expect(desktopLinks.length).toBe(8);
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
