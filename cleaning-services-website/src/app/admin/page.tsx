'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard, DollarSign, FileText, Image as ImageIcon, Megaphone, BarChart3,
  Sparkles, ShoppingCart, Users, Settings, Lock, LogOut, Plus, Save,
  Trash2, Eye, Edit3, ChevronRight, Search, Moon, Sun, Menu, X,
  Shield, Zap, Clock, Activity, Star, Upload, RefreshCw, Check, AlertTriangle
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Service { id: string; slug: string; name: string; description: string; basePrice: number; category: string; }
interface Flashcard { id: string; title: string; content: string; icon: string; category: string; isActive: boolean; order: number; }
interface PageContent { id: string; page: string; section: string; key: string; value: string; locale: string; }
interface Media { id: string; url: string; alt: string; type: string; page: string; size: number; uploadedAt: string; }
interface AdCampaign { id: string; name: string; description: string; imageUrl: string; linkUrl: string; startDate: string; endDate: string | null; budget: number; spent: number; impressions: number; clicks: number; isActive: boolean; targetPages: string; createdAt: string; }
interface Testimonial { id: string; name: string; role: string; company: string; rating: number; content: string; imageUrl: string; isFeatured: boolean; isActive: boolean; order: number; }
interface AdminUser { id: string; email: string; name: string; role: string; isActive: boolean; createdAt: string; }
interface Booking { id: string; facilityName: string; sqft: number; date: string; status: string; serviceName: string; stateCode: string; }
interface DashboardStats { bookingCount: number; serviceCount: number; flashcardCount: number; activeAds: number; activeTestimonials: number; userCount: number; }

const API = '/api/mythos';
const call = async (action: string, payload: any = {}) => {
  const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, payload }) });
  return res.json();
};

// ─── Glass Style ─────────────────────────────────────────────────────────────
const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
  padding: '1.5rem',
  ...extra,
});

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.8rem 1rem', borderRadius: '10px',
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  color: 'white', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
};

const btnStyle = (variant: 'primary' | 'danger' | 'ghost' = 'primary'): React.CSSProperties => ({
  padding: '0.7rem 1.4rem', borderRadius: '10px', fontWeight: 600, fontSize: '0.85rem',
  border: variant === 'ghost' ? '1px solid rgba(255,255,255,0.1)' : 'none',
  background: variant === 'primary' ? 'linear-gradient(135deg, #00d4ff, #7b2ff7)' : variant === 'danger' ? '#ff4757' : 'transparent',
  color: 'white', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
  transition: 'all 0.2s',
});

// ─── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (user: any, token: string) => void }) {
  const [email, setEmail] = useState('admin@navya.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await call('admin_login', { email, password });
    if (data.success) { onLogin(data.user, data.token); document.cookie = `admin_session=${data.token}; path=/; max-age=86400`; }
    else setError(data.message || 'Login failed');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleLogin} style={{ ...glass({ maxWidth: 400, width: '100%', padding: '3rem' }), textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MYTHOS</div>
        <p style={{ opacity: 0.5, marginBottom: '2rem', fontSize: '0.85rem' }}>Admin Control Panel</p>
        {error && <div style={{ padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,71,87,0.15)', color: '#ff4757', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ ...inputStyle, marginBottom: '1rem' }} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ ...inputStyle, marginBottom: '1.5rem' }} onKeyDown={e => e.key === 'Enter' && handleLogin(e)} />
        <button type="submit" style={{ ...btnStyle(), width: '100%', justifyContent: 'center', padding: '1rem' }}>Sign In</button>
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', opacity: 0.3 }}>Secure admin login required</p>
      </form>
    </div>
  );
}

// ─── 3D Tilt Card Component ──────────────────────────────────────────────────
function TiltCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => setTransform('perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)');

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ ...glass(), transition: 'transform 0.15s ease-out', transform, ...style }}>
      {children}
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [pageContents, setPageContents] = useState<PageContent[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [ads, setAds] = useState<AdCampaign[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  // Edit states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = document.cookie.match(/admin_session=([^;]+)/)?.[1];
    if (token) { setUser({ name: 'Admin', role: 'admin' }); loadDashboardStats(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDashboardStats = useCallback(async () => {
    const data = await call('get_dashboard_stats');
    if (data.stats) { setStats(data.stats); setRecentBookings(data.recentBookings || []); }
  }, []);

  const loadServices = useCallback(async () => { const data = await call('get_services'); if (data.services) setServices(data.services); }, []);
  const loadFlashcards = useCallback(async () => { const data = await call('get_flashcards'); if (data.flashcards) setFlashcards(data.flashcards); }, []);
  const loadPageContent = useCallback(async () => { const data = await call('get_page_content', {}); if (data.contents) setPageContents(data.contents); }, []);
  const loadMedia = useCallback(async () => { const data = await call('get_media'); if (data.media) setMedia(data.media); }, []);
  const loadAds = useCallback(async () => { const data = await call('get_ads'); if (data.campaigns) setAds(data.campaigns); }, []);
  const loadTestimonials = useCallback(async () => { const data = await call('get_testimonials'); if (data.testimonials) setTestimonials(data.testimonials); }, []);
  const loadUsers = useCallback(async () => { const data = await call('get_users'); if (data.users) setAdminUsers(data.users); }, []);

  const navigate = (section: string) => {
    setActiveSection(section);
    setEditingItem(null);
    // Lazy load data per section
    if (section === 'services') loadServices();
    if (section === 'flashcards') loadFlashcards();
    if (section === 'pages') loadPageContent();
    if (section === 'media') loadMedia();
    if (section === 'ads') loadAds();
    if (section === 'testimonials') loadTestimonials();
    if (section === 'users') loadUsers();
  };

  const handleLogout = () => { document.cookie = 'admin_session=; path=/; max-age=0'; setUser(null); };

  if (!user) return <LoginScreen onLogin={(u, t) => setUser(u)} />;

  // ─── Sidebar Nav Items ─────────────────────────────────────────────────────
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'services', label: 'Services & Prices', icon: <DollarSign size={18} /> },
    { id: 'pages', label: 'Page Content', icon: <FileText size={18} /> },
    { id: 'media', label: 'Media Library', icon: <ImageIcon size={18} /> },
    { id: 'ads', label: 'Ad Campaigns', icon: <Megaphone size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
    { id: 'flashcards', label: 'Flashcards', icon: <Sparkles size={18} /> },
    { id: 'bookings', label: 'Bookings', icon: <ShoppingCart size={18} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Star size={18} /> },
    { id: 'users', label: 'Team Access', icon: <Users size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  const sectionTitle = (title: string, subtitle: string) => (
    <div style={{ marginBottom: '2rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>{title}</h1>
      <p style={{ opacity: 0.5, margin: '0.3rem 0 0', fontSize: '0.85rem' }}>{subtitle}</p>
    </div>
  );

  // ─── Section: Overview ─────────────────────────────────────────────────────
  const OverviewSection = () => (
    <div>
      {sectionTitle('Dashboard Overview', 'National operations at a glance')}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <TiltCard>
          <div style={{ opacity: 0.5, fontSize: '0.7rem', fontWeight: 600 }}>TOTAL BOOKINGS</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#00d4ff' }}>{stats?.bookingCount || 0}</div>
        </TiltCard>
        <TiltCard>
          <div style={{ opacity: 0.5, fontSize: '0.7rem', fontWeight: 600 }}>SERVICES</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#7b2ff7' }}>{stats?.serviceCount || 0}</div>
        </TiltCard>
        <TiltCard>
          <div style={{ opacity: 0.5, fontSize: '0.7rem', fontWeight: 600 }}>FLASHCARDS</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ff6b6b' }}>{stats?.flashcardCount || 0}</div>
        </TiltCard>
        <TiltCard>
          <div style={{ opacity: 0.5, fontSize: '0.7rem', fontWeight: 600 }}>ACTIVE ADS</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffd93d' }}>{stats?.activeAds || 0}</div>
        </TiltCard>
        <TiltCard>
          <div style={{ opacity: 0.5, fontSize: '0.7rem', fontWeight: 600 }}>TESTIMONIALS</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#6bcb77' }}>{stats?.activeTestimonials || 0}</div>
        </TiltCard>
        <TiltCard>
          <div style={{ opacity: 0.5, fontSize: '0.7rem', fontWeight: 600 }}>TEAM</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#4d96ff' }}>{stats?.userCount || 0}</div>
        </TiltCard>
      </div>

      <div style={{ ...glass(), padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 700, fontSize: '0.9rem' }}>Recent Bookings</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ opacity: 0.5, fontSize: '0.7rem' }}>
              <th style={{ padding: '0.8rem 1.5rem', textAlign: 'left', fontWeight: 600 }}>FACILITY</th>
              <th style={{ padding: '0.8rem 1.5rem', textAlign: 'left', fontWeight: 600 }}>SERVICE</th>
              <th style={{ padding: '0.8rem 1.5rem', textAlign: 'left', fontWeight: 600 }}>REGION</th>
              <th style={{ padding: '0.8rem 1.5rem', textAlign: 'left', fontWeight: 600 }}>DATE</th>
              <th style={{ padding: '0.8rem 1.5rem', textAlign: 'left', fontWeight: 600 }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '2rem 1.5rem', opacity: 0.3, textAlign: 'center' }}>No bookings yet</td></tr>
            ) : recentBookings.map(b => (
              <tr key={b.id} style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{b.facilityName}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{b.serviceName}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{b.stateCode}</td>
                <td style={{ padding: '1rem 1.5rem', opacity: 0.5 }}>{b.date}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 600, background: b.status === 'SCHEDULED' ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)', color: b.status === 'SCHEDULED' ? '#00d4ff' : 'white' }}>{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ─── Section: Services & Prices ────────────────────────────────────────────
  const ServicesSection = () => {
    const [formData, setFormData] = useState({ id: '', slug: '', name: '', description: '', basePrice: 0, category: 'Residential' });

    const handleSave = async () => {
      setLoading(true);
      const action = formData.id ? 'update_service' : 'create_service';
      await call(action, formData);
      setEditingItem(null); setFormData({ id: '', slug: '', name: '', description: '', basePrice: 0, category: 'Residential' });
      loadServices(); setLoading(false);
    };

    const handleDelete = async (id: string) => { if (confirm('Delete this service?')) { await call('delete_service', { id }); loadServices(); } };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {sectionTitle('Services & Pricing', 'Manage service catalog and pricing')}
          <button onClick={() => { setEditingItem({}); setFormData({ id: '', slug: '', name: '', description: '', basePrice: 0, category: 'Residential' }); }} style={btnStyle()}><Plus size={16} /> Add Service</button>
        </div>

        {editingItem && (
          <div style={{ ...glass(), marginBottom: '2rem', border: '1px solid rgba(0,212,255,0.3)' }}>
            <h3 style={{ margin: '0 0 1.5rem', fontSize: '1rem' }}>{formData.id ? 'Edit Service' : 'New Service'}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Service name" style={inputStyle} />
              <input value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder="slug (auto-generated)" style={inputStyle} />
              <input type="number" value={formData.basePrice} onChange={e => setFormData({ ...formData, basePrice: parseFloat(e.target.value) || 0 })} placeholder="Base price ($)" style={inputStyle} />
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={inputStyle}>
                <option value="Residential">Residential</option><option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Description" style={{ ...inputStyle, marginTop: '1rem', minHeight: 60 }} />
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
              <button onClick={handleSave} disabled={loading} style={btnStyle()}>{loading ? 'Saving...' : <><Save size={14} /> Save</>}</button>
              <button onClick={() => { setEditingItem(null); setFormData({ id: '', slug: '', name: '', description: '', basePrice: 0, category: 'Residential' }); }} style={btnStyle('ghost')}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '1rem' }}>
          {services.map(s => (
            <div key={s.id} style={{ ...glass(), display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 1.5rem' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{s.name}</div>
                <div style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: '0.2rem' }}>{s.category} • {s.slug}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#00d4ff' }}>${s.basePrice}</div>
                <button onClick={() => { setEditingItem(s); setFormData(s); }} style={{ ...btnStyle('ghost'), padding: '0.5rem' }}><Edit3 size={14} /></button>
                <button onClick={() => handleDelete(s.id)} style={{ ...btnStyle('danger'), padding: '0.5rem' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Section: Page Content ─────────────────────────────────────────────────
  const PagesSection = () => {
    const [filter, setFilter] = useState('all');
    const [formData, setFormData] = useState({ id: '', page: 'home', section: 'hero', key: 'title', value: '', locale: 'en' });
    const pages = ['home', 'services', 'pricing', 'booking', 'compliance', 'enterprise', 'contact'];

    const handleSave = async () => {
      setLoading(true);
      await call('upsert_page_content', formData);
      setEditingItem(null); setFormData({ id: '', page: 'home', section: 'hero', key: 'title', value: '', locale: 'en' });
      loadPageContent(); setLoading(false);
    };

    const filtered = filter === 'all' ? pageContents : pageContents.filter(c => c.page === filter);

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {sectionTitle('Page Content', 'Edit text and information across all pages')}
          <button onClick={() => { setEditingItem({}); setFormData({ id: '', page: 'home', section: 'hero', key: 'title', value: '', locale: 'en' }); }} style={btnStyle()}><Plus size={16} /> Add Content</button>
        </div>

        {/* Page filter chips */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => setFilter('all')} style={{ ...btnStyle(filter === 'all' ? 'primary' : 'ghost'), padding: '0.5rem 1rem', fontSize: '0.75rem' }}>All</button>
          {pages.map(p => <button key={p} onClick={() => setFilter(p)} style={{ ...btnStyle(filter === p ? 'primary' : 'ghost'), padding: '0.5rem 1rem', fontSize: '0.75rem', textTransform: 'capitalize' }}>{p}</button>)}
        </div>

        {editingItem && (
          <div style={{ ...glass(), marginBottom: '2rem', border: '1px solid rgba(0,212,255,0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
              <select value={formData.page} onChange={e => setFormData({ ...formData, page: e.target.value })} style={inputStyle}>
                {pages.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <input value={formData.section} onChange={e => setFormData({ ...formData, section: e.target.value })} placeholder="Section (hero, footer...)" style={inputStyle} />
              <input value={formData.key} onChange={e => setFormData({ ...formData, key: e.target.value })} placeholder="Key (title, text...)" style={inputStyle} />
              <select value={formData.locale} onChange={e => setFormData({ ...formData, locale: e.target.value })} style={inputStyle}><option value="en">English</option></select>
            </div>
            <textarea value={formData.value} onChange={e => setFormData({ ...formData, value: e.target.value })} placeholder="Content value" style={{ ...inputStyle, marginTop: '1rem', minHeight: 80 }} />
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
              <button onClick={handleSave} disabled={loading} style={btnStyle()}>{loading ? 'Saving...' : <><Save size={14} /> Save</>}</button>
              <button onClick={() => { setEditingItem(null); }} style={btnStyle('ghost')}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {filtered.length === 0 && <div style={{ ...glass(), textAlign: 'center', opacity: 0.3, padding: '3rem' }}>No content yet. Add your first page content above.</div>}
          {filtered.map(c => (
            <div key={c.id} style={{ ...glass(), display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.section}.{c.key}</div>
                <div style={{ opacity: 0.4, fontSize: '0.75rem', marginTop: '0.2rem' }}>{c.page} • {c.locale}</div>
              </div>
              <div style={{ maxWidth: 300, opacity: 0.6, fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.value.substring(0, 80)}</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { setEditingItem(c); setFormData(c); }} style={{ ...btnStyle('ghost'), padding: '0.4rem' }}><Edit3 size={13} /></button>
                <button onClick={async () => { await call('delete_page_content', { id: c.id }); loadPageContent(); }} style={{ ...btnStyle('danger'), padding: '0.4rem' }}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Section: Media Library ────────────────────────────────────────────────
  const MediaSection = () => {
    const [formData, setFormData] = useState({ id: '', url: '', alt: '', type: 'image', page: '' });

    const handleSave = async () => {
      setLoading(true);
      const action = formData.id ? 'update_media' : 'add_media';
      await call(action, formData);
      setEditingItem(null); setFormData({ id: '', url: '', alt: '', type: 'image', page: '' });
      loadMedia(); setLoading(false);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData({ ...formData, url: ev.target?.result as string, alt: file.name });
      };
      reader.readAsDataURL(file);
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {sectionTitle('Media Library', 'Manage images and assets across pages')}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <label style={{ ...btnStyle(), cursor: 'pointer' }}><Upload size={14} /> Upload<input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} /></label>
          </div>
        </div>

        {editingItem && (
          <div style={{ ...glass(), marginBottom: '2rem', border: '1px solid rgba(0,212,255,0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} placeholder="Image URL or data URI" style={inputStyle} />
              <input value={formData.alt} onChange={e => setFormData({ ...formData, alt: e.target.value })} placeholder="Alt text" style={inputStyle} />
              <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} style={inputStyle}><option value="image">Image</option><option value="video">Video</option><option value="icon">Icon</option><option value="logo">Logo</option></select>
              <input value={formData.page} onChange={e => setFormData({ ...formData, page: e.target.value })} placeholder="Page (home, services...)" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
              <button onClick={handleSave} disabled={loading} style={btnStyle()}>{loading ? 'Saving...' : <><Save size={14} /> Save</>}</button>
              <button onClick={() => setEditingItem(null)} style={btnStyle('ghost')}>Cancel</button>
            </div>
          </div>
        )}

        {formData.url && !editingItem && (
          <div style={{ ...glass(), marginBottom: '1rem' }}>
            <div className="relative" style={{ width: '100%', maxWidth: 400, height: 200, borderRadius: 12, overflow: 'hidden', marginBottom: '1rem' }}>
              <Image src={formData.url} alt={formData.alt} fill className="object-cover" />
            </div>
            <button onClick={handleSave} style={btnStyle()}><Save size={14} /> Save to Library</button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {media.length === 0 && <div style={{ ...glass(), textAlign: 'center', opacity: 0.3, padding: '3rem', gridColumn: '1 / -1' }}>No media yet. Upload images above.</div>}
          {media.map(m => (
            <div key={m.id} style={{ ...glass(), padding: '0.8rem' }}>
              <div className="relative" style={{ width: '100%', height: 140, borderRadius: 10, overflow: 'hidden', marginBottom: '0.5rem' }}>
                <Image src={m.url} alt={m.alt} fill className="object-cover" />
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.alt || 'Untitled'}</div>
              <div style={{ fontSize: '0.65rem', opacity: 0.4 }}>{m.type} • {m.page || 'Global'}</div>
              <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.5rem' }}>
                <button onClick={() => { setEditingItem(m); setFormData(m); }} style={{ ...btnStyle('ghost'), padding: '0.3rem 0.5rem', fontSize: '0.7rem', flex: 1 }}><Edit3 size={11} /></button>
                <button onClick={async () => { await call('delete_media', { id: m.id }); loadMedia(); }} style={{ ...btnStyle('danger'), padding: '0.3rem 0.5rem', fontSize: '0.7rem' }}><Trash2 size={11} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Section: Ad Campaigns ─────────────────────────────────────────────────
  const AdsSection = () => {
    const [formData, setFormData] = useState({ id: '', name: '', description: '', imageUrl: '', linkUrl: '', startDate: new Date().toISOString().split('T')[0], endDate: '', budget: 0, isActive: true, targetPages: '[]' });

    const handleSave = async () => {
      setLoading(true);
      await call('save_ad', formData);
      setEditingItem(null); setFormData({ id: '', name: '', description: '', imageUrl: '', linkUrl: '', startDate: new Date().toISOString().split('T')[0], endDate: '', budget: 0, isActive: true, targetPages: '[]' });
      loadAds(); setLoading(false);
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {sectionTitle('Ad Campaigns', 'Manage promotional campaigns and banners')}
          <button onClick={() => { setEditingItem({}); setFormData({ id: '', name: '', description: '', imageUrl: '', linkUrl: '', startDate: new Date().toISOString().split('T')[0], endDate: '', budget: 0, isActive: true, targetPages: '[]' }); }} style={btnStyle()}><Plus size={16} /> New Campaign</button>
        </div>

        {editingItem && (
          <div style={{ ...glass(), marginBottom: '2rem', border: '1px solid rgba(0,212,255,0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Campaign name" style={inputStyle} />
              <input value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="Banner image URL" style={inputStyle} />
              <input type="date" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} style={inputStyle} />
              <input type="date" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} placeholder="End date (optional)" style={inputStyle} />
              <input type="number" value={formData.budget} onChange={e => setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })} placeholder="Budget ($)" style={inputStyle} />
              <input value={formData.linkUrl} onChange={e => setFormData({ ...formData, linkUrl: e.target.value })} placeholder="Destination URL" style={inputStyle} />
            </div>
            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Description" style={{ ...inputStyle, marginTop: '1rem', minHeight: 60 }} />
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem', alignItems: 'center' }}>
              <button onClick={handleSave} disabled={loading} style={btnStyle()}>{loading ? 'Saving...' : <><Save size={14} /> Save</>}</button>
              <button onClick={() => setEditingItem(null)} style={btnStyle('ghost')}>Cancel</button>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', opacity: 0.7, cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} /> Active
              </label>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '1rem' }}>
          {ads.length === 0 && <div style={{ ...glass(), textAlign: 'center', opacity: 0.3, padding: '3rem' }}>No campaigns yet.</div>}
          {ads.map(a => (
            <div key={a.id} style={{ ...glass(), display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.2rem 1.5rem' }}>
              {a.imageUrl && (
                <div className="relative" style={{ width: 80, height: 60, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={a.imageUrl} alt={a.name} fill className="object-cover" />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{a.name}</div>
                <div style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: '0.2rem' }}>{a.description.substring(0, 80)}...</div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.7rem', opacity: 0.4 }}>
                  <span>Budget: ${a.budget}</span><span>Spent: ${a.spent}</span><span>Impressions: {a.impressions}</span><span>Clicks: {a.clicks}</span>
                </div>
              </div>
              <span style={{ padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 600, background: a.isActive ? 'rgba(107,203,119,0.15)' : 'rgba(255,255,255,0.05)', color: a.isActive ? '#6bcb77' : 'white' }}>{a.isActive ? 'Active' : 'Paused'}</span>
              <button onClick={() => { setEditingItem(a); setFormData({ ...a, endDate: a.endDate ? a.endDate.split('T')[0] : '' }); }} style={{ ...btnStyle('ghost'), padding: '0.5rem' }}><Edit3 size={14} /></button>
              <button onClick={async () => { await call('delete_ad', { id: a.id }); loadAds(); }} style={{ ...btnStyle('danger'), padding: '0.5rem' }}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Section: Analytics ────────────────────────────────────────────────────
  const AnalyticsSection = () => {
    const [gtmId, setGtmId] = useState('GTM-XXXXXXX');
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
      await call('update_analytics_config', { key: 'gtmId', value: gtmId, isActive: true });
      setSaved(true); setTimeout(() => setSaved(false), 2000);
    };

    return (
      <div>
        {sectionTitle('Analytics', 'Configure tracking and measurement')}
        <div style={{ display: 'grid', gap: '1.5rem', maxWidth: 600 }}>
          <TiltCard>
            <div style={{ opacity: 0.5, fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.5rem' }}>PAGE VIEWS (30d)</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00d4ff' }}>12,847</div>
            <div style={{ fontSize: '0.7rem', color: '#6bcb77', marginTop: '0.3rem' }}>↑ 23% from last month</div>
          </TiltCard>
          <TiltCard>
            <div style={{ opacity: 0.5, fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.5rem' }}>CONVERSION RATE</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#7b2ff7' }}>4.2%</div>
            <div style={{ fontSize: '0.7rem', color: '#6bcb77', marginTop: '0.3rem' }}>↑ 0.8% from last month</div>
          </TiltCard>
          <TiltCard>
            <div style={{ opacity: 0.5, fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.5rem' }}>AVG. SESSION DURATION</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffd93d' }}>3m 42s</div>
          </TiltCard>

          <div style={glass()}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Google Tag Manager</h3>
            <input value={gtmId} onChange={e => setGtmId(e.target.value)} placeholder="GTM-XXXXXXX" style={inputStyle} />
            <button onClick={handleSave} style={{ ...btnStyle(), marginTop: '1rem' }}>{saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Update</>}</button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Section: Flashcards ───────────────────────────────────────────────────
  const FlashcardsSection = () => {
    const [formData, setFormData] = useState({ id: '', title: '', content: '', icon: 'zap', category: 'Technology', isActive: true, order: 0 });

    const handleSave = async () => {
      setLoading(true);
      await call('save_flashcard', { ...formData, order: formData.id ? formData.order : flashcards.length });
      setEditingItem(null); setFormData({ id: '', title: '', content: '', icon: 'zap', category: 'Technology', isActive: true, order: 0 });
      loadFlashcards(); setLoading(false);
    };

    const iconMap: Record<string, React.ReactNode> = { zap: <Zap size={20} />, shield: <Shield size={20} />, clock: <Clock size={20} />, activity: <Activity size={20} /> };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {sectionTitle('Flashcards', 'Content nodes displayed on the homepage')}
          <button onClick={() => { setEditingItem({}); setFormData({ id: '', title: '', content: '', icon: 'zap', category: 'Technology', isActive: true, order: flashcards.length }); }} style={btnStyle()}><Plus size={16} /> New Flashcard</button>
        </div>

        {editingItem && (
          <div style={{ ...glass(), marginBottom: '2rem', border: '1px solid rgba(0,212,255,0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Title" style={inputStyle} />
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={inputStyle}>
                <option value="Technology">Technology</option><option value="Compliance">Compliance</option><option value="Efficiency">Efficiency</option>
              </select>
              <select value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} style={inputStyle}>
                {Object.keys(iconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} /> Active
              </label>
            </div>
            <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="Content" style={{ ...inputStyle, marginTop: '1rem', minHeight: 80 }} />
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
              <button onClick={handleSave} disabled={loading} style={btnStyle()}>{loading ? 'Saving...' : <><Save size={14} /> Save</>}</button>
              <button onClick={() => setEditingItem(null)} style={btnStyle('ghost')}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {flashcards.length === 0 && <div style={{ ...glass(), textAlign: 'center', opacity: 0.3, padding: '3rem', gridColumn: '1 / -1' }}>No flashcards yet.</div>}
          {flashcards.map(fc => (
            <TiltCard key={fc.id} style={{ minHeight: 180 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ ...glass({ padding: '0.6rem', borderRadius: '10px' }), background: 'rgba(0,212,255,0.1)', border: 'none' }}>{iconMap[fc.icon] || <Zap size={20} />}</div>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button onClick={() => { setEditingItem(fc); setFormData(fc); }} style={{ ...btnStyle('ghost'), padding: '0.3rem' }}><Edit3 size={12} /></button>
                  <button onClick={async () => { await call('delete_flashcard', { id: fc.id }); loadFlashcards(); }} style={{ ...btnStyle('danger'), padding: '0.3rem' }}><Trash2 size={12} /></button>
                </div>
              </div>
              <h3 style={{ margin: '1rem 0 0.5rem', fontSize: '1.1rem' }}>{fc.title}</h3>
              <p style={{ opacity: 0.6, fontSize: '0.85rem', lineHeight: 1.5 }}>{fc.content}</p>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase' }}>{fc.category}</span>
                <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '50px', background: fc.isActive ? 'rgba(107,203,119,0.15)' : 'rgba(255,255,255,0.05)', color: fc.isActive ? '#6bcb77' : 'white' }}>{fc.isActive ? 'Active' : 'Hidden'}</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    );
  };

  // ─── Section: Bookings ─────────────────────────────────────────────────────
  const BookingsSection = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    useEffect(() => { call('get_dashboard_stats').then(d => { if (d.recentBookings) setBookings(d.recentBookings); }); }, []);

    return (
      <div>
        {sectionTitle('Bookings', 'All service bookings and dispatches')}
        <div style={{ ...glass(), padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', opacity: 0.5, fontSize: '0.7rem' }}>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600 }}>FACILITY</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600 }}>SERVICE</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600 }}>REGION</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600 }}>SQFT</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600 }}>DATE</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600 }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '3rem', opacity: 0.3, textAlign: 'center' }}>No bookings found</td></tr>
              ) : bookings.map(b => (
                <tr key={b.id} style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{b.facilityName}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{b.serviceName}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{b.stateCode}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{b.sqft.toLocaleString()}</td>
                  <td style={{ padding: '1rem 1.5rem', opacity: 0.5 }}>{b.date}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(0,212,255,0.15)', color: '#00d4ff' }}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ─── Section: Testimonials ─────────────────────────────────────────────────
  const TestimonialsSection = () => {
    const [formData, setFormData] = useState({ id: '', name: '', role: 'customer', company: '', rating: 5, content: '', imageUrl: '', isFeatured: false, isActive: true, order: 0 });

    const handleSave = async () => {
      setLoading(true);
      await call('save_testimonial', { ...formData, order: formData.id ? formData.order : testimonials.length });
      setEditingItem(null); setFormData({ id: '', name: '', role: 'customer', company: '', rating: 5, content: '', imageUrl: '', isFeatured: false, isActive: true, order: 0 });
      loadTestimonials(); setLoading(false);
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {sectionTitle('Testimonials', 'Customer reviews and endorsements')}
          <button onClick={() => { setEditingItem({}); setFormData({ id: '', name: '', role: 'customer', company: '', rating: 5, content: '', imageUrl: '', isFeatured: false, isActive: true, order: testimonials.length }); }} style={btnStyle()}><Plus size={16} /> Add Review</button>
        </div>

        {editingItem && (
          <div style={{ ...glass(), marginBottom: '2rem', border: '1px solid rgba(0,212,255,0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Customer name" style={inputStyle} />
              <input value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="Company (optional)" style={inputStyle} />
              <input type="number" min={1} max={5} value={formData.rating} onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })} placeholder="Rating (1-5)" style={inputStyle} />
              <input value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="Photo URL (optional)" style={inputStyle} />
            </div>
            <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="Review content" style={{ ...inputStyle, marginTop: '1rem', minHeight: 80 }} />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} /> Active</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} /> Featured</label>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
              <button onClick={handleSave} disabled={loading} style={btnStyle()}>{loading ? 'Saving...' : <><Save size={14} /> Save</>}</button>
              <button onClick={() => setEditingItem(null)} style={btnStyle('ghost')}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '1rem' }}>
          {testimonials.length === 0 && <div style={{ ...glass(), textAlign: 'center', opacity: 0.3, padding: '3rem' }}>No testimonials yet.</div>}
          {testimonials.map(t => (
            <div key={t.id} style={{ ...glass(), display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.2rem 1.5rem' }}>
              {t.imageUrl && (
                <div className="relative" style={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={t.imageUrl} alt={t.name} fill className="object-cover" />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{t.name} {t.company && <span style={{ opacity: 0.5, fontWeight: 400 }}>— {t.company}</span>}</div>
                <div style={{ color: '#ffd93d', fontSize: '0.85rem' }}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                <div style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: '0.3rem' }}>{t.content.substring(0, 100)}...</div>
              </div>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                <button onClick={() => { setEditingItem(t); setFormData(t); }} style={{ ...btnStyle('ghost'), padding: '0.4rem' }}><Edit3 size={13} /></button>
                <button onClick={async () => { await call('delete_testimonial', { id: t.id }); loadTestimonials(); }} style={{ ...btnStyle('danger'), padding: '0.4rem' }}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Section: Users ────────────────────────────────────────────────────────
  const UsersSection = () => {
    const [formData, setFormData] = useState({ id: '', email: '', name: '', passwordHash: '', role: 'admin', isActive: true });

    const handleSave = async () => {
      setLoading(true);
      await call('save_user', formData);
      setEditingItem(null); setFormData({ id: '', email: '', name: '', passwordHash: '', role: 'admin', isActive: true });
      loadUsers(); setLoading(false);
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {sectionTitle('Team Access', 'Manage admin users and permissions')}
          <button onClick={() => { setEditingItem({}); setFormData({ id: '', email: '', name: '', passwordHash: '', role: 'admin', isActive: true }); }} style={btnStyle()}><Plus size={16} /> Add Member</button>
        </div>

        <div style={{ ...glass(), marginBottom: '1.5rem', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,193,7,0.08)', borderColor: 'rgba(255,193,7,0.2)' }}>
          <AlertTriangle size={16} color="#ffc107" />
          <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Passwords are stored in plaintext for this demo. Use bcrypt in production.</span>
        </div>

        {editingItem && (
          <div style={{ ...glass(), marginBottom: '2rem', border: '1px solid rgba(0,212,255,0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email" type="email" style={inputStyle} />
              <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Full name" style={inputStyle} />
              <input value={formData.passwordHash} onChange={e => setFormData({ ...formData, passwordHash: e.target.value })} placeholder="Password (leave blank to keep existing)" type="password" style={inputStyle} />
              <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} style={inputStyle}>
                <option value="admin">Admin</option><option value="editor">Editor</option><option value="viewer">Viewer</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem', alignItems: 'center' }}>
              <button onClick={handleSave} disabled={loading} style={btnStyle()}>{loading ? 'Saving...' : <><Save size={14} /> Save</>}</button>
              <button onClick={() => setEditingItem(null)} style={btnStyle('ghost')}>Cancel</button>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}><input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} /> Active</label>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {adminUsers.length === 0 && <div style={{ ...glass(), textAlign: 'center', opacity: 0.3, padding: '3rem' }}>No team members yet.</div>}
          {adminUsers.map(u => (
            <div key={u.id} style={{ ...glass(), display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{u.name}</div>
                <div style={{ opacity: 0.5, fontSize: '0.8rem' }}>{u.email}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(123,47,247,0.15)', color: '#7b2ff7', textTransform: 'capitalize' }}>{u.role}</span>
                <button onClick={() => { setEditingItem(u); setFormData({ ...u, passwordHash: '' }); }} style={{ ...btnStyle('ghost'), padding: '0.5rem' }}><Edit3 size={14} /></button>
                <button onClick={async () => { await call('delete_user', { id: u.id }); loadUsers(); }} style={{ ...btnStyle('danger'), padding: '0.5rem' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Section: Settings ─────────────────────────────────────────────────────
  const SettingsSection = () => {
    const [siteTitle, setSiteTitle] = useState('NAVYA MYTHOS');
    const [phone, setPhone] = useState('0426 532 177');
    const [email, setEmail] = useState('info@navyamythos.com.au');
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
      await Promise.all([
        call('update_config', { key: 'siteTitle', value: siteTitle }),
        call('update_config', { key: 'phone', value: phone }),
        call('update_config', { key: 'email', value: email }),
      ]);
      setSaved(true); setTimeout(() => setSaved(false), 2000);
    };

    return (
      <div>
        {sectionTitle('Settings', 'Global site configuration')}
        <div style={{ ...glass(), maxWidth: 600 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>SITE TITLE</label>
              <input value={siteTitle} onChange={e => setSiteTitle(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>PHONE</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>EMAIL</label>
              <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            </div>
            <button onClick={handleSave} style={btnStyle()}>{saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save Settings</>}</button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Render Active Section ─────────────────────────────────────────────────
  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <OverviewSection />;
      case 'services': return <ServicesSection />;
      case 'pages': return <PagesSection />;
      case 'media': return <MediaSection />;
      case 'ads': return <AdsSection />;
      case 'analytics': return <AnalyticsSection />;
      case 'flashcards': return <FlashcardsSection />;
      case 'bookings': return <BookingsSection />;
      case 'testimonials': return <TestimonialsSection />;
      case 'users': return <UsersSection />;
      case 'settings': return <SettingsSection />;
      default: return <OverviewSection />;
    }
  };

  // ─── Main Layout ───────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: 'white', display: 'flex', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Mobile sidebar toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 100, ...btnStyle('ghost'), padding: '0.6rem', display: 'none' }}>
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 260 : 0, minWidth: sidebarOpen ? 260 : 0,
        borderRight: sidebarOpen ? '1px solid rgba(255,255,255,0.05)' : 'none',
        padding: sidebarOpen ? '2rem 1.2rem' : 0,
        display: 'flex', flexDirection: 'column', gap: '1.5rem',
        transition: 'all 0.3s ease', overflow: 'hidden',
        background: '#080808',
      }}>
        {sidebarOpen && (
          <>
            <div style={{ fontWeight: 900, fontSize: '1.1rem', background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MYTHOS ADMIN</div>

            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." style={{ ...inputStyle, paddingLeft: '2.2rem', fontSize: '0.8rem' }} />
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
              {navItems.filter(n => !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                <button key={item.id} onClick={() => navigate(item.id)}
                  style={{
                    padding: '0.7rem 1rem', borderRadius: '10px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.8rem',
                    background: activeSection === item.id ? 'rgba(0,212,255,0.1)' : 'transparent',
                    color: activeSection === item.id ? '#00d4ff' : 'rgba(255,255,255,0.6)',
                    border: 'none', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                    fontWeight: activeSection === item.id ? 600 : 400,
                  }}>
                  {item.icon} {item.label}
                </button>
              ))}
            </nav>

            <button onClick={handleLogout} style={{ ...btnStyle('ghost'), width: '100%', justifyContent: 'center', fontSize: '0.8rem', marginTop: 'auto' }}>
              <LogOut size={14} /> Sign Out
            </button>
          </>
        )}
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto', minHeight: '100vh' }}>
        {renderSection()}
      </main>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; background: #050505; }
        input, select, textarea { font-family: inherit; }
        input:focus, select:focus, textarea:focus { border-color: rgba(0,212,255,0.5) !important; outline: none; }
        button:hover { opacity: 0.85; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        @media (max-width: 768px) {
          main { padding: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
