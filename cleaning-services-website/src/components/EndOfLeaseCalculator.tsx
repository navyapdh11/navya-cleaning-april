'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Minus, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Home,
  CheckCircle2
} from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

export const EndOfLeaseCalculator: React.FC<{ serviceSlug?: string, basePrice?: number }> = ({ serviceSlug = 'end-of-lease-cleaning', basePrice = 350 }) => {
    const router = useRouter();
    const [propertyType, setPropertyType] = useState('apartment');
    const [bedrooms, setBedrooms] = useState(2);
    const [bathrooms, setBathrooms] = useState(1);
    const [sqm, setSqm] = useState(85);

    const [priceRange, setPriceRange] = useState({ min: 480, max: 610 });

    useEffect(() => {
      let base = basePrice;
      if (propertyType === 'house') base += 100;
      if (propertyType === 'townhouse') base += 50;
      base += (bedrooms - 1) * 50;
      base += (bathrooms - 1) * 30;
      const total = base + (sqm / 10);
      setPriceRange({
        min: Math.round(total * 0.95),
        max: Math.round(total * 1.15)
      });
    }, [propertyType, bedrooms, bathrooms, sqm, basePrice]);

    const handleStartBooking = () => {
      router.push(`/booking?service=${serviceSlug}&propertyType=${propertyType}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&sqm=${sqm}`);
    };
  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start text-left max-w-[1200px] mx-auto w-full font-sans">
      
      {/* Configuration Area */}
      <div className="flex-1 w-full space-y-8">
        
        {/* Property Type Grid */}
        <section className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <h2 className="text-xs font-bold text-primary mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Node Configuration
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative z-10">
            {['apartment', 'house', 'townhouse'].map((type) => (
              <label key={type} className="relative group cursor-pointer">
                <input type="radio" className="sr-only" checked={propertyType === type} onChange={() => setPropertyType(type)} />
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 h-full ${
                    propertyType === type 
                      ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(0,112,243,0.2)]' 
                      : 'bg-black/20 border-white/5 hover:border-white/20 hover:bg-black/40'
                  }`}
                >
                   <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                     propertyType === type 
                       ? 'bg-primary/20 text-primary shadow-[inset_0_0_10px_rgba(0,112,243,0.5)]' 
                       : 'bg-white/5 text-slate-500'
                   }`}>
                      {type === 'apartment' ? <Building2 size={26} strokeWidth={1.5} /> : <Home size={26} strokeWidth={1.5} />}
                   </div>
                   <span className={`text-sm font-semibold capitalize tracking-wide ${propertyType === type ? 'text-white' : 'text-slate-400'}`}>
                     {type}
                   </span>
                </motion.div>
                <AnimatePresence>
                  {propertyType === type && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-3 right-3 text-primary"
                    >
                      <CheckCircle2 size={18} className="fill-primary/20" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </label>
            ))}
          </div>
        </section>

        {/* Counter Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <section className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em] mb-5">Rooms / Capacity</h2>
              <div className="flex items-center justify-between bg-black/40 rounded-2xl p-2 border border-white/5">
                 <button onClick={() => setBedrooms(Math.max(1, bedrooms-1))} className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"><Minus size={18} /></button>
                 <motion.span 
                  key={bedrooms}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-black text-white w-12 text-center"
                 >
                   {bedrooms}
                 </motion.span>
                 <button onClick={() => setBedrooms(bedrooms+1)} className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"><Plus size={18} /></button>
              </div>
           </section>

           <section className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em] mb-5">Washrooms / Facilities</h2>
              <div className="flex items-center justify-between bg-black/40 rounded-2xl p-2 border border-white/5">
                 <button onClick={() => setBathrooms(Math.max(1, bathrooms-1))} className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"><Minus size={18} /></button>
                 <motion.span 
                  key={bathrooms}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-black text-white w-12 text-center"
                 >
                   {bathrooms}
                 </motion.span>
                 <button onClick={() => setBathrooms(bathrooms+1)} className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"><Plus size={18} /></button>
              </div>
           </section>

           {/* Size Slider - Spans full width on mobile/tablet, single col on desktop */}
           <section className="md:col-span-2 bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="flex justify-between items-end mb-6">
                 <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em]">Internal Area (SQM)</h2>
                 <motion.div 
                   key={sqm}
                   initial={{ scale: 0.9, opacity: 0.5 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="text-3xl font-black text-primary"
                 >
                   ~{sqm} <span className="text-sm font-semibold text-slate-500 uppercase">sqm</span>
                 </motion.div>
              </div>
              
              <div className="relative w-full h-12 flex items-center">
                 <div className="absolute left-0 w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-primary/50 to-primary"
                      style={{ width: `${((sqm - 30) / (300 - 30)) * 100}%` }}
                    />
                 </div>
                 <input 
                   type="range" 
                   min="30" 
                   max="300" 
                   value={sqm} 
                   onChange={e => setSqm(parseInt(e.target.value))} 
                   className="absolute left-0 w-full h-full opacity-0 cursor-pointer" 
                 />
                 <div 
                   className="absolute h-6 w-6 bg-white rounded-full shadow-[0_0_15px_rgba(0,112,243,0.8)] pointer-events-none transform -translate-x-1/2 flex items-center justify-center border-2 border-primary"
                   style={{ left: `${((sqm - 30) / (300 - 30)) * 100}%` }}
                 >
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                 </div>
              </div>
              <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                 <span>30 SQM</span>
                 <span>300+ SQM</span>
              </div>
           </section>
        </div>
      </div>

      {/* Sticky Estimate Sidebar */}
      <aside className="w-full lg:w-[420px] shrink-0 sticky top-28 z-20">
         <div className="bg-black/40 backdrop-blur-2xl p-8 rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="relative z-10">
               <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                  <h3 className="text-xl font-bold text-white">Live Audit Estimate</h3>
                  <div className="px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-[10px] font-bold text-secondary uppercase tracking-widest animate-pulse">
                     Syncing
                  </div>
               </div>
               
               <div className="mb-8">
                  <p className="text-xs text-slate-500 mb-2 uppercase tracking-widest font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
                    AI Computed Range
                  </p>
                  
                  <div className="text-5xl font-black text-white tracking-tighter flex items-baseline gap-2 mb-3">
                     <span className="text-2xl text-slate-500 font-bold -mt-2 mr-1">$</span>
                     <motion.span key={priceRange.min} initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{priceRange.min}</motion.span>
                     <span className="text-2xl font-bold text-slate-600 mx-1">-</span>
                     <span className="text-2xl font-bold text-slate-400">${priceRange.max}</span>
                  </div>
                  
                  <p className="text-[11px] text-primary/60 font-medium leading-relaxed">
                     Base investment includes comprehensive bond-back guarantee protocols. Real-time dynamic multiplier active.
                  </p>
               </div>

               <div className="space-y-4 mb-8 bg-white/5 p-5 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-400 font-medium">Property Base</span>
                     <span className="text-white font-semibold capitalize">{propertyType}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-400 font-medium">Volume Extent</span>
                     <span className="text-white font-semibold">{sqm} SQM</span>
                  </div>
               </div>

               <motion.button 
                 whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,112,243,0.3)' }}
                 whileTap={{ scale: 0.98 }}
                 onClick={handleStartBooking}
                 className="w-full bg-gradient-to-r from-primary to-primary-glow text-white font-black py-5 px-6 rounded-2xl flex items-center justify-between group overflow-hidden relative border border-white/10"
               >
                 <span className="relative z-10 tracking-wide text-lg">INITIALIZE AUDIT</span>
                 <div className="relative z-10 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:translate-x-1 transition-transform">
                   <ArrowRight size={20} strokeWidth={2.5} />
                 </div>
               </motion.button>

               <div className="mt-8 flex items-center justify-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                  <ShieldCheck size={18} className="text-[#00ff00]" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">AEO Certified Dispatch</span>
               </div>
            </div>
         </div>
      </aside>
    </div>
  );
};