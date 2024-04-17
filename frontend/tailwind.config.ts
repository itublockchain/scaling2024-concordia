import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      ft: "900px",
      ss: "384px",
      hh: "486px",
      lt: "569px",
    },
    extend: {},
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      title: ["Lilita One", "cursive"],
      // logo: ['Rampart One', "cursive"]
      logo: ["Germania One", "cursive"],
    },
  },
};
export default config;
