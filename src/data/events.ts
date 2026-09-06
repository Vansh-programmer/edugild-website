/**
 * AVANTIKA E-CELL EVENT DIRECTORY
 * 
 * Official Entrepreneurship Cell & Edugild / AIIC Incubation Calendar.
 * Reflects verified past and upcoming events from official E-Cell LinkedIn announcements.
 */

export interface EventItem {
  id: string;
  title: string;
  category: 'Workshops' | 'Hackathons' | 'Incubation' | 'Keynotes';
  status?: 'upcoming' | 'past';
  date: string;
  time: string;
  venue: string;
  description: string;
  speaker?: {
    name: string;
    role: string;
    org: string;
  };
  capacity?: string;
  badge?: string;
  isFlagship?: boolean;
  linkedinUrl?: string;
}

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'launchpad-2026',
    title: 'Launchpad – Product Demo Day 2026',
    category: 'Incubation',
    status: 'upcoming',
    date: 'SEPTEMBER 07, 2026',
    time: '05:00 PM IST (Deadline)',
    venue: 'Avantika University Campus & Prototyping Studios',
    description: 'Organised by Edugild Innovation Foundation, an opportunity to take prototypes, MVPs, or working products beyond the classroom and present before an expert jury for ₹15,000 in cash prizes, trophies, and incubation access.',
    speaker: {
      name: 'Edugild Innovation Foundation & Jury Panel',
      role: 'Evaluation Board',
      org: 'Edugild × Avantika E-Cell'
    },
    capacity: 'Open to All Disciplines & Teams',
    badge: '₹15K CASH PRIZES',
    isFlagship: true,
    linkedinUrl: 'https://www.linkedin.com/posts/avantika-university-e-cell_launchpad2026-productdemoday-studentinnovation-activity-7501476513062645760-2uqN'
  },
  {
    id: 'startup-showdown-2026',
    title: 'Startup Showdown 2026: National Startup Pitching Competition',
    category: 'Incubation',
    status: 'past',
    date: 'JULY 23, 2026',
    time: '10:00 AM IST',
    venue: 'Avantika University, Ujjain (Hybrid Mode)',
    description: 'National startup pitching competition organized by Edugild Innovation Foundation in association with Avantika E-Cell & IIC, powered by Unstop. Cash prizes worth ₹1,00,000, incubation opportunities, mentor connect, and patent filing assistance.',
    speaker: {
      name: 'Edugild Ventures & Unstop Jury Panel',
      role: 'Investment Board',
      org: 'Edugild × Avantika E-Cell × IIC'
    },
    capacity: 'National Cohort',
    badge: '₹1 LAKH PRIZES',
    isFlagship: true,
    linkedinUrl: 'https://www.linkedin.com/posts/avantika-university-e-cell_startupshowdown2026-entrepreneurship-startups-activity-7483487958273159169-WOv7'
  },
  {
    id: 'innovision-2026',
    title: 'Innovision 2026: National Idea Expo',
    category: 'Keynotes',
    status: 'past',
    date: 'JULY 24, 2026',
    time: '09:30 AM IST',
    venue: 'Avantika University, Ujjain',
    description: 'National Idea Expo organized by Avantika E-Cell in association with Edugild Innovation Foundation and IIC, powered by Unstop. Innovators, researchers, and startups from across India exhibit breakthrough ideas and prototypes for ₹1,00,000 in prizes.',
    speaker: {
      name: 'Avantika E-Cell & Edugild Steering Board',
      role: 'Expo Conveners',
      org: 'Avantika E-Cell × Edugild × Unstop'
    },
    capacity: 'Pan-India Innovators',
    badge: '₹1 LAKH PRIZES',
    isFlagship: true,
    linkedinUrl: 'https://www.linkedin.com/posts/avantika-university-e-cell_innovision2026-innovation-ideaexpo-activity-7483490527389179904-G0F0'
  },
  {
    id: 'ai-robotics-bapna',
    title: 'Masterclass: AI, Robotics & Strategic Execution',
    category: 'Workshops',
    status: 'past',
    date: 'MARCH 02, 2026',
    time: '03:30 PM - 04:30 PM IST',
    venue: 'Gyankunj B008, Avantika University',
    description: 'Engaging session on AI, robotics, and entrepreneurship hosted by Avantika E-Cell & IIC featuring Mr. Rishabh Bapna (Strategic Execution Consultants) on intelligent systems, agile execution, and tech venture creation.',
    speaker: {
      name: 'Mr. Rishabh Bapna',
      role: 'Strategic Execution & AI Expert',
      org: 'Strategic Execution Consultants Pvt. Ltd.'
    },
    capacity: 'Gyankunj Auditorium',
    badge: 'AI & ROBOTICS',
    isFlagship: false,
    linkedinUrl: 'https://www.linkedin.com/posts/avantika-university-e-cell_ecell-avantikauniversity-ai-activity-7433883382113128450-kF6Y'
  },
  {
    id: 'esummit-2026',
    title: 'Avantika E-Summit: Meme-A-Thon, AI Case Crack & Pitch ’N Win',
    category: 'Hackathons',
    status: 'past',
    date: 'FEBRUARY 26, 2026',
    time: '11:00 AM IST',
    venue: 'Amphitheatre & Studios, Avantika Campus',
    description: 'Flagship campus entrepreneurship summit hosted by Avantika E-Cell featuring Meme-A-Thon, AI Case Crack, and Pitch ’N Win competitions celebrating creative problem solving, rapid pitching, and venture thinking.',
    speaker: {
      name: 'Avantika E-Cell Organizing Council',
      role: 'Summit Chairs',
      org: 'Avantika University E-Cell'
    },
    capacity: 'Campus Wide',
    badge: 'E-SUMMIT',
    isFlagship: false,
    linkedinUrl: 'https://www.linkedin.com/posts/avantika-university-e-cell_esummit-ecell-avantikauniversity-activity-7436568944557096961-vOPY'
  },
  {
    id: 'gameday-2026',
    title: 'Game Day: Crossword Mania & Flip The Slip',
    category: 'Workshops',
    status: 'past',
    date: 'MARCH 12, 2026',
    time: '14:00 PM IST',
    venue: 'Avantika University Campus',
    description: 'E-Cell in collaboration with IIC presented Game Day—an engaging set of activities including Crossword Mania, Flip The Slip, and inter-school debates designed to foster strategic thinking, quick decision-making, and collaboration.',
    speaker: {
      name: 'E-Cell & IIC Student Council',
      role: 'Game Coordinators',
      org: 'Avantika University E-Cell × IIC'
    },
    capacity: 'Interactive Arena',
    badge: 'STRATEGY GAMES',
    isFlagship: false,
    linkedinUrl: 'https://www.linkedin.com/posts/avantika-university-e-cell_gameday-crosswordmania-fliptheslip-activity-7445266255776890880-cyJq'
  },
  {
    id: 'brand-identity-launch',
    title: 'Official E-Cell Brand Identity & Charter Launch',
    category: 'Keynotes',
    status: 'past',
    date: 'FEBRUARY 18, 2026',
    time: '12:00 PM IST',
    venue: 'Avantika University Campus',
    description: 'Official introduction of the E-Cell brand identity at Avantika University, built on clarity, innovation, and purpose to foster an entrepreneurial ecosystem that empowers students to think innovatively, act strategically, and build with purpose.',
    speaker: {
      name: 'Avantika E-Cell Student Leadership',
      role: 'Executive Core',
      org: 'Avantika University E-Cell'
    },
    capacity: 'Ecosystem Wide',
    badge: 'BRAND LAUNCH',
    isFlagship: false,
    linkedinUrl: 'https://www.linkedin.com/posts/avantika-university-e-cell_ecell-avantikauniversity-brandidentity-activity-7432582676114718721-HeeI'
  }
];

export const EVENTS_DATA = INITIAL_EVENTS;
