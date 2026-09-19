import { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import { 
  AlertOctagon, 
  CheckCircle2, 
  GitPullRequest, 
  MessageSquare, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  Info
} from 'lucide-react';
import type { Clause, Language } from '../types';

interface ClauseCardProps {
  clause: Clause;
  currentLang: Language;
  onCopyToast: (message: string) => void;
}

export const ClauseCard: React.FC<ClauseCardProps> = ({
  clause,
  currentLang,
  onCopyToast
}) => {
  const [showDiff, setShowDiff] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [activeTab, setActiveTab] = useState<'polite' | 'firm' | 'legal'>('polite');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const isDeny = clause.verdict === 'DENY';

  // Get ELI5 based on selected language
  const getEli5 = () => {
    if (currentLang === 'hi' && clause.eli5_hi) return clause.eli5_hi;
    if (currentLang === 'te' && clause.eli5_te) return clause.eli5_te;
    return clause.eli5;
  };

  const handleCopyWhatsApp = (text: string, toneName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(toneName);
    onCopyToast(`Copied ${toneName} message to clipboard!`);
    setTimeout(() => {
      setCopiedTab(null);
    }, 2000);
  };

  // Custom dark theme styles for react-diff-viewer to mirror GitHub PR diff
  const diffViewerStyles = {
    variables: {
      dark: {
        diffViewerBackground: '#0d1117',
        diffViewerColor: '#c9d1d9',
        addedBackground: '#0f2d1e',
        addedColor: '#7ee787',
        removedBackground: '#37181c',
        removedColor: '#ffa198',
        wordAddedBackground: '#1f6f3e',
        wordRemovedBackground: '#7d1e26',
        addedGutterBackground: '#0f2d1e',
        removedGutterBackground: '#37181c',
        gutterBackground: '#0d1117',
        gutterBackgroundDark: '#090d13',
        highlightBackground: '#2a2d3d',
        highlightGutterBackground: '#2a2d3d',
        codeFoldGutterBackground: '#161b22',
        codeFoldBackground: '#161b22',
        emptyLineBackground: '#0d1117',
        gutterColor: '#8b949e',
        addedGutterColor: '#7ee787',
        removedGutterColor: '#ffa198',
      }
    },
    line: {
      fontFamily: 'JetBrains Mono, Menlo, monospace',
      fontSize: '12px',
      lineHeight: '1.6',
    },
    gutter: {
      minWidth: '32px',
      padding: '0 8px',
    }
  };

  return (
    <div className={`glass-panel rounded-2xl p-5 border transition-all duration-200 ${
      isDeny 
        ? 'border-red-500/30 hover:border-red-500/50 shadow-neon-red/30' 
        : 'border-emerald-500/20 hover:border-emerald-500/40'
    }`}>
      {/* Clause Header & Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isDeny ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'}`} />
          <h4 className="text-sm font-bold text-white tracking-wide">
            Clause {clause.clause_id}: {clause.title}
          </h4>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            {clause.category}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Statutory Citation Badge */}
          <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-indigo-950/60 border border-indigo-500/30 text-[11px] font-mono text-indigo-300">
            <Scale className="w-3 h-3 text-indigo-400" />
            <span className="truncate max-w-[220px]">{clause.citation}</span>
          </div>

          {/* Verdict Badge */}
          <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold font-mono uppercase tracking-wider flex items-center space-x-1 ${
            isDeny 
              ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
          }`}>
            {isDeny ? (
              <>
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>DENY</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ALLOW</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Original Contract Text Box */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 font-mono text-xs text-slate-300 leading-relaxed mb-3">
        <p className="line-clamp-3 hover:line-clamp-none transition-all">
          "{clause.clause_text}"
        </p>
      </div>

      {/* ELI5 Plain Explanation (Multilingual) */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-sky-500/20 flex items-start space-x-2.5 mb-4">
        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-sky-400 mr-1.5 uppercase text-[10px] tracking-wider">
            {currentLang === 'hi' ? 'सरल भाषा में व्याख्या:' : currentLang === 'te' ? 'సరళ వివరణ:' : 'Plain English Breakdown:'}
          </span>
          {getEli5()}
        </div>
      </div>

      {/* Action Buttons for DENY clauses: Diff Mode & WhatsApp Diplomat */}
      {isDeny && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          {/* Feature 4: Side-by-Side GitHub Diff Mode Toggle */}
          <button
            onClick={() => {
              setShowDiff(!showDiff);
              if (!showDiff) setShowWhatsApp(false);
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
              showDiff 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
                : 'bg-slate-800/80 text-indigo-300 hover:bg-slate-700/80 border border-indigo-500/20'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>{showDiff ? 'Close Diff View' : 'GitHub PR Diff Mode'}</span>
            {showDiff ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
          </button>

          {/* Feature 5: 3-Tone WhatsApp Diplomat Toggle */}
          <button
            onClick={() => {
              setShowWhatsApp(!showWhatsApp);
              if (!showWhatsApp) setShowDiff(false);
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              showWhatsApp 
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30' 
                : 'bg-slate-800/80 text-emerald-300 hover:bg-slate-700/80 border border-emerald-500/20'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{showWhatsApp ? 'Close Diplomat' : '3-Tone WhatsApp Diplomat'}</span>
            {showWhatsApp ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
          </button>
        </div>
      )}

      {/* FEATURE 4 RENDER: Side-by-Side GitHub Diff Viewer */}
      {showDiff && (
        <div className="mt-4 rounded-xl border border-white/15 overflow-hidden bg-[#0d1117] shadow-2xl">
          {/* GitHub PR Diff Header */}
          <div className="px-4 py-2 bg-[#161b22] border-b border-white/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400 font-bold">+fair_clause.legal</span>
              <span className="text-slate-500">vs</span>
              <span className="text-red-400 font-bold">-unfair_clause.legal</span>
            </div>
            <span className="text-[11px] text-slate-400">
              Aligned with {clause.citation}
            </span>
          </div>

          <div className="p-1">
            <ReactDiffViewer
              oldValue={clause.clause_text}
              newValue={clause.rewritten_fair_text}
              splitView={true}
              useDarkTheme={true}
              styles={diffViewerStyles}
              leftTitle="Original Unfair Clause (DENY)"
              rightTitle="Fair Statutory Replacement (Model Tenancy / Contract Act)"
            />
          </div>
        </div>
      )}

      {/* FEATURE 5 RENDER: 3-Tone WhatsApp Diplomat */}
      {showWhatsApp && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950/90 border border-emerald-500/30 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                WhatsApp Negotiation Diplomat
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Ready-to-send calibrated responses
            </span>
          </div>

          {/* 3 Tone Tabs */}
          <div className="flex space-x-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 mb-4">
            <button
              onClick={() => setActiveTab('polite')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'polite'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Polite / Respectful (Elders)
            </button>
            <button
              onClick={() => setActiveTab('firm')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'firm'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Professional / Firm (HR & Clients)
            </button>
            <button
              onClick={() => setActiveTab('legal')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'legal'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Legal Shield (Statutory Cite)
            </button>
          </div>

          {/* WhatsApp Chat Bubble Mockup */}
          <div className="bg-[#0b141a] p-4 rounded-xl border border-emerald-500/20 relative">
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#005c4b] text-white p-3.5 rounded-2xl rounded-tr-none shadow-md relative group">
                <p className="text-xs leading-relaxed font-sans select-all whitespace-pre-line">
                  {activeTab === 'polite' 
                    ? clause.whatsapp.polite 
                    : activeTab === 'firm' 
                    ? clause.whatsapp.firm 
                    : clause.whatsapp.legal}
                </p>
                <div className="flex items-center justify-end space-x-1 mt-2 text-[10px] text-emerald-200/70">
                  <span>10:42 AM</span>
                  <span className="text-sky-300">✓✓</span>
                </div>
              </div>
            </div>

            {/* Copy Button */}
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => handleCopyWhatsApp(
                  activeTab === 'polite' 
                    ? clause.whatsapp.polite 
                    : activeTab === 'firm' 
                    ? clause.whatsapp.firm 
                    : clause.whatsapp.legal,
                  activeTab === 'polite' ? 'Polite' : activeTab === 'firm' ? 'Professional' : 'Legal Shield'
                )}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-all shadow"
              >
                {copiedTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
