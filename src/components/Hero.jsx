import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden bg-[#0D1117]">
      {/* Background Engineering Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E6FBA0E_1px,transparent_1px),linear-gradient(to_bottom,#1E6FBA0E_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:48px_48px] pointer-events-none" />
      
      {/* Dynamic Aero Glow Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[700px] sm:h-[700px] bg-gradient-to-br from-[#29ABE2]/15 via-[#1E6FBA]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Flagship Club Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827]/80 border border-[#29ABE2]/30 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(41,171,226,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#29ABE2] animate-pulse" />
          <span className="font-mono text-xs font-bold text-[#29ABE2] tracking-widest uppercase">
            AERO FABRICATION CLUB · IIITDMJ PRESENTS
          </span>
        </motion.div>

        {/* Google-Style Modern Tech Flagship Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative my-4 flex flex-col items-center justify-center"
        >
          {/* Main THRUST text */}
          <div
            className="title-glow text-white uppercase leading-none tracking-[0.08em] select-none"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(4rem, 14vw, 10rem)',
              letterSpacing: '0.06em',
            }}
          >
            THRUST
          </div>

          {/* 5.0 versioning — slightly smaller, cyan gradient, offset glow */}
          <div
            className="num-glow uppercase leading-none select-none -mt-2 sm:-mt-4"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 9vw, 6.5rem)',
              letterSpacing: '0.18em',
              background: 'linear-gradient(135deg, #56CCF2 0%, #29ABE2 50%, #1E6FBA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            5.0
          </div>

          {/* Accent line */}
          <div className="w-40 sm:w-72 h-px bg-gradient-to-r from-transparent via-[#29ABE2] to-transparent mt-4 opacity-70 shadow-[0_0_10px_#29ABE2]" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body text-base sm:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-2 leading-relaxed font-medium"
        >
          The Ultimate Flagship Water Rocket Challenge
        </motion.p>

        {/* Exclusive tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-heading font-bold text-xs sm:text-sm text-[#29ABE2] tracking-widest uppercase mb-8 sm:mb-10 flex items-center justify-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#29ABE2]" />
          Exclusively for First-Year Students
          <span className="w-1.5 h-1.5 rounded-full bg-[#29ABE2]" />
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
            className="btn-launch text-sm sm:text-base py-3.5 px-8 flex-1 text-center font-extrabold shadow-lg shadow-[#29ABE2]/20"
          >
            Register Team
          </a>
          <a
            href="#details"
            className="px-6 py-3.5 rounded-lg border border-[#1E3A5F] bg-[#111827]/80 text-[#94A3B8] hover:text-white hover:border-[#29ABE2] font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase text-center transition-all"
          >
            Event Details
          </a>
        </motion.div>

        {/* Quick Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-3xl mx-auto"
        >
          <div className="p-3.5 rounded-xl bg-[#111827]/70 border border-[#1E3A5F] backdrop-blur-sm">
            <div className="text-[10px] sm:text-xs text-[#29ABE2] font-mono font-bold uppercase tracking-wider">Eligibility</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">1st Year Students</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#111827]/70 border border-[#1E3A5F] backdrop-blur-sm">
            <div className="text-[10px] sm:text-xs text-[#29ABE2] font-mono font-bold uppercase tracking-wider">Team Size</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">2 to 3 Members</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#111827]/70 border border-[#1E3A5F] backdrop-blur-sm">
            <div className="text-[10px] sm:text-xs text-[#29ABE2] font-mono font-bold uppercase tracking-wider">Registration Fee</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">₹120 / Team</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#111827]/70 border border-[#1E3A5F] backdrop-blur-sm">
            <div className="text-[10px] sm:text-xs text-[#29ABE2] font-mono font-bold uppercase tracking-wider">Organized By</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">AFC IIITDMJ</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

