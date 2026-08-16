import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const FAQS = [
  {
    q: 'What is BYOK and why is it safer than typical SaaS extensions?',
    a: 'BYOK stands for "Bring Your Own Key". Instead of sending your sensitive legal text and browsing data through a proprietary company server, T&C Clarity connects your browser directly to Google\'s official Gemini API (or your local Ollama server). Your API key stays saved in your browser\'s secure local storage (chrome.storage.local). We run zero middleware servers and collect zero telemetry.'
  },
  {
    q: 'Is the Google Gemini API free for this?',
    a: 'Yes! Google AI Studio provides a free tier for Gemini 2.0 Flash that includes 15 requests per minute, which is more than enough for everyday web browsing. You pay $0.00.'
  },
  {
    q: 'Can I run this 100% offline with a Local LLM?',
    a: 'Absolutely! T&C Clarity supports offline local model endpoints like Ollama (e.g. Llama 3, Mistral, Gemma) running on localhost:11434. In local mode, zero data ever leaves your computer, making it completely air-gapped.'
  },
  {
    q: 'How does T&C Clarity detect legal pages without slowing down Chrome?',
    a: 'The extension uses an ultra-fast, lightweight heuristic engine in a content script. It checks URL patterns, page headers (h1/h2), and phrase density (e.g., terms of service, privacy policy, EULA, arbitration). It only activates when a legal page is detected and runs asynchronously without blocking rendering or user interaction.'
  },
  {
    q: 'How does the Map-Reduce long document engine work?',
    a: 'Many software EULAs exceed 40,000 words. When a document exceeds token thresholds, T&C Clarity splits it into coherent sections, summarizes each sub-section for red flags in parallel, and performs an executive synthesis reduction. You never lose critical buried clauses due to context window limits.'
  },
  {
    q: 'Which browsers are supported?',
    a: 'T&C Clarity is built on the modern Manifest V3 standard and is fully compatible with Google Chrome, Brave Browser, Microsoft Edge, Arc, Opera, and any Chromium-based browser.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Got Questions? <span className="text-gradient-cyan">We’ve Got Answers.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Everything you need to know about T&C Clarity, BYOK privacy, and how it protects your legal rights.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel overflow-hidden transition-all duration-200 border-slate-800 hover:border-blue-500/40"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-cyan-300' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
