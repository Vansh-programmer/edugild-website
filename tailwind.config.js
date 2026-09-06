/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFDF5',
        foreground: '#1E293B',
        canvas: {
          DEFAULT: '#FFFDF5',
          subtle: '#FFFBEA',
          muted: '#F8F6EB',
          elevated: '#FFFFFF',
          border: '#1E293B',
        },
        ink: {
          DEFAULT: '#1E293B',
          subtle: '#334155',
          muted: '#64748B',
          faint: '#94A3B8',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          hover: '#7C3AED',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F472B6',
          hover: '#EC4899',
          foreground: '#FFFFFF',
        },
        tertiary: {
          DEFAULT: '#FBBF24',
          hover: '#F59E0B',
          foreground: '#1E293B',
        },
        quaternary: {
          DEFAULT: '#34D399',
          hover: '#10B981',
          foreground: '#1E293B',
        },
        pop: {
          violet: '#8B5CF6',
          pink: '#F472B6',
          yellow: '#FBBF24',
          mint: '#34D399',
          slate: '#1E293B',
          cream: '#FFFDF5',
        },
        // Maintain backwards compatibility aliases where needed
        brand: {
          orange: '#8B5CF6', // redirects to Vivid Violet
          'orange-hover': '#7C3AED',
          blue: '#34D399', // redirects to Mint
          'blue-hover': '#10B981',
          amber: '#FBBF24',
        }
      },
      fontFamily: {
        heading: ['"Outfit"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Outfit"', 'system-ui', 'sans-serif'], // alias so existing font-serif maps to Outfit
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'pop-xs': '1px 1px 0px 0px #1E293B',
        'pop-sm': '2px 2px 0px 0px #1E293B',
        'pop': '4px 4px 0px 0px #1E293B',
        'pop-hover': '6px 6px 0px 0px #1E293B',
        'pop-lg': '8px 8px 0px 0px #1E293B',
        'pop-pink': '4px 4px 0px 0px #F472B6',
        'pop-yellow': '4px 4px 0px 0px #FBBF24',
        'pop-violet': '4px 4px 0px 0px #8B5CF6',
        'pop-mint': '4px 4px 0px 0px #34D399',
        // Brutal shadows mapped to pop shadows
        'brutal-sm': '2px 2px 0px 0px #1E293B',
        'brutal': '4px 4px 0px 0px #1E293B',
        'brutal-lg': '6px 6px 0px 0px #1E293B',
        'brutal-orange': '4px 4px 0px 0px #8B5CF6',
        'brutal-blue': '4px 4px 0px 0px #34D399',
      },
      borderRadius: {
        'blob': '1.5rem 1.5rem 1.5rem 0.25rem',
        'arch': '9999px 9999px 0 0',
      },
      transitionTimingFunction: {
        'bounce-pop': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
