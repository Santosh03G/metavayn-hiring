import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';
import { SmoothScrollService } from '../../core/services/smooth-scroll.service';
import { vi } from 'vitest';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

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
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        { provide: SmoothScrollService, useValue: { scrollTo: vi.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should assemble all 8 home page sections', () => {
    expect(fixture.nativeElement.querySelector('app-home-hero')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-trust-strip')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-disciplines')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-why-choose-us')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-how-it-works')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-featured-roles')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-dual-cta')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-home-final-banner')).toBeTruthy();
  });
});
