/**
 * AVANTIKA UNIVERSITY E-CELL TEAM DIRECTORY (2025-26)
 * 
 * Official Entrepreneurship Cell Team from the verified Avantika E-Cell roster.
 * Exclusively includes the core team members from the official Team 2025-26 cohort.
 */

export interface RosterMember {
  id: string;
  name: string;
  role: string;
  category: 'Leadership' | 'Design & Media' | 'Technical & Relations';
  department: string;
  organization: string;
  focus: string;
  bio: string;
  badge: string;
  image: string;
  initials: string;
  contactEmail?: string;
  linkedin: string;
}

export const INITIAL_ROSTER: RosterMember[] = [
  {
    id: 'ecell-member-6',
    name: 'Nayan Vyas',
    role: 'Student Lead & President',
    category: 'Leadership',
    department: 'Executive Office',
    organization: 'Avantika E-Cell (2025-26)',
    focus: 'Venture Strategy, Conclaves & Campus Startups',
    bio: 'Leads student entrepreneurship initiatives, venture incubator partnerships, and the annual Innovision Idea Expo at Avantika University.',
    badge: 'PRESIDENT',
    image: '/team/person_6.png',
    initials: 'NV',
    linkedin: 'https://www.linkedin.com/school/avantika-university/'
  },
  {
    id: 'ecell-member-1',
    name: 'Sayali Shinde',
    role: 'Design & Creative Strategy Lead',
    category: 'Design & Media',
    department: 'Design & Brand',
    organization: 'Avantika E-Cell (2025-26)',
    focus: 'Design Systems, Visual Identity & Founder Decks',
    bio: 'Oversees the brand strategy and editorial design systems for Avantika E-Cell and guides student ventures on user-centric product architecture.',
    badge: 'DESIGN LEAD',
    image: '/team/person_1.png',
    initials: 'SS',
    linkedin: 'https://www.linkedin.com/school/avantika-university/'
  },
  {
    id: 'ecell-member-2',
    name: 'Simran Sharma',
    role: 'Media & Public Relations Lead',
    category: 'Design & Media',
    department: 'Communications & PR',
    organization: 'Avantika E-Cell (2025-26)',
    focus: 'The E-Cell Dispatch, Press & Founder Spotlights',
    bio: 'Drives official digital media, campus press relations, and the weekly E-Cell innovation dispatch.',
    badge: 'COMMUNICATIONS',
    image: '/team/person_2.png',
    initials: 'SS',
    linkedin: 'https://www.linkedin.com/school/avantika-university/'
  },
  {
    id: 'ecell-member-3',
    name: 'Mauli Rai',
    role: 'Operations & Conclave Lead',
    category: 'Leadership',
    department: 'Events & Logistics',
    organization: 'Avantika E-Cell (2025-26)',
    focus: 'Venture Bootcamps, Speaker Sprints & Jury Sessions',
    bio: 'Orchestrates campus pitch days, jury coordination, and student founder bootcamps across the academic calendar.',
    badge: 'OPERATIONS',
    image: '/team/person_3.png',
    initials: 'MR',
    linkedin: 'https://www.linkedin.com/school/avantika-university/'
  },
  {
    id: 'ecell-member-4',
    name: 'Purab Sharma',
    role: 'Corporate Relations & Venture Outreach',
    category: 'Technical & Relations',
    department: 'Industry Relations',
    organization: 'Avantika E-Cell (2025-26)',
    focus: 'Angel Syndicates, Sponsorships & Corporate Pilots',
    bio: 'Connects student startups with angel networks, corporate incubators, and industry partners for market testbeds.',
    badge: 'CORPORATE LEAD',
    image: '/team/person_4.png',
    initials: 'PS',
    linkedin: 'https://www.linkedin.com/school/avantika-university/'
  },
  {
    id: 'ecell-member-5',
    name: 'Kartik Kumawat',
    role: 'Technical & Prototyping Lead',
    category: 'Technical & Relations',
    department: 'Hardware & Prototyping',
    organization: 'Avantika E-Cell (2025-26)',
    focus: 'Hardware Prototyping, FabLab Sprints & Hackathons',
    bio: 'Spearheads technical buildathons, hardware prototyping access, and MakerLab sprints across the Avantika campus.',
    badge: 'TECH LEAD',
    image: '/team/person_5.png',
    initials: 'KK',
    linkedin: 'https://www.linkedin.com/school/avantika-university/'
  }
];

export const ROSTER_DATA = INITIAL_ROSTER;
