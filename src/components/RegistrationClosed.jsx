import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AFC_LOGO_BASE64 } from '../assets/imageAssets';

export default function RegistrationClosed() {
  const [copiedNumber, setCopiedNumber] = useState(null);

  const copyToClipboard = (num, name) => {
    navigator.clipboard?.writeText(num);
    setCopiedNumber(name);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex flex-col justify-between selection:bg-[#29ABE2] selection:text-[#0D1117] relative overflow-hidden font-body">
      {/* Background Decorative Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #29ABE2 1px, transparent 1px), linear-gradient(to bottom, #29ABE2 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient Glow Orbs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#1E6FBA]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -left-48 w-[400px] h-[400px] bg-[#29ABE2]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 -right-48 w-[500px] h-[500px] bg-[#1E6FBA]/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Radial Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D1117]/60 to-[#0D1117]" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-20 border-b border-[#1E3A5F]/70 bg-[#0D1117]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={AFC_LOGO_BASE64}
              alt="Aero Fabrication Club"
              className="h-9 sm:h-10 w-auto object-contain block drop-shadow-[0_0_12px_rgba(41,171,226,0.6)]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/afc-logo-transparent.png';
              }}
            />
            <div>
              <div className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-white leading-tight">
                THRUST <span className="text-[#29ABE2]">5.0</span>
              </div>
              <div className="text-[10px] font-mono text-[#29ABE2] tracking-widest uppercase font-bold">
                Aero Fabrication Club · IIITDMJ
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]" />
              MISSION SLOTS FULL
            </div>

            <a
              href="/Thrust_5_0_RB.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#14233A] hover:bg-[#1E3A5F] border border-[#1E568A]/60 text-xs font-semibold text-[#cbd5e1] hover:text-white transition-all shadow-sm"
            >
              <svg className="w-3.5 h-3.5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Rulebook</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 flex-1 flex flex-col items-center text-center">
        
        {/* Status Chip / Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111C2E] border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.2)] mb-6 text-xs font-mono font-bold tracking-widest text-rose-400 uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          MISSION PROTOCOL · REGISTRATIONS CLOSED
        </motion.div>

        {/* High-Tech Aerospace HUD Graphic Emblem */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-44 h-44 sm:w-52 sm:h-52 my-3 flex items-center justify-center"
        >
          {/* Outer Rotating Radar Compass Ring */}
          <div
            className="absolute inset-0 rounded-full border border-dashed border-[#29ABE2]/30 animate-spin"
            style={{ animationDuration: '35s' }}
          />

          {/* Secondary Concentric Ring */}
          <div
            className="absolute inset-3 rounded-full border border-[#1E568A]/40 animate-spin"
            style={{ animationDuration: '20s', animationDirection: 'reverse' }}
          />

          {/* Pulsing Core Glow */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-[#1E6FBA]/25 via-rose-500/10 to-[#29ABE2]/20 blur-lg animate-pulse" />

          {/* Center Circular HUD Pod */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#0A1019] border-2 border-rose-500/50 shadow-[0_0_35px_rgba(244,63,94,0.3)] flex flex-col items-center justify-center p-3">
            {/* Sealed Rocket Silo Icon */}
            <div className="relative mb-1">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#29ABE2] drop-shadow-[0_0_12px_rgba(41,171,226,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {/* Rocket Body */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 7.5l.01.01"
                />
              </svg>

              {/* Lock Badge Overlay */}
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-rose-600 border border-rose-300 text-white flex items-center justify-center shadow-lg">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <div className="text-[9px] font-mono font-black tracking-widest text-rose-400 uppercase">
              SEALED
            </div>
          </div>

          {/* Orbiting Telemetry Coordinates */}
          <div className="absolute -top-1 font-mono text-[9px] text-[#29ABE2]/70 font-semibold tracking-wider">
            [ MAX_CAPACITY: 100% ]
          </div>
          <div className="absolute -bottom-1 font-mono text-[9px] text-[#64748B] font-semibold tracking-wider">
            HANGAR_BAY_RESTRICTED
          </div>
        </motion.div>

        {/* Main Headings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl"
        >
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-3">
            REGISTRATION{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400">
              CLOSED
            </span>
          </h1>

          <p className="font-heading text-lg sm:text-2xl font-bold text-[#29ABE2] tracking-wide mb-4">
            Better Luck Next Time, Rocketeers! 🚀
          </p>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-xl mx-auto font-medium">
            All launch slots for <strong className="text-white font-semibold">Thrust 5.0</strong> have officially been filled. 
            Thank you for the thunderous response from the first-year batch! The mission manifest is now locked for this launch window.
          </p>
        </motion.div>

        {/* Next Steps & Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10 text-left"
        >
          {/* Card 1: For Registered Teams */}
          <div className="p-5 rounded-2xl bg-[#111A27]/90 border border-[#1E3A5F] hover:border-[#29ABE2]/60 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#29ABE2]/10 border border-[#29ABE2]/30 flex items-center justify-center text-[#29ABE2] text-lg mb-3">
                🎯
              </div>
              <div className="font-heading font-bold text-base text-white mb-1.5">
                Already Registered?
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Your flight slot is reserved. Stay active in the official communication channels for workshop schedules, kit distribution, and launch calibrations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1E3A5F]/50 flex items-center justify-between text-[11px] font-mono text-[#29ABE2]">
              <span>STATUS: MANIFEST LOCKED</span>
              <span className="text-emerald-400 font-bold">✓ READY</span>
            </div>
          </div>

          {/* Card 2: Rulebook & Spectators */}
          <div className="p-5 rounded-2xl bg-[#111A27]/90 border border-[#1E3A5F] hover:border-[#29ABE2]/60 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] text-lg mb-3">
                🏆
              </div>
              <div className="font-heading font-bold text-base text-white mb-1.5">
                ₹6,000 Prize Pool
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                High-altitude pressurized water rockets will battle for victory, including special awards for <strong className="text-slate-200">Best Design</strong> and the <strong className="text-slate-200">All-Girls Team</strong>. Spectators welcome!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1E3A5F]/50">
              <a
                href="/Thrust_5_0_RB.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#29ABE2] hover:text-white transition-colors"
              >
                <span>Read Official Rulebook (PDF)</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 3: Future Events */}
          <div className="p-5 rounded-2xl bg-[#111A27]/90 border border-[#1E3A5F] hover:border-[#29ABE2]/60 transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-lg mb-3">
                📡
              </div>
              <div className="font-heading font-bold text-base text-white mb-1.5">
                Missed Out?
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Don't worry! Aero Fabrication Club hosts aeromodelling workshops, RC aircraft showcases, and flight competitions round the year. Stay connected for next season.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1E3A5F]/50 flex items-center justify-between text-[11px] font-mono text-purple-400">
              <span>NEXT LAUNCH: STAY TUNED</span>
              <span>✦ AFC IIITDMJ</span>
            </div>
          </div>
        </motion.div>

        {/* Coordinator Helpdesk Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full mt-10 p-5 sm:p-6 rounded-2xl bg-[#0D1522] border border-[#1E3A5F] text-left"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1E3A5F]/60">
            <div>
              <div className="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span>Registration Support & Query Helpdesk</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E3A5F] text-[#29ABE2] font-semibold">
                  AFC TEAM
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Have questions regarding existing submissions, team adjustments, or event details? Contact coordinators below:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Lakshay */}
            <div className="p-3 rounded-xl bg-[#14233A]/80 border border-[#1E568A]/60 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#29ABE2] uppercase tracking-wider">
                  Registration Queries
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">Lakshay</div>
              </div>
              <a
                href="tel:9729088820"
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#cbd5e1] hover:text-[#29ABE2] font-mono font-medium transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                9729088820
              </a>
            </div>

            {/* Arjun */}
            <div className="p-3 rounded-xl bg-[#14233A]/80 border border-[#1E568A]/60 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#29ABE2] uppercase tracking-wider">
                  Event Coordinator
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">Arjun Nigam</div>
              </div>
              <a
                href="tel:9235665193"
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#cbd5e1] hover:text-[#29ABE2] font-mono font-medium transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                9235665193
              </a>
            </div>

            {/* Askini */}
            <div className="p-3 rounded-xl bg-[#14233A]/80 border border-[#1E568A]/60 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#29ABE2] uppercase tracking-wider">
                  Co-Coordinator
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">Askini Joshi</div>
              </div>
              <a
                href="tel:9479952334"
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#cbd5e1] hover:text-[#29ABE2] font-mono font-medium transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                9479952334
              </a>
            </div>

            {/* Ruthik */}
            <div className="p-3 rounded-xl bg-[#14233A]/80 border border-[#1E568A]/60 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#29ABE2] uppercase tracking-wider">
                  Co-Coordinator
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">Ruthik Roy</div>
              </div>
              <a
                href="tel:9989275764"
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#cbd5e1] hover:text-[#29ABE2] font-mono font-medium transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                9989275764
              </a>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-[#080C11] border-t border-[#1E3A5F] py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#64748B]">
          <div className="flex items-center gap-3">
            <img
              src={AFC_LOGO_BASE64}
              alt="AFC Logo"
              className="h-8 w-auto object-contain block drop-shadow-[0_0_8px_rgba(41,171,226,0.6)]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/afc-logo-transparent.png';
              }}
            />
            <div>
              <div className="font-heading font-extrabold text-sm text-white">
                THRUST <span className="text-[#29ABE2]">5.0</span>
              </div>
              <div className="text-[#29ABE2] font-semibold text-[11px]">
                Aero Fabrication Club, IIITDM Jabalpur
              </div>
            </div>
          </div>
          <div className="text-slate-400 font-medium text-center sm:text-right">
            © 2025 Aero Fabrication Club, IIITDM Jabalpur. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

