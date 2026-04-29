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

  console.log('🎉 Seed complete!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
