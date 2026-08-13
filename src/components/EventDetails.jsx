import React from 'react';
import { motion } from 'framer-motion';

export default function EventDetails() {
  const cards = [
    { icon: '📅', label: 'Date', value: 'TBA 2025', desc: 'Mark your calendar' },
    { icon: '🕐', label: 'Time', value: '09:00 AM', desc: 'Onwards' },
    { icon: '📍', label: 'Venue', value: 'IIITDMJ Grounds', desc: 'Jabalpur Campus' },
    { icon: '💰', label: 'Entry Fee', value: '₹120', desc: 'Per team total' },
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
            Thrust 5.0 is the premier hands-on engineering competition for first-years at IIITDMJ. Test your knowledge of aerodynamics, pressure dynamics, and rocket stability as you build and launch your custom water rocket.
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
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
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
          <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-4 flex items-center gap-2">
            <span>🚀</span> Competition Format & Guidelines
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
