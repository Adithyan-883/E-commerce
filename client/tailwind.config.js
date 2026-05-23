export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kerala: {
          green: '#22c622',
          yellow: '#FACC15',
          darkgold: '#A78B15',
          white: '#FFFFFF',
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '5%, 15%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '10%, 20%': { transform: 'translateX(2px) rotate(1deg)' },
          '25%': { transform: 'translateX(0) rotate(0deg)' },
        }
      },
      animation: {
        shake: 'shake 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
