import { useContext } from "react";
import { lightTheme, darkTheme } from "@/components/theme/theme";
import { MyContext } from "../pages/_app";

export function useTheme() {
	const { _, getNowTheme } = useContext(MyContext);

	return getNowTheme() === "light" ? lightTheme : darkTheme;
}
