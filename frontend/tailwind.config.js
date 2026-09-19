/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        defang: {
          bg: "#090d16",
          card: "rgba(16, 23, 42, 0.7)",
          cardHover: "rgba(30, 41, 59, 0.85)",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(255, 255, 255, 0.18)",
          accent: "#38bdf8",
          deny: "#ef4444",
          denyGlow: "rgba(239, 68, 68, 0.25)",
          allow: "#10b981",
          allowGlow: "rgba(16, 185, 129, 0.25)",
          warn: "#f59e0b",
          warnGlow: "rgba(245, 158, 11, 0.25)",
          cedar: "#6366f1",
          strands: "#0ea5e9"
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'neon-red': '0 0 25px -5px rgba(239, 68, 68, 0.4)',
        'neon-green': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'neon-amber': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'neon-cyan': '0 0 25px -5px rgba(14, 165, 233, 0.4)'
      }
    },
  },
  plugins: [],
}
