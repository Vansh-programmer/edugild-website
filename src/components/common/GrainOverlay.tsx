import React from 'react';

/**
 * Playful Geometric subtle dot-grid background overlay.
 * Provides the signature modern paper feel with zero GPU overhead.
 */
export const GrainOverlay: React.FC = () => {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.04] select-none bg-dot-grid"
      aria-hidden="true"
    />
  );
};
