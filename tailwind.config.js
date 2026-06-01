/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        borderColor: "#2a2a2a",
        secondaryText: "#aaaaaa",
        cardColor: "#1a1a1a",
        secondaryColor: "#22d3ee",
      },
    },
  },
  plugins: [],
};
