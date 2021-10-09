import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { getAllBlogs, getAllPosts } from "@/utils/api";
import { Footer } from "@/components/Footer";
import { Button, TextButton } from "@/components/Button/index";
import { StripeHeader } from "@/components/StripeHeader";
import { Toggle } from "../components/theme/Toggle";
import { MyContext } from "./_app";
export default function Home({ newPost }) {
	const [whichWeb, setWeb] = useState("");
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
		decideWebName();
		console.log("hello nextjs");
	}, []);
	const handleWebChange = () => {
		decideWebName();
		if (whichWeb === "github") {
			window.location.href = "https://alfxjx.github.io";
		} else if (whichWeb === "gitee") {
			window.location.href = "https://alfxjx.gitee.io";
		}
	};
	const decideWebName = () => {
		const href = window.location.href;
		if (href.includes("gitee")) {
			setWeb("github");
		} else if (href.includes("github")) {
			setWeb("gitee");
		} else {
			setWeb("gitee");
		}
	};

	return (
		<div>
			<Head>
				<title>Jianxiang's Page</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<FullPage>
				<div className='btn-wrapper'>
					<Button onClick={handleWebChange}>{whichWeb}</Button>
					<Toggle toggleTheme={() => themeToggler()}>{NowTheme}</Toggle>
				</div>
				<div className='header-wrapper'>
					<StripeHeader></StripeHeader>
				</div>
				<Link href='/about'>
					<Avatar src='/me.jpg' alt='avatar' />
				</Link>
				<SelfIntro newPost={newPost} />
				<Footer showLink={true} />
			</FullPage>
		</div>
	);
}

const SelfIntro = ({ newPost }) => {
	const router = useRouter();
	const handleNew = () => {
		router.push(`/${newPost.type}/${newPost.slug}`);
	};
	const handleTechs = () => {
		router.push("/tech");
	};
	const handleBlogs = () => {
		router.push("/life");
	};
	return (
		<FullPageMain>
			<p className='my-main-font title main'>Hello, World.</p>
			<p className='my-main-font title'>I'm Xu "Alfred" Jianxiang,</p>
			<p className='my-main-font title'>
				a frontend developer who work for his passion
			</p>
			<Buttons>
				<TextButton
					className='my-main-font btn'
					showUnderLine={true}
					onClick={handleBlogs}>
					About Life
				</TextButton>
				<Button
					className='my-main-font btn'
					btnType='primary'
					onClick={handleNew}>
					Latest
				</Button>
				<TextButton
					className='my-main-font btn'
					showUnderLine={true}
					onClick={handleTechs}>
					About Code
				</TextButton>
			</Buttons>
		</FullPageMain>
	);
};

const FullPage = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	.btn-wrapper {
		position: fixed;
		right: 1rem;
		top: 1rem;
		z-index: 10;
		button {
			margin: 0 2px;
		}
	}
	.header-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 500px;
		transform: skewY(14deg) translateY(-50%);
	}
`;

const FullPageMain = styled.div`
	flex: 1 1 auto;
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	p {
		&.title {
			color: ${({ theme }) => theme.text};
			font-weight: 700;
			margin-top: 1rem;
			font-size: 2rem;
			letter-spacing: 2px;
			@media (max-width: 600px) {
				font-size: 1rem;
			}
		}
		&.main {
			margin-top: 3rem;
		}
	}
	.btn {
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: 2px;
		@media (max-width: 600px) {
			font-size: 1rem;
		}
	}
`;

const Avatar = styled.img`
	border-radius: 50%;
	width: 12rem;
	height: 12rem;
	margin-top: 6.2rem;
	box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
	cursor: pointer;
	z-index: 10;
	// 适配 iPhone se1
	@media (max-height: 600px) {
		width: 10rem;
		height: 10rem;
		margin-top: 4rem;
	}
`;

const Buttons = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 400px) {
		flex-direction: column;
		justify-content: flex-start;
	}
	button {
		margin: 3rem 1rem;
		width: 6rem;
		@media (max-width: 400px) {
			margin: 16px;
		}
	}
`;

export async function getStaticProps() {
	const allPosts = getAllPosts(["title", "date", "type", "slug"]);
	const allBlogs = getAllBlogs(["title", "date", "type", "slug"]);
	const posts = [...allBlogs, ...allPosts]
		.sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		})
		.reverse();
	return {
		props: {
			newPost: posts[0],
		},
	};
}
