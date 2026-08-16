import React from 'react';
import { Shield, Download, Sparkles, ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function CTASection() {
  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#3B82F6', '#06B6D4', '#60A5FA', '#818CF8', '#10B981']
    });
    const installElement = document.getElementById('install');
    if (installElement) {
      installElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      
      {/* Background cyber radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-panel p-8 sm:p-14 text-center relative overflow-hidden border-cyan-500/40 shadow-2xl shadow-blue-950/80">
          
          {/* Top Shield Icon with Glowing Radar Rings */}
          <div className="relative mx-auto w-16 h-16 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 animate-ping opacity-60" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-xl shadow-cyan-500/30 relative z-10 flex items-center justify-center">
              <div className="w-full h-full bg-[#090E1A] rounded-[14px] flex items-center justify-center">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Take Back Your Rights. <br />
              <span className="text-gradient-cyan">Never Sign in the Dark Again.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300">
              Join thousands of smart developers, privacy advocates, and consumers who use T&C Clarity to know exactly what they agree to before clicking "Accept".
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={triggerCelebration}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white btn-primary-gradient flex items-center justify-center gap-3 shadow-xl shadow-blue-600/40 cursor-pointer group"
            >
              <Download className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
              <span>Get Chrome Extension Free</span>
            </button>

            <a
              href="https://github.com/Jeethula/tandc"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-semibold text-slate-200 btn-secondary-glass flex items-center justify-center gap-2 group hover:text-white"
            >
              <GithubIcon className="w-4 h-4 text-slate-400" />
              <span>Star on GitHub</span>
              <span className="text-xs text-cyan-400 font-mono">★ MIT</span>
            </a>

            <a
              href="https://www.linkedin.com/in/jeethula/"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-4 rounded-2xl text-sm font-semibold text-slate-200 btn-secondary-glass flex items-center justify-center gap-2 group hover:text-white"
              title="Connect with Jeethu on LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:jeeththenthar@gmail.com"
              className="w-full sm:w-auto px-5 py-4 rounded-2xl text-sm font-semibold text-slate-200 btn-secondary-glass flex items-center justify-center gap-2 group hover:text-white"
              title="Email: jeeththenthar@gmail.com"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Email</span>
            </a>
          </div>

          {/* Quick guarantee pill */}
          <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free & Open Source
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Middleware Servers
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Works on All Chromium Browsers
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
