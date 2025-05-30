/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#34A853', // Xanh lá
        background: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
