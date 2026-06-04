/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'purple-350': '#c9a1f5', // custom purple shade
        },
      },
    },
    plugins: [],
  }
  