import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14122B",
        muted: "#6B6890",
        line: "#E7E4FA",
        bg: "#F5F5FF",
        card: "#FFFFFF",
        primary: {
          DEFAULT: "#4B3AF0",
          dark: "#2F1FB8",
          light: "#EEEBFF",
        },
        coral: "#FF6B4A",
        mint: "#16C79A",
        amber: "#FFB238",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      boxShadow: {
        soft: "0 12px 30px -12px rgba(20,18,43,0.18)",
        card: "0 4px 18px -6px rgba(20,18,43,0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
