import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Elena Rostova',
    role: 'Cybersecurity & Privacy Researcher',
    avatar: '🛡️',
    comment: 'T&C Clarity caught a stealth biometric data resale clause in a popular video editor that had zero publicity. The BYOK architecture is what convinced me—I refuse to use extensions that route my traffic through unknown servers.',
    stars: 5,
    tag: 'Verified Security Auditor'
  },
  {
    name: 'Marcus Vance',
    role: 'Tech Attorney & Open Source Contributor',
    avatar: '⚖️',
    comment: 'Most consumers have no idea they are signing away their constitutional 7th Amendment right to a jury trial on every signup. This tool translates 50-page EULAs into crisp, actionable risk assessments in seconds.',
    stars: 5,
    tag: 'Intellectual Property Lawyer'
  },
  {
    name: 'Devon Takahashi',
    role: 'Staff Software Engineer',
    avatar: '💻',
    comment: 'The Map-Reduce implementation for huge contracts is brilliant. It handled a massive enterprise cloud SLA without truncating or hallucinating. Plus, running it against local Ollama makes it 100% compliant with our company NDA policies.',
    stars: 5,
    tag: 'Enterprise Dev'
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#060913]/50 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300">
            <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
            <span>Trusted By Privacy Advocates</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Loved By <span className="text-gradient-cyan">Security Experts & Lawyers</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            See how developers, security researchers, and everyday privacy defenders protect themselves with T&C Clarity.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-blue-500/40 transition-all"
            >
              <div className="space-y-4">
                {/* Rating stars & tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/30">
                    {review.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* User info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{review.name}</h4>
                  <p className="text-[11px] text-slate-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
