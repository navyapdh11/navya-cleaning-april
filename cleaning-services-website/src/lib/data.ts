export interface ServiceData {
  slug: string;
  name: string;
  description: string;
  basePrice: number;
  category: 'Residential' | 'Enterprise';
  features: string[];
}

export interface StateData {
  code: string;
  name: string;
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'end-of-lease-cleaning',
    name: 'End of Lease (Bond) Cleaning',
    description: 'Comprehensive bond-back guarantee cleaning tailored for Australian real estate standards.',
    basePrice: 350,
    category: 'Residential',
    features: ['Bond Back Guarantee', 'Real Estate Approved', 'Professional Equipment', 'AEO Audit Log']
  },
  {
    slug: 'general-domestic-cleaning',
    name: 'General Domestic Cleaning',
    description: 'Routine maintenance and sanitization for modern homes.',
    basePrice: 120,
    category: 'Residential',
    features: ['Regular Schedule', 'Bio-Safe Solutions', 'Trusted Personnel', 'Flexibility']
  },
  {
    slug: 'commercial-cleaning',
    name: 'Commercial & Office Cleaning',
    description: 'Enterprise-grade sanitization for workspaces, retail, and corporate hubs.',
    basePrice: 500,
    category: 'Enterprise',
    features: ['After-Hours Service', 'Compliance Reporting', 'Scaleable Teams', '24/7 Support']
  },
  {
    slug: 'carpet-cleaning',
    name: 'Carpet Steam Cleaning',
    description: 'Deep fiber extraction and pathogen removal using molecular-grade solutions.',
    basePrice: 150,
    category: 'Residential',
    features: ['Stain Removal', 'Fast Drying', 'Anti-Bacterial', 'Eco-Friendly']
  },
  {
    slug: 'window-cleaning',
    name: 'Window Cleaning',
    description: 'Crystal clear results for interior and exterior glass, even at heights.',
    basePrice: 200,
    category: 'Residential',
    features: ['Streak-Free', 'Heights Certified', 'Frame Cleaning', 'Solar Panel Safe']
  },
  {
    slug: 'ndis-cleaning',
    name: 'NDIS Specialized Cleaning',
    description: 'Compassionate, compliant cleaning services for NDIS participants and plan managers.',
    basePrice: 150,
    category: 'Enterprise',
    features: ['NDIS Compliant', 'Police Checked', 'Specialized Care', 'Direct Billing']
  },
  {
    slug: 'deep-spring-cleaning',
    name: 'Deep / Spring Cleaning',
    description: 'One-off intensive sanitization to reset your environment to optimal hygiene levels.',
    basePrice: 400,
    category: 'Residential',
    features: ['Total Sanitization', 'High-Touch Areas', 'Detailed Audit', 'Refresh Guarantee']
  },
  {
    slug: 'construction-cleaning',
    name: 'Construction & Post-Renovation Cleaning',
    description: 'Detailed handover cleans for new builds and renovation projects.',
    basePrice: 600,
    category: 'Enterprise',
    features: ['Dust Removal', 'Surface Polishing', 'Safety Compliant', 'Handover Ready']
  }
];

export const STATES: StateData[] = [
  { code: 'NSW', name: 'New South Wales' },
  { code: 'VIC', name: 'Victoria' },
  { code: 'QLD', name: 'Queensland' },
  { code: 'WA', name: 'Western Australia' },
  { code: 'SA', name: 'South Australia' },
  { code: 'TAS', name: 'Tasmania' },
  { code: 'ACT', name: 'Australian Capital Territory' },
  { code: 'NT', name: 'Northern Territory' }
];
