import Atropos from "atropos/react";
import styled from "styled-components";

const AtroposWrapper = styled(Atropos)`
	width: 320px;
	height: 160px;
`;

export default function Test() {
	return (
		<div>
			this is test
			<AtroposWrapper activeOffset={40} shadowScale={1.05}>
				hello
			</AtroposWrapper>
		</div>
	);
}
