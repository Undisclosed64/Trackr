/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    screens: {
      vsm: "200px",
      sm: "400px",
      md: "760px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      colors: {
        brightRed: "hsl(12,88%,59%)",
        brightOrange: "#FF6400",
        // veryLightGray: "hsl(0,0%,98%)",
        lightBlack: "#42526E",
        lightBlack2: "rgb(94, 108, 132)",
        lightgray: "rgb(151, 160, 175)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
