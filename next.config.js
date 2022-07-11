const {
	i18n
} = require('./next-i18next.config');

module.exports = {
	i18n,
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
};