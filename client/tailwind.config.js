/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        surface: "#F7F7F7",
        "on-surface-1": "#FFFFFF",
        "stroke-bold": "#D1D1D1",
        "on-surface-2": "#E5E5E5",
        "stroke-light": "#C7C7C7",
        "brand-color": "#151515",
        "brand-color-text": "#eee",
        "brand-color-dark": "#0C0C0C",
      },

    },
  },
  plugins: [],
}
