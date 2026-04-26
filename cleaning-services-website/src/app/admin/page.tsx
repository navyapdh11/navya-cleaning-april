'use client';

import React, { useState, useEffect } from 'react';
import { BentoGrid, BentoItem } from '@/components/InteractiveElements';
import { 
  BarChart3, 
  Users, 
  Activity, 
  ShieldAlert, 
  Map as MapIcon, 
  TrendingUp, 
  Clock,
  Settings,
  Layout,
  Plus,
  Save,
  Trash2,
  Sparkles,
  Eye,
  Lock
} from 'lucide-react';
import { STATES, SERVICES } from '@/lib/data';

export default function AdminDashboard() {
  const [activeView, setActiveTab] = useState('ops'); // ops, cms, flashcards
  const [bookings, setBookings] = useState<any[]>([]);
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [siteTitle, setSiteTitle] = useState('NAVYA MYTHOS');
  
  // Flashcard Form State
  const [editingCard, setEditingCard] = useState<any>(null);

  const presets = [
    { title: 'AEO Compliance', content: 'Verified real-time hygiene telemetry injected into answer engines.', icon: 'shield', category: 'Compliance' },
    { title: 'Autonomous Fleet', content: 'National network of self-learning sanitization nodes.', icon: 'zap', category: 'Technology' },
    { title: '24/7 Dispatch', content: 'Continuous coverage across all Australian territory nodes.', icon: 'clock', category: 'Efficiency' }
  ];

  useEffect(() => {
    fetchData();
    fetchFlashcards();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/mythos');
      const data = await res.json();
      if (data.bookings) setBookings(data.bookings);
    } catch (err) { console.error('Ops Data Sync Error'); }
  };

  const fetchFlashcards = async () => {
    const res = await fetch('/api/mythos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get_flashcards' })
    });
    const data = await res.json();
    if (data.flashcards) setFlashcards(data.flashcards);
  };

  const saveFlashcard = async (card: any) => {
    await fetch('/api/mythos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'save_flashcard', payload: card })
    });
    setEditingCard(null);
    fetchFlashcards();
  };

  return (
    <main style={{ minHeight: '100vh', background: '#050505', color: 'white', display: 'flex' }}>
      
      {/* Universal Admin Sidebar */}
      <aside style={{ width: '280px', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
         <div style={{ fontWeight: '900', fontSize: '1.2rem', color: 'var(--primary)' }}>MYTHOS ADMIN</div>
         <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { id: 'ops', label: 'Ops Center', icon: <Activity size={18} /> },
              { id: 'flashcards', label: 'Flashcard CMS', icon: <Sparkles size={18} /> },
              { id: 'config', label: 'Site Config', icon: <Settings size={18} /> },
              { id: 'security', label: 'Access Control', icon: <Lock size={18} /> }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="glass"
                style={{ 
                  padding: '1rem', borderRadius: '12px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem',
                  background: activeView === item.id ? 'var(--primary)' : 'transparent',
                  opacity: activeView === item.id ? 1 : 0.6, border: 'none', transition: 'all 0.2s'
                }}
              >
                {item.icon} {item.label}
              </button>
            ))}
         </nav>
      </aside>

      {/* Main Content Area */}
      <section style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        
        {/* Ops View */}
        {activeView === 'ops' && (
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '2rem' }}>National <span style={{ color: 'var(--primary)' }}>Operations</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px' }}>
                 <div style={{ opacity: 0.5, fontSize: '0.7rem' }}>LIVE DISPATCHES</div>
                 <div style={{ fontSize: '2rem', fontWeight: '900' }}>{bookings.length}</div>
              </div>
              <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px' }}>
                 <div style={{ opacity: 0.5, fontSize: '0.7rem' }}>AEO HEALTH</div>
                 <div style={{ fontSize: '2rem', fontWeight: '900', color: '#00ff00' }}>OPTIMAL</div>
              </div>
            </div>
            <BentoItem style={{ padding: '0', overflow: 'hidden' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ background: 'rgba(255,255,255,0.03)', opacity: 0.5, fontSize: '0.7rem' }}>
                     <tr>
                        <th style={{ padding: '1rem 2rem' }}>FACILITY</th>
                        <th style={{ padding: '1rem 2rem' }}>REGION</th>
                        <th style={{ padding: '1rem 2rem' }}>STATUS</th>
                     </tr>
                  </thead>
                  <tbody>
                     {bookings.map(b => (
                       <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={{ padding: '1.2rem 2rem' }}>{b.facilityName}</td>
                          <td style={{ padding: '1.2rem 2rem' }}>{b.stateCode}</td>
                          <td style={{ padding: '1.2rem 2rem', color: '#00ff00' }}>{b.status}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </BentoItem>
          </div>
        )}

        {/* Flashcard CMS View */}
        {activeView === 'flashcards' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
               <h2 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>Content <span style={{ color: 'var(--secondary)' }}>Flashcards</span></h2>
               <button onClick={() => setEditingCard({ title: '', content: '', icon: 'zap', category: 'Technology', isActive: true, order: flashcards.length })} className="glass" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                  <Plus size={18} /> Create New
               </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
               
               {/* List of Flashcards */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {flashcards.length === 0 && <p style={{ opacity: 0.5 }}>No custom flashcards defined. Using system defaults.</p>}
                  {flashcards.map(card => (
                    <div key={card.id} className="glass" style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: editingCard?.id === card.id ? '1px solid var(--primary)' : '1px solid transparent' }}>
                       <div>
                          <div style={{ fontWeight: 'bold' }}>{card.title}</div>
                          <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Category: {card.category} • Order: {card.order}</div>
                       </div>
                       <button onClick={() => setEditingCard(card)} style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.8rem' }}>Edit Node</button>
                    </div>
                  ))}

                  <div style={{ marginTop: '2rem' }}>
                     <h4 style={{ opacity: 0.5, marginBottom: '1rem' }}>ENTERPRISE PRESETS</h4>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {presets.map((p, i) => (
                          <div key={i} onClick={() => setEditingCard(p)} className="glass" style={{ padding: '1rem', borderRadius: '12px', cursor: 'pointer', fontSize: '0.8rem' }}>
                             <div style={{ fontWeight: 'bold' }}>{p.title}</div>
                             <div style={{ opacity: 0.5 }}>{p.category}</div>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Editor Panel */}
               {editingCard && (
                 <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px', position: 'sticky', top: '20px', border: '1px solid var(--primary)' }}>
                    <h3 style={{ marginBottom: '2rem' }}>{editingCard.id ? 'Edit Node' : 'New Content Node'}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                       <div>
                          <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>TITLE</label>
                          <input 
                            value={editingCard.title} 
                            onChange={e => setEditingCard({...editingCard, title: e.target.value})}
                            className="glass" style={{ width: '100%', padding: '1rem', borderRadius: '12px', color: 'white' }} 
                          />
                       </div>
                       <div>
                          <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>CONTENT</label>
                          <textarea 
                            value={editingCard.content} 
                            onChange={e => setEditingCard({...editingCard, content: e.target.value})}
                            className="glass" style={{ width: '100%', padding: '1rem', borderRadius: '12px', color: 'white', minHeight: '100px' }} 
                          />
                       </div>
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>CATEGORY</label>
                            <select 
                              value={editingCard.category}
                              onChange={e => setEditingCard({...editingCard, category: e.target.value})}
                              className="glass" style={{ width: '100%', padding: '1rem', borderRadius: '12px', color: 'white' }}
                            >
                               <option value="Technology">Technology</option>
                               <option value="Compliance">Compliance</option>
                               <option value="Efficiency">Efficiency</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ fontSize: '0.8rem', opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>ICON</label>
                            <select 
                              value={editingCard.icon}
                              onChange={e => setEditingCard({...editingCard, icon: e.target.value})}
                              className="glass" style={{ width: '100%', padding: '1rem', borderRadius: '12px', color: 'white' }}
                            >
                               <option value="zap">Zap</option>
                               <option value="shield">Shield</option>
                               <option value="clock">Clock</option>
                               <option value="activity">Activity</option>
                            </select>
                          </div>
                       </div>
                       <button onClick={() => saveFlashcard(editingCard)} style={{ marginTop: '1rem', background: 'var(--primary)', color: 'white', padding: '1.2rem', borderRadius: '16px', fontWeight: 'bold', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <Save size={18} /> Commit to National Grid
                       </button>
                       <button onClick={() => setEditingCard(null)} style={{ opacity: 0.5, fontSize: '0.8rem' }}>Cancel</button>
                    </div>
                 </div>
               )}

            </div>
          </div>
        )}

        {/* Site Config View */}
        {activeView === 'config' && (
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '3rem' }}>Network <span style={{ color: 'var(--primary)' }}>Configuration</span></h2>
            <div className="glass" style={{ padding: '3rem', borderRadius: '32px', maxWidth: '800px' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div>
                        <div style={{ fontWeight: 'bold' }}>Enterprise Branding</div>
                        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Set the primary namespace for the national network.</p>
                     </div>
                     <input value={siteTitle} onChange={e => setSiteTitle(e.target.value)} className="glass" style={{ padding: '0.8rem', borderRadius: '12px', color: 'white' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div>
                        <div style={{ fontWeight: 'bold' }}>AEO Injection Mode</div>
                        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Toggle real-time data feeding to generative search answer engines.</p>
                     </div>
                     <div style={{ background: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 'bold' }}>ACTIVE</div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
                     <button className="glass" style={{ padding: '1rem 2rem', borderRadius: '14px', background: 'var(--primary)', color: 'white', fontWeight: 'bold' }}>Save Global Changes</button>
                  </div>
               </div>
            </div>
          </div>
        )}

      </section>

      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          outline: none;
        }
        option { background: #0a0a0a; color: white; }
      `}</style>
    </main>
  );
}
