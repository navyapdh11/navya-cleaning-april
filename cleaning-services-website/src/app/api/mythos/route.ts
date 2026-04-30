import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SERVICES, STATES } from '@/lib/data';
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

// Auth check: verify session token against admin user
async function checkAdmin(req: Request) {
  const token = getSessionToken(req);
  if (!token) return null;
  try {
    const user = await prisma.adminUser.findFirst({ where: { isActive: true } });
    if (!user) return null;
    // Token is SHA256(session_key), compare against stored sessionKey
    const tokenHash = createHash('sha256').update(token).digest('hex');
    if (user.passwordHash === tokenHash) return user;
    return null;
  } catch { return null; }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    // ─── Booking / Scheduling ───
    if (action === 'schedule') {
      const { facilityName, sqft, date, serviceSlug, stateCode, enterpriseClientId } = payload;
      const service = SERVICES.find(s => s.slug === serviceSlug) || SERVICES[0];

      const mythosData = {
        totalParameters: '1.9B (nanochat-optimal)',
        attnType: 'FlashAttention-3',
        rope: 'Rotary-Positional-Embeddings',
        optimizer: 'Muon',
        alignment: 'GRPO',
        verification: 'Mandatory',
        optimizationEngine: 'Active-Learning'
      };

      await prisma.service.upsert({
        where: { slug: service.slug },
        update: {},
        create: {
          slug: service.slug, name: service.name, description: service.description,
          basePrice: service.basePrice, category: service.category
        }
      });

      await prisma.stateLocation.upsert({
        where: { code: stateCode || 'NSW' },
        update: {},
        create: { code: stateCode || 'NSW', name: 'New South Wales' }
      });

      const booking = await prisma.booking.create({
        data: {
          facilityName: facilityName || 'Unknown Facility', sqft: sqft || 0,
          date: new Date(date || Date.now()), status: 'SCHEDULED',
          service: { connect: { slug: service.slug } },
          state: { connect: { code: stateCode || 'NSW' } },
          enterpriseClientId: enterpriseClientId || null, mythosData: mythosData as any
        }
      });

      return NextResponse.json({
        success: true, message: 'Sanitization scheduled via National NAVYA MYTHOS Network.',
        bookingId: booking.id, mythosData
      });
    }

    // ─── Flashcards ───
    if (action === 'get_flashcards') {
      const flashcards = await prisma.flashcard.findMany({ orderBy: { order: 'asc' } });
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

    if (action === 'delete_flashcard') {
      await prisma.flashcard.delete({ where: { id: payload.id } });
      return NextResponse.json({ success: true });
    }

    // ─── Site Config ───
    if (action === 'update_config') {
      const { key, value } = payload;
      const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
      const config = await prisma.siteConfig.upsert({
        where: { key }, update: { value: jsonValue }, create: { key, value: jsonValue }
      });
      return NextResponse.json({ success: true, config });
    }

    if (action === 'get_config') {
      const configs = await prisma.siteConfig.findMany();
      const result: Record<string, any> = {};
      for (const c of configs) {
        try { result[c.key] = JSON.parse(c.value as string); } catch { result[c.key] = c.value; }
      }
      return NextResponse.json({ configs: result });
    }

    // ─── Service Price Management ───
    if (action === 'get_services') {
      const services = await prisma.service.findMany({ orderBy: { category: 'asc' } });
      return NextResponse.json({ services });
    }

    if (action === 'update_service') {
      const { id, slug, name, description, basePrice, category } = payload;
      const service = await prisma.service.update({
        where: { id }, data: { name, description, basePrice, category }
      });
      return NextResponse.json({ success: true, service });
    }

    if (action === 'create_service') {
      const service = await prisma.service.create({
        data: {
          slug: payload.slug, name: payload.name, description: payload.description || '',
          basePrice: payload.basePrice || 0, category: payload.category || 'Residential'
        }
      });
      return NextResponse.json({ success: true, service });
    }

    if (action === 'delete_service') {
      await prisma.service.delete({ where: { id: payload.id } });
      return NextResponse.json({ success: true });
    }

    // ─── Page Content ───
    if (action === 'get_page_content') {
      const { page } = payload;
      const contents = await prisma.pageContent.findMany({
        where: page ? { page } : {},
        orderBy: { updatedAt: 'desc' }
      });
      return NextResponse.json({ contents });
    }

    if (action === 'upsert_page_content') {
      const { page, section, key, value, locale = 'en' } = payload;
      const content = await prisma.pageContent.upsert({
        where: { page_section_key_locale: { page, section, key, locale } },
        update: { value },
        create: { page, section, key, value, locale }
      });
      return NextResponse.json({ success: true, content });
    }

    if (action === 'delete_page_content') {
      await prisma.pageContent.delete({ where: { id: payload.id } });
      return NextResponse.json({ success: true });
    }

    // ─── Media Library ───
    if (action === 'get_media') {
      const media = await prisma.media.findMany({ orderBy: { uploadedAt: 'desc' } });
      return NextResponse.json({ media });
    }

    if (action === 'add_media') {
      const media = await prisma.media.create({
        data: {
          url: payload.url, alt: payload.alt || '', type: payload.type || 'image',
          page: payload.page || '', size: payload.size || 0
        }
      });
      return NextResponse.json({ success: true, media });
    }

    if (action === 'update_media') {
      const media = await prisma.media.update({
        where: { id: payload.id },
        data: { url: payload.url, alt: payload.alt, type: payload.type, page: payload.page }
      });
      return NextResponse.json({ success: true, media });
    }

    if (action === 'delete_media') {
      await prisma.media.delete({ where: { id: payload.id } });
      return NextResponse.json({ success: true });
    }

    // ─── Ad Campaigns ───
    if (action === 'get_ads') {
      const campaigns = await prisma.adCampaign.findMany({ orderBy: { createdAt: 'desc' } });
      return NextResponse.json({ campaigns });
    }

    if (action === 'save_ad') {
      const { id, name, description, imageUrl, linkUrl, startDate, endDate, budget, isActive, targetPages } = payload;
      const tp = typeof targetPages === 'string' ? targetPages : JSON.stringify(targetPages || []);
      const ad = await prisma.adCampaign.upsert({
        where: { id: id || 'new' },
        update: { name, description, imageUrl, linkUrl, startDate: new Date(startDate), endDate: endDate ? new Date(endDate) : null, budget, isActive, targetPages: tp as any },
        create: { name, description, imageUrl, linkUrl, startDate: new Date(startDate), endDate: endDate ? new Date(endDate) : null, budget: budget || 0, isActive: isActive ?? true, targetPages: tp as any }
      });
      return NextResponse.json({ success: true, ad });
    }

    if (action === 'delete_ad') {
      await prisma.adCampaign.delete({ where: { id: payload.id } });
      return NextResponse.json({ success: true });
    }

    // ─── Analytics Config ───
    if (action === 'get_analytics_config') {
      const configs = await prisma.analyticsConfig.findMany();
      return NextResponse.json({ configs: Object.fromEntries(configs.map(c => [c.key, { value: c.value, isActive: c.isActive }])) });
    }

    if (action === 'update_analytics_config') {
      const { key, value, isActive } = payload;
      const config = await prisma.analyticsConfig.upsert({
        where: { key },
        update: { value, isActive },
        create: { key, value, isActive: isActive ?? true }
      });
      return NextResponse.json({ success: true, config });
    }

    // ─── Testimonials ───
    if (action === 'get_testimonials') {
      const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
      return NextResponse.json({ testimonials });
    }

    if (action === 'save_testimonial') {
      const { id, name, role, company, rating, content, imageUrl, isFeatured, isActive, order } = payload;
      const testimonial = await prisma.testimonial.upsert({
        where: { id: id || 'new' },
        update: { name, role, company, rating, content, imageUrl, isFeatured, isActive, order },
        create: { name, role, company, rating, content, imageUrl, isFeatured: isFeatured ?? false, isActive: isActive ?? true, order: order || 0 }
      });
      return NextResponse.json({ success: true, testimonial });
    }

    if (action === 'delete_testimonial') {
      await prisma.testimonial.delete({ where: { id: payload.id } });
      return NextResponse.json({ success: true });
    }

    // ─── Admin Users ───
    if (action === 'get_users') {
      const users = await prisma.adminUser.findMany({ orderBy: { createdAt: 'asc' } });
      return NextResponse.json({ users: users.map(u => ({ ...u, passwordHash: undefined })) });
    }

    if (action === 'save_user') {
      const { id, email, name, passwordHash, role, isActive } = payload;
      const data: any = { email, name, role, isActive };
      if (passwordHash) data.passwordHash = passwordHash;
      const user = await prisma.adminUser.upsert({
        where: { id: id || 'new' },
        update: data,
        create: data
      });
      return NextResponse.json({ success: true, user: { ...user, passwordHash: undefined } });
    }

    if (action === 'delete_user') {
      await prisma.adminUser.delete({ where: { id: payload.id } });
      return NextResponse.json({ success: true });
    }

    // ─── Admin Login (no auth check needed) ───
    if (action === 'admin_login') {
      const { email, password } = payload;
      const user = await prisma.adminUser.findFirst({ where: { email, isActive: true } });
      if (user && await bcrypt.compare(password, user.passwordHash)) {
        const sessionToken = randomBytes(32).toString('hex');
        const sessionHash = createHash('sha256').update(sessionToken).digest('hex');
        // Store session hash in passwordHash field (repurposed for session storage)
        await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash: sessionHash } });
        return NextResponse.json({
          success: true,
          user: { id: user.id, email: user.email, name: user.name, role: user.role },
          token: sessionToken
        });
      }
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // ─── Dashboard Stats ───
    if (action === 'get_dashboard_stats') {
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
          status: b.status, serviceName: b.service.name, stateCode: b.state.code, createdAt: b.createdAt
        }))
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('[Prisma API Error]:', error);
    // Fallback: return success with empty data for read actions, error for writes
    const { action } = (await (request.clone().json().catch(() => ({})))) as { action?: string };
    if (action?.startsWith('get_') || action === 'admin_login') {
      return NextResponse.json({ [action.replace('get_', '')]: [] }, { status: 200 });
    }
    return NextResponse.json({ error: 'Database unavailable', success: false }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const resource = url.searchParams.get('resource');
  try {

    if (resource === 'bookings') {
      const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' }, take: 50,
        include: { service: true, state: true }
      });
      const formatted = bookings.map(b => ({
        id: b.id, facilityName: b.facilityName, sqft: b.sqft,
        date: b.date.toISOString().split('T')[0], status: b.status,
        serviceName: b.service.name, stateCode: b.state.code
      }));
      return NextResponse.json({ bookings: formatted });
    }

    if (resource === 'services') {
      const services = await prisma.service.findMany({ orderBy: { category: 'asc' } });
      return NextResponse.json({ services });
    }

    if (resource === 'flashcards') {
      const flashcards = await prisma.flashcard.findMany({ orderBy: { order: 'asc' } });
      return NextResponse.json({ flashcards });
    }

    if (resource === 'page_content') {
      const page = url.searchParams.get('page');
      const contents = await prisma.pageContent.findMany({
        where: page ? { page } : {}, orderBy: { updatedAt: 'desc' }
      });
      return NextResponse.json({ contents });
    }

    if (resource === 'media') {
      const media = await prisma.media.findMany({ orderBy: { uploadedAt: 'desc' } });
      return NextResponse.json({ media });
    }

    if (resource === 'ads') {
      const campaigns = await prisma.adCampaign.findMany({ orderBy: { createdAt: 'desc' } });
      return NextResponse.json({ campaigns });
    }

    if (resource === 'testimonials') {
      const testimonials = await prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
      return NextResponse.json({ testimonials });
    }

    // Default: return bookings for backward compatibility
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }, take: 10,
      include: { service: true, state: true }
    });
    const formatted = bookings.map(b => ({
      id: b.id, facilityName: b.facilityName, sqft: b.sqft,
      date: b.date.toISOString().split('T')[0], status: b.status,
      serviceName: b.service.name, stateCode: b.state.code
    }));
    return NextResponse.json({ bookings: formatted });
  } catch (error) {
    console.error('[Prisma API Error]:', error);
    // Fallback to lib/data.ts when DB is unavailable (e.g., Vercel serverless without persistent DB)
    if (resource === 'services') {
      return NextResponse.json({ services: SERVICES.map(s => ({ id: s.slug, slug: s.slug, name: s.name, description: s.description, basePrice: s.basePrice, category: s.category })) });
    }
    if (resource === 'testimonials') {
      return NextResponse.json({ testimonials: [] });
    }
    if (resource === 'ads') {
      return NextResponse.json({ campaigns: [] });
    }
    if (resource === 'flashcards') {
      return NextResponse.json({ flashcards: [] });
    }
    if (resource === 'media') {
      return NextResponse.json({ media: [] });
    }
    if (resource === 'page_content') {
      return NextResponse.json({ contents: [] });
    }
    return NextResponse.json({ bookings: [] });
  }
}
