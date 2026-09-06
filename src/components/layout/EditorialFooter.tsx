import React, { useState, useEffect } from 'react';
import { Send, Clock, ArrowUpRight, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { MechanicalButton } from '../common/MechanicalButton';
import { SITE_CONFIG } from '../../config/siteConfig';
import { subscribeNewsletter } from '../../services/api';

interface EditorialFooterProps {
  onNewsletterSubmit: (email: string) => void;
  onOpenAdmin?: () => void;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({ onNewsletterSubmit, onOpenAdmin }) => {
  const [email, setEmail] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const optionsTime: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      try {
        const ist = new Intl.DateTimeFormat('en-GB', optionsTime).format(now);
        setCurrentTime(`${ist} IST`);
      } catch {
        setCurrentTime(now.toTimeString().split(' ')[0] + ' IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    try {
      await subscribeNewsletter({ email });
    } catch (err) {
      console.warn('Newsletter API sync failed:', err);
    }
    onNewsletterSubmit(email);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#1E293B] text-white border-t-2 border-[#1E293B] relative overflow-hidden">
      {/* Subtle Dot Grid Background in Footer */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#FFFFFF 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-between">
          
          {/* Left Brand & Newsletter (Span 7) */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-3.5">
              <div className="w-11 h-11 bg-white rounded-2xl border-2 border-white/20 shadow-[3px_3px_0px_#FBBF24] p-1 flex items-center justify-center shrink-0">
                <img 
                  src="/ecell-logo.png" 
                  alt="Avantika University E-Cell Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading text-3xl font-black text-white tracking-tight">
                {SITE_CONFIG.brandName.toUpperCase()}
              </span>
              <a
                href={SITE_CONFIG.socialLinks.edugild}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-xs font-bold uppercase tracking-wider bg-[#FBBF24] text-[#1E293B] px-3 py-1 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#FFFFFF] hover:bg-[#F59E0B] transition-all inline-flex items-center gap-1.5 group"
                title="Visit Edugild (edugild.com)"
              >
                <span>EDUGILD VENTURES</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <p className="font-sans text-sm text-slate-300 max-w-md leading-relaxed font-normal">
              Receive weekly updates on campus prototyping grants, patent filing clinics, and seed angel office hours.
            </p>

            {/* Newsletter Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-md pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@avantika.edu.in"
                required
                className="flex-1 bg-white text-[#1E293B] font-sans text-xs sm:text-sm py-2.5 px-4 rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#8B5CF6] focus:shadow-[4px_4px_0px_#F472B6] focus:outline-none"
              />
              <MechanicalButton
                type="submit"
                variant="primary"
                size="sm"
                icon={<Send className="w-3.5 h-3.5" />}
              >
                JOIN
              </MechanicalButton>
            </form>
          </div>

          {/* Right Live Clock & Channels (Span 5) */}
          <div className="md:col-span-5 flex flex-col md:items-end space-y-5">
            {/* Live IST clock in capsule */}
            <div className="flex items-center gap-2.5 bg-slate-900 px-4 py-2 rounded-full border-2 border-slate-700 font-mono text-xs text-white shadow-[2px_2px_0px_#34D399]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <Clock className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span className="font-bold tracking-wider">{SITE_CONFIG.campusLocation.split(',')[0].toUpperCase()} • {currentTime || 'CALCULATING IST...'}</span>
            </div>

            {/* Official Links: Edugild, LinkedIn, Instagram */}
            <div className="flex flex-wrap items-center gap-2.5 font-heading text-xs">
              <a 
                href={SITE_CONFIG.socialLinks.edugild} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFDF5] text-[#1E293B] rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#FBBF24] hover:shadow-[5px_5px_0px_#FBBF24] hover:-translate-y-0.5 transition-all font-bold group"
              >
                <span className="w-4 h-4 rounded-full bg-[#FBBF24] flex items-center justify-center text-[10px] font-black">E</span>
                <span>EDUGILD.COM</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#1E293B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a 
                href={SITE_CONFIG.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFDF5] text-[#1E293B] rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#8B5CF6] hover:shadow-[5px_5px_0px_#8B5CF6] hover:-translate-y-0.5 transition-all font-bold group"
              >
                <span className="w-4 h-4 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-[10px] font-black">in</span>
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#1E293B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a 
                href={SITE_CONFIG.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFDF5] text-[#1E293B] rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#F472B6] hover:shadow-[5px_5px_0px_#F472B6] hover:-translate-y-0.5 transition-all font-bold group"
              >
                <span className="w-4 h-4 rounded-full bg-[#F472B6] text-white flex items-center justify-center text-[10px] font-black">ig</span>
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#1E293B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a 
                href={`mailto:${SITE_CONFIG.socialLinks.ecellEmail}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFDF5] text-[#1E293B] rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#34D399] hover:shadow-[5px_5px_0px_#34D399] hover:-translate-y-0.5 transition-all font-bold group"
                title="Send direct email to Avantika E-Cell"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>EMAIL E-CELL</span>
              </a>

              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFDF5] text-[#1E293B] rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#8B5CF6] hover:shadow-[5px_5px_0px_#8B5CF6] hover:-translate-y-0.5 transition-all font-heading text-xs font-black group"
                  title="Open Incubator Admin & Submissions Desk"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>E-CELL ADMIN DESK</span>
                </button>
              )}

              <a 
                href={SITE_CONFIG.socialLinks.googleMapsLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-slate-200 rounded-full border border-slate-700 hover:text-white transition-colors text-[11px] font-mono"
                title="View Avantika Campus on Google Maps"
              >
                <MapPin className="w-3 h-3 text-[#FBBF24]" />
                <span>CAMPUS MAP ↗</span>
              </a>
            </div>

            <div className="font-sans text-xs text-slate-400">
              © {new Date().getFullYear()} {SITE_CONFIG.universityName} × {SITE_CONFIG.partnerName}. All rights reserved.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
