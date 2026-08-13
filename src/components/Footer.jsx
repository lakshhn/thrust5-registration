import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#080C11] border-t border-[#1E3A5F] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info with Official AFC Logo Image */}
          <div>
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-[#29ABE2] shadow-md shadow-[#29ABE2]/20 bg-[#0D1117]">
                <img
                  src="/afc-user-logo.jpg"
                  alt="Aero Fabrication Club"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/afc-logo.png';
                  }}
                />
              </div>
              <div>
                <div className="font-heading font-extrabold text-xl text-white tracking-wide">
                  THRUST <span className="text-[#29ABE2]">5.0</span>
                </div>
                <div className="text-[10px] font-mono text-[#29ABE2] uppercase font-bold tracking-widest">
                  AERO FABRICATION CLUB
                </div>
              </div>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              The flagship water rocket challenge organized by the Aero Fabrication Club, IIITDM Jabalpur. Inspiring innovation, aerodynamic design, and hands-on engineering excellence.
            </p>
          </div>

          {/* Organization */}
          <div>
            <div className="font-heading text-xs font-bold tracking-widest text-[#29ABE2] uppercase mb-3">
              Organized By
            </div>
            <div className="font-heading font-extrabold text-base text-white mb-1">
              Aero Fabrication Club (AFC)
            </div>
            <div className="text-xs text-[#94A3B8] leading-relaxed">
              PDPM Indian Institute of Information Technology, Design and Manufacturing, Jabalpur (IIITDMJ)
            </div>
          </div>

          {/* Event Info & Official Group */}
          <div>
            <div className="font-heading text-xs font-bold tracking-widest text-[#29ABE2] uppercase mb-3">
              Stay Connected
            </div>
            <div className="space-y-2 text-xs text-[#94A3B8]">
              <p>For competition updates, rulebook details, and scheduling, join the official participant groups.</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1E6FBA]/20 border border-[#29ABE2]/40 text-[#29ABE2] font-semibold text-xs mt-1">
                Aero Fabrication Club · IIITDM Jabalpur
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Prominent Aero Fabrication Club Mention */}
        <div className="border-t border-[#1E3A5F]/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div className="font-semibold text-slate-300">
            © {new Date().getFullYear()} <span className="text-[#29ABE2]">Aero Fabrication Club</span>, IIITDM Jabalpur. All rights reserved.
          </div>
          <div className="font-mono text-[#29ABE2] text-[11px] uppercase tracking-widest">
            Water Rocket Competition · First-Year Flagship
          </div>
        </div>
      </div>
    </footer>
  );
}
