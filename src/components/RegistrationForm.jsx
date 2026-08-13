import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Replace with your deployed Google Apps Script Web App URL
const DEFAULT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzbRFibdQV3w_UBY_iNif-qMuTWcMEtPahh56swLO2HVvGIa-2WAqhp38o70jzllYTD/exec';

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

  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [receiptBase64, setReceiptBase64] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const [scriptUrl, setScriptUrl] = useState(
    localStorage.getItem('thrust5_script_url') || ''
  );
  const [showConfig, setShowConfig] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [regId, setRegId] = useState('');

  const fileInputRef = useRef(null);

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  // Handle File Selection
  const handleFileChange = (file) => {
    if (!file) return;

    // Check size limit (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, receipt: 'File size must be under 8MB' }));
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, receipt: 'Please upload a PNG, JPG, WEBP image or PDF' }));
      return;
    }

    setReceiptFile(file);
    setErrors((prev) => ({ ...prev, receipt: null }));

    // Generate Preview if Image
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result);
        setReceiptBase64(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setReceiptPreview(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  const removeFile = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
    setReceiptBase64('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teamName.trim()) newErrors.teamName = 'Team Name is required';
    if (!formData.teamLeader.trim()) newErrors.teamLeader = 'Team Leader Name is required';
    if (!formData.leaderRoll.trim()) newErrors.leaderRoll = 'Team Leader Roll Number is required';

    if (!formData.leaderPhone.trim()) {
      newErrors.leaderPhone = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.leaderPhone.replace(/\s/g, ''))) {
      newErrors.leaderPhone = 'Enter a valid 10-digit mobile number';
    }

    if (!formData.m1Name.trim()) newErrors.m1Name = 'Member 1 Name is required';
    if (!formData.m1Roll.trim()) newErrors.m1Roll = 'Member 1 Roll Number is required';
    if (!formData.m2Name.trim()) newErrors.m2Name = 'Member 2 Name is required';
    if (!formData.m2Roll.trim()) newErrors.m2Roll = 'Member 2 Roll Number is required';

    if (!formData.experience) newErrors.experience = 'Please select an option';
    if (!receiptFile) newErrors.receipt = 'Payment screenshot or PDF receipt is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const generatedRegId = 'THRUST5-' + Math.floor(100000 + Math.random() * 900000);
    const payload = {
      regId: generatedRegId,
      timestamp: new Date().toISOString(),
      ...formData,
      paymentReceipt: receiptBase64,
      fileName: receiptFile ? receiptFile.name : ''
    };

    const targetUrl = scriptUrl || DEFAULT_SCRIPT_URL;

    try {
      if (targetUrl) {
        // Send as text/plain to bypass browser CORS preflight OPTIONS check for Google Apps Script
        await fetch(targetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      }

      // Save locally as backup
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

  // SUCCESS SCREEN (No redirect!)
  if (submittedData) {
    return (
      <section id="register" className="py-20 px-4 sm:px-6 bg-[#080C11] border-t border-[#1E3A5F]">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="cyber-card p-6 sm:p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#29ABE2]/10 border-2 border-[#29ABE2] flex items-center justify-center text-3xl text-[#29ABE2] mx-auto mb-4">
              🚀
            </div>
            <div className="font-mono text-xs font-bold text-[#29ABE2] uppercase tracking-widest mb-1">
              Registration Confirmed
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
              Team Registered!
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] mb-6">
              Your details and payment receipt have been saved directly to the Aero Fabrication Club competition sheet.
            </p>

            {/* Registration Summary Card */}
            <div className="bg-[#0A0F16] border border-[#1E3A5F] rounded-lg p-4 text-left space-y-2 mb-6">
              <div className="flex justify-between items-center border-b border-[#1E3A5F] pb-2">
                <span className="text-xs text-[#64748B]">Registration ID:</span>
                <span className="font-mono font-bold text-sm text-[#29ABE2]">{regId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#64748B]">Team Name:</span>
                <span className="font-bold text-xs text-white">{submittedData.teamName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#64748B]">Team Leader:</span>
                <span className="text-xs text-white">{submittedData.teamLeader} ({submittedData.leaderRoll})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#64748B]">Payment Proof:</span>
                <span className="text-xs text-green-400 font-semibold">✓ Uploaded ({receiptFile?.name || 'File Attached'})</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmittedData(null);
                setFormData({
                  teamName: '', teamLeader: '', leaderRoll: '', leaderPhone: '',
                  m1Name: '', m1Roll: '', m2Name: '', m2Roll: '', m3Name: '', m3Roll: '',
                  experience: '', motivation: ''
                });
                removeFile();
              }}
              className="px-6 py-3 rounded-lg border border-[#1E3A5F] text-[#94A3B8] hover:text-white font-heading font-bold text-xs uppercase tracking-wider"
            >
              Register Another Team
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

          {/* Optional Google Sheet Link Config Toggle */}
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="mt-3 text-[11px] text-[#64748B] hover:text-[#29ABE2] underline inline-block"
          >
            {showConfig ? 'Hide Sheet Web App Settings' : '⚙️ Configure Google Sheet Backend URL'}
          </button>

          {showConfig && (
            <div className="mt-3 p-3 bg-[#111827] border border-[#1E3A5F] rounded-lg max-w-lg mx-auto text-left">
              <label className="block text-[11px] font-bold text-[#29ABE2] mb-1">
                Google Apps Script Web App URL:
              </label>
              <input
                type="text"
                className="mobile-input text-xs"
                placeholder="https://script.google.com/macros/s/.../exec"
                value={scriptUrl}
                onChange={(e) => {
                  setScriptUrl(e.target.value);
                  localStorage.setItem('thrust5_script_url', e.target.value);
                }}
              />
              <p className="text-[10px] text-[#64748B] mt-1">
                Deploy `google-apps-script.gs` as a Web App (Access: Anyone) and paste the URL here to connect your live sheet.
              </p>
            </div>
          )}
        </motion.div>

        {/* Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="cyber-card p-5 sm:p-8 space-y-8"
        >
          {/* Section 1: Team Information */}
          <div className="space-y-4">
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

          {/* Section 3: Rocketry Experience & Motivation */}
          <div className="space-y-4">
            <div className="font-heading font-bold text-xs text-[#29ABE2] tracking-wider uppercase border-b border-[#1E3A5F] pb-2">
              3. Rocketry Experience & Motivation
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

          {/* Section 4: Direct Payment Proof Upload (No Google Form Redirect!) */}
          <div className="space-y-4">
            <div className="font-heading font-bold text-xs text-[#29ABE2] tracking-wider uppercase border-b border-[#1E3A5F] pb-2 flex justify-between items-center">
              <span>4. Upload Payment Proof (₹120)</span>
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
                  ? 'border-green-500/50 bg-[#0A0F16]'
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
                    <div className="w-16 h-16 rounded-lg bg-[#1E6FBA]/20 border border-[#29ABE2] flex items-center justify-center text-2xl mx-auto">
                      📄
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-xs text-white truncate max-w-xs mx-auto">
                      {receiptFile.name}
                    </div>
                    <div className="text-[11px] text-[#64748B]">
                      {(receiptFile.size / 1024).toFixed(1)} KB · Click to change file
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
                  <div className="w-12 h-12 rounded-full bg-[#111827] border border-[#1E3A5F] flex items-center justify-center text-xl mx-auto text-[#29ABE2]">
                    📤
                  </div>
                  <div className="font-bold text-xs text-white">
                    Drag & Drop UPI Payment Receipt Here
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    or <span className="text-[#29ABE2] underline">Browse file from device</span> (Max 8MB)
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
            {isSubmitting ? 'Uploading & Registering...' : 'Complete Team Registration →'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
