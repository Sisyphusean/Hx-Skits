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
        silver: "#D6D8DA"
      }
    }
  },
  plugins: [],
}

