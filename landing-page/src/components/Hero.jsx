import React, { useState } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle2, ChevronRight, Download, 
  Sparkles, Lock, Cpu, Eye, ArrowRight, Zap, RefreshCw, Flame, ExternalLink,
  Layers, Terminal, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Hero() {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [isScanning, setIsScanning] = useState(false);

  const triggerInstallConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#06B6D4', '#60A5FA', '#818CF8']
    });
    const installElement = document.getElementById('install');
    if (installElement) {
      installElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 800);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300 shadow-lg shadow-blue-900/30 backdrop-blur-md animate-pulse-glow">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-white font-bold">100% Privacy-First:</span>
            <span>BYOK & Local LLM Support (Zero Server Telemetry)</span>
            <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
          </div>
        </div>

        {/* Hero Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-display">
            You Signed Away <span className="text-gradient-danger">47 Legal Rights</span> This Month.
            <br />
            <span className="text-gradient-cyan">Do You Know Which Ones?</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Stop signing blank checks in the dark. <strong className="text-white font-semibold">T&C Clarity</strong> instantly audits 50-page Terms of Service and Privacy Policies in 3 seconds—exposing buried arbitration traps, sneaky billing, and AI data harvesting before you click <span className="text-red-400 font-mono font-medium">"I Agree"</span>.
          </p>

          {/* CTAs and Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={triggerInstallConfetti}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white btn-primary-gradient flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30 group cursor-pointer"
            >
              <Download className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
              <span>Get Chrome Extension Free</span>
              <span className="bg-white/20 text-white text-[11px] px-2 py-0.5 rounded-full font-mono">MIT</span>
            </button>

            <a
              href="#demo"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-semibold text-slate-200 btn-secondary-glass flex items-center justify-center gap-2 group hover:text-white"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Try Live Interactive Playground</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Trust proof bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-8 max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">0 Server Logs</span>
                <span className="text-slate-400 text-[10px]">100% Client-Side</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <Cpu className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">BYOK & Local LLM</span>
                <span className="text-slate-400 text-[10px]">Gemini / Ollama</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">3-Sec Audit</span>
                <span className="text-slate-400 text-[10px]">Instant Risk Score</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">Manifest V3</span>
                <span className="text-slate-400 text-[10px]">Chrome & Brave</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Interactive Chrome Browser Mockup */}
        <div className="mt-14 max-w-5xl mx-auto perspective-1000">
          <div className="relative rounded-2xl bg-gradient-to-b from-blue-500/30 via-slate-800/40 to-cyan-500/20 p-1 shadow-2xl shadow-blue-950/80 transition-transform duration-700 hover:rotate-x-1">
            
            {/* Inner Browser Container */}
            <div className="bg-[#090E1A] rounded-[15px] overflow-hidden border border-slate-800/90 shadow-2xl">
              
              {/* Browser Window Header */}
              <div className="bg-[#0D1527] px-4 py-3 border-b border-slate-800/80 flex items-center justify-between gap-4">
                {/* Traffic lights */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600"></div>
                </div>

                {/* Address Bar */}
                <div className="flex-1 max-w-xl mx-auto bg-[#070B14] border border-slate-700/60 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2 truncate">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">https://cloudvault-service.com/legal/terms-of-service</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-cyan-300 rounded font-semibold shrink-0">
                    ToS Page Detected
                  </span>
                </div>

                {/* Chrome Extension Toolbar */}
                <div className="flex items-center gap-2">
                  {/* Extension Icon with badge */}
                  <div className="relative group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/50 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Shield className="w-4 h-4 text-cyan-400 animate-pulse" />
                    </div>
                    {/* Badge */}
                    <span className="absolute -top-1 -right-1.5 px-1 py-0.2 bg-red-600 text-white text-[9px] font-black rounded-full border border-slate-900 shadow">
                      T&C
                    </span>
                  </div>
                </div>
              </div>

              {/* Browser Content Area (Split between Page & Sidepanel) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] bg-[#070B14]">
                
                {/* Simulated Webpage (Left 7 Cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-800/80 relative overflow-hidden flex flex-col justify-between">
                  {/* Background laser scanning line effect */}
                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06B6D4] animate-[scanLine_1.5s_linear_infinite]" />
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                        Simulated Web Agreement
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">Updated: August 2026</span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-200">
                      CloudVault Master Terms of Service & Data Rights Agreement
                    </h2>

                    <div className="space-y-3 text-xs text-slate-400 font-serif leading-relaxed select-none">
                      <p className="bg-red-500/10 p-2 rounded border-l-2 border-red-500 text-slate-300">
                        <strong className="text-red-400 font-sans">Section 8.4 (IP & License):</strong> By uploading, transmitting or storing any photos, media, documents, or content, you irrevocably grant Company a worldwide, perpetual, royalty-free license to use, reproduce, modify, distribute, and train artificial intelligence models without attribution or compensation...
                      </p>

                      <p className="bg-amber-500/10 p-2 rounded border-l-2 border-amber-500 text-slate-300">
                        <strong className="text-amber-400 font-sans">Section 14.1 (Mandatory Arbitration):</strong> You agree that all disputes shall be resolved via binding individual arbitration in Wilmington, Delaware, and you hereby irrevocably waive any right to participate in a class-action lawsuit...
                      </p>

                      <p className="text-slate-500 opacity-60">
                        Section 19.3 (Renewal): Subscriptions automatically convert to a non-refundable annual commitment billed at $199.99 unless cancelled at least 48 hours prior via certified postal mail...
                      </p>
                    </div>
                  </div>

                  {/* Bottom Controls */}
                  <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Content Script Active</span>
                    </div>
                    <button
                      onClick={handleRescan}
                      disabled={isScanning}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-cyan-400' : ''}`} />
                      <span>{isScanning ? 'Extracting & Analyzing...' : 'Re-scan Page'}</span>
                    </button>
                  </div>
                </div>

                {/* Simulated T&C Clarity Extension UI (Right 5 Cols) */}
                <div className="lg:col-span-5 bg-[#0B1224] p-5 sm:p-6 flex flex-col justify-between relative">
                  
                  {/* Extension Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold font-display text-white">T&C CLARITY AUDIT</span>
                      </div>
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-mono font-bold rounded-md border border-red-500/30 flex items-center gap-1">
                        <Flame className="w-3 h-3" /> HIGH RISK (8.8/10)
                      </span>
                    </div>

                    {/* Quick Plain English TL;DR */}
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                        Plain English Verdict
                      </span>
                      <p className="text-xs text-slate-200 leading-snug">
                        ⚠️ <strong>Danger:</strong> They take perpetual rights to train AI on your uploads, block court lawsuits via mandatory arbitration, and auto-bill yearly.
                      </p>
                    </div>

                    {/* Red Flags Tagger */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                        Critical Red Flags (3 Detected)
                      </span>
                      
                      <div className="space-y-1.5">
                        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <div className="text-[11px]">
                            <strong className="text-red-300 block font-semibold">AI Training on Private Photos</strong>
                            <span className="text-slate-400">Irrevocable, royalty-free license to use user content.</span>
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <div className="text-[11px]">
                            <strong className="text-red-300 block font-semibold">Class Action Waiver</strong>
                            <span className="text-slate-400">You forfeit legal rights to sue as a collective.</span>
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div className="text-[11px]">
                            <strong className="text-amber-300 block font-semibold">Postal-Only Cancellation Trap</strong>
                            <span className="text-slate-400">Requires certified mail to stop $199/yr renewal.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Extension Footer actions */}
                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      <span>Gemini 2.0 (BYOK)</span>
                    </div>

                    <button
                      onClick={() => setSidePanelOpen(!sidePanelOpen)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-cyan-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{sidePanelOpen ? 'Hide Full Side Panel' : 'Deep-Dive Side Panel'}</span>
                    </button>
                  </div>

                  {/* Expandable Side Panel Overlay */}
                  {sidePanelOpen && (
                    <div className="absolute inset-0 bg-[#070B14]/95 backdrop-blur-md p-5 rounded-r-2xl border-l border-blue-500/40 z-20 flex flex-col justify-between animate-in slide-in-from-right duration-200">
                      <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-cyan-400" /> Chrome Side Panel Audit
                          </span>
                          <button 
                            onClick={() => setSidePanelOpen(false)}
                            className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
                          >
                            Close ✕
                          </button>
                        </div>

                        <div className="text-[11px] space-y-2">
                          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                            <div className="flex justify-between font-bold text-red-400 mb-1">
                              <span>1. Content & AI Rights</span>
                              <span>HIGH RISK</span>
                            </div>
                            <p className="text-slate-300 text-[10px]">
                              User grants perpetual, royalty-free distribution & model training rights across worldwide networks.
                            </p>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                            <div className="flex justify-between font-bold text-red-400 mb-1">
                              <span>2. Dispute Resolution</span>
                              <span>HIGH RISK</span>
                            </div>
                            <p className="text-slate-300 text-[10px]">
                              Forced single-party arbitration in Delaware. No jury trial, no class actions permitted.
                            </p>
                          </div>

                          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                            <div className="flex justify-between font-bold text-amber-400 mb-1">
                              <span>3. Data Sharing & Brokers</span>
                              <span>MEDIUM RISK</span>
                            </div>
                            <p className="text-slate-300 text-[10px]">
                              Data shared with 14 marketing partners for ad retargeting and analytics.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 text-[10px] text-slate-500 font-mono flex justify-between">
                        <span>Map-Reduce Chunks: 2</span>
                        <span className="text-emerald-400">100% Local Browser Cache</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
