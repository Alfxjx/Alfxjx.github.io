import React from "react";

// https://github.com/css-doodle/css-doodle/issues/35

const Doodle = (rule) => () => {
	React.useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://unpkg.com/css-doodle@0.20.2/css-doodle.min.js";
		document.body.appendChild(script);
	}, []);
	return <css-doodle>{rule}</css-doodle>;
};

export { Doodle };
