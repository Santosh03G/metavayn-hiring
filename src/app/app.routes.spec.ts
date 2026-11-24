import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('AppRoutes', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    router = TestBed.inject(Router);
  });

  it('should define routes for all key pages including category detail', () => {
    const routeConfig = router.config;

    const paths = routeConfig.map(r => r.path);
    expect(paths).toContain('');
    expect(paths).toContain('jobs');
    expect(paths).toContain('jobs/:id');
    expect(paths).toContain('categories');
    expect(paths).toContain('categories/:slug');
    expect(paths).toContain('candidates');
    expect(paths).toContain('employers');
    expect(paths).toContain('resources');
    expect(paths).toContain('about');
    expect(paths).toContain('contact');
    expect(paths).toContain('**');
  });

  it('should resolve lazy loaded components for all routes', async () => {
    const routeConfig = router.config;

    for (const route of routeConfig) {
      if (route.loadComponent) {
        const component = await (route.loadComponent as () => Promise<unknown>)();
        expect(component).toBeTruthy();
      }
    }
  });

  it('should navigate to home route', async () => {
    const success = await router.navigateByUrl('/');
    expect(success).toBe(true);
  });
});

