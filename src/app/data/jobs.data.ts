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
    id: 'mechanical-machine-design',
    title: 'Senior Mechanical Design Engineer',
    discipline: 'Mechanical Engineering',
    disciplineSlug: 'mechanical',
    location: 'Remote (US Midwest Client)',
    workType: 'Remote',
    compensation: '$88,000 - $115,000 USD / Equiv.',
    description: 'Parametric CAD machine design, precision kinematics, and GD&T tolerance stackups for industrial automated assembly equipment.',
    tags: ['SolidWorks', 'PTC Creo', 'GD&T (ASME Y14.5)', 'DFMA', 'Machine Design'],
    isIllustrative: true
  },
  {
    id: 'electrical-power-distribution',
    title: 'Power Systems Distribution Engineer',
    discipline: 'Electrical & Power Systems',
    disciplineSlug: 'electrical',
    location: 'Remote (US South Client)',
    workType: 'Remote',
    compensation: '$90,000 - $120,000 USD / Equiv.',
    description: 'Execute medium-voltage single-line diagrams, substation layouts, and protective relay coordination studies using ETAP.',
    tags: ['ETAP', 'Single-Line Diagrams', 'Medium Voltage', 'Substation Design', 'NFPA 70/NEC'],
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
  },
  {
    id: 'mechanical-fea-cfd',
    title: 'Mechanical Analysis Engineer (FEA/CFD)',
    discipline: 'Engineering Analysis & Simulation',
    disciplineSlug: 'engineering-analysis',
    location: 'Remote (US Northeast Client)',
    workType: 'Remote',
    compensation: '$92,000 - $118,000 USD / Equiv.',
    description: 'Execute static structural, transient thermal, and hydrodynamic CFD simulations for heavy equipment enclosures and heat transfer assemblies.',
    tags: ['ANSYS Mechanical', 'Abaqus', 'SolidWorks Simulation', 'Nonlinear FEA', 'Thermal Analysis'],
    isIllustrative: true
  }
];
