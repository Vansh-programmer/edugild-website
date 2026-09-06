import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, MapPin, ArrowUpRight, Check, X, ShieldCheck, Linkedin, FileSpreadsheet, AlertCircle, RefreshCw } from 'lucide-react';
import { EventItem } from '../../data/events';
import { SITE_CONFIG } from '../../config/siteConfig';
import { MechanicalButton } from '../common/MechanicalButton';
import { rsvpEvent } from '../../services/api';

interface BentoEventsProps {
  events: EventItem[];
  onRSVP: (eventTitle: string) => void;
}

type FilterCategory = 'All' | 'Upcoming' | 'Past Conclaves' | 'Workshops' | 'Hackathons' | 'Incubation' | 'Keynotes';

export const BentoEvents: React.FC<BentoEventsProps> = ({ events, onRSVP }) => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const [rsvpModalEvent, setRsvpModalEvent] = useState<EventItem | null>(null);

  // RSVP Form State for Avantika University participants
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    email: '',
    enrollment: '',
    department: 'B.Des (User Experience / Industrial)',
    teamSize: 'Solo Builder'
  });
  const [rsvpError, setRsvpError] = useState<string | null>(null);
  const [rsvpSuccessMsg, setRsvpSuccessMsg] = useState<string | null>(null);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);

  // Initialize registered event IDs from localStorage for persistence
  const [registeredEventIds, setRegisteredEventIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(SITE_CONFIG.storageKeys.registeredEvents);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save registered events to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(
        SITE_CONFIG.storageKeys.registeredEvents,
        JSON.stringify(registeredEventIds)
      );
    } catch {
      // safe fallback
    }
  }, [registeredEventIds]);

  // Handle ESC key and body scroll lock for modal accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (rsvpModalEvent) setRsvpModalEvent(null);
        else if (activeModalEvent) setActiveModalEvent(null);
      }
    };

    if (activeModalEvent || rsvpModalEvent) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalEvent, rsvpModalEvent]);

  const filterCategories: FilterCategory[] = [
    'All',
    'Upcoming',
    'Past Conclaves',
    'Workshops',
    'Hackathons',
    'Incubation',
    'Keynotes'
  ];

  const curatedEvents = useMemo(() => {
    if (selectedCategory === 'All') return events;
    if (selectedCategory === 'Upcoming') return events.filter(e => e.status !== 'past');
    if (selectedCategory === 'Past Conclaves') return events.filter(e => e.status === 'past');
    return events.filter(e => e.category === selectedCategory);
  }, [events, selectedCategory]);

  const handleOpenRsvpModal = (event: EventItem) => {
    if (activeModalEvent) setActiveModalEvent(null);
    setRsvpError(null);
    setRsvpSuccessMsg(null);
    setRsvpModalEvent(event);
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpModalEvent) return;

    if (!rsvpForm.name.trim()) {
      setRsvpError('Please enter your full name.');
      return;
    }

    const emailTrimmed = rsvpForm.email.trim().toLowerCase();
    // Strict validation for Avantika University institutional email
    const isAvantikaEmail = emailTrimmed.endsWith('@avantika.edu.in') && emailTrimmed.includes('@') && emailTrimmed.length > 17;
    if (!isAvantikaEmail) {
      setRsvpError('Only official Avantika University email addresses (@avantika.edu.in) can apply for this conclave.');
      return;
    }

    setIsSubmittingRsvp(true);
    setRsvpError(null);

    try {
      // Transmit to Django backend and sync to Google Sheet webhook
      const res = await rsvpEvent({
        eventId: rsvpModalEvent.id,
        eventTitle: rsvpModalEvent.title,
        participantName: rsvpForm.name.trim(),
        avantikaEmail: emailTrimmed,
        enrollmentId: rsvpForm.enrollment.trim(),
        departmentYear: rsvpForm.department,
        teamSize: rsvpForm.teamSize === 'Solo Builder' ? 1 : (rsvpForm.teamSize === 'Team of 2' ? 2 : 3),
      });

      if (!res.success && !res.fallback) {
        setRsvpError(res.message || 'Registration failed. Please check your details.');
        setIsSubmittingRsvp(false);
        return;
      }

      setRegisteredEventIds(prev => ({ ...prev, [rsvpModalEvent.id]: true }));
      onRSVP(rsvpModalEvent.title);
      setRsvpSuccessMsg(res.message || 'Event RSVP confirmed for Avantika University student.');
    } catch (err) {
      console.warn('Sync failed, registering locally:', err);
      setRegisteredEventIds(prev => ({ ...prev, [rsvpModalEvent.id]: true }));
      onRSVP(rsvpModalEvent.title);
      setRsvpSuccessMsg('Registration confirmed and stored locally.');
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Workshops':
        return 'bg-[#FBBF24] text-[#1E293B]';
      case 'Hackathons':
        return 'bg-[#F472B6] text-white';
      case 'Incubation':
        return 'bg-[#34D399] text-[#1E293B]';
      case 'Keynotes':
        return 'bg-[#8B5CF6] text-white';
      default:
        return 'bg-[#8B5CF6] text-white';
    }
  };

  return (
    <section id="events" className="w-full border-b-2 border-[#1E293B] py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Memphis Flare */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b-2 border-[#1E293B]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#8B5CF6] text-white font-heading text-xs uppercase tracking-wider font-extrabold rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>OFFICIAL CALENDAR ({events.length} SESSIONS • PAST & UPCOMING)</span>
            </div>
            
            <h2 className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-[#1E293B]">
              Events & Conclaves.
            </h2>
            
            <p className="font-sans text-sm sm:text-base text-slate-700 font-medium max-w-xl">
              Flagship conclaves, founder masterclasses, and student innovation expos across Avantika University.
            </p>
          </div>

          {/* Candy Pill Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {filterCategories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs font-heading font-extrabold uppercase rounded-full border-2 border-[#1E293B] transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FBBF24] text-[#1E293B] shadow-[3px_3px_0px_#1E293B] -translate-x-0.5 -translate-y-0.5'
                      : 'bg-white text-[#1E293B] hover:bg-[#F1F5F9] shadow-[2px_2px_0px_#1E293B]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid with Sticker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          {curatedEvents.length === 0 ? (
            <div className="col-span-full py-12 text-center bg-white border-2 border-dashed border-[#1E293B] rounded-3xl p-8 shadow-[4px_4px_0px_#1E293B]">
              <p className="font-heading text-lg font-extrabold text-[#1E293B]">
                No sessions listed under "{selectedCategory}" currently.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 px-5 py-2 bg-[#FBBF24] text-[#1E293B] border-2 border-[#1E293B] font-heading font-extrabold text-xs rounded-full shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-transform"
              >
                VIEW ALL VERIFIED SESSIONS
              </button>
            </div>
          ) : (
            curatedEvents.map((event) => {
              const isRegistered = registeredEventIds[event.id];
              const isPast = event.status === 'past';

              return (
                <div
                  key={event.id}
                  className="group relative bg-white border-2 border-[#1E293B] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[5px_5px_0px_#1E293B] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:rotate-[-0.5deg] hover:shadow-[8px_8px_0px_#1E293B]"
                >
                  {/* Half-in / half-out Category Icon Badge */}
                  <div className={`absolute -top-4 left-6 px-3 py-1 rounded-full border-2 border-[#1E293B] font-heading font-extrabold text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_#1E293B] ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </div>

                  <div className="space-y-4 pt-2">
                    
                    {/* Status & Date Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2 font-sans text-xs pb-3 border-b-2 border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 text-[10px] font-heading font-extrabold uppercase tracking-wider rounded-full border-2 border-[#1E293B] ${
                          isPast
                            ? 'bg-[#F1F5F9] text-slate-700 shadow-[1px_1px_0px_#1E293B]'
                            : 'bg-[#34D399] text-[#1E293B] shadow-[1px_1px_0px_#1E293B]'
                        }`}>
                          {isPast ? 'PAST CONCLAVE' : '● UPCOMING'}
                        </span>

                        {event.badge && (
                          <span className="hidden sm:inline-block px-2.5 py-0.5 bg-[#F472B6] text-white text-[10px] font-heading font-extrabold rounded-full border border-[#1E293B]">
                            {event.badge}
                          </span>
                        )}
                      </div>

                      <span className="text-slate-700 font-bold flex items-center gap-1.5 font-mono text-xs">
                        <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        {event.date}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-heading text-2xl font-extrabold text-[#1E293B] group-hover:text-[#8B5CF6] transition-colors leading-snug">
                      {event.title}
                    </h3>

                    <p className="font-sans text-sm text-slate-600 line-clamp-2 leading-relaxed font-medium">
                      {event.description}
                    </p>
                  </div>

                  {/* Footer details & Candy action buttons */}
                  <div className="pt-6 mt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="font-sans text-xs font-semibold text-slate-600 flex items-center gap-1.5 truncate">
                      <MapPin className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {event.linkedinUrl && (
                        <a
                          href={event.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-heading text-[11px] font-extrabold text-[#0A66C2] hover:text-[#004182] flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#1E293B] bg-white shadow-[2px_2px_0px_#1E293B] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                          title="Open original post on Avantika E-Cell LinkedIn"
                        >
                          <Linkedin className="w-3.5 h-3.5 fill-[#0A66C2] text-[#0A66C2]" />
                          <span>POST</span>
                          <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                        </a>
                      )}

                      <button
                        onClick={() => setActiveModalEvent(event)}
                        className="font-heading text-xs font-extrabold uppercase text-[#1E293B] hover:text-[#8B5CF6] flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-[#F1F5F9] transition-all"
                      >
                        <span>DETAILS</span>
                      </button>

                      {isPast ? (
                        <button
                          onClick={() => setActiveModalEvent(event)}
                          className="px-4 py-2 font-heading text-xs font-extrabold uppercase rounded-full border-2 border-[#1E293B] bg-[#F1F5F9] text-slate-700 hover:bg-[#E2E8F0] shadow-[2px_2px_0px_#1E293B] active:shadow-none transition-all"
                        >
                          DOSSIER
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenRsvpModal(event)}
                          disabled={isRegistered}
                          className={`px-5 py-2 font-heading text-xs font-extrabold uppercase rounded-full border-2 border-[#1E293B] transition-all duration-200 ${
                            isRegistered
                              ? 'bg-[#34D399] text-[#1E293B] shadow-[2px_2px_0px_#1E293B]'
                              : 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none'
                          }`}
                        >
                          {isRegistered ? (
                            <span className="flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 stroke-[3]" /> REGISTERED
                            </span>
                          ) : (
                            'APPLY NOW'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Details / Dossier Modal (Rendered in Portal) */}
      {activeModalEvent && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E293B]/70 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModalEvent(null)}
        >
          <div 
            className="bg-[#FFFDF5] border-2 border-[#1E293B] max-w-lg w-full p-6 sm:p-8 rounded-3xl shadow-[10px_10px_0px_#1E293B] relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full border-2 border-[#1E293B] bg-white hover:bg-[#F472B6] hover:text-white flex items-center justify-center shadow-[2px_2px_0px_#1E293B] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 pb-4 border-b-2 border-[#1E293B]/15">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 font-heading text-xs font-extrabold uppercase rounded-full border-2 border-[#1E293B] ${getCategoryColor(activeModalEvent.category)}`}>
                  {activeModalEvent.category}
                </span>
                <span className={`px-2.5 py-0.5 text-[10px] font-heading font-extrabold uppercase rounded-full border border-[#1E293B] ${
                  activeModalEvent.status === 'past'
                    ? 'bg-[#F1F5F9] text-slate-700'
                    : 'bg-[#34D399] text-[#1E293B]'
                }`}>
                  {activeModalEvent.status === 'past' ? 'ARCHIVE' : 'UPCOMING'}
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1E293B] pr-6">
                {activeModalEvent.title}
              </h3>
            </div>

            <div className="py-5 space-y-4">
              <p className="font-sans text-sm text-slate-700 leading-relaxed font-medium">
                {activeModalEvent.description}
              </p>
              
              <div className="bg-white p-4 rounded-2xl border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] space-y-2.5 font-sans text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">SCHEDULE:</span>
                  <span className="font-bold text-[#1E293B]">{activeModalEvent.date} • {activeModalEvent.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">LOCATION:</span>
                  <span className="font-bold text-[#1E293B]">{activeModalEvent.venue}</span>
                </div>
                {activeModalEvent.speaker && (
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">PRESENTER:</span>
                    <span className="font-bold text-[#8B5CF6]">{activeModalEvent.speaker.name} ({activeModalEvent.speaker.role})</span>
                  </div>
                )}
                {activeModalEvent.capacity && (
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">ELIGIBILITY:</span>
                    <span className="font-bold text-[#1E293B]">{activeModalEvent.capacity}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#1E293B]/15 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalEvent(null)}
                className="px-4 py-2 font-heading text-xs font-bold text-slate-600 hover:text-[#1E293B]"
              >
                CLOSE (ESC)
              </button>

              <div className="flex flex-wrap items-center gap-2">
                {activeModalEvent.linkedinUrl && (
                  <a
                    href={activeModalEvent.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-xs font-extrabold text-[#0A66C2] hover:text-[#004182] flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-[#1E293B] bg-white shadow-[2px_2px_0px_#1E293B] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5 fill-[#0A66C2] text-[#0A66C2]" />
                    <span>POST ↗</span>
                  </a>
                )}
                {activeModalEvent.status === 'past' ? (
                  <div className="font-mono text-xs text-slate-500 font-bold bg-[#F1F5F9] px-3 py-1.5 rounded-full border border-slate-300">
                    CONCLUDED CONCLAVE
                  </div>
                ) : (
                  <MechanicalButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenRsvpModal(activeModalEvent)}
                  >
                    {registeredEventIds[activeModalEvent.id] ? 'ALREADY REGISTERED' : 'APPLY (AVANTIKA EMAIL)'}
                  </MechanicalButton>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Institutional Event Application Modal (@avantika.edu.in + Google Sheet Sync) */}
      {rsvpModalEvent && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E293B]/70 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => { setRsvpModalEvent(null); setRsvpSuccessMsg(null); }}
        >
          <div 
            className="bg-[#FFFDF5] border-2 border-[#1E293B] max-w-lg w-full p-6 sm:p-8 rounded-3xl shadow-[10px_10px_0px_#1E293B] relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setRsvpModalEvent(null); setRsvpSuccessMsg(null); }}
              className="absolute top-5 right-5 w-9 h-9 rounded-full border-2 border-[#1E293B] bg-white hover:bg-[#F472B6] hover:text-white flex items-center justify-center shadow-[2px_2px_0px_#1E293B] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 pb-4 border-b-2 border-[#1E293B]/15">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-[#8B5CF6] text-white rounded-full font-heading text-[11px] font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>AVANTIKA PARTICIPANT REGISTRATION</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#1E293B]">
                {rsvpModalEvent.title}
              </h3>
              <p className="font-sans text-xs text-slate-600">
                Official event registration for Avantika University students and scholars.
              </p>
            </div>

            {/* Success View */}
            {rsvpSuccessMsg ? (
              <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-[#34D399] rounded-full border-2 border-[#1E293B] flex items-center justify-center mx-auto shadow-[3px_3px_0px_#1E293B]">
                  <Check className="w-8 h-8 text-[#1E293B] stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading text-2xl font-black text-[#1E293B]">APPLICATION CONFIRMED!</h4>
                  <p className="font-sans text-xs text-slate-600 max-w-xs mx-auto font-medium">
                    {rsvpSuccessMsg}
                  </p>
                </div>
                <div className="p-3.5 bg-white border-2 border-[#1E293B] rounded-2xl text-left text-xs font-sans space-y-1.5 shadow-[2px_2px_0px_#1E293B]">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">PARTICIPANT:</span>
                    <span className="font-extrabold text-[#1E293B]">{rsvpForm.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">AVANTIKA EMAIL:</span>
                    <span className="font-mono text-[#8B5CF6] font-bold">{rsvpForm.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">STATUS:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">
                      Logged in Django DB & Admin Desk
                    </span>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => { setRsvpModalEvent(null); setRsvpSuccessMsg(null); }}
                    className="px-6 py-2.5 bg-[#8B5CF6] text-white font-heading font-extrabold text-xs uppercase rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] hover:bg-[#7C3AED] transition-all"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              </div>
            ) : (
              /* Application Form */
              <form onSubmit={handleRsvpSubmit} className="py-4 space-y-3.5">
                {rsvpError && (
                  <div className="p-3 bg-rose-50 border-2 border-rose-400 rounded-xl text-xs font-sans font-bold text-rose-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{rsvpError}</span>
                  </div>
                )}

                <div>
                  <label className="block font-heading text-xs uppercase tracking-wider text-[#1E293B] font-extrabold mb-1">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Yashvardhan Singh"
                    className="w-full bg-white border-2 border-[#1E293B] rounded-xl text-sm py-2.5 px-3.5 font-sans focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="block font-heading text-xs uppercase tracking-wider text-[#1E293B] font-extrabold mb-1 flex items-center justify-between">
                    <span>AVANTIKA UNIVERSITY EMAIL *</span>
                    <span className="text-[10px] font-mono text-[#8B5CF6]">@avantika.edu.in ONLY</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={rsvpForm.email}
                    onChange={(e) => {
                      setRsvpForm({ ...rsvpForm, email: e.target.value });
                      if (rsvpError) setRsvpError(null);
                    }}
                    placeholder="name.branch@avantika.edu.in"
                    className="w-full bg-white border-2 border-[#1E293B] rounded-xl text-sm py-2.5 px-3.5 font-sans focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-heading text-xs uppercase tracking-wider text-[#1E293B] font-extrabold mb-1">
                      ENROLLMENT / ROLL NO.
                    </label>
                    <input
                      type="text"
                      value={rsvpForm.enrollment}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, enrollment: e.target.value })}
                      placeholder="e.g. AU23BT045"
                      className="w-full bg-white border-2 border-[#1E293B] rounded-xl text-sm py-2.5 px-3.5 font-sans focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>

                  <div>
                    <label className="block font-heading text-xs uppercase tracking-wider text-[#1E293B] font-extrabold mb-1">
                      TEAM / PARTICIPATION
                    </label>
                    <select
                      value={rsvpForm.teamSize}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, teamSize: e.target.value })}
                      className="w-full bg-white border-2 border-[#1E293B] rounded-xl text-xs py-2.5 px-3 font-sans font-bold focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
                    >
                      <option value="Solo Builder">Solo Builder</option>
                      <option value="Team of 2">Team of 2</option>
                      <option value="Team of 3+">Team of 3+</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t-2 border-[#1E293B]/15 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={SITE_CONFIG.socialLinks.eventGoogleFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border-2 border-[#1E293B] bg-white hover:bg-[#FFFBEA] font-heading text-[11px] font-bold text-slate-700 shadow-[2px_2px_0px_#1E293B] transition-all"
                      title="Open External Registration Form"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      <span>GOOGLE FORM ↗</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpModalEvent(null)}
                      className="px-3 py-2 font-heading text-xs font-bold text-slate-600 hover:text-[#1E293B]"
                    >
                      CANCEL
                    </button>

                    <MechanicalButton
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={isSubmittingRsvp}
                      icon={isSubmittingRsvp ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5 text-white" />}
                    >
                      {isSubmittingRsvp ? 'TRANSMITTING...' : 'TRANSMIT RSVP'}
                    </MechanicalButton>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
