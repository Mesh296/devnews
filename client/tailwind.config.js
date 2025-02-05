const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {

    extend: {
      colors: {
        // Độ sáng Light mode: On surface 1 > Surface ≥ On surface 2.
        // Độ sáng Dark mode: On surface 2 > On surface 1 > Surface.
        // stroke light + surface
        // stroke bold + on-surface-1
        // Element Primary: color for Heading, Title, selected and active elements
        // Element Secondary: color for content's text
        surface: "#FFFBF5",
        // main background color

        "on-surface-1": "#F5EFE6",
        // background color for sections, blocks, cards

        "on-surface-1-hover": "#F1E7D7",

        "stroke-bold": "#D1D1D1",
        // border for section on surface 1

        "on-surface-2": "#F1DEC3",
        // highlight small elements darker than on-surface-1

        "stroke-light": "#C7C7C7",
        // border for surface

        "brand-color": "#151515",
        // color that rarely change

        "element-primary": "#1A1A1A",
  
        "element-secondary": "#686868",

        "dark-element-primary": "#FAFAFA",

        "dark-element-secondary": "#9E9E9E",

      },
      screens: {
        'big-smartphone': '481px',

        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1600px',
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
