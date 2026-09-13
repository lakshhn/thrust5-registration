import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AFC_LOGO_BASE64 } from '../assets/imageAssets';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#0D1117]/95 border-b border-[#1E3A5F] py-2.5 backdrop-blur-md shadow-xl'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo & Name - Transparent AFC Logo with aero glow */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={AFC_LOGO_BASE64}
            alt="Aero Fabrication Club Logo"
            className="h-9 sm:h-10 w-auto object-contain block drop-shadow-[0_0_12px_rgba(41,171,226,0.6)] transition-transform group-hover:scale-105 duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/afc-logo-transparent.png';
            }}
          />
          <div>
            <span className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-white block leading-tight">
              THRUST <span className="text-[#29ABE2]">5.0</span>
            </span>
            <span className="text-[10px] font-mono text-[#29ABE2] tracking-widest uppercase font-bold block">
              Aero Fabrication Club · IIITDMJ
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
          <a href="#details" className="hover:text-[#29ABE2] transition-colors">
            Overview
          </a>
          <a href="#prizes" className="hover:text-[#FBBF24] transition-colors flex items-center gap-1.5 text-white">
            <span className="text-[#FBBF24]">🏆</span> Prizes
          </a>
          <a href="#rules" className="hover:text-[#29ABE2] transition-colors">
            Rules & Criteria
          </a>
          <a
            href="#register"
            className="btn-launch px-5 py-2.5 text-xs tracking-wider uppercase font-extrabold shadow-md shadow-[#29ABE2]/20"
          >
            Register Team
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#29ABE2] hover:text-white transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0D1117] border-b border-[#1E3A5F] px-4 py-5 space-y-4"
          >
            <a
              href="#details"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-[#29ABE2]"
            >
              Overview
            </a>
            <a
              href="#prizes"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-[#FBBF24] hover:text-[#FBBF24] flex items-center gap-1.5"
            >
              <span>🏆</span> Prize Pool (₹6,000)
            </a>
            <a
              href="#rules"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-[#29ABE2]"
            >
              Rules & Criteria
            </a>
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-launch w-full text-center py-3 text-xs tracking-wider uppercase font-bold block"
            >
              Register Team
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
