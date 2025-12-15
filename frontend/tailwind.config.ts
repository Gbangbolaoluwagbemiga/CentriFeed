import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0F68FF",
          dark: "#0B4CC0",
        },
      },
      backgroundImage: {
        hero: "radial-gradient(1200px 600px at 20% 0%, rgba(15,104,255,0.15), transparent), radial-gradient(1000px 500px at 80% 20%, rgba(236,72,153,0.12), transparent)",
      },
      dropShadow: {
        glow: "0 0 20px rgba(15,104,255,0.35)",
        pink: "0 0 22px rgba(236,72,153,0.35)",
      },
    },
  },
  darkMode: "class",
}

export default config
