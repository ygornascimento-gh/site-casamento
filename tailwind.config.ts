import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      fontFamily: {
        script: ["Great Vibes", "cursive"],
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        wedding: {
          rose: "#F2B5C8",
          "rose-dark": "#E89AB0",
          sage: "#A8B5A0",
          "sage-dark": "#8FA386",
          cream: "#FDF8F5",
          "cream-dark": "#F5EDE8",
          text: "#3D3533",
          "text-muted": "#7A6E6B",
          gold: "#D4A574",
          "gold-dark": "#C08F5E",
        },
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
