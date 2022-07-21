const plugin = require('tailwindcss/plugin')

const capitalizeFirst = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.capitalize-first:first-letter': {
      textTransform: 'uppercase',
    },
  }
  addUtilities(newUtilities, ['responsive', 'hover'])
})

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem'
      },
      colors: {
        'primary': '#0288d1',
        'secondary': '#b3e5fc',
        'neutral': '#6B7280',
        'dark-primary': '#0078b8',
        'light-blue': '#29b6f6',
        'custom-blue-card': '#0288d1',
        gray: {
          350: '#B7BCC5'
        },
      },
      height: {
        '8.5': '2.125rem'
      },
      maxWidth: {
        '28': '7rem',
        '40': '10rem',
        '60': '15rem',
      },
      inset: {
        '6.5': '1.625rem',
      },
      gridTemplateColumns: {
        'products': '0.85fr 3fr 0.75fr 0.8fr 1.15fr',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      animation: ['hover', 'focus'],
      ringWidth: ['hover', 'active'],
      display: ['group-hover'],
      ringColor: ['hover', 'active'],
      padding: ['hover', 'focus'],
    },
  },
  plugins: [capitalizeFirst],
}
