export interface TrustMetric {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
}

// TODO: Replace illustrative launch metrics with certified operational metrics once available
export const TRUST_METRICS: TrustMetric[] = [
  {
    value: 5,
    label: 'Engineering Disciplines',
    description: 'HVAC, Mechanical, Electrical, Data Center & Analysis'
  },
  {
    value: 100,
    suffix: '%',
    label: 'Domain-First Screening',
    description: 'Technical evaluation led by engineering specialists'
  },
  {
    value: 48,
    suffix: 'h',
    label: 'Average Shortlist Time',
    description: 'Vetted candidate dossier turnaround'
  },
  {
    value: 15,
    suffix: '+',
    label: 'US Project Sectors',
    description: 'Infrastructure, energy, mission critical & manufacturing'
  }
];
