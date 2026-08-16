import React from 'react';
import { Shield, Heart, Lock, FileText, ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/30 flex items-center justify-center">
                <div className="w-full h-full bg-[#0B1224] rounded-[6px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-black tracking-tight text-white font-display">
                T&C <span className="text-cyan-400">CLARITY</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The privacy-first, BYOK Chrome Extension that automatically audits Terms of Service, EULAs, and Privacy Policies in 3 seconds directly from your browser.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/30">
                Manifest V3
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                100% Client-Side
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                MIT Licensed
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Product & Demo
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#demo" className="hover:text-cyan-400 transition-colors">Live Scanner Playground</a></li>
              <li><a href="#decoder" className="hover:text-cyan-400 transition-colors">Trap Decoder</a></li>
              <li><a href="#byok" className="hover:text-cyan-400 transition-colors">BYOK & Local LLM</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Key Features</a></li>
              <li><a href="#comparison" className="hover:text-cyan-400 transition-colors">Comparison Matrix</a></li>
            </ul>
          </div>

          {/* Col 3: Resources & Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Quick Setup
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#install" className="hover:text-cyan-400 transition-colors">Load Unpacked Guide</a></li>
              <li><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Get Free Gemini Key</a></li>
              <li><a href="https://ollama.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Ollama Local LLMs</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Col 4: Open Source & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Open Source & Contact
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="https://github.com/Jeethula/tandc" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><GithubIcon className="w-3.5 h-3.5" /> <span>GitHub: Jeethula/tandc</span></a></li>
              <li><a href="https://www.linkedin.com/in/jeethula/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><LinkedinIcon className="w-3.5 h-3.5 text-blue-400" /> <span>LinkedIn: @jeethula</span></a></li>
              <li><a href="mailto:jeeththenthar@gmail.com" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-cyan-400" /> <span>jeeththenthar@gmail.com</span></a></li>
              <li><a href="https://github.com/Jeethula/tandc/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">How to Contribute</a></li>
              <li><a href="https://github.com/Jeethula/tandc/blob/main/SECURITY.md" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Security Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer & Bottom Line */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-[11px] leading-relaxed max-w-2xl text-slate-400">
            <strong>Disclaimer:</strong> T&C Clarity is an AI-powered legal text extraction and analysis tool for consumer educational awareness. It is not an attorney and does not constitute formal legal counsel. Always consult a licensed attorney for binding legal matters.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 text-xs font-mono"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
