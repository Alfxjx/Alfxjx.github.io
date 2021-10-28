import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useProgress } from "./useProgress";

const ProgressBarWrapper = styled.div<{ progress: number }>`
	width: 100%;
	height: 4px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 9999;
	.bar-used {
		background: ${({ theme }) => theme.themeColor};
		width: ${({ progress }) => progress + "%"};
		height: 100%;
		border-radius: 0 2px 2px 0;
	}
`;

const ProgressBar = () => {
	const progress = useProgress();
	return (
		<ProgressBarWrapper progress={progress}>
			<div className='bar-used'></div>
		</ProgressBarWrapper>
	);
};

export { ProgressBar };
