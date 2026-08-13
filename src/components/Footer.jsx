import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#080C11] border-t border-[#1E3A5F] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded bg-[#1E6FBA]/20 border border-[#29ABE2] flex items-center justify-center text-sm">
                🚀
              </div>
              <div className="font-heading font-extrabold text-xl text-white">
                THRUST <span className="text-[#29ABE2]">5.0</span>
              </div>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed max-w-sm">
              The premier water rocket competition by the Aero Fabrication Club, IIITDMJ. Empowering first-year engineering students to design, innovate, and launch.
            </p>
          </div>

          {/* Organization */}
          <div>
            <div className="font-heading text-xs font-bold tracking-widest text-[#29ABE2] uppercase mb-3">
              Organized By
            </div>
            <div className="font-heading font-bold text-sm text-white mb-1">
              Aero Fabrication Club (AFC)
            </div>
            <div className="text-xs text-[#94A3B8]">
              PDPM IIITDM Jabalpur, Madhya Pradesh
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-heading text-xs font-bold tracking-widest text-[#29ABE2] uppercase mb-3">
              Contact & Links
            </div>
            <div className="space-y-1.5 text-xs text-[#94A3B8]">
              <p>For queries, reach out to club coordinators</p>
              <a
                href="https://forms.gle/BJyMCNf8fPJxYeeB9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#29ABE2] hover:underline inline-block mt-1"
              >
                → Official Google Form Link
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1E3A5F]/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#64748B]">
          <div>
            © {new Date().getFullYear()} Aero Fabrication Club, IIITDMJ. All rights reserved.
          </div>
          <div className="font-mono text-[#29ABE2]">
            Water Rocket Competition · First-Year Exclusive
          </div>
        </div>
      </div>
    </footer>
  );
}
