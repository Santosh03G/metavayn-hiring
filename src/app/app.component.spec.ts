import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { AppComponent } from './app.component';
import { SmoothScrollService } from './core/services/smooth-scroll.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockScroll: { init: ReturnType<typeof vi.fn>; destroy: ReturnType<typeof vi.fn> };

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
    mockScroll = { init: vi.fn(), destroy: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: SmoothScrollService, useValue: mockScroll }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app and render layout shell elements', () => {
    expect(component).toBeTruthy();
    const nav = fixture.nativeElement.querySelector('app-navbar');
    const footer = fixture.nativeElement.querySelector('app-footer');
    const wipe = fixture.nativeElement.querySelector('app-route-wipe');
    const intro = fixture.nativeElement.querySelector('app-page-intro');
    const skipLink = fixture.nativeElement.querySelector('a[href="#main-content"]');

    expect(nav).toBeTruthy();
    expect(footer).toBeTruthy();
    expect(wipe).toBeTruthy();
    expect(intro).toBeTruthy();
    expect(skipLink).toBeTruthy();
  });

  it('should initialize and destroy SmoothScrollService on lifecycle', () => {
    expect(mockScroll.init).toHaveBeenCalled();
    fixture.destroy();
    expect(mockScroll.destroy).toHaveBeenCalled();
  });
});
