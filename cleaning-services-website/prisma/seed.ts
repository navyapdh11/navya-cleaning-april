import { PrismaClient } from '@prisma/client';
import { SERVICES, STATES } from '../src/lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default admin user
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@navya.com' },
    update: {},
    create: {
      email: 'admin@navya.com',
      name: 'Admin User',
      passwordHash: 'admin123', // In production, use bcrypt
      role: 'admin',
      isActive: true
    }
  });
  console.log(`✅ Admin user: ${admin.email} / password: admin123`);

  // Seed services
  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        slug: service.slug,
        name: service.name,
        description: service.description || '',
        basePrice: service.basePrice,
        category: service.category
      }
    });
    console.log(`✅ Service: ${service.name}`);
  }

  // Seed states
  for (const state of STATES) {
    await prisma.stateLocation.upsert({
      where: { code: state.code },
      update: {},
      create: {
        code: state.code,
        name: state.name,
        isActive: true
      }
    });
    console.log(`✅ State: ${state.name}`);
  }

  // Seed default flashcards
  const defaultFlashcards = [
    { title: 'AEO Compliance', content: 'Verified real-time hygiene telemetry injected into answer engines.', icon: 'shield', category: 'Compliance', order: 0 },
    { title: 'Autonomous Fleet', content: 'National network of self-learning sanitization nodes.', icon: 'zap', category: 'Technology', order: 1 },
    { title: '24/7 Dispatch', content: 'Continuous coverage across all Australian territory nodes.', icon: 'clock', category: 'Efficiency', order: 2 }
  ];

  for (const card of defaultFlashcards) {
    await prisma.flashcard.upsert({
      where: { id: `flashcard-${card.icon}` },
      update: {},
      create: { ...card, isActive: true }
    });
    console.log(`✅ Flashcard: ${card.title}`);
  }

  // Seed default site config
  await prisma.siteConfig.upsert({
    where: { key: 'siteTitle' },
    update: {},
    create: { key: 'siteTitle', value: 'NAVYA MYTHOS' }
  });

  await prisma.siteConfig.upsert({
    where: { key: 'aeoMode' },
    update: {},
    create: { key: 'aeoMode', value: 'ACTIVE' }
  });

  console.log('🎉 Seed complete!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
