import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

import {
	BiInfoCircle as About,
	BiArchive as Archive,
	BiHomeHeart as Home,
	BiCodeAlt as Code,
} from "react-icons/bi";
import { BsBook as Book, BsLightbulb as Bulb } from "react-icons/bs";

export const Header = () => {
	const router = useRouter();

	return (
		<HeaderStyle>
			<div title="home">
				<Link href="/">
					<a>
						<Home />
					</a>
				</Link>
			</div>
			<div className="links">
				<div title="about me">
					<Link href="/about">
						<a>
							<About />
						</a>
					</Link>
				</div>
				<div title="archives">
					<Link href="/archive">
						<a>
							<Archive title="archives" />
						</a>
					</Link>
				</div>
				<div title="life">
					<Link href="/life">
						<a>
							<Book title="life" />
						</a>
					</Link>
				</div>
				<div title="tech">
					<Link href="/tech">
						<a>
							<Code title="tech" />
						</a>
					</Link>
				</div>
				<div title="thoughts">
					<Link href="/thoughts">
						<a>
							<Bulb title="thoughts" />
						</a>
					</Link>
				</div>
			</div>
		</HeaderStyle>
	);
};

const HeaderStyle = styled.div`
	margin: 0.5rem 0 0 1rem;
	position: fixed;
	top: 0;
	left: 0;
	color: ${({ theme }) => theme.text};
	@media (max-width: 600px) {
		background: ${({ theme }) => theme.headerBackground};
		margin: 0;
		width: 100%;
		box-shadow: rgb(0 0 0 / 5%) 0px 6px 24px 0px,
			rgb(0 0 0 / 8%) 0px 0px 0px 1px;
		z-index: 20;
		display: flex;
		padding: 10px 3%;
		justify-content: flex-start;
		align-items: center;
	}
	svg {
		margin: 10px 3px;
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
		fill: ${({ theme }) => theme.themeColor};
		@media (max-width: 600px) {
			margin: 3px 5px;
		}
	}
	.links {
		display: flex;
		flex-direction: column;
		align-items: center;
		@media (max-width: 600px) {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
		}
		a {
			margin: 0.5rem 0;
			color: ${({ theme }) => theme.themeColor};
			text-decoration: none;
			&:hover {
				color: ${({ theme }) => theme.textHover};
			}
			@media (max-width: 600px) {
				margin: 0.5rem 10px;
			}
		}
	}
`;
