import React from "react";
import styled from "styled-components";
import { BiShare as Share } from "react-icons/bi";

export interface IProject {
	name: string;
	left: boolean;
	description: string;
	link: string;
}

const ProjectCard = ({ options }: { options: IProject }) => {
	return (
		<ProjectCardWrapper>
			<div>
				<a target="_blank" href={options.link} className="name">
					<Share></Share>
					<span>{options.name}</span>
					{/* <img className="img" src={options.picture} alt="proj-pic" /> */}
					<iframe className="img" src={options.link}></iframe>
				</a>
				<div className="description">{options.description}</div>
			</div>
		</ProjectCardWrapper>
	);
};

const ProjectCardWrapper = styled.div`
	color: ${({ theme }) => theme.text};
	border-radius: ${({ theme }) => theme.borderRadius};
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: "Monaco", sans-serif;
	margin: 2rem 0;
	padding: 3rem;
	box-shadow: ${({ theme }) => theme.boxShadow};
	max-width: 1280px;
	@media (max-width: 800px) {
		margin: 1rem auto;
		padding: 1.5rem;
		width: 80%;
	}
	.name {
		color: ${({ theme }) => theme.text};
		font-size: 1.75rem;
		display: flex;
		align-items: center;
		text-decoration: none;
		position: relative;
		span {
			margin-left: 10px;
		}
		@media (max-width: 800px) {
			font-size: 1.25rem;
		}
		.img {
			display: none;
			position: absolute;
			left: 0;
			top: 2rem;
			z-index: 10;
			width: 640px;
			height: 480px;
		}
		&:hover {
			.img {
				display: block;
			}
		}
	}
	.description {
		margin-top: 0.75rem;
		font-size: 1.25rem;
		line-height: 1.25;
		@media (max-width: 800px) {
			font-size: 1rem;
		}
	}
`;

export { ProjectCard };
