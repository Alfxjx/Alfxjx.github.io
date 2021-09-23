import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "../Button/index";

export const useDarkMode: () => [string, () => void, () => String] = () => {
	const [theme, setTheme] = useState("light");

	const setMode = (mode) => {
		window.localStorage.setItem("theme", mode);
		setTheme(mode);
	};

	const themeToggler = () => {
		theme === "light" ? setMode("dark") : setMode("light");
	};

	const getNowTheme = () => {
		return theme;
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem("theme");
		if (window.matchMedia("(prefers-color-scheme)").media === "not all") {
			localTheme ? setMode(localTheme) : setMode("light");
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setMode("dark");
		} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
			setMode("light");
		} else {
			setMode("light");
		}
	}, []);

	return [theme, themeToggler, getNowTheme];
};

export const Toggle = ({ children, toggleTheme }) => {
	return (
		<Button btnType='primary' onClick={toggleTheme}>
			{children}
		</Button>
	);
};
