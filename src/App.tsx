import React, { useState, useEffect } from 'react';
import { GrainOverlay } from './components/common/GrainOverlay';
import { Toast, ToastMessage } from './components/common/Toast';
import { QuickAdminDrawer } from './components/common/QuickAdminDrawer';
import { MastheadNav } from './components/layout/MastheadNav';
import { EditorialFooter } from './components/layout/EditorialFooter';
import { AsymmetricHero } from './components/sections/AsymmetricHero';
import { BentoEvents } from './components/sections/BentoEvents';
import { EdugildRoster } from './components/sections/EdugildRoster';
import { PitchPortal } from './components/sections/PitchPortal';
import { INITIAL_EVENTS, EventItem } from './data/events';
import { INITIAL_ROSTER, RosterMember } from './data/roster';
import { SITE_CONFIG } from './config/siteConfig';
import { CONTENT_THEMES, ContentThemeId } from './config/contentThemes';

export const App: React.FC = () => {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState<ContentThemeId>('hero');

  // Dynamic, customizable events state with localStorage persistence
  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem(SITE_CONFIG.storageKeys.customEvents);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some(e => e.id === 'launchpad-2026')) {
          return parsed.filter(
            e => e.id !== 'ai-deeptech-bootcamp-2026' && e.id !== 'design-tech-hackathon-2026'
          );
        }
      }
      return INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  // Dynamic, customizable roster state with localStorage persistence
  const [roster, setRoster] = useState<RosterMember[]>(() => {
    try {
      const saved = localStorage.getItem(SITE_CONFIG.storageKeys.customRoster);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m: RosterMember) => ({
            ...m,
            role: m.role ? m.role.replace(' // ', ' & ') : m.role
          }));
        }
      }
      return INITIAL_ROSTER;
    } catch {
      return INITIAL_ROSTER;
    }
  });

  // Persist customized events
  useEffect(() => {
    try {
      localStorage.setItem(SITE_CONFIG.storageKeys.customEvents, JSON.stringify(events));
    } catch {
      // safe fallback
    }
  }, [events]);

  // Persist customized roster
  useEffect(() => {
    try {
      localStorage.setItem(SITE_CONFIG.storageKeys.customRoster, JSON.stringify(roster));
    } catch {
      // safe fallback
    }
  }, [roster]);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({
      id: String(Date.now()),
      title,
      description,
      type
    });
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId in CONTENT_THEMES) {
      setActiveThemeId(sectionId as ContentThemeId);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRSVP = (eventTitle: string) => {
    showToast(
      'RSVP CONFIRMED!',
      `You are registered for "${eventTitle}". Pass sent to your desk.`,
      'success'
    );
  };

  const handlePitchSuccess = (pitchTitle: string) => {
    showToast(
      'PITCH TRANSMITTED!',
      `Proposal for "${pitchTitle}" forwarded to Edugild & AIIC Seed Jury.`,
      'success'
    );
  };

  const handleNewsletterSubmit = (email: string) => {
    showToast(
      'DISPATCH CONFIRMED!',
      `Weekly briefs will be sent to ${email}.`,
      'success'
    );
  };

  // Content Management Actions for QuickAdminDrawer
  const handleAddEvent = (newEvent: EventItem) => {
    setEvents(prev => [newEvent, ...prev]);
    showToast('EVENT PUBLISHED', `"${newEvent.title}" is now live on the calendar.`);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    showToast('EVENT REMOVED', 'The session has been removed from the directory.', 'info');
  };

  const handleAddMember = (newMember: RosterMember) => {
    setRoster(prev => [newMember, ...prev]);
    showToast('MEMBER ENROLLED', `"${newMember.name}" is now live on the roster.`);
  };

  const handleDeleteMember = (id: string) => {
    setRoster(prev => prev.filter(m => m.id !== id));
    showToast('MEMBER REMOVED', 'Member profile removed from directory.', 'info');
  };

  const handleResetToDefaults = () => {
    setEvents(INITIAL_EVENTS);
    setRoster(INITIAL_ROSTER);
    localStorage.removeItem(SITE_CONFIG.storageKeys.customEvents);
    localStorage.removeItem(SITE_CONFIG.storageKeys.customRoster);
    showToast('RESTORED DEFAULTS', 'Events and Roster restored to official curriculum.', 'info');
  };

  // Content-Aware dynamic theme detection as user scrolls through sections
  useEffect(() => {
    const sections: ContentThemeId[] = ['pitch', 'roster', 'events', 'hero'];
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Trigger point at 35% viewport height
          const scrollTarget = window.scrollY + window.innerHeight * 0.35;
          
          for (const secId of sections) {
            const el = document.getElementById(secId);
            if (el) {
              const top = el.offsetTop;
              if (scrollTarget >= top) {
                setActiveThemeId(secId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeTheme = CONTENT_THEMES[activeThemeId] || CONTENT_THEMES.hero;

  return (
    <div 
      className="min-h-screen text-[#1E293B] font-sans relative transition-colors duration-700 ease-out"
      style={{ 
        backgroundColor: activeTheme.bgBase
      }}
    >
      {/* Subtle Paper Dot Grid Overlay */}
      <GrainOverlay />

      {/* Dynamic Content-Aware Sticky Masthead */}
      <MastheadNav 
        onNavigate={scrollToSection} 
        onOpenAdmin={() => setIsAdminDrawerOpen(true)}
        activeTheme={activeTheme}
        activeThemeId={activeThemeId}
      />

      {/* Main Content & Footer */}
      <div>
        <main>
          {/* 1. Asymmetrical Hero & Live Countdown */}
          <AsymmetricHero
            onApplyClick={() => scrollToSection('pitch')}
            onExploreEventsClick={() => scrollToSection('events')}
          />

          {/* 2. Bento Events & Conclaves */}
          <BentoEvents events={events} onRSVP={handleRSVP} />

          {/* 3. The E-Cell Team */}
          <EdugildRoster />

          {/* 4. Pitch Portal Studio with Auto-Save & Confetti */}
          <PitchPortal onSuccess={handlePitchSuccess} />
        </main>

        {/* Playful Footer with Live IST Clock & Official Links */}
        <EditorialFooter
          onNewsletterSubmit={handleNewsletterSubmit}
          onOpenAdmin={() => setIsAdminDrawerOpen(true)}
        />
      </div>

      {/* Discreet Quick Content Management Drawer */}
      <QuickAdminDrawer
        events={events}
        roster={roster}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
        onAddMember={handleAddMember}
        onDeleteMember={handleDeleteMember}
        onResetToDefaults={handleResetToDefaults}
        isOpen={isAdminDrawerOpen}
        onOpen={() => setIsAdminDrawerOpen(true)}
        onClose={() => setIsAdminDrawerOpen(false)}
      />

      {/* Playful Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default App;
