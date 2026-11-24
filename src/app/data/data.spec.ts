import { TRUST_METRICS } from './trust-metrics.data';
import { DISCIPLINES } from './disciplines.data';
import { FEATURED_JOBS } from './jobs.data';

describe('Home Page Mock Data', () => {
  it('should have 4 trust metrics defined with positive target numbers', () => {
    expect(TRUST_METRICS.length).toBe(4);
    TRUST_METRICS.forEach(metric => {
      expect(metric.value).toBeGreaterThan(0);
      expect(metric.label).toBeTruthy();
    });
  });

  it('should have 5 core engineering disciplines defined', () => {
    expect(DISCIPLINES.length).toBe(5);
    const slugs = DISCIPLINES.map(d => d.slug);
    expect(slugs).toContain('hvac-thermal');
    expect(slugs).toContain('mechanical');
    expect(slugs).toContain('electrical');
    expect(slugs).toContain('data-center');
    expect(slugs).toContain('engineering-analysis');
  });

  it('should have 3 featured illustrative jobs all flagged with isIllustrative=true', () => {
    expect(FEATURED_JOBS.length).toBe(3);
    FEATURED_JOBS.forEach(job => {
      expect(job.isIllustrative).toBe(true);
      expect(job.title).toBeTruthy();
      expect(job.compensation).toBeTruthy();
      expect(job.tags.length).toBeGreaterThan(0);
    });
  });
});
