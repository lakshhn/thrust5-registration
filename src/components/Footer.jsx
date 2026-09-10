import React from 'react';
import { AFC_LOGO_BASE64 } from '../assets/imageAssets';

export default function Footer() {
  return (
    <footer className="bg-[#080C11] border-t border-[#1E3A5F] py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Brand & Attribution */}
        <div className="flex items-center gap-4">
          <img
            src={AFC_LOGO_BASE64}
            alt="Aero Fabrication Club"
            className="h-11 w-auto object-contain block drop-shadow-[0_0_12px_rgba(41,171,226,0.6)]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/afc-logo-transparent.png';
            }}
          />
          <div>
            <div className="font-heading font-extrabold text-base text-white tracking-wider">
              THRUST <span className="text-[#29ABE2]">5.0</span>
            </div>
            <div className="text-xs text-[#29ABE2] font-semibold">
              Aero Fabrication Club, IIITDM Jabalpur
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-xs text-[#94A3B8]">
          <a href="#details" className="hover:text-[#29ABE2] transition-colors">Overview</a>
          <a href="#rules" className="hover:text-[#29ABE2] transition-colors">Rules</a>
          <a href="#register" className="hover:text-[#29ABE2] transition-colors">Register</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#64748B] font-medium">
          © 2025 Aero Fabrication Club, IIITDM Jabalpur. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
