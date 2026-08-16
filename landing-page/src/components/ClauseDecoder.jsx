import React, { useState } from 'react';
import { 
  AlertOctagon, Scale, ShieldAlert, ArrowRight, EyeOff, Eye, 
  HelpCircle, CheckCircle2, ChevronRight, Lock, Zap, Flame
} from 'lucide-react';

const TRAPS = [
  {
    id: 'ai-rights',
    title: 'Perpetual AI Model Training',
    tag: 'CONTENT THEFT',
    tagColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    legalese: `"You hereby grant to Company, its affiliates, and successors an irrevocable, perpetual, transferable, sublicensable, worldwide, royalty-free license to use, reproduce, modify, distribute, create derivative works from, and ingest any and all user submissions, media, photos, and voice recordings into proprietary artificial intelligence and neural network systems without compensation or notice."`,
    plainEnglish: `They can feed your family photos, voice notes, and creative work into their commercial AI models forever. You will never be credited or paid a dime, and you cannot revoke this even if you delete your account.`,
    dangerLevel: 'CRITICAL',
    frequency: 'Found in 78% of modern consumer apps'
  },
  {
    id: 'arbitration',
    title: 'Mandatory Binding Arbitration',
    tag: 'LEGAL RIGHTS WAIVER',
    tagColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    legalese: `"Any dispute, claim or controversy arising out of or relating to this Agreement shall be determined by confidential binding arbitration before a single arbitrator in Wilmington, Delaware. You expressly agree to waive all rights to a jury trial and agree not to initiate or participate in any class, collective, or representative action."`,
    plainEnglish: `If they leak your social security number or steal money from your account, you cannot sue them in a public court or join a class-action lawsuit. You must pay thousands of dollars for a private arbitrator in Delaware.`,
    dangerLevel: 'CRITICAL',
    frequency: 'Found in 92% of US SaaS agreements'
  },
  {
    id: 'stealth-billing',
    title: 'Stealth Auto-Renewals',
    tag: 'DARK PATTERN PRICING',
    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    legalese: `"Upon expiration of the promotional evaluation period, your subscription shall automatically renew at the standard full non-discounted annual rate of $299.00 USD, debited immediately from your stored payment credential without further authorization. Cancellation requests must be submitted in writing via registered mail at least thirty (30) business days prior to renewal."`,
    plainEnglish: `Your free trial turns into a surprise $300 bill that you cannot cancel online. They demand you mail a physical certified letter a month in advance just to stop the charges.`,
    dangerLevel: 'HIGH',
    frequency: 'Found in 64% of "free trial" websites'
  },
  {
    id: 'silent-changes',
    title: 'Unilateral "Silent" Terms Changes',
    tag: 'UNILATERAL AMENDMENT',
    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    legalese: `"Company reserves the absolute right to revise, modify, or replace these Terms at any time without prior written notice. Continued use of the platform following the posting of modifications constitutes your binding acceptance of such revisions."`,
    plainEnglish: `They can rewrite the rules at 2:00 AM to start selling your data or charging new fees. If you visit the website the next day, you legally agreed to whatever changes they made in secret.`,
    dangerLevel: 'HIGH',
    frequency: 'Found in 86% of web platforms'
  },
  {
    id: 'data-brokers',
    title: 'Ad Consortium Data Brokering',
    tag: 'MASS DATA HARVESTING',
    tagColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    legalese: `"We may disclose pseudonymized technical identifiers, precise GPS geolocation telemetry, device fingerprint heuristics, and behavioral interaction sequences to third-party commercial syndicates and strategic marketing affiliates for monetization and personalized ad serving."`,
    plainEnglish: `They track your physical movements and sell your device fingerprint to data brokers who re-identify you and blast you with targeted ads across your entire digital life.`,
    dangerLevel: 'CRITICAL',
    frequency: 'Found in 81% of mobile services'
  }
];

export default function ClauseDecoder() {
  const [activeTrap, setActiveTrap] = useState(TRAPS[0]);
  const [viewMode, setViewMode] = useState('split'); // 'split', 'legalese', 'plain'

  return (
    <section id="decoder" className="py-24 relative overflow-hidden bg-[#060913]/60 border-y border-slate-800/80">
      
      {/* Background ambient gradient */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>The Reality Check</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            What You Think You Agreed To <br />
            <span className="text-gradient-danger">vs. What You Actually Signed</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Corporate lawyers deliberately draft 40-page agreements in confusing jargon so you won’t notice what you’re giving up. T&C Clarity translates the traps into plain English.
          </p>
        </div>

        {/* Interactive Trap Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Trap Selector List (4 Cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block px-2">
              Common Predatory Clauses:
            </span>

            {TRAPS.map((trap) => {
              const isActive = activeTrap.id === trap.id;
              return (
                <button
                  key={trap.id}
                  onClick={() => setActiveTrap(trap)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                    isActive 
                      ? 'bg-blue-900/40 border-blue-500 shadow-lg shadow-blue-950/60 translate-x-1' 
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-white block">{trap.title}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border inline-block ${trap.tagColor}`}>
                      {trap.tag}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                </button>
              );
            })}

            <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/60 mt-4 text-xs text-slate-400">
              <span className="font-semibold text-slate-200 block mb-1">💡 T&C Clarity Heuristics</span>
              Our extension scans 7 legal domains simultaneously using high-density phrase matching and client-side LLM inference.
            </div>
          </div>

          {/* Right: Comparative Side-by-Side Decoder View (8 Cols) */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 space-y-6">
            
            {/* Top Details & Severity Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase block">
                  Active Clause Deep-Dive
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {activeTrap.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  {activeTrap.frequency}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40">
                  {activeTrap.dangerLevel}
                </span>
              </div>
            </div>

            {/* Split Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* The Jargon (Legalese) */}
              <div className="p-5 rounded-xl bg-[#090E1A] border border-slate-800/90 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-slate-500" /> What They Wrote
                    </span>
                    <span className="text-[10px] text-red-400/80 font-mono">Deliberate Legalese</span>
                  </div>
                  <blockquote className="text-xs text-slate-300 font-serif leading-relaxed italic opacity-85">
                    {activeTrap.legalese}
                  </blockquote>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Designed to confuse normal readers</span>
              </div>

              {/* The Truth (T&C Clarity Translation) */}
              <div className="p-5 rounded-xl bg-gradient-to-b from-blue-950/40 to-slate-900 border border-cyan-500/30 flex flex-col justify-between space-y-4 shadow-lg shadow-blue-950/40">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-cyan-400" /> What It Actually Means
                    </span>
                    <span className="text-[10px] text-cyan-300 font-mono font-bold">Plain English</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                    {activeTrap.plainEnglish}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-2 text-[10px] text-emerald-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Flagged automatically by T&C Clarity</span>
                </div>
              </div>

            </div>

            {/* Bottom Callout banner */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" /> Never sign in the dark again
                </span>
                <p className="text-[11px] text-slate-300">
                  T&C Clarity runs in Chrome and scans every Terms page in real-time.
                </p>
              </div>
              <a
                href="#install"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white btn-primary-gradient shrink-0"
              >
                Protect My Browsing
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
