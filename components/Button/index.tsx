import React, { ReactNode, ButtonHTMLAttributes } from "react";

import styled from "styled-components";

const InsideButton = styled.button<{ primary?: boolean; round?: boolean }>`
	border: 1px solid ${(props) => props.theme.themeColor};
	background: ${(props) =>
		props.primary ? props.theme.themeColor : "transparent"};
	color: ${(props) =>
		props.primary ? props.theme.textReverse : props.theme.themeColor};
	padding: ${({ round }) => (round ? "0.5rem" : "0.5rem 1rem")};
	text-align: center;
	border-radius: ${({ round }) => (round ? "50%" : "0.25rem")};
	cursor: pointer;
`;

const TextButtonStyles = styled.button<{ showUnderLine?: boolean }>`
	border: none;
	border-bottom: ${({ showUnderLine, theme }) =>
		showUnderLine ? `1px solid ${theme.themeColor}` : "none"};
	background: transparent;
	cursor: pointer;
	padding: 0 0 0 0;
	color: ${(props) => props.theme.themeColor};
	text-align: center;
	text-decoration: none;
`;

export type ButtonProps = {
	children: ReactNode;
	btnType?: "primary" | "ghost";
	round?: "round" | "square";
	showUnderLine?: boolean;
};

export function Button({
	children,
	btnType,
	round,
	...props
}: ButtonProps & ButtonHTMLAttributes<HTMLElement>) {
	return (
		<InsideButton
			round={round === "round"}
			primary={btnType === "primary"}
			{...props}
		>
			{children}
		</InsideButton>
	);
}

export function TextButton({
	children,
	showUnderLine,
	...props
}: ButtonProps & ButtonHTMLAttributes<HTMLElement>) {
	return (
		<TextButtonStyles showUnderLine={showUnderLine} {...props}>
			{children}
		</TextButtonStyles>
	);
}
