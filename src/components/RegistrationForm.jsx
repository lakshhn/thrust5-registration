import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeader: '',
    leaderRoll: '',
    leaderPhone: '',
    m1Name: '',
    m1Roll: '',
    m2Name: '',
    m2Roll: '',
    m3Name: '',
    m3Roll: '',
    experience: '',
    motivation: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teamName.trim()) newErrors.teamName = 'Team Name is required';
    if (!formData.teamLeader.trim()) newErrors.teamLeader = 'Team Leader Name is required';
    if (!formData.leaderRoll.trim()) newErrors.leaderRoll = 'Team Leader Roll Number is required';
    
    if (!formData.leaderPhone.trim()) {
      newErrors.leaderPhone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.leaderPhone.replace(/\s/g, ''))) {
      newErrors.leaderPhone = 'Enter a valid 10-digit mobile number';
    }

    if (!formData.m1Name.trim()) newErrors.m1Name = 'Member 1 Name is required';
    if (!formData.m1Roll.trim()) newErrors.m1Roll = 'Member 1 Roll Number is required';
    if (!formData.m2Name.trim()) newErrors.m2Name = 'Member 2 Name is required';
    if (!formData.m2Roll.trim()) newErrors.m2Roll = 'Member 2 Roll Number is required';

    if (!formData.experience) newErrors.experience = 'Please select an option';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        // Direct to Google Form after brief delay
        setTimeout(() => {
          window.open('https://forms.gle/BJyMCNf8fPJxYeeB9', '_blank');
        }, 800);
      }, 500);
    }
  };

  if (submitted) {
    return (
      <section id="register" className="py-20 px-4 sm:px-6 bg-[#080C11] border-t border-[#1E3A5F]">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="cyber-card p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#29ABE2]/10 border-2 border-[#29ABE2] flex items-center justify-center text-3xl text-[#29ABE2] mx-auto mb-4">
              ✓
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
              Registration Saved!
            </h3>
            <p className="text-sm text-[#94A3B8] mb-6 leading-relaxed">
              Opening the official Google Form to complete your ₹120 fee payment screenshot upload...
            </p>
            <a
              href="https://forms.gle/BJyMCNf8fPJxYeeB9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-launch px-6 py-3 text-xs w-full block text-center"
            >
              Click Here If Form Didn't Open Automatically →
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#080C11] border-t border-[#1E3A5F]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="font-heading text-xs font-semibold tracking-widest text-[#29ABE2] uppercase mb-2">
            Team Registration
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3">
            Register Your <span className="text-[#29ABE2]">Team</span>
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Fill in your team details below. Registration fee is ₹120 per team.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="cyber-card p-5 sm:p-8"
        >
          {/* Section: Team Details */}
          <div className="space-y-4 mb-8">
            <div className="font-heading font-bold text-xs text-[#29ABE2] tracking-wider uppercase border-b border-[#1E3A5F] pb-2">
              1. Team Information
            </div>

            <div>
              <label htmlFor="teamName" className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                Team Name <span className="text-[#29ABE2]">*</span>
              </label>
              <input
                id="teamName"
                type="text"
                className="mobile-input"
                placeholder="e.g. AeroWolves"
                value={formData.teamName}
                onChange={(e) => updateField('teamName', e.target.value)}
              />
              {errors.teamName && <p className="text-red-400 text-xs mt-1">{errors.teamName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="teamLeader" className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                  Team Leader Name <span className="text-[#29ABE2]">*</span>
                </label>
                <input
                  id="teamLeader"
                  type="text"
                  className="mobile-input"
                  placeholder="Full Name"
                  value={formData.teamLeader}
                  onChange={(e) => updateField('teamLeader', e.target.value)}
                />
                {errors.teamLeader && <p className="text-red-400 text-xs mt-1">{errors.teamLeader}</p>}
              </div>

              <div>
                <label htmlFor="leaderRoll" className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                  Leader Roll Number <span className="text-[#29ABE2]">*</span>
                </label>
                <input
                  id="leaderRoll"
                  type="text"
                  className="mobile-input"
                  placeholder="e.g. 2024UCS001"
                  value={formData.leaderRoll}
                  onChange={(e) => updateField('leaderRoll', e.target.value)}
                />
                {errors.leaderRoll && <p className="text-red-400 text-xs mt-1">{errors.leaderRoll}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="leaderPhone" className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                Team Leader Mobile Number <span className="text-[#29ABE2]">*</span>
              </label>
              <input
                id="leaderPhone"
                type="tel"
                className="mobile-input"
                placeholder="10-digit Phone Number"
                value={formData.leaderPhone}
                onChange={(e) => updateField('leaderPhone', e.target.value)}
              />
              {errors.leaderPhone && <p className="text-red-400 text-xs mt-1">{errors.leaderPhone}</p>}
            </div>
          </div>

          {/* Section: Team Members */}
          <div className="space-y-4 mb-8">
            <div className="font-heading font-bold text-xs text-[#29ABE2] tracking-wider uppercase border-b border-[#1E3A5F] pb-2">
              2. Team Members
            </div>

            {/* Member 1 */}
            <div className="bg-[#0A0F16] p-4 rounded-lg border border-[#1E3A5F]/60 space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">Member 1</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    className="mobile-input"
                    placeholder="Full Name *"
                    value={formData.m1Name}
                    onChange={(e) => updateField('m1Name', e.target.value)}
                  />
                  {errors.m1Name && <p className="text-red-400 text-xs mt-1">{errors.m1Name}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    className="mobile-input"
                    placeholder="Roll Number *"
                    value={formData.m1Roll}
                    onChange={(e) => updateField('m1Roll', e.target.value)}
                  />
                  {errors.m1Roll && <p className="text-red-400 text-xs mt-1">{errors.m1Roll}</p>}
                </div>
              </div>
            </div>

            {/* Member 2 */}
            <div className="bg-[#0A0F16] p-4 rounded-lg border border-[#1E3A5F]/60 space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">Member 2</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    className="mobile-input"
                    placeholder="Full Name *"
                    value={formData.m2Name}
                    onChange={(e) => updateField('m2Name', e.target.value)}
                  />
                  {errors.m2Name && <p className="text-red-400 text-xs mt-1">{errors.m2Name}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    className="mobile-input"
                    placeholder="Roll Number *"
                    value={formData.m2Roll}
                    onChange={(e) => updateField('m2Roll', e.target.value)}
                  />
                  {errors.m2Roll && <p className="text-red-400 text-xs mt-1">{errors.m2Roll}</p>}
                </div>
              </div>
            </div>

            {/* Member 3 (Optional) */}
            <div className="bg-[#0A0F16] p-4 rounded-lg border border-[#1E3A5F]/40 space-y-3">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                Member 3 <span className="text-[10px] font-normal lowercase">(optional)</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  className="mobile-input"
                  placeholder="Full Name"
                  value={formData.m3Name}
                  onChange={(e) => updateField('m3Name', e.target.value)}
                />
                <input
                  type="text"
                  className="mobile-input"
                  placeholder="Roll Number"
                  value={formData.m3Roll}
                  onChange={(e) => updateField('m3Roll', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section: Additional Information */}
          <div className="space-y-4 mb-8">
            <div className="font-heading font-bold text-xs text-[#29ABE2] tracking-wider uppercase border-b border-[#1E3A5F] pb-2">
              3. Additional Questions
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-2">
                Prior experience with model rocketry or aeronautics? <span className="text-[#29ABE2]">*</span>
              </label>
              <div className="flex gap-6">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-white">
                    <input
                      type="radio"
                      name="experience"
                      value={opt}
                      checked={formData.experience === opt}
                      onChange={() => updateField('experience', opt)}
                      className="w-4 h-4 accent-[#29ABE2]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
              {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience}</p>}
            </div>

            <div>
              <label htmlFor="motivation" className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                Primary motivation for participating
              </label>
              <select
                id="motivation"
                className="mobile-input"
                value={formData.motivation}
                onChange={(e) => updateField('motivation', e.target.value)}
              >
                <option value="">Select primary motivation</option>
                <option value="aerodynamics">To learn about aerodynamics & propulsion</option>
                <option value="fabrication">To gain hands-on fabrication experience</option>
                <option value="competition">To compete for prizes & glory</option>
                <option value="fun">Just for fun / team building</option>
              </select>
            </div>
          </div>

          {/* Fee Notice Box */}
          <div className="p-4 rounded-lg bg-[#29ABE2]/10 border border-[#29ABE2]/30 mb-6">
            <div className="text-xs font-bold text-[#29ABE2] uppercase tracking-wider mb-1">
              Step 2 — ₹120 Registration Fee
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Upon clicking "Submit Registration", you will be redirected to the Google Form to upload your UPI payment receipt screenshot.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-launch w-full text-base py-4 font-extrabold tracking-wider"
          >
            {isSubmitting ? 'Processing...' : 'Submit Registration →'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
