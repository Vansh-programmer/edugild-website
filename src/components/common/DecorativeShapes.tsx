import React from 'react';

interface ShapeProps {
  className?: string;
  color?: 'violet' | 'pink' | 'yellow' | 'mint' | 'slate';
  size?: number;
}

export const StarShape: React.FC<ShapeProps & { points?: number }> = ({ 
  className = '', 
  color = 'yellow', 
  size = 28 
}) => {
  const colorMap = {
    violet: '#8B5CF6',
    pink: '#F472B6',
    yellow: '#FBBF24',
    mint: '#34D399',
    slate: '#1E293B',
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={colorMap[color]} 
      stroke="#1E293B" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`select-none pointer-events-none transition-transform ${className}`}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export const SquiggleDivider: React.FC<{ className?: string; color?: string }> = ({ 
  className = '', 
  color = '#8B5CF6' 
}) => {
  return (
    <svg 
      viewBox="0 0 120 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`w-28 h-4 inline-block select-none ${className}`}
    >
      <path 
        d="M2 8C10 2 14 14 22 8C30 2 34 14 42 8C50 2 54 14 62 8C70 2 74 14 82 8C90 2 94 14 102 8C110 2 114 14 118 8" 
        stroke={color} 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CrossShape: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#F472B6',
  size = 20
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={`select-none pointer-events-none rotate-12 ${className}`}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

export const CircleDotted: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#34D399',
  size = 40
}) => {
  return (
    <div 
      style={{ width: size, height: size }}
      className={`rounded-full border-2 border-dashed border-[#1E293B] flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      <div 
        style={{ width: size * 0.5, height: size * 0.5, backgroundColor: color }}
        className="rounded-full border-2 border-[#1E293B]"
      />
    </div>
  );
};

