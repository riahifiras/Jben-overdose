/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      customFont: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        color1: '#EDE0D4',
        color2: '#E6CCB2',
        color3: '#DDB892',
        color4: '#B08968',
        color5: '#7F5539',
        color6: '#9C6644',
      },
      backgroundColor: {
        'black-50': 'rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}