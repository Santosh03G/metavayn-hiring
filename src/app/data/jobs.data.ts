export interface JobListing {
  id: string;
  title: string;
  discipline: string;
  disciplineSlug: string;
  location: string;
  workType: 'Remote' | 'Hybrid' | 'On-Site';
  compensation: string;
  description: string;
  tags: string[];
  isIllustrative: boolean;
}

export const FEATURED_JOBS: JobListing[] = [
  {
    id: 'hvac-lead-design',
    title: 'HVAC Systems Design Engineer',
    discipline: 'HVAC & Thermal Systems',
    disciplineSlug: 'hvac-thermal',
    location: 'Remote (US East Coast Client)',
    workType: 'Remote',
    compensation: '$85,000 - $110,000 USD / Equiv.',
    description: 'Design and sizing of commercial hydronic piping, air distribution, and chilled water central plant systems adhering to ASHRAE 90.1 standards.',
    tags: ['Revit MEP', 'AutoCAD', 'ASHRAE 90.1', 'Central Plant Design', 'Cooling Towers'],
    isIllustrative: true
  },
  {
    id: 'mechanical-fea-cfd',
    title: 'Mechanical Analysis Engineer (FEA/CFD)',
    discipline: 'Engineering Analysis & Simulation',
    disciplineSlug: 'engineering-analysis',
    location: 'Remote (US Midwest Client)',
    workType: 'Remote',
    compensation: '$90,000 - $115,000 USD / Equiv.',
    description: 'Execute static structural, transient thermal, and hydrodynamic CFD simulations for heavy equipment enclosures and heat transfer assemblies.',
    tags: ['ANSYS Mechanical', 'Abaqus', 'SolidWorks Simulation', 'Nonlinear FEA', 'Thermal Analysis'],
    isIllustrative: true
  },
  {
    id: 'datacenter-electrical-lead',
    title: 'Data Center Electrical Infrastructure Engineer',
    discipline: 'Data Center Infrastructure',
    disciplineSlug: 'data-center',
    location: 'Remote (US West Coast Client)',
    workType: 'Remote',
    compensation: '$95,000 - $125,000 USD / Equiv.',
    description: 'Lead single-line schematic architecture, emergency standby generation, and redundant N+1 UPS power path calculations for hyperscale data centers.',
    tags: ['Single-Line Diagrams', 'Medium Voltage (13.8kV)', 'Rotary UPS', 'SKM PowerTools', 'Coordination Studies'],
    isIllustrative: true
  }
];
