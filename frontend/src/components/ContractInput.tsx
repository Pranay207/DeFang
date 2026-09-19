import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Sparkles, ArrowRight } from 'lucide-react';
import type { Language } from '../types';
import { getTranslation } from '../i18n';

interface ContractInputProps {
  inputText: string;
  onTextChange: (text: string) => void;
  onScan: (file?: File) => void;
  isLoading: boolean;
  currentLang?: Language;
}

export const ContractInput: React.FC<ContractInputProps> = ({
  inputText,
  onTextChange,
  onScan,
  isLoading,
  currentLang = 'en'
}) => {
  const t = getTranslation(currentLang);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf') || file.type.includes('text')) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
    } else {
      alert('Please upload a PDF or plain text document.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onScan(selectedFile);
    } else if (inputText.trim().length > 20) {
      onScan();
    }
  };

  const hasContent = (inputText.trim().length > 0 || !!selectedFile) && !isLoading;

  return (
    <div className="relative p-[1.5px] rounded-2xl overflow-hidden group">
      {/* Animated Centerpiece Glow Border (GPU-accelerated, slow cycle, low opacity) */}
      <div 
        className="absolute -inset-[100%] animate-spin-slow opacity-30 group-hover:opacity-55 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, rgba(239, 68, 68, 0.4) 0deg, rgba(249, 115, 22, 0.4) 90deg, rgba(56, 189, 248, 0.45) 180deg, rgba(147, 51, 234, 0.4) 270deg, rgba(239, 68, 68, 0.4) 360deg)'
        }}
      />

      <form onSubmit={handleFormSubmit} className="relative z-10 glass-panel rounded-2xl p-6 bg-slate-950/90 border border-white/10 shadow-glass">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center space-x-2">
              <span>{t.input.title}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.input.subtitle}
            </p>
          </div>

          {selectedFileName && (
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-sky-500/15 border border-sky-500/30 text-xs text-sky-300">
              <FileText className="w-3.5 h-3.5" />
              <span className="font-mono truncate max-w-[150px]">{selectedFileName}</span>
              <button 
                type="button" 
                onClick={() => { setSelectedFile(null); setSelectedFileName(null); }}
                className="text-slate-400 hover:text-white ml-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* PDF Upload Dropzone or Text Area */}
        <div className="space-y-4">
          {!selectedFile ? (
            <div className="relative">
              <textarea
                rows={8}
                value={inputText}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder={t.input.placeholder}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-4 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 transition-all resize-y leading-relaxed"
              />
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded">
                {inputText.length} {t.input.chars}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-slate-950/80 border border-sky-500/40 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-2">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono">{selectedFileName}</h4>
              <p className="text-xs text-slate-400 mt-1">{t.input.readyPdf}</p>
            </div>
          )}

          {/* Drag & drop helper / File input trigger */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div 
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer px-4 py-2.5 rounded-xl border border-dashed transition-all flex items-center space-x-2 text-xs ${
                dragActive 
                  ? 'border-sky-400 bg-sky-500/10 text-sky-300' 
                  : 'border-white/15 hover:border-white/30 text-slate-400 hover:text-slate-200 bg-slate-900/40'
              }`}
            >
              <UploadCloud className="w-4 h-4 text-sky-400" />
              <span>{t.input.uploadBtn}</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                accept=".pdf,.txt,.doc,.docx" 
                onChange={(e) => e.target.files && handleFile(e.target.files[0])} 
                className="hidden" 
              />
            </div>

            {/* Run Scan Button */}
            <button
              type="submit"
              disabled={isLoading || (!inputText.trim() && !selectedFile)}
              className={`flex-1 md:flex-initial flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 hover:from-red-400 hover:via-orange-400 hover:to-amber-300 text-slate-950 font-black text-sm tracking-wide transition-all duration-200 shadow-lg shadow-red-500/20 hover:shadow-red-500/35 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100 ${
                hasContent ? 'animate-scan-pulse' : ''
              }`}
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>{isLoading ? t.input.scanningBtn : t.input.scanBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Engine Transparency Subtitle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>
                {t.input.engineInfo}
              </span>
            </div>
            <span className="text-slate-500 text-[10px]">
              {t.input.offlineBadge}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
