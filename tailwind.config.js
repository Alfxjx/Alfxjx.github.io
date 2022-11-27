/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				flamenco: {
					50: "#fff9f2",
					100: "#fff2e6",
					200: "#ffdfc0",
					300: "#ffcb9b",
					400: "#ffa54f",
					500: "#ff7e04",
					600: "#e67104",
					700: "#bf5f03",
					800: "#994c02",
					900: "#7d3e02",
				},
				primary: {
					50: "#fff9f2",
					100: "#fff2e6",
					200: "#ffdfc0",
					300: "#ffcb9b",
					400: "#ffa54f",
					500: "#ff7e04",
					600: "#e67104",
					700: "#bf5f03",
					800: "#994c02",
					900: "#7d3e02",
				},
			},
		},
	},
	plugins: [],
};
