export interface ResourceCategory {
  id: string;
  name: string;
  description?: string;
}

export interface ResourceArticle {
  id: string;
  title: string;
  category: 'us-codes' | 'remote-work' | 'compensation';
  categoryName: string;
  readTime: string;
  summary: string;
  tags: string[];
  publishedDate?: string;
  author?: {
    name: string;
    role: string;
  };
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  { id: 'all', name: 'All Guides', description: 'Comprehensive library of technical articles and cross-border guides' },
  { id: 'us-codes', name: 'US Codes & Standards', description: 'ASHRAE, ASME, NFPA, IBC, and NEC compliance blueprints' },
  { id: 'remote-work', name: 'Remote Collaboration', description: 'CAD/BIM infrastructure, VDI latency, and timezone overlap protocols' },
  { id: 'compensation', name: 'Compensation & Benchmarks', description: 'US-India engineering market intelligence and billing benchmarks' }
];

export const RESOURCES: ResourceArticle[] = [
  {
    id: 'ashrae-90-1-vs-is-codes',
    title: 'ASHRAE 90.1 vs IS Codes: Bridging Indian HVAC Design for US Commercial Facilities',
    category: 'us-codes',
    categoryName: 'US Codes & Standards',
    readTime: '8 min read',
    summary: 'A comparative technical deep-dive into energy efficiency metrics, baseline HVAC modeling, ventilation rates under ASHRAE 62.1 vs IS 3103, and chiller staging for US commercial AEC projects.',
    tags: ['HVAC', 'ASHRAE 90.1', 'Energy Modeling', 'AEC', 'Revit MEP'],
    publishedDate: 'Nov 2026',
    author: {
      name: 'Metavayn MEP Practice Group',
      role: 'Principal MEP Systems Lead'
    }
  },
  {
    id: 'asme-y14-5-gdt-playbook',
    title: 'ASME Y14.5 GD&T Playbook: Precision Machining Conventions for American OEMs',
    category: 'us-codes',
    categoryName: 'US Codes & Standards',
    readTime: '12 min read',
    summary: 'Standardizing datum reference frames, composite position tolerancing, and surface profile controls between Indian drafting teams and US manufacturing plants under ASME Y14.5-2018.',
    tags: ['GD&T', 'ASME Y14.5', 'Mechanical CAD', 'Machining', 'SolidWorks'],
    publishedDate: 'Nov 2026',
    author: {
      name: 'Metavayn Mechanical Engineering Division',
      role: 'Staff Manufacturing Engineer'
    }
  },
  {
    id: 'hyperscale-datacenter-electrical',
    title: 'Hyperscale Data Center Electrical Architectures: NFPA 70 Article 645 & Uptime Tier Standards',
    category: 'us-codes',
    categoryName: 'US Codes & Standards',
    readTime: '10 min read',
    summary: 'Electrical distribution redundancy, emergency power-off (EPO) topologies, and selective coordination calculations complying with NEC Article 645 and NFPA 70E for mission-critical facilities.',
    tags: ['Electrical', 'NFPA 70', 'Data Centers', 'Power Distribution', 'ETAP'],
    publishedDate: 'Oct 2026',
    author: {
      name: 'Metavayn Mission Critical Practice',
      role: 'Senior Electrical Infrastructure Specialist'
    }
  },
  {
    id: 'remote-cad-bim-infrastructure',
    title: 'Setting Up Low-Latency Remote CAD/BIM Infrastructure Across US-India Timezones',
    category: 'remote-work',
    categoryName: 'Remote Collaboration',
    readTime: '7 min read',
    summary: 'Deploying high-performance GPU virtual desktops (VDI), Autodesk Construction Cloud (ACC) sync pipelines, and low-latency workflows for seamless cross-continent 3D coordination.',
    tags: ['BIM', 'VDI', 'Revit Cloud Worksharing', 'Infrastructure', 'DevOps'],
    publishedDate: 'Oct 2026',
    author: {
      name: 'Metavayn Cloud & Systems Team',
      role: 'Engineering Infrastructure Director'
    }
  },
  {
    id: 'effective-overlap-protocols',
    title: 'Effective Overlap Protocols for US-India Engineering Sprint Collaboration',
    category: 'remote-work',
    categoryName: 'Remote Collaboration',
    readTime: '6 min read',
    summary: 'How leading US engineering firms structure 4-hour synchronous working windows with Indian technical teams for daily standups, live model reviews, and rapid design turnarounds.',
    tags: ['Agile Engineering', 'Timezone Overlap', 'Workflow Protocols', 'Team Collaboration'],
    publishedDate: 'Sep 2026',
    author: {
      name: 'Metavayn Delivery Operations',
      role: 'Cross-Border Delivery Architect'
    }
  },
  {
    id: 'compensation-hourly-benchmark-2026',
    title: '2026 US-India Engineering Compensation & Hourly Rate Benchmark Report',
    category: 'compensation',
    categoryName: 'Compensation & Benchmarks',
    readTime: '11 min read',
    summary: 'Comprehensive data on billing rates, full-time equivalent salaries, and cost-to-productivity ratios across MEP, structural, civil, and mechanical engineering disciplines.',
    tags: ['Salary Benchmarks', 'Hourly Rates', 'Talent Economics', 'Recruitment Strategy'],
    publishedDate: 'Nov 2026',
    author: {
      name: 'Metavayn Market Intelligence',
      role: 'Compensation Research Lead'
    }
  }
];
