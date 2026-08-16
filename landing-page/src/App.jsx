import React from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveScanner from './components/InteractiveScanner';
import ClauseDecoder from './components/ClauseDecoder';
import PrivacyArchitecture from './components/PrivacyArchitecture';
import FeaturesGrid from './components/FeaturesGrid';
import ComparisonTable from './components/ComparisonTable';
import InstallGuide from './components/InstallGuide';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#070B14] text-slate-100 cyber-grid overflow-hidden">
      {/* Dynamic interactive particle canvas */}
      <ParticleBackground />

      {/* Floating Header */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="relative z-10">
        <Hero />
        <InteractiveScanner />
        <ClauseDecoder />
        <PrivacyArchitecture />
        <FeaturesGrid />
        <ComparisonTable />
        <InstallGuide />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
