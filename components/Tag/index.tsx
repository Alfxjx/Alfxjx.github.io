import React from "react";
import styled from "styled-components";

const TagWrapper = styled.span`
	border: ${({ theme }) => theme.themeColor} 1px solid;
	color: ${({ theme }) => theme.themeColor};
	border-radius: 4px;
	padding: 1px;
	margin: 0 2px;
	line-height: 1rem;
	font-size: 0.75rem;
`;

export function Tag({ children }) {
	return <TagWrapper>{children}</TagWrapper>;
}
