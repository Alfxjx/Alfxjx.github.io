const generalTheme = {
	borderRadius: "0.5rem",
};

export const lightTheme = {
	theme: "light",
	text: "#3a3a3a",
	textGray: "#777",
	textReverse: "#f1f2f3",
	textHover: "#69ffff",
	headerBackground: "#f0fbfb",
	background: "#feffff",
	bgHover: "#ffffff",
	backgroundLight: "#fefeff",
	backgroundGlass: "rgba(255, 255, 255, 0.12)",
	themeColor: "#0bc2bf",
	themeColorReverse: "#a59039",
	inlineCodeBackground: "#f1f1fe",
	boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
	...generalTheme,
};
export const darkTheme = {
	theme: "dark",
	text: "#b4bcac",
	textGray: "#ddd",
	textReverse: "#151d0d",
	textHover: "#d4bc56",
	headerBackground: "#4a494b",
	background: "#191919",
	bgHover: "#363537",
	backgroundLight: "#101010",
	backgroundGlass: "rgba(255, 255, 255, 0.01)",
	themeColor: "#a59039",
	themeColorReverse: "#0bc2bf",
	inlineCodeBackground: "#313131",
	boxShadow:
		"rgba(255, 255, 255, 0.6) 0px 1px 1px 0px, rgba(255, 255, 255, 0.6) 0px 1px 2px 0px",
	...generalTheme,
};
