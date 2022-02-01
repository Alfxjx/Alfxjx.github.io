import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { getAllBlogs, getAllPosts } from "@/utils/api";
import { Footer } from "@/components/Footer";
import { Button, TextButton } from "@/components/Button/index";
import { Select } from "@/components/Select";
import { StripeHeader } from "@/components/StripeHeader";
import { LightDarkSwitcher } from "@/components/theme/LightDarkSwitcher";
import { Toggle } from "../components/theme/Toggle";
import { MyContext } from "./_app";
import { Doodle } from "../components/Doodle/index";

const FancyDoodle = Doodle`
	:doodle {
		width: 100vw; height: 100vh;
	}
	@grid: 64 / 100vw 100vh;

	@size: 1px calc(141.4% + 1px);
	transform: rotate(@p(±45deg));
	background: rgba(0,0,0,0.1);
	margin: auto;
`;

export default function Home({ newPost }) {
	const options = [
		{
			label: "Gitee",
			value: "https://alfxjx.gitee.io/",
		},
		{
			label: "Github",
			value: "https://alfxjx.github.io/",
		},
		{
			label: "Site",
			value: "https://www.abandon.work/",
		},
	];
	const [focusSite, setFocus] = useState("");
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
		console.log(window.location.href);
		setFocus(window.location.href);
	}, []);

	const handleSelect = (e) => {
		setFocus(e.target.value);
		window.location.href = e.target.value;
	};

	return (
		<div>
			<Head>
				<title>Jianxiang's Page</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<FullPage>
				<div className="bg-under">
					<FancyDoodle />
				</div>
				<div className="btn-wrapper">
					<Select
						defaultValue={focusSite}
						optionList={options}
						onSelect={handleSelect}
					></Select>
					<Toggle toggleTheme={() => themeToggler()}>
						<LightDarkSwitcher type={NowTheme} />
					</Toggle>
				</div>
				<div className="header-wrapper">
					<StripeHeader></StripeHeader>
				</div>
				{/* <Link href='/about'>
					<Avatar src='/me.jpg' alt='avatar' />
				</Link> */}
				<div className="header-list">123455</div>
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
			<p className="my-main-font title main">{"<Hello-World />"}</p>
			<p className="my-main-font title">I'm Xu 'Alfred' Jianxiang,</p>
			<p className="my-main-font title">
				a frontend developer who work for his passion.
			</p>
			<Buttons>
				<Button
					className="my-main-font btn"
					btnType="primary"
					onClick={handleNew}
				>
					Latest
				</Button>
				<Button
					className="my-main-font btn"
					btnType="ghost"
					onClick={() => router.push("/about")}
				>
					About
				</Button>
				<TextButton
					className="my-main-font btn"
					showUnderLine={true}
					onClick={handleBlogs}
				>
					Life
				</TextButton>

				<TextButton
					className="my-main-font btn"
					showUnderLine={true}
					onClick={handleTechs}
				>
					Code
				</TextButton>
			</Buttons>
		</FullPageMain>
	);
};

const FullPage = styled.div`
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	.bg-under {
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.btn-wrapper {
		position: fixed;
		right: 1rem;
		top: 1rem;
		z-index: 1000;
		display: flex;
		align-items: center;
		button {
			margin: 0 2px;
		}
		.web-title {
			font-size: 1.5rem;
			font-weight: 700;
			:hover {
				color: ${({ theme }) => theme.textHover};
			}
		}
	}
	.header-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 640px;
		z-index: 2;
		transform: skewY(-6deg) translateY(-50%);
	}
`;

const FullPageMain = styled.div`
	flex: 1 1 auto;
	width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	z-index: 10;
	padding-left: 8rem;
	box-sizing: border-box;
	@media (max-width: 800px) {
		padding-left: 4rem;
	}
	@media (max-width: 600px) {
		padding-left: 2rem;
	}
	p {
		&.title {
			color: ${({ theme }) => theme.text};
			opacity: 1;
			mix-blend-mode: color-burn;
			font-weight: 700;
			margin-top: 1rem;
			font-size: 4rem;
			letter-spacing: 2px;
			@media (max-width: 600px) {
				font-size: 2.5rem;
			}
		}
		&.main {
			margin-top: 3.5rem;
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
	border-radius: 5px;
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
	@media (max-width: 300px) {
		flex-direction: column;
		justify-content: flex-start;
	}
	button {
		margin: 5rem 1rem 1rem 0;
		max-width: 6rem;
		@media (max-width: 400px) {
			margin: 24px 12px 0px;
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
