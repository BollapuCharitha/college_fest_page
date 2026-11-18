/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#05050a',
          900: '#0a0a14',
          800: '#11111f',
          700: '#1a1a2e',
          600: '#26263f',
        },
        pulse: {
          50: '#ecfff8',
          100: '#cffae8',
          200: '#9ff5d2',
          300: '#5eecb6',
          400: '#22d996',
          500: '#06c47e',
          600: '#03a066',
          700: '#047e53',
          800: '#0a6445',
          900: '#0b523a',
        },
        volt: {
          50: '#f0f6ff',
          100: '#dff0ff',
          200: '#b9e3ff',
          300: '#84d0ff',
          400: '#48b4ff',
          500: '#1f97ff',
          600: '#0a78f0',
          700: '#0a60c4',
          800: '#0f4f9e',
          900: '#13437e',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-rev': 'marquee-rev 40s linear infinite',
        'marquee-fast': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'rise': 'rise 0.7s cubic-bezier(0.22,1,0.36,1) both',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
