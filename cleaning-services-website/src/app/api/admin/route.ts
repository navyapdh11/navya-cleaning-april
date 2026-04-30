import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'node:crypto';

// Helper: extract session token from Authorization header or cookie
function getSessionToken(req: Request): string | null {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(/admin_session=([^;]+)/);
  return match?.[1] || null;
}

async function checkAdmin(req: Request) {
  const token = getSessionToken(req);
  if (!token) return null;
  try {
    const user = await prisma.adminUser.findFirst({ where: { isActive: true } });
    if (!user) return null;
    const tokenHash = createHash('sha256').update(token).digest('hex');
    if (user.passwordHash === tokenHash) return user;
    return null;
  } catch { return null; }
}

// POST /api/admin/login
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.adminUser.findFirst({ where: { email, isActive: true } });
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      const sessionToken = randomBytes(32).toString('hex');
      const sessionHash = createHash('sha256').update(sessionToken).digest('hex');
      await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash: sessionHash } });
      return NextResponse.json(
        { success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } },
        { headers: { 'Set-Cookie': `admin_session=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400` } }
      );
    }
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/admin/stats
export async function GET(request: Request) {
  const admin = await checkAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [bookingCount, serviceCount, flashcardCount, adCount, testimonialCount, userCount, recentBookings] = await Promise.all([
      prisma.booking.count(),
      prisma.service.count(),
      prisma.flashcard.count(),
      prisma.adCampaign.count({ where: { isActive: true } }),
      prisma.testimonial.count({ where: { isActive: true } }),
      prisma.adminUser.count(),
      prisma.booking.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { service: true, state: true } })
    ]);
    return NextResponse.json({
      stats: { bookingCount, serviceCount, flashcardCount, activeAds: adCount, activeTestimonials: testimonialCount, userCount },
      recentBookings: recentBookings.map(b => ({
        id: b.id, facilityName: b.facilityName, sqft: b.sqft, date: b.date.toISOString().split('T')[0],
        status: b.status, serviceName: b.service.name, stateCode: b.state.code
      }))
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// CRUD operations for all admin resources
const handlers: Record<string, (request: Request, admin: any) => Promise<NextResponse>> = {
  async services_GET(_req, admin) {
    const services = await prisma.service.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json({ services });
  },
  async services_POST(req, admin) {
    const body = await req.json();
    const service = await prisma.service.create({ data: body });
    return NextResponse.json({ success: true, service });
  },
  async services_PATCH(req, admin) {
    const { id, ...data } = await req.json();
    const service = await prisma.service.update({ where: { id }, data });
    return NextResponse.json({ success: true, service });
  },
  async services_DELETE(req, admin) {
    const { id } = await req.json();
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  },
  async bookings_GET(_req, admin) {
    const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' }, take: 100, include: { service: true, state: true } });
    return NextResponse.json({ bookings: bookings.map(b => ({ ...b, date: b.date.toISOString().split('T')[0] })) });
  },
  async flashcards_GET(_req, admin) {
    const flashcards = await prisma.flashcard.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json({ flashcards });
  },
  async flashcards_POST(req, admin) {
    const body = await req.json();
    const flashcard = await prisma.flashcard.create({ data: body });
    return NextResponse.json({ success: true, flashcard });
  },
  async flashcards_DELETE(req, admin) {
    const { id } = await req.json();
    await prisma.flashcard.delete({ where: { id } });
    return NextResponse.json({ success: true });
  },
  async media_GET(_req, admin) {
    const media = await prisma.media.findMany({ orderBy: { uploadedAt: 'desc' } });
    return NextResponse.json({ media });
  },
  async media_POST(req, admin) {
    const body = await req.json();
    const media = await prisma.media.create({ data: body });
    return NextResponse.json({ success: true, media });
  },
  async media_DELETE(req, admin) {
    const { id } = await req.json();
    await prisma.media.delete({ where: { id } });
    return NextResponse.json({ success: true });
  },
  async ads_GET(_req, admin) {
    const ads = await prisma.adCampaign.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ ads });
  },
  async ads_POST(req, admin) {
    const body = await req.json();
    const ad = await prisma.adCampaign.create({ data: body });
    return NextResponse.json({ success: true, ad });
  },
  async ads_DELETE(req, admin) {
    const { id } = await req.json();
    await prisma.adCampaign.delete({ where: { id } });
    return NextResponse.json({ success: true });
  },
  async testimonials_GET(_req, admin) {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json({ testimonials });
  },
  async testimonials_POST(req, admin) {
    const body = await req.json();
    const testimonial = await prisma.testimonial.create({ data: body });
    return NextResponse.json({ success: true, testimonial });
  },
  async testimonials_DELETE(req, admin) {
    const { id } = await req.json();
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  },
  async users_GET(_req, admin) {
    const users = await prisma.adminUser.findMany({ orderBy: { createdAt: 'asc' } });
    return NextResponse.json({ users: users.map(u => ({ ...u, passwordHash: undefined })) });
  },
  async users_POST(req, admin) {
    const body = await req.json();
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.adminUser.create({ data: { ...body, passwordHash: hashedPassword } });
    return NextResponse.json({ success: true, user: { ...user, passwordHash: undefined } });
  },
  async users_DELETE(req, admin) {
    const { id } = await req.json();
    await prisma.adminUser.delete({ where: { id } });
    return NextResponse.json({ success: true });
  },
  async pagecontent_GET(_req, admin) {
    const pageContent = await prisma.pageContent.findMany({ orderBy: { page: 'asc' } });
    return NextResponse.json({ pageContent });
  },
  async pagecontent_POST(req, admin) {
    const body = await req.json();
    const pageContent = await prisma.pageContent.upsert({
      where: { page_section_key_locale: { page: body.page, section: body.section, key: body.key, locale: body.locale || 'en' } },
      update: { value: body.value },
      create: body
    });
    return NextResponse.json({ success: true, pageContent });
  },
  async pagecontent_DELETE(req, admin) {
    const { id } = await req.json();
    await prisma.pageContent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  },
  async analytics_GET(_req, admin) {
    const analyticsConfig = await prisma.analyticsConfig.findMany();
    return NextResponse.json({ analyticsConfig });
  },
  async analytics_POST(req, admin) {
    const { key, value } = await req.json();
    const config = await prisma.analyticsConfig.upsert({
      where: { key }, update: { value }, create: { key, value }
    });
    return NextResponse.json({ success: true, analyticsConfig: config });
  },
  async config_GET(_req, admin) {
    const configs = await prisma.siteConfig.findMany();
    const result: Record<string, any> = {};
    configs.forEach(c => { result[c.key] = c.value; });
    return NextResponse.json({ config: result });
  },
  async config_POST(req, admin) {
    const entries = await req.json();
    const results = await Promise.all(
      Object.entries(entries).map(([key, value]) =>
        prisma.siteConfig.upsert({ where: { key }, update: { value: value as any }, create: { key, value: value as any } })
      )
    );
    return NextResponse.json({ success: true });
  },
};

// DELETE handler fallback
export async function DELETE(request: Request) {
  const admin = await checkAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const resource = url.searchParams.get('resource');
  if (!resource) return NextResponse.json({ error: 'Missing resource' }, { status: 400 });

  const handler = handlers[`${resource}_DELETE`];
  if (!handler) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });

  return handler(request, admin);
}

// PATCH handler
export async function PATCH(request: Request) {
  const admin = await checkAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const resource = url.searchParams.get('resource');
  if (!resource) return NextResponse.json({ error: 'Missing resource' }, { status: 400 });

  const handler = handlers[`${resource}_PATCH`];
  if (handler) return handler(request, admin);

  // Fallback: treat PATCH as POST for resources without explicit PATCH
  const postHandler = handlers[`${resource}_POST`];
  if (postHandler) return postHandler(request, admin);

  return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });
}

// GET handler for specific resources
const getHandlers: Record<string, (request: Request, admin: any) => Promise<NextResponse>> = {
  services: handlers.services_GET,
  bookings: handlers.bookings_GET,
  flashcards: handlers.flashcards_GET,
  media: handlers.media_GET,
  ads: handlers.ads_GET,
  testimonials: handlers.testimonials_GET,
  users: handlers.users_GET,
  pagecontent: handlers.pagecontent_GET,
  analytics: handlers.analytics_GET,
  config: handlers.config_GET,
};

// Override GET to check auth for non-public resources
const publicGetResources = new Set(['services', 'flashcards', 'testimonials']);

