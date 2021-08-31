import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Github from "../../public/github.svg";
import Weibo from "../../public/weibo.svg";
import Juejin from "../../public/juejin.svg";

export const Footer = ({ showLink }) => {
	return (
		<FooterWrapper>
			<div className='my-main-font flex-inital text-center text-gray-300 text-xs pb-2'>
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
	a {
		color: #447bdb;
		text-decoration: none;
		&:hover {
			color: #025cf7;
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
	}
`;
