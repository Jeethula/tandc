import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Terminal, Download, ChevronRight, Menu, X, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerInstallConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.15 },
      colors: ['#3B82F6', '#06B6D4', '#60A5FA', '#818CF8']
    });
    const installElement = document.getElementById('install');
    if (installElement) {
      installElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#070B14]/85 backdrop-blur-xl border-b border-blue-500/20 py-3 shadow-2xl shadow-blue-950/40' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0B1224] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400 group-hover:text-blue-300 transition-colors" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-display">
                  T&C <span className="text-cyan-400">CLARITY</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-bold font-mono tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full">
                  v2.4 MV3
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
                Privacy-First Legal AI Scanner
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 px-4 py-1.5 rounded-full backdrop-blur-md shadow-inner shadow-black/40">
            <a href="#demo" className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-full transition-all duration-200">
              Live Scanner
            </a>
            <a href="#decoder" className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-full transition-all duration-200">
              Trap Decoder
            </a>
            <a href="#byok" className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-full transition-all duration-200">
              BYOK & Privacy
            </a>
            <a href="#features" className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-full transition-all duration-200">
              Features
            </a>
            <a href="#comparison" className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-full transition-all duration-200">
              Comparison
            </a>
            <a href="#faq" className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-full transition-all duration-200">
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="https://github.com/Jeethula/tandc" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all"
            >
              <GithubIcon className="w-4 h-4 text-slate-400" />
              <span>GitHub</span>
              <span className="text-[10px] bg-slate-700/80 px-1.5 py-0.5 rounded text-cyan-300 font-mono">★ MIT</span>
            </a>

            <button
              onClick={triggerInstallConfetti}
              className="relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-bold text-white btn-primary-gradient flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-200 group-hover:animate-bounce" />
              <span>Get Extension Free</span>
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-xl border border-slate-700/50"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-[#0B132B]/95 backdrop-blur-2xl border border-blue-500/20 rounded-2xl shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <a 
              href="#demo" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg"
            >
              Live Scanner Demo
            </a>
            <a 
              href="#decoder" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg"
            >
              Trap Decoder
            </a>
            <a 
              href="#byok" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg"
            >
              BYOK & Local LLMs
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg"
            >
              Extension Features
            </a>
            <a 
              href="#comparison" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg"
            >
              Why T&C Clarity
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg"
            >
              FAQ
            </a>
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerInstallConfetti();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white btn-primary-gradient flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-cyan-200" />
                <span>Get Extension Free (Open Source)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
