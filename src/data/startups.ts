export interface StartupVenture {
  name: string;
  tagline: string;
  sector: string;
  stage: string;
  funding: string;
  cohort: string;
  founders: string;
  highlight: string;
}

/**
 * Verified student innovation domains and conclave participants
 * at Avantika University in collaboration with Edugild & AIIC.
 */
export const STARTUPS_DATA: StartupVenture[] = [
  {
    name: 'Hardware & IoT Prototyping',
    tagline: 'Rapid embedded hardware fabrication and functional sensor prototypes',
    sector: 'MIT FabLab Ujjain',
    stage: 'Prototype Phase',
    funding: 'Campus FabLab Access',
    cohort: 'Avantika E-Cell 2025–26',
    founders: 'Student Innovator Cohort',
    highlight: 'Fabricated using CNC 4-axis milling and 3D printing farms.'
  },
  {
    name: 'Design & Human Ergonomics',
    tagline: 'User experience stress-testing, physical form factors, and UX architecture',
    sector: 'Design Studios',
    stage: 'Field Testing',
    funding: 'Design De-risking',
    cohort: 'Avantika E-Cell 2025–26',
    founders: 'Avantika Design Builders',
    highlight: 'Rigorous user-testing and commercial packaging validation.'
  }
];

export const ECOSYSTEM_METRICS = [
  { label: 'Flagship Prize Pools', value: '₹1,00,000+' },
  { label: 'Official Platform Reach', value: 'Unstop' },
  { label: 'Maker Facilities', value: 'MIT FabLab' },
  { label: 'Incubation Backing', value: 'Edugild × AIIC' },
];
