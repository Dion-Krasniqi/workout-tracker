/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
        100: '#080c11ff',
        200: '#0c0c0cff',
        300: '#0f141eff'
        
      },
      light: {
        100: '#666666'
      },
      blue: {
        100: '#ace2ffff'
      }
      }
    },
  },
  plugins: [],
}

