/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        navy:   '#1B2B4B',
        teal:   '#2E7D7D',
        gold:   '#C8952A',
        slate:  '#4A5568',
        mid:    '#6B7280',
        sand:   '#F8F4EF',
        surface:'#EFF6F6',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        narrow:   '680px',
        standard: '880px',
        wide:     '1160px',
        site:     '1280px',
      },
      letterSpacing: {
        widest2: '0.1em',
      },
    },
  },
  plugins: [],
};
