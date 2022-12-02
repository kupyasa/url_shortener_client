/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  fontFamily: {
    Roboto: ["Roboto, sans-serif"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
