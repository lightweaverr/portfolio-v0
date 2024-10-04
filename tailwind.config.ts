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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'bg-primary': '#121212',
        'bg-secondary': '#1E1E1E',
        'text-primary': '#E0E0E0',
        'text-secondary': '#A0A0A0',
        'accent-primary': '#EF3E36',
        'accent-secondary': '#7B1FA2',
        
        'color-dark-black': '#0F0F0F',
        'color-dark-primary': '#212629',
        'color-dark-secondary': '#3B525B',
        'color-dark-tertiary': '#5B7580',
        'color-light-primary': '#E0FBFC',
        'color-light-secondary': '#C2DFE3',
      },
    },
  },
  plugins: [],
};
export default config;
