/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Roboto Slab", ...defaultTheme.fontFamily.serif],
        sans: ["Raleway", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        hero: "linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('../public/imgs/pages/hero.jpg')",
        postcards:
          "linear-gradient(rgba(1,1,1,.2), rgba(1,1,1,.2)), url('../public/imgs/postcards-bg/postcards-bg-poster.jpg')",
      },
      colors: {
        "layout-crail": "#BC4545",
        "layout-skintone": "#F2C4CD",
        "layout-dark-green": "#184017",
        "layout-blue-gray": "#315C72",
        "layout-red-clay": "#6D3131",
      },
      fontSize: {
        xxs: ["0.5rem", "0,75rem"],
      },
      gridTemplateColumns: {
        hero: "2fr 1fr",
        order: "3fr 2fr 1fr",
      },
      gridTemplateRows: {
        order: "4fr",
      },
      rotate: {
        7: "7deg",
        15: "15deg",
      },
    },
  },
  plugins: [],
};
