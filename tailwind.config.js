import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar"),
    // require("tailwind-scrollbar-hide"), // optional if you want to hide scrollbars
  ],
};
