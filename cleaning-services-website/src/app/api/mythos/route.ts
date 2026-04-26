import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SERVICES } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === 'schedule') {
      const { facilityName, sqft, date, serviceSlug, stateCode, enterpriseClientId } = payload;
      
      // Find the service in the database or data dictionary
      const service = SERVICES.find(s => s.slug === serviceSlug) || SERVICES[0];

      // Logic for 2026 Mythos Data Simulation (Muon/GRPO aligned)
      const mythosData = {
        totalParameters: '1.9B (nanochat-optimal)',
        attnType: 'FlashAttention-3',
        rope: 'Rotary-Positional-Embeddings',
        optimizer: 'Muon',
        alignment: 'GRPO',
        verification: 'Mandatory',
        optimizationEngine: 'Active-Learning'
      };

      // In a real scenario, we would ensure Service and StateLocation exist in PG
      // For this implementation, we'll upsert them to ensure the relation works
      await prisma.service.upsert({
        where: { slug: service.slug },
        update: {},
        create: {
          slug: service.slug,
          name: service.name,
          description: service.description,
          basePrice: service.basePrice,
          category: service.category
        }
      });

      await prisma.stateLocation.upsert({
        where: { code: stateCode || 'NSW' },
        update: {},
        create: {
          code: stateCode || 'NSW',
          name: 'New South Wales' // Defaulting for the demo
        }
      });

      const booking = await prisma.booking.create({
        data: {
          facilityName: facilityName || 'Unknown Facility',
          sqft: sqft || 0,
          date: new Date(date || Date.now()),
          status: 'SCHEDULED',
          service: { connect: { slug: service.slug } },
          state: { connect: { code: stateCode || 'NSW' } },
          enterpriseClientId: enterpriseClientId || null,
          mythosData: mythosData
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Sanitization scheduled via National NAVYA MYTHOS Network.',
        bookingId: booking.id,
        mythosData: mythosData
      });
    }

    if (action === 'get_flashcards') {
      const flashcards = await prisma.flashcard.findMany({
        orderBy: { order: 'asc' }
      });
      return NextResponse.json({ flashcards });
    }

    if (action === 'save_flashcard') {
      const { id, title, content, icon, category, isActive, order } = payload;
      const flashcard = await prisma.flashcard.upsert({
        where: { id: id || 'new' },
        update: { title, content, icon, category, isActive, order },
        create: { title, content, icon, category, isActive, order }
      });
      return NextResponse.json({ success: true, flashcard });
    }

    if (action === 'update_config') {
      const { key, value } = payload;
      const config = await prisma.siteConfig.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
      return NextResponse.json({ success: true, config });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('[Prisma API Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        service: true,
        state: true
      }
    });
    
    // Transform to maintain compatibility with legacy front-end expectations if needed
    const formattedBookings = bookings.map(b => ({
      id: b.id,
      facilityName: b.facilityName,
      sqft: b.sqft,
      date: b.date.toISOString().split('T')[0],
      status: b.status,
      serviceName: b.service.name,
      stateCode: b.state.code
    }));

    return NextResponse.json({ bookings: formattedBookings });
  } catch (error) {
    console.error('[Prisma API Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
