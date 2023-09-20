/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Arvo", ...defaultTheme.fontFamily.serif],
        sans: ["Raleway", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        hero: "url('./data/img/bg/hero.jpg')",
        "postcards-pattern":
          "linear-gradient(to top, rgba(188, 69, 69, 0.9), rgba(242, 196, 205, 0.9)), url('./data/img/bg/bg-red.jpg')",
      },
      colors: {
        "layout-crail": "#BC4545",
        "layout-skintone": "#F2C4CD",
        "layout-dark-green": "#184017",
        "layout-blue-gray": "#315C72",
      },
      fontSize: {
        xxs: ["0.5rem", "0,75rem"],
      },
    },
  },
  plugins: [],
};
