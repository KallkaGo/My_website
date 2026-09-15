/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#08080a",
        secondary: "#9496a1",
        tertiary: "#121318",
        surface: "#111217",
        "surface-card": "#13141b",
        "surface-elevated": "#1a1b24",
        "black-100": "#0f1016",
        "black-200": "#0a0a0f",
        "white-100": "#f5f5f7",
        accent: {
          purple: "#9d68ff",
          cyan: "#38bdf8",
          emerald: "#34d399",
        }
      },
      boxShadow: {
        card: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        glow: "0 0 30px -5px rgba(157, 104, 255, 0.15)",
        "glass-sm": "0 2px 8px 0 rgba(0, 0, 0, 0.37)",
      },
      screens: {
        xs: "450px",
        pc: "1280px"
      },
      animation: {
        scan: 'scan 2s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        "particle-pattern": "url('/src/assets/particle.png')",
        "home-pattern": 'url("/src/assets/other/home.jpg")'
      },
      backgroundSize: {
        "full": "100% 100%",
      }
    },
  },
  plugins: [],
}
