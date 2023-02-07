import React from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AboutMe } from "../components/about-me";
import { PanelControl } from "../components/panel-control";
import { Neuron } from "../components/shared/Neuron";

type Props = {
	// Add custom props here
};

export default function Me(_props: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className="w-full h-screen bg-[#333] dark:bg-[#191919] text-black dark:text-gray-400">
			<div className="p-2 lg:w-[90%] md:w-[90%] min-h-[700px] max-h-[1200px] h-screen sm-w-[95%] mx-auto flex justify-start">
				<div className="flex flex-col w-[60%]">
					<div className="w-full h-[60%] rounded-3xl bg-white dark:bg-gray-700 p-8">
						<AboutMe />
					</div>
					<div className="flex justify-start items-center w-full h-[40%] mt-2">
						<div className="w-3/6 h-full rounded-3xl bg-white dark:bg-gray-700 p-8"></div>
						<div className="w-3/6 h-full rounded-3xl bg-[#ff8] p-8 ml-2">2</div>
					</div>
				</div>

				<div className="flex flex-col w-[40%] ml-2">
					<div className="w-full h-[40%] rounded-3xl bg-[#cfffce] p-8"></div>
					<div className="w-full h-[60%] rounded-3xl bg-white dark:bg-gray-700 p-8 mt-2 overflow-hidden">
						<Neuron />
					</div>
				</div>
			</div>
		</div>
	);
}

interface ICardProps {
	children: React.ReactNode;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale ?? "en", ["common"])),
	},
});
