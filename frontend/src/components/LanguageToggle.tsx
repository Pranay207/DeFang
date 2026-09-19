import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import type { Language } from '../types';

interface LanguageToggleProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLang,
  onLanguageChange
}) => {
  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'EN' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' }
  ];

  return (
    <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-900/90 border border-white/10 shadow-inner">
      <div className="pl-2 pr-1 text-slate-400">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <div className="flex items-center space-x-1">
        {languages.map((lang) => {
          const isActive = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className="relative px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors duration-150 text-slate-400 hover:text-slate-200"
            >
              {isActive && (
                <motion.div
                  layoutId="activeLangPill"
                  className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg shadow-md shadow-indigo-500/25"
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-150 ${isActive ? 'text-white' : ''}`}>
                {lang.native}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
