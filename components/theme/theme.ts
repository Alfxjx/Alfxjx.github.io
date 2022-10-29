const generalTheme = {
	borderRadius: "0.5rem",
	boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
};

export const lightTheme = {
	theme: "light",
	text: "#3a3a3a",
	textGray: "#777",
	textReverse: "#f1f2f3",
	textHover: "#99c7e6",
	headerBackground: "#f0fbfb",
	background: "#feffff",
	bgHover: "#ffffff",
	backgroundLight: "#fefeff",
	backgroundGlass: "rgba(255, 255, 255, 0.12)",
	themeColor: "#0072c1",
	themeColorReverse: "#a59039",
	inlineCodeBackground: "#f1f1fe",
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
	themeColorReverse: "#0072c1",
	inlineCodeBackground: "#313131",
	...generalTheme,
};
