import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Github from "../public/github.svg";
import Weibo from "../public/weibo.svg";
import Juejin from "../public/juejin.svg";

export const Footer = () => {
	return (
		<FooterWrapper>
			<div className='flex-inital text-center text-gray-300 text-xs pb-2'>
				<span>Powerd by Next.js on gh-pages, </span>
				<Link href='http://www.anbandon.work'>More in old blog</Link>
			</div>
			<IconList>
				<Github />
				<Weibo />
				<Juejin />
			</IconList>
		</FooterWrapper>
	);
};

const FooterWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const IconList = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 10rem;
	padding: 0.5rem 0;
`;
