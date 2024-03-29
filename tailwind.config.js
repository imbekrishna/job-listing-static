/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5BA4A4",
        background: "#EFFAFA",
        filterTab: "#EEF6F6",
        dGCyan: "#7B8E8E",
        vDGCyan: "#2C3A3A",
      },
      fontFamily: {
        sans: ["League Spartan", "sans-serif"],
      },
      boxShadow: {
        custom: "0px 10px 13px -3px rgb(91,164,164, 0.25);",
        allSides: "0px 0px 13px -3px rgb(91,164,164, 0.25);",
      },
    },
  },
  plugins: [],
};
