import fluid, { extract, screens, fontSize } from "fluid-tailwind";

module.exports = {
  content: { files: ["./src/**/*.{js,ts,jsx,tsx}"], extract },
  plugins: [require("daisyui"), fluid],
  theme: {
    screens, // Tailwind's default screens, in `rem`
    fontSize, // Tailwind's default font sizes, in `rem` (including line heights)
    extend: {
      screens: {
        xs: "20rem",
      },
    },
  },
};
