export interface ManifestoPillar {
  number: string;
  title: string;
  tagline: string;
  body: string;
  actionTag: string;
}

export const MANIFESTO_PILLARS: ManifestoPillar[] = [
  {
    number: '01',
    title: 'Design-Centric De-risking',
    tagline: 'We do not build software looking for a problem.',
    body: 'At Avantika, every company begins in user empathy and material prototyping. We stress-test ergonomic, physical, and behavioral friction long before code is written, drastically reducing product death in market.',
    actionTag: 'FABRICATION & FIELD LOOPS'
  },
  {
    number: '02',
    title: 'The Edugild Global Gateway',
    tagline: 'Direct bridge to capital, corporate pilots, and cross-border scale.',
    body: 'As India’s premier dedicated education and innovation accelerator, Edugild injects institutional rigor, Tier-1 venture syndicates, and corporate testbeds across India, Singapore, and Silicon Valley.',
    actionTag: 'INSTITUTIONAL SYNDICATE'
  },
  {
    number: '03',
    title: 'Prototype Support & Prize Pools',
    tagline: 'Resources and competition grants to prove the hypothesis first.',
    body: 'We facilitate cash prize pools up to ₹1,00,000 in flagship conclaves (Startup Showdown, Innovision, Launchpad) and government grant advisory without taking early founder equity. Founders retain complete cap-table control while taking advantage of university CNCs, laser cutters, and 3D printing bays.',
    actionTag: 'PRIZES & INCUBATION'
  }
];

export const PARTNER_LOGOS = [
  { name: 'EDUGILD INNOVATION FOUNDATION', tag: 'ACCELERATOR' },
  { name: 'UNSTOP', tag: 'PLATFORM PARTNER' },
  { name: 'INSTITUTION’S INNOVATION COUNCIL', tag: 'IIC COUNCIL' },
  { name: 'AIIC AVANTIKA', tag: 'INCUBATION CENTER' },
  { name: 'MAEER’S MIT GROUP PUNE', tag: 'FOUNDING BODY' },
  { name: 'MIT FABLAB', tag: 'MAKER LAB' },
  { name: 'STARTUP INDIA', tag: 'DPIIT ECOSYSTEM' },
];

