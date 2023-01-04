import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { HiLanguage } from "react-icons/hi2";

export function I18nBtn() {
	const { locale, defaultLocale } = useRouter();
	const nextLocale = useMemo(() => (locale === "zh" ? "en" : "zh"), [locale]);
	return (
		<Link href={"/"} locale={nextLocale}>
			<button className="btn btn-primary flex justify-center items-center">
				<HiLanguage className="w-6 h-6"></HiLanguage>
				<span className="ml-2">({locale ?? defaultLocale})</span>
			</button>
		</Link>
	);
}
