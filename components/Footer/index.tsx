import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { FiGithub } from "react-icons/fi";
import { FaWeibo, FaFilePdf, FaTwitter } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { BiPyramid } from "react-icons/bi";

const SVG_SIZE = 22;

export const Footer = ({ showLink }) => {
	const thisYear = new Date().getFullYear();
	return (
		<FooterWrapper>
			<div className="my-main-font text">
				<span>
					Powerd by <Link href="https://nextjs.org">Next.js</Link> on <Link href="https://vercel.com">Vercel</Link> with
					♥ 2020-{thisYear}
				</span>
			</div>
			<IconList show={showLink}>
				<a href="https://github.com/alfxjx">
					<FiGithub width={SVG_SIZE} height={SVG_SIZE} />
				</a>
				<a href="https://twitter.com/alfxjx">
					<FaTwitter width={SVG_SIZE} height={SVG_SIZE} />
				</a>
				<a href="https://weibo.com/u/1950371745">
					<FaWeibo width={SVG_SIZE} height={SVG_SIZE} />
				</a>
				<a href="https://juejin.cn/user/2330620383728551">
					<BiPyramid width={SVG_SIZE} height={SVG_SIZE} />
				</a>
				<a href="https://analytics.umami.is/share/uGgFqvXK6lUS93GB/blog">
					<MdAnalytics width={SVG_SIZE} height={SVG_SIZE} />
				</a>
				<a href="/xujianxiang-resume.pdf">
					<FaFilePdf width={SVG_SIZE} height={SVG_SIZE} />
				</a>
			</IconList>
		</FooterWrapper>
	);
};

const FooterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 500;
	font-size: 0.75rem;
	z-index: 10;
	width: 100%;
	background: ${({ theme }) => theme.background};
	.text {
		padding: 2rem 0 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: ${({ theme }) => theme.text};
	}
	a {
		color: ${({ theme }) => theme.themeColor};
		text-decoration: none;
		&:hover {
			color: ${({ theme }) => theme.textHover};
		}
	}
`;

const IconList = styled.div`
	display: ${(props) => (props.show ? "flex" : "none")};
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 10rem;
	padding: 1rem 0 0.5rem;
	svg {
		width: 24px;
		height: 24px;
		fill: ${({ theme }) => theme.themeColor};
	}

	svg {
		cursor: pointer;
		animation-duration: 0.618s;
		animation-iteration-count: infinite;
		&:hover {
			animation-name: jello;
			animation-timing-function: ease;
		}
	}
	@keyframes jello {
		0% {
			transform: scale(1, 1);
		}
		25% {
			transform: scale(0.9, 1.1);
		}
		50% {
			transform: scale(1.2, 0.8);
		}
		75% {
			transform: scale(0.95, 1.05);
		}
	}
`;
