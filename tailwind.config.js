module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',  // Ensure the paths match your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],

}
