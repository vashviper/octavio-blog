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
        brand: {
          orange: "#fa6423",
          dark: "#000e23",
          purple: "#2c1941",
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-work-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["60px", { fontWeight: "700", lineHeight: "1.2" }],
        h2: ["28px", { fontWeight: "700", lineHeight: "1.3" }],
        body: ["18px", { fontWeight: "400", lineHeight: "27px" }],
      },
      maxWidth: {
        "1440": "1440px",
      },
      borderRadius: {
        card: "15px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 8px 30px rgba(250, 100, 35, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
