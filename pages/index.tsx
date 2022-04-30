import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { getAllBlogs, getAllPosts } from "@/utils/api";
import { Footer } from "@/components/Footer";
import { TextButton } from "@/components/Button/index";
import { Select } from "@/components/Select";
import { MyContext } from "./_app";
import { FancyDoodle } from "@/components/Doodle/indexPage";
import { Switch } from "@/components/Button/switch";
import { ProjectCard, IProject } from "@/components/Card/ProjectCard";
import { useTheme } from "@/hooks/useTheme";

import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineArrowDown } from "react-icons/ai";

export default function Home({ newPost }) {
	return (
		<div>
			<Head>
				<title>Alfxjx</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<FullPage>
				<HeaderBar newPost={newPost} />
				<div className="main">
					<SelfIntro newPost={newPost} />
					<MyProjects></MyProjects>
				</div>
				<Footer showLink={true} />
			</FullPage>
		</div>
	);
}

const SelfIntro = ({ newPost }) => {
	const themeCurr = useTheme();

	const handlePageDown = () => {
		const height = document.documentElement.clientHeight;
		window.scrollTo({ behavior: "smooth", top: height });
	};
	return (
		<FullPageMain>
			<div className="text-introduction">
				<p className="my-main-font title">{"Greetings,"}</p>
				<p className="my-main-font title">
					I'm{" "}
					<a className="breathe" href="http://github.com/alfxjx">
						Alfxjx.
					</a>
				</p>
				<p className="my-main-font title">
					<del style={{ color: themeCurr.themeColor }}>🦄</del> Developer with
					passion
				</p>
				<div className="width-800">
					<ButtonsList newPost={newPost}></ButtonsList>
				</div>
			</div>
			<div className="more-logo">
				<a target={"_blank"} href="https://codepen.io/aragakey/pen/LowQdY">
					<FancyDoodle></FancyDoodle>
				</a>
			</div>
			<div className="page-down" onClick={handlePageDown}>
				<AiOutlineArrowDown />
			</div>
		</FullPageMain>
	);
};

const MyProjects = () => {
	const proj: IProject[] = [
		{
			name: "Qlock",
			description:
				"An art clock components inspired by QlockTwo I met in Hangzhou.",
			left: true,
			link: "https://qlock-web.vercel.app/",
		},
		{
			name: "NextChakraAdmin",
			description:
				"An admin template base on Next.js and Chakra-ui, with i18n, charts and editors",
			left: false,
			link: "https://next-chakra-admin.vercel.app",
		},
		{
			name: "water-drinker",
			description: "A animated water drinker counter app",
			left: true,
			link: "https://weldingboys.vercel.app/water",
		},
	];
	return (
		<MyProjectWrapper>
			<h1 className="title">My Projects</h1>
			{proj.map((x) => (
				<ProjectCard key={x.name} options={x}></ProjectCard>
			))}
			<div className="more">
				<a target="_blank" href="https://github.com/alfxjx">
					<FiMoreHorizontal></FiMoreHorizontal>
				</a>
			</div>
		</MyProjectWrapper>
	);
};

const ButtonsList = ({ newPost }) => {
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
		<Buttons>
			<TextButton
				className="my-main-font btn"
				showUnderLine={true}
				onClick={handleNew}
			>
				Latest
			</TextButton>
			<TextButton
				className="my-main-font btn"
				showUnderLine={true}
				onClick={() => router.push("/about")}
			>
				About
			</TextButton>
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
	);
};

const HeaderBar = ({ newPost }) => {
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
		setFocus(window.location.href);
	}, []);

	const handleSelect = (e) => {
		setFocus(e.target.value);
		window.location.href = e.target.value;
	};

	return (
		<HeaderBarWrapper>
			<img width={48} src="/logo.png"></img>
			<div className="width-800">
				<ButtonsList newPost={newPost}></ButtonsList>
			</div>
			<div className="end">
				<Select
					defaultValue={focusSite}
					optionList={options}
					onSelect={handleSelect}
				></Select>
				<Switch
					initalValue={NowTheme === "L"}
					onChange={() => themeToggler()}
				/>
			</div>
		</HeaderBarWrapper>
	);
};

const MyProjectWrapper = styled.div`
	width: 100%;
	height: 80vh;
	h1.title {
		padding-left: 2rem;
		font-size: 2rem;
		@media (max-width: 800px) {
			font-size: 1.5rem;
		}
	}
	.more {
		font-size: 2rem;
		text-align: center;
		cursor: pointer;
		a {
			color: ${({ theme }) => theme.text};
			text-decoration: none;
		}
	}
`;

const FullPage = styled.div`
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	.main {
		flex: 1 1 auto;
	}
	.bg-under {
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
`;

const FullPageMain = styled.div`
	position: relative;
	height: 100vh;
	max-width: 1280px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	z-index: 10;
	/* padding-left: 8rem; */
	padding-top: 5rem;
	box-sizing: border-box;
	@media (max-width: 800px) {
		padding-left: 0;
		flex-direction: column-reverse;
		justify-content: center;
		align-items: space-around;
	}
	.page-down {
		position: absolute;
		bottom: 2rem;
		cursor: pointer;
		font-size: 2rem;
		animation: drop 1s ease infinite;
	}
	@keyframes drop {
		0% {
			transform: translateY(0px);
		}
		25% {
			transform: translateY(5px);
		}
		50% {
			transform: translateY(10px);
		}
		75% {
			transform: translateY(5px);
		}
	}
	.text-introduction {
		flex: 5 1 auto;
		@media (max-width: 800px) {
			margin-top: 2rem;
		}
		p {
			&.title {
				color: ${({ theme }) => theme.text};
				opacity: 1;
				font-weight: 700;
				margin-top: 1rem;
				font-size: 2.5rem;
				@media (max-width: 600px) {
					font-size: 1.25rem;
				}
				a {
					color: ${({ theme }) => theme.text};
					text-decoration: none;
					&:hover {
						color: ${({ theme }) => theme.textHover};
					}
				}
				.breathe {
					animation: breath infinite 3s ease;
				}

				@keyframes breath {
					0% {
						color: ${({ theme }) => theme.themeColor};
					}

					50% {
						color: ${({ theme }) => theme.themeColorReverse};
					}

					100% {
						color: ${({ theme }) => theme.themeColor};
					}
				}
			}
		}
		.width-800 {
			display: none;
			@media (max-width: 800px) {
				display: block;
			}
		}
	}
	.more-logo {
		flex: 5 0 0;
		margin: 0 1rem;
		background: ${({ theme }) => theme.background};
	}
`;

const Buttons = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 300px) {
		flex-direction: column;
		justify-content: flex-start;
	}
	button {
		margin: 1rem 1.5rem;
		@media (max-width: 600px) {
			margin: 1rem 6px;
		}
	}
	.btn {
		font-size: 1rem;
		font-weight: 700;
		@media (max-width: 600px) {
			font-size: 1rem;
		}
	}
`;

const HeaderBarWrapper = styled.div`
	position: fixed;
	right: 0;
	top: 0;
	padding: 0.5rem 2rem;
	z-index: 1000;
	box-sizing: border-box;
	background: ${({ theme }) => theme.background};
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.width-800 {
		display: block;
		@media (max-width: 800px) {
			display: none;
		}
	}
	.end {
		display: flex;
		align-items: center;
		justify-content: flex-end;
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
