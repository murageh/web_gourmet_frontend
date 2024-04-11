import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(81,83,10,1) 35%, rgba(255,231,0,1) 100%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, rgba(0,0,0,1) 0%, rgba(81,83,10,1) 35%, rgba(255,231,0,1) 100%)",
      },
      colors: {
        primary: "#FFD700",
        secondary: "#FFA500",
        neutral: {
            100: "#f5f5e6",
            200: "#e5e5d6",
            300: "#d4d4c5",
            400: "#a3a394",
            500: "#737364",
            600: "#525243",
            700: "#404031",
            800: "#333324",
            900: "#3",
            },
        zinc: {
          200: "#E5E5E5",
          800: "#333333",
        },
        sky: {
          200: "#87CEEB",
          900: "#1E90FF",
        },
      }
    },
  },
  plugins: [],
};
export default config;
