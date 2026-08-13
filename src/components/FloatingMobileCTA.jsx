import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bottom bar after user scrolls down 300px and hide when near bottom
      const scrolled = window.scrollY > 300;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      setIsVisible(scrolled && !nearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed bottom-4 left-4 right-4 z-40"
        >
          <div className="bg-[#0D1117]/95 border border-[#1E3A5F] p-3 rounded-xl shadow-2xl backdrop-blur-lg flex items-center justify-between gap-3">
            <div>
              <div className="font-heading font-extrabold text-xs text-white">
                THRUST <span className="text-[#29ABE2]">5.0</span>
              </div>
              <div className="text-[10px] text-[#29ABE2] font-semibold">
                Entry: ₹120 / Team
              </div>
            </div>
            <a
              href="#register"
              className="btn-launch px-4 py-2 text-xs font-bold whitespace-nowrap"
            >
              Register Team
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
