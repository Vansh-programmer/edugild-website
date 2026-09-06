import React, { useState, useEffect } from 'react';
import { Settings, Plus, Trash2, X, Copy, Check, EyeOff, ArrowUpRight, ShieldCheck, RefreshCw, Mail, FileSpreadsheet } from 'lucide-react';
import { EventItem } from '../../data/events';
import { RosterMember } from '../../data/roster';
import { MechanicalButton } from './MechanicalButton';
import { DJANGO_ADMIN_URL, getSubmissions } from '../../services/api';
import { SITE_CONFIG } from '../../config/siteConfig';

interface QuickAdminDrawerProps {
  events: EventItem[];
  roster: RosterMember[];
  onAddEvent: (event: EventItem) => void;
  onDeleteEvent: (id: string) => void;
  onAddMember: (member: RosterMember) => void;
  onDeleteMember: (id: string) => void;
  onResetToDefaults: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const QuickAdminDrawer: React.FC<QuickAdminDrawerProps> = ({
  events,
  roster,
  onAddEvent,
  onDeleteEvent,
  onAddMember,
  onDeleteMember,
  onResetToDefaults,
  isOpen,
  onOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'roster' | 'submissions'>('submissions');
  const [submissionSubTab, setSubmissionSubTab] = useState<'registrations' | 'pitches' | 'subscribers'>('registrations');
  const [copied, setCopied] = useState(false);
  const [isAdminVisible, setIsAdminVisible] = useState(true);

  // Submissions State
  const [submissions, setSubmissions] = useState<{
    pitches: any[];
    registrations: any[];
    subscribers: any[];
  }>({ pitches: [], registrations: [], subscribers: [] });
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

  useEffect(() => {
    // Check if admin is requested via URL query params or dev mode
    try {
      const params = new URLSearchParams(window.location.search);
      const hasAdminParam = params.get('admin') === 'true' || params.get('desk') === 'admin';
      if (import.meta.env.DEV || hasAdminParam) {
        setIsAdminVisible(true);
      }
    } catch {
      // safe fallback
    }

    // Secret shortcut: Ctrl + Shift + A to toggle admin button
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const loadSubmissions = async () => {
    setSubmissionsLoading(true);
    try {
      const res = await getSubmissions();
      if (res.success && res.data) {
        setSubmissions({
          pitches: res.data.pitches || [],
          registrations: res.data.registrations || [],
          subscribers: res.data.subscribers || []
        });
      } else {
        // Fallback to local storage
        const localPitches = JSON.parse(localStorage.getItem(SITE_CONFIG.storageKeys.submittedPitches) || '[]');
        setSubmissions({
          pitches: localPitches,
          registrations: [],
          subscribers: []
        });
      }
    } catch {
      const localPitches = JSON.parse(localStorage.getItem(SITE_CONFIG.storageKeys.submittedPitches) || '[]');
      setSubmissions({
        pitches: localPitches,
        registrations: [],
        subscribers: []
      });
    } finally {
      setSubmissionsLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadSubmissions();
    }
  }, [isOpen]);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Workshops' as EventItem['category'],
    status: 'upcoming' as 'upcoming' | 'past',
    date: 'OCTOBER 22, 2026',
    time: '14:00 PM IST',
    venue: 'Design Studio A1',
    description: '',
  });

  // New Member Form State
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    category: 'Leadership' as RosterMember['category'],
    department: 'Executive Office',
    organization: 'Avantika E-Cell (2025-26)',
    focus: '',
    bio: '',
    badge: 'LEAD',
    image: '/team/person_1.png',
    linkedin: 'https://www.linkedin.com/school/avantika-university/',
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;

    const item: EventItem = {
      id: `custom-event-${Date.now()}`,
      title: newEvent.title,
      category: newEvent.category,
      status: newEvent.status,
      date: newEvent.date,
      time: newEvent.time,
      venue: newEvent.venue,
      description: newEvent.description || 'Session organized by Avantika E-Cell.',
    };

    onAddEvent(item);
    setNewEvent({
      title: '',
      category: 'Workshops',
      status: 'upcoming',
      date: 'OCTOBER 22, 2026',
      time: '14:00 PM IST',
      venue: 'Design Studio A1',
      description: '',
    });
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name.trim() || !newMember.role.trim()) return;

    const parts = newMember.name.trim().split(' ');
    const initials = parts.length >= 2 
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : newMember.name.slice(0, 2).toUpperCase();

    const item: RosterMember = {
      id: `custom-member-${Date.now()}`,
      name: newMember.name,
      role: newMember.role,
      category: newMember.category,
      department: newMember.department,
      organization: newMember.organization,
      focus: newMember.focus || 'Design & Entrepreneurship',
      bio: newMember.bio || 'Member of Avantika University E-Cell.',
      badge: newMember.badge,
      image: newMember.image || '/team/person_1.png',
      initials,
      linkedin: newMember.linkedin,
    };

    onAddMember(item);
    setNewMember({
      name: '',
      role: '',
      category: 'Leadership',
      department: 'Executive Office',
      organization: 'Avantika E-Cell (2025-26)',
      focus: '',
      bio: '',
      badge: 'LEAD',
      image: '/team/person_1.png',
      linkedin: 'https://www.linkedin.com/school/avantika-university/',
    });
  };

  const handleCopyJSON = () => {
    const data = activeTab === 'events' ? events : activeTab === 'roster' ? roster : submissions;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalSubmissions = submissions.pitches.length + submissions.registrations.length + submissions.subscribers.length;

  return (
    <>
      {/* Floating Trigger Button: Always accessible & clearly shows live submissions count */}
      {isAdminVisible && (
        <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5">
          <button
            onClick={onOpen}
            className="bg-[#1E293B] text-white border-2 border-[#1E293B] px-4 py-2.5 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider flex items-center gap-2.5 shadow-[4px_4px_0px_#FBBF24] hover:bg-[#8B5CF6] hover:shadow-[4px_4px_0px_#F472B6] transition-all hover:-translate-y-0.5 cursor-pointer"
            title="Open E-Cell Desk & Submissions"
          >
            <Settings className="w-4 h-4 text-[#FBBF24]" />
            <span>E-CELL DESK</span>
            <span className="px-2 py-0.5 bg-[#34D399] text-[#1E293B] rounded-full text-[10px] font-black">
              {totalSubmissions}
            </span>
          </button>
        </div>
      )}

      {/* Slide-over Playful Drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-end bg-[#1E293B]/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={onClose}
        >
          <div 
            className="bg-[#FFFDF5] border-l-2 border-[#1E293B] rounded-l-3xl w-full max-w-lg h-full p-6 sm:p-8 flex flex-col justify-between shadow-[-10px_0px_0px_#1E293B] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b-2 border-[#1E293B]/15">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white rounded-2xl border-2 border-[#1E293B] shadow-[2px_2px_0px_#8B5CF6] p-1 flex items-center justify-center shrink-0">
                    <img 
                      src="/ecell-logo.png" 
                      alt="Avantika University E-Cell Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-heading text-xs text-[#8B5CF6] font-black uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>COORDINATOR & INCUBATION DESK</span>
                    </div>
                    <h3 className="font-heading text-2xl font-black text-[#1E293B]">
                      E-Cell Desk & Records
                    </h3>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border-2 border-[#1E293B] bg-white hover:bg-[#F472B6] hover:text-white flex items-center justify-center shadow-[2px_2px_0px_#1E293B] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tab Switcher */}
              <div className="flex items-center gap-1.5 pt-4 pb-4">
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`flex-1 py-2 font-heading text-[11px] font-extrabold uppercase rounded-full border-2 border-[#1E293B] transition-all ${
                    activeTab === 'submissions' ? 'bg-[#34D399] text-[#1E293B] shadow-[2px_2px_0px_#1E293B]' : 'bg-white text-[#1E293B] hover:bg-[#F1F5F9]'
                  }`}
                >
                  SUBMISSIONS ({totalSubmissions})
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`flex-1 py-2 font-heading text-[11px] font-extrabold uppercase rounded-full border-2 border-[#1E293B] transition-all ${
                    activeTab === 'events' ? 'bg-[#8B5CF6] text-white shadow-[2px_2px_0px_#1E293B]' : 'bg-white text-[#1E293B] hover:bg-[#F1F5F9]'
                  }`}
                >
                  EVENTS ({events.length})
                </button>
                <button
                  onClick={() => setActiveTab('roster')}
                  className={`flex-1 py-2 font-heading text-[11px] font-extrabold uppercase rounded-full border-2 border-[#1E293B] transition-all ${
                    activeTab === 'roster' ? 'bg-[#8B5CF6] text-white shadow-[2px_2px_0px_#1E293B]' : 'bg-white text-[#1E293B] hover:bg-[#F1F5F9]'
                  }`}
                >
                  ROSTER ({roster.length})
                </button>
              </div>

              {/* SUBMISSIONS TAB */}
              {activeTab === 'submissions' && (
                <div className="space-y-4">
                  {/* Direct Django Admin Link & Credentials Card */}
                  <div className="bg-slate-900 text-white rounded-2xl border-2 border-[#1E293B] shadow-[3px_3px_0px_#FBBF24] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-heading text-xs font-black uppercase">
                        <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                        <span>DJANGO INCUBATOR ADMIN PANEL</span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-600/50 font-bold">
                        ● 0.0.0.0:8000 LIVE
                      </span>
                    </div>

                    <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 font-mono text-[11px] space-y-1.5 text-slate-200">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">ADMIN USERNAME:</span>
                        <strong className="text-[#FBBF24] bg-slate-900 px-2 py-0.5 rounded border border-slate-600">admin</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">ADMIN PASSWORD:</span>
                        <strong className="text-[#34D399] bg-slate-900 px-2 py-0.5 rounded border border-slate-600">avantika2026</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-center font-heading text-xs font-extrabold uppercase transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#1E293B]"
                      >
                        <span>LOCAL /ADMIN/</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={DJANGO_ADMIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1E293B] rounded-xl text-center font-heading text-xs font-extrabold uppercase transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#1E293B]"
                      >
                        <span>BACKEND /ADMIN/</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* 1-Click CSV Export for Google Sheets */}
                  <a
                    href="/api/submissions/export-csv/"
                    download="avantika_ecell_event_registrations.csv"
                    className="w-full flex items-center justify-center gap-2 p-2.5 bg-emerald-50 text-emerald-900 border-2 border-emerald-600 rounded-2xl font-heading text-xs font-extrabold uppercase shadow-[2px_2px_0px_#059669] hover:bg-emerald-100 transition-all"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                    <span>DOWNLOAD RSVPS (.CSV FOR GOOGLE SHEETS)</span>
                  </a>

                  {/* Sub-tabs: Pitches, Event RSVPs, Subscribers */}
                  <div className="flex items-center justify-between gap-1 border-b border-slate-200 pb-2">
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setSubmissionSubTab('pitches')}
                        className={`px-3 py-1 text-xs font-heading font-extrabold uppercase rounded-full transition-all ${
                          submissionSubTab === 'pitches' ? 'bg-[#FBBF24] text-[#1E293B] border border-[#1E293B]' : 'text-slate-600 hover:text-[#1E293B]'
                        }`}
                      >
                        Pitches ({submissions.pitches.length})
                      </button>
                      <button
                        onClick={() => setSubmissionSubTab('registrations')}
                        className={`px-3 py-1 text-xs font-heading font-extrabold uppercase rounded-full transition-all ${
                          submissionSubTab === 'registrations' ? 'bg-[#34D399] text-[#1E293B] border border-[#1E293B]' : 'text-slate-600 hover:text-[#1E293B]'
                        }`}
                      >
                        RSVPs ({submissions.registrations.length})
                      </button>
                      <button
                        onClick={() => setSubmissionSubTab('subscribers')}
                        className={`px-3 py-1 text-xs font-heading font-extrabold uppercase rounded-full transition-all ${
                          submissionSubTab === 'subscribers' ? 'bg-[#F472B6] text-white border border-[#1E293B]' : 'text-slate-600 hover:text-[#1E293B]'
                        }`}
                      >
                        Newsletter ({submissions.subscribers.length})
                      </button>
                    </div>

                    <button
                      onClick={loadSubmissions}
                      disabled={submissionsLoading}
                      className="p-1.5 text-slate-500 hover:text-[#8B5CF6] rounded-full hover:bg-slate-100 transition-colors"
                      title="Refresh from Django backend"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${submissionsLoading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>

                  {/* Pitches List */}
                  {submissionSubTab === 'pitches' && (
                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {submissions.pitches.length === 0 ? (
                        <div className="text-center py-8 text-xs font-sans text-slate-500 bg-white border border-slate-200 rounded-2xl p-4">
                          No venture proposals logged yet. Submit via Pitch Portal to test.
                        </div>
                      ) : (
                        submissions.pitches.map((p, idx) => (
                          <div key={idx} className="bg-white border-2 border-[#1E293B] rounded-2xl p-4 space-y-1.5 shadow-[2px_2px_0px_#1E293B] text-xs font-sans">
                            <div className="flex items-center justify-between">
                              <span className="font-heading text-sm font-black text-[#1E293B]">
                                {p.startupName || p.startup_name}
                              </span>
                              <span className="font-mono text-[10px] font-extrabold bg-[#FAF5FF] text-[#8B5CF6] px-2 py-0.5 rounded-full border border-[#8B5CF6]/30">
                                {p.ref || p.ref_id}
                              </span>
                            </div>
                            <div className="text-slate-600 font-semibold">
                              Founder: <strong className="text-slate-800">{p.founderName || p.founder_name}</strong> • <a href={`mailto:${p.email}`} className="text-[#8B5CF6] underline">{p.email}</a>
                            </div>
                            <div className="text-[11px] font-mono text-slate-500">
                              Sector: {p.sector}
                            </div>
                            <p className="text-slate-700 font-medium pt-1 border-t border-slate-100 leading-relaxed italic">
                              "{p.oneLinePitch || p.one_line_pitch}"
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Event RSVPs List */}
                  {submissionSubTab === 'registrations' && (
                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {submissions.registrations.length === 0 ? (
                        <div className="text-center py-8 text-xs font-sans text-slate-500 bg-white border border-slate-200 rounded-2xl p-4">
                          No event RSVPs logged yet. Apply for upcoming sessions using an @avantika.edu.in email.
                        </div>
                      ) : (
                        submissions.registrations.map((r, idx) => (
                          <div key={idx} className="bg-white border-2 border-[#1E293B] rounded-2xl p-4 space-y-1.5 shadow-[2px_2px_0px_#1E293B] text-xs font-sans">
                            <div className="flex items-center justify-between">
                              <span className="font-heading text-sm font-black text-[#1E293B]">
                                {r.participantName || r.participant_name}
                              </span>
                              <span className="font-mono text-[10px] font-bold bg-[#ECFDF5] text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                                Team of {r.teamSize || r.team_size || 1}
                              </span>
                            </div>
                            <div className="text-[#8B5CF6] font-bold">
                              {r.eventTitle || r.event_title}
                            </div>
                            <div className="text-slate-600 font-mono text-[11px]">
                              Email: <strong className="text-slate-800">{r.avantikaEmail || r.avantika_email}</strong>
                            </div>
                            {(r.enrollmentId || r.enrollment_id) && (
                              <div className="text-slate-500 text-[11px]">
                                Roll: {r.enrollmentId || r.enrollment_id} • {r.departmentYear || r.department_year}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Subscribers List */}
                  {submissionSubTab === 'subscribers' && (
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {submissions.subscribers.length === 0 ? (
                        <div className="text-center py-8 text-xs font-sans text-slate-500 bg-white border border-slate-200 rounded-2xl p-4">
                          No newsletter subscribers yet.
                        </div>
                      ) : (
                        submissions.subscribers.map((s, idx) => (
                          <div key={idx} className="bg-white border-2 border-[#1E293B] rounded-xl p-3 flex items-center justify-between text-xs font-sans shadow-[2px_2px_0px_#1E293B]">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-[#F472B6]" />
                              <span className="font-bold text-[#1E293B]">{s.email}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">
                              {s.created_at ? new Date(s.created_at).toLocaleDateString() : 'Active'}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* EVENTS TAB */}
              {activeTab === 'events' && (
                <div className="space-y-6">
                  {/* Add Event Form */}
                  <form onSubmit={handleCreateEvent} className="bg-white p-5 rounded-2xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] space-y-3.5">
                    <div className="font-heading text-xs font-extrabold uppercase text-[#1E293B] flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-[#8B5CF6]" />
                      <span>ADD NEW EVENT</span>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Event Title *"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        required
                        className="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-2.5 font-sans text-xs sm:text-sm focus:border-[#8B5CF6] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as EventItem['category'] })}
                        className="bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-2 font-sans text-xs font-bold"
                      >
                        <option value="Workshops">Workshops</option>
                        <option value="Hackathons">Hackathons</option>
                        <option value="Incubation">Incubation</option>
                        <option value="Keynotes">Keynotes</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Date (e.g. OCT 24, 2026)"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-2 font-mono text-xs"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Venue (e.g. MIT FabLab Bay 02)"
                      value={newEvent.venue}
                      onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                      className="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-2 font-sans text-xs"
                    />

                    <textarea
                      rows={2}
                      placeholder="Short description..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-2 font-sans text-xs resize-none"
                    />

                    <MechanicalButton variant="primary" size="sm" type="submit" className="w-full">
                      SAVE EVENT TO SITE
                    </MechanicalButton>
                  </form>

                  {/* List & Delete Existing Events */}
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    <div className="font-heading text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                      CURRENT ACTIVE EVENTS ({events.length})
                    </div>
                    {events.map((ev) => (
                      <div key={ev.id} className="bg-white rounded-xl border-2 border-[#1E293B] p-3 flex items-center justify-between text-xs font-sans shadow-[2px_2px_0px_#1E293B]">
                        <div className="truncate mr-2">
                          <div className="font-bold text-[#1E293B] truncate">{ev.title}</div>
                          <div className="text-[10px] text-slate-500">{ev.date} • {ev.category}</div>
                        </div>
                        <button
                          onClick={() => onDeleteEvent(ev.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ROSTER TAB */}
              {activeTab === 'roster' && (
                <div className="space-y-6">
                  {/* Add Member Form */}
                  <form onSubmit={handleCreateMember} className="bg-white p-5 rounded-2xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] space-y-3.5">
                    <div className="font-heading text-xs font-extrabold uppercase text-[#1E293B] flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-[#8B5CF6]" />
                      <span>ADD E-CELL MEMBER</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        required
                        className="bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-2 font-sans text-xs focus:border-[#8B5CF6] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Role / Title *"
                        value={newMember.role}
                        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                        required
                        className="bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-2 font-sans text-xs focus:border-[#8B5CF6] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={newMember.category}
                        onChange={(e) => setNewMember({ ...newMember, category: e.target.value as RosterMember['category'] })}
                        className="bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-2 font-sans text-xs font-bold"
                      >
                        <option value="Leadership">Leadership</option>
                        <option value="Design & Media">Design & Media</option>
                        <option value="Technical & Relations">Technical & Relations</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Department (e.g. Design & Brand)"
                        value={newMember.department}
                        onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                        className="bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-2 font-sans text-xs"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Focus Area (e.g. Conclaves & Hackathons)"
                      value={newMember.focus}
                      onChange={(e) => setNewMember({ ...newMember, focus: e.target.value })}
                      className="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-2 font-sans text-xs"
                    />

                    <MechanicalButton variant="primary" size="sm" type="submit" className="w-full">
                      SAVE MEMBER TO ROSTER
                    </MechanicalButton>
                  </form>

                  {/* List & Delete Existing Members */}
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    <div className="font-heading text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                      CURRENT ROSTER MEMBERS ({roster.length})
                    </div>
                    {roster.map((m) => (
                      <div key={m.id} className="bg-white rounded-xl border-2 border-[#1E293B] p-3 flex items-center justify-between text-xs font-sans shadow-[2px_2px_0px_#1E293B]">
                        <div className="truncate mr-2">
                          <div className="font-bold text-[#1E293B] truncate">{m.name}</div>
                          <div className="text-[10px] text-slate-500">{m.role} • {m.category}</div>
                        </div>
                        <button
                          onClick={() => onDeleteMember(m.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Utilities */}
            <div className="pt-5 border-t-2 border-[#1E293B]/15 flex items-center justify-between gap-2">
              <button
                onClick={handleCopyJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-[#1E293B] rounded-full text-xs font-heading font-extrabold shadow-[2px_2px_0px_#1E293B] hover:bg-[#F1F5F9] transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED!' : 'EXPORT JSON'}</span>
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    setIsAdminVisible(false);
                    onClose();
                  }}
                  className="flex items-center gap-1 text-[11px] font-heading font-bold text-slate-500 hover:text-slate-800"
                  title="Hide floating desk trigger"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>HIDE DESK</span>
                </button>

                <button
                  onClick={onResetToDefaults}
                  className="text-[11px] font-heading font-bold text-[#8B5CF6] underline hover:text-[#1E293B] transition-colors"
                >
                  RESET DEFAULTS
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
