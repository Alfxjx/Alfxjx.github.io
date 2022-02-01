import "../styles/base.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../components/theme/theme";
import { useDarkMode } from "../components/theme/Toggle";
import { StyledContainer } from "../components/Toast/index";
import { createContext } from "react";

export const MyContext = createContext(null);

function MyApp({ Component, pageProps }) {
	const [theme, themeToggler, getNowTheme] = useDarkMode();
	const themeMode = theme === "light" ? lightTheme : darkTheme;
	return (
		<ThemeProvider theme={themeMode}>
			<MyContext.Provider value={{ themeToggler, getNowTheme }}>
				{/* <FontStyles /> */}
				<Component {...pageProps} />
				<StyledContainer />
			</MyContext.Provider>
		</ThemeProvider>
	);
}

export default MyApp;
