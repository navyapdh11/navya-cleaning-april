'use client';

import React, { useState, useEffect } from 'react';
import { MaterialSymbol } from './InteractiveElements'; // I might need to create this or use lucide-react
import { SERVICES, STATES } from '@/lib/data';
import { 
  Home, 
  Apartment, 
  HolidayVillage, 
  CheckCircle2, 
  Minus, 
  Plus, 
  SquareFoot,
  Window,
  Layers,
  Microwave,
  WallArt,
  Garage,
  Chair,
  Bed,
  Receipt,
  ShieldCheck,
  Lock,
  ArrowRight,
  Calculator
} from 'lucide-react'; // Using Lucide since I have it installed

export const EndOfLeaseCalculator: React.FC = () => {
  const [propertyType, setPropertyType] = useState('apartment');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [sqm, setSqm] = useState(85);
  
  // Add-ons
  const [ovenClean, setOvenClean] = useState<'none' | 'light' | 'deep'>('none');
  const [windowGround, setWindowGround] = useState(0);
  const [window2nd, setWindow2nd] = useState(0);
  const [windowSliding, setWindowSliding] = useState(0);
  const [windowHardWater, setWindowSlidingHard] = useState(0);
  const [garageDeepScrub, setGarageDeepScrub] = useState(false);
  const [upholsterySeats, setUpholsterySeats] = useState(0);
  const [mattressClean, setMattressClean] = useState<'none' | 'light' | 'deep'>('none');
  const [walls, setWalls] = useState(0);
  const [carpetType, setCarpetType] = useState<'residential' | 'commercial'>('residential');
  const [carpetRooms, setCarpetRooms] = useState(0);

  const [priceRange, setPriceRange] = useState({ min: 480, max: 610 });

  useEffect(() => {
    // Basic calculation logic
    let base = 350;
    if (propertyType === 'house') base += 100;
    if (propertyType === 'townhouse') base += 50;
    
    base += (bedrooms - 1) * 50;
    base += (bathrooms - 1) * 30;
    base += (sqm / 10);

    let addOns = 0;
    if (ovenClean === 'light') addOns += 30;
    if (ovenClean === 'deep') addOns += 50;
    
    addOns += windowGround * 8;
    addOns += window2nd * 12;
    addOns += windowSliding * 12;
    addOns += windowHardWater * 15;
    
    if (garageDeepScrub) addOns += 60;
    addOns += upholsterySeats * 12;
    
    if (mattressClean === 'light') addOns += 20;
    if (mattressClean === 'deep') addOns += 35;
    
    addOns += walls * 8;
    addOns += carpetRooms * 30;

    const total = base + addOns;
    setPriceRange({
      min: Math.round(total * 0.95),
      max: Math.round(total * 1.15)
    });
  }, [propertyType, bedrooms, bathrooms, sqm, ovenClean, windowGround, window2nd, windowSliding, windowHardWater, garageDeepScrub, upholsterySeats, mattressClean, walls, carpetRooms]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start text-left">
      {/* Main Form Area */}
      <div className="flex-1 w-full">
        <form className="space-y-8">
          {/* Basics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Property Type */}
            <section className="glass p-6 md:col-span-3 rounded-[32px]">
              <h2 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest flex items-center gap-2">
                Property Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['apartment', 'house', 'townhouse'].map((type) => (
                  <label key={type} className={`relative flex cursor-pointer rounded-xl transition-all ${propertyType === type ? 'ring-2 ring-primary bg-primary/10' : 'bg-white/5 hover:bg-white/10'}`}>
                    <input 
                      type="radio" 
                      name="property_type" 
                      className="sr-only" 
                      checked={propertyType === type}
                      onChange={() => setPropertyType(type)}
                    />
                    <div className="flex w-full flex-col items-center text-center gap-4 p-6">
                      <div className={`h-14 w-14 rounded-full flex items-center justify-center border ${propertyType === type ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                        {type === 'apartment' && <span className="material-symbols-outlined text-3xl">apartment</span>}
                        {type === 'house' && <span className="material-symbols-outlined text-3xl">home</span>}
                        {type === 'townhouse' && <span className="material-symbols-outlined text-3xl">holiday_village</span>}
                      </div>
                      <span className={`font-semibold capitalize ${propertyType === type ? 'text-white' : 'text-slate-300'}`}>{type}</span>
                      {propertyType === type && <CheckCircle2 className="absolute top-4 right-4 text-primary" size={20} />}
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Counter Sections */}
            {[
              { label: 'Bedrooms', val: bedrooms, set: setBedrooms, icon: 'bed' },
              { label: 'Bathrooms', val: bathrooms, set: setBathrooms, icon: 'shower' }
            ].map((item) => (
              <section key={item.label} className="glass p-6 flex flex-col justify-between rounded-[24px]">
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-secondary text-[20px]">{item.icon}</span> {item.label}
                </h2>
                <div className="flex items-center justify-between bg-black/30 rounded-xl p-2 border border-white/5">
                  <button type="button" onClick={() => item.set(Math.max(1, item.val - 1))} className="w-12 h-12 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                    <Minus size={20} />
                  </button>
                  <span className="text-3xl font-bold text-white w-12 text-center">{item.val}</span>
                  <button type="button" onClick={() => item.set(item.val + 1)} className="w-12 h-12 rounded-lg flex items-center justify-center text-white bg-white/5 hover:bg-white/15 transition-all">
                    <Plus size={20} />
                  </button>
                </div>
              </section>
            ))}

            {/* Size Section */}
            <section className="glass p-6 flex flex-col justify-between rounded-[24px]">
              <div className="flex flex-col mb-6">
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-2">
                   Est. Size
                </h2>
                <div className="text-2xl font-bold text-primary">~{sqm} sqm</div>
              </div>
              <input 
                type="range" 
                min="30" 
                max="300" 
                value={sqm} 
                onChange={(e) => setSqm(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </section>
          </div>

          {/* Premium Add-ons */}
          <div className="pt-8 pb-4 flex items-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-grow"></div>
            <h2 className="text-2xl font-bold text-white tracking-tight px-4">Premium Add-ons</h2>
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Windows */}
            <div className="glass p-6 md:col-span-2 rounded-[24px]">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <Window className="text-secondary p-2 bg-secondary/10 rounded-lg" size={40} /> Window Cleaning
                  </h3>
                  <p className="text-sm text-slate-400">Internal windows/grooves included in standard clean.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto flex-1">
                  {[
                    { label: 'Ground Floor', price: 8, val: windowGround, set: setWindowGround },
                    { label: '2nd Floor', price: 12, val: window2nd, set: setWindow2nd },
                    { label: 'Sliding Doors', price: 12, val: windowSliding, set: setWindowSliding },
                    { label: 'Hard Water', price: 15, val: windowHardWater, set: setWindowSlidingHard }
                  ].map((win) => (
                    <div key={win.label} className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-200">{win.label}</span>
                        <span className="text-xs text-primary font-bold">+${win.price}/ea</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => win.set(Math.max(0, win.val - 1))} className="w-8 h-8 rounded-md bg-white/5 text-slate-400 flex items-center justify-center hover:text-white"><Minus size={14} /></button>
                        <span className="font-bold text-white w-4 text-center">{win.val}</span>
                        <button type="button" onClick={() => win.set(win.val + 1)} className="w-8 h-8 rounded-md bg-white/5 text-slate-400 flex items-center justify-center hover:text-white"><Plus size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Oven */}
            <div className="glass p-6 rounded-[24px]">
               <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-secondary p-2 bg-secondary/10 rounded-lg">microwave</span> Oven Cleaning
               </h3>
               <div className="space-y-3">
                  {['light', 'deep'].map((lvl) => (
                    <label key={lvl} className={`flex justify-between items-center w-full p-4 rounded-xl border transition-all cursor-pointer ${ovenClean === lvl ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5'}`}>
                       <input type="radio" className="sr-only" name="oven" checked={ovenClean === lvl} onChange={() => setOvenClean(lvl as any)} />
                       <span className="font-medium text-slate-200 capitalize">{lvl} Clean</span>
                       <span className="text-sm text-primary font-bold">+${lvl === 'light' ? 30 : 50}</span>
                    </label>
                  ))}
               </div>
            </div>

            {/* Walls */}
            <div className="glass p-6 rounded-[24px]">
               <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-secondary p-2 bg-secondary/10 rounded-lg">wall_art</span> Wall Cleaning
               </h3>
               <p className="text-sm text-slate-400 mb-4">Targeted mark removal & wash.</p>
               <div className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/10">
                  <span className="text-primary font-bold text-sm">+$8/wall</span>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setWalls(Math.max(0, walls - 1))} className="w-8 h-8 rounded-md bg-white/5 text-slate-400 flex items-center justify-center"><Minus size={14}/></button>
                    <span className="font-bold text-white w-6 text-center text-lg">{walls}</span>
                    <button type="button" onClick={() => setWalls(walls + 1)} className="w-8 h-8 rounded-md bg-white/5 text-slate-400 flex items-center justify-center"><Plus size={14}/></button>
                  </div>
               </div>
            </div>
          </div>
        </form>
      </div>

      {/* Sticky Sidebar: Booking Summary */}
      <aside className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-28 z-20">
        <div className="glass rounded-[32px] overflow-hidden flex flex-col relative border-primary/20">
          <div className="p-8 pb-6 relative z-10 border-b border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">Booking Summary</h3>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Live drafting quote
            </div>
          </div>
          
          <div className="p-8 flex-grow flex flex-col gap-6 relative z-10">
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Property</span>
                <span className="font-semibold text-white">{bedrooms} Bed, {bathrooms} {propertyType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Est. Size</span>
                <span className="font-semibold text-white">~{sqm} sqm</span>
              </div>
              
              {/* Dynamic Add-ons Summary */}
              <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Selected Add-ons</div>
                {ovenClean !== 'none' && (
                   <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                      <span className="text-slate-300">Oven Clean ({ovenClean})</span>
                      <span className="font-bold text-primary">+${ovenClean === 'light' ? 30 : 50}</span>
                   </div>
                )}
                {walls > 0 && (
                   <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                      <span className="text-slate-300">Wall Wash (x{walls})</span>
                      <span className="font-bold text-primary">+${walls * 8}</span>
                   </div>
                )}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 p-6">
              <div className="text-xs font-bold text-primary/80 uppercase tracking-widest mb-2 flex items-center gap-2">
                AI Estimate Range
              </div>
              <div className="text-4xl font-black text-white tracking-tighter flex items-baseline gap-2">
                ${priceRange.min} <span className="text-xl font-bold text-slate-400">- ${priceRange.max}</span>
              </div>
            </div>

            <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all mt-4">
              Authorize Dispatch <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="bg-black/40 p-6 border-t border-white/10 flex flex-col gap-4">
             <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-secondary" />
                <div>
                   <div className="text-sm font-bold text-white">ACL Compliant</div>
                   <div className="text-xs text-slate-400">100% Bond Back Guarantee</div>
                </div>
             </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
