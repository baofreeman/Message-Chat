import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: "1rem",
      sm: "1.2rem",
      md: "1.4rem",
      base: "1.6rem",
      lg: "1.8rem",
      xl: "2rem",
      "2xl": "2.4rem",
      "3xl": "2.8rem",
      "4xl": "3.2rem",
      "5xl": "3.8rem",
    },
    colors: {
      DEFAULT: "var(--color-black)",
      light: "var(--color-light)",
      silver: "var(--color-silver)",
      black: "var(--color-black)",
      gray: "var(--color-gray)",
      primary: "var(--color-primary)",
      hover: "var(--color-hover)",
      active: "var(--color-active)",
      transparent: "transparent",
      current: "currentColor",
      white: "var(--color-white)",
      red: "#f95200",
      green: "#ade25d",
      orange: "#ff8700",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
