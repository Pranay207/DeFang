import { ShieldAlert, Scale, RefreshCw } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import type { Language } from '../types';
import { getTranslation } from '../i18n';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onReset?: () => void;
  onOpenCedarArchitecture?: () => void;
  hasResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onReset,
  onOpenCedarArchitecture,
  hasResult
}) => {
  const t = getTranslation(currentLang);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2">
        {/* Brand */}
        <div
          onClick={onReset}
          className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink-0"
        >
          {/* Custom DeFang Cyber-Shield Logo */}
          <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg
              className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow-[0_0_16px_rgba(239,68,68,0.45)]"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="shieldGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FF6B00" />
                  <stop offset="45%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="innerShieldGrad" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0B0F19" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <linearGradient id="bladeGrad" x1="8" y1="36" x2="40" y2="12" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
                <linearGradient id="fangGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Outer Cyber Shield Frame */}
              <path
                d="M24 3 L41 9.5 V23 C41 33.5 24 45 24 45 C24 45 7 33.5 7 23 V9.5 L24 3 Z"
                fill="url(#shieldGrad)"
              />

              {/* Inner Dark Cavity */}
              <path
                d="M24 5.5 L38.5 11.2 V22.5 C38.5 31.8 24 42.5 24 42.5 C24 42.5 9.5 31.8 9.5 22.5 V11.2 L24 5.5 Z"
                fill="url(#innerShieldGrad)"
                stroke="#1E293B"
                strokeWidth="1"
              />

              {/* Subtle Ashoka Geometric Scales of Justice Grid in background */}
              <circle cx="24" cy="24" r="11" stroke="#334155" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
              <line x1="24" y1="13" x2="24" y2="35" stroke="#334155" strokeWidth="0.75" opacity="0.3" />
              <line x1="13" y1="24" x2="35" y2="24" stroke="#334155" strokeWidth="0.75" opacity="0.3" />

              {/* The Toxic Fangs (Downward predatory canine fangs) */}
              <path
                d="M17 16 L21 27 L18 27 Z"
                fill="url(#fangGrad)"
                opacity="0.9"
              />
              <path
                d="M31 16 L27 27 L30 27 Z"
                fill="url(#fangGrad)"
                opacity="0.9"
              />

              {/* The DeFang Slicing Strike: A sharp statutory lightning blade cutting the fangs */}
              <path
                d="M11 32 L37 14"
                stroke="url(#bladeGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#glow)"
              />

              {/* Central Verified Statutory Diamond / Pivot */}
              <path
                d="M24 20 L27 24 L24 28 L21 24 Z"
                fill="#10B981"
                filter="url(#glow)"
              />
            </svg>

            {/* Active Live Policy Verification Dot */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.8)]">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                De<span className="text-red-400">Fang</span>
              </span>
              <span className="inline-flex items-center text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 font-bold shadow-sm whitespace-nowrap">
                Bharat Edition
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400 font-medium">
              {t.navbar.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Dual Engine Badge / Architecture Trigger */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            type="button"
            onClick={onOpenCedarArchitecture}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/70 hover:bg-slate-800/90 text-xs transition-all cursor-pointer group shadow-sm"
            title="Inspect AWS Cedar Policy Engine & Architecture"
          >
            <span className="flex items-center text-emerald-400 font-medium space-x-1.5">
              <Scale className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span className="text-slate-200 font-semibold group-hover:text-white">{t.navbar.engineBadge}</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Inspect
            </span>
          </button>
        </div>

        {/* Actions & Language Switcher */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          <LanguageToggle currentLang={currentLang} onLanguageChange={onLanguageChange} />

          {hasResult && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1 sm:space-x-1.5 px-2 py-1.5 sm:px-3 sm:py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-lg transition-all"
              title={t.navbar.newScan}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.navbar.newScan}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
