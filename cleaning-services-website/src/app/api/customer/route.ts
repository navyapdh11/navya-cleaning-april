import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/customer - get bookings and profile info
export async function GET(request: Request) {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { service: true, state: true }
    });

    // Calculate stats
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'SCHEDULED' || b.status === 'PENDING').length;
    const completedBookings = bookings.filter(b => b.status === 'COMPLETED' || b.status === 'completed').length;
    const totalSqft = bookings.reduce((sum, b) => sum + (b.sqft || 0), 0);

    return NextResponse.json({
      bookings: bookings.map(b => ({
        id: b.id,
        facilityName: b.facilityName,
        sqft: b.sqft,
        date: b.date.toISOString().split('T')[0],
        status: b.status,
        serviceName: b.service?.name || 'Unknown',
        stateCode: b.state?.code || 'Unknown',
        createdAt: b.createdAt
      })),
      stats: {
        totalBookings,
        pendingBookings,
        completedBookings,
        totalSqft,
        complianceScore: 'A+',
        activeNodes: bookings.filter(b => b.status !== 'COMPLETED' && b.status !== 'completed').length
      }
    });
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/customer - submit a new booking/dispatch
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { facilityName, sqft, date, serviceSlug, stateCode } = body;

    // Upsert service
    const service = await prisma.service.upsert({
      where: { slug: serviceSlug || 'general-domestic-cleaning' },
      update: {},
      create: {
        slug: serviceSlug || 'general-domestic-cleaning',
        name: body.serviceName || 'Custom Service',
        description: body.description || '',
        basePrice: body.basePrice || 0,
        category: body.category || 'Residential'
      }
    });

    // Upsert state
    await prisma.stateLocation.upsert({
      where: { code: stateCode || 'NSW' },
      update: {},
      create: { code: stateCode || 'NSW', name: body.stateName || 'New South Wales' }
    });

    const booking = await prisma.booking.create({
      data: {
        facilityName: facilityName || 'Unknown Facility',
        sqft: sqft || 0,
        date: new Date(date || Date.now()),
        status: 'SCHEDULED',
        service: { connect: { slug: service.slug } },
        state: { connect: { code: stateCode || 'NSW' } },
        mythosData: '{}'
      }
    });

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
