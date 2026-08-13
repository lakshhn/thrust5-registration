import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D1117]/95 border-b border-[#1E3A5F] backdrop-blur-md py-2.5 shadow-lg shadow-[#080C11]/50'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand logo featuring official AFC user logo image */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-[#29ABE2] shadow-md shadow-[#29ABE2]/20 group-hover:scale-105 transition-transform bg-[#080C11]">
            <img
              src="/afc-user-logo.jpg"
              alt="Aero Fabrication Club Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/afc-logo.png';
              }}
            />
          </div>
          <div>
            <div className="font-heading font-extrabold text-base sm:text-lg tracking-wider leading-none text-white flex items-center gap-1.5">
              <span>THRUST</span> <span className="text-[#29ABE2]">5.0</span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-[#29ABE2] uppercase font-bold mt-0.5">
              AERO FABRICATION CLUB · IIITDMJ
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#details"
            className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-[#29ABE2] transition-colors"
          >
            Overview
          </a>
          <a
            href="#rules"
            className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-[#29ABE2] transition-colors"
          >
            Rules
          </a>
          <a
            href="#register"
            className="btn-launch px-5 py-2.5 text-xs font-bold shadow-md shadow-[#29ABE2]/20"
          >
            Register Team
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-lg bg-[#111827] border border-[#1E3A5F] text-[#29ABE2] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0D1117] border-b border-[#1E3A5F] px-4 pt-4 pb-6 space-y-4 shadow-2xl"
          >
            <a
              href="#details"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-white py-2 border-b border-[#1E3A5F]/40"
            >
              Event Overview
            </a>
            <a
              href="#rules"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-white py-2 border-b border-[#1E3A5F]/40"
            >
              Guidelines & Format
            </a>
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-launch w-full text-center py-3 mt-4 text-xs font-extrabold uppercase tracking-wider"
            >
              Register Team Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
