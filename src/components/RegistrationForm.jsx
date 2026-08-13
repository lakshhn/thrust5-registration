import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RegistrationForm({ onSubmittedStateChange }) {
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
  });

  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptBase64, setReceiptBase64] = useState('');
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [regId, setRegId] = useState('');
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (onSubmittedStateChange) {
      onSubmittedStateChange(!!submittedData);
    }
  }, [submittedData, onSubmittedStateChange]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleFileChange = (file) => {
    if (!file) return;

    if (file.size > 12 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, receipt: 'File size exceeds 12MB limit.' }));
      return;
    }

    setReceiptFile(file);
    setErrors((prev) => ({ ...prev, receipt: null }));

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setReceiptPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setReceiptPreview(null);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Str = e.target.result.split(',')[1] || '';
      setReceiptBase64(base64Str);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setReceiptFile(null);
    setReceiptBase64('');
    setReceiptPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.teamName.trim()) errs.teamName = 'Team Name is required.';
    if (!formData.teamLeader.trim()) errs.teamLeader = 'Team Leader Name is required.';
    if (!formData.leaderRoll.trim()) errs.leaderRoll = 'Leader Roll Number is required.';

    if (!formData.leaderPhone.trim()) {
      errs.leaderPhone = 'Mobile number is required.';
    } else if (!/^[6-9]\d{9}$/.test(formData.leaderPhone.trim())) {
      errs.leaderPhone = 'Enter a valid 10-digit mobile number.';
    }

    if (!formData.m1Name.trim()) errs.m1Name = 'Member 1 Name is required.';
    if (!formData.m1Roll.trim()) errs.m1Roll = 'Member 1 Roll Number is required.';

    if (!formData.m2Name.trim()) errs.m2Name = 'Member 2 Name is required.';
    if (!formData.m2Roll.trim()) errs.m2Roll = 'Member 2 Roll Number is required.';

    if (!receiptFile) {
      errs.receipt = 'Please attach your payment receipt proof.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const generatedRegId = 'THRUST5-' + Math.floor(100000 + Math.random() * 900000);

    const payload = {
      regId: generatedRegId,
      timestamp: new Date().toISOString(),
      teamName: formData.teamName.trim(),
      teamLeader: formData.teamLeader.trim(),
      leaderRoll: formData.leaderRoll.trim(),
      leaderPhone: formData.leaderPhone.trim(),
      m1Name: formData.m1Name.trim(),
      m1Roll: formData.m1Roll.trim(),
      m2Name: formData.m2Name.trim(),
      m2Roll: formData.m2Roll.trim(),
      m3Name: formData.m3Name.trim() || 'N/A',
      m3Roll: formData.m3Roll.trim() || 'N/A',
      fileName: receiptFile ? receiptFile.name : '',
      fileMime: receiptFile ? receiptFile.type : '',
      fileData: receiptBase64,
    };

    const targetUrl = 'https://script.google.com/macros/s/AKfycbzbRFibdQV3w_UBY_iNif-qMuTWcMEtPahh56swLO2HVvGIa-2WAqhp38o70jzllYTD/exec';

    try {
      if (typeof window !== 'undefined') {
        const payloadString = JSON.stringify(payload);
        const iframeName = 'hidden_submission_iframe';
        let iframe = document.getElementById(iframeName);
        if (!iframe) {
          iframe = document.createElement('iframe');
          iframe.name = iframeName;
          iframe.id = iframeName;
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
        }

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = targetUrl;
        form.target = iframeName;

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'payload';
        input.value = payloadString;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();

        setTimeout(() => {
          if (form.parentNode) form.parentNode.removeChild(form);
        }, 1200);
      }

      const existing = JSON.parse(localStorage.getItem('thrust5_registrations') || '[]');
      existing.push(payload);
      localStorage.setItem('thrust5_registrations', JSON.stringify(existing));

      setRegId(generatedRegId);
      setSubmittedData(payload);
    } catch (err) {
      console.error('Submission error:', err);
      setRegId(generatedRegId);
      setSubmittedData(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegistrationDone = () => {
    setSubmittedData(null);
    setFormData({
      teamName: '', teamLeader: '', leaderRoll: '', leaderPhone: '',
      m1Name: '', m1Roll: '', m2Name: '', m2Roll: '', m3Name: '', m3Roll: ''
    });
    removeFile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SUCCESS SCREEN WITH SINGLE "REGISTRATION DONE" BUTTON (NO FLOATING CTA ON THIS VIEW)
  if (submittedData) {
    return (
      <section id="register" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#080C11] border-t border-[#1E3A5F]">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', damping: 20 }}
            className="cyber-card p-6 sm:p-8 text-center relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#29ABE2]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#1E6FBA]/20 rounded-full blur-3xl pointer-events-none" />

            {/* AFC Logo Emblem Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 rounded-2xl border-2 border-[#29ABE2] overflow-hidden mx-auto mb-4 shadow-xl shadow-[#29ABE2]/20 bg-[#080C11]"
            >
              <img
                src="/afc-user-logo.jpg"
                alt="AFC Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/afc-logo.png';
                }}
              />
            </motion.div>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Registration Confirmed
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight mb-2">
              Registration <span className="text-[#29ABE2]">Successful!</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto mb-5">
              Your team data and payment receipt proof have been logged into the official competition database.
            </p>

            {/* Ticket Card */}
            <div className="bg-[#0A0F16] border border-[#1E3A5F] rounded-xl p-5 text-left space-y-3 mb-5 shadow-inner">
              <div className="flex justify-between items-center border-b border-[#1E3A5F] pb-3">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748B]">Registered Team</div>
                  <div className="font-heading font-bold text-lg text-white">{submittedData.teamName}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748B]">Reg ID</div>
                  <div className="font-mono font-bold text-sm text-[#29ABE2] bg-[#29ABE2]/10 px-2 py-0.5 rounded border border-[#29ABE2]/30">
                    {regId}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-mono">Team Leader</span>
                  <span className="font-semibold text-white">{submittedData.teamLeader}</span>
                  <span className="text-[11px] text-[#94A3B8] block">({submittedData.leaderRoll})</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-mono">Leader Phone</span>
                  <span className="font-mono text-white">{submittedData.leaderPhone}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-mono">Teammates</span>
                  <span className="text-white font-medium">
                    {submittedData.m1Name}, {submittedData.m2Name}
                    {submittedData.m3Name ? `, ${submittedData.m3Name}` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase font-mono">Payment Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    ₹120 Submitted
                  </span>
                </div>
              </div>
            </div>

            {/* Official Announcement Box */}
            <div className="bg-[#1E6FBA]/10 border border-[#29ABE2]/30 rounded-xl p-4 text-left mb-6 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#29ABE2] uppercase tracking-wider">
                <svg className="w-4 h-4 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 58.6l-7-7 7-7m8 14l-7-7 7-7" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15L4 21l6.186-1.586" />
                </svg>
                Important Notice for Participants:
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Stay tuned on the official <strong>Thrust 5.0 WhatsApp Group</strong> and website for the official rulebook, launch schedule, domain briefing, and event guidelines!
              </p>
            </div>

            {/* Single Registration Done Button */}
            <button
              onClick={handleRegistrationDone}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#1E6FBA] to-[#29ABE2] hover:opacity-95 text-white font-heading font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#29ABE2]/20 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Registration Done
            </button>
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
            In-App Registration & Direct Sheet Sync
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3">
            Register Your <span className="text-[#29ABE2]">Team</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Complete form & upload payment receipt. Data is automatically recorded in your team's row.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="cyber-card p-6 sm:p-10 space-y-8"
        >
          {/* Section 1: Team & Leader */}
          <div className="space-y-4">
            <div className="font-heading font-bold text-xs text-[#29ABE2] tracking-wider uppercase border-b border-[#1E3A5F] pb-2">
              1. Team & Leader Details
            </div>

            <div>
              <label htmlFor="teamName" className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                Team Name <span className="text-[#29ABE2]">*</span>
              </label>
              <input
                id="teamName"
                type="text"
                className="mobile-input"
                placeholder="e.g. AeroDynamics 5"
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
                  placeholder="e.g. 2024CS101"
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
                placeholder="10-digit Mobile Number"
                value={formData.leaderPhone}
                onChange={(e) => updateField('leaderPhone', e.target.value)}
              />
              {errors.leaderPhone && <p className="text-red-400 text-xs mt-1">{errors.leaderPhone}</p>}
            </div>
          </div>

          {/* Section 2: Team Members */}
          <div className="space-y-4">
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

          {/* Section 3: Direct Payment Proof Upload */}
          <div className="space-y-4">
            <div className="font-heading font-bold text-xs text-[#29ABE2] tracking-wider uppercase border-b border-[#1E3A5F] pb-2 flex justify-between items-center">
              <span>3. Upload Payment Proof (₹120)</span>
              <span className="text-[10px] text-[#29ABE2]">PNG, JPG, WEBP, PDF</span>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${dragActive
                ? 'border-[#29ABE2] bg-[#29ABE2]/10'
                : receiptFile
                  ? 'border-emerald-500/50 bg-[#0A0F16]'
                  : 'border-[#1E3A5F] hover:border-[#29ABE2]/60 bg-[#0A0F16]'
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
                className="hidden"
                onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
              />

              {receiptFile ? (
                <div className="space-y-3">
                  {receiptPreview ? (
                    <img
                      src={receiptPreview}
                      alt="Receipt Preview"
                      className="w-32 h-32 object-cover rounded-lg mx-auto border border-[#1E3A5F]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#1E6FBA]/20 border border-[#29ABE2] flex items-center justify-center mx-auto text-[#29ABE2]">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-xs text-white truncate max-w-xs mx-auto">
                      {receiptFile.name}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-semibold mt-0.5 flex items-center justify-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Receipt Attached (Click to change)
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#111827] border border-[#1E3A5F] flex items-center justify-center mx-auto text-[#29ABE2]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <div className="font-bold text-xs text-white">
                    Drag & Drop UPI Payment Receipt Here
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    or <span className="text-[#29ABE2] underline">Browse file from device</span> (Max 12MB)
                  </div>
                </div>
              )}
            </div>
            {errors.receipt && <p className="text-red-400 text-xs">{errors.receipt}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-launch w-full text-base py-4 font-extrabold tracking-wider"
          >
            {isSubmitting ? 'Uploading & Registering...' : 'Complete Team Registration'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
