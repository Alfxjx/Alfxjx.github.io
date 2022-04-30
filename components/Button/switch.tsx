import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { BsSun, BsMoon } from "react-icons/bs";

export function Switch({ initalValue, onChange }) {
	const [active, setActive] = useState<boolean>(null);
	useEffect(() => {
		setActive(initalValue);
	}, []);
	const toggle = () => {
		setActive(!active);
		onChange();
	};

	return (
		<SwitchWrapper active={active} onClick={toggle}>
			<BsSun />
			<BsMoon />
			<div className="round"></div>
		</SwitchWrapper>
	);
}

const SwitchWrapper = styled.button<{ active: boolean }>`
	--size: 1.75rem;
	background: ${({ theme }) => theme.themeColor};
	transition: background 0.5s ease;
	cursor: pointer;
	border: 1px solid ${({ theme }) => theme.themeColor};
	position: relative;
	width: calc(2 * var(--size));
	height: var(--size);
	border-radius: var(--size);
	display: flex;
	justify-content: space-around;
	align-items: center;
	.round {
		position: absolute;
		top: 0;
		right: ${({ active }) => (!!active ? "50%" : 0)};
		transition: right 0.3s ease;
		z-index: 10;
		width: calc(var(--size) - 2px);
		height: calc(var(--size) - 2px);
		border-radius: 50%;
		background: ${({ theme }) => theme.textReverse};
	}
	svg {
		width: calc(0.5 * var(--size));
		height: calc(0.5 * var(--size));
		fill: ${({ theme }) => theme.textReverse};
	}
`;
