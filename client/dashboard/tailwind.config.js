module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // Ensure these match with .storybook/preview.js
    screens: {
      xs: '375px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
      colors: {
        'midnight': '#1e293b',
        'basketball': '#ea580c',
        'basketball-dim': '#fb923c',
        'chalkboard': '#fff3f5',
        'gravel': '#b8b8b8'
      },
    },
  },
  plugins: [],
}
