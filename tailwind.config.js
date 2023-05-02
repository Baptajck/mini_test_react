/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: { 500: "#fff" },
      dark: { 100: "#3c414a", 300: "#232933", 500: "#1a202b" },
      purple: { 500: "#b993de" },
      blue: { 500: "#61aadc" },
      red: { 500: "#ee7b81" },
      indigo: {
        200: "#4d4777",
        400: "#a78bfa",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
      },
      green: {500: "#9bb2a6"}
    },
    extend: {
      boxShadow: {
        'center': '0px 0px 2px 0px rgba(0,0,0,0.8)',
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
