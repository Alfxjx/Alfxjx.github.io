import React from "react";
import styled from "styled-components";
import { BaseLayout } from "@/components/Layout/base";

export function PlaygroundLayout({ title, children }) {
	return (
		<BaseLayout title={title}>
			<PlaygroundWrapper>
				<div className="slogan">{title}</div>
				<div className="main">{children}</div>
			</PlaygroundWrapper>
		</BaseLayout>
	);
}

const PlaygroundWrapper = styled.div`
	padding-top: 3.75rem;
	.slogan {
		text-align: center;
	}
	.main {
		width: 400px;
		height: 400px;
		border-radius: ${({ theme }) => theme.borderRadius};
		margin: 2rem auto 0;
		border: 1px solid ${({ theme }) => theme.themeColor};
	}
`;
