/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hax: { cream: '#fff8f1', berry: '#a34063', mocha: '#5c4033' },
        dream: { bg: '#0f172a', text: '#e2e8f0', card: '#1e293b' }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Fredoka Variable"', '"Fredoka"', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
