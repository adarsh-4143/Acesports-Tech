import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B1F3A", deep: "#060f1e", mid: "#0f2a4a", light: "#1a3a6b" },
        electric: { DEFAULT: "#39FF14", dark: "#2ACC0F", pale: "rgba(57,255,20,0.1)" },
        neon: { green: "#39FF14", gold: "#39FF14", orange: "#00CC44" },
        light: { bg: "#F8FAFC", surface: "#FFFFFF", text: "#0F172A", muted: "#64748B", border: "#E2E8F0" },
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        condensed: ["Barlow Condensed", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease forwards",
        "shimmer": "shimmer 3s linear infinite",
        "marquee": "marquee 25s linear infinite",
        "flicker": "flicker 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 20px rgba(57,255,20,0.4)" },
          "50%": { boxShadow: "0 0 50px rgba(57,255,20,0.8)" },
        },
        "slideUp": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "flicker": {
          "0%,100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.4" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.6" },
          "97%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-electric": "linear-gradient(135deg, #39FF14, #00CC44)",
        "gradient-fire": "linear-gradient(135deg, #39FF14, #00CC44)",
        "gradient-navy": "linear-gradient(135deg, #0B1F3A, #060f1e)",
        "gradient-dark": "linear-gradient(180deg, #060f1e 0%, #0B1F3A 100%)",
        "hero-overlay": "linear-gradient(to right, rgba(6,15,30,0.95) 0%, rgba(6,15,30,0.7) 50%, rgba(6,15,30,0.3) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
