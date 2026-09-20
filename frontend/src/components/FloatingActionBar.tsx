import React, { useState } from 'react';
import { Volume2, VolumeX, MessageCircle, Download, ArrowUp } from 'lucide-react';
import type { ScanResult, Language } from '../types';

interface FloatingActionBarProps {
  result: ScanResult;
  currentLang: Language;
  onOpenWhatsApp: () => void;
  onDownloadReport: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  result,
  currentLang,
  onOpenWhatsApp,
  onDownloadReport,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const getAudioSummaryText = () => {
    if (currentLang === 'kn') {
      return `DeFang ಶಾಸನಬದ್ಧ ಪರಿಶೀಲನೆ. ಒಟ್ಟು ${result.deny_count} ಉಲ್ಲಂಘನೆಗಳು, ₹${result.total_rupee_trap.toLocaleString('en-IN')} ಆರ್ಥಿಕ ಅಪಾಯ. ಸಹಿ ಮಾಡಬೇಡಿ.`;
    }
    if (currentLang === 'te') {
      return `DeFang చట్టపరమైన పరిశీలన. మొత్తం ${result.deny_count} నిబంధనల ఉల్లంఘనలు, ₹${result.total_rupee_trap.toLocaleString('en-IN')} ఆర్థిక నష్టం. సంతకం చేయవద్దు.`;
    }
    if (currentLang === 'hi') {
      return `DeFang कानूनी जांच सारांश: कुल ${result.deny_count} गंभीर उल्लंघन, ₹${result.total_rupee_trap.toLocaleString('en-IN')} का वित्तीय जोखिम। हस्ताक्षर न करें।`;
    }
    return `DeFang Legal Audit: ${result.deny_count} critical violations detected. Total ${result.total_rupee_trap.toLocaleString('en-IN')} Rupees at risk. Do not sign without amendment.`;
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported by your browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const text = getAudioSummaryText();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;

    const langCodeMap: Record<Language, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      kn: 'kn-IN',
      te: 'te-IN',
    };
    utterance.lang = langCodeMap[currentLang] || 'en-IN';

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-full px-3 sm:px-5 py-2 flex items-center gap-1.5 sm:gap-3 text-xs sm:text-sm text-slate-200">
        {/* Risk Badge Mini */}
        <div className="hidden md:flex items-center gap-1.5 pl-1 pr-2 border-r border-slate-700">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="font-semibold text-slate-300">
            {result.deny_count} Flags
          </span>
          <span className="text-amber-400 font-mono font-bold">
            ₹{result.total_rupee_trap.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Listen Audio */}
        <button
          onClick={handleToggleAudio}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
            isPlayingAudio
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
              : 'hover:bg-slate-800 text-slate-300 hover:text-white'
          }`}
          title="Listen to Executive Summary"
        >
          {isPlayingAudio ? (
            <>
              <VolumeX className="w-4 h-4 text-amber-400" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span className="hidden xs:inline">Listen</span>
            </>
          )}
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={onOpenWhatsApp}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-md hover:shadow-emerald-500/25 transition-all"
          title="WhatsApp Landlord Counter-Clauses"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span className="font-semibold">WhatsApp</span>
        </button>

        {/* Download Report */}
        <button
          onClick={onDownloadReport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white font-medium transition-all"
          title="Download Formal Evidence PDF / Report"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">Report</span>
        </button>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all ml-0.5"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
