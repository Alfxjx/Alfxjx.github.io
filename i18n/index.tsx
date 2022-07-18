import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "public/locales/en/common.json";
import zhCommon from "public/locales/zh/common.json";

const localResource = {
	en_US: {
		translation: {
			...enCommon,
		},
	},
	zh_CN: {
		translation: {
			...zhCommon,
		},
	},
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next) // init i18next
	.init({
		resources: localResource,
		fallbackLng: "en_US",
		debug: false,
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
	});

export { i18n, localResource };
