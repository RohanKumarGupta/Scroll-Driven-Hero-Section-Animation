"use client";

import { Zap, Shield, Cpu, Flame, ChevronRight, Activity, Globe } from "lucide-react";

export default function ContentSection() {
  return (
    <div className="relative w-full bg-slate-950 text-slate-100 z-20 border-t border-slate-900">
      
      {/* SECTION 1: PERFORMANCE OVERVIEW */}
      <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-sky-400 text-xs font-bold uppercase tracking-widest">
              Unrivaled Motion Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-white">
              Engineered for Speed & Fluidity
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm sm:text-base leading-relaxed">
            Experience 120fps hardware-accelerated animations driven by GSAP ScrollTrigger and Lenis smooth inertial scrolling.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-sm group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hardware Accelerated</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Strictly animates GPU-friendly properties (<code className="text-sky-300">transform</code>, <code className="text-sky-300">opacity</code>) with zero layout reflows or forced recalculations.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-sm group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">GSAP Ticker Synced</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Lenis smooth scrolling is coupled directly to the GSAP Ticker loop with lag smoothing disabled for frame-perfect physics interpolation.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-sm group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">React Strict-Mode Safe</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leverages <code className="text-sky-300">gsap.context()</code> scoping for clean memory disposal during unmounts and hot-reloads.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: METRICS & CTA */}
      <section className="py-20 border-y border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to Customize Your Scroll Experience?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Swap out the car graphic, adjust pin duration, or fine-tune scrub response times using the included options guide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#documentation"
              className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2"
            >
              <span>Explore Architecture</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-sm transition-all flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span>View Source</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-900/60">
        <p>© 2026 ITZFIZZ Motion Design. Built with Next.js App Router, GSAP & Lenis.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-300 transition-colors cursor-pointer">GSAP Documentation</span>
        </div>
      </footer>
    </div>
  );
}
