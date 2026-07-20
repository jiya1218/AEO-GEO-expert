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
        brand: {
          50: '#f0f4ff',
          100: '#e0e9fe',
          200: '#bae6fd',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
        }
      },
      keyframes: {
        'float-particle': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: '0.3' },
          '50%': { transform: 'translateY(-25px) scale(1.2)', opacity: '0.8' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
      },
      animation: {
        'float-particle': 'float-particle 6s ease-in-out infinite',
        blob: 'blob 10s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
