import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Gill Sans", "Arial", "Helvetica", "sans-serif"],
    },
    screens: {
      ...defaultTheme.screens,
      xs: "460px",
    },
  },
  plugins: [],
};

export default config;
