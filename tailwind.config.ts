
import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
        code: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        success: 'hsl(var(--success))',
        
        subject: {
          ai: 'hsl(var(--subject-ai))',
          fsd: 'hsl(var(--subject-fsd))',
          cn: 'hsl(var(--subject-cn))',
          tinkering: 'hsl(var(--subject-tinkering))',
          spm: 'hsl(var(--subject-spm))',
          cyber: 'hsl(var(--subject-cyber))',
          cloud: 'hsl(var(--subject-cloud))',
          ml: 'hsl(var(--subject-ml))',
          writing: 'hsl(var(--subject-writing))',
          speaking: 'hsl(var(--subject-speaking))',
          cns: 'hsl(var(--subject-cns))',
          ws: 'hsl(var(--subject-ws))',
          sfs: 'hsl(var(--subject-sfs))',
          mpmc: 'hsl(var(--subject-mpmc))',
          atcd: 'hsl(var(--subject-atcd))',
          ooad: 'hsl(var(--subject-ooad))',
        },
        'code-bg': 'hsl(var(--code-bg))',
      },
      borderRadius: {
        '2xl': 'calc(var(--radius) + 4px)',
        xl: 'var(--radius)',
        lg: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 6px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      boxShadow: {
        // Desktop shadows
        sm: '0 1px 2px 0 hsl(220 25% 10% / 0.05)',
        DEFAULT: '0 1px 3px 0 hsl(220 25% 10% / 0.1), 0 1px 2px -1px hsl(220 25% 10% / 0.1)',
        md: '0 4px 6px -1px hsl(220 25% 10% / 0.1), 0 2px 4px -2px hsl(220 25% 10% / 0.1)',
        lg: '0 10px 15px -3px hsl(220 25% 10% / 0.1), 0 4px 6px -4px hsl(220 25% 10% / 0.1)',
        xl: '0 20px 25px -5px hsl(220 25% 10% / 0.1), 0 8px 10px -6px hsl(220 25% 10% / 0.1)',

        // Mobile Glow Shadows
        'glow-ai': '0 0 20px 0 hsl(var(--subject-ai) / 0.4)',
        'glow-fsd': '0 0 20px 0 hsl(var(--subject-fsd) / 0.4)',
        'glow-cn': '0 0 20px 0 hsl(var(--subject-cn) / 0.4)',
        'glow-tinkering': '0 0 20px 0 hsl(var(--subject-tinkering) / 0.4)',
        'glow-spm': '0 0 20px 0 hsl(var(--subject-spm) / 0.4)',
        'glow-cyber': '0 0 20px 0 hsl(var(--subject-cyber) / 0.4)',
        'glow-cloud': '0 0 20px 0 hsl(var(--subject-cloud) / 0.4)',
        'glow-ml': '0 0 20px 0 hsl(var(--subject-ml) / 0.4)',
        'glow-writing': '0 0 20px 0 hsl(var(--subject-writing) / 0.4)',
        'glow-speaking': '0 0 20px 0 hsl(var(--subject-speaking) / 0.4)',
        'glow-cns': '0 0 20px 0 hsl(var(--subject-cns) / 0.4)',
        'glow-ws': '0 0 20px 0 hsl(var(--subject-ws) / 0.4)',
        'glow-sfs': '0 0 20px 0 hsl(var(--subject-sfs) / 0.4)',
        'glow-mpmc': '0 0 20px 0 hsl(var(--subject-mpmc) / 0.4)',
        'glow-atcd': '0 0 20px 0 hsl(var(--subject-atcd) / 0.4)',
        'glow-ooad': '0 0 20px 0 hsl(var(--subject-ooad) / 0.4)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out forwards',
        'scale-in': 'scale-in 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
