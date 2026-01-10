import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // opt-in only; nothing auto-switches
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {}, // no themed colors mapped
  },
  plugins: [],
};
export default config;
