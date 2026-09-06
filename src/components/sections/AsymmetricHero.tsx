import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Clock, Cpu, Shield, Award } from 'lucide-react';
import { MechanicalButton } from '../common/MechanicalButton';
import { SquiggleDivider } from '../common/DecorativeShapes';
import { PARTNER_LOGOS } from '../../data/manifesto';
import { SITE_CONFIG } from '../../config/siteConfig';

interface AsymmetricHeroProps {
  onApplyClick: () => void;
  onExploreEventsClick: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
  isConcluded: boolean;
}

interface FacilitySpec {
  id: string;
  name: string;
  tag: string;
  color: 'violet' | 'pink' | 'yellow' | 'mint';
  specs: string[];
  status: string;
}

const FACILITY_SPECS: FacilitySpec[] = [
  {
    id: 'fablab',
    name: 'MIT FabLab Ujjain',
    tag: 'RAPID HARDWARE FABRICATION',
    color: 'violet',
    specs: [
      'Subtractive 4-Axis CNC Precision Milling',
      'High-Precision Laser Cutting & Engraving Station',
      'Additive SLA & FDM 3D Printing Lab Farm',
      'Electronic PCB Prototyping & Surface Mount Bay'
    ],
    status: '24/7 MAKER LAB ACCESS'
  },
  {
    id: 'aiic',
    name: 'AIIC Incubation Desk',
    tag: 'VENTURE INCUBATION & GOVERNANCE',
    color: 'mint',
    specs: [
      'Direct Incubation with Edugild Innovation Foundation',
      'Zero Early Equity Taken at Student Prototype Stage',
      'Fast-Track IPR & Indian Patent Filing Desk',
      'Guidance for Government Startup India & Grants'
    ],
    status: 'ON-CAMPUS INCUBATION ACTIVE'
  },
  {
    id: 'innovision',
    name: 'Innovision & Launchpad',
    tag: 'NATIONAL IDEA EXPO & DEMO DAYS',
    color: 'yellow',
    specs: [
      'National Idea Expo & Prototype Pitching Platform',
      'Official Platform Partnership with Unstop',
      'Cash Prize Pools up to ₹1,00,000 for Winners',
      'Direct Incubation Induction for Top Finalists'
    ],
    status: 'FLAGSHIP CONCLAVES'
  }
];

export const AsymmetricHero: React.FC<AsymmetricHeroProps> = ({
  onApplyClick,
  onExploreEventsClick,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
    isConcluded: false,
  });

  const [activeFacilityIdx, setActiveFacilityIdx] = useState(0);

  useEffect(() => {
    const targetDate = new Date(SITE_CONFIG.summit.targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      // 4-hour active session window before moving to concluded
      const fourHoursMs = 4 * 60 * 60 * 1000;

      if (difference <= -fourHoursMs) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false, isConcluded: true });
        return;
      } else if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true, isConcluded: false });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false, isConcluded: false });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeSpec = FACILITY_SPECS[activeFacilityIdx];

  return (
    <section id="hero" className="w-full border-b-2 border-[#1E293B] bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Stable Grid Typography & Countdown (Span 7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              
              {/* Pill Tag */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white text-[#1E293B] rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] font-heading font-extrabold text-xs tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                <span>AVANTIKA E-CELL × AIIC</span>
                <span className="text-slate-400">•</span>
                <span className="text-[#64748B]">UJJAIN CAMPUS</span>
              </div>

              {/* Bold Playful Heading */}
              <div className="relative">
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1E293B] leading-[1.08]">
                  Build the{' '}
                  <span className="relative inline-block text-[#8B5CF6]">
                    Next Big Thing
                    <span className="absolute -bottom-2 left-0 w-full">
                      <SquiggleDivider color="#F472B6" className="w-full h-3" />
                    </span>
                  </span>{' '}
                  at Avantika.
                </h1>
              </div>

              <p className="font-sans text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed font-medium pt-2">
                Where design-driven prototyping meets venture incubation. Backed by Edugild Innovation Foundation and the Avantika Innovation & Incubation Center (AIIC), we empower student founders to turn prototypes into funded ventures.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <MechanicalButton
                  variant="primary"
                  size="md"
                  onClick={onApplyClick}
                  icon={<ArrowUpRight className="w-4 h-4 text-white" />}
                >
                  SUBMIT PITCH
                </MechanicalButton>

                <MechanicalButton
                  variant="secondary"
                  size="md"
                  onClick={onExploreEventsClick}
                >
                  EXPLORE SESSIONS
                </MechanicalButton>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="border-2 border-[#1E293B] bg-white p-5 sm:p-6 rounded-3xl shadow-[6px_6px_0px_#1E293B] relative group transition-transform hover:-translate-y-0.5">
              <div className="flex flex-wrap items-center justify-between pb-3.5 border-b-2 border-[#F1F5F9] gap-2">
                <div className="flex items-center gap-2.5 font-heading text-xs sm:text-sm font-extrabold uppercase text-[#1E293B]">
                  {timeLeft.isConcluded ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                  ) : timeLeft.isLive ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  ) : (
                    <Clock className="w-4 h-4 text-[#8B5CF6]" />
                  )}
                  <span>
                    {timeLeft.isConcluded 
                      ? 'SUBMISSIONS CONCLUDED • EVALUATION ACTIVE' 
                      : timeLeft.isLive 
                        ? 'SESSION IS LIVE NOW' 
                        : `COUNTDOWN TO ${SITE_CONFIG.summit.name.toUpperCase()}`}
                  </span>
                </div>
                <div className="font-mono text-xs text-[#64748B] font-bold bg-[#F1F5F9] px-2.5 py-1 rounded-full border border-slate-300">
                  {SITE_CONFIG.summit.formattedDate}
                </div>
              </div>

              {/* Digits Grid or Concluded Evaluation Banner */}
              {timeLeft.isConcluded ? (
                <div className="pt-4 pb-2 space-y-2 text-center bg-[#FAF5FF] border-2 border-[#8B5CF6]/20 rounded-2xl p-4">
                  <div className="font-heading text-base sm:text-lg font-black text-[#8B5CF6] uppercase">
                    {SITE_CONFIG.summit.name} SUBMISSIONS CONCLUDED
                  </div>
                  <p className="font-sans text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Student prototypes and pitches are currently under review by the Edugild Innovation Foundation & AIIC Jury Panel. Explore the calendar below for upcoming conclaves.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 sm:gap-3.5 pt-4 text-center">
                  <div className="bg-[#FFFBEA] p-2.5 sm:p-3 rounded-2xl border-2 border-[#1E293B] shadow-[3px_3px_0px_#FBBF24]">
                    <div className="font-heading text-2xl sm:text-4xl font-extrabold text-[#1E293B]">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="font-heading text-[10px] sm:text-xs text-slate-600 uppercase font-bold mt-0.5">DAYS</div>
                  </div>

                  <div className="bg-[#FAF5FF] p-2.5 sm:p-3 rounded-2xl border-2 border-[#1E293B] shadow-[3px_3px_0px_#8B5CF6]">
                    <div className="font-heading text-2xl sm:text-4xl font-extrabold text-[#8B5CF6]">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="font-heading text-[10px] sm:text-xs text-slate-600 uppercase font-bold mt-0.5">HOURS</div>
                  </div>

                  <div className="bg-[#FDF2F8] p-2.5 sm:p-3 rounded-2xl border-2 border-[#1E293B] shadow-[3px_3px_0px_#F472B6]">
                    <div className="font-heading text-2xl sm:text-4xl font-extrabold text-[#F472B6]">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="font-heading text-[10px] sm:text-xs text-slate-600 uppercase font-bold mt-0.5">MINS</div>
                  </div>

                  <div className="bg-[#ECFDF5] p-2.5 sm:p-3 rounded-2xl border-2 border-[#1E293B] shadow-[3px_3px_0px_#34D399]">
                    <div className="font-heading text-2xl sm:text-4xl font-extrabold text-[#059669]">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="font-heading text-[10px] sm:text-xs text-slate-600 uppercase font-bold mt-0.5">SECS</div>
                  </div>
                </div>
              )}
            </div>

            {/* Verified Operational Indicators */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="p-3 bg-white rounded-2xl border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B]">
                <div className="font-heading text-xl sm:text-2xl font-black text-[#1E293B]">₹1,00,000</div>
                <div className="font-sans text-xs text-slate-600 font-semibold">Flagship Prize Pool</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B]">
                <div className="font-heading text-xl sm:text-2xl font-black text-[#8B5CF6]">National</div>
                <div className="font-sans text-xs text-slate-600 font-semibold">Unstop & IIC Reach</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B]">
                <div className="font-heading text-xl sm:text-2xl font-black text-[#F472B6]">7+ Sessions</div>
                <div className="font-sans text-xs text-slate-600 font-semibold">Official LinkedIn Posts</div>
              </div>
            </div>
          </div>

          {/* Right Column: Tactile Playground Lab Console (Span 5) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Interactive Lab Sticker Box */}
            <div className="border-2 border-[#1E293B] bg-white rounded-3xl shadow-[8px_8px_0px_#1E293B] overflow-hidden transition-all">
              
              {/* Candy Tab Selector */}
              <div className="p-2.5 bg-[#1E293B] flex gap-2 overflow-x-auto">
                {FACILITY_SPECS.map((spec, i) => {
                  const isActive = activeFacilityIdx === i;
                  return (
                    <button
                      key={spec.id}
                      onClick={() => setActiveFacilityIdx(i)}
                      className={`flex-1 py-2 px-3 text-xs font-heading font-extrabold uppercase rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-[#FBBF24] text-[#1E293B] shadow-[2px_2px_0px_#FFFFFF]'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {spec.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>

              {/* Lab Content Area */}
              <div className="p-6 bg-[#FFFDF5] space-y-5">
                
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#1E293B]/10">
                  <div>
                    <span className="font-heading text-[11px] uppercase font-bold text-[#8B5CF6] tracking-wider">
                      {activeSpec.tag}
                    </span>
                    <h3 className="font-heading text-2xl font-extrabold text-[#1E293B] mt-0.5">
                      {activeSpec.name}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl border-2 border-[#1E293B] bg-[#FFFBEA] shadow-[3px_3px_0px_#FBBF24] flex items-center justify-center">
                    {activeFacilityIdx === 0 && <Cpu className="w-6 h-6 text-[#8B5CF6]" />}
                    {activeFacilityIdx === 1 && <Shield className="w-6 h-6 text-[#34D399]" />}
                    {activeFacilityIdx === 2 && <Award className="w-6 h-6 text-[#F472B6]" />}
                  </div>
                </div>

                {/* Technical Specs List as mini stickers */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-heading uppercase text-slate-500 font-bold tracking-wider">
                    FACILITY CAPABILITIES:
                  </div>
                  {activeSpec.specs.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-between font-sans text-xs font-semibold text-slate-800 hover:bg-[#FFFBEA] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                        <span>{item}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Status Capsule */}
                <div className="pt-3 border-t-2 border-[#1E293B]/10 flex items-center justify-between font-sans text-xs">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#34D399]/20 border border-[#34D399] rounded-full text-emerald-800 font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    {activeSpec.status}
                  </span>
                  <span className="font-mono text-slate-500 text-[11px]">UJJAIN, MP</span>
                </div>

              </div>
            </div>

            {/* Ecosystem Partners Strip */}
            <div className="border-2 border-[#1E293B] bg-[#1E293B] text-white p-4 rounded-2xl shadow-[4px_4px_0px_#1E293B]">
              <div className="text-[10px] font-heading font-extrabold tracking-widest text-slate-400 uppercase pb-2 border-b border-slate-800">
                AFFILIATED ECOSYSTEM PARTNERS
              </div>
              <div className="pt-2.5 flex flex-wrap gap-2">
                {PARTNER_LOGOS.map((partner, idx) => (
                  <span key={idx} className="font-heading text-[10px] text-slate-300 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700">
                    {partner.name}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
