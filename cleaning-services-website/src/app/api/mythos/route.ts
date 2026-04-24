import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    if (action === 'schedule') {
      const { facilityName, sqft, date } = payload;
      
      const stmt = db.prepare('INSERT INTO bookings (facilityName, sqft, date, status) VALUES (?, ?, ?, ?)');
      const info = stmt.run(facilityName || 'Unknown Facility', sqft || 0, date || new Date().toISOString(), 'Scheduled');

      return NextResponse.json({
        success: true,
        message: 'Sanitization scheduled successfully.',
        bookingId: info.lastInsertRowid,
        mythosData: {
          totalParameters: '1,048,576',
          attnType: 'MLA',
          generatedTokens: [45, 12, 89, 442, 11],
          estimatedTime: '2 hours',
          optimizationEngine: 'Active'
        }
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('[API Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 10');
    const bookings = stmt.all();
    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
