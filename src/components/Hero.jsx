import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden bg-[#0D1117]">
      {/* Background Engineering Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E6FBA0E_1px,transparent_1px),linear-gradient(to_bottom,#1E6FBA0E_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:48px_48px] pointer-events-none" />
      
      {/* Dynamic Aero Telemetry Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[650px] sm:h-[650px] bg-gradient-to-br from-[#29ABE2]/10 to-[#1E6FBA]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Aero HUD Vector Elements */}
      <div className="absolute top-28 left-6 hidden lg:block text-[10px] font-mono text-[#1E3A5F] space-y-1 select-none pointer-events-none">
        <div>SYS.ALT // 00.0M</div>
        <div>PROPULSION // HYDRO-PNEUMATIC</div>
        <div>FLUID.FLOW // LAMINAR</div>
      </div>
      <div className="absolute top-28 right-6 hidden lg:block text-[10px] font-mono text-[#1E3A5F] text-right space-y-1 select-none pointer-events-none">
        <div>STATUS // REGISTRATION_ACTIVE</div>
        <div>ORGANIZER // AFC_IIITDMJ</div>
        <div>LAT/LONG // 23.1765° N, 80.0246° E</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Top Badge with Official AFC Logo Image */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111827] border border-[#29ABE2]/40 mb-6 sm:mb-8 shadow-lg shadow-[#29ABE2]/10"
        >
          <img
            src="/afc-user-logo.jpg"
            alt="AFC Logo"
            className="w-5 h-5 rounded-full object-cover border border-[#29ABE2]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/afc-logo.png';
            }}
          />
          <span className="font-heading text-[11px] sm:text-xs font-bold tracking-widest text-[#29ABE2] uppercase">
            Aero Fabrication Club · IIITDMJ
          </span>
        </motion.div>

        {/* Main Title Graphic & Custom Font */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 sm:mb-6 relative"
        >
          <img
            src="/thrust5-title.png"
            alt="THRUST 5.0"
            className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl border border-[#29ABE2]/30 bg-[#080C11]/80 backdrop-blur"
            onError={(e) => {
              // Fallback text header if image fails to render in iframe
              e.target.style.display = 'none';
            }}
          />
          <h1 className="font-heading font-extrabold tracking-tight text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] drop-shadow-[0_10px_20px_rgba(41,171,226,0.3)]">
            THRUST <span className="text-[#29ABE2]">5.0</span>
          </h1>
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
            <div className="text-xs sm:text-sm font-semibold text-white mt-1">2 to 4 Members</div>
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
