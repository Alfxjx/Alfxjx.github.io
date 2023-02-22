const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			xs: "420px",
			...defaultTheme.screens,
		},
	},
	// daisyui: {
	// 	themes: [
	// 		{
	// 			mytheme: {
	// 				primary: "#689732",
	// 				secondary: "#99CD6E",
	// 				accent: "#d8b4fe",
	// 				neutral: "#23222A",
	// 				"base-100": "#303640",
	// 				info: "#e7e5e4",
	// 				success: "#84cc16",
	// 				warning: "#fde047",
	// 				error: "#E21D2A",
	// 			},
	// 		},
	// 	],
	// },
	plugins: [require("daisyui")],
};
