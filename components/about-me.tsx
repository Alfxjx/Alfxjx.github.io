import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Text } from "./shared/Text";
import { BsTwitter, BsGithub } from "react-icons/bs";

export function AboutMe() {
	const { t } = useTranslation("common");

	return (
		<div className="w-full h-full flex flex-col justify-start">
			<div className="my-4">
				<Image src="/favicon.ico" alt="logo" width={48} height={48} />
			</div>
			<div>
				<Text>{t("about-me-intro")}</Text>
				<Text>{t("about-me-stack")}</Text>
				<Text>{t("about-me-base")}</Text>
				<Text>{t("about-me-social")}</Text>
			</div>
			<div className="w-48 h-[1px] my-4 bg-gray-300"></div>
			<div className="flex items-center">
				<div className="mt-4">
					<button className="btn btn-primary rounded-full">Subscribe Newsletter</button>
					<button className="btn btn-secondary rounded-full ml-2">{"Let's Talk"}</button>
				</div>
				<div className="mt-4">
					<button className="btn ml-2 w-28 rounded-full bg-[#1d9bf0] border-[#1d9bf0] text-white hover:text-[#1d9bf0] hover:bg-gray-200 hover:border-gray-200 dark:hover:bg-black dark:hover:border-black">
						<BsTwitter className="w-6 h-6"></BsTwitter>
					</button>
					<button className="btn ml-2 w-28 rounded-full bg-[#24292f] border-[#24292f] text-white hover:text-[#24292f] dark:hover:text-white hover:bg-gray-200 hover:border-gray-200 dark:hover:bg-black dark:hover:border-black">
						<BsGithub className="w-6 h-6"></BsGithub>
					</button>
				</div>
			</div>
		</div>
	);
}
