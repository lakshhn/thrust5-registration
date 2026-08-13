import React from 'react';
import { motion } from 'framer-motion';

export default function EventDetails() {
  const cards = [
    {
      label: 'Date',
      value: 'TBA 2025',
      desc: 'Mark your calendar',
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
      value: 'IIITDMJ Grounds',
      desc: 'Jabalpur Campus',
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
      desc: 'Per team total',
      icon: (
        <svg className="w-6 h-6 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
  ];

  const rules = [
    'Exclusively for 1st-year undergraduate students of IIITDMJ.',
    'Form a team of 2 to 4 members with a designated Team Leader.',
    'Design and build a water rocket using principles of aerodynamics & propulsion.',
    'Rockets must use water + pressurized air only (no chemical propellants).',
    'Evaluation based on apogee (max height), flight stability, and fabrication quality.'
  ];

  return (
    <section id="details" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D1117] border-t border-[#1E3A5F]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="font-heading text-xs font-semibold tracking-widest text-[#29ABE2] uppercase mb-2">
            Event Overview
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Engineer. Build. <span className="text-[#29ABE2]">Launch.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Thrust 5.0 is the flagship hands-on engineering competition for first-years at IIITDMJ. Test your knowledge of aerodynamics, pressure dynamics, and rocket stability as you build and launch your custom water rocket.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
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

        {/* Competition Rules & Format Card */}
        <motion.div
          id="rules"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="cyber-card p-6 sm:p-8 border-l-4 border-l-[#29ABE2]"
        >
          <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-4 flex items-center gap-2.5">
            <svg className="w-5 h-5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Competition Format & Guidelines
          </h3>
          <ul className="space-y-3">
            {rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#94A3B8] leading-normal">
                <span className="text-[#29ABE2] font-bold text-base leading-none">›</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
