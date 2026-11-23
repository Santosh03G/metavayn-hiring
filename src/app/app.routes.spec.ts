import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('App Routes', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)]
    });
    router = TestBed.inject(Router);
  });

  it('should have all 10 routes defined', () => {
    expect(routes.length).toBe(10);
  });

  it('should contain expected route paths', () => {
    const paths = routes.map(r => r.path);
    expect(paths).toContain('');
    expect(paths).toContain('jobs');
    expect(paths).toContain('jobs/:id');
    expect(paths).toContain('categories');
    expect(paths).toContain('candidates');
    expect(paths).toContain('employers');
    expect(paths).toContain('resources');
    expect(paths).toContain('about');
    expect(paths).toContain('contact');
    expect(paths).toContain('**');
  });

  it('should resolve lazy loaded components for all routes', async () => {
    for (const route of routes) {
      expect(route.loadComponent).toBeDefined();
      const comp = await (route.loadComponent as () => Promise<any>)();
      expect(comp).toBeDefined();
    }
  });

  it('should navigate to home route', async () => {
    const success = await router.navigateByUrl('/');
    expect(success).toBe(true);
  });
});
