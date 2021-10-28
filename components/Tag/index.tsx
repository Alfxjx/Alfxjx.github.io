import React from "react";
import styled from "styled-components";

const TagWrapper = styled.span`
	background: ${({ theme }) => theme.themeColor};
	color: ${({ theme }) => theme.textReverse};
  border-radius: 6px;
  padding: 2px 6px;
  margin: 0 5px;
`;

export function Tag({ children }) {
	return <TagWrapper>{children}</TagWrapper>;
}
