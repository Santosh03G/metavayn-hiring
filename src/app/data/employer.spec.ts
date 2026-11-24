import { describe, it, expect } from 'vitest';
import {
  HEADCOUNT_OPTIONS,
  ENGAGEMENT_MODELS,
  validateEmployerInquiry,
  EmployerInquiry
} from './employer.model';

describe('Employer Model & Utilities', () => {
  it('should define headcount and engagement options', () => {
    expect(HEADCOUNT_OPTIONS.length).toBeGreaterThanOrEqual(3);
    expect(ENGAGEMENT_MODELS.length).toBeGreaterThanOrEqual(3);
  });

  it('should validate a complete employer inquiry', () => {
    const validInquiry: EmployerInquiry = {
      companyName: 'Apex Engineering Solutions LLC',
      contactName: 'David Miller',
      businessEmail: 'david.miller@apexeng.com',
      phone: '+1 555-234-5678',
      disciplines: ['hvac-thermal', 'mechanical'],
      headcount: '1-2 Engineers',
      engagementModel: 'Dedicated Full-Time Remote',
      projectOverview: 'Looking for 2 HVAC engineers proficient in Revit MEP and ASHRAE 90.1 calculations.'
    };

    const errors = validateEmployerInquiry(validInquiry);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when required fields are missing or invalid', () => {
    const invalidInquiry: Partial<EmployerInquiry> = {
      companyName: '',
      contactName: '',
      businessEmail: 'not-an-email',
      disciplines: []
    };

    const errors = validateEmployerInquiry(invalidInquiry as EmployerInquiry);
    expect(errors).toContain('Company name is required.');
    expect(errors).toContain('Contact person name is required.');
    expect(errors).toContain('Valid corporate email address is required.');
    expect(errors).toContain('At least one engineering discipline must be selected.');
  });
});
