import React from "react";
import styled from "styled-components";
import { BiShare as Share } from "react-icons/bi";

export interface IProject {
	name: string;
	width: number;
	height: number;
	description: string;
	link: string;
	scale: number;
}

const ProjectCard = ({ options }: { options: IProject }) => {
	return (
		<ProjectCardWrapper scale={options.scale}>
			<div>
				<a target="_blank" href={options.link} className="name">
					<Share></Share>
					<span>{options.name.toUpperCase()}</span>
					{/* <img className="img" src={options.picture} alt="proj-pic" /> */}
					<iframe
						className="img"
						width={options.width}
						height={options.height}
						src={options.link}
					></iframe>
				</a>
				<div className="description">{options.description}</div>
			</div>
		</ProjectCardWrapper>
	);
};

const ProjectCardWrapper = styled.div<{ scale: number; top: number }>`
	cursor: pointer;
	color: ${({ theme }) => theme.text};
	border-radius: ${({ theme }) => theme.borderRadius};
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: "Monaco", sans-serif;
	margin: 1rem 0;
	padding: 1.25rem;
	box-shadow: ${({ theme }) => theme.boxShadow};
	background: ${({ theme }) => theme.background};
	max-width: 1280px;
	@media (max-width: 800px) {
		margin: 0.75rem auto;
		padding: 1rem;
		width: 80%;
	}
	&:hover {
		background: ${({ theme }) => theme.bgHover};
	}
	.name {
		color: ${({ theme }) => theme.text};
		font-size: 1rem;
		display: flex;
		align-items: center;
		text-decoration: none;
		position: relative;
		span {
			margin-left: 10px;
		}
		@media (max-width: 800px) {
			font-size: 0.75rem;
		}
		.img {
			display: none;
			position: fixed;
			right: 2rem;
			top: 3rem;
			z-index: 10;
			transform-origin: left top;
			transform: ${({ scale }) => `scale(${scale})`};
			border: 1px solid ${({ theme }) => theme.themeColor};
			border-radius: ${({ theme }) => theme.borderRadius};
		}
		&:hover {
			.img {
				display: block;
			}
		}
	}
	.description {
		margin-top: 0.75rem;
		font-size: 0.875rem;
		line-height: 1.25;
		@media (max-width: 800px) {
			font-size: 0.75rem;
		}
	}
`;

export { ProjectCard };
