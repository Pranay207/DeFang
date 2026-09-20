import { ShieldAlert, Scale, RefreshCw, MessageCircle } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import type { Language } from '../types';
import { getTranslation } from '../i18n';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onReset?: () => void;
  onOpenWhatsAppBot?: () => void;
  hasResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onReset,
  onOpenWhatsAppBot,
  hasResult
}) => {
  const t = getTranslation(currentLang);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-amber-500 to-emerald-500 p-[2px] shadow-neon-red">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-white">
                De<span className="text-red-400">Fang</span>
              </span>
              <span className="text-xs uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 font-semibold">
                Bharat Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {t.navbar.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Dual Engine Badge */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs">
            <span className="flex items-center text-red-400 font-medium space-x-1.5">
              <Scale className="w-3.5 h-3.5" />
              <span className="text-slate-200 font-semibold">{t.navbar.engineBadge}</span>
            </span>
          </div>
        </div>

        {/* Actions & Language Switcher */}
        <div className="flex items-center space-x-3">
          {/* WhatsApp Legal Bot Simulator Button */}
          <button
            onClick={onOpenWhatsAppBot}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 rounded-lg transition-all hover:scale-105 shadow-sm shadow-emerald-500/20 cursor-pointer"
            title="Open DeFang WhatsApp Bot Assistant"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp Bot</span>
          </button>

          <LanguageToggle currentLang={currentLang} onLanguageChange={onLanguageChange} />

          {hasResult && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-lg transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.navbar.newScan}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
