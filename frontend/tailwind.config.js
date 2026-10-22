/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#D4AF37",
          goldLight: "#F3E5AB",
          goldMuted: "#AA820A",
          black: "#000000",
          surface: "#0A0A0C",
          card: "#111115",
          border: "#222228"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        display: ["Montserrat", "sans-serif"]
      },
      boxShadow: {
        "gold-sm": "0 0 15px -3px rgba(212, 175, 55, 0.25)",
        "gold-md": "0 0 30px -5px rgba(212, 175, 55, 0.35)",
        "gold-lg": "0 0 50px -10px rgba(212, 175, 55, 0.5)"
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%)",
        "dark-radial": "radial-gradient(circle at center, rgba(212, 175, 55, 0.12) 0%, rgba(0, 0, 0, 0) 70%)"
      }
    }
  },
  plugins: []
};
