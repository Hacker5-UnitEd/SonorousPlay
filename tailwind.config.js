/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bgAnime: 'bgAnime 4s linear infinite',
      },
      keyframes: {
        bgAnime: {
          '0%': 'bg-gradient-to-r from-cyan-500 to-blue-700',
		  '100%': 'bg-gradient-to-r from-cyan-500 to-blue-700',
          '50%': 'bg-gradient-to-r from-blue-700 to-cyan-500'
        },
      },
    },
  },
  plugins: [],
}