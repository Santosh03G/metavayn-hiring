import { describe, it, expect } from 'vitest';
import {
  EXPERIENCE_LEVELS,
  COMMON_US_CODES,
  COMMON_TOOLS,
  validateCandidateApplication,
  CandidateApplication
} from './candidate.model';

describe('Candidate Model & Utilities', () => {
  it('should define experience levels and technical options', () => {
    expect(EXPERIENCE_LEVELS.length).toBeGreaterThanOrEqual(4);
    expect(COMMON_US_CODES.length).toBeGreaterThanOrEqual(5);
    expect(COMMON_TOOLS.length).toBeGreaterThanOrEqual(8);
  });

  it('should validate a complete candidate application', () => {
    const validApp: CandidateApplication = {
      fullName: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      location: 'Bengaluru, India',
      discipline: 'hvac-thermal',
      roleInterest: 'hvac-lead-design',
      experienceLevel: '5-8 years',
      softwareTools: ['Revit MEP', 'AutoCAD'],
      usCodes: ['ASHRAE 90.1 (Energy Standard)'],
      linkedinUrl: 'https://linkedin.com/in/rahulsharma',
      resumeText: 'Experienced HVAC design engineer with 6 years designing central plants...',
      agreedToTerms: true
    };

    const errors = validateCandidateApplication(validApp);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when required fields or mandatory disclosures are missing', () => {
    const invalidApp: Partial<CandidateApplication> = {
      fullName: '',
      email: 'invalid-email',
      agreedToTerms: false
    };

    const errors = validateCandidateApplication(invalidApp as CandidateApplication);
    expect(errors).toContain('Full name is required.');
    expect(errors).toContain('Valid email is required.');
    expect(errors).toContain('You must acknowledge the recruitment operations disclosure.');
  });
});
