export interface Discipline {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  heroSubtitle: string;
  fullOverview: string;
  iconName: string;
  roles: string[];
  coreFocusAreas: string[];
}

export const DISCIPLINES: Discipline[] = [
  {
    id: 'hvac-thermal',
    slug: 'hvac-thermal',
    name: 'HVAC & Thermal Systems',
    shortDescription: 'Heating, ventilation, air conditioning, and thermal distribution design for industrial and commercial facilities.',
    heroSubtitle: 'Specialized thermal load calculations, central plant architectures, and building ventilation engineering.',
    fullOverview: 'We recruit Indian mechanical and thermal engineering talent skilled in central chilled-water systems, variable refrigerant flow (VRF), industrial boiler plants, and air-side distribution. Our candidates have deep familiarity with ASHRAE 90.1, 62.1, and 55 standards, advanced energy modeling software, and commercial HVAC mechanical packages.',
    iconName: 'wind',
    roles: ['Mechanical Systems Design', 'Thermal Analysis', 'Central Plant Engineering', 'CFD Simulation', 'Building Automation (BAS)'],
    coreFocusAreas: [
      'Central Chilled Water & Boiler Plant Sizing',
      'Hydronic & Air-Side Distribution Modeling',
      'Building Energy Simulation (EnergyPlus, Trace 700/3D)',
      'Cleanroom & Laboratory Pressurization Design',
      'ASHRAE & LEED Baseline Compliance'
    ]
  },
  {
    id: 'mechanical',
    slug: 'mechanical',
    name: 'Mechanical Engineering',
    shortDescription: 'Machinery design, 3D parametric CAD modeling, structural FEA, and precision electro-mechanical packaging.',
    heroSubtitle: 'Robust machinery engineering, complex kinematic assemblies, and manufacturing-ready documentation.',
    fullOverview: 'Our mechanical talent pool encompasses engineers specialized in industrial machinery, heavy equipment, electro-mechanical mechanisms, and robotic packaging. With expertise in SolidWorks, PTC Creo, and Siemens NX, our placed professionals integrate GD&T (ASME Y14.5), structural stress calculations, and design for manufacturing/assembly (DFMA).',
    iconName: 'cog',
    roles: ['Machine Design', 'SolidWorks / Creo Modeling', 'GD&T & Tolerance Stackup', 'Structural FEA', 'Tooling & Fixtures'],
    coreFocusAreas: [
      'Complex 3D Parametric CAD Assembly Modeling',
      'GD&T Application & Tolerance Stackup Analysis (ASME Y14.5)',
      'Weldment, Sheet Metal & Casting Design',
      'Design for Manufacturability & Assembly (DFMA)',
      'Structural FEA & Component Fatigue Optimization'
    ]
  },
  {
    id: 'electrical',
    slug: 'electrical',
    name: 'Electrical & Power Systems',
    shortDescription: 'Medium and low-voltage power distribution, substations, single-line schematics, and protective coordination.',
    heroSubtitle: 'Mission-critical electrical distribution, protection studies, and industrial automation control.',
    fullOverview: 'Metavayn connects US utilities, industrial EPCs, and mission-critical developers with Indian electrical power engineers. Candidates possess specialized experience in medium and low-voltage switchgear, single-line diagrams, substation physical layouts, protective relay coordination (ETAP/SKM), and NFPA 70 / National Electrical Code (NEC) compliance.',
    iconName: 'zap',
    roles: ['Power Distribution (MV/LV)', 'Single-Line Diagrams', 'Substation Design', 'PLC & SCADA Integration', 'Arc Flash Studies'],
    coreFocusAreas: [
      'Medium & Low Voltage Power Distribution (Up to 34.5kV)',
      'Single-Line, Three-Line & Control Schematics',
      'Short Circuit, Protective Device Coordination & Arc Flash (ETAP/SKM)',
      'Substation Physical Layouts & Grounding Grid Design',
      'PLC, SCADA & Industrial Control System Architecture'
    ]
  },
  {
    id: 'data-center',
    slug: 'data-center',
    name: 'Data Center Infrastructure',
    shortDescription: 'Mission-critical electrical distribution, high-density cooling architectures, and resilient backup systems.',
    heroSubtitle: 'High-density computational cooling, 2N redundant power paths, and continuous availability engineering.',
    fullOverview: 'With hyper-scaler demand surging, Metavayn specializes in sourcing high-caliber mission-critical facilities engineers. Our candidates engineer Tier III and Tier IV data center facilities, liquid cooling loops, hot/cold aisle containment, rotary and static UPS configurations, and emergency standby generation systems.',
    iconName: 'server',
    roles: ['Mission Critical Facilities', 'Redundant Cooling Architecture', 'UPS & Backup Generators', 'Power Density Modeling', 'Commissioning (Cx)'],
    coreFocusAreas: [
      'High-Density Liquid & Air Cooling Topology (Direct-to-Chip, CDU)',
      '2N & N+1 Redundant Electrical Power Train Architecture',
      'Emergency Standby Diesel Generation & Fuel System Sizing',
      'Computational Fluid Dynamics for Server Room Airflow',
      'Data Center Commissioning (Level 1-5 Cx Protocol)'
    ]
  },
  {
    id: 'engineering-analysis',
    slug: 'engineering-analysis',
    name: 'Engineering Analysis & Simulation',
    shortDescription: 'Advanced computational fluid dynamics, finite element analysis, and multi-physics verification.',
    heroSubtitle: 'High-fidelity numerical simulation, structural non-linear FEA, and fluid-thermal multi-physics.',
    fullOverview: 'We curate top Indian simulation specialists who perform advanced virtual validation before physical prototyping. Candidates utilize ANSYS, Abaqus, and COMSOL to execute non-linear structural mechanics, dynamic shock/vibration, conjugate heat transfer (CHT), and multi-phase fluid simulations.',
    iconName: 'activity',
    roles: ['Finite Element Analysis (FEA)', 'Computational Fluid Dynamics (CFD)', 'Thermal & Stress Verification', 'Modal & Vibration Dynamics', 'ANSYS / Abaqus Modeling'],
    coreFocusAreas: [
      'Non-Linear Structural & Plasticity Finite Element Analysis',
      'Conjugate Heat Transfer (CHT) & Thermal Transient Modeling',
      'Modal, Harmonic & Random Vibration Dynamic Simulation',
      'Turbulence & Multi-Phase Fluid Dynamics (ANSYS Fluent/CFX)',
      'Fatigue Life Estimation & Failure Mode Simulation'
    ]
  }
];
