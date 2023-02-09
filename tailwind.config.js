const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			xs: "420px",
			...defaultTheme.screens,
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#60d6b0",
					secondary: "#ffc58e",
					accent: "#5bd0d8",
					neutral: "#221523",
					"base-100": "#342A3C",
					info: "#72A5E3",
					success: "#5CDB8F",
					warning: "#997905",
					error: "#EA2E5A",
				},
			},
		],
	},
	plugins: [require("daisyui")],
};
