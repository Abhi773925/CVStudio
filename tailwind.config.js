module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all your source files here
    './node_modules/flowbite/**/*.js', // Include Flowbite if you are using it
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111827', // Dark background color for primary elements
        secondary: '#ffffff', // Light background color for secondary elements
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
