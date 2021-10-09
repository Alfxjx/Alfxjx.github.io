import { getBlogBySlug, getAllBlogs } from "@/utils/api";
import markdownToHtml from "@/utils/markdownToHtml";
import styled from "styled-components";
import hljs from "highlight.js";
import Link from "next/link";
import { useEffect, useContext } from "react";
import "highlight.js/styles/atom-one-dark.css";
import { MyContext } from "../_app";
import { Toggle } from "@/components/theme/Toggle";
import { useRouter } from "next/router";
import { Footer } from "@/components/Footer/index";
import { Post as PostStyles } from "@/components/Post/index";
import Arrow from "../../public/svg/arrow.svg";
import Book from "../../public/svg/book.svg";

export default function Post({ post }) {
	const router = useRouter();
	const { themeToggler, getNowTheme } = useContext(MyContext);
	useEffect(() => {
		document.querySelectorAll("pre").forEach((el) => {
			// then highlight each
			hljs.highlightElement(el);
		});
	}, []);
	return (
		<Wrapper>
			<div className='header'>
				<div className='icon-wrapper'>
					<div
						className='icons'
						onClick={() => {
							router.back();
						}}>
						<Arrow />
					</div>
					<div className='icons'>
						<Link href='/life'>
							<a>
								<Book />
							</a>
						</Link>
					</div>
				</div>
			</div>
			<div className='toggle'>
				<Toggle toggleTheme={() => themeToggler()}>{getNowTheme()}</Toggle>
			</div>
			<div style={{ height: "3.25rem" }}></div>
			<PostWrapper>
				<h1>{post.title}</h1>
				<div
					className='post'
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
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
`;

export async function getStaticProps({ params }) {
	const post: any = getBlogBySlug(params.slug, [
		"title",
		"date",
		"slug",
		"author",
		"content",
		"ogImage",
		"coverImage",
	]);
	const content = await markdownToHtml(post.content || "");

	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	};
}

export async function getStaticPaths() {
	const posts: any[] = getAllBlogs(["slug"]);

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			};
		}),
		fallback: false,
	};
}
