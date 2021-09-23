import { getPostBySlug, getAllPosts } from "../../utils/api";
import markdownToHtml from "../../utils/markdownToHtml";
import styled from "styled-components";
import hljs from "highlight.js";
import { useEffect, useContext, useState } from "react";
import "highlight.js/styles/atom-one-dark.css";
import Arrow from "../../public/arrow.svg";
import { MyContext } from "../_app";
import { Toggle } from "../../components/theme/Toggle";
import { useRouter } from "next/router";

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
			<PostWrapper>
				<div
					className='post'
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
			</PostWrapper>
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

const PostWrapper = styled.div`
	margin: 0 10%;
	padding: 5rem 2rem;
	border-radius: 6px;
	box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;

	blockquote {
		border-left: 5px solid ${({ theme }) => theme.themeColor};
		padding-left: 5px;
		margin: 10px 0 10px 3px;
		line-height: 1.5rem;
	}
	h1 {
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 700;
		margin: 10px 0;
	}
	h1 {
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
		margin: 10px 0;
	}
	p {
		margin: 10px 0;
		line-height: 1.5rem;
		position: relative;
	}
	img {
		width: 100%;
		position: relative;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		margin: 20px 0;
	}
	pre {
		margin: 5px 0;
		padding: 10px;
		overflow-x: scroll;
		span {
			line-height: 1.5rem;
		}
	}
	a {
		color: ${({ theme }) => theme.themeColor};
		margin: 0 2px;
		&:hover {
			color: ${({ theme }) => theme.textHover};
		}
	}
	ol {
		line-height: 1.5rem;
		list-style: circle;
		padding: 0 0 0 2.5rem;
	}
	ul {
		line-height: 1.5rem;
		list-style: lower-roman;
		padding: 0 0 0 2.5rem;
	}
	li {
		margin: 5px 0;
	}
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
