import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, CheckCircle2, Scale, Sparkles } from 'lucide-react';
import type { DualEngineMetrics, Language } from '../types';
import { getTranslation } from '../i18n';

interface DualEngineBarProps {
  isScanning: boolean;
  metrics?: DualEngineMetrics;
  onComplete?: () => void;
  currentLang?: Language;
}

const POLICIES_CHECKED = [
  'deposit_cap.cedar (Model Tenancy Act Sec 9)',
  'notice_asymmetry.cedar (Natural Justice)',
  'interest_rate_cap.cedar (Usurious Loans Act)',
  'non_compete_duration.cedar (Contract Act Sec 27)',
  'painting_deduction.cedar (Wear & Tear Sec 15)',
  'premature_exit_forfeiture.cedar (Sec 74 Liquidated Damages)'
];

export const DualEngineBar: React.FC<DualEngineBarProps> = ({
  isScanning,
  metrics: _metrics,
  onComplete,
  currentLang = 'en'
}) => {
  const t = getTranslation(currentLang);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [checkedPolicies, setCheckedPolicies] = useState<number[]>([]);

  useEffect(() => {
    if (isScanning) {
      const resetTimer = setTimeout(() => {
        setActiveStage(1);
        setCheckedPolicies([]);
      }, 0);

      // Stage 1: Strands Agent extraction (0 - 1400ms)
      const t1 = setTimeout(() => {
        setActiveStage(2);
      }, 1400);

      // Simulate Cedar checking individual policies
      const checkTimers = POLICIES_CHECKED.map((_, idx) => {
        return setTimeout(() => {
          setCheckedPolicies((prev) => [...prev, idx]);
        }, 1500 + idx * 250);
      });

      // Stage 2: Cedar Verification complete (3000ms)
      const t2 = setTimeout(() => {
        setActiveStage(3);
        if (onComplete) onComplete();
      }, 3000);

      return () => {
        clearTimeout(resetTimer);
        clearTimeout(t1);
        clearTimeout(t2);
        checkTimers.forEach(clearTimeout);
      };
    } else {
      const resetTimer = setTimeout(() => {
        setActiveStage(3);
        setCheckedPolicies([0, 1, 2, 3, 4, 5]);
      }, 0);
      return () => clearTimeout(resetTimer);
    }
  }, [isScanning, onComplete]);

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border border-white/10 shadow-glass overflow-hidden relative">
      {/* Background glow lines */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-indigo-500/5 to-emerald-500/5 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
            <h3 className="text-sm uppercase tracking-wider font-bold text-slate-300">
              {t.dualEngine.title}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.dualEngine.subtitle}
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className={`px-2.5 py-1 rounded-md font-mono transition-all ${
            activeStage >= 1 
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' 
              : 'bg-slate-800 text-slate-500'
          }`}>
            {t.dualEngine.stage1Badge}
          </span>
          <span className="text-slate-600">→</span>
          <span className={`px-2.5 py-1 rounded-md font-mono transition-all ${
            activeStage >= 2 
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
              : 'bg-slate-800 text-slate-500'
          }`}>
            {t.dualEngine.stage2Badge}
          </span>
        </div>
      </div>

      {/* Two-Stage Horizontal Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {/* Stage 1 Card: Strands Agent */}
        <div className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
          activeStage === 1
            ? 'bg-sky-950/40 border-sky-500/60 shadow-neon-cyan ring-1 ring-sky-500/40'
            : activeStage > 1
            ? 'bg-slate-900/60 border-sky-500/30'
            : 'bg-slate-900/30 border-white/5 opacity-50'
        }`}>
          {activeStage === 1 && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          )}

          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform ${
                activeStage === 1 ? 'bg-sky-500 text-slate-950 scale-105 animate-pulse' : 'bg-sky-500/20 text-sky-400'
              }`}>
                <Search className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-semibold text-white">{t.dualEngine.stage1Title}</h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono">
                    Gemini 2.5 Flash
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeStage === 1 
                    ? t.dualEngine.stage1Extracting 
                    : t.dualEngine.stage1Done}
                </p>
              </div>
            </div>

            {activeStage > 1 ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : activeStage === 1 ? (
              <Sparkles className="w-5 h-5 text-sky-400 animate-spin shrink-0" />
            ) : null}
          </div>

          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>{t.dualEngine.modelLabel}</span>
            <span>{t.dualEngine.durationLabel}</span>
          </div>
        </div>

        {/* Stage 2 Card: Cedar Policy Engine */}
        <div className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
          activeStage === 2
            ? 'bg-indigo-950/40 border-indigo-500/60 shadow-neon-amber ring-1 ring-indigo-500/40'
            : activeStage > 2
            ? 'bg-slate-900/60 border-emerald-500/30'
            : 'bg-slate-900/30 border-white/5 opacity-50'
        }`}>
          {activeStage === 2 && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-amber-400 to-emerald-400"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          )}

          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform ${
                activeStage === 2 ? 'bg-indigo-500 text-white scale-105 animate-pulse' : 'bg-indigo-500/20 text-indigo-400'
              }`}>
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-semibold text-white">{t.dualEngine.stage2Title}</h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                    Rust / cedarpy
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeStage === 2 
                    ? t.dualEngine.stage2Verifying 
                    : t.dualEngine.stage2Done}
                </p>
              </div>
            </div>

            {activeStage > 2 ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : activeStage === 2 ? (
              <ShieldCheck className="w-5 h-5 text-indigo-400 animate-bounce shrink-0" />
            ) : null}
          </div>

          {/* Mini policy checklist during verification */}
          <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-400">
            {POLICIES_CHECKED.slice(0, 4).map((pol, idx) => (
              <div key={idx} className="flex items-center space-x-1 truncate">
                {checkedPolicies.includes(idx) ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full border border-slate-600 shrink-0" />
                )}
                <span className="truncate">{pol.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
