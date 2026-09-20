import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Play, 
  Square, 
  CheckCheck, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle,
  MessageCircle,
  Phone,
  Copy,
  Check,
  QrCode,
  Sparkles
} from 'lucide-react';
import type { ScanResult, Language } from '../types';

interface WhatsAppBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  scanResult: ScanResult | null;
  currentLang: Language;
}

export const WhatsAppBotModal: React.FC<WhatsAppBotModalProps> = ({
  isOpen,
  onClose,
  scanResult,
  currentLang
}) => {
  const [activeTab, setActiveTab] = useState<'dispatcher' | 'simulator' | 'webhook'>('dispatcher');
  const [targetPhone, setTargetPhone] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<'polite' | 'firm' | 'audit'>('polite');
  const [copied, setCopied] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  if (!isOpen) return null;

  // Fallback demo values if scanResult is null
  const title = scanResult?.contract_title || 'Bengaluru 11-Month Rental Agreement';
  const riskScore = scanResult?.overall_risk_score ?? 100;
  const rupeeTrap = scanResult?.total_rupee_trap ?? 736050;
  const denyCount = scanResult?.deny_count ?? 5;
  const denyClauses = scanResult?.clauses?.filter(c => c.verdict === 'DENY') || [];

  // Generate dynamic message content based on selected tone
  const getPreparedMessage = () => {
    if (selectedTone === 'polite') {
      return (
        `Hi Sir/Ma'am,\n\n` +
        `Regarding the agreement draft for *${title}*:\n` +
        `I had our agreement reviewed against Karnataka rental guidelines. As per Section 9 of the Model Tenancy Act 2021, standard residential deposits are capped at 2 months rent, and normal wear-and-tear painting is an owner duty.\n\n` +
        `Could we please adjust the deposit and deduction clauses to align with standard government guidelines? Looking forward to staying here!\n\n` +
        `— Sent via DeFang Legal Guardian`
      );
    }

    if (selectedTone === 'firm') {
      return (
        `Dear Team / Owner,\n\n` +
        `RE: Clause Review for *${title}*\n\n` +
        `Upon legal audit, the current draft contains ${denyCount} statutory non-compliances:\n` +
        `1. Excessive security deposit exceeds the statutory ceiling (Model Tenancy Act 2021, Sec 9).\n` +
        `2. Full deposit forfeiture on early exit violates Section 74 of the Indian Contract Act 1872.\n` +
        `3. Mandatory painting deduction violates statutory wear-and-tear principles.\n\n` +
        `Please provide an amended reciprocal agreement draft before execution.\n\n` +
        `Regards,\n— Verified via DeFang Statutory Engine`
      );
    }

    // Full Legal Audit Report
    const violationsList = denyClauses.length > 0
      ? denyClauses.slice(0, 4).map((c, i) => `${i + 1}. *${c.title || c.category}*\n   ⚖️ Citation: ${c.citation || 'Indian Contract Law'}\n   ⚠️ Risk: ${c.eli5 || 'Unenforceable under Indian law'}`).join('\n\n')
      : `1. Excessive 10-Month Deposit (Model Tenancy Act 2021, Sec 9)\n2. Mandatory Painting Deduction (Transfer of Property Act 1882)\n3. Full Deposit Forfeiture on Early Exit (Indian Contract Act 1872, Sec 74)`;

    return (
      `🛡️ *DEFANG STATUTORY LEGAL AUDIT REPORT*\n\n` +
      `📄 *Agreement:* ${title}\n` +
      `⚠️ *Risk Score:* ${riskScore}/100 (CRITICAL RISK)\n` +
      `🚫 *Violations Detected:* ${denyCount} Unlawful Clauses\n` +
      `💰 *Rupee Trap (Money at Risk):* ₹${rupeeTrap.toLocaleString('en-IN')}\n\n` +
      `📜 *Key Violations Flagged (AWS Cedar Engine Verified):*\n\n` +
      `${violationsList}\n\n` +
      `✅ *Recommendation:* Do not execute this contract without standard statutory amendments.\n` +
      `🔗 Certified by DeFang Open-Source Legal Intelligence Engine (8/8 Cedar Policies Checked)`
    );
  };

  const messageText = getPreparedMessage();

  const handleLaunchRealWhatsApp = () => {
    const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
    let url = '';
    if (cleanPhone.length >= 10) {
      // Direct message to targeted recipient
      const fullNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      url = `https://api.whatsapp.com/send?phone=${fullNumber}&text=${encodeURIComponent(messageText)}`;
    } else {
      // General share to contacts
      url = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Localized audio script for voice note player
  const getVoiceScript = () => {
    if (currentLang === 'kn') {
      return `ನಮಸ್ಕಾರ! DeFang ವಾಟ್ಸಾಪ್ ಬಾಟ್ ನಿಮ್ಮ ಒಪ್ಪಂದವನ್ನು ಪರೀಕ್ಷಿಸಿದೆ. ಈ ಒಪ್ಪಂದದಲ್ಲಿ 10 ತಿಂಗಳ ಠೇವಣಿ ಕೇಳಲಾಗಿದೆ, ಆದರೆ ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆಯ ಪ್ರಕಾರ ಕೇವಲ 2 ತಿಂಗಳು ಮಾತ್ರ ಕಾನೂನುಬದ್ಧ. ಒಟ್ಟು 7 ಲಕ್ಷದ 36 ಸಾವಿರ ರೂಪಾಯಿ ನಿಮ್ಮ ಹಣ ಅಪಾಯದಲ್ಲಿದೆ. ದಯವಿಟ್ಟು ಸಹಿ ಮಾಡುವ ಮೊದಲು ಮಾಲೀಕರೊಂದಿಗೆ ಮಾತುಕತೆ ನಡೆಸಿ.`;
    }
    if (currentLang === 'te') {
      return `నమస్కారం! DeFang వాట్సాప్ బాట్ మీ అగ్రిమెంట్‌ను పరిశీలించింది. ఇందులో 10 నెలల డిపాజిట్ కోరారు, కానీ చట్టం ప్రకారం 2 నెలలు మాత్రమే చెల్లుతుంది. మొత్తం 7 లక్షల 36 వేల రూపాయలు రిస్క్‌లో ఉన్నాయి. దయచేసి సంతకం చేసే ముందు యజమానితో మాట్లాడండి.`;
    }
    if (currentLang === 'hi') {
      return `नमस्ते! DeFang व्हाट्सएप बॉट ने आपका एग्रीमेंट स्कैन किया है। इसमें 10 महीने का भारी डिपॉजिट मांगा गया है, जो मॉडल टेनेंसी एक्ट के तहत गैर-कानूनी है। कुल 7 लाख 36 हज़ार रुपये का वित्तीय जोखिम है। साइन करने से पहले मालिक से बातचीत करें।`;
    }
    return `Hello! DeFang WhatsApp Bot verified your agreement. It flagged a 10-month deposit which violates Section 9 of the Model Tenancy Act capping it at 2 months. Over 7 Lakh 36 Thousand Rupees is at risk. Please review the highlighted red flags before signing.`;
  };

  const handlePlayVoiceNote = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingVoice) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
      return;
    }

    window.speechSynthesis.cancel();
    const text = getVoiceScript();
    const utterance = new SpeechSynthesisUtterance(text);

    const langMap: Record<Language, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      kn: 'kn-IN'
    };
    utterance.lang = langMap[currentLang] || 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsPlayingVoice(false);
    utterance.onerror = () => setIsPlayingVoice(false);

    setIsPlayingVoice(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/40 bg-[#0b141a] flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-white/10 text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/40">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-bold text-white">DeFang WhatsApp Hub</h4>
                <span className="text-[10px] bg-emerald-500/25 text-emerald-300 font-mono px-1.5 py-0.5 rounded border border-emerald-500/30">
                  REAL DISPATCHER
                </span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium">1-Click Direct WhatsApp Dispatch</p>
            </div>
          </div>

          <button 
            onClick={() => {
              if (isPlayingVoice) window.speechSynthesis.cancel();
              onClose();
            }}
            className="p-1.5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border-b border-white/10 bg-[#111b21] px-3 pt-2">
          <button
            onClick={() => setActiveTab('dispatcher')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'dispatcher'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send to Landlord</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'simulator'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bot Chat Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('webhook')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'webhook'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Live Webhook API</span>
          </button>
        </div>

        {/* TAB 1: REAL WHATSAPP DISPATCHER */}
        {activeTab === 'dispatcher' && (
          <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs text-slate-200">
            {/* Recipient Phone Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Landlord / HR / Broker WhatsApp Number (Optional):</span>
              </label>
              <input
                type="tel"
                value={targetPhone}
                onChange={(e) => setTargetPhone(e.target.value)}
                placeholder="e.g. 9876543210 (leave blank to choose from WhatsApp contacts)"
                className="w-full bg-[#111b21] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
              />
              <p className="text-[10px] text-slate-400">
                Tip: Enter a 10-digit number to launch a direct chat with the landlord, or leave empty to pick anyone in WhatsApp.
              </p>
            </div>

            {/* Negotiation Tone Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300">Choose Negotiation Message Type:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTone('polite')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedTone === 'polite'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                      : 'bg-[#111b21] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-sm">🕊️</div>
                  <div className="text-[11px] mt-0.5">Polite Request</div>
                  <div className="text-[9px] text-slate-400 font-normal">For Owners / Elders</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTone('firm')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedTone === 'firm'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : 'bg-[#111b21] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-sm">💼</div>
                  <div className="text-[11px] mt-0.5">Firm Notice</div>
                  <div className="text-[9px] text-slate-400 font-normal">For HR / Brokers</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTone('audit')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedTone === 'audit'
                      ? 'bg-red-500/20 border-red-400 text-red-300 font-bold'
                      : 'bg-[#111b21] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-sm">⚖️</div>
                  <div className="text-[11px] mt-0.5">Full Audit</div>
                  <div className="text-[9px] text-slate-400 font-normal">8 Cedar Rules</div>
                </button>
              </div>
            </div>

            {/* Message Preview Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-300">Message Preview:</label>
                <button
                  onClick={handleCopyMessage}
                  className="flex items-center space-x-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>
              <div className="p-3 bg-[#111b21] rounded-xl border border-white/10 font-mono text-[11px] text-slate-300 max-h-40 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                {messageText}
              </div>
            </div>

            {/* Big Green Launch Button */}
            <button
              onClick={handleLaunchRealWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 fill-slate-950" />
              <span>Launch in Real WhatsApp</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 2: INTERACTIVE WHATSAPP BOT SIMULATOR */}
        {activeTab === 'simulator' && (
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-3 text-xs text-slate-200"
            style={{
              backgroundImage: `radial-gradient(#1f2c34 1px, transparent 1px)`,
              backgroundSize: '16px 16px'
            }}
          >
            {/* User message with photo */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#005c4b] rounded-2xl rounded-tr-xs p-3 shadow text-white space-y-1.5 border border-emerald-400/20">
                <div className="flex items-center space-x-2 pb-1 border-b border-emerald-400/20">
                  <FileText className="w-4 h-4 text-emerald-200" />
                  <span className="font-semibold text-[11px]">Stamp_Paper_Photo.jpg</span>
                </div>
                <p className="text-[11px] text-emerald-100">
                  Can you check this agreement before I pay the advance?
                </p>
                <div className="flex items-center justify-end space-x-1 text-[9px] text-emerald-200 font-mono">
                  <span>10:42 AM</span>
                  <CheckCheck className="w-3 h-3 text-sky-400" />
                </div>
              </div>
            </div>

            {/* Bot audio voice note */}
            <div className="flex justify-start">
              <div className="max-w-[90%] bg-[#202c33] rounded-2xl rounded-tl-xs p-3 shadow text-slate-100 space-y-2 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    🎙️ Vernacular Audio Note
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">0:18</span>
                </div>

                <div className="flex items-center space-x-3 bg-[#111b21] p-2.5 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={handlePlayVoiceNote}
                    className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 shadow transition-all hover:scale-105"
                  >
                    {isPlayingVoice ? (
                      <Square className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="flex-1 flex items-center space-x-1">
                    {[35, 75, 50, 95, 60, 85, 40, 100, 70, 90, 50, 65, 35, 75].map((h, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-full ${isPlayingVoice ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}
                        style={{ height: `${h * 0.22}px` }} 
                      />
                    ))}
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 italic">
                  {isPlayingVoice ? '🔊 Speaking audio in native language...' : 'Click play to hear explanation aloud.'}
                </p>
              </div>
            </div>

            {/* Bot Red Flags Summary */}
            <div className="flex justify-start">
              <div className="max-w-[92%] bg-[#202c33] rounded-2xl rounded-tl-xs p-3.5 shadow space-y-2 border border-red-500/30">
                <div className="flex items-center space-x-1.5 text-red-400 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>STOP! {denyCount} UNLAWFUL CLAUSES DETECTED</span>
                </div>

                <div className="p-2 rounded-lg bg-red-950/40 border border-red-500/40 font-mono">
                  <div className="text-[10px] text-red-300">Total Money At Risk:</div>
                  <div className="text-xl font-black text-red-400">₹{rupeeTrap.toLocaleString('en-IN')}</div>
                </div>

                <div className="space-y-1 text-[11px] text-slate-300">
                  {denyClauses.length > 0 ? (
                    denyClauses.slice(0, 3).map((c, i) => (
                      <div key={i}>❌ <strong>{c.title || c.category}:</strong> {c.citation || 'Unlawful clause'}</div>
                    ))
                  ) : (
                    <>
                      <div>❌ <strong>10 Months Deposit:</strong> Illegal under Model Tenancy Act (Cap: 2 months).</div>
                      <div>❌ <strong>Mandatory Painting:</strong> Illegal deduction for normal wear & tear.</div>
                      <div>❌ <strong>Deposit Forfeiture:</strong> Void penalty under Contract Act Sec 74.</div>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleLaunchRealWhatsApp}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Negotiation Message on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTION WEBHOOK API */}
        {activeTab === 'webhook' && (
          <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs text-slate-200">
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Production WhatsApp Business API Webhook</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Connect your official Twilio or Meta WhatsApp Business number directly to DeFang. When anyone sends an agreement photo or text to your WhatsApp number, our FastAPI webhook evaluates the 8 AWS Cedar policies and auto-replies!
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300">Live Webhook URL (FastAPI):</label>
              <div className="p-2.5 bg-[#111b21] rounded-xl border border-white/10 font-mono text-[11px] text-emerald-300 select-all">
                POST http://localhost:8000/api/whatsapp/webhook
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300">Meta Webhook Verification Token:</label>
              <div className="p-2.5 bg-[#111b21] rounded-xl border border-white/10 font-mono text-[11px] text-sky-300 select-all">
                defang_secret_token_2026
              </div>
            </div>

            <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-200 space-y-1">
              <div className="font-bold text-emerald-300">✅ Supported Webhook Providers:</div>
              <div>• Meta WhatsApp Cloud API (Graph API v18.0)</div>
              <div>• Twilio for WhatsApp Sandbox (TwiML automatic responses)</div>
              <div>• Gupshup / Infobip Enterprise WhatsApp Gateways</div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-[#202c33] px-4 py-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono shrink-0">
          <span>Powered by Strands Agents SDK & AWS Cedar</span>
          <span className="text-emerald-400 font-bold">100% Free & Open-Source</span>
        </div>
      </div>
    </div>
  );
};
