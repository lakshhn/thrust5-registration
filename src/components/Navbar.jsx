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
          ? 'bg-[#0D1117]/95 border-b border-[#1E3A5F] backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-[#1E6FBA]/20 border border-[#29ABE2]/40 flex items-center justify-center font-heading font-extrabold text-[#29ABE2] text-lg group-hover:scale-105 transition-transform">
            🚀
          </div>
          <div>
            <div className="font-heading font-extrabold text-lg tracking-wider leading-none text-white">
              THRUST <span className="text-[#29ABE2]">5.0</span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
              AFC · IIITDMJ
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#details"
            className="text-sm font-medium text-[#94A3B8] hover:text-[#29ABE2] transition-colors"
          >
            Event Overview
          </a>
          <a
            href="#rules"
            className="text-sm font-medium text-[#94A3B8] hover:text-[#29ABE2] transition-colors"
          >
            Guidelines
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-[#94A3B8] hover:text-[#29ABE2] transition-colors"
          >
            FAQs
          </a>
          <a
            href="#register"
            className="btn-launch px-5 py-2 text-xs font-semibold"
          >
            Register Team
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#111827] border border-[#1E3A5F] text-[#29ABE2] focus:outline-none"
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
              className="block text-base font-medium text-[#94A3B8] hover:text-white py-2 border-b border-[#1E3A5F]/40"
            >
              Event Overview
            </a>
            <a
              href="#rules"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#94A3B8] hover:text-white py-2 border-b border-[#1E3A5F]/40"
            >
              Guidelines & Format
            </a>
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-launch w-full text-center py-3 mt-4 text-sm"
            >
              Register Team Now →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
