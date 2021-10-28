import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { useProgress } from "./useProgress";

interface ProgressProps {
	progress: number;
	height?: string;
}

const FixedTopWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 9999;
`;

const ProgressBarWrapperFixed = styled(FixedTopWrapper)<{
	progress: number;
	height?: string;
}>`
	width: 100%;
	height: ${({ height }) => (height ? height : "4px")};
	.bar-used {
		background: ${({ theme }) => theme.themeColor};
		width: ${({ progress }) => progress + "%"};
		height: 100%;
		border-radius: ${({ height }) =>
			height ? `0 calc( ${height}/ 2) calc(${height}/ 2) 0` : "0 2px 2px 0"};
	}
`;

const ProgressBarWrapper = styled.div<{ progress: number; height?: string }>`
	width: 100%;
	height: ${({ height }) => (height ? height : "4px")};
	.bar-used {
		background: ${({ theme }) => theme.themeColor};
		width: ${({ progress }) => progress + "%"};
		height: 100%;
		border-radius: ${({ height }) =>
			height ? `0 calc( ${height}/ 2) calc(${height}/ 2) 0` : "0 2px 2px 0"};
	}
`;

const ProgressBar = ({
	height,
	...rest
}: Omit<ProgressProps, "progress"> & HTMLAttributes<HTMLDivElement>) => {
	const progress = useProgress();
	return (
		<ProgressBarWrapperFixed {...rest} progress={progress} height={height}>
			<div className='bar-used'></div>
		</ProgressBarWrapperFixed>
	);
};

const SimpleProgressBar = ({
	progress,
	height,
	...rest
}: ProgressProps & HTMLAttributes<HTMLDivElement>) => {
	return (
		<ProgressBarWrapper {...rest} progress={progress} height={height}>
			<div className='bar-used'></div>
		</ProgressBarWrapper>
	);
};

export { ProgressBar, SimpleProgressBar };
