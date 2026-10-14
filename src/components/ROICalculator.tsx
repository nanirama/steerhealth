"use client";

import React, { useState, useMemo } from 'react';
import { TrendingUp, Users, Settings, Zap, DollarSign, ArrowRight, UserCheck, Calendar } from 'lucide-react';

const ROICalculator: React.FC = () => {
  // --- Inputs state (Minimum Inputs) ---
  const [visitsPerMonth, setVisitsPerMonth] = useState(138);
  const [revPerVisit, setRevPerVisit] = useState(800);
  const [adminMonthlyCost, setAdminMonthlyCost] = useState(9000);

  // Benchmarks Toggle
  const applyBenchmarks = () => {
    setVisitsPerMonth(138);
    setRevPerVisit(800);
    setAdminMonthlyCost(9000);
  };

  // --- Fixed Assumptions (Steer Benchmarks) ---
  const CAPACITY_LIFT = 0.20;       // 20%
  const RETENTION_LIFT = 0.12;      // 12%
  const ADMIN_SAVINGS_RATE = 0.70;  // 70%

  // --- Calculations ---
  const results = useMemo(() => {
    const annualRevenue = visitsPerMonth * revPerVisit * 12;
    
    const capacityValue = annualRevenue * CAPACITY_LIFT;
    const retentionValue = annualRevenue * RETENTION_LIFT;
    const adminSavings = adminMonthlyCost * 12 * ADMIN_SAVINGS_RATE;
    
    const totalAnnualUnlock = capacityValue + retentionValue + adminSavings;

    return {
      capacityValue,
      retentionValue,
      adminSavings,
      totalAnnualUnlock
    };
  }, [visitsPerMonth, revPerVisit, adminMonthlyCost]);

  return (
    <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-sm">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
        <div className="max-w-2xl text-left">
          <h2 className="xl:text-[48px] text-[30px] mt-3 mx-auto text-left text-[#171717] mb-2 font-semibold font2 md:leading-[100%] leading-[130%]">The Value Unlock</h2>
          <p className="text-base text-[#5c5c5c] font-inter max-w-3xl mb-4 mx-auto leading-relaxed">
            See how Steer Elevate transforms your clinic's revenue and efficiency through three core performance levers.
          </p>
        </div>
        <button 
          onClick={applyBenchmarks}
          className="bg-white hover:bg-slate-50 text-blue-600 text-base font-inter font-bold px-6 py-3 rounded-xl border border-blue-100 shadow-sm transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <Zap className="w-4 h-4" />
          Reset to Steer Benchmarks
        </button>
      </div>

      {/* Main Result Display */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group mb-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-blue-600/20"></div>
        <div className="relative z-10 text-center md:text-left">
          <div className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] font2 mb-6">Estimated Total Annual Value Unlock</div>
          <div className="flex flex-col md:flex-row items-baseline justify-center md:justify-start gap-4">
            <span className="lg:text-8xl text-6xl font-bold font2 font-[#171717]">
              ${Math.round(results.totalAnnualUnlock).toLocaleString()}
            </span>
            <span className="text-slate-500 font-light font-interdisplay-light uppercase text-sm tracking-widest">per year / per clinic</span>
          </div>
          
          {/* Output Cards Row */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Capacity Utilization</div>
              </div>
              <div className="text-3xl font2 font-bold text-white tracking-[0.1em]">${Math.round(results.capacityValue).toLocaleString()}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">20% Lift benchmark</div>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Users className="w-4 h-4 text-indigo-500" />
                <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Retention / Follow-thru</div>
              </div>
              <div className="text-3xl font2 font-bold text-white tracking-[0.1em]">${Math.round(results.retentionValue).toLocaleString()}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">12% Revenue Realization</div>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Settings className="w-4 h-4 text-emerald-500" />
                <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Admin Efficiency</div>
              </div>
              <div className="text-3xl font2 font-bold text-white tracking-[0.1em]">${Math.round(results.adminSavings).toLocaleString()}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">70% reduction in waste</div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimum Inputs Section */}
      <div className="grid lg:grid-cols-3 gap-12 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
        {/* Input 1 - Completed Visits / Month */}
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <label className="text-[12px] font-inter font-black text-[#5c5c5c] uppercase tracking-[0.1em]">Completed Visits / Month</label>
            </div>
            <span className="text-blue-600 font2 font-bold text-xl">{visitsPerMonth.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="2500" 
            step="1" 
            value={visitsPerMonth} 
            onChange={e => setVisitsPerMonth(+e.target.value)} 
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" 
          />
          <p className="text-[12px] text-[#5c5c5c] font-inter font-medium">Standard baseline for growing functional clinics.</p>
        </div>

        {/* Input 2 - Avg Revenue / Visit */}
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <label className="text-[12px] font-inter font-black text-[#5c5c5c] uppercase tracking-[0.1em]">Avg Revenue / Visit</label>
            </div>
            <span className="text-blue-600 font2 font-bold text-xl">${revPerVisit.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="2000" 
            step="10" 
            value={revPerVisit} 
            onChange={e => setRevPerVisit(+e.target.value)} 
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" 
          />
          <p className="text-[12px] text-[#5c5c5c] font-inter font-medium">Includes consult fees + average labs/supplements.</p>
        </div>

        {/* Input 3 - Monthly Admin Payroll */}
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <label className="text-[12px] font-inter font-black text-[#5c5c5c] uppercase tracking-[0.1em]">Monthly Admin Payroll</label>
            </div>
            <span className="text-blue-600 font2 font-bold text-xl">${adminMonthlyCost.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="1000" 
            max="50000" 
            step="500" 
            value={adminMonthlyCost} 
            onChange={e => setAdminMonthlyCost(+e.target.value)} 
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" 
          />
          <p className="text-[12px] text-[#5c5c5c] font-inter font-medium">Total monthly cost for front desk, coordinators, and ops.</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-[12px] text-[#5c5c5c] font-inter uppercase tracking-widest font-bold">
          *Calculations based on Steer longitudinal care benchmarks for high-growth cash-pay clinics.
        </p>
      </div>
    </div>
  );
};

export default ROICalculator;
