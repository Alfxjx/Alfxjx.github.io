import { I18nBtn } from "./i18n-btn";
import { ThemeToggle } from "./theme-toggle";

export function PanelControl() {
	return (
		<div className="flex justify-center items-center mx-2">
			<div>
				<ThemeToggle></ThemeToggle>
			</div>
			<div className="ml-2">
				<I18nBtn></I18nBtn>
			</div>
		</div>
	);
}
