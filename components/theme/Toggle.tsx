import React, { useEffect, useState } from "react";
import { Button } from "../Button/index";

export const useDarkMode: () => [string, () => void] = () => {
	const [theme, setTheme] = useState("light");

	const setMode = (mode) => {
		window.localStorage.setItem("theme", mode);
		setTheme(mode);
	};

	const themeToggler = () => {
		theme === "light" ? setMode("dark") : setMode("light");
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem("theme");
		localTheme && setTheme(localTheme);
	}, []);
	return [theme, themeToggler];
};

export const Toggle = ({ children, toggleTheme }) => {
	return (
		<Button btnType='primary' onClick={toggleTheme}>
			{children}
		</Button>
	);
};
