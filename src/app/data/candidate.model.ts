export interface CandidateApplication {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  discipline: string;
  roleInterest?: string;
  experienceLevel: string;
  softwareTools: string[];
  usCodes: string[];
  linkedinUrl: string;
  resumeText: string;
  agreedToTerms: boolean;
}

export const EXPERIENCE_LEVELS: string[] = [
  '1-3 years (Junior / Associate)',
  '3-5 years (Mid-Level Engineer)',
  '5-8 years (Senior Engineer)',
  '8+ years (Lead / Principal / Architect)'
];

export const COMMON_US_CODES: string[] = [
  'ASHRAE 90.1 (Energy Efficiency)',
  'ASHRAE 62.1 (Ventilation)',
  'ASME Y14.5 (GD&T)',
  'ASME BPVC (Pressure Vessels)',
  'NFPA 70 / NEC (Electrical)',
  'IEEE 1584 (Arc Flash Hazard)',
  'Uptime Institute Tier Standards'
];

export const COMMON_TOOLS: string[] = [
  'Revit MEP',
  'AutoCAD',
  'SolidWorks',
  'PTC Creo',
  'Siemens NX',
  'ANSYS Mechanical',
  'ANSYS Fluent / CFX',
  'ETAP',
  'SKM PowerTools',
  'Trane Trace 700 / EnergyPlus'
];

export function validateCandidateApplication(app: CandidateApplication): string[] {
  const errors: string[] = [];

  if (!app.fullName || app.fullName.trim().length < 2) {
    errors.push('Full name is required.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!app.email || !emailRegex.test(app.email)) {
    errors.push('Valid email is required.');
  }

  if (!app.phone || app.phone.trim().length < 8) {
    errors.push('Phone number is required.');
  }

  if (!app.location || app.location.trim().length < 2) {
    errors.push('Current location in India is required.');
  }

  if (!app.discipline) {
    errors.push('Primary engineering discipline is required.');
  }

  if (!app.experienceLevel) {
    errors.push('Experience level is required.');
  }

  if (!app.resumeText || app.resumeText.trim().length < 20) {
    errors.push('Resume summary or profile details (min 20 characters) required.');
  }

  if (!app.agreedToTerms) {
    errors.push('You must acknowledge the recruitment operations disclosure.');
  }

  return errors;
}
