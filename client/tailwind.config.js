/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    screens: {
      vsm: "200px",
      sm: "400px",
      msm: "560px",
      md: "760px",
      lg: "976px",
      vlg: "1064px",
      xl: "1440px",
    },

    extend: {
      backgroundImage: {
        loginImg:
          "url('https://images.unsplash.com/photo-1669279687951-0da28b1ce769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60')",
      },
      colors: {
        brightRed: "hsl(12,88%,59%)",
        lightGray: "#808080",
        brightOrange: "#FF6400",
        lightWhite: "#edede9",
        veryLightGray: "#cecece",
        black: "#000000",
        // lightBlack: "#42526E",
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
        mainBlue: "#32C8C8",
        brightWhite: "#ffffff",
        lightBlack: "#00000099",
        lightBlue: "#F8F8F8",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
