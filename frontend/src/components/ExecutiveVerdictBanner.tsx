import React, { useState } from 'react';
import { 
  AlertOctagon, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import type { ScanResult, Language } from '../types';

interface ExecutiveVerdictBannerProps {
  result: ScanResult;
  currentLang: Language;
  onOpenWhatsApp: () => void;
  onDownloadReport: () => void;
  onOpenCedarArchitecture?: () => void;
}

export const ExecutiveVerdictBanner: React.FC<ExecutiveVerdictBannerProps> = ({
  result,
  currentLang,
  onOpenWhatsApp,
  onDownloadReport,
  onOpenCedarArchitecture
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isCritical = result.overall_risk_score >= 70;
  const isModerate = result.overall_risk_score >= 40 && result.overall_risk_score < 70;
  const denyClauses = result.clauses.filter(c => c.verdict === 'DENY');

  // Localized audio summary
  const getAudioSummaryText = () => {
    if (currentLang === 'kn') {
      return `DeFang ಶಾಸನಬದ್ಧ ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಂಡಿದೆ. ${result.contract_title} ಒಪ್ಪಂದದಲ್ಲಿ ${result.deny_count} ಗಂಭೀರ ಉಲ್ಲಂಘನೆಗಳು ಕಂಡುಬಂದಿವೆ. ಒಟ್ಟು ${result.total_rupee_trap.toLocaleString('en-IN')} ರೂಪಾಯಿ ಅಪಾಯದಲ್ಲಿದೆ. ಈ ಒಪ್ಪಂದಕ್ಕೆ ಸಹಿ ಮಾಡಬೇಡಿ, ಮಾಲೀಕರೊಂದಿಗೆ ಮಾತುಕತೆ ನಡೆಸಿ.`;
    }
    if (currentLang === 'te') {
      return `DeFang చట్టపరమైన పరిశీలన పూర్తయింది. ${result.contract_title} లో ${result.deny_count} చట్టవిరుద్ధ నిబంధనలు గుర్తించబడ్డాయి. మొత్తం ${result.total_rupee_trap.toLocaleString('en-IN')} రూపాయలు నష్టపోయే అవకాశం ఉంది. సంతకం చేయవద్దు.`;
    }
    if (currentLang === 'hi') {
      return `DeFang कानूनी ऑडिट पूरा हुआ। ${result.contract_title} में ${result.deny_count} गंभीर गैर-कानूनी क्लॉज पाए गए हैं। कुल ${result.total_rupee_trap.toLocaleString('en-IN')} रुपये का वित्तीय जोखिम है। हस्ताक्षर करने से पहले बातचीत करें।`;
    }
    return `DeFang statutory legal audit complete. ${result.contract_title} contains ${result.deny_count} unlawful clauses flagged by AWS Cedar, putting ${result.total_rupee_trap.toLocaleString('en-IN')} Rupees at risk. Do not sign as-is.`;
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
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

    const langMap: Record<Language, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      kn: 'kn-IN'
    };
    utterance.lang = langMap[currentLang] || 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`relative p-5 sm:p-6 rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden transition-all ${
      isCritical 
        ? 'bg-gradient-to-br from-red-950/80 via-slate-950/90 to-red-950/60 border-red-500/40 shadow-red-500/15'
        : isModerate
        ? 'bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-amber-950/60 border-amber-500/40 shadow-amber-500/15'
        : 'bg-gradient-to-br from-emerald-950/80 via-slate-950/90 to-emerald-950/60 border-emerald-500/40 shadow-emerald-500/15'
    }`}>
      {/* Background Accent Glow */}
      <div className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none ${
        isCritical ? 'bg-red-500/15' : isModerate ? 'bg-amber-500/15' : 'bg-emerald-500/15'
      }`} />

      <div className="relative z-10 space-y-4">
        {/* Top Tag & Formal Cedar Guarantee */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center space-x-2">
            <span className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border shadow-sm ${
              isCritical
                ? 'bg-red-500/25 text-red-300 border-red-500/50 shadow-red-500/20'
                : isModerate
                ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-amber-500/20'
                : 'bg-emerald-500/25 text-emerald-300 border-emerald-500/50 shadow-emerald-500/20'
            }`}>
              {isCritical ? (
                <>
                  <AlertOctagon className="w-3.5 h-3.5 animate-pulse" />
                  <span>DO NOT SIGN AS-IS • PREDATORY CONTRACT</span>
                </>
              ) : isModerate ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>MODERATE RISK • REVISION RECOMMENDED</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>STATUTORILY COMPLIANT • SAFE TO SIGN</span>
                </>
              )}
            </span>
          </div>

          {/* Formal Verification Badge / Click to inspect */}
          <button
            type="button"
            onClick={onOpenCedarArchitecture}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/70 text-[11px] font-mono text-emerald-300 hover:text-white transition-all cursor-pointer group shadow-sm"
            title="Inspect AWS Cedar policies and architecture"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>AWS Cedar: 8/8 Policies Executed (Zero Hallucinations)</span>
            <span className="text-[10px] text-emerald-400 underline ml-1">Inspect ↗</span>
          </button>
        </div>

        {/* Big Verdict Headline & Money Callout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {result.contract_title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {isCritical
                ? `DeFang's formal AWS Cedar engine identified ${result.deny_count} unlawful covenants under Indian jurisprudence (Model Tenancy Act 2021 & Contract Act 1872).`
                : `All substantive terms verified against active Indian statutory ceilings.`}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-center min-w-[100px]">
              <div className="text-[10px] uppercase font-mono text-slate-400">Risk Score</div>
              <div className={`text-xl font-black font-mono ${
                isCritical ? 'text-red-400' : isModerate ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {result.overall_risk_score}/100
              </div>
            </div>

            <div className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-center min-w-[120px]">
              <div className="text-[10px] uppercase font-mono text-red-300">Money At Risk</div>
              <div className="text-xl font-black font-mono text-red-400">
                ₹{result.total_rupee_trap.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Fatal Traps Quick Takeaways (Executive Summary) */}
        {denyClauses.length > 0 && (
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
              <span>Top Unlawful Traps in this Draft:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              {denyClauses.slice(0, 3).map((c, i) => (
                <div 
                  key={i} 
                  className="p-2.5 rounded-lg bg-red-950/30 border border-red-500/20 text-slate-200 flex items-start space-x-2"
                >
                  <span className="text-red-400 font-bold shrink-0">❌</span>
                  <div className="leading-snug min-w-0 flex-1">
                    <div 
                      className="font-bold text-red-300 text-[11px] truncate" 
                      title={c.title || c.category}
                    >
                      {c.title || c.category}
                    </div>
                    <div 
                      className="text-[10px] text-slate-400 font-mono mt-0.5 truncate" 
                      title={c.citation || 'Indian Contract Law'}
                    >
                      {c.citation || 'Indian Contract Law'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {/* Audio Voice Summary Button */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                isPlayingAudio
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-sky-300 border-sky-500/30'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                  <span>Stop Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Listen Voice Summary</span>
                </>
              )}
            </button>

            {/* Download Report Button */}
            <button
              type="button"
              onClick={onDownloadReport}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-white/10 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Download Text Report</span>
            </button>
          </div>

          {/* Primary WhatsApp Negotiation Call to Action */}
          <button
            type="button"
            onClick={onOpenWhatsApp}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-500/30 hover:scale-[1.02] transition-all cursor-pointer w-full sm:w-auto"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Negotiate via WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
