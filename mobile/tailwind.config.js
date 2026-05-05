/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#001A33",
          light: "#003366",
          dark: "#000D1A",
        },
        secondary: {
          DEFAULT: "#00A3A3",
          light: "#00CCCC",
          dark: "#007A7A",
        },
        accent: {
          DEFAULT: "#A3D900",
          light: "#C2F000",
          dark: "#7A8A00",
        },
      },
      fontFamily: {
        sans: ['Inter_400Regular', 'sans-serif'],
        medium: ['Inter_500Medium', 'sans-serif'],
        semibold: ['Inter_600SemiBold', 'sans-serif'],
        bold: ['Inter_700Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
