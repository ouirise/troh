/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors of Battle - Unified Light Theme
        'troh-primary': '#FF6347',    // Coral - Strength & Hope
        'troh-secondary': '#90EE90',  // Light Green - Growth & Healing
        'troh-accent': '#F08080',     // Light Coral - Warmth & Energy
        'troh-dark': '#333333',       // Dark Gray - Text & Contrast
        'troh-light': '#FFFFFF',      // White - Clean Background
        'troh-cream': '#FFF8F5',      // Soft Cream - Alternate Background
        // Keep gold for CTA consistency
        'troh-gold': '#FF6347',       // Now same as primary (coral)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
