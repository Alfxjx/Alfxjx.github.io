import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

export function ThemeToggle() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const { systemTheme, theme, setTheme } = useTheme();
	const renderThemeChanger = () => {
		if (!mounted) return null;

		const currentTheme = theme === "system" ? systemTheme : theme;

		if (currentTheme === "dark") {
			return (
				<button className="btn btn-primary" role="button" onClick={() => setTheme("light")}>
					<BsSunFill className="w-6 h-6 text-yellow-500" />
				</button>
			);
		} else {
			return (
				<button className="btn btn-primary" onClick={() => setTheme("dark")}>
					<BsMoonFill className="w-6 h-6 text-gray-900 " />
				</button>
			);
		}
	};

	return renderThemeChanger();
}
