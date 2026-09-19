import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Code, Sparkles, ArrowRight } from 'lucide-react';
import type { PresetSummary, Language } from '../types';
import { getTranslation } from '../i18n';

interface PresetSelectorProps {
  presets: PresetSummary[];
  selectedPresetId: string | null;
  onSelectPreset: (presetId: string) => void;
  isLoading: boolean;
  currentLang?: Language;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  presets,
  selectedPresetId,
  onSelectPreset,
  isLoading,
  currentLang = 'en'
}) => {
  const t = getTranslation(currentLang);

  const getIcon = (id: string) => {
    if (id.includes('rental')) return <Home className="w-5 h-5 text-red-400" />;
    if (id.includes('internship')) return <Briefcase className="w-5 h-5 text-amber-400" />;
    return <Code className="w-5 h-5 text-sky-400" />;
  };

  const getLocalizedContent = (preset: PresetSummary) => {
    if (preset.id.includes('rental')) {
      return { title: t.presets.rentalTitle, description: t.presets.rentalDesc };
    }
    if (preset.id.includes('internship')) {
      return { title: t.presets.internshipTitle, description: t.presets.internshipDesc };
    }
    if (preset.id.includes('freelance')) {
      return { title: t.presets.freelanceTitle, description: t.presets.freelanceDesc };
    }
    return { title: preset.title, description: preset.description };
  };

  const getSeverityStyle = (badge: string) => {
    if (badge.includes('HIGH') || badge.includes('High')) {
      return {
        badge: 'bg-red-500/15 text-red-400 border border-red-500/30',
        hover: 'hover:border-red-500/40 hover:shadow-[0_12px_30px_-6px_rgba(239,68,68,0.25)]'
      };
    }
    if (badge.includes('SEVERE') || badge.includes('Severe')) {
      return {
        badge: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
        hover: 'hover:border-rose-500/40 hover:shadow-[0_12px_30px_-6px_rgba(244,63,94,0.25)]'
      };
    }
    return {
      badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
      hover: 'hover:border-amber-500/40 hover:shadow-[0_12px_30px_-6px_rgba(245,158,11,0.25)]'
    };
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          {t.presets.header}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {presets.map((preset, index) => {
          const isSelected = selectedPresetId === preset.id;
          const severity = getSeverityStyle(preset.badge);
          const localized = getLocalizedContent(preset);

          return (
            <motion.button
              key={preset.id}
              disabled={isLoading}
              onClick={() => onSelectPreset(preset.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.45 + index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
              className={`text-left p-4 rounded-xl transition-all duration-200 relative overflow-hidden group ${
                isSelected
                  ? 'bg-slate-900 border-2 border-sky-400 shadow-neon-cyan ring-1 ring-sky-400/30'
                  : `glass-panel border border-white/10 ${severity.hover}`
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-lg bg-slate-950/80 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  {getIcon(preset.id)}
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${severity.badge}`}>
                  {preset.badge}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors duration-200">
                {localized.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {localized.description}
              </p>

              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{preset.category}</span>
                <span className="flex items-center space-x-1.5 text-sky-400 font-semibold group-hover:text-sky-300 transition-colors">
                  <span className="relative pb-0.5 inline-block">
                    {t.presets.loadPreset}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-sky-400 group-hover:w-full transition-all duration-300 ease-out" />
                  </span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

