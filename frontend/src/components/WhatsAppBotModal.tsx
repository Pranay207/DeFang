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
  MessageCircle
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
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  if (!isOpen) return null;

  // Fallback demo data if no scan result yet
  const title = scanResult?.contract_title || 'Bengaluru 11-Month Rental Agreement';
  const riskScore = scanResult?.overall_risk_score ?? 100;
  const rupeeTrap = scanResult?.total_rupee_trap ?? 736050;
  const denyCount = scanResult?.deny_count ?? 5;

  // Localized voice script
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

  const handleOpenRealWhatsApp = () => {
    const message = `*DeFang Legal Audit Summary*\n\n` +
      `📄 *Document:* ${title}\n` +
      `⚠️ *Risk Score:* ${riskScore}/100 (CRITICAL)\n` +
      `🚫 *Red Flags Flagged:* ${denyCount} Unlawful Clauses\n` +
      `💰 *Rupee Trap (Money at Risk):* ₹${rupeeTrap.toLocaleString('en-IN')}\n\n` +
      `⚖️ *Top Statutory Violations (AWS Cedar Verified):*\n` +
      `1. Excessive 10-Month Deposit (Model Tenancy Act 2021, Sec 9)\n` +
      `2. Mandatory ₹35,000 Painting Deduction (Normal Wear & Tear Protection)\n` +
      `3. Full Deposit Forfeiture on Early Exit (Indian Contract Act 1872, Sec 74)\n\n` +
      `👉 *Action:* Negotiate with landlord before signing. Verified by DeFang.`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* WhatsApp Chat Window Card */}
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/30 bg-[#0b141a] flex flex-col max-h-[90vh]">
        {/* WhatsApp Top Header Bar */}
        <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-white/10 text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/30">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#202c33]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="text-sm font-bold text-white">DeFang Legal Bot</h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-1.5 py-0.2 rounded">VERIFIED</span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium">Online • Instant Legal Scanner</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-slate-300">
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
        </div>

        {/* WhatsApp Chat Content Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-slate-200"
          style={{
            backgroundImage: `radial-gradient(#1f2c34 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        >
          {/* Encryption Notice */}
          <div className="text-center my-2">
            <span className="inline-block bg-[#182229] text-[#ffd279] text-[10px] px-3 py-1 rounded-lg border border-[#ffd279]/20 font-mono">
              🔒 End-to-end encrypted • 100% on-device private
            </span>
          </div>

          {/* User Message: Sent Stamp Paper Photo */}
          <div className="flex justify-end">
            <div className="max-w-[82%] bg-[#005c4b] rounded-2xl rounded-tr-xs p-3 shadow-md text-white space-y-2 border border-emerald-400/20">
              <div className="flex items-center space-x-2 pb-1 border-b border-emerald-400/20">
                <FileText className="w-4 h-4 text-emerald-200" />
                <span className="font-semibold text-[11px] truncate">100_Rupee_Stamp_Paper.jpg</span>
              </div>
              <p className="text-[11px] text-emerald-100">
                Hi DeFang, room owner is forcing me to sign this paper and pay advance today. Is it safe to sign?
              </p>
              <div className="flex items-center justify-end space-x-1 text-[9px] text-emerald-200 font-mono">
                <span>10:42 AM</span>
                <CheckCheck className="w-3 h-3 text-sky-400" />
              </div>
            </div>
          </div>

          {/* Bot Message: 1. Audio Voice Note */}
          <div className="flex justify-start">
            <div className="max-w-[88%] bg-[#202c33] rounded-2xl rounded-tl-xs p-3 shadow-md text-slate-100 space-y-2 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>Audio Summary (Vernacular)</span>
                </span>
                <span className="text-[9px] font-mono text-slate-400">0:18</span>
              </div>

              {/* Playable Voice Waveform Bar */}
              <div className="flex items-center space-x-3 bg-[#111b21] p-2.5 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={handlePlayVoiceNote}
                  className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/40 transition-all hover:scale-105 active:scale-95"
                >
                  {isPlayingVoice ? (
                    <Square className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>

                {/* Animated Waveform Visual */}
                <div className="flex-1 flex items-center space-x-1">
                  {[40, 75, 55, 90, 60, 80, 45, 100, 70, 85, 50, 65, 40, 70].map((h, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isPlayingVoice 
                          ? 'bg-emerald-400 animate-pulse' 
                          : 'bg-slate-600'
                      }`}
                      style={{ 
                        height: `${h * 0.25}px`,
                        animationDelay: `${i * 0.08}s` 
                      }} 
                    />
                  ))}
                </div>
              </div>

              <p className="text-[10px] text-slate-300 italic">
                {isPlayingVoice ? '🔊 Playing audio...' : 'Tap play button to listen aloud in your language.'}
              </p>
              
              <div className="flex items-center justify-end text-[9px] text-slate-400 font-mono">
                <span>10:42 AM</span>
              </div>
            </div>
          </div>

          {/* Bot Message: 2. Red Flags & Rupee Trap */}
          <div className="flex justify-start">
            <div className="max-w-[92%] bg-[#202c33] rounded-2xl rounded-tl-xs p-3.5 shadow-md text-slate-100 space-y-2.5 border border-red-500/30">
              <div className="flex items-center space-x-1.5 text-red-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>STOP! DO NOT SIGN THIS AGREEMENT</span>
              </div>

              <div className="p-2 rounded-lg bg-red-950/40 border border-red-500/40 space-y-1">
                <div className="text-[10px] uppercase font-mono text-red-300 font-bold">Total Money At Risk:</div>
                <div className="text-xl font-black text-red-400 font-mono">
                  ₹{rupeeTrap.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-300">
                  {denyCount} illegal clauses detected by AWS Cedar policy engine.
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-300 leading-relaxed">
                <div>❌ <strong>10 Months Deposit:</strong> Illegal. Model Tenancy Act caps it at 2 months.</div>
                <div>❌ <strong>₹35,000 Painting Deduction:</strong> Invalid. Wear & tear is owner's duty.</div>
                <div>❌ <strong>100% Forfeiture:</strong> Unlawful penal clause under Contract Act Sec 74.</div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleOpenRealWhatsApp}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Negotiation Message on WhatsApp</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </button>
              </div>

              <div className="flex items-center justify-end text-[9px] text-slate-400 font-mono">
                <span>10:43 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Bottom Input Bar */}
        <div className="bg-[#202c33] px-3 py-2.5 border-t border-white/10 flex items-center space-x-2 shrink-0">
          <input
            type="text"
            readOnly
            value="Forwarding negotiation message to landlord..."
            className="flex-1 bg-[#111b21] border border-white/10 rounded-full px-4 py-1.5 text-xs text-slate-300 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleOpenRealWhatsApp}
            className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/30"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
