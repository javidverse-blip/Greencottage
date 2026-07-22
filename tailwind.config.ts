import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blackRich: '#090909',
        blackSoft: '#151515',
        ivory: '#F8F5EE',
        cream: '#EEE7D8',
        gold: '#C99A2E',
        goldLight: '#E5C66A',
        goldDark: '#99701D',
        textMain: '#171717',
        textMuted: '#626262',
        borderLight: '#DED7C9',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        gold: '0 24px 70px rgba(153, 112, 29, 0.16)',
      },
      backgroundImage: {
        'gold-line': 'linear-gradient(90deg, transparent, #C99A2E, transparent)',
        'metal-gold': 'linear-gradient(135deg, #99701D 0%, #E5C66A 45%, #C99A2E 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
