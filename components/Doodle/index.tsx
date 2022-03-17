import React from "react";
import "css-doodle";

const Doodle = (rule) => () => {
	return <css-doodle click-to-update>{rule}</css-doodle>;
};

export { Doodle };
