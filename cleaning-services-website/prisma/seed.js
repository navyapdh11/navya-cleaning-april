const { PrismaClient } = require('@prisma/client');
const path = require('path');

// Load services and states from data.ts via direct require
// Since data.ts is TypeScript, we'll hardcode the seed data here for simplicity
const SERVICES = [
  { slug: 'end-of-lease-cleaning', name: 'End of Lease (Bond) Cleaning', description: 'Comprehensive bond-back guarantee cleaning tailored for Australian real estate standards.', basePrice: 350, category: 'Residential' },
  { slug: 'general-domestic-cleaning', name: 'General Domestic Cleaning', description: 'Routine maintenance and sanitization for modern homes.', basePrice: 120, category: 'Residential' },
  { slug: 'commercial-cleaning', name: 'Commercial & Office Cleaning', description: 'Enterprise-grade sanitization for workspaces, retail, and corporate hubs.', basePrice: 500, category: 'Enterprise' },
  { slug: 'carpet-cleaning', name: 'Carpet Steam Cleaning', description: 'Deep fiber extraction and pathogen removal using molecular-grade solutions.', basePrice: 150, category: 'Residential' },
  { slug: 'window-cleaning', name: 'Window Cleaning', description: 'Crystal clear results for interior and exterior glass, even at heights.', basePrice: 200, category: 'Residential' },
  { slug: 'ndis-cleaning', name: 'NDIS Specialized Cleaning', description: 'Compassionate, compliant cleaning services for NDIS participants and plan managers.', basePrice: 150, category: 'Enterprise' },
  { slug: 'deep-spring-cleaning', name: 'Deep / Spring Cleaning', description: 'One-off intensive sanitization to reset your environment to optimal hygiene levels.', basePrice: 400, category: 'Residential' },
  { slug: 'construction-cleaning', name: 'Construction & Post-Renovation Cleaning', description: 'Detailed handover cleans for new builds and renovation projects.', basePrice: 600, category: 'Enterprise' }
];

const STATES = [
  { code: 'NSW', name: 'New South Wales' },
  { code: 'VIC', name: 'Victoria' },
  { code: 'QLD', name: 'Queensland' },
  { code: 'WA', name: 'Western Australia' },
  { code: 'SA', name: 'South Australia' },
  { code: 'TAS', name: 'Tasmania' },
  { code: 'ACT', name: 'Australian Capital Territory' },
  { code: 'NT', name: 'Northern Territory' }
];

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@navya.com' },
    update: {},
    create: { email: 'admin@navya.com', name: 'Admin User', passwordHash: 'admin123', role: 'admin', isActive: true }
  });
  console.log(`✅ Admin: ${admin.email} / password: admin123`);

  for (const s of SERVICES) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: { slug: s.slug, name: s.name, description: s.description, basePrice: s.basePrice, category: s.category }
    });
    console.log(`✅ Service: ${s.name}`);
  }

  for (const st of STATES) {
    await prisma.stateLocation.upsert({
      where: { code: st.code },
      update: {},
      create: { code: st.code, name: st.name, isActive: true }
    });
    console.log(`✅ State: ${st.name}`);
  }

  const flashcards = [
    { id: 'fc-shield', title: 'AEO Compliance', content: 'Verified real-time hygiene telemetry injected into answer engines.', icon: 'shield', category: 'Compliance', order: 0 },
    { id: 'fc-zap', title: 'Autonomous Fleet', content: 'National network of self-learning sanitization nodes.', icon: 'zap', category: 'Technology', order: 1 },
    { id: 'fc-clock', title: '24/7 Dispatch', content: 'Continuous coverage across all Australian territory nodes.', icon: 'clock', category: 'Efficiency', order: 2 }
  ];
  for (const fc of flashcards) {
    await prisma.flashcard.upsert({
      where: { id: fc.id },
      update: {},
      create: { ...fc, isActive: true }
    });
    console.log(`✅ Flashcard: ${fc.title}`);
  }

  await prisma.siteConfig.upsert({ where: { key: 'siteTitle' }, update: {}, create: { key: 'siteTitle', value: 'NAVYA MYTHOS' } });
  await prisma.siteConfig.upsert({ where: { key: 'aeoMode' }, update: {}, create: { key: 'aeoMode', value: 'ACTIVE' } });
  await prisma.siteConfig.upsert({ where: { key: 'phone' }, update: {}, create: { key: 'phone', value: '0426 532 177' } });
  await prisma.siteConfig.upsert({ where: { key: 'email' }, update: {}, create: { key: 'email', value: 'info@navyamythos.com.au' } });

  // Seed testimonials
  const testimonials = [
    { id: 't-seed-sarah', name: 'Sarah Mitchell', role: 'Property Manager', company: 'Ray White NSW', rating: 5, content: 'NAVYA MYTHOS transformed our bond cleaning turnaround. 48-hour dispatch across Sydney with zero complaints. The AEO compliance logs are a game changer.', imageUrl: '', isFeatured: true, isActive: true, order: 0 },
    { id: 't-seed-david', name: 'David Chen', role: 'Facilities Director', company: 'CBRE Melbourne', rating: 5, content: 'The enterprise portal lets us manage 12 sites from one dashboard. Compliance reporting used to take days — now its instant.', imageUrl: '', isFeatured: true, isActive: true, order: 1 },
    { id: 't-seed-priya', name: 'Priya Sharma', role: 'NDIS Coordinator', company: 'Home Care Plus', rating: 4, content: 'Compassionate service that meets NDIS standards. The police-checked cleaners are thorough and the direct billing saves so much admin.', imageUrl: '', isFeatured: false, isActive: true, order: 2 }
  ];
  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: {},
      create: t
    });
    console.log(`✅ Testimonial: ${t.name}`);
  }

  // Seed ad campaign
  await prisma.adCampaign.upsert({
    where: { id: 'ad-seed-1' },
    update: {},
    create: {
      name: 'Launch Offer — End of Lease',
      description: 'Book your end of lease clean and get 15% off oven deep clean add-on. Bond back guaranteed.',
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=200&fit=crop',
      linkUrl: '/booking?service=end-of-lease-cleaning',
      startDate: new Date(),
      budget: 500,
      spent: 0,
      impressions: 0,
      clicks: 0,
      isActive: true,
      targetPages: '["home","booking"]'
    }
  });
  console.log('✅ Ad Campaign: Launch Offer');

  console.log('🎉 Seed complete!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
