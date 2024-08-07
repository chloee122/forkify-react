/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f38e82",
        background1: "#fbdb89",
        background2: "#f48982",
        secondary: "#f9f5f3",
        greylight1: "#d3c7c3",
        greylight2: "#f2efee",
        greylight3: "#d3c7c3",
        greydark1: "#615551",
        greydark2: "#918581",
      },
      gridTemplateColumns: {
        header: "0.4fr 2fr 0.4fr 0.4fr 0.1fr",
        main: "1fr 2fr",
      },
      gridTemplateRows: {
        container: "100px minmax(500px, auto)",
      },
      fontFamily: {
        logo: ["Dancing Script", "ui-sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
      },
      flex: {
        ingredient: "0 0 auto",
      },
    },
  },
  plugins: [],
};
