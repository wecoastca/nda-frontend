module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ["16px", "24px"],
      sm: ["20px", "48px"],
      base: ["24px", "32px"],
      lg: ["32px", "48px"],
      xl: ["40px", "60px"],
      "2xl": ["50px", "60px"],
    },
    screens: {
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {},
  },
  plugins: [],
}
