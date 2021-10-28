import React from "react";
import styled from "styled-components";

const TagWrapper = styled.span`
	border: ${({ theme }) => theme.themeColor} 1px solid;
	color: ${({ theme }) => theme.themeColor};
	border-radius: 6px;
	padding: 0px 6px;
	margin: 0 5px;
`;

export function Tag({ children }) {
	return <TagWrapper>{children}</TagWrapper>;
}
