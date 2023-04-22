/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'translate-y-down-to-up': 'translateYDownToUp 0.15s ease-in-out',
        'translate-y-up-to-down': 'translateYUpToDown 0.15s ease-in-out',
      },
      fontFamily: {
        'sans': ["Schibsted Grotesk"]
      },
      fontSize: {
        'base': '14px'
      },
      colors: {
        charlestoneGreen: "#282828",
        white: "#ffffff",
        silver: "#D6D8DA",
        deepBlue: {
          500: "#2980B9",
          400: "#3498DB",
          300: "#5DADE2",
          200: "#85C1E9",
          100: "#AED6F1",
        },
        belizeHole: {
          500: "#1F5F88",
          400: "#2471A3",
          300: "#2E86C1",
          200: "#5499C7",
          100: "#7FB3D5",
        },
        pomegranate: {
          500: "#C0392B",
          400: "#E74C3C",
          300: "#EC7063",
          200: "#F1948A",
          100: "#F5B7B1",
        }
      }
    }
  },
  plugins: [],
}

