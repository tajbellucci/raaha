/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF6EF',
        sand: '#F1E8D8',
        dune: '#E4D5BB',
        ink: '#1E2B2B',
        'ink-soft': '#44534F',
        maroon: '#8A1538',
        'maroon-deep': '#6E102C',
        oasis: '#2F6D62',
        'oasis-soft': '#DCE9E2',
        gold: '#B98A2F',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Archivo', 'Segoe UI', 'sans-serif'],
        naskh: ['"Noto Naskh Arabic"', 'serif'],
        mlym: ['"Noto Sans Malayalam"', 'sans-serif'],
      },
      maxWidth: {
        page: '72rem',
      },
    },
  },
  plugins: [],
}
