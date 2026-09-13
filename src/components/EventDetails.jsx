import React from 'react';
import { motion } from 'framer-motion';

export default function EventDetails() {
  const cards = [
    {
      label: 'Date',
      value: '4 Oct 2026',
      desc: 'Sunday · Save the date',
      icon: (
        <svg className="w-6 h-6 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'Time',
      value: '08:00 AM',
      desc: 'Onwards',
      icon: (
        <svg className="w-6 h-6 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Entry Fee',
      value: '₹120',
      desc: 'Per team total (2-3 members)',
      icon: (
        <svg className="w-6 h-6 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
  ];

  const judgingCriteria = [
    {
      title: 'Max Time of Flight',
      badge: 'Airtime',
      desc: 'Measured from pressurized launch release to initial ground contact. Sustained aerodynamic hang-time yields maximum points.',
      icon: (
        <svg className="w-5 h-5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Maximum Range',
      badge: 'Distance',
      desc: 'Total downrange horizontal distance achieved from the launch pad to the landing zone.',
      icon: (
        <svg className="w-5 h-5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: 'Rocket Design',
      badge: 'Aerodynamics',
      desc: 'Fin geometry and alignment, center-of-gravity/pressure balance, nose cone shaping, payload balance, and aesthetic finish.',
      icon: (
        <svg className="w-5 h-5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: 'Launcher Design',
      badge: 'Engineering',
      desc: 'Launch platform rigidity, air-water pressure seal integrity, nozzle release reliability, and launch trigger safety mechanism.',
      icon: (
        <svg className="w-5 h-5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  return (
    <section id="details" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D1117] border-t border-[#1E3A5F]">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="font-heading text-xs font-semibold tracking-widest text-[#29ABE2] uppercase mb-2">
            Event Overview
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Engineer. Build. <span className="text-[#29ABE2]">Launch.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Thrust 5.0 is the flagship hands-on engineering competition for first-years at IIITDMJ. Compete for maximum time of flight, downrange distance, and engineering design.
          </p>
        </motion.div>

        {/* Grand Prize Pool & Special Category Awards Spotlight */}
        <motion.div
          id="prizes"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border-2 border-[#29ABE2]/50 bg-gradient-to-b from-[#0F1D30] via-[#0A1320] to-[#080D14] p-6 sm:p-10 text-center overflow-hidden shadow-[0_0_50px_rgba(41,171,226,0.18)]"
        >
          {/* Ambient Corner Glows */}
          <div className="absolute -top-24 -left-24 w-56 h-56 bg-[#29ABE2]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Aerospace HUD Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#29ABE2] pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#29ABE2] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#29ABE2] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#29ABE2] pointer-events-none" />

          {/* Top Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/35 text-[#FBBF24] text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#FBBF24] animate-pulse" />
            Official Competition Rewards
          </div>

          {/* Main Title & Massive Prize Amount */}
          <div className="font-heading font-extrabold text-xs sm:text-sm text-[#29ABE2] uppercase tracking-[0.25em] mb-1">
            Total Prize Pool
          </div>
          <div
            className="font-heading font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight my-2 select-none"
            style={{
              fontFamily: "'Rajdhani', 'Space Grotesk', sans-serif",
              background: 'linear-gradient(135deg, #FFFFFF 0%, #56CCF2 30%, #FBBF24 75%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px rgba(41,171,226,0.4)) drop-shadow(0 0 40px rgba(245,158,11,0.25))',
            }}
          >
            ₹6,000
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto mb-8 font-medium leading-relaxed">
            Cash prizes, official championship trophies, and certificates of excellence for winning teams.
          </p>

          {/* 2 Featured Special Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
            {/* Card 1: Best Design */}
            <div className="p-5 rounded-xl bg-[#0D1624]/90 border border-[#29ABE2]/40 hover:border-[#29ABE2] transition-all group relative overflow-hidden shadow-lg shadow-[#29ABE2]/5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#29ABE2]/15 border border-[#29ABE2]/30 flex items-center justify-center text-[#29ABE2] shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#29ABE2]/10 border border-[#29ABE2]/30 text-[#29ABE2]">
                  Special Prize
                </span>
              </div>
              <div className="font-heading font-extrabold text-base sm:text-lg text-white mb-1.5 flex items-center gap-1.5">
                <span>Best Design Award</span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Special dedicated cash prize honoring the team with the most innovative aerodynamic rocket design, fin stability, and precision launcher mechanics.
              </p>
            </div>

            {/* Card 2: All Girls Team */}
            <div className="p-5 rounded-xl bg-[#0D1624]/90 border border-[#F472B6]/40 hover:border-[#F472B6] transition-all group relative overflow-hidden shadow-lg shadow-[#F472B6]/5">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#F472B6]/15 border border-[#F472B6]/30 flex items-center justify-center text-[#F472B6] shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#F472B6]/10 border border-[#F472B6]/30 text-[#F472B6]">
                  Special Prize
                </span>
              </div>
              <div className="font-heading font-extrabold text-base sm:text-lg text-white mb-1.5 flex items-center gap-1.5">
                <span>All-Girls Team Prize</span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Exclusive special award celebrating and empowering women in rocketry — recognizing the top-performing all-women team in the competition.
              </p>
            </div>
          </div>

          {/* Additional Perks Footer Strip */}
          <div className="mt-6 pt-5 border-t border-[#1E3A5F]/60 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span> Cash Rewards
            </span>
            <span className="hidden sm:inline text-[#1E3A5F]">·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span> Winner Trophies & Medals
            </span>
            <span className="hidden sm:inline text-[#1E3A5F]">·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span> Certificates of Excellence for Winners
            </span>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="cyber-card p-5 sm:p-6 hover:border-[#29ABE2] transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1E6FBA]/20 border border-[#29ABE2]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <div className="font-mono text-[10px] font-bold tracking-widest text-[#29ABE2] uppercase mb-1">
                {card.label}
              </div>
              <div className="font-heading font-bold text-xl sm:text-2xl text-white mb-1">
                {card.value}
              </div>
              <div className="text-xs text-[#64748B]">
                {card.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Judging & Scoring Criteria */}
        <motion.div
          id="judging"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#1E3A5F] pb-3">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-white">Judging & Scoring Criteria</h3>
              <p className="text-xs text-[#94A3B8]">Official evaluation parameters deciding the Thrust 5.0 Champions</p>
            </div>
            <div className="text-[11px] font-mono text-[#29ABE2] bg-[#29ABE2]/10 px-3 py-1 rounded-full border border-[#29ABE2]/30">
              4 Core Parameters
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {judgingCriteria.map((crit) => (
              <div key={crit.title} className="cyber-card p-5 border border-[#1E3A5F] hover:border-[#29ABE2]/60 transition-all group">
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1E6FBA]/20 border border-[#29ABE2]/30 flex items-center justify-center shrink-0">
                      {crit.icon}
                    </div>
                    <span className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-[#29ABE2] transition-colors">
                      {crit.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#111827] border border-[#1E3A5F] text-[#29ABE2]">
                    {crit.badge}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed pl-10">
                  {crit.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Official Rulebook Section */}
        <motion.div
          id="rules"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="cyber-card p-5 sm:p-8 border border-[#1E3A5F] relative overflow-hidden"
        >
          <div className="flex items-center gap-3 border-b border-[#1E3A5F]/60 pb-4 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#29ABE2]/10 border border-[#29ABE2]/40 flex items-center justify-center text-[#29ABE2] shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white">Official Rulebook</h3>
              <p className="text-xs text-[#94A3B8]">Key rules & specifications — download the PDF for complete details</p>
            </div>
          </div>

          {/* Quick Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5">
            {[
              { icon: '👥', label: 'Team Size', val: '2–3 Members' },
              { icon: '🚫', label: 'Prohibited', val: 'Electronics, Metal, Glass' },
              { icon: '💧', label: 'Propellant', val: 'Water + Air Only' },
              { icon: '🔧', label: 'Launcher', val: 'Own Launcher Required' },
            ].map(h => (
              <div key={h.label} className="p-3 sm:p-3.5 rounded-xl bg-[#0A0F16] border border-[#1E3A5F]/60 text-center">
                <div className="text-lg sm:text-xl mb-1">{h.icon}</div>
                <div className="text-[10px] font-mono font-bold text-[#29ABE2] uppercase tracking-wider">{h.label}</div>
                <div className="text-[11px] sm:text-xs text-[#94A3B8] font-medium mt-0.5 leading-tight">{h.val}</div>
              </div>
            ))}
          </div>

          {/* Single Download bar */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#111827] border border-[#1E3A5F] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] sm:text-xs text-slate-300 text-center sm:text-left">
              📢 Detailed rules, launch protocols, scoring formulas, and event guidelines are in the official PDF rulebook.
            </p>
            <a
              href="/Thrust_5_0_RB.pdf"
              download="Thrust_5_0_Rulebook.pdf"
              className="btn-launch px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs tracking-wider shrink-0 no-underline inline-flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Full Rulebook PDF
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

