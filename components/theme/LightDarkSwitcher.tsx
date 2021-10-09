import React from "react";
import styled from "styled-components";
import Sun from "../../public/svg/sun.svg";
import Moon from "../../public/svg/moon.svg";

const Switcher = styled.div`
	width: 1rem;
	height: 1rem;
	svg {
		width: 1rem;
		height: 1rem;
		cursor: pointer;
		fill: ${({ theme }) => theme.textReverse};
	}
`;

export function LightDarkSwitcher({ type }: { type: String }) {
	return <Switcher>{type === "L" ? <Moon /> : <Sun />}</Switcher>;
}
