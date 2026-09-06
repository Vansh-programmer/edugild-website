import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  name?: string;
  className?: string;
  grayscaleOnRest?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  name = '',
  className = '',
  grayscaleOnRest = true,
}) => {
  const [hasError, setHasError] = useState(!src);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate 2-letter initials from name
  const getInitials = (str: string) => {
    if (!str) return 'AU';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(name || alt);

  if (hasError) {
    return (
      <div
        className={`w-full h-full bg-zinc-900 text-canvas flex flex-col items-center justify-center p-4 border border-ink ${className}`}
        aria-label={alt}
      >
        <span className="font-serif font-black text-3xl sm:text-4xl text-brand-orange tracking-wider">
          {initials}
        </span>
        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
          AVANTIKA UNIVERSITY
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full bg-zinc-800 overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse flex items-center justify-center">
          <span className="font-mono text-xs text-zinc-500">{initials}</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-200 ${
          grayscaleOnRest
            ? 'grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100'
            : ''
        } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

