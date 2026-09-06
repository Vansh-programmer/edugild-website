/**
 * Avantika University E-Cell × AIIC Central Configuration
 */

export const SITE_CONFIG = {
  brandName: 'Avantika E-Cell',
  universityName: 'Avantika University',
  partnerName: 'Edugild Innovation Foundation & AIIC',
  campusLocation: 'Ujjain, Madhya Pradesh, India',
  coordinates: '23.1765° N, 75.7885° E',

  // Incubation Program Status
  cohortStatus: {
    isOpen: true,
    badgeText: 'INCUBATION OPEN',
    maxGrantAmount: '₹1,00,000+',
    grantType: 'Venture Incubation & Prize Awards',
    evaluationTeam: 'Edugild Innovation Foundation & AIIC Jury',
  },

  // Active Flagship Event Schedule (ISO string with IST offset)
  summit: {
    name: 'Launchpad 2026',
    fullName: 'Launchpad: Product Demo Day 2026',
    edition: '2026 Edition',
    targetDate: '2026-09-07T17:00:00+05:30',
    formattedDate: 'SEPTEMBER 07, 2026',
    venue: 'Avantika University Campus & Prototyping Studios',
    theme: 'Prototypes, MVPs & Venture Demo Day',
  },

  // Prototyping Facilities
  facilities: [
    { name: 'MIT FabLab Ujjain', tag: 'MAKER LAB' },
    { name: 'Design & Prototyping Studios', tag: 'STUDIO BAY' },
    { name: 'AI & Computing Labs', tag: 'TECH BAY' },
    { name: 'IPR & Patent Facilitation Desk', tag: 'AIIC DESK' },
  ],

  // Social & Official External Links
  socialLinks: {
    edugild: 'https://www.edugild.com/',
    linkedin: 'https://www.linkedin.com/showcase/avantika-university-e-cell/?originalSubdomain=in',
    instagram: 'https://www.instagram.com/ecell.avantika/',
    twitter: 'https://twitter.com/AvantikaUniv',
    github: 'https://github.com/avantika-university',
    contactEmail: 'aiic@avantika.edu.in',
    ecellEmail: 'ecell@avantika.edu.in',
    eventGoogleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc_avantika_ecell_events/viewform',
    googleMapsLocation: 'https://maps.google.com/?q=Avantika+University+Ujjain',
  },

  // LocalStorage Persistence Keys
  storageKeys: {
    pitchDraft: 'avantika_pitch_draft_v2',
    submittedPitches: 'avantika_submitted_pitches_v2',
    registeredEvents: 'avantika_registered_events_v2',
    customEvents: 'avantika_custom_events_v6',
    customRoster: 'avantika_custom_roster_v2',
  }
};
