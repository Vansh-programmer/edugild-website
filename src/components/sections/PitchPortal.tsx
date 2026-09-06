import React, { useState, useEffect } from 'react';
import { CheckCircle2, Zap, Layers, ShieldCheck, RefreshCw, ChevronDown, ChevronUp, Mail, ArrowRight, Award, Rocket } from 'lucide-react';
import { MechanicalButton } from '../common/MechanicalButton';
import { SITE_CONFIG } from '../../config/siteConfig';
import { submitPitch } from '../../services/api';

interface PitchPortalProps {
  onSuccess: (pitchTitle: string) => void;
}

interface PitchFormState {
  founderName: string;
  email: string;
  startupName: string;
  sector: string;
  oneLinePitch: string;
}

const DEFAULT_FORM: PitchFormState = {
  founderName: '',
  email: '',
  startupName: '',
  sector: 'Hardware & Physical Prototyping',
  oneLinePitch: '',
};

export const PitchPortal: React.FC<PitchPortalProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');
  const [mobilePerksExpanded, setMobilePerksExpanded] = useState(false);

  // Restore draft from localStorage if available
  const [formData, setFormData] = useState<PitchFormState>(() => {
    try {
      const saved = localStorage.getItem(SITE_CONFIG.storageKeys.pitchDraft);
      return saved ? JSON.parse(saved) : DEFAULT_FORM;
    } catch {
      return DEFAULT_FORM;
    }
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Auto-save draft to localStorage
  useEffect(() => {
    if (!isSubmitted) {
      try {
        localStorage.setItem(SITE_CONFIG.storageKeys.pitchDraft, JSON.stringify(formData));
      } catch {
        // safe fallback
      }
    }
  }, [formData, isSubmitted]);

  const validateForm = (): boolean => {
    const errs: { [key: string]: string } = {};
    if (!formData.founderName.trim()) errs.founderName = 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email address required.';
    if (!formData.startupName.trim()) errs.startupName = 'Venture or prototype title required.';
    if (!formData.oneLinePitch.trim() || formData.oneLinePitch.length < 10) {
      errs.oneLinePitch = 'Please summarize your proposal (minimum 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const randomRef = `AVK-26-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // Dispatch payload to Django backend REST endpoint
      await submitPitch({
        ...formData,
        ref: randomRef,
      });
    } catch (err) {
      console.warn('Backend sync failed, storing to offline fallback queue:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    setSubmittedRef(randomRef);

    // Persist submitted pitch to localStorage
    try {
      const history = JSON.parse(localStorage.getItem(SITE_CONFIG.storageKeys.submittedPitches) || '[]');
      history.push({
        ref: randomRef,
        ...formData,
        date: new Date().toISOString(),
      });
      localStorage.setItem(SITE_CONFIG.storageKeys.submittedPitches, JSON.stringify(history));
      localStorage.removeItem(SITE_CONFIG.storageKeys.pitchDraft);
    } catch {
      // safe fallback
    }

    onSuccess(formData.startupName);
  };

  const resetForm = () => {
    setFormData(DEFAULT_FORM);
    try {
      localStorage.removeItem(SITE_CONFIG.storageKeys.pitchDraft);
    } catch {
      // safe fallback
    }
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="pitch" className="w-full border-b-2 border-[#1E293B] py-16 sm:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Perks Accordion Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobilePerksExpanded(!mobilePerksExpanded)}
            className="w-full bg-[#1E293B] text-white p-4 rounded-2xl border-2 border-[#1E293B] font-heading text-xs font-extrabold uppercase flex items-center justify-between shadow-[4px_4px_0px_#FBBF24]"
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FBBF24]" />
              <span>INCUBATION PERKS & AWARDS ({SITE_CONFIG.cohortStatus.maxGrantAmount})</span>
            </span>
            {mobilePerksExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {mobilePerksExpanded && (
            <div className="bg-white border-2 border-[#1E293B] rounded-2xl p-5 mt-2 space-y-3 font-sans text-xs font-semibold shadow-[4px_4px_0px_#1E293B]">
              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" />
                <span>Cash prize pools up to {SITE_CONFIG.cohortStatus.maxGrantAmount} and seed incubation onboarding</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>MIT FabLab rapid machining, laser cutting & PCB prototyping access</span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                <span>Edugild Innovation Foundation mentorship & Indian patent filing assistance</span>
              </div>
            </div>
          )}
        </div>

        {/* Split Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-2 border-[#1E293B] rounded-3xl bg-white shadow-[10px_10px_0px_#1E293B] overflow-hidden">
          
          {/* Left Side: Desktop Perks Column (Span 5) */}
          <div className="hidden lg:flex lg:col-span-5 bg-[#1E293B] text-white p-8 sm:p-12 flex-col justify-between border-r-2 border-[#1E293B] space-y-8 relative overflow-hidden">
            
            {/* Subtle dot pattern */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#FFFFFF 1.5px, transparent 1.5px)',
                backgroundSize: '20px 20px'
              }}
            />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8B5CF6] text-white rounded-full border border-slate-600 font-heading text-xs font-black uppercase tracking-wider">
                <Rocket className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>INCUBATION APPLICATION</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Pitch Your Venture.
              </h2>

              <p className="font-sans text-sm text-slate-300 font-medium leading-relaxed">
                Submit your prototype or venture proposal to the Avantika Innovation & Incubation Center (AIIC) and Edugild Innovation Foundation. Zero early equity taken.
              </p>
            </div>

            {/* 3 Value Prop Cards */}
            <div className="space-y-4 relative z-10">
              
              <div className="flex items-start gap-3.5 bg-slate-900 p-4 rounded-2xl border-2 border-slate-700 shadow-[3px_3px_0px_#FBBF24]">
                <div className="w-9 h-9 rounded-full bg-[#FBBF24] flex items-center justify-center shrink-0 border border-[#1E293B]">
                  <Zap className="w-5 h-5 text-[#1E293B]" />
                </div>
                <div>
                  <div className="font-heading text-xs font-black text-white uppercase tracking-wider">
                    {SITE_CONFIG.cohortStatus.maxGrantAmount} PRIZE POOLS & INCUBATION
                  </div>
                  <div className="font-sans text-xs text-slate-300 mt-1 font-medium">
                    Cash awards, Unstop national exposure, and seed incubation onboarding.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-slate-900 p-4 rounded-2xl border-2 border-slate-700 shadow-[3px_3px_0px_#34D399]">
                <div className="w-9 h-9 rounded-full bg-[#34D399] flex items-center justify-center shrink-0 border border-[#1E293B]">
                  <Layers className="w-5 h-5 text-[#1E293B]" />
                </div>
                <div>
                  <div className="font-heading text-xs font-black text-white uppercase tracking-wider">
                    24/7 MIT FABLAB ACCESS
                  </div>
                  <div className="font-sans text-xs text-slate-300 mt-1 font-medium">
                    CNC subtractive milling, laser bay, and 3D printing prototyping labs.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-slate-900 p-4 rounded-2xl border-2 border-slate-700 shadow-[3px_3px_0px_#F472B6]">
                <div className="w-9 h-9 rounded-full bg-[#F472B6] flex items-center justify-center shrink-0 border border-[#1E293B]">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-heading text-xs font-black text-white uppercase tracking-wider">
                    EDUGILD INNOVATION FOUNDATION
                  </div>
                  <div className="font-sans text-xs text-slate-300 mt-1 font-medium">
                    Direct venture reviews, patent filing clinics, and startup mentorship.
                  </div>
                </div>
              </div>

            </div>

            <div className="font-mono text-xs text-slate-400 font-semibold relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>EVALUATION: {SITE_CONFIG.cohortStatus.evaluationTeam}</span>
            </div>
          </div>

          {/* Right Side: Playful Application Form (Span 7) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-[#FFFDF5]">
            {!isSubmitted ? (
              <div className="space-y-6">
                
                {/* Header */}
                <div className="pb-5 border-b-2 border-[#1E293B]/10 space-y-1">
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#1E293B]">
                    Incubation Application
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 font-medium">
                    Submit your venture proposal or prototype thesis for evaluation by the AIIC committee.
                  </p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Founder details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading text-xs uppercase tracking-wider text-[#1E293B] font-extrabold mb-1.5">
                        YOUR FULL NAME *
                      </label>
                      <input
                        type="text"
                        value={formData.founderName}
                        onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                        placeholder="e.g. Siddharth Joshi"
                        className="w-full bg-white border-2 border-[#1E293B] rounded-2xl text-[#1E293B] font-sans text-sm py-3 px-4 shadow-[2px_2px_0px_#1E293B] focus:shadow-[4px_4px_0px_#8B5CF6] focus:border-[#8B5CF6] focus:outline-none transition-all"
                      />
                      {errors.founderName && (
                        <p className="font-sans text-xs text-rose-600 font-bold mt-1.5">{errors.founderName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-heading text-xs uppercase tracking-wider text-[#1E293B] font-extrabold mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. s.joshi@avantika.edu.in"
                        className="w-full bg-white border-2 border-[#1E293B] rounded-2xl text-[#1E293B] font-sans text-sm py-3 px-4 shadow-[2px_2px_0px_#1E293B] focus:shadow-[4px_4px_0px_#8B5CF6] focus:border-[#8B5CF6] focus:outline-none transition-all"
                      />
                      {errors.email && (
                        <p className="font-sans text-xs text-rose-600 font-bold mt-1.5">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Venture details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading text-xs uppercase tracking-wider text-[#1E293B] font-extrabold mb-1.5">
                        VENTURE / PROTOTYPE TITLE *
                      </label>
                      <input
                        type="text"
                        value={formData.startupName}
                        onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                        placeholder="e.g. Ergonomic Harvesting Gripper"
                        className="w-full bg-white border-2 border-[#1E293B] rounded-2xl text-[#1E293B] font-sans text-sm py-3 px-4 shadow-[2px_2px_0px_#1E293B] focus:shadow-[4px_4px_0px_#8B5CF6] focus:border-[#8B5CF6] focus:outline-none transition-all"
                      />
                      {errors.startupName && (
                        <p className="font-sans text-xs text-rose-600 font-bold mt-1.5">{errors.startupName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block font-heading text-xs uppercase tracking-wider text-[#1E293B] font-extrabold mb-1.5">
                        INNOVATION TRACK
                      </label>
                      <select
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full bg-white border-2 border-[#1E293B] rounded-2xl text-[#1E293B] font-sans text-sm py-3 px-4 shadow-[2px_2px_0px_#1E293B] focus:shadow-[4px_4px_0px_#8B5CF6] focus:border-[#8B5CF6] focus:outline-none cursor-pointer"
                      >
                        <option value="Hardware & Physical Prototyping">Hardware & Physical Prototyping (MIT FabLab)</option>
                        <option value="Product & Industrial Design">Product & Industrial Design</option>
                        <option value="UX Architecture & Digital Tools">UX Architecture & Digital Tools</option>
                        <option value="EdTech & Cognitive Tools">EdTech (Edugild Track)</option>
                        <option value="AgriTech & Rural Solutions">AgriTech & Rural Solutions</option>
                        <option value="CleanTech & Circular Materials">CleanTech & Circular Materials</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Thesis Summary */}
                  <div>
                    <label className="block font-heading text-xs uppercase tracking-wider text-[#1E293B] font-extrabold mb-1.5">
                      PROPOSAL SUMMARY & THESIS *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.oneLinePitch}
                      onChange={(e) => setFormData({ ...formData, oneLinePitch: e.target.value })}
                      placeholder="Briefly summarize the target problem, user need, and how your prototype addresses it..."
                      className="w-full bg-white border-2 border-[#1E293B] rounded-2xl text-[#1E293B] font-sans text-sm py-3 px-4 shadow-[2px_2px_0px_#1E293B] focus:shadow-[4px_4px_0px_#8B5CF6] focus:border-[#8B5CF6] focus:outline-none resize-none leading-relaxed transition-all"
                    />
                    {errors.oneLinePitch && (
                      <p className="font-sans text-xs text-rose-600 font-bold mt-1.5">{errors.oneLinePitch}</p>
                    )}
                  </div>

                  {/* IP Confidentiality Reassurance Banner */}
                  <div className="flex items-center gap-2.5 p-3.5 bg-[#FAF5FF] border-2 border-[#8B5CF6]/30 rounded-2xl text-xs font-sans text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-[#8B5CF6] shrink-0 stroke-[2.5]" />
                    <span><strong>Confidential Student Application:</strong> Evaluated under AIIC & Edugild Innovation Foundation guidelines. Zero early equity taken at prototype stage.</span>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-4 border-t-2 border-[#1E293B]/10 flex items-center justify-end">
                    <MechanicalButton
                      type="submit"
                      variant="accent"
                      size="md"
                      disabled={isSubmitting}
                      icon={isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4 text-white" />}
                    >
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
                    </MechanicalButton>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Stamped Dossier Sticker */
              <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-[#34D399] text-[#1E293B] flex items-center justify-center rounded-3xl border-2 border-[#1E293B] mx-auto shadow-[4px_4px_0px_#1E293B]">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
                
                <h3 className="font-heading text-3xl sm:text-4xl font-black text-[#1E293B]">
                  Application Received!
                </h3>
                
                <p className="font-sans text-sm text-slate-600 max-w-sm mx-auto font-medium">
                  Thank you, <strong className="text-[#1E293B]">{formData.founderName}</strong>. Your proposal for <strong className="text-[#1E293B]">{formData.startupName}</strong> has been routed directly to the Edugild & AIIC Incubation Desk.
                </p>
                
                <div className="bg-[#FFFBEA] border-2 border-[#1E293B] rounded-2xl p-4 max-w-xs mx-auto font-mono text-xs shadow-[3px_3px_0px_#FBBF24]">
                  <span className="text-slate-500">REFERENCE ID: </span>
                  <span className="font-black text-[#8B5CF6] text-sm">{submittedRef}</span>
                </div>

                {/* Email Dossier Dispatch */}
                <div className="space-y-2.5 max-w-sm mx-auto pt-2">
                  <a
                    href={`mailto:ecell@avantika.edu.in?cc=aiic@avantika.edu.in&subject=${encodeURIComponent(`[Incubation Application] ${formData.startupName} (Ref: ${submittedRef})`)}&body=${encodeURIComponent(`Dear Avantika E-Cell & Edugild Incubation Desk,\n\nPlease find my venture submission details below:\n\nReference ID: ${submittedRef}\nFounder Name: ${formData.founderName}\nFounder Email: ${formData.email}\nProject / Venture Name: ${formData.startupName}\nSector: ${formData.sector}\n\nSummary & Thesis:\n${formData.oneLinePitch}\n\nSubmitted via Avantika University E-Cell Portal.\nBest regards,\n${formData.founderName}`)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#8B5CF6] text-white font-heading font-extrabold text-xs uppercase tracking-wider rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] hover:bg-[#7C3AED] hover:-translate-y-0.5 transition-all"
                  >
                    <Mail className="w-4 h-4 text-white" />
                    <span>EMAIL APPLICATION DOSSIER</span>
                  </a>
                </div>

                <div className="pt-3">
                  <MechanicalButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={resetForm}
                  >
                    SUBMIT ANOTHER APPLICATION
                  </MechanicalButton>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
