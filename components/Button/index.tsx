import React, { ReactNode, ButtonHTMLAttributes } from "react";

import styled from "styled-components";

const InsideButton = styled.button<{ primary?: boolean }>`
	border: 1px solid ${(props) => props.theme.themeColor};
	background: ${(props) =>
		props.primary ? props.theme.themeColor : props.theme.textReverse};
	color: ${(props) =>
		props.primary ? props.theme.textReverse : props.theme.themeColor};
	padding: 0.5rem 1rem;
	text-align: center;
	border-radius: 0.25rem;
	cursor: pointer;
`;

export type ButtonProps = {
	children: ReactNode;
	btnType?: "primary" | "ghost";
};

export function Button({
	children,
	btnType,
	...props
}: ButtonProps & ButtonHTMLAttributes<HTMLElement>) {
	return (
		<InsideButton primary={btnType === "primary"} {...props}>
			{children}
		</InsideButton>
	);
}
