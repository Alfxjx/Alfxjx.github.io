const generalTheme = {
	borderRadius: "0.5rem",
	boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
};

export const lightTheme = {
	theme: "light",
	text: "#3a3a3a",
	textGray: "#777",
	textReverse: "#f1f2f3",
	textHover: "#025cf7",
	headerBackground: "#f1f1fe",
	background: "#feffff",
	backgroundLight: "#feffff",
	themeColor: "#2e317c",
	inlineCodeBackground: "#f1f1fe",
	...generalTheme,
};
export const darkTheme = {
	theme: "dark",
	text: "#dee4e9",
	textGray: "#ddd",
	textReverse: "#000",
	textHover: "#bec936",
	headerBackground: "#363537",
	background: "#363537",
	backgroundLight: "#666",
	themeColor: "#f4ea2a",
	inlineCodeBackground: "#313131",
	...generalTheme,
};
