import React from "react";
import Link from "next/link";

import Github from "../public/github.svg";
import Weibo from "../public/weibo.svg";
import Juejin from "../public/juejin.svg";

export const Footer = () => {
	return (
		<>
			<div className='flex-inital text-center text-gray-300 text-xs pb-2'>
				<span>Powerd by Next.js on gh-pages, </span>
				<Link href='http://www.anbandon.work'>More in old blog</Link>
			</div>
			<div className='flex-row flex justify-between items-center'>
				<Github />
				<Weibo />
				<Juejin />
			</div>
		</>
	);
};
