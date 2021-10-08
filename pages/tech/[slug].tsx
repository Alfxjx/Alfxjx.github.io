import { getPostBySlug, getAllPosts } from "../../utils/api";
import markdownToHtml from "../../utils/markdownToHtml";
import styled from "styled-components";
import hljs from "highlight.js";
import { useEffect, useContext } from "react";
import "highlight.js/styles/atom-one-dark.css";
import { MyContext } from "../_app";
import { Toggle } from "../../components/theme/Toggle";
import { useRouter } from "next/router";
import { Footer } from "../../components/Footer/index";
import { Post as PostStyles } from "../../components/Post/index";
import Arrow from "../../public/svg/arrow.svg";

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
				<div
					onClick={() => {
						router.back();
					}}>
					<Arrow />
				</div>
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
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding-top: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		div,
		button {
			margin: 0 1rem;
		}
		svg {
			width: 1.5rem;
			height: 1.5rem;
			cursor: pointer;
			fill: ${({ theme }) => theme.themeColor};
		}
	}
`;

const PostWrapper = styled(PostStyles)`
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
	const post: any = getPostBySlug(params.slug, [
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
	const posts: any[] = getAllPosts(["slug"]);

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
