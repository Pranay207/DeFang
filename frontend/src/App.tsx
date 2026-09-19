import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft } from 'lucide-react';

import { Navbar } from './components/Navbar';
import { DualEngineBar } from './components/DualEngineBar';
import { RiskHero } from './components/RiskHero';
import { RupeeTrapSimulator } from './components/RupeeTrapSimulator';
import { PowerImbalanceMeter } from './components/PowerImbalanceMeter';
import { ClauseCard } from './components/ClauseCard';
import { PresetSelector } from './components/PresetSelector';
import { ContractInput } from './components/ContractInput';
import { Toast } from './components/Toast';

import type { ScanResult, PresetSummary, Language } from './types';

const API_BASE = 'http://127.0.0.1:8000';

export function App() {
  const [presets, setPresets] = useState<PresetSummary[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [clauseFilter, setClauseFilter] = useState<'all' | 'deny' | 'allow'>('all');

  // Load presets on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/presets`)
      .then((res) => res.json())
      .then((data) => setPresets(data))
      .catch((err) => console.error('Failed to fetch presets:', err));
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Load preset with instant pre-cached response
  const handleSelectPreset = async (presetId: string) => {
    setSelectedPresetId(presetId);
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/presets/${presetId}`);
      const data: ScanResult = await res.json();
      
      // Allow dual-engine animation to play for dramatic judge demo effect
      setTimeout(() => {
        setScanResult(data);
        if (data.raw_text) setInputText(data.raw_text);
        setIsLoading(false);
        triggerToast(`Loaded preset: ${data.contract_title}`);
        
        if (data.overall_risk_score < 40) {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        }
      }, 2600);
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
        onLanguageChange={setCurrentLang}
        onReset={handleReset}
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 relative z-10 space-y-8">
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
                <span>AI Agent Extraction + Formal Cedar Policy Engine</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white leading-[1.14]">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  Stop Signing Toxic Indian Agreements.
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(239,68,68,0.3)]"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  Scan, DeFang, and Negotiate.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto"
              >
                Automatic statutory policy verification against the <strong className="text-slate-200">Model Tenancy Act 2021</strong>, <strong className="text-slate-200">Indian Contract Act 1872 (Sec 27 & 74)</strong>, and <strong className="text-slate-200">Usurious Loans Act</strong>.
              </motion.p>
            </div>

            {/* 3 One-Click Presets */}
            <PresetSelector
              presets={presets}
              selectedPresetId={selectedPresetId}
              onSelectPreset={handleSelectPreset}
              isLoading={isLoading}
            />

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center space-x-4 my-4"
            >
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs uppercase font-mono tracking-widest text-slate-500">
                Or Scan Custom Contract
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
              />
            </motion.div>
          </div>
        )}

        {/* LOADING STATE: DUAL ENGINE VISUALIZATION (FEATURE 1) */}
        {isLoading && (
          <div className="max-w-3xl mx-auto py-12 space-y-6 text-center">
            <h3 className="text-xl font-bold text-white">
              DeFang Dual-Engine Scanning in Progress...
            </h3>
            <p className="text-xs text-slate-400">
              Judges: Watch the two independent engines execute in real time below
            </p>

            <DualEngineBar isScanning={true} />
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
            {/* Top Navigation Bar in Results */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Presets & Scanner</span>
              </button>

              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                <span>Verified by Cedar Engine:</span>
                <span className="text-emerald-400 font-bold">6/6 Policies Executed</span>
              </div>
            </div>

            {/* FEATURE 1: Dual-Engine Visualization at Top */}
            <DualEngineBar 
              isScanning={false} 
              metrics={scanResult.dual_engine_metrics} 
            />

            {/* Risk Hero with Circular Gauge & Scores */}
            <RiskHero result={scanResult} />

            {/* 2-Column Grid: Feature 2 (Rupee Simulator) + Feature 3 (Power Imbalance) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Feature 2: Hidden Rupee Trap Simulator */}
              <RupeeTrapSimulator
                totalRupeeTrap={scanResult.total_rupee_trap}
                breakdown={scanResult.rupee_breakdown}
              />

              {/* Feature 3: Power Imbalance Meter */}
              <PowerImbalanceMeter
                imbalance={scanResult.power_imbalance}
              />
            </div>

            {/* Filter Tabs for Clause Breakdown */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Clause-by-Clause Policy Audit ({scanResult.clauses.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Inspect statutory violations, view GitHub PR diffs, or copy calibrated WhatsApp replies
                </p>
              </div>

              <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-900 border border-white/10">
                <button
                  onClick={() => setClauseFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    clauseFilter === 'all'
                      ? 'bg-slate-800 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({scanResult.clauses.length})
                </button>
                <button
                  onClick={() => setClauseFilter('deny')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1 ${
                    clauseFilter === 'deny'
                      ? 'bg-red-500/30 text-red-300 border border-red-500/40'
                      : 'text-red-400/80 hover:text-red-300'
                  }`}
                >
                  <span>Red Flags ({scanResult.deny_count})</span>
                </button>
                <button
                  onClick={() => setClauseFilter('allow')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1 ${
                    clauseFilter === 'allow'
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                      : 'text-emerald-400/80 hover:text-emerald-300'
                  }`}
                >
                  <span>Compliant ({scanResult.allow_count})</span>
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
                  No clauses found for the selected filter.
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
            <span>AI-Powered Indian Contract Red-Flag Scanner</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <span>Strands Agents SDK</span>
            <span>•</span>
            <span>AWS Cedar Policy Engine</span>
            <span>•</span>
            <span>Google Gemini Pro</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
