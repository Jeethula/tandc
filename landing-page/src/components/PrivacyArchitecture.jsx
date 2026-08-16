import React, { useState } from 'react';
import { 
  Lock, Key, Cpu, ShieldCheck, ServerOff, Check, X, 
  ArrowRight, Sparkles, DollarSign, Terminal, Database, Laptop
} from 'lucide-react';

export default function PrivacyArchitecture() {
  const [modelMode, setModelMode] = useState('byok'); // 'byok', 'local', 'saas'
  const [scansPerMonth, setScansPerMonth] = useState(25);

  const saasMonthlyCost = 19;
  const byokCostPerScan = 0.0001; // Gemini 2.0 Flash or Free Tier
  const calculatedByokCost = (scansPerMonth * byokCostPerScan).toFixed(3);
  const yearlySavings = (saasMonthlyCost * 12).toFixed(0);

  return (
    <section id="byok" className="py-24 relative overflow-hidden">
      
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero-Knowledge Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            BYOK & Local LLM <br />
            <span className="text-gradient-cyan">100% Client-Side Privacy</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Why trust another company with the legal documents you read? T&C Clarity eliminates the middleman. Your data routes directly from your browser to Google Gemini API or runs completely offline on your own machine.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-900/80 border border-slate-800 p-1.5 rounded-2xl flex items-center gap-1">
            <button
              onClick={() => setModelMode('byok')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                modelMode === 'byok' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Bring Your Own Key (BYOK)</span>
            </button>

            <button
              onClick={() => setModelMode('local')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                modelMode === 'local' 
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Offline Local LLM (Ollama)</span>
            </button>
          </div>
        </div>

        {/* Visual Architecture Comparison Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
          
          {/* BAD: Traditional SaaS Middleman */}
          <div className="glass-panel p-6 sm:p-8 space-y-6 border-red-500/20 bg-red-950/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <X className="w-4 h-4 text-red-500" /> Traditional SaaS Extensions
                </span>
                <span className="text-[10px] font-mono text-red-400 bg-red-500/20 px-2 py-0.5 rounded border border-red-500/30">
                  Data Harvest Risk
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-200">
                How other tools compromise your privacy:
              </h3>

              {/* Data Flow Steps */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                  <Laptop className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-white block font-sans font-semibold">1. Your Chrome Browser</span>
                    <span className="text-[10px] text-slate-500">Reads webpage text & cookies</span>
                  </div>
                </div>

                <div className="flex justify-center text-red-400">
                  <span className="text-[10px]">↓ Transmits legal text over Internet ↓</span>
                </div>

                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                  <Database className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <span className="text-red-300 block font-sans font-semibold">2. Third-Party Backend Proxy</span>
                    <span className="text-[10px] text-red-400">Logs your IP address, browsing habits & prompts</span>
                  </div>
                </div>

                <div className="flex justify-center text-red-400">
                  <span className="text-[10px]">↓ Charges $20/month subscription ↓</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-white block font-sans font-semibold">3. Proprietary Blackbox AI</span>
                    <span className="text-[10px] text-slate-500">High fees, closed weights</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-red-500/15 text-xs text-red-300 font-medium">
              ❌ You pay $240/yr and surrender your browsing history to third-party server databases.
            </div>
          </div>

          {/* GOOD: T&C Clarity (BYOK & Local) */}
          <div className="glass-panel p-6 sm:p-8 space-y-6 border-cyan-500/40 bg-blue-950/20 flex flex-col justify-between shadow-2xl shadow-blue-950/60">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-cyan-400" /> T&C Clarity Architecture
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  Zero Server Middleman
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">
                {modelMode === 'byok' ? 'Direct Browser-to-Gemini Connection' : '100% Offline Local Machine Execution'}
              </h3>

              {/* Data Flow Steps */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-blue-500/30 flex items-center gap-3">
                  <Laptop className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-white block font-sans font-semibold">1. Your Chrome Browser</span>
                    <span className="text-[10px] text-cyan-300">API Key stored securely in chrome.storage.local</span>
                  </div>
                </div>

                <div className="flex justify-center text-cyan-400">
                  <span className="text-[10px]">
                    {modelMode === 'byok' ? '↓ Direct encrypted HTTPS to Google official endpoint ↓' : '↓ Runs 100% locally via localhost:11434 ↓'}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                  <ServerOff className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-emerald-300 block font-sans font-semibold">2. NO Intermediate Server</span>
                    <span className="text-[10px] text-slate-400">0 logs, 0 analytics, 0 telemetry, 0 database storage</span>
                  </div>
                </div>

                <div className="flex justify-center text-cyan-400">
                  <span className="text-[10px]">↓ Instant output straight to Side Panel ↓</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-blue-500/30 flex items-center gap-3">
                  <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-white block font-sans font-semibold">
                      {modelMode === 'byok' ? '3. Gemini 2.0 Flash (Free Tier Included)' : '3. Localhost Ollama / Llama 3 / Mistral'}
                    </span>
                    <span className="text-[10px] text-cyan-300">Ultra-fast, customizable system prompt</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/15 text-xs text-emerald-300 font-medium">
              ✅ 100% Free & Open Source. Your key stays in your local browser sandbox.
            </div>
          </div>

        </div>

        {/* Interactive Cost Calculator */}
        <div className="glass-panel p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Interactive Cost & Value Calculator
              </span>
              <h4 className="text-xl font-bold text-white mt-1">
                How Much Money Do You Save With BYOK?
              </h4>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block font-mono">Annual Savings:</span>
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                ${yearlySavings}/yr
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Estimated ToS & Privacy Policy Scans Per Month:</span>
              <span className="font-bold text-cyan-400 text-sm">{scansPerMonth} agreements</span>
            </div>
            
            <input
              type="range"
              min="5"
              max="150"
              value={scansPerMonth}
              onChange={(e) => setScansPerMonth(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>5 / mo (Casual)</span>
              <span>50 / mo (Active Web User)</span>
              <span>150 / mo (Power Researcher)</span>
            </div>
          </div>

          {/* Cost Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-mono">Traditional SaaS AI Subscription:</span>
              <div className="text-xl font-bold text-red-400 font-mono">
                ${saasMonthlyCost}.00 / month
              </div>
              <span className="text-[10px] text-slate-500 block">Flat recurring fee regardless of usage</span>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/40 space-y-1">
              <span className="text-xs text-cyan-300 font-mono">T&C Clarity with Google AI Studio Free Tier:</span>
              <div className="text-xl font-bold text-emerald-400 font-mono">
                $0.00 / month
              </div>
              <span className="text-[10px] text-cyan-400 block">15 requests/min completely free under Google AI Studio</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
