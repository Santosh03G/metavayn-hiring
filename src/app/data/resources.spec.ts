import { describe, it, expect } from 'vitest';
import { RESOURCES, RESOURCE_CATEGORIES, ResourceArticle } from './resources.data';

describe('Resources Data', () => {
  it('should define resource categories and articles', () => {
    expect(RESOURCE_CATEGORIES.length).toBeGreaterThanOrEqual(4);
    expect(RESOURCES.length).toBeGreaterThanOrEqual(6);
  });

  it('should have required fields on all resource items', () => {
    RESOURCES.forEach((r: ResourceArticle) => {
      expect(r.id).toBeTruthy();
      expect(r.title).toBeTruthy();
      expect(r.category).toBeTruthy();
      expect(r.categoryName).toBeTruthy();
      expect(r.readTime).toBeTruthy();
      expect(r.summary).toBeTruthy();
      expect(r.tags.length).toBeGreaterThan(0);
    });
  });
});
