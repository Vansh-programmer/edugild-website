import React from 'react';

interface MechanicalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'mint' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const MechanicalButton: React.FC<MechanicalButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-heading font-bold tracking-wide rounded-full border-2 border-[#1E293B] select-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5";

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs gap-2 min-h-[38px]",
    md: "px-6 py-2.5 text-sm gap-2.5 min-h-[48px]",
    lg: "px-8 py-3.5 text-base gap-3 min-h-[56px]",
  }[size];

  const variantStyles = {
    primary: "bg-[#8B5CF6] text-white shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[6px_6px_0px_0px_#1E293B] active:shadow-[2px_2px_0px_0px_#1E293B] hover:bg-[#7C3AED]",
    secondary: "bg-transparent text-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:bg-[#FBBF24] hover:shadow-[6px_6px_0px_0px_#1E293B] active:shadow-[2px_2px_0px_0px_#1E293B]",
    accent: "bg-[#F472B6] text-white shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[6px_6px_0px_0px_#1E293B] active:shadow-[2px_2px_0px_0px_#1E293B] hover:bg-[#EC4899]",
    mint: "bg-[#34D399] text-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[6px_6px_0px_0px_#1E293B] active:shadow-[2px_2px_0px_0px_#1E293B] hover:bg-[#10B981]",
    outline: "bg-white text-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] hover:bg-[#FFFBEA] hover:shadow-[5px_5px_0px_0px_#1E293B] active:shadow-[1px_1px_0px_0px_#1E293B]",
    dark: "bg-[#1E293B] text-white shadow-[4px_4px_0px_0px_#F472B6] hover:shadow-[6px_6px_0px_0px_#F472B6] active:shadow-[2px_2px_0px_0px_#F472B6] hover:bg-[#334155]",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className} group`}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <span className="w-5 h-5 rounded-full bg-white/20 text-current flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12">
          {icon}
        </span>
      )}
    </button>
  );
};
