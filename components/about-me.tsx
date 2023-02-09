import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Text } from "./shared/Text";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { PanelControl } from "./panel-control/index";

export function AboutMe() {
	const { t } = useTranslation("common");

	return (
		<div className="w-full h-full flex flex-col justify-start">
			<div className="my-4 flex justify-start items-center">
				<Image src="/favicon.ico" alt="logo" width={48} height={48} />
				<PanelControl />
			</div>
			<div>
				<Text>{t("about-me-intro")}</Text>
				<Text>{t("about-me-stack")}</Text>
				<Text>{t("about-me-base")}</Text>
				<Text>{t("about-me-social")}</Text>
			</div>
			<div className="w-48 my-4 border-b border-gray-400"></div>
			<div className="flex items-center">
				<div className="mt-4 flex justify-start items-center max-xs:flex-col max-xs:items-start max-xs:justify-center">
					<section>
						<a href="https://alfxjx.zhubai.love" target={"_blank"} rel="noreferrer">
							<button className="btn max-lg:btn-sm btn-primary rounded-full">{t("about-me-subscribe")}</button>
						</a>
						<a href="mailto:xujianxiang@abandon.work" target={"_blank"} rel="noreferrer">
							<button className="btn max-lg:btn-sm btn-secondary rounded-full ml-2">{t("about-me-talk")}</button>
						</a>
					</section>
					<section className="max-xs:mt-2">
						<a href="https:/twitter.com/alfxjx" target={"_blank"} rel="noreferrer">
							<button className="btn max-lg:btn-sm ml-2 max-xs:ml-0 rounded-full bg-[#1d9bf0] border-[#1d9bf0] text-white hover:text-[#1d9bf0] hover:bg-gray-200 hover:border-gray-200 dark:hover:bg-black dark:hover:border-black">
								<BsTwitter className=""></BsTwitter>
							</button>
						</a>
						<a href="https://github.com/alfxjx" target={"_blank"} rel="noreferrer">
							<button className="btn max-lg:btn-sm ml-2 rounded-full bg-[#24292f] border-[#24292f] text-white hover:text-[#24292f] dark:hover:text-white hover:bg-gray-200 hover:border-gray-200 dark:hover:bg-black dark:hover:border-black">
								<BsGithub className="text-md"></BsGithub>
							</button>
						</a>
					</section>
				</div>
			</div>
		</div>
	);
}
