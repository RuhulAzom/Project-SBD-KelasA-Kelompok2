/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "body": "#fbfbfd",
        "body": "#f1f5f9",
        "main": "#5d60ef",
        "main-hover": "#5d5fefcb",
        "main-purple": "#d5d6ff",
        "main-purple-hover": "#c7c8ff",
        "main-orange": "#F9791F",
        "main-yellow": "#FEF9E4",
        "main-yellow-hover": "#faecb8",
        "main-red": "#DA2850",
        "main-red-hover": "#d34053b9",
        "main-pink": "#FEE4E9",
        "main-pink-hover": "#ffcbd5",
        "main-gray-border": "#dadde7",
        "main-gray-border2": "#E8EBF4",
        "main-gray-text": "#5a5d66",
        "main-gray-text2": "#6E717B",
        "main-heading-text": "#464646",
      },
      boxShadow: {
        "default-black": "0 0 40px #00000030",
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        default2: "0 0 10px #6f6a6a45",
        "table-black": "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
        "print": "0 0 10px #00000030",
        // "table-black": "0 0 10px #00000012"
      },
      fontSize: {
        "sm": ".825rem"
      }
    },
  },
  plugins: [],
}

