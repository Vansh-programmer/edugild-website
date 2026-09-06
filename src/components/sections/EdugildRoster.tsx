import React from 'react';
import { Users, Compass, ShieldCheck, Rocket, Layers, Trophy } from 'lucide-react';

export const EdugildRoster: React.FC = () => {
  return (
    <section id="roster" className="w-full border-b-2 border-[#1E293B] py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b-2 border-[#1E293B]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F472B6] text-white font-heading text-xs uppercase tracking-wider font-extrabold rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
              <Users className="w-3.5 h-3.5 text-white" />
              <span>AVANTIKA E-CELL COHORT</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-[#1E293B]">
              Meet The Team.
            </h2>

            <p className="font-sans text-sm sm:text-base text-slate-700 font-medium max-w-xl">
              The student innovators leading venture incubation, prototyping sprints, and conclaves across Avantika University.
            </p>
          </div>

          <div className="flex items-center gap-2.5 font-heading text-xs text-[#1E293B] bg-white px-4 py-2.5 rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#FBBF24]">
            <Compass className="w-4 h-4 text-[#8B5CF6] shrink-0" />
            <span className="font-extrabold tracking-wider">ACADEMIC SESSION: 2025–26</span>
          </div>
        </div>

        {/* The Official Team Showcase Sticker Banner */}
        <div className="mt-12 group relative bg-white border-2 border-[#1E293B] rounded-3xl shadow-[8px_8px_0px_#1E293B] overflow-hidden transition-all duration-300 hover:shadow-[10px_10px_0px_#8B5CF6]">
          
          {/* Top Window Strip */}
          <div className="px-6 py-3.5 bg-[#1E293B] text-white flex flex-wrap items-center justify-between gap-3 font-heading text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
              <span className="font-black text-white tracking-wider">
                ENTREPRENEURSHIP CELL • AVANTIKA UNIVERSITY
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-[#FBBF24] text-[#1E293B] px-3 py-0.5 rounded-full text-[11px] font-black border border-[#1E293B]">
                OFFICIAL COHORT
              </span>
            </div>
          </div>

          {/* Full Banner Display */}
          <div className="relative w-full overflow-hidden bg-slate-900">
            <img
              src="/team/avantika_ecell_team_2025_26.png"
              alt="Avantika University E-Cell Official Team 2025-26"
              className="w-full h-auto object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300 select-none"
            />
          </div>

          {/* Bottom Footnote Bar */}
          <div className="p-5 bg-[#FFFDF5] border-t-2 border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans font-semibold">
            <div className="flex items-center gap-2 text-slate-800">
              <ShieldCheck className="w-4 h-4 text-[#34D399] stroke-[2.5]" />
              <span className="font-extrabold font-heading text-[#1E293B]">VERIFIED STUDENT BODY</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">IN COLLABORATION WITH EDUGILD & AIIC</span>
            </div>
            <div className="font-mono text-slate-500 text-[11px]">
              LEKHODA, UJJAIN • MADHYA PRADESH
            </div>
          </div>

        </div>

        {/* 3 Departmental Mandate Pillars as Playful Sticker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
          
          {/* Pillar 01 */}
          <div className="relative group bg-white border-2 border-[#1E293B] rounded-3xl p-7 shadow-[6px_6px_0px_#8B5CF6] flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:rotate-[-0.5deg]">
            <div className="absolute -top-5 left-6 w-10 h-10 rounded-full border-2 border-[#1E293B] bg-[#34D399] flex items-center justify-center text-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
              <Rocket className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div className="space-y-3 pt-3">
              <span className="font-heading text-xs font-black text-[#8B5CF6] tracking-wider uppercase">
                INCUBATION
              </span>
              <h3 className="font-heading text-2xl font-black text-[#1E293B]">
                Venture Sprints.
              </h3>
              <p className="font-sans text-sm text-slate-600 font-medium leading-relaxed">
                Connecting early student hypotheses to university seed grants, prototyping lab clearance, and legal IPR desks.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t-2 border-slate-100 font-heading text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              CAMPUS PROTOTYPING ACCESS
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="relative group bg-white border-2 border-[#1E293B] rounded-3xl p-7 shadow-[6px_6px_0px_#F472B6] flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:rotate-[0.5deg]">
            <div className="absolute -top-5 left-6 w-10 h-10 rounded-full border-2 border-[#1E293B] bg-[#FBBF24] flex items-center justify-center text-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
              <Layers className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div className="space-y-3 pt-3">
              <span className="font-heading text-xs font-black text-[#F472B6] tracking-wider uppercase">
                DESIGN ARCHITECTURE
              </span>
              <h3 className="font-heading text-2xl font-black text-[#1E293B]">
                Product Architecture.
              </h3>
              <p className="font-sans text-sm text-slate-600 font-medium leading-relaxed">
                Applying Avantika’s design-first ethos to hardware form factors, user ergonomics, and commercial brand identities.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t-2 border-slate-100 font-heading text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              USER TESTING & FIELD LOOPS
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="relative group bg-white border-2 border-[#1E293B] rounded-3xl p-7 shadow-[6px_6px_0px_#FBBF24] flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:rotate-[-0.5deg]">
            <div className="absolute -top-5 left-6 w-10 h-10 rounded-full border-2 border-[#1E293B] bg-[#8B5CF6] flex items-center justify-center text-white shadow-[2px_2px_0px_#1E293B]">
              <Trophy className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div className="space-y-3 pt-3">
              <span className="font-heading text-xs font-black text-[#D97706] tracking-wider uppercase">
                CONCLAVES
              </span>
              <h3 className="font-heading text-2xl font-black text-[#1E293B]">
                Innovision Expo.
              </h3>
              <p className="font-sans text-sm text-slate-600 font-medium leading-relaxed">
                Hosting Central India’s premier university innovation conclave, connecting student builders to angel syndicates.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t-2 border-slate-100 font-heading text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              NATIONAL LEVEL IDEA EXPO
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
