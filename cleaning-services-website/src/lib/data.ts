export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'counter' | 'toggle' | 'select';
  options?: string[];
}

export interface ServiceData {
  slug: string;
  name: string;
  description: string;
  basePrice: number;
  category: 'Residential' | 'Enterprise';
  features: string[];
  addons: Addon[];
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
    features: ['Bond Back Guarantee', 'Real Estate Approved', 'Professional Equipment', 'AEO Audit Log'],
    addons: [
      { id: 'oven-deep', name: 'Oven Deep Clean', description: 'Intensive degreasing of internal racks and glass.', price: 50, type: 'toggle' },
      { id: 'wall-wash', name: 'Wall Washing (Per Wall)', description: 'Full wash down to remove scuffs and marks.', price: 15, type: 'counter' },
      { id: 'window-ext', name: 'External Windows', description: 'Cleaning of exterior glass and tracks.', price: 12, type: 'counter' },
      { id: 'carpet-steam', name: 'Carpet Steam (Per Room)', description: 'Industrial grade hot water extraction.', price: 30, type: 'counter' },
      { id: 'garage-scrub', name: 'Garage Deep Scrub', description: 'Machine scrub for oil and concrete stains.', price: 60, type: 'toggle' }
    ]
  },
  {
    slug: 'general-domestic-cleaning',
    name: 'General Domestic Cleaning',
    description: 'Routine maintenance and sanitization for modern homes.',
    basePrice: 120,
    category: 'Residential',
    features: ['Regular Schedule', 'Bio-Safe Solutions', 'Trusted Personnel', 'Flexibility'],
    addons: [
      { id: 'fridge-clean', name: 'Fridge Interior', description: 'Complete empty, wipe and disinfect.', price: 25, type: 'toggle' },
      { id: 'ironing', name: 'Ironing Service (Per Hour)', description: 'Professional ironing of garments.', price: 45, type: 'counter' },
      { id: 'bed-change', name: 'Bed Linen Change', description: 'Fresh linen application for all beds.', price: 15, type: 'counter' },
      { id: 'organizing', name: 'Declutter/Organizing', description: 'Tidying and sorting of living spaces.', price: 50, type: 'counter' }
    ]
  },
  {
    slug: 'commercial-cleaning',
    name: 'Commercial & Office Cleaning',
    description: 'Enterprise-grade sanitization for workspaces, retail, and corporate hubs.',
    basePrice: 500,
    category: 'Enterprise',
    features: ['After-Hours Service', 'Compliance Reporting', 'Scaleable Teams', '24/7 Support'],
    addons: [
      { id: 'keyboard-sanitize', name: 'Peripheral Sanitization', description: 'UV-C and bio-wipe for keyboards/mice.', price: 5, type: 'counter' },
      { id: 'kitchenette-deep', name: 'Kitchenette Deep Clean', description: 'Sterilization of shared food areas.', price: 100, type: 'toggle' },
      { id: 'waste-removal', name: 'Bulk Waste Removal', description: 'Removal of non-standard office waste.', price: 150, type: 'toggle' }
    ]
  },
  {
    slug: 'carpet-cleaning',
    name: 'Carpet Steam Cleaning',
    description: 'Deep fiber extraction and pathogen removal using molecular-grade solutions.',
    basePrice: 150,
    category: 'Residential',
    features: ['Stain Removal', 'Fast Drying', 'Anti-Bacterial', 'Eco-Friendly'],
    addons: [
      { id: 'stain-treatment', name: 'Advanced Stain Treatment', description: 'Specialized chemicals for tough stains.', price: 20, type: 'counter' },
      { id: 'deodorizer', name: 'Antibacterial Deodorizer', description: 'Long-lasting fresh scent and hygiene.', price: 10, type: 'counter' },
      { id: 'rug-clean', name: 'Area Rug Clean', description: 'Off-floor or on-floor rug extraction.', price: 40, type: 'counter' }
    ]
  },
  {
    slug: 'window-cleaning',
    name: 'Window Cleaning',
    description: 'Crystal clear results for interior and exterior glass, even at heights.',
    basePrice: 200,
    category: 'Residential',
    features: ['Streak-Free', 'Heights Certified', 'Frame Cleaning', 'Solar Panel Safe'],
    addons: [
      { id: 'solar-panel', name: 'Solar Panel Clean', description: 'Maximize efficiency with pure water cleaning.', price: 15, type: 'counter' },
      { id: 'screen-wash', name: 'Fly Screen Wash', description: 'Deep cleaning of mesh and frames.', price: 5, type: 'counter' },
      { id: 'track-vacuum', name: 'Track Deep Clean', description: 'Vacuum and steam clean of window tracks.', price: 8, type: 'counter' }
    ]
  },
  {
    slug: 'ndis-cleaning',
    name: 'NDIS Specialized Cleaning',
    description: 'Compassionate, compliant cleaning services for NDIS participants and plan managers.',
    basePrice: 150,
    category: 'Enterprise',
    features: ['NDIS Compliant', 'Police Checked', 'Specialized Care', 'Direct Billing'],
    addons: [
      { id: 'declutter-support', name: 'Assisted Decluttering', description: 'Collaborative tidying with participant.', price: 60, type: 'counter' },
      { id: 'high-sanitization', name: 'Pathogen Control', description: 'Hospital-grade surface sterilization.', price: 40, type: 'toggle' }
    ]
  },
  {
    slug: 'deep-spring-cleaning',
    name: 'Deep / Spring Cleaning',
    description: 'One-off intensive sanitization to reset your environment to optimal hygiene levels.',
    basePrice: 400,
    category: 'Residential',
    features: ['Total Sanitization', 'High-Touch Areas', 'Detailed Audit', 'Refresh Guarantee'],
    addons: [
      { id: 'blind-wipe', name: 'Blind Wiping (Per Room)', description: 'Detailed dust and mark removal from blinds.', price: 25, type: 'counter' },
      { id: 'skirting-board', name: 'Skirting Board Detail', description: 'Hand-wiping of all skirting boards.', price: 80, type: 'toggle' },
      { id: 'exhaust-fan', name: 'Exhaust Fan Degrease', description: 'Cleaning of bathroom/kitchen fans.', price: 20, type: 'counter' }
    ]
  },
  {
    slug: 'construction-cleaning',
    name: 'Construction & Post-Renovation Cleaning',
    description: 'Detailed handover cleans for new builds and renovation projects.',
    basePrice: 600,
    category: 'Enterprise',
    features: ['Dust Removal', 'Surface Polishing', 'Safety Compliant', 'Handover Ready'],
    addons: [
      { id: 'paint-removal', name: 'Paint Scrape & Removal', description: 'Detail removal of construction residue.', price: 120, type: 'toggle' },
      { id: 'pressure-wash', name: 'Driveway Pressure Wash', description: 'Removal of mud and construction dust.', price: 200, type: 'toggle' }
    ]
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
