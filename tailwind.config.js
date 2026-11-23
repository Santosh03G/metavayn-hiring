/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: 'var(--color-midnight)',
        navy: 'var(--color-navy)',
        royal: 'var(--color-royal)',
        electric: 'var(--color-electric)',
        cyan: 'var(--color-cyan)',
        ice: 'var(--color-ice)',
        white: 'var(--color-white)',
        ink: 'var(--color-ink)',
        slate: 'var(--color-slate)',
        amber: 'var(--color-amber)',
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
