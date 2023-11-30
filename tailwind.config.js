/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "700px",
      },
      backgroundImage: {
        site: "url('./assets/site.jpg')",
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  plugins: [],
};
