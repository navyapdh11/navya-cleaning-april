'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Minus, 
  Plus, 
  Layout,
  Microwave,
  Undo2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Calendar,
  User,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Zap,
  Info,
  Building2,
  Home,
  Check
} from 'lucide-react';
import { SERVICES, STATES, ServiceData, Addon } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingState {
  step: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  addons: Record<string, number>;
  date: string;
  time: string;
  frequency: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  postcode: string;
  state: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export const MultiStepBooking: React.FC<{ initialService?: string }> = ({ initialService }) => {
  const [service, setService] = useState<ServiceData>(
    SERVICES.find(s => s.slug === initialService) || SERVICES[0]
  );

  const [booking, setBooking] = useState<BookingState>({
    step: 1,
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    sqm: 85,
    addons: {},
    date: '',
    time: '09:00',
    frequency: 'one-off',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    suburb: '',
    postcode: '',
    state: 'NSW',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = service.basePrice;
    price += (booking.bedrooms - 1) * 30;
    price += (booking.bathrooms - 1) * 20;
    
    service.addons.forEach(addon => {
      const qty = booking.addons[addon.id] || 0;
      price += qty * addon.price;
    });

    setTotalPrice(price);
  }, [booking, service]);

  const updateAddon = (id: string, delta: number) => {
    setBooking(prev => ({
      ...prev,
      addons: {
        ...prev.addons,
        [id]: Math.max(0, (prev.addons[id] || 0) + delta)
      }
    }));
  };

  const nextStep = () => setBooking(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setBooking(prev => ({ ...prev, step: prev.step - 1 }));

  const steps = [
    { title: 'Details', icon: <Layout size={18} /> },
    { title: 'Schedule', icon: <Calendar size={18} /> },
    { title: 'Contact', icon: <User size={18} /> },
    { title: 'Payment', icon: <CreditCard size={18} /> },
    { title: 'Review', icon: <CheckCircle2 size={18} /> }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-[1400px] mx-auto">
      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Stepper */}
        <nav className="mb-12 px-4">
          <ol className="flex items-center w-full justify-between">
            {steps.map((s, i) => (
              <li key={i} className="relative flex-1 group">
                <div className="flex flex-col items-center">
                   <div className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${booking.step > i + 1 ? 'bg-primary border-primary' : booking.step === i + 1 ? 'border-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'border-white/10 bg-white/5'}`}>
                      {booking.step > i + 1 ? <Check size={20} className="text-white" /> : <span className={booking.step === i + 1 ? 'text-primary' : 'text-slate-500'}>{i + 1}</span>}
                   </div>
                   <span className={`absolute -bottom-8 text-xs font-bold uppercase tracking-wider ${booking.step === i + 1 ? 'text-primary' : 'text-slate-500'}`}>{s.title}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`absolute top-5 left-[calc(50%+25px)] right-[calc(-50%+25px)] h-[2px] ${booking.step > i + 1 ? 'bg-primary' : 'bg-white/10'}`}></div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Step Content */}
        <div className="mt-16">
          <AnimatePresence mode="wait">
            {booking.step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* Property Type */}
                  <section className="glass p-6 md:col-span-3 rounded-[32px]">
                    <h2 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest flex items-center gap-2">Property Type</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['apartment', 'house', 'townhouse'].map((type) => (
                        <label key={type} className={`relative flex cursor-pointer rounded-xl transition-all ${booking.propertyType === type ? 'ring-2 ring-primary bg-primary/10' : 'bg-white/5 hover:bg-white/10'}`}>
                          <input type="radio" className="sr-only" checked={booking.propertyType === type} onChange={() => setBooking(p => ({...p, propertyType: type}))} />
                          <div className="flex w-full flex-col items-center text-center gap-4 p-6">
                             <div className={`h-14 w-14 rounded-full flex items-center justify-center border ${booking.propertyType === type ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                                {type === 'apartment' ? <Building2 size={30} /> : <Home size={30} />}
                             </div>
                             <span className="font-semibold capitalize text-white">{type}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>

                  {/* Counters */}
                  <section className="glass p-6 rounded-[24px]">
                    <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6">Bedrooms</h2>
                    <div className="flex items-center justify-between bg-black/30 rounded-xl p-2">
                       <button onClick={() => setBooking(p => ({...p, bedrooms: Math.max(1, p.bedrooms-1)}))} className="w-12 h-12 text-slate-400 hover:text-white"><Minus /></button>
                       <span className="text-3xl font-bold">{booking.bedrooms}</span>
                       <button onClick={() => setBooking(p => ({...p, bedrooms: p.bedrooms+1}))} className="w-12 h-12"><Plus /></button>
                    </div>
                  </section>
                  <section className="glass p-6 rounded-[24px]">
                    <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6">Bathrooms</h2>
                    <div className="flex items-center justify-between bg-black/30 rounded-xl p-2">
                       <button onClick={() => setBooking(p => ({...p, bathrooms: Math.max(1, p.bathrooms-1)}))} className="w-12 h-12 text-slate-400 hover:text-white"><Minus /></button>
                       <span className="text-3xl font-bold">{booking.bathrooms}</span>
                       <button onClick={() => setBooking(p => ({...p, bathrooms: p.bathrooms+1}))} className="w-12 h-12"><Plus /></button>
                    </div>
                  </section>
                  <section className="glass p-6 rounded-[24px]">
                    <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-2">Est. Size</h2>
                    <div className="text-2xl font-bold text-primary mb-4">~{booking.sqm} sqm</div>
                    <input type="range" min="30" max="500" value={booking.sqm} onChange={e => setBooking(p => ({...p, sqm: parseInt(e.target.value)}))} className="w-full h-2 bg-white/10 rounded-lg appearance-none accent-primary" />
                  </section>
                </div>

                {/* Add-ons */}
                <div className="pt-8 flex items-center gap-4">
                  <div className="h-px bg-white/10 flex-grow"></div>
                  <h2 className="text-2xl font-bold">Premium Add-ons</h2>
                  <div className="h-px bg-white/10 flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.addons.map(addon => (
                    <div key={addon.id} className="glass p-6 rounded-[24px] flex flex-col justify-between">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <h3 className="font-bold flex items-center gap-2">
                                <Zap size={18} className="text-secondary" /> {addon.name}
                             </h3>
                             <p className="text-xs text-slate-400 mt-1">{addon.description}</p>
                          </div>
                          <div className="text-primary font-bold text-lg">${addon.price}</div>
                       </div>
                       {addon.type === 'counter' ? (
                         <div className="flex items-center justify-between bg-black/20 p-2 rounded-xl border border-white/5">
                            <button onClick={() => updateAddon(addon.id, -1)} className="p-2 text-slate-400"><Minus size={16} /></button>
                            <span className="font-bold">{booking.addons[addon.id] || 0}</span>
                            <button onClick={() => updateAddon(addon.id, 1)} className="p-2"><Plus size={16} /></button>
                         </div>
                       ) : (
                         <button 
                          onClick={() => updateAddon(addon.id, (booking.addons[addon.id] ? -1 : 1))}
                          className={`w-full p-3 rounded-xl border transition-all font-bold ${booking.addons[addon.id] ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                         >
                            {booking.addons[addon.id] ? 'Selected' : 'Add to Clean'}
                         </button>
                       )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {booking.step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="glass p-8 rounded-[32px]">
                   <h2 className="text-2xl font-bold mb-8">Schedule Dispatch</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Preferred Date</label>
                         <input type="date" value={booking.date} onChange={e => setBooking(p => ({...p, date: e.target.value}))} className="w-full bg-white/5 border-white/10 p-4 rounded-xl text-white outline-none focus:border-primary transition-all" />
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Start Time Window</label>
                         <select value={booking.time} onChange={e => setBooking(p => ({...p, time: e.target.value}))} className="w-full bg-white/5 border-white/10 p-4 rounded-xl text-white outline-none focus:border-primary transition-all">
                            <option value="08:00">08:00 AM - 09:00 AM</option>
                            <option value="10:00">10:00 AM - 11:00 AM</option>
                            <option value="12:00">12:00 PM - 01:00 PM</option>
                            <option value="14:00">02:00 PM - 03:00 PM</option>
                         </select>
                      </div>
                      <div className="md:col-span-2">
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Frequency Optimization</label>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {['one-off', 'weekly', 'fortnightly'].map(f => (
                              <button key={f} onClick={() => setBooking(p => ({...p, frequency: f}))} className={`p-4 rounded-xl border transition-all text-center font-bold capitalize ${booking.frequency === f ? 'bg-secondary/10 border-secondary text-secondary' : 'bg-white/5 border-white/10 opacity-60'}`}>
                                 {f}
                                 {f !== 'one-off' && <div className="text-[10px] text-secondary">Save 15%</div>}
                              </button>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {booking.step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                 <div className="glass p-8 rounded-[32px]">
                    <h2 className="text-2xl font-bold mb-8">Facility & Contact Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <input placeholder="First Name" value={booking.firstName} onChange={e => setBooking(p => ({...p, firstName: e.target.value}))} className="glass p-4 rounded-xl w-full border-white/10" />
                       <input placeholder="Last Name" value={booking.lastName} onChange={e => setBooking(p => ({...p, lastName: e.target.value}))} className="glass p-4 rounded-xl w-full border-white/10" />
                       <input placeholder="Email Address" value={booking.email} onChange={e => setBooking(p => ({...p, email: e.target.value}))} className="glass p-4 rounded-xl w-full border-white/10" />
                       <input placeholder="Phone Number" value={booking.phone} onChange={e => setBooking(p => ({...p, phone: e.target.value}))} className="glass p-4 rounded-xl w-full border-white/10" />
                       <div className="md:col-span-2">
                          <input placeholder="Street Address" value={booking.address} onChange={e => setBooking(p => ({...p, address: e.target.value}))} className="glass p-4 rounded-xl w-full border-white/10" />
                       </div>
                       <input placeholder="Suburb" value={booking.suburb} onChange={e => setBooking(p => ({...p, suburb: e.target.value}))} className="glass p-4 rounded-xl w-full border-white/10" />
                       <input placeholder="Postcode" value={booking.postcode} onChange={e => setBooking(p => ({...p, postcode: e.target.value}))} className="glass p-4 rounded-xl w-full border-white/10" />
                    </div>
                 </div>
              </motion.div>
            )}

            {booking.step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                 <div className="glass p-8 rounded-[32px] border-primary/20">
                    <div className="flex justify-between items-center mb-8">
                       <h2 className="text-2xl font-bold">Secure Node Payment</h2>
                       <div className="flex gap-2">
                          <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                          <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">MC</div>
                       </div>
                    </div>
                    <div className="space-y-6">
                       <input placeholder="Name on Card" className="glass p-4 rounded-xl w-full border-white/10" />
                       <div className="relative">
                          <input placeholder="Card Number" className="glass p-4 rounded-xl w-full border-white/10" />
                          <Lock size={16} className="absolute right-4 top-5 opacity-30" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <input placeholder="MM / YY" className="glass p-4 rounded-xl w-full border-white/10" />
                          <input placeholder="CVC" className="glass p-4 rounded-xl w-full border-white/10" />
                       </div>
                       <p className="text-xs text-slate-500 text-center">Your data is encrypted with 256-bit AES. We do not store full card details on our local nodes.</p>
                    </div>
                 </div>
              </motion.div>
            )}

            {booking.step === 5 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 text-center">
                 <div className="glass p-12 rounded-[48px] border-primary/40">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                       <CheckCircle2 size={48} className="text-primary" />
                    </div>
                    <h2 className="text-3xl font-black mb-4">Transmission Ready</h2>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto">Confirm your dispatch request for {service.name}. AEO-verification will initialize upon confirmation.</p>
                    <div className="glass p-6 rounded-3xl text-left mb-8 max-w-lg mx-auto bg-white/5">
                       <div className="flex justify-between mb-2"><span>Facility</span><span className="font-bold">{booking.address || 'Draft Node'}</span></div>
                       <div className="flex justify-between mb-2"><span>Dispatch Date</span><span className="font-bold">{booking.date || 'Pending'}</span></div>
                       <div className="flex justify-between"><span>Total Investment</span><span className="font-bold text-primary text-xl">${totalPrice}</span></div>
                    </div>
                    <button className="btn-primary px-12 py-5 rounded-2xl text-xl font-black w-full max-w-lg">AUTHORIZE DISPATCH</button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {booking.step < 5 && (
          <div className="mt-12 flex justify-between px-4">
             <button 
              disabled={booking.step === 1}
              onClick={prevStep}
              className={`flex items-center gap-2 font-bold transition-all ${booking.step === 1 ? 'opacity-0' : 'opacity-60 hover:opacity-100'}`}
             >
                <ChevronLeft size={20} /> Back
             </button>
             <button 
              onClick={nextStep}
              className="btn-primary px-10 py-4 rounded-2xl font-bold flex items-center gap-2"
             >
                Continue <ChevronRight size={20} />
             </button>
          </div>
        )}
      </div>

      {/* Sidebar Summary */}
      <aside className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-28 z-20">
         <div className="glass rounded-[32px] overflow-hidden flex flex-col relative border-white/5">
            <div className="p-8 pb-6 border-b border-white/10">
               <h3 className="text-2xl font-bold">Dispatch Summary</h3>
               <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">
                  <span className="h-2 w-2 rounded-full bg-secondary animate-pulse"></span> Live Quote Stream
               </div>
            </div>

            <div className="p-8 space-y-6">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white/5 rounded-lg text-secondary"><Layout size={18} /></div>
                     <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Service Cluster</div>
                        <div className="text-sm font-bold">{service.name}</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white/5 rounded-lg text-secondary"><Calendar size={18} /></div>
                     <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Temporal Node</div>
                        <div className="text-sm font-bold">{booking.date || 'Awaiting Selection'}</div>
                     </div>
                  </div>
               </div>

               <div className="h-px bg-white/5 w-full"></div>

               <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Base Investment</span><span className="font-bold">${service.basePrice}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Node Scale ({booking.bedrooms}B / {booking.bathrooms}Ba)</span><span className="font-bold">+${(booking.bedrooms-1)*30 + (booking.bathrooms-1)*20}</span></div>
                  
                  {Object.entries(booking.addons).map(([id, qty]) => {
                    const addon = service.addons.find(a => a.id === id);
                    if (!addon || qty === 0) return null;
                    return (
                      <div key={id} className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                        <span className="text-xs text-slate-400">{addon.name} {qty > 1 ? `(x${qty})` : ''}</span>
                        <span className="font-bold text-primary">+${addon.price * qty}</span>
                      </div>
                    );
                  })}
               </div>

               <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 to-transparent p-6 border border-primary/20 mt-4">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Algorithmic Total</div>
                  <div className="text-4xl font-black tracking-tighter">${totalPrice}</div>
                  <p className="text-[10px] text-slate-500 mt-2">Includes standard equipment & bio-safe solutions.</p>
               </div>
            </div>

            <div className="bg-black/40 p-6 border-t border-white/10 flex flex-col gap-4">
               <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-secondary" />
                  <div>
                     <div className="text-xs font-bold">AEO COMPLIANT</div>
                     <div className="text-[10px] text-slate-500">Real-time Hygiene Telemetry</div>
                  </div>
               </div>
            </div>
         </div>
      </aside>
    </div>
  );
};
