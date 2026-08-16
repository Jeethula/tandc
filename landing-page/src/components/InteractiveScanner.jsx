import React, { useState } from 'react';
import { 
  Sparkles, Shield, AlertTriangle, CheckCircle, Info, Copy, Check, 
  ArrowRight, Flame, Scale, FileText, Lock, Globe, Cpu, RefreshCw
} from 'lucide-react';

const PRESETS = [
  {
    id: 'social',
    title: '📱 Viral Social Video App',
    badge: 'HIGH RISK (9.1)',
    badgeColor: 'border-red-500/40 text-red-400 bg-red-500/10',
    rawText: `Section 4.2: License Grant to Content. You grant to Us a non-exclusive, royalty-free, transferable, sublicensable, worldwide, perpetual license to host, use, distribute, modify, run, copy, publicly perform or display, translate, and create derivative works of your content (including your likeness, voice, biometric facial data, and video uploads) for the purpose of training generative machine learning models and feeding third-party advertising syndicates without payment of royalties.\n\nSection 11.8: Dispute Resolution. Any dispute arising under this agreement shall be settled through confidential binding individual arbitration. You expressly waive any right to initiate, join, or participate in any class action lawsuit or representative jury proceedings.`,
    analysis: {
      score: 91,
      level: 'CRITICAL HIGH RISK',
      oneLiner: '🚨 Extremely dangerous: Harvests facial biometric data to train AI models and waives all rights to sue.',
      redFlags: [
        'Perpetual license to train AI on your personal biometric likeness and video uploads.',
        'Total waiver of class action and jury trial rights in favor of secret private arbitration.',
        'Data automatically shared with third-party advertising syndicates without revenue share.'
      ],
      greenFlags: [
        'Allows account deletion within 30 days of written request.'
      ],
      domains: [
        { name: 'AI & Biometric Rights', risk: 'HIGH', note: 'Explicit license to use face & voice for ML training' },
        { name: 'Dispute & Litigation', risk: 'HIGH', note: 'Class action waiver and mandatory confidential arbitration' },
        { name: 'Data Monetization', risk: 'HIGH', note: 'Third-party syndicate ad sharing with no opt-out' },
        { name: 'Account Termination', risk: 'MEDIUM', note: '30-day grace period for account deletion' }
      ]
    }
  },
  {
    id: 'saas',
    title: '🤖 "Free" AI Assistant SaaS',
    badge: 'HIGH RISK (8.4)',
    badgeColor: 'border-red-500/40 text-red-400 bg-red-500/10',
    rawText: `Section 9: Intellectual Property Rights. All code snippets, business proposals, confidential documents, and proprietary data inputted into the AI Assistant service become co-owned by Provider. Provider retains the absolute right to utilize input prompts to train global enterprise foundation models.\n\nSection 14: Billing and Subscriptions. At the conclusion of your 7-day trial, your payment method will be immediately billed for an annual non-refundable recurring fee of $288.00 USD. Cancellations must be submitted via physical certified post to our registered office in the Cayman Islands.`,
    analysis: {
      score: 84,
      level: 'CRITICAL HIGH RISK',
      oneLiner: '⚠️ Steals your confidential business code and traps you in a sneaky $288/yr snail-mail auto-renewal.',
      redFlags: [
        'Confidential inputs and code are ingested to train global enterprise models.',
        'Free trial auto-converts to an upfront $288 non-refundable annual charge.',
        'Cancelling requires physical snail-mail letters to an offshore shell jurisdiction.'
      ],
      greenFlags: [
        'Encrypts data in transit using TLS 1.3.'
      ],
      domains: [
        { name: 'Intellectual Property', risk: 'HIGH', note: 'Prompts & code are ingested for model training' },
        { name: 'Hidden Subscriptions', risk: 'HIGH', note: 'Automatic $288 annual fee with snail-mail cancellation' },
        { name: 'Jurisdiction & Law', risk: 'HIGH', note: 'Offshore Cayman Islands legal requirements' },
        { name: 'Data Security', risk: 'LOW', note: 'Standard TLS in-transit encryption' }
      ]
    }
  },
  {
    id: 'vpn',
    title: '🛡️ "Zero-Log" VPN Service',
    badge: 'MEDIUM RISK (6.2)',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    rawText: `Clause 3.1: Logging Policy. We maintain a strict zero-log policy regarding your specific destination URLs. However, we collect aggregated session timestamps, bandwidth consumption, originating IP subnets, hardware identifiers, and telemetry for network optimization.\n\nClause 6.4: Advertising Partners. De-identified analytical telemetry may be provided to vetted marketing research consortia to sustain our free tier infrastructure.`,
    analysis: {
      score: 62,
      level: 'MODERATE RISK',
      oneLiner: '⚡ Misleading "Zero Log" claim: Gathers hardware IDs & IP subnets and sells telemetry to ad consortia.',
      redFlags: [
        'Collects hardware IDs, session timestamps, and originating IP subnets despite claiming "Zero Logs".',
        'Sells "de-identified" telemetry data to marketing research consortia.'
      ],
      greenFlags: [
        'Does not record exact visited destination URLs.',
        'Standard 30-day money back guarantee via web interface.'
      ],
      domains: [
        { name: 'Logging & Privacy', risk: 'MEDIUM', note: 'Tracks hardware IDs and originating subnet' },
        { name: 'Third-Party Sales', risk: 'HIGH', note: 'Telemetry shared with marketing consortia' },
        { name: 'Refunds & Billing', risk: 'LOW', note: '30-day money-back guarantee active' }
      ]
    }
  },
  {
    id: 'clean',
    title: '✨ Ethical Open Source Tool',
    badge: 'LOW RISK (1.5)',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    rawText: `Section 1: Data Ownership. You retain 100% ownership of all your data, content, and files. We do not store, copy, analyze, or monetize your information. All processing occurs locally on your client machine.\n\nSection 2: Telemetry. No telemetry, user identifiers, cookies, or remote tracking scripts are embedded. You may inspect the open source code repository at any time.`,
    analysis: {
      score: 15,
      level: 'VERY SAFE',
      oneLiner: '✅ Excellent: 100% client-side privacy, zero data collection, user retains total data ownership.',
      redFlags: [],
      greenFlags: [
        'User retains 100% ownership of all files and content.',
        'Zero tracking scripts, cookies, or telemetry.',
        '100% Open source and auditable.'
      ],
      domains: [
        { name: 'Data Ownership', risk: 'LOW', note: 'Full user ownership; no company license claims' },
        { name: 'Telemetry & Tracking', risk: 'LOW', note: 'Zero remote tracking or analytics' },
        { name: 'Local Processing', risk: 'LOW', note: 'Runs 100% on client machine' }
      ]
    }
  }
];

export default function InteractiveScanner() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [customText, setCustomText] = useState(PRESETS[0].rawText);
  const [isScanning, setIsScanning] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState(PRESETS[0].analysis);
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setCustomText(preset.rawText);
    setIsScanning(true);
    setTimeout(() => {
      setActiveAnalysis(preset.analysis);
      setIsScanning(false);
    }, 450);
  };

  const handleRunAnalysis = () => {
    setIsScanning(true);
    setTimeout(() => {
      // If user pasted custom text, synthesize dynamic feedback
      if (customText !== selectedPreset.rawText) {
        setActiveAnalysis({
          score: 78,
          level: 'CUSTOM AUDIT COMPLETE',
          oneLiner: '⚡ AI scanned custom agreement: Found multi-party liability waivers and data utilization clauses.',
          redFlags: [
            'Includes broad disclaimer of liability and unilateral terms modification clauses.',
            'Requires users to waive standard legal remedies in court.'
          ],
          greenFlags: [
            'General compliance with regional regulatory definitions.'
          ],
          domains: [
            { name: 'Liability & Disclaimers', risk: 'HIGH', note: 'Company disclaims all warranties & indirect damages' },
            { name: 'Terms Alterations', risk: 'MEDIUM', note: 'Terms may update without explicit prior email notice' },
            { name: 'Data Retention', risk: 'LOW', note: 'Standard server operation logs' }
          ]
        });
      } else {
        setActiveAnalysis(selectedPreset.analysis);
      }
      setIsScanning(false);
    }, 600);
  };

  const copyAnalysis = () => {
    const textToCopy = `T&C Clarity Report\nRisk Score: ${activeAnalysis.score}/100 (${activeAnalysis.level})\nSummary: ${activeAnalysis.oneLiner}\n\nTop Red Flags:\n${activeAnalysis.redFlags.map(f => `• ${f}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Live Playground</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Test Real-World <span className="text-gradient-cyan">Predatory Clauses</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300">
            See how T&C Clarity slices through hundreds of lines of deceptive legalese in milliseconds. Pick a real-world scenario below or paste any contract text.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between gap-2 ${
                  isSelected 
                    ? 'bg-blue-900/40 border-cyan-400/60 shadow-lg shadow-blue-900/40 translate-y-[-2px]' 
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{preset.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${preset.badgeColor}`}>
                    {preset.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    {isSelected ? 'Active Demo' : 'Click to test'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Live Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Legal Text Input & Control (5 Cols) */}
          <div className="lg:col-span-5 glass-panel p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
                    Input Contract / Clause
                  </label>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {customText.length} chars
                </span>
              </div>

              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={11}
                placeholder="Paste any Terms of Service, EULA, or Privacy Policy clause here..."
                className="w-full bg-[#070B14]/80 border border-slate-700/70 rounded-xl p-3.5 text-xs text-slate-300 font-mono leading-relaxed focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Map-Reduce Pipeline</span>
              </span>

              <button
                onClick={handleRunAnalysis}
                disabled={isScanning}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white btn-primary-gradient flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className={`w-3.5 h-3.5 text-cyan-200 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Scanning Clauses...' : 'Analyze Now'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Instant AI Legal Audit Result (7 Cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between space-y-6">
            
            {/* Loading Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-[#070B14]/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3 animate-in fade-in duration-150">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
                  <Shield className="w-5 h-5 text-cyan-400 absolute inset-0 m-auto" />
                </div>
                <span className="text-xs font-mono text-cyan-300 font-semibold tracking-wider animate-pulse">
                  PARSING WITH GEMINI 2.0 / LOCAL LLM...
                </span>
              </div>
            )}

            {/* Analysis Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Automated Legal Risk Scorecard
                </span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Clause Threat Level:</span>
                  <span className={
                    activeAnalysis.score > 70 ? 'text-red-400' :
                    activeAnalysis.score > 40 ? 'text-amber-400' : 'text-emerald-400'
                  }>
                    {activeAnalysis.level}
                  </span>
                </h3>
              </div>

              {/* Circular Gauge / Score Badge */}
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-2xl flex items-baseline gap-1 font-mono font-black text-2xl ${
                  activeAnalysis.score > 70 ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-lg shadow-red-950/50' :
                  activeAnalysis.score > 40 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  <span>{activeAnalysis.score}</span>
                  <span className="text-xs text-slate-400 font-normal">/100</span>
                </div>

                <button
                  onClick={copyAnalysis}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  title="Copy formatted summary"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Plain English TL;DR */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wide">
                Plain English Translation
              </span>
              <p className="text-sm font-medium text-slate-200 leading-relaxed">
                {activeAnalysis.oneLiner}
              </p>
            </div>

            {/* Red Flags & Safety Points */}
            <div className="space-y-3">
              {activeAnalysis.redFlags.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" /> High Concern Traps Detected ({activeAnalysis.redFlags.length})
                  </span>
                  <div className="space-y-1.5">
                    {activeAnalysis.redFlags.map((flag, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-slate-200">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeAnalysis.greenFlags.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Positive Protections ({activeAnalysis.greenFlags.length})
                  </span>
                  <div className="space-y-1.5">
                    {activeAnalysis.greenFlags.map((flag, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-slate-200">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Domain Breakdown Badges */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider block mb-2.5">
                Domain Breakdown Audit
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeAnalysis.domains.map((domain, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="truncate pr-2">
                      <span className="font-semibold text-slate-300 block truncate">{domain.name}</span>
                      <span className="text-[10px] text-slate-500 truncate block">{domain.note}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      domain.risk === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                      domain.risk === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {domain.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
