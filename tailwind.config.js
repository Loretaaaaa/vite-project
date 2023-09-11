/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'columnBackgroundColor': '#161C22',
        'mainBackgroundColor': '#0D1117',
      },
    }
    
  },
  plugins: [],
}