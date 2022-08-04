import { createContext } from "react";
import { ThemeProvider } from "styled-components";
import { I18nextProvider, useSSR } from "react-i18next";
import { i18n, localResource } from "@/i18n/index";

import { darkTheme, lightTheme } from "../components/theme/theme";
import { useDarkMode } from "../components/theme/Toggle";
import { StyledContainer } from "../components/Toast/index";
import "atropos/css";
import "../styles/base.css";

export const MyContext = createContext(null);

function MyApp({ Component, pageProps }) {
	useSSR(localResource, i18n.language);
	const [theme, themeToggler, getNowTheme] = useDarkMode();
	const themeMode = theme === "light" ? lightTheme : darkTheme;
	return (
		<I18nextProvider i18n={i18n}>
			<ThemeProvider theme={themeMode}>
				<MyContext.Provider value={{ themeToggler, getNowTheme }}>
					{/* <FontStyles /> */}
					<Component {...pageProps} />
					<StyledContainer />
				</MyContext.Provider>
			</ThemeProvider>
		</I18nextProvider>
	);
}

export default MyApp;
