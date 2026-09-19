import React from 'react';
import { motion } from 'framer-motion';
import { Scale, AlertCircle } from 'lucide-react';
import type { PowerImbalance } from '../types';

interface PowerImbalanceMeterProps {
  imbalance: PowerImbalance;
}

export const PowerImbalanceMeter: React.FC<PowerImbalanceMeterProps> = ({ imbalance }) => {
  const landlordPct = imbalance.landlord_pct;
  const tenantPct = imbalance.tenant_pct;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Power Imbalance Meter
            </h3>
            <p className="text-xs text-slate-400">
              Contractual leverage distribution & reciprocal fairness evaluation
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full">
          {landlordPct}% Biased | {tenantPct}% Protected
        </span>
      </div>

      {/* Meter Labels */}
      <div className="flex justify-between items-end text-xs font-semibold mb-2">
        <div className="text-red-400 flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span>Counterparty / Landlord ({landlordPct}%)</span>
        </div>
        <div className="text-emerald-400 flex items-center space-x-1">
          <span>You / Tenant ({tenantPct}%)</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* Horizontal Gradient Bar (red -> yellow -> green) with sliding marker */}
      <div className="relative w-full h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 opacity-90" />

        {/* Sliding Indicator Marker */}
        <motion.div
          className="absolute top-0 bottom-0 w-3 bg-white rounded-full shadow-lg shadow-black/80 border-2 border-slate-950"
          initial={{ left: '0%' }}
          animate={{ left: `calc(${landlordPct}% - 6px)` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      {/* Scale Markers */}
      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1 px-1">
        <span>0% (Extreme One-Sided)</span>
        <span>50% (Equitable Balance)</span>
        <span>100% (Fully Protected)</span>
      </div>

      {/* Dynamically Generated Hypocrisy Callout */}
      {imbalance.hypocrisy_callout && (
        <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-amber-500/25 flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
              Contract Hypocrisy Detected
            </span>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              "{imbalance.hypocrisy_callout}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
