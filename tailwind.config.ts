import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'french-gray': '#A8D1A8', // Light Green
        'cool-gray': '#70B370',   // Medium Green
        'light-gray': '#CCD1CC',  // Very Light Green
        'med-gray': '#97AB97',    // Muted Green
      }
    },
  },
  plugins: [],
};
export default config;
