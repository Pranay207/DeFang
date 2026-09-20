import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Printer, Share2, Download, History, MessageCircle, ShieldCheck } from 'lucide-react';
import fallbackData from './presetsFallback.json';

import { Navbar } from './components/Navbar';
import { DualEngineBar } from './components/DualEngineBar';
import { RiskHero } from './components/RiskHero';
import { RupeeTrapSimulator } from './components/RupeeTrapSimulator';
import { PowerImbalanceMeter } from './components/PowerImbalanceMeter';
import { ClauseCard } from './components/ClauseCard';
import { PresetSelector } from './components/PresetSelector';
import { ContractInput } from './components/ContractInput';
import { Toast } from './components/Toast';
import { WhatsAppBotModal } from './components/WhatsAppBotModal';
import { ExecutiveVerdictBanner } from './components/ExecutiveVerdictBanner';
import { FloatingActionBar } from './components/FloatingActionBar';
import { CedarArchitectureModal } from './components/CedarArchitectureModal';

import type { ScanResult, PresetSummary, Language } from './types';
import { getTranslation } from './i18n';

const API_BASE = typeof window !== 'undefined' ? `http://${window.location.hostname}:8000` : 'http://127.0.0.1:8000';

export function App() {
  const [presets, setPresets] = useState<PresetSummary[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('defang_language');
      if (saved === 'hi' || saved === 'te' || saved === 'en' || saved === 'kn') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [clauseFilter, setClauseFilter] = useState<'all' | 'deny' | 'allow'>('all');
  const [showWhatsAppBot, setShowWhatsAppBot] = useState<boolean>(false);
  const [showCedarModal, setShowCedarModal] = useState<boolean>(false);
  const [recentAudits, setRecentAudits] = useState<ScanResult[]>(() => {
    try {
      const saved = localStorage.getItem('defang_recent_audits');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const t = getTranslation(currentLang);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('defang_language', lang);
    } catch {
      // fallback
    }
  };

  // Load presets on mount (with automatic offline fallback)
  useEffect(() => {
    fetch(`${API_BASE}/api/presets`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch presets');
        return res.json();
      })
      .then((data) => setPresets(data))
      .catch((err) => {
        console.warn('Backend unavailable, using pre-cached offline presets:', err);
        setPresets(fallbackData.presets as PresetSummary[]);
      });
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Share full text audit summary
  const handleShareSummary = () => {
    if (!scanResult) return;
    const deniedClauses = scanResult.clauses.filter((c) => c.verdict === 'DENY');
    const summaryText = [
      `🛡️ DEFANG LEGAL CONTRACT AUDIT REPORT`,
      `Document: ${scanResult.contract_title || 'Custom Indian Contract'}`,
      `Overall Risk Score: ${scanResult.overall_risk_score}/100 (${scanResult.risk_level})`,
      `Total Hidden Rupee Trap: ₹${scanResult.total_rupee_trap.toLocaleString('en-IN')}`,
      `Power Imbalance: ${scanResult.power_imbalance.landlord_pct}% Counterparty Bias`,
      `Red Flags Detected: ${scanResult.deny_count} of ${scanResult.clauses.length} clauses audited`,
      '',
      'STATUTORY VIOLATIONS DETECTED (Formal AWS Cedar Verification):',
      ...deniedClauses.map((c, i) => `${i + 1}. ${c.title || c.category} [${c.citation || 'Indian Law'}]\n   Verdict: DENY | Severity: ${c.severity}/100\n   Impact: ${c.eli5 || c.rule_text}`),
      '',
      'Verified deterministically by AWS Cedar Policy Engine & Strands Agents SDK.',
      'Audit report generated on DeFang: https://github.com/Pranay207/DeFang'
    ].join('\n');

    navigator.clipboard.writeText(summaryText);
    triggerToast(t.results.sharedToast);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const saveToRecentAudits = (result: ScanResult) => {
    try {
      const existingStr = localStorage.getItem('defang_recent_audits');
      const existing: ScanResult[] = existingStr ? JSON.parse(existingStr) : [];
      const filtered = existing.filter(item => item.contract_title !== result.contract_title);
      const updated = [result, ...filtered].slice(0, 5);
      setRecentAudits(updated);
      localStorage.setItem('defang_recent_audits', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save audit history:', e);
    }
  };

  // Download comprehensive statutory audit report as clean text file
  const handleDownloadReport = () => {
    if (!scanResult) return;
    const deniedClauses = scanResult.clauses.filter((c) => c.verdict === 'DENY');
    const summaryText = [
      `=============================================================`,
      `       DEFANG — INDIAN CONTRACT STATUTORY AUDIT REPORT       `,
      `=============================================================`,
      `Generated on: ${new Date().toLocaleString('en-IN')}`,
      `Document Title: ${scanResult.contract_title || 'Custom Indian Agreement'}`,
      `Jurisdiction: ${scanResult.jurisdiction || 'Indian Contract Law'}`,
      `Overall Risk Score: ${scanResult.overall_risk_score}/100 [${scanResult.risk_level}]`,
      `Total Rupee Trap Exposure: ₹${scanResult.total_rupee_trap.toLocaleString('en-IN')}`,
      `Contract Imbalance: ${scanResult.power_imbalance.landlord_pct}% Counterparty Bias`,
      `Red Flags Found: ${scanResult.deny_count} of ${scanResult.clauses.length} clauses analyzed`,
      `Verification Engine: AWS Cedar (8 Statutory Policies Executed)`,
      ``,
      `-------------------------------------------------------------`,
      `STATUTORY VIOLATIONS & UNLAWFUL COVENANTS:`,
      `-------------------------------------------------------------`,
      ...deniedClauses.map((c, i) => [
        `[#${i + 1}] ${c.title || c.category.toUpperCase()}`,
        `Statute: ${c.citation}`,
        `Cedar Policy: ${c.rule_text}`,
        `Severity: ${c.severity}/100`,
        `Original Clause: "${c.clause_text}"`,
        `Plain Explanation: ${c.eli5}`,
        `Proposed Fair Revision: "${c.rewritten_fair_text}"`,
        ``
      ].join('\n')),
      `-------------------------------------------------------------`,
      `Report certified by DeFang Open-Source Legal Intelligence Engine`,
      `https://github.com/Pranay207/DeFang`,
      `=============================================================`
    ].join('\n');

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DeFang_Audit_${(scanResult.contract_title || 'Contract').replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast(t.results.downloadedToast);
  };

  // Load preset with instant pre-cached response
  const handleSelectPreset = async (presetId: string) => {
    setSelectedPresetId(presetId);
    setIsLoading(true);

    try {
      let data: ScanResult;
      try {
        const res = await fetch(`${API_BASE}/api/presets/${presetId}`);
        if (!res.ok) throw new Error('Network error');
        data = await res.json();
      } catch {
        // Instant client fallback
        const fallbackResults = fallbackData.results as Record<string, ScanResult>;
        data = fallbackResults[presetId];
      }

      // Allow dual-engine animation to play for seamless visual progress
      setTimeout(() => {
        setScanResult(data);
        saveToRecentAudits(data);
        if (data.raw_text) setInputText(data.raw_text);
        setIsLoading(false);
        triggerToast(`Loaded preset: ${data.contract_title}`);

        if (data.overall_risk_score < 40) {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        }
      }, 2400);
    } catch (err) {
      console.error('Error fetching preset scan:', err);
      setIsLoading(false);
    }
  };

  // Custom text or PDF scan
  const handleScan = async (file?: File) => {
    setIsLoading(true);
    setSelectedPresetId(null);

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('text', inputText);
    }

    try {
      const res = await fetch(`${API_BASE}/api/scan`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Scan failed');
      }

      const data: ScanResult = await res.json();

      // Complete scanning state
      setTimeout(() => {
        setScanResult(data);
        saveToRecentAudits(data);
        setIsLoading(false);
        triggerToast('Scan complete! Dual-engine verified.');
        if (data.overall_risk_score < 40) {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
      }, 2400);
    } catch (err: any) {
      alert(`Scan failed: ${err.message}`);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setScanResult(null);
    setSelectedPresetId(null);
    setInputText('');
    setClauseFilter('all');
  };

  // Filter clauses
  const filteredClauses = scanResult?.clauses.filter((c) => {
    if (clauseFilter === 'deny') return c.verdict === 'DENY';
    if (clauseFilter === 'allow') return c.verdict === 'ALLOW';
    return true;
  }) || [];

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-red-500/30 selection:text-red-200">
      {/* Toast Notification */}
      <Toast message={toastMessage} />

      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onReset={handleReset}
        onOpenCedarArchitecture={() => setShowCedarModal(true)}
        hasResult={!!scanResult}
      />

      {/* Background Ambient Mesh & Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-25 z-0" />

      {/* Ambient Animated Gradient Orbs (low opacity, slow drift, brand red/orange/purple tones) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Orb 1: Red / Orange drift */}
        <div className="absolute top-12 left-1/4 -translate-x-1/2 w-[650px] h-[450px] rounded-full bg-gradient-to-tr from-red-600/12 via-orange-500/10 to-transparent blur-[120px] animate-ambient-1" />
        {/* Orb 2: Purple / Indigo drift */}
        <div className="absolute top-36 right-1/4 translate-x-1/2 w-[700px] h-[480px] rounded-full bg-gradient-to-bl from-purple-600/10 via-indigo-600/10 to-sky-500/8 blur-[130px] animate-ambient-2" />
        {/* Orb 3: Central warm glow */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-red-500/6 blur-[110px]" />
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 pt-4 pb-32 sm:pb-36 relative z-10 space-y-8">
        {/* LANDING / INPUT VIEW */}
        {!scanResult && !isLoading && (
          <div className="space-y-8">
            {/* Hero Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs font-semibold text-slate-300 shadow-inner"
              >
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                <span>{t.hero.enginePill}</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white leading-[1.14]">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t.hero.titleLine1}
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(239,68,68,0.3)]"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t.hero.titleLine2}
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto"
              >
                {t.hero.subtext}
              </motion.p>
            </div>

            {/* 3 One-Click Presets */}
            <PresetSelector
              presets={presets}
              selectedPresetId={selectedPresetId}
              onSelectPreset={handleSelectPreset}
              isLoading={isLoading}
              currentLang={currentLang}
            />

            {/* Recent Audits Shelf (Persisted in localStorage) */}
            {recentAudits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                    <History className="w-3.5 h-3.5 text-sky-400" />
                    <span>Recent Audits ({recentAudits.length})</span>
                  </div>
                  <button
                    onClick={() => {
                      setRecentAudits([]);
                      localStorage.removeItem('defang_recent_audits');
                    }}
                    className="text-[11px] text-slate-500 hover:text-red-400 font-mono transition-colors"
                  >
                    Clear History
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {recentAudits.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setScanResult(item);
                        if (item.raw_text) setInputText(item.raw_text);
                        triggerToast(`Restored: ${item.contract_title}`);
                      }}
                      className="p-3 text-left rounded-lg bg-slate-950/80 hover:bg-slate-800/80 border border-white/5 hover:border-sky-500/40 transition-all flex items-center justify-between group"
                    >
                      <div className="truncate pr-2">
                        <div className="text-xs font-semibold text-white group-hover:text-sky-300 truncate">
                          {item.contract_title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {item.deny_count} red flags • ₹{item.total_rupee_trap.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${item.overall_risk_score >= 70
                          ? 'text-red-400 bg-red-500/10 border-red-500/30'
                          : item.overall_risk_score >= 40
                            ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                            : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                        }`}>
                        {item.overall_risk_score}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center space-x-4 my-4"
            >
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs uppercase font-mono tracking-widest text-slate-400">
                {t.input.divider}
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </motion.div>

            {/* Custom Input Form */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContractInput
                inputText={inputText}
                onTextChange={setInputText}
                onScan={handleScan}
                isLoading={isLoading}
                currentLang={currentLang}
              />
            </motion.div>
          </div>
        )}

        {/* LOADING STATE: DUAL ENGINE VISUALIZATION (FEATURE 1) */}
        {isLoading && (
          <div className="max-w-3xl mx-auto py-12 space-y-6 text-center">
            <h3 className="text-xl font-bold text-white">
              {t.input.scanningBtn}
            </h3>
            <p className="text-xs text-slate-400">
              {t.dualEngine.subtitle}
            </p>

            <DualEngineBar isScanning={true} currentLang={currentLang} />
          </div>
        )}

        {/* RESULTS VIEW */}
        {scanResult && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Printable Certification Header (Visible only when printed or saved as PDF) */}
            <div className="print-banner p-4 mb-4 border border-slate-300 rounded-lg bg-slate-50 text-slate-900">
              <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-2">
                <h2 className="text-xl font-black tracking-tight text-slate-900">
                  DeFang — Indian Statutory Contract Risk Assessment
                </h2>
                <span className="text-xs font-mono font-bold text-red-600 uppercase border border-red-300 bg-red-50 px-2 py-0.5 rounded">
                  Official Verification
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Document: <strong className="text-slate-900">{scanResult.contract_title}</strong> | Verified via AWS Cedar Policy Engine & Strands SDK
              </p>
            </div>

            {/* Top Navigation Bar in Results */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-white/5 no-print">
              <button
                onClick={handleReset}
                className="self-start flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 hover:border-white/20 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.results.backBtn}</span>
              </button>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  onClick={handleShareSummary}
                  className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-sky-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
                  title="Copy formatted text audit summary"
                >
                  <Share2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t.results.shareBtn}</span>
                </button>

                <button
                  onClick={handleDownloadReport}
                  className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-emerald-500/40 text-xs font-semibold text-emerald-300 hover:text-white transition-all shadow-sm"
                  title="Download clean statutory text audit report"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.results.downloadBtn}</span>
                </button>

                {/* WhatsApp Bot Assistant Button */}
                <button
                  onClick={() => setShowWhatsAppBot(true)}
                  className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 hover:border-emerald-500/80 text-xs font-semibold text-emerald-300 hover:text-white transition-all shadow-sm shadow-emerald-500/20"
                  title="Open WhatsApp Legal Bot Assistant"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Bot</span>
                </button>

                <button
                  onClick={handlePrintReport}
                  className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-500/15 via-orange-500/15 to-amber-500/15 border border-red-500/30 hover:border-red-500/60 text-xs font-semibold text-red-300 hover:text-white transition-all shadow-sm"
                  title="Download or Print PDF Report"
                >
                  <Printer className="w-3.5 h-3.5 text-red-400" />
                  <span>{t.results.printBtn}</span>
                </button>
              </div>
            </div>

            {/* EXECUTIVE VERDICT BANNER: Executive Clarity & TL;DR */}
            <ExecutiveVerdictBanner
              result={scanResult}
              currentLang={currentLang}
              onOpenWhatsApp={() => setShowWhatsAppBot(true)}
              onDownloadReport={handleDownloadReport}
              onOpenCedarArchitecture={() => setShowCedarModal(true)}
            />

            {/* Risk Hero with Circular Gauge & Scores */}
            <RiskHero result={scanResult} currentLang={currentLang} />

            {/* 2-Column Grid: Feature 2 (Rupee Simulator) + Feature 3 (Power Imbalance) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Feature 2: Hidden Rupee Trap Simulator */}
              <RupeeTrapSimulator
                totalRupeeTrap={scanResult.total_rupee_trap}
                breakdown={scanResult.rupee_breakdown}
                currentLang={currentLang}
              />

              {/* Feature 3: Power Imbalance Meter */}
              <PowerImbalanceMeter
                imbalance={scanResult.power_imbalance}
                currentLang={currentLang}
              />
            </div>

            {/* Filter Tabs for Clause Breakdown */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {t.results.clauseAuditTitle} ({scanResult.clauses.length})
                </h3>
                <p className="text-xs text-slate-400">
                  {t.results.clauseAuditSubtitle}
                </p>
              </div>

              <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-900 border border-white/10">
                <button
                  onClick={() => setClauseFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${clauseFilter === 'all'
                      ? 'bg-slate-800 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {t.results.filterAll} ({scanResult.clauses.length})
                </button>
                <button
                  onClick={() => setClauseFilter('deny')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1 ${clauseFilter === 'deny'
                      ? 'bg-red-500/30 text-red-300 border border-red-500/40'
                      : 'text-red-400/80 hover:text-red-300'
                    }`}
                >
                  <span>{t.results.filterDeny} ({scanResult.deny_count})</span>
                </button>
                <button
                  onClick={() => setClauseFilter('allow')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1 ${clauseFilter === 'allow'
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                      : 'text-emerald-400/80 hover:text-emerald-300'
                    }`}
                >
                  <span>{t.results.filterAllow} ({scanResult.allow_count})</span>
                </button>
              </div>
            </div>

            {/* Staggered Clause Cards (Features 4, 5, 6) */}
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12
                  }
                }
              }}
            >
              {filteredClauses.map((clause) => (
                <motion.div
                  key={clause.clause_id}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <ClauseCard
                    clause={clause}
                    currentLang={currentLang}
                    onCopyToast={triggerToast}
                  />
                </motion.div>
              ))}

              {filteredClauses.length === 0 && (
                <div className="p-8 text-center glass-panel rounded-2xl border border-white/10 text-slate-400 text-xs font-mono">
                  {t.results.noClauses}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 bg-slate-950/80 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-400">DeFang</span>
            <span>—</span>
            <span>{t.navbar.brandSubtitle}</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <span>Strands Agents SDK</span>
            <span>•</span>
            <span>AWS Cedar Policy Engine</span>
            <span>•</span>
            <span>Deterministic Statutory Engine</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp Bot Modal (Feature 4: WhatsApp-First Assistant) */}
      <WhatsAppBotModal
        isOpen={showWhatsAppBot}
        onClose={() => setShowWhatsAppBot(false)}
        scanResult={scanResult}
        currentLang={currentLang}
      />

      {/* AWS Cedar Policy Engine & Architecture Modal (Technical Deep Dive & Policy Audit) */}
      <CedarArchitectureModal
        isOpen={showCedarModal}
        onClose={() => setShowCedarModal(false)}
      />

      {/* Floating Action Bar (Sticky Action Pill for Easy Interaction) */}
      {scanResult && !isLoading && (
        <FloatingActionBar
          result={scanResult}
          currentLang={currentLang}
          onOpenWhatsApp={() => setShowWhatsAppBot(true)}
          onDownloadReport={handleDownloadReport}
        />
      )}
    </div>
  );
}

export default App;
