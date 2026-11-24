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
  responsibilities: string[];
  qualifications: string[];
  preferredTools: string[];
  relevantCodes: string[];
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
    responsibilities: [
      'Perform heating, cooling, and ventilation load calculations using Trace 700 / EnergyPlus.',
      'Design chilled water, hot water, and condenser water distribution systems.',
      'Coordinate ductwork routing and air terminal sizing in Revit MEP BIM models.',
      'Evaluate energy efficiency measures against ASHRAE Standard 90.1 baselines.'
    ],
    qualifications: [
      'Bachelor’s or Master’s in Mechanical Engineering.',
      '5+ years engineering commercial and industrial HVAC mechanical systems.',
      'Expert proficiency in Autodesk Revit MEP and AutoCAD.',
      'Working knowledge of US building energy codes and ventilation standards.'
    ],
    preferredTools: ['Revit MEP', 'AutoCAD', 'Trane Trace 700 / 3D', 'EnergyPlus', 'Bluebeam Revu'],
    relevantCodes: ['ASHRAE 90.1 (Energy Standard)', 'ASHRAE 62.1 (Ventilation)', 'ASHRAE 55 (Thermal Comfort)', 'International Mechanical Code (IMC)'],
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
    responsibilities: [
      'Develop complex 3D parametric CAD models and manufacturing assemblies in SolidWorks/Creo.',
      'Execute geometric dimensioning and tolerancing (GD&T) tolerance stackup analysis.',
      'Select mechanical power transmission components (gearboxes, bearings, linear actuators).',
      'Conduct static finite element stress verification on structural frames.'
    ],
    qualifications: [
      'Bachelor’s in Mechanical or Mechatronics Engineering.',
      '6+ years of custom automation machinery or packaging equipment design.',
      'Certified SolidWorks Professional (CSWP) or Creo equivalent.',
      'In-depth mastery of ASME Y14.5 drafting and tolerancing conventions.'
    ],
    preferredTools: ['SolidWorks', 'PTC Creo', 'Siemens NX', 'SolidWorks Simulation', 'Mathcad'],
    relevantCodes: ['ASME Y14.5 (GD&T)', 'ASME B18 (Fasteners)', 'OSHA Machinery Guarding Standards'],
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
    responsibilities: [
      'Engineer single-line diagrams, three-line schematics, and wiring schedules for facilities.',
      'Model medium-voltage (up to 34.5kV) distribution systems in ETAP / SKM PowerTools.',
      'Perform short-circuit calculations, relay coordination, and arc flash hazard evaluations.',
      'Specify dry-type transformers, vacuum circuit breakers, and motor control centers (MCC).'
    ],
    qualifications: [
      'Bachelor’s in Electrical Power Engineering.',
      '5+ years experience in industrial or utility power distribution design.',
      'Advanced modeling proficiency in ETAP or SKM PowerTools.',
      'Thorough knowledge of NFPA 70 (National Electrical Code) and IEEE guidelines.'
    ],
    preferredTools: ['ETAP', 'SKM PowerTools', 'AutoCAD Electrical', 'Revit Electrical'],
    relevantCodes: ['NFPA 70 / NEC (National Electrical Code)', 'IEEE 1584 (Arc Flash Hazard)', 'IEEE 242 (Buff Book - Protection)'],
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
    responsibilities: [
      'Design concurrent maintainable (Tier III/IV) electrical topologies and power trains.',
      'Size utility service feeds, diesel generator plants, and static/rotary UPS systems.',
      'Perform transient stability, fault ride-through, and selective coordination studies.',
      'Author Level 1-5 commissioning (Cx) scripts and factory acceptance testing protocols.'
    ],
    qualifications: [
      'Bachelor’s or Master’s in Electrical Engineering.',
      '6+ years engineering mission-critical data center electrical infrastructure.',
      'Deep expertise in Uptime Institute Tier Standards (Tier III/IV topologies).',
      'Demonstrated experience with US utility interconnection requirements.'
    ],
    preferredTools: ['SKM PowerTools', 'ETAP', 'AutoCAD', 'Revit BIM', 'EPMS Software'],
    relevantCodes: ['Uptime Institute Tier Standards', 'NFPA 70 / NEC Article 645', 'NFPA 110 (Emergency Power)', 'IEEE 3006'],
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
    responsibilities: [
      'Construct high-fidelity 3D meshes (hexahedral, polyhedral) for structural and CFD domains.',
      'Perform non-linear elastoplastic stress, contact, and structural buckling analyses.',
      'Model conjugate heat transfer (CHT) and natural/forced convection airflow.',
      'Correlate numerical simulation results with empirical physical test data.'
    ],
    qualifications: [
      'Master’s or PhD in Mechanical Engineering or Computational Mechanics.',
      '4+ years executing advanced numerical simulation using ANSYS or Abaqus.',
      'Strong theoretical foundation in solid mechanics, thermodynamics, and fluid dynamics.',
      'Proficiency in Python or APDL scripting for simulation post-processing automation.'
    ],
    preferredTools: ['ANSYS Mechanical', 'ANSYS Fluent / CFX', 'Abaqus', 'HyperMesh', 'ParaView'],
    relevantCodes: ['ASME Boiler and Pressure Vessel Code (BPVC Section VIII)', 'AIAA / NASA Verification & Validation Standards'],
    isIllustrative: true
  }
];
