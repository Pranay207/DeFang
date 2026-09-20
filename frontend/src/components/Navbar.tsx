import { ShieldAlert, Scale, RefreshCw, MessageCircle } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import type { Language } from '../types';
import { getTranslation } from '../i18n';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onReset?: () => void;
  onOpenWhatsAppBot?: () => void;
  onOpenCedarArchitecture?: () => void;
  hasResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onReset,
  onOpenWhatsAppBot,
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
          <div className="relative shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-500 via-amber-500 to-emerald-500 p-[2px] shadow-neon-red">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-ping" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                De<span className="text-red-400">Fang</span>
              </span>
              <span className="hidden xs:inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 font-semibold">
                Bharat
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
          {/* WhatsApp Legal Bot Simulator Button */}
          <button
            onClick={onOpenWhatsAppBot}
            className="flex items-center space-x-1 sm:space-x-1.5 px-2 py-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 rounded-lg transition-all hover:scale-105 shadow-sm shadow-emerald-500/20 cursor-pointer"
            title="Open DeFang WhatsApp Bot Assistant"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp Bot</span>
          </button>

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
