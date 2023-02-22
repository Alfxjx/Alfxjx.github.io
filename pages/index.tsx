import React from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AboutMe } from "../components/about-me";
import { PanelControl } from "../components/panel-control";
import { Neuron } from "../components/shared/Neuron";
import { NeuronNext } from "../components/shared/NeuronNext";
import { Coder } from "../components/shared/lotties/Coder";

type Props = {
	// Add custom props here
};

export default function Me(_props: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className="w-full h-screen bg-[#333] dark:bg-[#191919] text-black dark:text-gray-400">
			<div className="p-2 xl:max-w-[1600px] lg:w-[80%] md:w-[90%] sm-w-[95%] min-h-[700px] max-h-[1200px] h-screen mx-auto flex max-lg:flex-col justify-start">
				<div className="flex flex-col h-full w-[60%] max-lg:w-full max-lg:flex-1">
					<div className="w-full h-[60%] max-lg:h-full rounded-3xl bg-white dark:bg-gray-700 p-8 flex justify-between">
						<div className="flex-0">
							<AboutMe />
						</div>
						<div className="flex-1 max-w-[300px] flex justify-center items-end max-xl:hidden">
							<Coder />
						</div>
					</div>
					<div className="flex justify-start items-center w-full h-[40%] max-lg:h-full mt-2">
						<div className="w-3/6 h-full rounded-3xl bg-white dark:bg-gray-700 p-8"></div>
						<div className="w-3/6 h-full rounded-3xl bg-[#ff8] p-8 ml-2">2</div>
					</div>
				</div>

				<div className="flex flex-col w-[40%] max-lg:w-full max-lg:flex-1 lg:ml-2 max-lg:mt-2">
					<div className="w-full h-[40%] rounded-3xl bg-[#cfffce] p-8"></div>
					<div className="w-full h-[60%] rounded-3xl bg-white dark:bg-gray-700 p-8 mt-2"></div>
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
