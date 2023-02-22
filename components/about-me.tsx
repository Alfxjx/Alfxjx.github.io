import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Text } from "./shared/Text";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { CiMail } from 'react-icons/ci'
import { PanelControl } from "./panel-control/index";

export function AboutMe() {
	const { t } = useTranslation("common");

	return (
		<div className="w-full h-full flex flex-col justify-around pt-2">
			<div className="flex justify-start items-center">
				<Image src="/favicon.ico" alt="logo" width={48} height={48} />
				<PanelControl />
			</div>
			<div className="flex flex-col items-start justify-center">
				<div>
					<Text>{t("about-me-intro")}</Text>
					<Text>{t("about-me-stack")}</Text>
					<Text>{t("about-me-base")}</Text>
					{/* <Text>{t("about-me-social")}</Text> */}
				</div>
				<div className="w-48 my-2 border-b border-gray-400"></div>
				<div className="flex items-center">
					<div className="mt-4 flex flex-col justify-center items-start">
						<section>
							<a href="https://alfxjx.zhubai.love" target={"_blank"} rel="noreferrer">
								<button className="btn max-lg:btn-sm btn-primary rounded-full">{t("about-me-subscribe")}</button>
							</a>
						</section>
						<section className="mt-4 flex justify-start items-center">
							<a href="https:/twitter.com/alfxjx" target={"_blank"} rel="noreferrer">
								<button className="btn max-lg:btn-sm max-sm:ml-0 rounded-full bg-[#1d9bf0] border-[#1d9bf0] text-white hover:text-[#1d9bf0] hover:bg-gray-200 hover:border-gray-200 dark:hover:bg-black dark:hover:border-black">
									<BsTwitter className=""></BsTwitter>
								</button>
							</a>
							<a href="https://github.com/alfxjx" target={"_blank"} rel="noreferrer">
								<button className="btn max-lg:btn-sm ml-2 rounded-full bg-[#24292f] border-[#24292f] text-white hover:text-[#24292f] dark:hover:text-white hover:bg-gray-200 hover:border-gray-200 dark:hover:bg-black dark:hover:border-black">
									<BsGithub className="text-md"></BsGithub>
								</button>
							</a>
							<a href="mailto:xujianxiang@abandon.work" target={"_blank"} rel="noreferrer">
								<button className="btn max-lg:btn-sm btn-outline rounded-full ml-2">
									<CiMail className="text-lg" />
								</button>
							</a>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
