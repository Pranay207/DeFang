import React, { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { IndianRupee, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import type { RupeeTrapItem, Language } from '../types';
import { getTranslation } from '../i18n';

interface RupeeTrapSimulatorProps {
  totalRupeeTrap: number;
  breakdown: RupeeTrapItem[];
  currentLang?: Language;
}

export const RupeeTrapSimulator: React.FC<RupeeTrapSimulatorProps> = ({
  totalRupeeTrap,
  breakdown,
  currentLang = 'en'
}) => {
  const t = getTranslation(currentLang);
  const [displayAmount, setDisplayAmount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  // Framer Motion spring counter for smooth count-up
  const spring = useSpring(0, { stiffness: 40, damping: 14 });

  useEffect(() => {
    spring.set(totalRupeeTrap);
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayAmount(Math.round(latest));
    });
    return () => unsubscribe();
  }, [totalRupeeTrap, spring]);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-red-500/30 relative overflow-hidden shadow-neon-red">
      {/* Subtle pulse glow background */}
      <div className="absolute -inset-10 bg-gradient-to-r from-red-600/15 via-orange-600/10 to-amber-600/5 rounded-full blur-3xl animate-hero-pulse pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-300">
                {t.rupeeTrap.title}
              </h3>
              <p className="text-xs text-slate-400">
                {t.rupeeTrap.subtitle}
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-mono font-bold">
            {breakdown.length} {t.rupeeTrap.trapCount}
          </span>
        </div>

        {/* Hero Metric: Large Count-Up Number with Pulse Glow */}
        <div className="my-6 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl md:text-5xl font-extrabold text-red-400 font-mono">
              ₹
            </span>
            <motion.span 
              className="text-4xl md:text-6xl font-black font-mono tracking-tight bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent drop-shadow-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {displayAmount.toLocaleString('en-IN')}
            </motion.span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center space-x-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              {t.rupeeTrap.alertBanner}
            </span>
          </p>
        </div>

        {/* Expand / Collapse Button */}
        {breakdown.length > 0 && (
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white py-1 transition-colors"
            >
              <span>{t.rupeeTrap.breakdownToggle} ({breakdown.length})</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Expandable Breakdown Cards */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2.5 mt-3"
                >
                  {breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-red-500/20 hover:border-red-500/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-white">
                            Clause {item.clause_id}: {item.title}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-mono">
                            {item.citation}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{item.reason}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-bold text-amber-400 font-mono">
                          +₹{item.amount_inr.toLocaleString('en-IN')}
                        </span>
                        <span className="block text-[10px] text-slate-400 uppercase tracking-wider">
                          {t.rupeeTrap.atRisk}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
