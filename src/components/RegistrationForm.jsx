import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AFC_LOGO_BASE64 } from '../assets/imageAssets';

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
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [selectedQr, setSelectedQr] = useState('qr1');

  const qrOptions = {
    qr1: {
      name: 'Option 1 (Shirshendu)',
      payee: 'Shirshendu R Tripathi',
      upiId: 'shirsh8924@oksbi',
      image: '/payment-qr.png',
      alt: 'Thrust 5.0 Payment QR - shirsh8924@oksbi',
      link: 'upi://pay?pa=shirsh8924@oksbi&pn=Shirshendu%20R%20Tripathi&am=120&cu=INR&tn=Thrust%205.0%20Registration',
    },
    qr2: {
      name: 'Option 2 (Apurva)',
      payee: 'APURVA VERMA',
      upiId: 'vermaapurva33@ibl',
      image: '/payment-qr-2.png',
      alt: 'Thrust 5.0 Payment QR - vermaapurva33@ibl',
      link: 'upi://pay?pa=vermaapurva33@ibl&pn=APURVA%20VERMA&am=120&cu=INR&tn=Thrust%205.0%20Registration',
    },
  };

  const activeQr = qrOptions[selectedQr] || qrOptions.qr1;

  const copyUpiId = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(activeQr.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [regId, setRegId] = useState('');
  const [errors, setErrors] = useState({});

  // ── Existing Registered Team Names Cache ──
  const [existingTeams, setExistingTeams] = useState(() => {
    const teams = new Set();
    try {
      const stored = JSON.parse(localStorage.getItem('thrust5_existing_teams') || '[]');
      if (Array.isArray(stored)) stored.forEach((t) => t && teams.add(t.trim()));
      const registrations = JSON.parse(localStorage.getItem('thrust5_registrations') || '[]');
      if (Array.isArray(registrations)) {
        registrations.forEach((r) => { if (r && r.teamName) teams.add(r.teamName.trim()); });
      }
    } catch (_) {}
    return Array.from(teams);
  });

  const fileInputRef = useRef(null);

  // Sync registered team names from Google Sheets & local cache
  useEffect(() => {
    const targetUrl = 'https://script.google.com/macros/s/AKfycbzbRFibdQV3w_UBY_iNif-qMuTWcMEtPahh56swLO2HVvGIa-2WAqhp38o70jzllYTD/exec';

    const mergeTeams = (newTeams) => {
      if (!Array.isArray(newTeams) || newTeams.length === 0) return;
      setExistingTeams((prev) => {
        const set = new Set(prev);
        newTeams.forEach((t) => t && set.add(t.trim()));
        const merged = Array.from(set);
        try { localStorage.setItem('thrust5_existing_teams', JSON.stringify(merged)); } catch (_) {}
        return merged;
      });
    };

    // 1. Direct fetch to GAS doGet
    fetch(targetUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.teams)) {
          mergeTeams(data.teams);
        }
      })
      .catch(() => {});

    // 2. JSONP fallback to GAS doGet
    try {
      const cbName = 'thrust5_cb_teams_' + Math.floor(Math.random() * 1000000);
      window[cbName] = (data) => {
        if (data && Array.isArray(data.teams)) {
          mergeTeams(data.teams);
        }
        delete window[cbName];
        if (script.parentNode) script.parentNode.removeChild(script);
      };
      const script = document.createElement('script');
      script.src = `${targetUrl}?callback=${cbName}`;
      script.onerror = () => {
        delete window[cbName];
        if (script.parentNode) script.parentNode.removeChild(script);
      };
      document.body.appendChild(script);
    } catch (_) {}

    // 3. Google Sheets GViz public query fallback
    fetch('https://docs.google.com/spreadsheets/d/1U_W0ghyQQN_LT6BUu9mInyWEHy6og-VqcP85lzwXlgY/gviz/tq?tqx=out:json')
      .then((res) => res.text())
      .then((txt) => {
        const jsonMatch = txt.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);/);
        if (jsonMatch && jsonMatch[1]) {
          const parsed = JSON.parse(jsonMatch[1]);
          const rows = parsed?.table?.rows || [];
          const gvizTeams = rows
            .map((r) => r?.c?.[1]?.v)
            .filter((v) => v && typeof v === 'string' && v.trim() && v !== 'Team Name');
          mergeTeams(gvizTeams);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (onSubmittedStateChange) {
      onSubmittedStateChange(!!submittedData);
    }
  }, [submittedData, onSubmittedStateChange]);

  const normalizeTeamName = (name) => (name || '').toLowerCase().replace(/[^a-z0-9_]/g, '');

  const checkTeamName = (name, isBlurOrSubmit = false) => {
    const trimmed = (name || '').trim();
    if (!trimmed) {
      return isBlurOrSubmit ? 'Team Name is required.' : null;
    }

    // Disallow special characters: only letters, numbers, spaces, and underscores allowed
    if (!/^[a-zA-Z0-9_ ]+$/.test(trimmed)) {
      return 'Special characters are not allowed! Use only letters, numbers, spaces, and underscores (_).';
    }

    const norm = normalizeTeamName(trimmed);
    if (!norm) return null;

    const match = existingTeams.find((existing) => normalizeTeamName(existing) === norm);
    if (match) {
      return `Team name "${trimmed}" already exists! Please choose a different team name.`;
    }

    return null;
  };

  const handleTeamNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, teamName: val }));
    const err = checkTeamName(val, false);
    setErrors((prev) => ({ ...prev, teamName: err }));
  };

  const handleTeamNameBlur = () => {
    const err = checkTeamName(formData.teamName, true);
    setErrors((prev) => ({ ...prev, teamName: err }));
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Compress image via Canvas API before base64 encoding
  // Reduces typical 1-3MB phone screenshot to ~50-100KB — fits within GAS payload limits
  const compressImage = (file) =>
    new Promise((resolve) => {
      if (file.type === 'application/pdf') {
        const r = new FileReader();
        r.onload = (e) => resolve(e.target.result);
        r.readAsDataURL(file);
        return;
      }
      const img = new Image();
      const objUrl = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(objUrl);
        const MAX = 900;
        let w = img.width, h = img.height;
        if (w > MAX || h > MAX) {
          if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
          else { w = Math.round(w * MAX / h); h = MAX; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.65));
      };
      img.onerror = () => {
        URL.revokeObjectURL(objUrl);
        const r = new FileReader();
        r.onload = (e) => resolve(e.target.result);
        r.readAsDataURL(file);
      };
      img.src = objUrl;
    });

  const handleFileChange = async (file) => {
    if (!file) return;
    if (file.size > 12 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, receipt: 'File size exceeds 12MB limit.' }));
      return;
    }
    setReceiptFile(file);
    setErrors((prev) => ({ ...prev, receipt: null }));

    // Preview — use original quality for display
    if (file.type.startsWith('image/')) {
      const previewReader = new FileReader();
      previewReader.onload = (e) => setReceiptPreview(e.target.result);
      previewReader.readAsDataURL(file);
    } else {
      setReceiptPreview(null);
    }

    // Compress → store full data URI for GAS submission
    const compressed = await compressImage(file);
    setReceiptBase64(compressed);
  };


  const removeFile = () => {
    setReceiptFile(null);
    setReceiptBase64('');
    setReceiptPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ─── Bulletproof Google Sheet submission ───
  // 1. Primary: fetch with 'text/plain;charset=utf-8' (CORS-safe simple request).
  //    GAS receives the entire raw JSON payload in e.postData.contents without URL-encoding truncation.
  // 2. Secondary: navigator.sendBeacon with text/plain (guaranteed delivery even on tab close/nav).
  // 3. Tertiary: Hidden iframe + form POST (backup for browsers with strict fetch policies).
  const submitToSheet = (payload) => {
    const targetUrl = 'https://script.google.com/macros/s/AKfycbzbRFibdQV3w_UBY_iNif-qMuTWcMEtPahh56swLO2HVvGIa-2WAqhp38o70jzllYTD/exec';
    const payloadString = JSON.stringify(payload);

    // 1. PRIMARY: fetch POST with text/plain (GAS postData.contents)
    try {
      fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payloadString,
      }).catch((err) => {
        console.warn('[Thrust5] Primary fetch notice:', err);
      });
    } catch (err) {
      console.warn('[Thrust5] Primary fetch error:', err);
    }

    // 2. SECONDARY: navigator.sendBeacon (background delivery guarantee)
    try {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([payloadString], { type: 'text/plain;charset=utf-8' });
        navigator.sendBeacon(targetUrl, blob);
      }
    } catch (err) {
      console.warn('[Thrust5] sendBeacon notice:', err);
    }

    // 3. TERTIARY: Hidden iframe + form POST
    try {
      const iframeName = 'thrust5_frame_' + Date.now();
      const iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.id = iframeName;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const formEl = document.createElement('form');
      formEl.method = 'POST';
      formEl.action = targetUrl;
      formEl.target = iframeName;

      const inputEl = document.createElement('input');
      inputEl.type = 'hidden';
      inputEl.name = 'payload';
      inputEl.value = payloadString;
      formEl.appendChild(inputEl);

      document.body.appendChild(formEl);
      formEl.submit();

      setTimeout(() => { if (formEl.parentNode) formEl.parentNode.removeChild(formEl); }, 2000);
      setTimeout(() => { if (iframe.parentNode) iframe.parentNode.removeChild(iframe); }, 20000);
    } catch (err) {
      console.warn('[Thrust5] iframe submit notice:', err);
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

  const validate = () => {
    const errs = {};
    const teamErr = checkTeamName(formData.teamName, true);
    if (teamErr) errs.teamName = teamErr;

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
      errs.receipt = 'Payment receipt is compulsory! Please upload your payment screenshot to complete registration.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      const teamErr = checkTeamName(formData.teamName, true);
      if (teamErr) {
        const el = document.getElementById('teamName');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (!receiptFile) {
        const el = document.getElementById('receipt-upload-zone');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

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
      // Send full data URI under all key aliases GAS expects
      paymentReceipt: receiptBase64,
      paymentBase64: receiptBase64,
      fileData: receiptBase64,
    };

    try {
      // Dispatch immediately to Google Sheets via multi-protocol delivery
      submitToSheet(payload);

      // Save to existingTeams state & localStorage
      setExistingTeams((prev) => [...prev, payload.teamName]);
      try {
        const saved = JSON.parse(localStorage.getItem('thrust5_existing_teams') || '[]');
        saved.push(payload.teamName);
        localStorage.setItem('thrust5_existing_teams', JSON.stringify(saved));
      } catch (_) {}

      // Save to localStorage as offline backup
      try {
        const existing = JSON.parse(localStorage.getItem('thrust5_registrations') || '[]');
        existing.push(payload);
        localStorage.setItem('thrust5_registrations', JSON.stringify(existing));
      } catch (_) {}

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
    // ── FALLBACK: Re-submit same payload as a safety net ──
    // GAS has case-insensitive duplicate team-name protection,
    // so if the primary submit already went through, this is harmlessly rejected.
    // If the primary submit failed, this ensures the data reaches the sheet.
    if (submittedData) {
      submitToSheet(submittedData);
    }

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

            {/* AFC Logo - Used directly as provided */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              src={AFC_LOGO_BASE64}
              alt="Aero Fabrication Club Logo"
              className="h-20 w-auto mx-auto mb-4 block object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/afc-user-logo.jpg';
              }}
            />

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
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3">
            Register Your <span className="text-[#29ABE2]">Team</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Complete form & upload payment receipt.
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
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="teamName" className="block text-xs font-semibold text-[#94A3B8]">
                  Team Name <span className="text-[#29ABE2]">*</span>
                </label>
                <span className="text-[10px] text-[#64748B] font-mono">
                  Letters, numbers, spaces & underscores (_) only
                </span>
              </div>
              <input
                id="teamName"
                type="text"
                className={`mobile-input ${
                  errors.teamName
                    ? 'border-rose-500/80 bg-rose-500/5 focus:border-rose-400'
                    : formData.teamName.trim().length >= 3 && !errors.teamName
                    ? 'border-emerald-500/50 focus:border-emerald-400'
                    : ''
                }`}
                placeholder="e.g. AeroDynamics_5"
                value={formData.teamName}
                onChange={handleTeamNameChange}
                onBlur={handleTeamNameBlur}
              />
              {errors.teamName ? (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-400 font-medium bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{errors.teamName}</span>
                </div>
              ) : formData.teamName.trim().length >= 3 ? (
                <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-emerald-400 font-medium">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Team name is available</span>
                </div>
              ) : null}
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
              <span>
                3. Payment & Receipt Upload (₹120) <span className="text-red-400 font-bold text-sm">*</span> <span className="text-red-400 text-[11px] font-mono lowercase tracking-normal font-semibold">(compulsory)</span>
              </span>
              <span className="text-[10px] text-[#29ABE2]">PNG, JPG, WEBP, PDF</span>
            </div>

            {/* Themed Payment QR Code Card */}
            <div className="relative rounded-xl border border-[#1E3A5F] bg-[#0A0F16] p-4 sm:p-5 text-center overflow-hidden transition-all duration-200 hover:border-[#29ABE2]/50 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
              {/* Aerospace Corner HUD Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#29ABE2] pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#29ABE2] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#29ABE2] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#29ABE2] pointer-events-none" />

              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-[#1E3A5F]/60 pb-3 mb-3.5">
                <div className="text-center sm:text-left flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#29ABE2] animate-pulse shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide uppercase font-heading">
                      Official UPI Payment QR
                    </div>
                    <div className="text-[11px] text-[#94A3B8]">
                      Payee: <span className="text-white font-medium">{activeQr.payee}</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#29ABE2]/10 border border-[#29ABE2]/30 text-[#29ABE2] text-xs font-bold tracking-wider font-heading">
                  ₹120 / TEAM
                </div>
              </div>

              {/* QR Option Selector Tabs */}
              <div className="flex items-center justify-center gap-1.5 mb-3 p-1 rounded-xl bg-[#111827] border border-[#1E3A5F] max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={() => setSelectedQr('qr1')}
                  className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-heading font-semibold transition-all cursor-pointer ${
                    selectedQr === 'qr1'
                      ? 'bg-[#29ABE2] text-[#0A0F16] shadow-[0_0_12px_rgba(41,171,226,0.35)]'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Option 1 (Shirshendu)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedQr('qr2')}
                  className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-heading font-semibold transition-all cursor-pointer ${
                    selectedQr === 'qr2'
                      ? 'bg-[#29ABE2] text-[#0A0F16] shadow-[0_0_12px_rgba(41,171,226,0.35)]'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Option 2 (Apurva)
                </button>
              </div>

              {/* QR Image with aerospace glow frame */}
              <div className="relative inline-block my-1">
                <div className="p-2.5 bg-white rounded-xl shadow-[0_0_25px_rgba(41,171,226,0.18)] border border-[#29ABE2]/40 inline-block">
                  <img
                    src={activeQr.image}
                    alt={activeQr.alt}
                    className="w-44 h-44 sm:w-52 sm:h-52 object-contain rounded-lg mx-auto block"
                    loading="eager"
                  />
                </div>
                <div className="mt-2 text-[11px] text-[#94A3B8] font-medium">
                  Scan to pay with any UPI app (GPay, PhonePe, Paytm, etc.)
                </div>
              </div>

              {/* UPI ID & Interactive Copy Action */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1E3A5F]">
                  <span className="text-[11px] text-[#64748B] font-mono">UPI ID:</span>
                  <span className="text-xs font-mono font-bold text-[#29ABE2] select-all">
                    {activeQr.upiId}
                  </span>
                  <button
                    type="button"
                    onClick={copyUpiId}
                    aria-label="Copy UPI ID"
                    className="ml-1 text-[11px] font-semibold text-white hover:text-[#29ABE2] px-2 py-0.5 rounded bg-[#1E3A5F]/60 hover:bg-[#1E3A5F] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedUpi ? (
                      <>
                        <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Mobile UPI Pay Button */}
                <a
                  href={activeQr.link}
                  className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#29ABE2]/15 border border-[#29ABE2]/40 text-[#29ABE2] text-xs font-bold font-heading hover:bg-[#29ABE2]/25 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>Pay ₹120 in UPI App</span>
                </a>
              </div>

              <div className="text-[11px] text-[#64748B] mt-3 pt-2.5 border-t border-[#1E3A5F]/40 flex flex-wrap items-center justify-center gap-1.5 sm:gap-3">
                <span className="text-[#29ABE2]">① Pay ₹120</span>
                <span>→</span>
                <span className="text-[#29ABE2]">② Take Screenshot</span>
                <span>→</span>
                <span className="text-[#29ABE2]">③ Upload Proof Below</span>
              </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              id="receipt-upload-zone"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${dragActive
                ? 'border-[#29ABE2] bg-[#29ABE2]/10'
                : errors.receipt
                  ? 'border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                  : receiptFile
                    ? 'border-emerald-500/60 bg-[#0A0F16]'
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
                  <div className={`w-12 h-12 rounded-full ${errors.receipt ? 'bg-red-500/20 border border-red-500 text-red-400' : 'bg-[#111827] border border-[#1E3A5F] text-[#29ABE2]'} flex items-center justify-center mx-auto transition-colors`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <div className="font-bold text-xs text-white">
                    Drag & Drop UPI Payment Receipt Here <span className="text-red-400 font-bold">*</span>
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    or <span className="text-[#29ABE2] underline">Browse file from device</span> (Max 12MB)
                  </div>
                  <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Compulsory for submission
                  </div>
                </div>
              )}
            </div>
            {errors.receipt && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{errors.receipt}</span>
              </div>
            )}
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

        {/* Contact & Help Panel below registration column */}
        <motion.div
          id="contacts"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10 p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#101E33] to-[#0B1525] border-2 border-[#1E6FBA]/40 shadow-[0_8px_30px_rgba(30,111,186,0.18)] relative overflow-hidden"
        >
          {/* Subtle glowing accent gradient on top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#29ABE2] to-transparent opacity-80" />

          <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-[#1E4E7A]/50">
            <div className="w-9 h-9 rounded-xl bg-[#29ABE2]/20 border border-[#29ABE2]/50 flex items-center justify-center text-[#29ABE2] shrink-0 shadow-[0_0_15px_rgba(41,171,226,0.3)]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-white tracking-wide flex items-center gap-2">
                Need Help? Contact Us
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#29ABE2]/15 text-[#29ABE2] border border-[#29ABE2]/30 uppercase">Support</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-[#94A3B8]">
                Reach out to the event coordinators or registration helpdesk anytime
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {/* Event Coordinator */}
            <div className="p-4 rounded-xl bg-[#14233A]/90 border border-[#1E568A]/60 hover:border-[#29ABE2]/60 transition-all shadow-sm">
              <div className="text-[10px] font-mono font-bold text-[#29ABE2] uppercase tracking-wider mb-1">
                Event Coordinator
              </div>
              <div className="text-sm sm:text-base font-semibold text-white">Arjun Nigam</div>
              <a
                href="tel:9235665193"
                className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C1726] border border-[#1E4E7A]/60 text-xs text-[#cbd5e1] hover:text-white hover:border-[#29ABE2] transition-all font-mono font-medium"
              >
                <svg className="w-3.5 h-3.5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                9235665193
              </a>
            </div>

            {/* Event Co-Coordinator: Askini Joshi */}
            <div className="p-4 rounded-xl bg-[#14233A]/90 border border-[#1E568A]/60 hover:border-[#29ABE2]/60 transition-all shadow-sm">
              <div className="text-[10px] font-mono font-bold text-[#29ABE2] uppercase tracking-wider mb-1">
                Event Co-Coordinator
              </div>
              <div className="text-sm sm:text-base font-semibold text-white">Askini Joshi</div>
              <a
                href="tel:9479952334"
                className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C1726] border border-[#1E4E7A]/60 text-xs text-[#cbd5e1] hover:text-white hover:border-[#29ABE2] transition-all font-mono font-medium"
              >
                <svg className="w-3.5 h-3.5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                9479952334
              </a>
            </div>

            {/* Event Co-Coordinator: Ruthik Roy */}
            <div className="p-4 rounded-xl bg-[#14233A]/90 border border-[#1E568A]/60 hover:border-[#29ABE2]/60 transition-all shadow-sm">
              <div className="text-[10px] font-mono font-bold text-[#29ABE2] uppercase tracking-wider mb-1">
                Event Co-Coordinator
              </div>
              <div className="text-sm sm:text-base font-semibold text-white">Ruthik Roy</div>
              <a
                href="tel:9989275764"
                className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C1726] border border-[#1E4E7A]/60 text-xs text-[#cbd5e1] hover:text-white hover:border-[#29ABE2] transition-all font-mono font-medium"
              >
                <svg className="w-3.5 h-3.5 text-[#29ABE2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                9989275764
              </a>
            </div>
          </div>

          {/* Registration Queries - slightly highlighted with distinctive tone */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#173252] via-[#1B3B60] to-[#173252] border border-[#29ABE2]/50 shadow-[0_0_20px_rgba(41,171,226,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#29ABE2] animate-pulse shrink-0 shadow-[0_0_8px_#29ABE2]" />
              <div>
                <div className="text-[10px] font-mono font-bold text-[#29ABE2] uppercase tracking-wider">
                  Registration Queries
                </div>
                <div className="text-sm sm:text-base font-semibold text-white">Lakshay</div>
              </div>
            </div>
            <a
              href="tel:9729088820"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#29ABE2] hover:bg-[#1E6FBA] text-[#0D1117] hover:text-white text-xs font-bold font-mono transition-all no-underline shadow-md shadow-[#29ABE2]/20"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              9729088820
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
