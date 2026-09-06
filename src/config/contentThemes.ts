export type ContentThemeId = 'hero' | 'events' | 'roster' | 'pitch';

export interface ContentTheme {
  id: ContentThemeId;
  name: string;
  bgBase: string;          // Page background wash
  bgNav: string;           // Navbar translucent backdrop
  accentColor: string;      // Primary accent (borders, highlights, buttons)
  accentSecondary: string; // Complementary accent
  badgeText: string;       // Dynamic masthead badge text
  badgeBg: string;         // Masthead badge background class
  dotColor: string;        // Masthead badge indicator dot class
  selectionBg: string;     // Text selection background
}

export const CONTENT_THEMES: Record<ContentThemeId, ContentTheme> = {
  hero: {
    id: 'hero',
    name: 'Campus Launchpad',
    bgBase: '#FFFDF5', // Warm ivory
    bgNav: 'rgba(255, 253, 245, 0.95)',
    accentColor: '#8B5CF6',
    accentSecondary: '#FBBF24',
    badgeText: 'SPRING 2026 COHORT',
    badgeBg: 'bg-[#34D399]/20',
    dotColor: 'bg-[#10B981]',
    selectionBg: '#8B5CF6'
  },
  events: {
    id: 'events',
    name: 'Conclaves & Sprints',
    bgBase: '#FAF5FF', // Soft lilac wash
    bgNav: 'rgba(250, 245, 255, 0.95)',
    accentColor: '#7C3AED',
    accentSecondary: '#EC4899',
    badgeText: 'CONCLAVES & DEMO DAYS',
    badgeBg: 'bg-[#8B5CF6]/20',
    dotColor: 'bg-[#7C3AED]',
    selectionBg: '#7C3AED'
  },
  roster: {
    id: 'roster',
    name: 'Student Leadership',
    bgBase: '#F0FDF4', // Fresh mint wash
    bgNav: 'rgba(240, 253, 244, 0.95)',
    accentColor: '#059669',
    accentSecondary: '#10B981',
    badgeText: 'VERIFIED STUDENT BODY',
    badgeBg: 'bg-[#10B981]/20',
    dotColor: 'bg-[#059669]',
    selectionBg: '#059669'
  },
  pitch: {
    id: 'pitch',
    name: 'Incubation Studio',
    bgBase: '#FFFBEB', // Warm amber studio wash
    bgNav: 'rgba(255, 251, 235, 0.95)',
    accentColor: '#D97706',
    accentSecondary: '#F59E0B',
    badgeText: 'PROPOSALS ACTIVE',
    badgeBg: 'bg-[#F59E0B]/20',
    dotColor: 'bg-[#D97706]',
    selectionBg: '#D97706'
  }
};

