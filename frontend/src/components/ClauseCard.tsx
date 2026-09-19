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
import { getTranslation, getLocalizedWhatsApp } from '../i18n';

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

  const t = getTranslation(currentLang);
  const policyId = clause.violations?.[0]?.policy_id || '';
  const localizedWhatsApp = getLocalizedWhatsApp(policyId, currentLang, clause.whatsapp);

  return (
    <div className={`glass-panel rounded-2xl p-5 border transition-all duration-200 relative overflow-hidden ${
      isDeny 
        ? 'border-red-500/30 hover:border-red-500/50 bg-slate-950/90 shadow-[0_4px_20px_-4px_rgba(239,68,68,0.15)]' 
        : 'border-emerald-500/20 hover:border-emerald-500/40 bg-slate-950/70'
    }`}>
      {/* Top Header: Badge, Category, Verdict */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2.5">
          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/10">
            Clause #{clause.clause_id}
          </span>
          <span className="text-xs font-semibold text-slate-300 capitalize">
            {clause.category.replace('_', ' ')}
          </span>
          <span className="text-[11px] text-slate-500 font-mono">•</span>
          <span className="text-[11px] text-slate-400 font-mono flex items-center space-x-1">
            <Scale className="w-3 h-3 text-slate-400" />
            <span>
              {t.clauseCard.favorsLabel}{' '}
              <strong className="text-slate-200 capitalize">
                {clause.favors === 'landlord' ? t.clauseCard.favorsLandlord : clause.favors === 'tenant' ? t.clauseCard.favorsTenant : t.clauseCard.favorsNeutral}
              </strong>
            </span>
          </span>
        </div>

        {/* Verdict Badge */}
        <div className="flex items-center space-x-2">
          {isDeny ? (
            <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm shadow-red-500/20">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>CEDAR DENY</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CEDAR ALLOW</span>
            </span>
          )}
        </div>
      </div>

      {/* Raw Clause Quote Box */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-200 mb-4 leading-relaxed relative">
        <p className="italic select-all">
          "{clause.clause_text}"
        </p>
      </div>

      {/* Violation Box (If DENY) */}
      {isDeny && clause.violations && clause.violations.length > 0 && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 mb-4 space-y-1.5">
          <div className="flex items-center space-x-2">
            <AlertOctagon className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-xs font-bold text-red-300">
              {clause.title || clause.violations[0].title}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 ml-auto">
              {t.clauseCard.severityLabel} {clause.severity}/100
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed pl-6">
            {clause.violations[0].description}
          </p>

          <div className="pl-6 pt-1 flex items-center space-x-2 text-[11px] font-mono text-red-400">
            <span>{t.clauseCard.statuteLabel}</span>
            <strong className="text-red-300 underline underline-offset-2">
              {clause.citation || clause.violations[0].citation}
            </strong>
          </div>

          {/* Cedar Policy Rule */}
          <div className="pl-6 pt-1 text-[11px] font-mono text-slate-400">
            <span>{t.clauseCard.ruleLabel} </span>
            <code className="text-amber-300 bg-slate-900/80 px-1.5 py-0.5 rounded text-[10px]">
              {clause.rule_text || clause.violations[0].rule_text}
            </code>
          </div>
        </div>
      )}

      {/* ELI5 Plain Explanation (Multilingual) */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-sky-500/20 flex items-start space-x-2.5 mb-4">
        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-sky-400 mr-1.5 uppercase text-[10px] tracking-wider">
            {t.clauseCard.plainLabel}
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
            <span>{showDiff ? t.clauseCard.diffClose : t.clauseCard.diffOpen}</span>
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
            <span>{showWhatsApp ? t.clauseCard.diplomatClose : t.clauseCard.diplomatOpen}</span>
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
              leftTitle={t.clauseCard.diffOriginal}
              rightTitle={t.clauseCard.diffFair}
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
                {t.clauseCard.diplomatTitle}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {t.clauseCard.diplomatSubtitle}
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
              {t.clauseCard.tonePolite}
            </button>
            <button
              onClick={() => setActiveTab('firm')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'firm'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.clauseCard.toneFirm}
            </button>
            <button
              onClick={() => setActiveTab('legal')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'legal'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.clauseCard.toneLegal}
            </button>
          </div>

          {/* WhatsApp Chat Bubble Mockup */}
          <div className="bg-[#0b141a] p-4 rounded-xl border border-emerald-500/20 relative">
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#005c4b] text-white p-3.5 rounded-2xl rounded-tr-none shadow-md relative group">
                <p className="text-xs leading-relaxed font-sans select-all whitespace-pre-line">
                  {localizedWhatsApp[activeTab] || clause.whatsapp[activeTab]}
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
                  localizedWhatsApp[activeTab] || clause.whatsapp[activeTab],
                  activeTab === 'polite' ? 'Polite' : activeTab === 'firm' ? 'Professional' : 'Legal Shield'
                )}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-all shadow"
              >
                {copiedTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.clauseCard.copiedBtn}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.clauseCard.copyBtn}</span>
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
