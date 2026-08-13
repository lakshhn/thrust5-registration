import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden bg-[#0D1117]">
      {/* Background Engineering Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E6FBA0D_1px,transparent_1px),linear-gradient(to_bottom,#1E6FBA0D_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:48px_48px] pointer-events-none" />
      
      {/* Subtle Glow Background Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-[#29ABE2]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827] border border-[#1E3A5F] mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#29ABE2] animate-pulse" />
          <span className="font-heading text-[11px] sm:text-xs font-semibold tracking-widest text-[#29ABE2] uppercase">
            Aero Fabrication Club · IIITDMJ
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading font-extrabold tracking-tight text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] mb-4 sm:mb-6"
        >
          THRUST <span className="text-[#29ABE2]">5.0</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body text-base sm:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-2 leading-relaxed"
        >
          The Ultimate Water Rocket Challenge
        </motion.p>

        {/* Exclusive tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-heading font-bold text-xs sm:text-sm text-[#29ABE2] tracking-widest uppercase mb-8 sm:mb-10"
        >
          Exclusively for First-Year Students
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md mx-auto"
        >
          <a
            href="#register"
            className="btn-launch text-sm sm:text-base py-3.5 px-8 flex-1 text-center font-bold"
          >
            Register Your Team →
          </a>
          <a
            href="#details"
            className="px-6 py-3.5 rounded-lg border border-[#1E3A5F] bg-[#111827]/80 text-[#94A3B8] hover:text-white hover:border-[#29ABE2] font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase text-center transition-all"
          >
            Event Details
          </a>
        </motion.div>

        {/* Quick Highlights Bar for Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-3xl mx-auto"
        >
          <div className="p-3 sm:p-4 rounded-lg bg-[#111827]/60 border border-[#1E3A5F]/60">
            <div className="text-[10px] sm:text-xs text-[#29ABE2] font-mono font-bold uppercase">Eligibility</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">1st Year Students</div>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-[#111827]/60 border border-[#1E3A5F]/60">
            <div className="text-[10px] sm:text-xs text-[#29ABE2] font-mono font-bold uppercase">Team Size</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">2 to 4 Members</div>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-[#111827]/60 border border-[#1E3A5F]/60">
            <div className="text-[10px] sm:text-xs text-[#29ABE2] font-mono font-bold uppercase">Registration Fee</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">₹120 / Team</div>
          </div>
          <div className="p-3 sm:p-4 rounded-lg bg-[#111827]/60 border border-[#1E3A5F]/60">
            <div className="text-[10px] sm:text-xs text-[#29ABE2] font-mono font-bold uppercase">Organized By</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">AFC IIITDMJ</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
