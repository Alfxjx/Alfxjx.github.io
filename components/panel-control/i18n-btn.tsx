import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { HiLanguage } from "react-icons/hi2";

export function I18nBtn() {
	const { locale } = useRouter();
	const nextLocale = useMemo(() => (locale === "zh" ? "en" : "zh"), [locale]);
	return (
		<Link href={"/"} locale={nextLocale}>
			<button className="w-full btn btn-primary flex justify-center items-center">
				<HiLanguage style={{ width: "18px", height: "18px" }}></HiLanguage>
				<span className="ml-2">({locale})</span>
			</button>
		</Link>
	);
}
