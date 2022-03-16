import React, { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import styled from "styled-components";
import hljs from "highlight.js";
import Link from "next/link";
import { useEffect, useContext } from "react";
import "highlight.js/styles/atom-one-dark.css";
import { MyContext } from "../../pages/_app";
import { Toggle } from "@/components/theme/Toggle";
import { LightDarkSwitcher } from "@/components/theme/LightDarkSwitcher";

import { useRouter } from "next/router";
import { Footer } from "@/components/Footer/index";
import { Post as PostStyles } from "@/components/Post/index";
import { Comments } from "@/components/Comments/index";
import { ProgressBar } from "@/components/ProgressBar/index";

import Arrow from "../../public/svg/arrow.svg";
import Code from "../../public/svg/code.svg";
import Life from "../../public/svg/book.svg";

export default function Post({ post, type }) {
	const router = useRouter();
	const { themeToggler, getNowTheme } = useContext(MyContext);
	const [NowTheme, setNowTheme] = useState("");
	useEffect(() => {
		const theme = getNowTheme();
		if (theme === "light") {
			setNowTheme("L");
		} else {
			setNowTheme("D");
		}
	}, [getNowTheme()]);
	useEffect(() => {
		document.querySelectorAll("pre").forEach((el) => {
			// then highlight each
			hljs.highlightElement(el);
		});
	}, []);
	useEffect(() => {
		document.title = post.title;
	}, [post.title]);
	return (
		<Wrapper>
			<ProgressBar></ProgressBar>
			<div className="header">
				<div className="icon-wrapper">
					<div
						className="icons"
						onClick={() => {
							router.back();
						}}
					>
						<Arrow />
					</div>
					<div className="icons">
						{type === "code" ? (
							<Link href="/tech">
								<a>
									<Code />
								</a>
							</Link>
						) : (
							<Link href="/life">
								<a>
									<Life />
								</a>
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className="toggle">
				<Toggle toggleTheme={() => themeToggler()}>
					<LightDarkSwitcher type={NowTheme} />
				</Toggle>
			</div>
			<div style={{ height: "3.25rem" }}></div>
			<PostWrapper>
				<div className="info">
					<h1>{post.title}</h1>
					<div className="user">
						<img
							className="img"
							src={post.author.picture}
							alt={post.author.name}
						/>
						<span className="title">{post.author.name}</span>
						<div className="date">
							{formatDate(new Date(post.date), "yyyy-MM-dd")}
						</div>
					</div>
				</div>
				<div
					className="post"
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
				<Comments />
			</PostWrapper>
			<Footer showLink={true}></Footer>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	.header {
		z-index: 100;
		position: fixed;
		top: 0;
		left: 0;
		padding-top: 12px;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		.icon-wrapper {
			display: flex;
			margin: 0 0 0 10px;
			border-radius: 30px;
			border: 2px solid ${({ theme }) => theme.themeColor};
			background: ${({ theme }) => theme.background};
			.icons {
				margin: 0 10px;
			}
		}
		svg {
			width: 1.5rem;
			height: 1.5rem;
			cursor: pointer;
			fill: ${({ theme }) => theme.themeColor};
			margin: 3px 0;
		}
	}
	.toggle {
		position: fixed;
		top: 0;
		right: 10px;
		padding-top: 12px;
	}
`;

const PostWrapper = styled(PostStyles)`
	flex: 1 0 auto;
	margin: 0 15%;
	background: ${({ theme }) => theme.backgroundLight};
	@media (max-width: 1280px) {
		padding: 3rem 1rem;
		margin: 0 10%;
	}
	@media (max-width: 600px) {
		padding: 3rem 0.75rem;
		margin: 0 2%;
	}
	padding: 3rem 2rem;
	border-radius: 6px;
	box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
	.info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		.user {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin: 0.75rem 0;
			.img {
				width: 1.5rem;
				height: 1.5rem;
				margin: 0;
				left: auto;
				transform: translateX(0);
			}
			.title {
				margin-left: 0.5rem;
				color: ${({ theme }) => theme.themeColor};
			}
		}
		.date {
			margin: 0 0 0 0.5rem;
			color: ${({ theme }) => theme.textGray};
		}
	}
`;
