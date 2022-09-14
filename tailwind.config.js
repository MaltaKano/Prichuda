
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1200px",
          xl: "1200px",
        },
      },      
      colors: {
        'malta': 'rgb(117,218,180)',
      },
    },
  },
  variants: {
    extend: {
		textColor: [
        'responsive',
        'hover',
        'focus',
        'before',
        'after',
        'hover::before',
        'hover::after',
        'focus::before',
        'checked:hover',
        'checked:hover::before',
      ],
	},
  },
  plugins: [require("@tailwindcss/typography")],
};
