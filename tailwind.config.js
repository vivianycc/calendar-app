const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];
module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    //Because we made a dynamic class with the label we need to add those clases
    // to the safe list so the purge does not remove that
    safelist: [
      ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
      ...labelsClasses.map((lbl) => `text-${lbl}-400`),
      ...Array.apply(null, Array(9)).map((num, idx) => `col-start-${idx}`),
      ...Array.apply(null, Array(9)).map((num, idx) => `col-end-${idx}`),
      ...Array.apply(null, Array(9)).map((num, idx) => `row-start-${idx}`),
      ...Array.apply(null, Array(9)).map((num, idx) => `row-end-${idx}`),
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: ["0.65rem", { lineHeight: "1rem" }],
      sm: ["0.8rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
    },
    extend: {
      fontFamily: {
        sans: ["Outfit"],
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
