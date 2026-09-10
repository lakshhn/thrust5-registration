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
      value: '09:00 AM',
      desc: 'Onwards',
      icon: (
        <svg className="w-6 h-6 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Venue',
      value: 'Cricket Ground',
      desc: 'IIITDMJ Campus',
      icon: (
        <svg className="w-6 h-6 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      label: 'Entry Fee',
      value: '₹120',
      desc: 'Per team total (2-4 members)',
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
      desc: 'Total downrange horizontal distance achieved across the Cricket Ground from the launch pad to the landing zone.',
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
            Thrust 5.0 is the flagship hands-on engineering competition for first-years at IIITDMJ. Compete on the Cricket Ground for maximum time of flight, downrange distance, and engineering design.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
          className="cyber-card p-6 sm:p-8 border border-[#1E3A5F] relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#1E3A5F]/60 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#29ABE2]/10 border border-[#29ABE2]/40 flex items-center justify-center text-[#29ABE2] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white">Official Rulebook</h3>
                <p className="text-xs text-[#94A3B8]">Technical specifications, dimension limits & launch protocols</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              To Be Released Soon
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs text-[#94A3B8] mb-6">
            <div className="p-4 rounded-xl bg-[#0A0F16] border border-[#1E3A5F]/70">
              <div className="font-heading font-bold text-white text-xs mb-1.5 flex items-center gap-1.5 text-[#29ABE2]">
                <span>⚙️</span> Launcher Specifications
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Custom-fabricated launch platforms permitted. Must support secure angle calibration and remote pull-cord release.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A0F16] border border-[#1E3A5F]/70">
              <div className="font-heading font-bold text-white text-xs mb-1.5 flex items-center gap-1.5 text-[#29ABE2]">
                <span>🚀</span> Rocket Dimensions & Materials
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Built strictly using standard PET beverage bottles. Metal, glass, and sharp hazardous nose ballasts are prohibited.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A0F16] border border-[#1E3A5F]/70">
              <div className="font-heading font-bold text-white text-xs mb-1.5 flex items-center gap-1.5 text-[#29ABE2]">
                <span>🛡️</span> Pressure & Safety Limits
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Water and compressed air only. Operating pressure limits and field inspection guidelines will be specified in the rulebook.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[#111827] border border-[#1E3A5F]">
            <div className="text-xs text-slate-300">
              📢 The official PDF rulebook with launch slot timings and scoring formulas will be published here & shared on the WhatsApp group prior to the event.
            </div>
            <button disabled className="btn-launch opacity-50 cursor-not-allowed px-5 py-2.5 text-xs tracking-wider shrink-0">
              Rulebook Coming Soon
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

