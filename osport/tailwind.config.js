/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function addNoScrollbarUtilities({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar-sports::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar-sports': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-sport': {
          'scrollbar-color': '#334155 transparent',
        },
        '.scrollbar-sport::-webkit-scrollbar': {
          height: '10px', /* Safari and Chrome */
        },
        '.scrollbar-sport::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '.scrollbar-sport::-webkit-scrollbar-thumb': {
          backgroundColor: '#334155',
          borderRadius: '20px',
        },
      };
      addUtilities(newUtilities);
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
