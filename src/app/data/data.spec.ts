import { describe, it, expect } from 'vitest';
import { TRUST_METRICS } from './trust-metrics.data';
import { DISCIPLINES } from './disciplines.data';
import { FEATURED_JOBS } from './jobs.data';

describe('Data Sets', () => {
  it('should have 4 trust metrics with required fields', () => {
    expect(TRUST_METRICS.length).toBe(4);
    TRUST_METRICS.forEach(metric => {
      expect(metric.label).toBeTruthy();
      expect(metric.value).toBeGreaterThan(0);
      expect(metric.description).toBeTruthy();
    });
  });

  it('should have 5 engineering disciplines with detail metadata', () => {
    expect(DISCIPLINES.length).toBe(5);
    DISCIPLINES.forEach(discipline => {
      expect(discipline.id).toBeTruthy();
      expect(discipline.slug).toBeTruthy();
      expect(discipline.name).toBeTruthy();
      expect(discipline.shortDescription).toBeTruthy();
      expect(discipline.heroSubtitle).toBeTruthy();
      expect(discipline.fullOverview).toBeTruthy();
      expect(discipline.iconName).toBeTruthy();
      expect(discipline.roles.length).toBeGreaterThan(0);
      expect(discipline.coreFocusAreas.length).toBeGreaterThanOrEqual(4);
    });
  });

  it('should have illustrative job listings covering all 5 disciplines', () => {
    expect(FEATURED_JOBS.length).toBeGreaterThanOrEqual(5);
    const disciplineSlugs = new Set(FEATURED_JOBS.map(j => j.disciplineSlug));
    expect(disciplineSlugs.size).toBe(5);

    FEATURED_JOBS.forEach(job => {
      expect(job.id).toBeTruthy();
      expect(job.title).toBeTruthy();
      expect(job.discipline).toBeTruthy();
      expect(job.disciplineSlug).toBeTruthy();
      expect(job.location).toBeTruthy();
      expect(job.workType).toBeTruthy();
      expect(job.compensation).toBeTruthy();
      expect(job.isIllustrative).toBe(true);
      expect(job.tags.length).toBeGreaterThan(0);
    });
  });
});
