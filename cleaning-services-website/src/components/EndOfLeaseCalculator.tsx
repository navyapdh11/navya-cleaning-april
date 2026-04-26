'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Minus, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Home
} from 'lucide-react'; 

export const EndOfLeaseCalculator: React.FC = () => {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState('apartment');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [sqm, setSqm] = useState(85);
  
  const [priceRange, setPriceRange] = useState({ min: 480, max: 610 });

  useEffect(() => {
    let base = 350;
    if (propertyType === 'house') base += 100;
    if (propertyType === 'townhouse') base += 50;
    base += (bedrooms - 1) * 50;
    base += (bathrooms - 1) * 30;
    const total = base + (sqm / 10);
    setPriceRange({
      min: Math.round(total * 0.95),
      max: Math.round(total * 1.15)
    });
  }, [propertyType, bedrooms, bathrooms, sqm]);

  const handleStartBooking = () => {
    router.push(`/booking?service=end-of-lease-cleaning&propertyType=${propertyType}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&sqm=${sqm}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start text-left">
      <div className="flex-1 w-full space-y-8">
        <section className="glass p-6 rounded-[32px]">
          <h2 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest">Property Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['apartment', 'house', 'townhouse'].map((type) => (
              <label key={type} className={`relative flex cursor-pointer rounded-xl transition-all ${propertyType === type ? 'ring-2 ring-primary bg-primary/10' : 'bg-white/5 hover:bg-white/10'}`}>
                <input type="radio" className="sr-only" checked={propertyType === type} onChange={() => setPropertyType(type)} />
                <div className="flex w-full flex-col items-center text-center gap-4 p-6">
                   <div className={`h-12 w-12 rounded-full flex items-center justify-center border ${propertyType === type ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                      {type === 'apartment' ? <Building2 size={24} /> : <Home size={24} />}
                   </div>
                   <span className="font-semibold capitalize text-white">{type}</span>
                </div>
              </label>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <section className="glass p-6 rounded-[24px]">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Bedrooms</h2>
              <div className="flex items-center justify-between bg-black/30 rounded-xl p-1">
                 <button onClick={() => setBedrooms(Math.max(1, bedrooms-1))} className="p-2 opacity-50 hover:opacity-100"><Minus size={16} /></button>
                 <span className="text-xl font-bold">{bedrooms}</span>
                 <button onClick={() => setBedrooms(bedrooms+1)} className="p-2"><Plus size={16} /></button>
              </div>
           </section>
           <section className="glass p-6 rounded-[24px]">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Bathrooms</h2>
              <div className="flex items-center justify-between bg-black/30 rounded-xl p-1">
                 <button onClick={() => setBathrooms(Math.max(1, bathrooms-1))} className="p-2 opacity-50 hover:opacity-100"><Minus size={16} /></button>
                 <span className="text-xl font-bold">{bathrooms}</span>
                 <button onClick={() => setBathrooms(bathrooms+1)} className="p-2"><Plus size={16} /></button>
              </div>
           </section>
           <section className="glass p-6 rounded-[24px]">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Est. Size</h2>
              <div className="text-lg font-bold text-primary mb-2">~{sqm} sqm</div>
              <input type="range" min="30" max="300" value={sqm} onChange={e => setSqm(parseInt(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none accent-primary" />
           </section>
        </div>
      </div>

      <aside className="w-full lg:w-[350px] shrink-0">
         <div className="glass p-8 rounded-[32px] border-primary/20 bg-primary/5">
            <h3 className="text-xl font-bold mb-1">Live Estimate</h3>
            <p className="text-xs text-slate-500 mb-6 uppercase tracking-widest font-bold">Node: end-of-lease</p>
            
            <div className="text-3xl font-black text-white tracking-tighter mb-2">
               ${priceRange.min} <span className="text-lg font-bold text-slate-400">- ${priceRange.max}</span>
            </div>
            <p className="text-[10px] text-primary/70 mb-8 leading-relaxed">Includes standard bond-back guarantee modules. Add-ons available in full flow.</p>

            <button 
              onClick={handleStartBooking}
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_10px_20px_rgba(99,102,241,0.2)]"
            >
              Continue to Step 2 <ArrowRight size={18} />
            </button>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
               <ShieldCheck size={16} className="text-secondary" />
               <span className="text-[10px] font-bold text-slate-400">AEO COMPLIANT DISPATCH</span>
            </div>
         </div>
      </aside>
    </div>
  );
};
