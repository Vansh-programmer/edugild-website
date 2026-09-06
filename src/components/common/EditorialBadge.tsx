import React from 'react';

interface EditorialBadgeProps {
  initials: string;
  name: string;
  department: string;
  category: string;
  badge?: string;
  className?: string;
}

export const EditorialBadge: React.FC<EditorialBadgeProps> = ({
  initials,
  name,
  department,
  category,
  badge,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full aspect-[4/3] bg-zinc-950 text-canvas border-b-2 border-ink flex flex-col justify-between p-5 select-none overflow-hidden group-hover:bg-brand-orange transition-colors duration-200 ${className}`}
      aria-label={`${name} — ${department}`}
    >
      {/* Background Architectural Grid Lines */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Metadata Row */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-zinc-900 group-hover:bg-ink text-zinc-300 group-hover:text-canvas px-2 py-0.5 border border-zinc-700 transition-colors">
          {category}
        </span>
        {badge && (
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest bg-brand-orange group-hover:bg-white text-white group-hover:text-ink px-2 py-0.5 border border-ink transition-colors">
            {badge}
          </span>
        )}
      </div>

      {/* Centerpiece: Bold Typographic Serif Monogram */}
      <div className="relative z-10 my-auto flex items-baseline justify-between pt-2">
        <span className="font-serif font-black text-5xl sm:text-6xl text-canvas group-hover:text-white tracking-tight transition-colors">
          {initials}
        </span>
        <div className="text-right font-mono text-[10px] text-zinc-400 group-hover:text-white/80 transition-colors uppercase">
          <div>AVANTIKA // E-CELL</div>
          <div>IDENTITY PLATE</div>
        </div>
      </div>

      {/* Bottom Sub-line */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-zinc-800 group-hover:border-white/30 transition-colors">
        <span className="font-mono text-[10px] font-semibold text-zinc-400 group-hover:text-white truncate">
          {department}
        </span>
        <span className="font-mono text-[10px] text-brand-orange group-hover:text-white font-bold ml-2">
          AUTH. VERIFIED
        </span>
      </div>
    </div>
  );
};

