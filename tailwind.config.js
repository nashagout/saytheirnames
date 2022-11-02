/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      placeholderColor: (theme) => theme("colors"),
      backgroundImage: {
        "pattern-1": "url('/bg-08.png')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        black: {
          ...require("daisyui/src/colors/themes")["[data-theme=black]"],
          secondary: "#FFFFFF",
          "neutral-content": "#FFFFFF",
          accent: "#888888",
          neutral: "#000000",
        },
        afficheRouge: {
          ...require("daisyui/src/colors/themes")["[data-theme=cyberpunk]"],
          primary: "#991b1b",
          secondary: "#E8D4B7",
          "neutral-content": "#E8D4B7",
          "base-100": "#991b1b",
          accent: "#E8D4B7",
          neutral: "#000000",
          "base-100": "#991b1b",
        },
      },
    ],
  },
};
