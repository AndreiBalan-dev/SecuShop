import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        danger: "var(--danger)",
        safe: "var(--safe)",
        muted: "#f3f4f6",
        card: "#ffffff0a",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--transition)",
      },
      boxShadow: {
        glow: "0 0 10px rgba(37, 99, 235, 0.3)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

export default config;
