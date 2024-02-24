import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Roboto Slab", ...defaultTheme.fontFamily.serif],
        sans: ["Raleway", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        hero: "linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('../../public/images/pages/hero.jpg')",
        postcards:
          "linear-gradient(rgba(1,1,1,.2), rgba(1,1,1,.2)), url('../../public/images/postcards-bg/postcards-bg-poster.jpg')",
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
export default config;
