/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
        100: '#101010',
        200: '#0c0c0cff'
        
      },
      light: {
        100: '#666666'
      }
      }
    },
  },
  plugins: [],
}

