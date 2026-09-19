import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSpring } from 'framer-motion';
import { AlertOctagon, CheckCircle2, ShieldAlert, FileText, Landmark } from 'lucide-react';
import type { ScanResult } from '../types';

interface RiskHeroProps {
  result: ScanResult;
}

export const RiskHero: React.FC<RiskHeroProps> = ({ result }) => {
  const [displayScore, setDisplayScore] = useState(0);

  // Framer motion animated counter
  const spring = useSpring(0, { stiffness: 45, damping: 15 });

  useEffect(() => {
    spring.set(result.overall_risk_score);
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayScore(Math.round(latest));
    });
    return () => unsubscribe();
  }, [result.overall_risk_score, spring]);

  const isDanger = result.overall_risk_score >= 70;
  const isWarn = result.overall_risk_score >= 40 && result.overall_risk_score < 70;
  
  const scoreColor = isDanger ? '#ef4444' : isWarn ? '#f59e0b' : '#10b981';
  const glowClass = isDanger ? 'shadow-neon-red' : isWarn ? 'shadow-neon-amber' : 'shadow-neon-green';

  return (
    <div className={`glass-panel rounded-2xl p-6 border border-white/10 ${glowClass} relative overflow-hidden transition-all`}>
      {/* Background ambient gradient */}
      <div 
        className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: scoreColor }}
      />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left: Overall Risk Gauge & Score */}
        <div className="flex items-center space-x-6">
          <div className="w-28 h-28 shrink-0 relative">
            <CircularProgressbar
              value={displayScore}
              text={`${displayScore}`}
              styles={buildStyles({
                textSize: '26px',
                textColor: '#ffffff',
                pathColor: scoreColor,
                trailColor: 'rgba(255, 255, 255, 0.08)',
                pathTransition: 'stroke-dashoffset 0.5s ease 0s',
              })}
            />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded-md tracking-wider ${
                isDanger 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                  : isWarn 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {result.risk_level}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                DeFang Risk Score
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-white mt-1.5 tracking-tight">
              {result.contract_title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
              <span className="flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>{result.contract_category}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Landmark className="w-3.5 h-3.5 text-indigo-400" />
                <span>{result.jurisdiction}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Breakdown Pill Stats */}
        <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
          {/* DENY Card */}
          <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/20 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1 text-red-400 mb-1">
              <AlertOctagon className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase">Red Flags</span>
            </div>
            <span className="text-2xl font-extrabold text-red-400 font-mono">
              {result.deny_count}
            </span>
            <span className="text-[10px] text-slate-400">Cedar DENY</span>
          </div>

          {/* ALLOW Card */}
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1 text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase">Compliant</span>
            </div>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              {result.allow_count}
            </span>
            <span className="text-[10px] text-slate-400">Cedar ALLOW</span>
          </div>

          {/* Total Clauses */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-1 text-slate-400 mb-1">
              <ShieldAlert className="w-4 h-4 text-sky-400" />
              <span className="text-[11px] font-bold uppercase">Analyzed</span>
            </div>
            <span className="text-2xl font-extrabold text-white font-mono">
              {result.total_clauses}
            </span>
            <span className="text-[10px] text-slate-400">Total Clauses</span>
          </div>
        </div>
      </div>
    </div>
  );
};
