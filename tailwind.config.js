/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#165656',
        'secondary': '#DBF7EC',
        'tertiary': '#F7F7F7',
      }),
      textColor: {
        'primary': '#165656',
        'secondary': '#DBF7EC',
        'tertiary': '#F7F7F7',
      },
      colors: {
        'primary': '#165656',
        'secondary': '#DBF7EC',
        'tertiary': '#EEEEEE',
        'border': '#DFDFDF',
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
      }
    },
  },
  plugins: [],
}
