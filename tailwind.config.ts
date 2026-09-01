import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapped to CSS variables defined in globals.css so the whole
        // system stays token-driven and easy to retheme.
        paper: "var(--gc-paper)",
        "paper-2": "var(--gc-paper-2)",
        ink: "var(--gc-ink)",
        "ink-2": "var(--gc-ink-2)",
        green: "var(--gc-green)",
        "green-2": "var(--gc-green-2)",
        chilli: "var(--gc-chilli)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        meta: "var(--font-meta)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        display: "-0.02em",
      },
      maxWidth: {
        grid: "1600px",
      },
      transitionTimingFunction: {
        cultural: "cubic-bezier(0.7, 0, 0.2, 1)",
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
