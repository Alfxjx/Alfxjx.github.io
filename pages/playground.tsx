import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AboutMe } from "../components/about-me";

type Props = {
	// Add custom props here
};

function PlayGround() {
	return (
		<div className="w-full min-h-screen flex justify-center items-center bg-white dark:bg-gray-800 text-black dark:text-gray-400">
			<div className="border">
				<AboutMe />
			</div>
		</div>
	);
}

export default PlayGround;

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale ?? "en", ["common"])),
	},
});
