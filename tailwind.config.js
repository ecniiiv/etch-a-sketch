/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,css}", "./dist/**/*.{html,css}"],
  theme: {
    extend: {
      height: {
        500: "500px",
        600: "600px",
        550: "550px",
      },
      width: {
        1024: "1024px",
        500: "500px",
        550: "550px",
      },
      borderWidth: {
        "1px": "1px",
      },
    },
  },
  plugins: [],
};
