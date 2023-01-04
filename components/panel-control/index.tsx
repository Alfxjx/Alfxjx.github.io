import { I18nBtn } from "./i18n-btn";
import { ThemeToggle } from "./theme-toggle";
import { BsTwitter } from "react-icons/bs";

export function PanelControl() {
	return (
		<div>
			<div className="mx-2 py-2">
				<button className="btn rounded-full w-full bg-[#1d9bf0] border-[#1d9bf0] text-white hover:text-[#1d9bf0]">
					<BsTwitter className="w-6 h-6"></BsTwitter>
				</button>
			</div>
			<div className="flex justify-around">
				<div>
					<I18nBtn></I18nBtn>
				</div>
				<div>
					<ThemeToggle></ThemeToggle>
				</div>
			</div>
		</div>
	);
}
