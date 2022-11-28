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
        lightBlack3: "#464646",
        lightgray: "rgb(151, 160, 175)",
        blue: "#1D9BF0",
        lightGray2: "#FFFFFF66",
        borderColor: "rgb(235, 235, 235)",
        brightBlack: "rgb(29, 21, 18);",
        sideBarColor: "#FFFFFFCC",
        sidebarItemsHover: "rgb( 55, 48, 45, 1)",
        sidebarBorder: "#495057",
        brightWhite: "#ffffff",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
