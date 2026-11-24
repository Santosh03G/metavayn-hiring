export interface EmployerInquiry {
  companyName: string;
  contactName: string;
  businessEmail: string;
  phone: string;
  disciplines: string[];
  headcount: string;
  engagementModel: string;
  projectOverview: string;
}

export const HEADCOUNT_OPTIONS: string[] = [
  '1-2 Engineers',
  '3-5 Engineers',
  '5-10 Engineers',
  '10+ Engineers (Dedicated Pod)'
];

export const ENGAGEMENT_MODELS: string[] = [
  'Dedicated Full-Time Remote',
  'Contract / Project Surge Augmentation',
  'Contract-to-Hire Placement'
];

export function validateEmployerInquiry(inquiry: EmployerInquiry): string[] {
  const errors: string[] = [];

  if (!inquiry.companyName || inquiry.companyName.trim().length < 2) {
    errors.push('Company name is required.');
  }

  if (!inquiry.contactName || inquiry.contactName.trim().length < 2) {
    errors.push('Contact person name is required.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!inquiry.businessEmail || !emailRegex.test(inquiry.businessEmail)) {
    errors.push('Valid corporate email address is required.');
  }

  if (!inquiry.phone || inquiry.phone.trim().length < 7) {
    errors.push('Phone number is required.');
  }

  if (!inquiry.disciplines || inquiry.disciplines.length === 0) {
    errors.push('At least one engineering discipline must be selected.');
  }

  if (!inquiry.headcount) {
    errors.push('Target headcount is required.');
  }

  if (!inquiry.engagementModel) {
    errors.push('Engagement model is required.');
  }

  if (!inquiry.projectOverview || inquiry.projectOverview.trim().length < 15) {
    errors.push('Project / role overview (minimum 15 characters) is required.');
  }

  return errors;
}
