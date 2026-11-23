import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { AppComponent } from './app.component';
import { SmoothScrollService } from './core/services/smooth-scroll.service';

describe('AppComponent', () => {
  let smoothScrollServiceMock: { init: ReturnType<typeof vi.fn>; destroy: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    smoothScrollServiceMock = {
      init: vi.fn(),
      destroy: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: SmoothScrollService, useValue: smoothScrollServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize SmoothScrollService on ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(smoothScrollServiceMock.init).toHaveBeenCalledTimes(1);
  });

  it('should destroy SmoothScrollService on ngOnDestroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.destroy();
    expect(smoothScrollServiceMock.destroy).toHaveBeenCalledTimes(1);
  });
});
