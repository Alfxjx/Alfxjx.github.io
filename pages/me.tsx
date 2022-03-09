import React from "react";
import styled from "styled-components";

const MeWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export default function Me() {
	return (
		<MeWrapper>
			<div>Hello, I'm Xujianxiang</div>
		</MeWrapper>
	);
}
