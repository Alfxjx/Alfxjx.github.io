import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Github from "../../public/svg/github.svg";
import Weibo from "../../public/svg/weibo.svg";
import Juejin from "../../public/svg/juejin.svg";
import theme from "@chakra-ui/theme";

export const Footer = ({ showLink }) => {
	return (
		<FooterWrapper>
			<div className='my-main-font text'>
				<span>Powerd by Next.js on gh-pages, </span>
				<Link href='http://www.anbandon.work'>More in old blog</Link>
			</div>
			<IconList show={showLink}>
				<a href='https://github.com/alfxjx'>
					<Github />
				</a>
				<a href='https://weibo.com/u/1950371745'>
					<Weibo />
				</a>
				<a href='https://juejin.cn/user/2330620383728551'>
					<Juejin />
				</a>
			</IconList>
		</FooterWrapper>
	);
};

const FooterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	letter-spacing: 2px;
	font-weight: 600;
	z-index: 10;
	.text {
		padding: 2rem 0 6px 0;
	}
	a {
		color: ${({ theme }) => theme.themeColor};
		text-decoration: none;
		&:hover {
			color: ${({ theme }) => theme.textHover};
		}
		svg {
			animation-duration: 0.618s;
			animation-iteration-count: infinite;
			&:hover {
				animation-name: jello;
				animation-timing-function: ease;
			}
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

const IconList = styled.div`
	display: ${(props) => (props.show ? "flex" : "none")};
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 10rem;
	padding: 0.25rem 0 1rem;
	svg.icon {
		width: 24px;
		height: 24px;
		fill: ${({ theme }) => theme.text};
	}
`;
