import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f3efe2",
        "paper-2": "#ebe5d3",
        "paper-3": "#e3dcc6",
        ink: "#16201a",
        "ink-soft": "#4a544a",
        forest: "#15402c",
        "forest-2": "#1d5739",
        money: "#3a7d57",
        "money-l": "#5fa37b",
        gold: "#a9803a",
        "gold-l": "#c79a52",
        line: "rgba(22,32,26,0.18)",
        "line-2": "rgba(22,32,26,0.40)",
      },
      fontFamily: {
        spectral: ["var(--font-spectral)", "Georgia", "serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(40px,6.4vw,86px)", { lineHeight: "1.02", letterSpacing: "-0.022em" }],
        "hero-sm": ["clamp(32px,4.4vw,54px)", { lineHeight: "1.04", letterSpacing: "-0.018em" }],
        "section": ["30px", { lineHeight: "1.1", letterSpacing: "-0.012em" }],
        "article-body": ["19px", { lineHeight: "1.7" }],
        "lede": ["23px", { lineHeight: "1.5" }],
        "standfirst": ["23px", { lineHeight: "1.45" }],
        "label": ["11px", { lineHeight: "1", letterSpacing: "0.18em" }],
        "label-sm": ["10px", { lineHeight: "1", letterSpacing: "0.14em" }],
        "label-xs": ["9px", { lineHeight: "1", letterSpacing: "0.08em" }],
      },
      maxWidth: {
        wrap: "1180px",
        "read-col": "720px",
      },
      spacing: {
        "wrap-px": "46px",
        "wrap-px-mobile": "22px",
      },
      borderRadius: {
        card: "6px",
        btn: "2px",
        pill: "30px",
        fig: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
