/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
        transparent: 'transparent',
        "primary": {
          default: "#FD2D01",
          dark: "#db2600",
          verydark:"#ab1e00",
          light: "#ff5f00",
          verylight: "#ff8f00",
        },
        "secondary": {
          default: "#FFD7D7",
          light: "#ffe6e6",
          dark: "#ffcccc",
        },
        "tertiary": {
          default: "#4E5166",
          light: "#6c6e84",
          dark: "#3d3f51",
        },
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
      },
    container: {
      padding: "1rem",
      center: true,
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};