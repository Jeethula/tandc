import React, { useState } from 'react';
import { 
  Download, Terminal, Copy, Check, Key, 
  ExternalLink, Sparkles, FolderOpen, ArrowRight, Shield
} from 'lucide-react';
import { ChromeIcon } from './Icons';

export default function InstallGuide() {
  const [copiedStep, setCopiedStep] = useState(null);

  const copyToClipboard = (text, stepKey) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepKey);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <section id="install" className="py-24 relative overflow-hidden">
      
      {/* Radial lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300">
            <Download className="w-3.5 h-3.5" />
            <span>Developer Mode & Open Source</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Up & Running in <span className="text-gradient-cyan">60 Seconds</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Install directly into Google Chrome, Brave, Edge, or Arc. No subscriptions, no credit cards, 100% open source.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="glass-panel p-6 flex flex-col justify-between space-y-4 border-blue-500/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center">
                  01
                </span>
                <span className="text-[10px] font-mono text-slate-400">Step 1 of 4</span>
              </div>
              <h3 className="text-base font-bold text-white">Download / Clone</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clone the repository or download the ZIP release onto your local machine.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="truncate">git clone https://...</span>
                <button
                  onClick={() => copyToClipboard('git clone https://github.com/Jeethula/tandc.git', 'step1')}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  {copiedStep === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass-panel p-6 flex flex-col justify-between space-y-4 border-blue-500/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center">
                  02
                </span>
                <span className="text-[10px] font-mono text-slate-400">Step 2 of 4</span>
              </div>
              <h3 className="text-base font-bold text-white">Enable Dev Mode</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Open Chrome Extensions manager and toggle the Developer Mode switch at the top right.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="truncate flex items-center gap-1">
                  <ChromeIcon className="w-3 h-3 text-cyan-400" />
                  <span>chrome://extensions</span>
                </span>
                <button
                  onClick={() => copyToClipboard('chrome://extensions', 'step2')}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  {copiedStep === 'step2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass-panel p-6 flex flex-col justify-between space-y-4 border-blue-500/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center">
                  03
                </span>
                <span className="text-[10px] font-mono text-slate-400">Step 3 of 4</span>
              </div>
              <h3 className="text-base font-bold text-white">Load Unpacked</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click <strong>"Load unpacked"</strong> and select the extension directory containing <code className="text-cyan-300 font-mono">manifest.json</code>.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-[11px] text-cyan-300 font-mono flex items-center gap-1.5">
              <FolderOpen className="w-3.5 h-3.5 shrink-0" />
              <span>Select t&c-addin folder</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="glass-panel p-6 flex flex-col justify-between space-y-4 border-blue-500/20">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center">
                  04
                </span>
                <span className="text-[10px] font-mono text-slate-400">Step 4 of 4</span>
              </div>
              <h3 className="text-base font-bold text-white">Add Free API Key</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Get a free Gemini API Key from Google AI Studio, paste it in Options, and you're protected!
              </p>
            </div>

            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-cyan-300 flex items-center justify-between group transition-colors"
            >
              <span>Get Free Gemini Key</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
