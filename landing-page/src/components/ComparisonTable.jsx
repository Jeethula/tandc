import React from 'react';
import { Check, X, Shield, Minus, Sparkles } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    feature: 'Monthly Subscription Cost',
    blind: '$0 (Surrender rights)',
    saas: '$15 - $29 / month',
    clarity: '100% Free & Open Source ($0)',
    highlight: true
  },
  {
    feature: 'Data Privacy & Logging',
    blind: 'Surrendered to 50+ brokers',
    saas: 'Logged on vendor servers',
    clarity: '100% Client-Side (Zero logs)',
    highlight: true
  },
  {
    feature: 'BYOK (Bring Your Own Key)',
    blind: 'Not applicable',
    saas: 'No (Locked into vendor markup)',
    clarity: 'Yes (Gemini / Claude / OpenAI)',
    highlight: false
  },
  {
    feature: 'Offline Local LLM (Ollama)',
    blind: 'No',
    saas: 'No',
    clarity: 'Yes (100% air-gapped support)',
    highlight: true
  },
  {
    feature: 'Automatic ToS Detection Badge',
    blind: 'No',
    saas: 'Manual click required',
    clarity: 'Automatic Heuristic Badge',
    highlight: false
  },
  {
    feature: 'Map-Reduce for 50+ Page EULAs',
    blind: 'No',
    saas: 'Truncates at token limit',
    clarity: 'Full Multi-Stage Synthesis',
    highlight: false
  },
  {
    feature: 'Chrome Side Panel Integration',
    blind: 'No',
    saas: 'Intrusive popup modal',
    clarity: 'Native Chrome Side Panel API',
    highlight: false
  },
  {
    feature: 'Open Source (MIT License)',
    blind: 'No',
    saas: 'Proprietary closed source',
    clarity: '100% Auditable GitHub Repo',
    highlight: false
  }
];

export default function ComparisonTable() {
  return (
    <section id="comparison" className="py-24 relative overflow-hidden bg-[#060913]/70 border-t border-slate-800/80">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why T&C Clarity Stands Alone</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            The Ultimate <span className="text-gradient-cyan">Security Comparison</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            See how T&C Clarity stacks up against blindly trusting corporations and expensive closed-source SaaS alternatives.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="glass-panel overflow-hidden border border-blue-500/30 shadow-2xl shadow-blue-950/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#090F20]">
                  <th className="p-4 sm:p-6 text-xs sm:text-sm font-bold font-mono text-slate-400 uppercase tracking-wider w-2/5">
                    Feature & Security Metric
                  </th>
                  <th className="p-4 sm:p-6 text-xs sm:text-sm font-bold font-mono text-slate-400 uppercase tracking-wider w-1/5 text-center">
                    Blindly Clicking "Agree"
                  </th>
                  <th className="p-4 sm:p-6 text-xs sm:text-sm font-bold font-mono text-slate-400 uppercase tracking-wider w-1/5 text-center">
                    Paid SaaS Extensions
                  </th>
                  <th className="p-4 sm:p-6 text-xs sm:text-sm font-bold font-mono text-cyan-300 uppercase tracking-wider w-1/5 text-center bg-blue-950/40 border-l border-r border-blue-500/40">
                    <span className="flex items-center justify-center gap-1.5 text-white">
                      <Shield className="w-4 h-4 text-cyan-400" /> T&C Clarity (BYOK)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={`hover:bg-slate-800/30 transition-colors ${row.highlight ? 'bg-blue-500/5' : ''}`}
                  >
                    <td className="p-4 sm:p-5 font-semibold text-slate-200">
                      {row.feature}
                    </td>

                    <td className="p-4 sm:p-5 text-center text-red-400 font-mono text-xs">
                      {row.blind}
                    </td>

                    <td className="p-4 sm:p-5 text-center text-slate-400 font-mono text-xs">
                      {row.saas}
                    </td>

                    <td className="p-4 sm:p-5 text-center font-bold text-cyan-300 font-mono text-xs bg-blue-950/30 border-l border-r border-blue-500/40">
                      {row.clarity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
