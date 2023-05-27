/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "1px",
        xs: "360px",
        ss: "375px",
        s: "380px"
      },
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
        clouds: "#D9DFE2",
        videoBG: "#e0dfe1",
        twitch: {
          500: "#6441a5",
          400: "#7E5BB8",
          300: "#A285D0",
          200: "#C5A5D9",
          100: "#E5D1E8",
        },
        discord: {
          500: "#525de9",
          400: "#7289DA",
          300: "#9AA7E1",
          200: "#BDC3E6",
          100: "#D9DFF1",
        },
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
        },
        nephritis: {
          500: '#1B8B4B',
          400: '#27AE60',
          300: '#58D68D',
          200: '#82E0AA',
          100: '#ABEBC6',
        }
      }
    }
  },
  plugins: [],
}

