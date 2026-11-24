export interface Discipline {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  iconName: string;
  roles: string[];
}

export const DISCIPLINES: Discipline[] = [
  {
    id: 'hvac-thermal',
    slug: 'hvac-thermal',
    name: 'HVAC & Thermal Systems',
    shortDescription: 'Heating, ventilation, air conditioning, and thermal distribution design for industrial and commercial facilities.',
    iconName: 'wind',
    roles: ['Mechanical Systems Design', 'Thermal Analysis', 'Central Plant Engineering', 'CFD Simulation', 'Building Automation (BAS)']
  },
  {
    id: 'mechanical',
    slug: 'mechanical',
    name: 'Mechanical Engineering',
    shortDescription: 'Machinery design, 3D parametric CAD modeling, structural FEA, and precision electro-mechanical packaging.',
    iconName: 'cog',
    roles: ['Machine Design', 'SolidWorks / Creo Modeling', 'GD&T & Tolerance Stackup', 'Structural FEA', 'Tooling & Fixtures']
  },
  {
    id: 'electrical',
    slug: 'electrical',
    name: 'Electrical & Power Systems',
    shortDescription: 'Medium and low-voltage power distribution, substations, single-line schematics, and protective coordination.',
    iconName: 'zap',
    roles: ['Power Distribution (MV/LV)', 'Single-Line Diagrams', 'Substation Design', 'PLC & SCADA Integration', 'Arc Flash Studies']
  },
  {
    id: 'data-center',
    slug: 'data-center',
    name: 'Data Center Infrastructure',
    shortDescription: 'Mission-critical electrical distribution, high-density cooling architectures, and resilient backup systems.',
    iconName: 'server',
    roles: ['Mission Critical Facilities', 'Redundant Cooling Architecture', 'UPS & Backup Generators', 'Power Density Modeling', 'Commissioning (Cx)']
  },
  {
    id: 'engineering-analysis',
    slug: 'engineering-analysis',
    name: 'Engineering Analysis & Simulation',
    shortDescription: 'Advanced computational fluid dynamics, finite element analysis, and multi-physics verification.',
    iconName: 'activity',
    roles: ['Finite Element Analysis (FEA)', 'Computational Fluid Dynamics (CFD)', 'Thermal & Stress Verification', 'Modal & Vibration Dynamics', 'ANSYS / Abaqus Modeling']
  }
];
