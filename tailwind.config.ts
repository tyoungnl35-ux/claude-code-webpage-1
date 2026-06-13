import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#2D2D2D",
          dark: "#1F2937",
          deep: "#171717",
          mid: "#3D3D3D",
          light: "#4A4A4A",
        },
        coral: {
          DEFAULT: "#FF6F61",
          light: "#FA8072",
          dark: "#E85D51",
          glow: "rgba(255,111,97,0.15)",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        body: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "diagonal-coral":
          "linear-gradient(135deg, #2D2D2D 60%, #FF6F61 60%)",
        "coral-glow":
          "radial-gradient(ellipse at center, rgba(255,111,97,0.2) 0%, transparent 70%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-right": "slideRight 0.6s ease forwards",
        "coral-pulse": "coralPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        coralPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,111,97,0.4)" },
          "50%": { boxShadow: "0 0 20px 6px rgba(255,111,97,0.15)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
