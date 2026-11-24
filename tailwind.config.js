/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0A1330',
        navy: '#0F1E4A',
        royal: '#1D4ED8',
        electric: '#3B82F6',
        cyan: '#22D3EE',
        ice: '#EAF2FF',
        white: '#FFFFFF',
        ink: '#0F172A',
        slate: '#94A3B8',
        amber: '#F59E0B',
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
};
