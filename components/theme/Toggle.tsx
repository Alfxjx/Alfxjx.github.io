import React, { useEffect, useState } from "react";
import { Button } from "../Button/index";

type themeType = "light" | "dark";

export const useDarkMode: () => [string, () => void, () => String] = () => {
	const [theme, setTheme] = useState("light");

	const setMode = (mode: themeType) => {
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
		const localTheme = window.localStorage.getItem("theme") as themeType;
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

export const Toggle = ({
	children,
	toggleTheme,
}: {
	children: React.ReactNode;
	toggleTheme: () => void;
}) => {
	return (
		<Button btnType='primary' round='round' onClick={toggleTheme}>
			{children}
		</Button>
	);
};
