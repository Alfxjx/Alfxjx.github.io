import "../styles/base.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../components/theme/theme";
import { useDarkMode, Toggle } from "../components/theme/Toggle";
const FontStyles = createGlobalStyle`
@font-face {
	font-family: "GreenHome";
	src: url("/fonts/GreenHome.ttf");
	font-style: normal;
	font-weight: 400;
}
.my-main-font{
	font-family: "GreenHome";
}

`;

function MyApp({ Component, pageProps }) {
	const [theme, themeToggler] = useDarkMode();
	const themeMode = theme === "light" ? lightTheme : darkTheme;
	const handleToggle = () => {
		themeToggler();
	};
	return (
		<ThemeProvider theme={themeMode}>
			<FontStyles />
			<div style={{
				position: "fixed",
				right: 0,
				top: 0,
				zIndex: 100
			}}>
				<Toggle toggleTheme={handleToggle}>
					{theme === "light" ? "dark" : "light"}
				</Toggle>
			</div>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
