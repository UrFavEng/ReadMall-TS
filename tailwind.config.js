/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-teal": "#115e59", // rgb(17,94,89)
        "custom-green": "#0d9488", // rgb(13,148,136)
      },
      gradientColorStops: {
        "custom-teal": "#115e59", // rgb(17,94,89)
        "custom-green": "#0d9488", // rgb(13,148,136)
      },
    },
  },
  plugins: [],
};
