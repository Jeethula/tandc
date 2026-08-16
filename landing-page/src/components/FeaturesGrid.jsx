import React from 'react';
import { 
  Radar, Layers, Split, Cpu, Download, ShieldCheck, 
  Sparkles, Terminal, FileCode, CheckSquare, Zap, Eye
} from 'lucide-react';

const FEATURES = [
  {
    icon: Radar,
    title: 'Auto-Detection Heuristics',
    tag: 'BACKGROUND ENGINE',
    desc: 'Analyzes page URLs, title tags, semantic headers, and phrase density scoring. Automatically lights up the extension action badge without interrupting normal browsing.',
    benefit: 'Zero manual copy-pasting required.'
  },
  {
    icon: Split,
    title: 'Map-Reduce for 50+ Page EULAs',
    tag: 'LONG DOCUMENT ENGINE',
    desc: 'Never worry about LLM context truncation. Documents exceeding 30,000 characters are automatically partitioned into coherent chunks and synthesized in parallel.',
    benefit: 'Zero hidden traps missed in long fine print.'
  },
  {
    icon: Layers,
    title: 'Native Chrome Side Panel API',
    tag: 'SEAMLESS UI',
    desc: 'Leverages chrome.sidePanel to display a full 7-category risk audit side-by-side with your active webpage. Browse and read clauses simultaneously.',
    benefit: 'No intrusive popups covering your document.'
  },
  {
    icon: Cpu,
    title: 'Multi-Model Freedom',
    tag: 'BYOK & LOCAL LLM',
    desc: 'Compatible with Google Gemini 2.0 Flash / Pro, OpenAI GPT-4o, Anthropic Claude 3.5, and offline Local LLMs via Ollama (localhost:11434).',
    benefit: 'You choose speed, cost, and privacy level.'
  },
  {
    icon: Zap,
    title: 'SPA Route Mutation Observer',
    tag: 'MODERN WEB COMPLIANT',
    desc: 'Monitors client-side history transitions in Next.js, React, and Vue applications. Automatically detects dynamically injected legal agreements.',
    benefit: 'Works on modern web apps and modals.'
  },
  {
    icon: Download,
    title: '1-Click Report Export',
    tag: 'AUDIT & COMPLIANCE',
    desc: 'Export structured Markdown or plain-text compliance summaries with risk scores and timestamps. Perfect for legal teams, IT compliance, and personal records.',
    benefit: 'Keep permanent proof of what you agreed to.'
  }
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#070B14]">
      
      {/* Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built For Power & Security</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Engineered To Outsmart <br />
            <span className="text-gradient-cyan">Corporate Legal Tricks</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Every feature in T&C Clarity is architected for maximum speed, bulletproof privacy, and zero data compromise.
          </p>
        </div>

        {/* Features 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-blue-500/50 group"
              >
                <div className="space-y-4">
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-500/20">
                      <Icon className="w-6 h-6 text-cyan-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-cyan-400 font-mono">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{feature.benefit}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
