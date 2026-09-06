import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, ShieldCheck } from 'lucide-react';
import { MechanicalButton } from '../common/MechanicalButton';
import { SITE_CONFIG } from '../../config/siteConfig';
import { ContentTheme, ContentThemeId } from '../../config/contentThemes';

interface MastheadNavProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  activeTheme?: ContentTheme;
  activeThemeId?: ContentThemeId;
}

export const MastheadNav: React.FC<MastheadNavProps> = ({ 
  onNavigate, 
  onOpenAdmin,
  activeTheme,
  activeThemeId = 'hero'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'events', label: 'EVENTS' },
    { id: 'roster', label: 'TEAM' },
    { id: 'pitch', label: 'PITCH PORTAL' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className="sticky top-0 z-40 w-full backdrop-blur-md border-b-2 border-[#1E293B] transition-colors duration-500 ease-out"
      style={{ backgroundColor: activeTheme?.bgNav || 'rgba(255, 253, 245, 0.95)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Official E-Cell Brand Mark */}
        <button 
          onClick={() => handleLinkClick('hero')} 
          className="text-left group focus:outline-none flex items-center gap-3.5 transition-transform hover:scale-[1.02]"
        >
          <div className="relative w-12 h-12 bg-white rounded-2xl border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] p-1 flex items-center justify-center overflow-hidden group-hover:shadow-[4px_4px_0px_#8B5CF6] transition-all">
            <img 
              src="/ecell-logo.png" 
              alt="Avantika University E-Cell Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-heading font-extrabold text-xl tracking-tight text-[#1E293B] flex items-center gap-2 leading-none">
              AVANTIKA <span className="text-[#8B5CF6] font-black">E-CELL</span>
            </div>
            <div className="font-sans text-[11px] font-semibold text-[#64748B] tracking-wider uppercase mt-1">
              × EDUGILD VENTURES
            </div>
          </div>
        </button>

        {/* Desktop Nav Items with Active Content Indicator */}
        <nav className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => {
            const isActive = activeThemeId === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`font-heading font-bold text-sm tracking-wide px-4 py-1.5 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? 'border-[#1E293B] bg-[#1E293B] text-white shadow-[3px_3px_0px_#FBBF24] -translate-y-0.5'
                    : 'border-transparent text-[#1E293B] hover:border-[#1E293B] hover:bg-[#FBBF24] hover:shadow-[3px_3px_0px_#1E293B]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Status indicator & Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="font-heading text-xs font-extrabold uppercase tracking-wider px-3.5 py-2 rounded-full border-2 border-[#1E293B] bg-white text-[#1E293B] hover:bg-[#FBBF24] shadow-[2px_2px_0px_#1E293B] flex items-center gap-1.5 transition-all hover:-translate-y-0.5"
              title="Open Submissions Desk & Django Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>SUBMISSIONS</span>
            </button>
          )}

          {/* Dynamic Content-Aware Status Pill */}
          <div className="flex items-center gap-2 bg-white border-2 border-[#1E293B] px-3.5 py-1.5 rounded-full shadow-[2px_2px_0px_#1E293B] transition-all duration-500">
            <span 
              className="w-2.5 h-2.5 rounded-full border border-[#1E293B] transition-colors duration-500" 
              style={{ backgroundColor: activeTheme?.accentColor || '#10B981' }}
            />
            <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#1E293B] transition-colors duration-300">
              {activeTheme?.badgeText || SITE_CONFIG.cohortStatus.badgeText}
            </span>
          </div>

          <MechanicalButton
            variant="primary"
            size="sm"
            onClick={() => handleLinkClick('pitch')}
            icon={<ArrowUpRight className="w-4 h-4 text-white" />}
          >
            SUBMIT PITCH
          </MechanicalButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border-2 border-[#1E293B] rounded-xl bg-white hover:bg-[#FFFBEA] shadow-[3px_3px_0px_#1E293B] transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#1E293B]" /> : <Menu className="w-6 h-6 text-[#1E293B]" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden border-b-2 border-[#1E293B] px-6 py-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 transition-colors"
          style={{ backgroundColor: activeTheme?.bgBase || '#FFFDF5' }}
        >
          <div className="inline-flex items-center gap-2 bg-white border-2 border-[#1E293B] px-3 py-1 rounded-full text-xs font-heading font-extrabold text-[#1E293B] mb-2 shadow-[2px_2px_0px_#1E293B]">
            <span 
              className="w-2 h-2 rounded-full border border-[#1E293B] transition-colors duration-500"
              style={{ backgroundColor: activeTheme?.accentColor || '#10B981' }}
            />
            {activeTheme?.badgeText || SITE_CONFIG.cohortStatus.badgeText}
          </div>

          {navLinks.map((link) => {
            const isActive = activeThemeId === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left font-heading text-base font-bold uppercase tracking-wider py-2.5 px-3 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'border-[#1E293B] bg-[#1E293B] text-white shadow-[3px_3px_0px_#FBBF24]'
                    : 'border-transparent text-[#1E293B] hover:bg-[#FBBF24] hover:border-[#1E293B]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          {onOpenAdmin && (
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-heading text-base font-extrabold uppercase tracking-wider py-2.5 px-3 rounded-xl bg-white border-2 border-[#1E293B] text-[#1E293B] flex items-center justify-between shadow-[2px_2px_0px_#1E293B]"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                <span>DESK / SUBMISSIONS</span>
              </span>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">● LIVE</span>
            </button>
          )}
          <div className="pt-3">
            <MechanicalButton
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => handleLinkClick('pitch')}
              icon={<ArrowUpRight className="w-4 h-4 text-white" />}
            >
              SUBMIT PITCH
            </MechanicalButton>
          </div>
        </div>
      )}
    </header>
  );
};
