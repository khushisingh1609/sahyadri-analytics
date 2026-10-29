import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hospital: {
          primary: "#30256F",    // Deep Purple
          secondary: "#66549A",  // Secondary Purple
          accent: "#C51F63",     // Magenta (Use sparingly)
          blue: "#1769AA",       // Healthcare Blue
          lavender: "#F4F0F8",   // Light Lavender
          bg: "#FAF9FC",         // Very Light Background
          text: "#25233A",       // Main Text
          muted: "#6F6B7D",      // Muted Text
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;