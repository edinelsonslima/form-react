/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#0d47a1',
        link: '#0d47a1',
        font: '#37474f',

        success: '#4caf50',
        error: '#f44336',
        inactive: '#f5f5f5',
        gray: '#b0bec5',

        'background-light': '#eceff1',
        'footer-background': '#ffffff',
      },
      borderWidth: {
        1: 1,
      },
      spacing: {
        1: '.25rem',
        2: '.5rem',
        3: '.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
      },
    },
  },
  plugins: [],
};
